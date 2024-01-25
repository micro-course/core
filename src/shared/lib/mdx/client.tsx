import { cn } from "@/shared/ui/utils";
import { cva } from "class-variance-authority";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";

const variants = cva("prose dark:prose-invert prose-slate", {
  variants: {
    size: {
      lg: "prose-lg",
      md: "prose",
      sm: "prose-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const useMdxComponent = (code: string) => {
  return useMemo(() => {
    const Component = getMDXComponent(code);

    return function MdxComponent({
      className,
      size,
    }: {
      className?: string;
      size?: "lg" | "md" | "sm";
    }) {
      return (
        <div
          className={cn(
            variants({
              className,
              size,
            }),
          )}
        >
          <Component />
        </div>
      );
    };
  }, [code]);
};
