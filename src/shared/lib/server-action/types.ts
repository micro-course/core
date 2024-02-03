import type { ServerActionErrorDto } from "./error";

type ServerActionSuccessDto<T> = {
  type: "success";
  data: T;
};

export type ServerActionDto<T> =
  | ServerActionSuccessDto<T>
  | ServerActionErrorDto;
