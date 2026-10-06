FROM node:20-bookworm-slim AS build
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app/core
COPY package.json package-lock.json ./
COPY patches ./patches
RUN npm ci
COPY . .
RUN npx prisma generate
ARG NEXT_PUBLIC_PUBLIC_URL=https://micro-courses.ru
ARG NEXT_PUBLIC_SENTRY_DSN=
ARG NEXT_PUBLIC_SENTRY_ENVIRONMENT=prod
ARG S3_ENDPOINT=https://s3.twcstorage.ru
ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_PUBLIC_URL=$NEXT_PUBLIC_PUBLIC_URL \
    NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN \
    NEXT_PUBLIC_SENTRY_ENVIRONMENT=$NEXT_PUBLIC_SENTRY_ENVIRONMENT \
    S3_ENDPOINT=$S3_ENDPOINT
# Приватные переменные проверяются при сборке страниц; настоящие приходят в рантайме.
RUN --mount=type=secret,id=sentry,env=SENTRY_AUTH_TOKEN \
    EMAIL_SERVER_USER=build EMAIL_SERVER_PASSWORD=build EMAIL_SERVER_HOST=build EMAIL_SERVER_PORT=587 EMAIL_FROM=build \
    S3_ACCESS_KEY_ID=build S3_SECRET_ACCESS_KEY=build S3_IMAGES_BUCKET=build S3_REGION=ru-1 \
    CONTENT_URL=../prod-content EVENT_STORE_DB_URL=esdb://build:2113?tls=false REDIS_URL=redis://build:6379 \
    npm run build

FROM node:20-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app/core
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 CONTENT_URL=../prod-content
COPY --from=build /app/core ./
COPY --from=content . /app/prod-content
USER node
EXPOSE 3000
CMD ["node_modules/.bin/next", "start", "-p", "3000"]
