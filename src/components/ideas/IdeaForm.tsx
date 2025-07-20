'use client'

import React, { useState } from 'react'
import { GlassCard, GlassButton } from '@/components/ui/glass-effect'

interface IdeaFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export function IdeaForm({ onSubmit, initialData }: IdeaFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'draft',
    priority: initialData?.priority || 'medium',
    categoryId: initialData?.categoryId || '',
    tags: initialData?.tags || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <GlassCard className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Enter idea title"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 h-32"
            placeholder="Describe your idea"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="draft">Draft</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-white mb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Enter tags (comma separated)"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <GlassButton
            type="button"
            variant="dark"
            className="text-white"
            onClick={() => window.history.back()}
          >
            Cancel
          </GlassButton>
          <GlassButton type="submit" className="text-white">
            {initialData ? 'Update' : 'Create'} Idea
          </GlassButton>
        </div>
      </form>
    </GlassCard>
  )
} 