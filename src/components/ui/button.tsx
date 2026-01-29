import type { ComponentPropsWithoutRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  asChild?: boolean;
};

export function Button({
  className,
  variant = "default",
  type = "button",
  asChild = false,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed h-10 px-5";

  const variants: Record<ButtonVariant, string> = {
    default: "bg-black text-white hover:bg-zinc-800",
    outline:
      "border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-black dark:text-zinc-100 dark:hover:bg-zinc-900",
  };

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      {...(!asChild ? { type } : {})}
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
}


