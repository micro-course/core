import { z } from "zod";

export class SafeLocalStorage<T> {
  constructor(
    private key: string,
    private schema: z.Schema<T>,
    private defaultValue: T,
  ) {}

  get(): T {
    try {
      const value = localStorage.getItem(this.key);

      if (!value) {
        return this.defaultValue;
      }

      const parsed = this.schema.safeParse(JSON.parse(value));

      if (!parsed.success) {
        return this.defaultValue;
      }

      return parsed.data;
    } catch (e) {
      return this.defaultValue;
    }
  }

  set(value: T) {
    localStorage.setItem(this.key, JSON.stringify(this.schema.parse(value)));
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
