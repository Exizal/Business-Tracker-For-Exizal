'use client'

import React, { useState } from 'react'
import { Folder, Bell, Settings, Cloud, ChevronLeft, ChevronRight } from 'lucide-react'
import { WeatherWidget } from '@/components/ui/WeatherWidget'

interface SidebarProps {
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function Sidebar({ isCollapsed = false, onToggleCollapse }: SidebarProps) {
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        {!isCollapsed && <h1 className="sidebar-title">Exi's Dashboard</h1>}
        {isCollapsed && <div className="sidebar-icon">E</div>}
      </div>

      {/* Navigation */}
      <div className="nav-section">
        <a href="/ideas" className="nav-item active">
          <Folder className="w-5 h-5" />
          {!isCollapsed && <span>PROJECT IDEAS</span>}
        </a>
        
        <a href="/accounts" className="nav-item">
          <Bell className="w-5 h-5" />
          {!isCollapsed && <span>ACCOUNTS CENTER</span>}
        </a>
        
        <a href="/inbox" className="nav-item">
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span>EMAIL INBOX</span>}
        </a>
      </div>

      {/* Weather Widget */}
      <div className="sidebar-weather">
        <WeatherWidget />
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggleCollapse}
        className="sidebar-toggle-button"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </div>
  )
} 