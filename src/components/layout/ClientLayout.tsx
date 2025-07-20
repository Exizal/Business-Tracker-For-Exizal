'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {children}
      </main>
    </div>
  )
} 