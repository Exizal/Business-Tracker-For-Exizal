'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  progress: number
  total: number
  className?: string
  showPercentage?: boolean
  variant?: 'default' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressBar({
  progress,
  total,
  className,
  showPercentage = true,
  variant = 'default',
  size = 'md'
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100)

  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-gradient-to-r from-green-400 to-green-500'
      case 'warning':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500'
      case 'danger':
        return 'bg-gradient-to-r from-red-400 to-red-500'
      default:
        return 'bg-gradient-to-r from-blue-400 to-teal-400'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-2'
      case 'lg':
        return 'h-4'
      default:
        return 'h-3'
    }
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-white/80">
          Progress
        </span>
        {showPercentage && (
          <span className="text-sm font-medium text-white/80">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      
      <div className={cn(
        'w-full bg-white/10 backdrop-blur-sm rounded-full overflow-hidden',
        'border border-white/20',
        getSizeClasses()
      )}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            'relative overflow-hidden',
            getVariantClasses()
          )}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-white/60 mt-1">
        <span>{progress} completed</span>
        <span>{total} total</span>
      </div>
    </div>
  )
}

interface DonutChartProps {
  progress: number
  total: number
  size?: number
  strokeWidth?: number
  className?: string
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

export function DonutChart({
  progress,
  total,
  size = 60,
  strokeWidth = 4,
  className,
  variant = 'default'
}: DonutChartProps) {
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getVariantColor = () => {
    switch (variant) {
      case 'success':
        return '#10b981'
      case 'warning':
        return '#f59e0b'
      case 'danger':
        return '#ef4444'
      default:
        return '#3b82f6'
    }
  }

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getVariantColor()}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium text-white">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  )
} 