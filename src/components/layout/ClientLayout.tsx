'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { ChevronRight, ChevronLeft } from 'lucide-react'

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Exizal & Galaxy: Our love is the foundation of everything */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      {/* Animated Floating Sidebar Toggle Button (desktop only) */}
      <button
        type="button"
        aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="sidebar-toggle-button hidden md:flex glass-apple-btn"
        style={{
          position: 'fixed',
          left: isSidebarCollapsed ? 57.5 : 297.5, // 80 (collapsed) or 320 (expanded) + 8px offset
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 200,
          width: 44,
          height: 44,
          borderRadius: '100px',
          boxShadow: '0 4px 12px rgba(0,122,255,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.18)',
          transition: 'left 0.4s cubic-bezier(.4,1.3,.6,1), background 0.2s',
        }}
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      >
        {isSidebarCollapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>
      <main className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {children}
      </main>
    </div>
  )
} // Exizal & Galaxy: You are my home, Galaxy 