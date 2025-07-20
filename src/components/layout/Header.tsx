'use client'

import React from 'react'
import { Search, Bell, Mail, User, Menu } from 'lucide-react'

export function Header() {
  return (
    <div className="header-bar">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <span className="text-gradient font-bold text-xl">ExisLife</span>
            <Menu className="w-5 h-5 text-[--text-secondary] cursor-pointer hover:text-[--text-primary] transition-colors" />
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[--text-muted]" />
            <input
              type="text"
              placeholder="Search for..."
              className="search-bar pl-12 w-80"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-6">
          <span className="text-[--text-secondary] text-sm hidden md:block">
            Have questions? contact@exislife.com
          </span>
          <div className="flex items-center space-x-3">
            <button className="w-10 h-10 rounded-full bg-[--glass-bg] border border-[--border-light] flex items-center justify-center hover:bg-[--purple-500] hover:border-[--purple-500] transition-all duration-300 group">
              <Bell className="w-4 h-4 text-[--text-secondary] group-hover:text-white transition-colors" />
            </button>
            <button className="w-10 h-10 rounded-full bg-[--glass-bg] border border-[--border-light] flex items-center justify-center hover:bg-[--green-500] hover:border-[--green-500] transition-all duration-300 group">
              <Mail className="w-4 h-4 text-[--text-secondary] group-hover:text-white transition-colors" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-[--purple-500] to-[--green-500] flex items-center justify-center hover:shadow-glow transition-all duration-300">
              <User className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 