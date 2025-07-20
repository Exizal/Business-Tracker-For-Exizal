'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface TagProps {
  label: string
  variant?: 'default' | 'tech' | 'finance' | 'urgent' | 'low' | 'medium' | 'high' | 'critical'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  removable?: boolean
  onRemove?: () => void
}

export function Tag({
  label,
  variant = 'default',
  size = 'md',
  className,
  onClick,
  removable = false,
  onRemove
}: TagProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'tech':
        return 'bg-blue-500/20 border-blue-400/30 text-blue-200 hover:bg-blue-500/30'
      case 'finance':
        return 'bg-green-500/20 border-green-400/30 text-green-200 hover:bg-green-500/30'
      case 'urgent':
        return 'bg-red-500/20 border-red-400/30 text-red-200 hover:bg-red-500/30'
      case 'low':
        return 'bg-gray-500/20 border-gray-400/30 text-gray-200 hover:bg-gray-500/30'
      case 'medium':
        return 'bg-yellow-500/20 border-yellow-400/30 text-yellow-200 hover:bg-yellow-500/30'
      case 'high':
        return 'bg-orange-500/20 border-orange-400/30 text-orange-200 hover:bg-orange-500/30'
      case 'critical':
        return 'bg-red-600/20 border-red-500/30 text-red-100 hover:bg-red-600/30'
      default:
        return 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs'
      case 'lg':
        return 'px-4 py-2 text-base'
      default:
        return 'px-3 py-1.5 text-sm'
    }
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border',
        'backdrop-blur-sm transition-all duration-200',
        'font-medium',
        getVariantClasses(),
        getSizeClasses(),
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <span>{label}</span>
      {removable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="ml-1 hover:bg-white/10 rounded-full p-0.5 transition-colors"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

interface TagGroupProps {
  tags: Array<{
    id: string
    label: string
    variant?: TagProps['variant']
  }>
  size?: TagProps['size']
  className?: string
  onTagClick?: (tagId: string) => void
  onTagRemove?: (tagId: string) => void
  removable?: boolean
}

export function TagGroup({
  tags,
  size = 'md',
  className,
  onTagClick,
  onTagRemove,
  removable = false
}: TagGroupProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          label={tag.label}
          variant={tag.variant}
          size={size}
          onClick={() => onTagClick?.(tag.id)}
          removable={removable}
          onRemove={() => onTagRemove?.(tag.id)}
        />
      ))}
    </div>
  )
} 