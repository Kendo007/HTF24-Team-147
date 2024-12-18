import { cn } from "@/lib/utils";

export function TypographyH1({ children, className }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH3({ children, className }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH4({ children, className }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyP({ children, className }) {
  return (
    <h1 className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </h1>
  );
}
