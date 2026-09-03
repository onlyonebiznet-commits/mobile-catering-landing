import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  /** Keeps checkbox semantics while allowing the FW circular selection visual. */
  appearance?: "checkbox" | "radio";
};

function Checkbox({ className, appearance = "checkbox", ...props }: CheckboxProps) {
  const isRadioAppearance = appearance === "radio";

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer",
        isRadioAppearance
          ? "form-radio-control"
          : "form-checkbox-control border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary dark:data-[state=checked]:border-primary aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn(
          isRadioAppearance ? "form-radio-indicator" : "form-checkbox-indicator text-current transition-none"
        )}
      >
        {isRadioAppearance ? (
          <span aria-hidden="true" className="form-radio-dot" />
        ) : (
          <CheckIcon className="size-3.5" strokeWidth={2} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };

