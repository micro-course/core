import { createContext, useCallback, useContext } from "react";
import { parseServerActionError, type ServerActionError } from "./error";
import { ServerActionDto } from "./types";

type OnError = (
  error: ServerActionError,
  params: unknown,
) => void | Promise<void>;
type OnSuccess = (value: unknown, params: unknown) => void | Promise<void>;

type ServerActionContext = {
  onError: OnError[];
  onSuccess: OnSuccess[];
};

const serverActionsContext = createContext<ServerActionContext>({
  onError: [],
  onSuccess: [],
});

export const ServerActionsProvider = (
  props: React.PropsWithChildren<ServerActionContext>,
) => {
  return (
    <serverActionsContext.Provider value={props}>
      {props.children}
    </serverActionsContext.Provider>
  );
};

export const useServerAction = <P, R>(
  action: (params: P) => Promise<ServerActionDto<R>>,
) => {
  const { onError, onSuccess } = useContext(serverActionsContext);

  return useCallback(
    async (params: P): Promise<R> => {
      return action(params)
        .then((action) => {
          if (action.type === "success") {
            const data = action.data as R;
            onSuccess.forEach((onSuccess) => onSuccess(data, params));
            return data;
          }

          throw parseServerActionError(action);
        })
        .catch((error) => {
          onError.forEach((onError) => onError(error, params));
          throw error;
        });
    },
    [onError, onSuccess, action],
  );
};
