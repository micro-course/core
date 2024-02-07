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

type MdxComponentProps = {
  className?: string;
  size?: "lg" | "md" | "sm";
};

export function useMdxComponent(code: string) {
  return useMemo(() => {
    const Component = getMDXComponent(code, {});

    return function MdxComponent({ className, size }: MdxComponentProps) {
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

export function MdxCode({
  code,
  ...props
}: MdxComponentProps & { code: string }) {
  const Component = useMdxComponent(code);
  return <Component {...props} />;
}
