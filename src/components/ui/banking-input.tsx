import * as React from "react"
import { cn } from "@/lib/utils"

export interface BankingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const BankingInput = React.forwardRef<HTMLInputElement, BankingInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "banking-input",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
BankingInput.displayName = "BankingInput"

export { BankingInput }