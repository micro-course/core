import cuid from "cuid";

export const createId = <T extends string = string>() => cuid() as T;
