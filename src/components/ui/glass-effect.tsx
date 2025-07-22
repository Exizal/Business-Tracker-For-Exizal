'use client'

import React from 'react'
import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

const glassVariants = cva(
  "relative glass-effect border transition-glass duration-300",
  {
    variants: {
      variant: {
        default: "bg-glass-gradient border-white/20 hover:bg-glass-gradient-2",
        dark: "bg-glass-gradient border-black/20 hover:bg-glass-gradient-2",
        gradient: "bg-glass-gradient border-glassPurple-400/30 hover:bg-glass-gradient-2",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
      elevation: {
        default: "shadow-glass",
        high: "shadow-glassStrong",
        none: "",
      }
    },
    defaultVariants: {
      variant: "gradient",
      size: "default",
      elevation: "default",
    }
  }
)

interface GlassProps extends VariantProps<typeof glassVariants> {
  children: React.ReactNode
  className?: string
}

export function GlassContainer({
  children,
  variant,
  size,
  elevation,
  className,
}: GlassProps) {
  return (
    <div className={cn(glassVariants({ variant, size, elevation }), className)}>
      {children}
    </div>
  )
}

export function GlassCard({
  children,
  className,
  ...props
}: GlassProps) {
  return (
    <GlassContainer
      className={cn("overflow-hidden", className)}
      {...props}
    >
      {children}
    </GlassContainer>
  )
}

export function GlassButton({
  children,
  className,
  ...props
}: GlassProps) {
  return (
    <GlassContainer
      size="sm"
      className={cn(
        "inline-flex items-center justify-center",
        "cursor-pointer active:scale-95",
        "hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </GlassContainer>
  )
} 