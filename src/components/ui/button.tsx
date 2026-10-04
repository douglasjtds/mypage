import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

// Sem sombra, raio 4px. Cor muda em 150ms; :active encolhe para 0.97 (DESIGN-GUIDELINES 5).
// hover: do Tailwind v4 só vale em @media (hover: hover), então toque não fica preso no hover.
// on-inverse: botão claro para blocos --inverse (o primário sobre --inverse continua --accent).
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm font-sans font-medium whitespace-nowrap select-none transition-[color,background-color,border-color,scale] duration-150 ease-out active:scale-97 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[18px]",
  {
    variants: {
      variant: {
        primary: "bg-accent text-on-accent hover:bg-accent-hover",
        secondary: "border border-line bg-transparent text-ink hover:border-ink-muted hover:bg-surface",
        ghost: "bg-transparent text-ink hover:bg-surface",
        "on-inverse": "bg-on-inverse text-ink hover:bg-raised",
      },
      size: {
        md: "h-12 px-6 text-body",
        sm: "h-9 gap-1.5 px-4 text-small",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
