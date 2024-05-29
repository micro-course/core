import { z } from "zod";

export const ImgUrl = z.string().brand("ImgUrl");
export type ImgUrl = z.infer<typeof ImgUrl>;
