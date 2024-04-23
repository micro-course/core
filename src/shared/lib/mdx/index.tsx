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

type CustomComponents = Record<string, any>;

export function useMdxComponent(
  code: string,
  customComponents?: CustomComponents,
) {
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
          <Component components={{ ...customComponents }} />
        </div>
      );
    };
  }, [code, customComponents]);
}

type MdxComponentProps = {
  className?: string;
  size?: "lg" | "md" | "sm";
};

export function MdxCode({
  code,
  components,
  ...props
}: MdxComponentProps & { code: string; components?: CustomComponents }) {
  const Component = useMdxComponent(code, components);
  return <Component {...props} />;
}
