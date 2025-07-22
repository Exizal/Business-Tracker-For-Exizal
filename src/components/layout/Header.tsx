'use client'

import React from 'react'
import { Search, Bell, Mail, User, Menu } from 'lucide-react'
import { GlassContainer } from '@/components/ui/glass-effect'

export function Header() {
  return (
    <GlassContainer
      variant="gradient"
      elevation="high"
      className="w-full px-8 py-4 flex items-center justify-between shadow-glass backdrop-blur-xl animate-glass-float"
    >
      {/* Left side */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-glassGreen-400 via-glassPurple-500 to-glassGreen-600 font-bold text-2xl tracking-tight select-none animate-glass-bokeh">ExisLife</span>
          <Menu className="w-6 h-6 text-glassPurple-400 cursor-pointer hover:scale-110 hover:text-glassGreen-400 transition-transform duration-200" />
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-glassPurple-400/70" />
          <input
            type="text"
            placeholder="Search for..."
            className="search-bar pl-12 w-80 glass-effect bg-white/10 border border-glassPurple-400/20 rounded-full text-base focus:ring-2 focus:ring-glassGreen-400 transition-all duration-200"
          />
        </div>
      </div>
      {/* Right side */}
      <div className="flex items-center space-x-6">
        <span className="text-glassPurple-400 text-sm hidden md:block">
          Have questions? <span className="font-semibold">contact@exislife.com</span>
        </span>
        <div className="flex items-center space-x-3">
          <button className="glass-button w-10 h-10 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 group">
            <Bell className="w-5 h-5 text-glassPurple-400 group-hover:text-glassGreen-400 transition-colors" />
          </button>
          <button className="glass-button w-10 h-10 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 group">
            <Mail className="w-5 h-5 text-glassGreen-400 group-hover:text-glassPurple-400 transition-colors" />
          </button>
          <button className="glass-button w-10 h-10 flex items-center justify-center bg-gradient-to-br from-glassPurple-500 to-glassGreen-400 hover:shadow-glassStrong transition-all duration-300">
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </GlassContainer>
  )
} 