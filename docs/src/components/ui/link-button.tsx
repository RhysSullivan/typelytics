"use client";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
// TODO: Check if this results in the JS for button being pulled in
import { buttonVariants } from "./button";
import Link from "next/link";

export interface LinkButtonProps
  extends React.PropsWithChildren<
      React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      }
    >,
    VariantProps<typeof buttonVariants> {}

export const LinkButton = ({
  children,
  href,
  variant,
  size,
  className,
  ...props
}: LinkButtonProps & {
  prefetch?: boolean;
}) => {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Link>
  );
};
