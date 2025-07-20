'use client'

import React, { useState } from 'react'
import { 
  LightbulbIcon, 
  Clock, 
  Tag, 
  Edit, 
  Trash2, 
  Plus,
  Paperclip,
  Link,
  MessageSquare
} from 'lucide-react'

export default function IdeaPage({ params }: { params: { id: string } }) {
  const [showAddNoteModal, setShowAddNoteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  return (
    <div className="p-6">
      {/* Idea Header */}
      <div className="bg-[#1a222c] rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center">
              <LightbulbIcon className="w-6 h-6 text-teal-500" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">AI Task Manager</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-400">Technology</span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Created 2 days ago
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowEditModal(true)}
              className="p-2 hover:bg-gray-700 rounded"
            >
              <Edit className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded">
              <Trash2 className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <p className="text-gray-400 mb-6">
          An AI-powered task management system that automatically prioritizes and organizes tasks based on user behavior and preferences. The system will learn from how users interact with their tasks and adjust organization accordingly.
        </p>

        <div className="flex items-center gap-4">
          <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-500 text-sm">In Progress</span>
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-500 text-sm">High Priority</span>
        </div>
      </div>

      {/* Notes and Attachments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notes Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Notes</h2>
            <button
              onClick={() => setShowAddNoteModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Note
            </button>
          </div>

          {/* Notes List */}
          <div className="space-y-4">
            {[1, 2, 3].map((note) => (
              <div key={note} className="bg-[#1a222c] rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">2 hours ago</span>
                  </div>
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <Trash2 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <p className="text-gray-300">
                  Research existing AI task management solutions and identify key features to implement.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Attachments and Links Section */}
        <div className="space-y-6">
          {/* Attachments */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Attachments</h2>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm">
                <Paperclip className="w-4 h-4" />
                Add File
              </button>
            </div>
            <div className="bg-[#1a222c] rounded-lg p-4">
              <div className="space-y-3">
                {[1, 2].map((file) => (
                  <div key={file} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">mockup-v1.fig</span>
                    </div>
                    <button className="p-1 hover:bg-gray-700 rounded">
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Links</h2>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm">
                <Link className="w-4 h-4" />
                Add Link
              </button>
            </div>
            <div className="bg-[#1a222c] rounded-lg p-4">
              <div className="space-y-3">
                {[1, 2].map((link) => (
                  <div key={link} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link className="w-4 h-4 text-gray-400" />
                      <a href="#" className="text-teal-500 hover:underline">Research Document</a>
                    </div>
                    <button className="p-1 hover:bg-gray-700 rounded">
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Note Modal */}
      {showAddNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#1a222c] rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Add Note</h2>
            <form className="space-y-4">
              <div>
                <textarea
                  className="w-full bg-[#141b24] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500 h-32"
                  placeholder="Write your note..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddNoteModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 