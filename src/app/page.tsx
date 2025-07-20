'use client'

import React from 'react'

const ideas = [
  {
    id: 1,
    title: 'AI-Powered Task Manager',
    description: 'An intelligent task management system that learns from user behavior',
    category: 'Productivity',
    status: 'In Progress',
    priority: 'High'
  },
  {
    id: 2,
    title: 'Social Media Analytics Dashboard',
    description: 'Comprehensive analytics for multiple social media platforms',
    category: 'Analytics',
    status: 'Planning',
    priority: 'Medium'
  },
  {
    id: 3,
    title: 'E-commerce Mobile App',
    description: 'Modern mobile shopping experience with AR try-on features',
    category: 'E-commerce',
    status: 'Completed',
    priority: 'High'
  },
  {
    id: 4,
    title: 'Health Tracking Platform',
    description: 'Personalized health monitoring with AI insights',
    category: 'Health',
    status: 'Planning',
    priority: 'Medium'
  },
  {
    id: 5,
    title: 'Smart Home Automation',
    description: 'IoT-based home automation with voice control',
    category: 'IoT',
    status: 'In Progress',
    priority: 'Low'
  },
  {
    id: 6,
    title: 'Learning Management System',
    description: 'Modern LMS with AI-powered recommendations',
    category: 'Education',
    status: 'Planning',
    priority: 'High'
  }
]

export default function Dashboard() {
  return (
    <div className="content-grid">
      {ideas.map((idea) => (
        <div key={idea.id} className="content-card">
          <div className="card-divider"></div>
          <div className="card-content">
            <h3 className="text-[--text-primary] font-semibold text-lg mb-2">{idea.title}</h3>
            <p className="text-[--text-secondary] text-sm mb-3">{idea.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[--teal-500] text-white text-xs rounded-full font-medium">
                {idea.category}
              </span>
              <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                idea.status === 'Completed' ? 'bg-[--teal-500] text-white' :
                idea.status === 'In Progress' ? 'bg-[--teal-400] text-white' :
                'bg-[--glass-bg] text-[--text-secondary]'
              }`}>
                {idea.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 