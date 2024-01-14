import { useAppearanceDelay } from "../lib/react";
import { Spinner } from "./spinner";

export function FullPageSpinner({ isLoading }: { isLoading?: boolean }) {
  const show = useAppearanceDelay(isLoading);

  if (show) {
    return (
      <div className="inset-0 flex items-center justify-center absolute">
        <Spinner
          className="w-10 h-10 text-primary"
          aria-label="Загрузка страницы"
        />
      </div>
    );
  }

  return null;
}
