"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface iAppProps {
  text: string;
  className?: string;
  loading?: boolean;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  onClick?: () => void; // Added onClick prop
}

export function SubmitButton({ text, className, variant, loading }: iAppProps) {
  const { pending } = useFormStatus();
  return (
    <>
     {pending || loading ? (
        <Button disabled className={cn("w-fit", className)} variant={variant}>
          <Loader2 className="mr-2 size-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button
          className={cn("w-fit", className)}
          variant={variant}
          type="submit"
        >
          {text}
        </Button>
      )}
    </>
  );
}