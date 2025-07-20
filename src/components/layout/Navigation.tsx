'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GlassButton } from '@/components/ui/glass-effect'
import { 
  LightbulbIcon, 
  ShareIcon, 
  BarChartIcon,
  HomeIcon
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/ideas', label: 'Ideas', icon: LightbulbIcon },
  { href: '/social', label: 'Social', icon: ShareIcon },
  { href: '/analytics', label: 'Analytics', icon: BarChartIcon },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full p-2 border border-white/20">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          
          return (
            <Link key={href} href={href}>
              <GlassButton
                variant={isActive ? 'default' : 'dark'}
                className={`
                  flex items-center space-x-2 px-4
                  ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </GlassButton>
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 