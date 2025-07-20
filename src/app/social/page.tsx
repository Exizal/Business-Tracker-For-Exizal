'use client'

import React, { useState } from 'react'
import { Twitter, Linkedin, Instagram, Facebook, Plus, ExternalLink, Trash2 } from 'lucide-react'

interface SocialAccount {
  id: string
  platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook'
  username: string
  profileUrl: string
  status: 'connected' | 'disconnected'
}

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
}

const platformColors = {
  twitter: '#1DA1F2',
  linkedin: '#0A66C2',
  instagram: '#E4405F',
  facebook: '#1877F2',
}

export default function SocialAccountsPage() {
  const [showConnectModal, setShowConnectModal] = useState(false)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Social Accounts</h1>
        <button
          onClick={() => setShowConnectModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Connect Account
        </button>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Account Card */}
        {Object.entries(platformIcons).map(([platform, Icon]) => (
          <div key={platform} className="bg-[#1a222c] rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${platformColors[platform as keyof typeof platformColors]}20` }}
                >
                  <Icon 
                    className="w-5 h-5"
                    style={{ color: platformColors[platform as keyof typeof platformColors] }}
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium capitalize">{platform}</h3>
                  <span className="text-sm text-gray-400">Not Connected</span>
                </div>
              </div>
              <button className="p-1 hover:bg-gray-700 rounded">
                <Trash2 className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <button className="w-full mt-4 py-2 flex items-center justify-center gap-2 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
              <Plus className="w-4 h-4" />
              Connect Account
            </button>
          </div>
        ))}
      </div>

      {/* Connect Account Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#1a222c] rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Connect Social Account</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1">Platform</label>
                <select className="w-full bg-[#141b24] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500">
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowConnectModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 