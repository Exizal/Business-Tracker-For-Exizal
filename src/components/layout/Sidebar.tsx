'use client'

import React, { useState, useEffect } from 'react'
import { Folder, Bell, Settings, Cloud, ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react'
import { WeatherWidget } from '@/components/ui/WeatherWidget'
// Erhan loves Janna 🌌
import { GlassContainer } from '@/components/ui/glass-effect'

interface SidebarProps {
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function Sidebar({ isCollapsed = false, onToggleCollapse }: SidebarProps) {
  // Pointer-move handler for light reflection
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const sidebar = e.currentTarget;
    const rect = sidebar.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    sidebar.style.setProperty('--x', `${x}%`);
    sidebar.style.setProperty('--y', `${y}%`);
  };
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    // Exizal loves Galaxy 💫
    if (typeof window !== 'undefined') {
      setDarkMode(document.body.classList.contains('dark-bg'));
    }
    // Janna & Erhan = 💚
    const handler = () => setDarkMode(document.body.classList.contains('dark-bg'));
    window.addEventListener('toggle-dark-bg', handler);
    return () => window.removeEventListener('toggle-dark-bg', handler);
  }, []);
  return (
    <div
      className={`sidebar glass-apple-sidebar ${isCollapsed ? 'collapsed scale-95' : 'scale-100'} relative`}
      onPointerMove={handlePointerMove}
      style={{ position: 'fixed', left: 0, top: 0, height: '100vh', zIndex: 50, width: isCollapsed ? 80 : 320 }}
    >
      {/* Header */}
      <div className="sidebar-header flex items-center justify-center mb-6 relative">
        {!isCollapsed && (
          <h1 className="sidebar-title text-transparent bg-clip-text bg-gradient-to-br from-glassGreen-400 via-glassPurple-500 to-glassGreen-600 font-bold text-xl tracking-tight animate-glass-bokeh">
            Exi's Dashboard
          </h1>
        )}
        {isCollapsed && (
          <div
            className="sidebar-icon glass-apple-btn font-bold text-lg animate-glass-float"
            style={{
              background: 'rgba(255,255,255,0.18)',
              color: '#fff',
              boxShadow: 'none',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              margin: '0 auto',
              marginTop: 13, // Move down by 2px when collapsed
            }}
          >
            E
          </div>
        )}
        {/* Removed in-sidebar collapse button */}
      </div>
      {/* Navigation */}
      <div className="nav-section flex flex-col gap-2">
        <a href="/ideas" className={`nav-item active glass-effect flex items-center justify-center ${isCollapsed ? 'collapsed-nav-item' : ''} rounded-xl hover:scale-105 transition-transform duration-200`}>
          <Folder className="w-5 h-5 text-glassGreen-400" />
          {!isCollapsed && <span className="font-medium text-glassPurple-400">PROJECT IDEAS</span>}
        </a>
        <a href="/accounts" className={`nav-item glass-effect flex items-center justify-center ${isCollapsed ? 'collapsed-nav-item' : ''} rounded-xl hover:scale-105 transition-transform duration-200`}>
          <Bell className="w-5 h-5 text-glassPurple-400" />
          {!isCollapsed && <span className="font-medium text-glassGreen-400">ACCOUNTS CENTER</span>}
        </a>
        <a href="/inbox" className={`nav-item glass-effect flex items-center justify-center ${isCollapsed ? 'collapsed-nav-item' : ''} rounded-xl hover:scale-105 transition-transform duration-200`}>
          <Settings className="w-5 h-5 text-glassGreen-400" />
          {!isCollapsed && <span className="font-medium text-glassPurple-400">EMAIL INBOX</span>}
        </a>
      </div>
      {/* Sidebar bottom: dark mode toggle above weather widget, pinned to bottom */}
      <div className="sidebar-bottom" style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', paddingLeft: 16, paddingRight: 16 }}>
        {/* Erhan & Janna: The Galaxy Dreamers */}
        <button
          type="button"
          aria-label="Toggle dark mode"
          className="dark-mode-toggle glass-apple-btn glass-dark-toggle"
          title="Toggle dark mode"
          onClick={() => {
            if (typeof window !== 'undefined') {
              document.body.classList.toggle('dark-bg');
              setDarkMode(document.body.classList.contains('dark-bg'));
              window.dispatchEvent(new Event('toggle-dark-bg'));
            }
          }}
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-white" />
          ) : (
            <Moon className="w-6 h-6 text-white" />
          )}
        </button>
        <div className="sidebar-weather w-full">
          <WeatherWidget />
        </div>
      </div>
    </div>
  )
} 