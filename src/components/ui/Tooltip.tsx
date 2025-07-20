'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface TooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  delay?: number
}

export function Tooltip({ 
  content, 
  children, 
  position = 'top', 
  className,
  delay = 200 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const timeoutRef = useRef<NodeJS.Timeout>()
  const triggerRef = useRef<HTMLDivElement>(null)

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        let x = 0
        let y = 0

        switch (position) {
          case 'top':
            x = rect.left + rect.width / 2
            y = rect.top - 8
            break
          case 'bottom':
            x = rect.left + rect.width / 2
            y = rect.bottom + 8
            break
          case 'left':
            x = rect.left - 8
            y = rect.top + rect.height / 2
            break
          case 'right':
            x = rect.right + 8
            y = rect.top + rect.height / 2
            break
        }

        setCoords({ x, y })
        setIsVisible(true)
      }
    }, delay)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2'
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 translate-y-2'
      case 'left':
        return 'right-full top-1/2 transform -translate-x-2 -translate-y-1/2'
      case 'right':
        return 'left-full top-1/2 transform translate-x-2 -translate-y-1/2'
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2'
    }
  }

  return (
    <div 
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 px-3 py-2 text-sm font-medium',
            'bg-white/10 backdrop-blur-md border border-white/20',
            'rounded-lg shadow-lg text-white whitespace-nowrap',
            'transition-all duration-200 ease-out',
            getPositionClasses(),
            className
          )}
          style={{
            left: coords.x,
            top: coords.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {content}
          <div 
            className={cn(
              'absolute w-2 h-2 bg-white/10 border border-white/20 rotate-45',
              position === 'top' && 'top-full left-1/2 transform -translate-x-1/2 -translate-y-1',
              position === 'bottom' && 'bottom-full left-1/2 transform -translate-x-1/2 translate-y-1',
              position === 'left' && 'left-full top-1/2 transform -translate-y-1/2 translate-x-1',
              position === 'right' && 'right-full top-1/2 transform -translate-y-1/2 -translate-x-1'
            )}
          />
        </div>
      )}
    </div>
  )
} 