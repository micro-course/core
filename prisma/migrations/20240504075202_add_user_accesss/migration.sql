-- CreateEnum
CREATE TYPE "UserAccessType" AS ENUM ('course');

-- CreateEnum
CREATE TYPE "UserAccessReason" AS ENUM ('paid', 'free', 'manual');

-- CreateTable
CREATE TABLE "UserAccess" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "adminId" TEXT,
    "courseId" TEXT NOT NULL,
    "type" "UserAccessType" NOT NULL,
    "reason" "UserAccessReason" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAccess_pkey" PRIMARY KEY ("id")
);
