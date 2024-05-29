import { z } from "zod";
import { DateTime } from "luxon";

// Валидатор строки ISO 8601
export const isoDateString = z.string();

// Кастомный парсер даты Luxon
export const luxonDateTimeSchema = isoDateString.pipe(
  z.custom<DateTime>((date) => {
    const parsedDate = DateTime.fromISO(date as string);
    if (parsedDate.isValid) {
      return parsedDate;
    } else {
      return z.NEVER;
    }
  }, "DateTime parse error"),
);

export const luxonDateTimeOptionalSchema = isoDateString.optional().pipe(
  z.custom<DateTime | undefined>((date) => {
    if (date === undefined) {
      return date;
    }

    const parsedDate = DateTime.fromISO(date as string);
    if (parsedDate.isValid) {
      return parsedDate;
    } else {
      return z.NEVER;
    }
  }, "Optional DateTime parse error"),
);

export type SchemaOf<T, I = any> = z.ZodType<T, any, I>;
