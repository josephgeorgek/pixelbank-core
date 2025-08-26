import * as React from "react"
import { cn } from "@/lib/utils"

const BankingCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "banking-card",
      className
    )}
    {...props}
  />
))
BankingCard.displayName = "BankingCard"

const BankingCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
BankingCardHeader.displayName = "BankingCardHeader"

const BankingCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-banking-title leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
BankingCardTitle.displayName = "BankingCardTitle"

const BankingCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-banking-subtitle", className)}
    {...props}
  />
))
BankingCardDescription.displayName = "BankingCardDescription"

const BankingCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
BankingCardContent.displayName = "BankingCardContent"

const BankingCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
BankingCardFooter.displayName = "BankingCardFooter"

export {
  BankingCard,
  BankingCardHeader,
  BankingCardFooter,
  BankingCardTitle,
  BankingCardDescription,
  BankingCardContent,
}