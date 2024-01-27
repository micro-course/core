import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { cva } from "class-variance-authority";

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

export function useMdxComponent(code: string) {
  return useMemo(() => {
    const Component = getMDXComponent(code, {});

    return function MdxComponent({
      className,
      size,
    }: {
      className?: string;
      size?: "lg" | "md" | "sm";
    }) {
      return (
        <div
          className={variants({
            className,
            size,
          })}
        >
          <Component />
        </div>
      );
    };
  }, [code]);
}
