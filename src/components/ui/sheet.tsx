"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

// Véu em tinta translúcida, sem blur.
function SheetOverlay({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-ink/40 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
        className,
      )}
      {...props}
    />
  );
}

// Entra pelo topo ou pela direita em 250ms ease-out; sai um pouco mais rápido.
function SheetContent({
  className,
  children,
  side = "right",
  closeLabel,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right";
  /** Rótulo acessível do botão de fechar (vem das mensagens). Sem ele, não há botão. */
  closeLabel?: string;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-paper text-ink",
          side === "right" &&
            "inset-y-0 right-0 h-full w-4/5 max-w-sm border-l border-line data-[state=closed]:animate-sheet-out-right data-[state=open]:animate-sheet-in-right",
          side === "top" &&
            "inset-x-0 top-0 h-auto border-b border-line data-[state=closed]:animate-sheet-out-top data-[state=open]:animate-sheet-in-top",
          className,
        )}
        {...props}
      >
        {children}
        {closeLabel && (
          <SheetPrimitive.Close className="absolute top-3 right-3 inline-flex size-10 cursor-pointer items-center justify-center rounded-sm text-ink-muted transition-colors duration-150 hover:bg-surface hover:text-ink">
            <XIcon aria-hidden="true" strokeWidth={1.5} className="size-5" />
            <span className="sr-only">{closeLabel}</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-header" className={cn("flex flex-col gap-1.5 p-4", className)} {...props} />;
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-footer" className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />;
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-display text-display-m text-ink", className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-small text-ink-muted", className)}
      {...props}
    />
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription };
