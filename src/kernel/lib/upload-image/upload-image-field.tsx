import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { Input } from "@/shared/ui/input";
import { useUploadImage } from "./use-upload-image";
import { Noop } from "react-hook-form";
import { Ref, forwardRef } from "react";

export const UploadImageField = forwardRef(function UploadImageField(
  {
    value,
    onChange,
    onChangeSize,
    onError,
    scope,
    onBlur,
  }: {
    scope: string;
    value: string;
    onBlur: Noop;
    disabled?: boolean;
    onChange: (...event: any[]) => void;
    onChangeSize?: (sizes: { width: number; height: number }) => void;
    onError?: (type?: "big-size" | "unknown") => void;
  },
  ref: Ref<HTMLInputElement>,
) {
  const { handleFileSelect, isPending } = useUploadImage({
    scope,
    onSuccess: onChange,
    onImageSize: onChangeSize,
    onError,
  });

  return (
    <div className="space-y-2">
      <Input value={value} onChange={onChange} ref={ref} onBlur={onBlur} />
      <Button
        type="button"
        onClick={handleFileSelect}
        disabled={isPending}
        variant="link"
      >
        {isPending && (
          <Spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-label="Загрузка изображения"
          />
        )}
        Загрузить
      </Button>
    </div>
  );
});
