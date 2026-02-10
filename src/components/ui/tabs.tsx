"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* â”€â”€â”€ Context â”€â”€â”€ */
const TabsContext = React.createContext<{
  value: string;
  onChange: (v: string) => void;
}>({ value: "", onChange: () => {} });

/* â”€â”€â”€ Root â”€â”€â”€ */
function Tabs({
  value,
  onValueChange,
  children,
  className,
}: {
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TabsContext.Provider value={{ value, onChange: onValueChange }}>
      <div className={cn("flex flex-col", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

/* â”€â”€â”€ Tab list â”€â”€â”€ */
function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 p-1 border border-zinc-300 dark:border-zinc-700/40",
        className
      )}
    >
      {children}
    </div>
  );
}

/* â”€â”€â”€ Tab trigger â”€â”€â”€ */
function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(TabsContext);
  const active = ctx.value === value;
  return (
    <button
      onClick={() => ctx.onChange(value)}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
        active
          ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm border border-zinc-300/80 dark:border-zinc-700/50"
          : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300",
        className
      )}
    >
      {children}
    </button>
  );
}

/* â”€â”€â”€ Tab content panel â”€â”€â”€ */
function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(TabsContext);
  if (ctx.value !== value) return null;
  return <div className={cn("mt-3", className)}>{children}</div>;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
