'use client'

import React from 'react'
import { GlassCard } from '@/components/ui/glass-effect'
import { 
  Twitter, 
  Linkedin, 
  Instagram, 
  Facebook, 
  Youtube,
  Globe
} from 'lucide-react'

interface SocialAccountCardProps {
  platform: string
  username: string
  profileUrl?: string
  onConnect?: () => void
  onDisconnect?: () => void
  isConnected?: boolean
}

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  default: Globe,
}

export function SocialAccountCard({
  platform,
  username,
  profileUrl,
  onConnect,
  onDisconnect,
  isConnected = false,
}: SocialAccountCardProps) {
  const Icon = platformIcons[platform.toLowerCase() as keyof typeof platformIcons] || platformIcons.default
  
  const getPlatformColor = (platform: string) => {
    const colors = {
      twitter: 'from-blue-400 to-blue-600',
      linkedin: 'from-blue-600 to-blue-800',
      instagram: 'from-pink-500 via-purple-500 to-orange-500',
      facebook: 'from-blue-500 to-blue-700',
      youtube: 'from-red-500 to-red-700',
      default: 'from-gray-500 to-gray-700',
    }
    return colors[platform.toLowerCase() as keyof typeof colors] || colors.default
  }

  return (
    <GlassCard className="relative overflow-hidden group">
      <div className={`absolute inset-0 bg-gradient-to-br ${getPlatformColor(platform)} opacity-10 group-hover:opacity-20 transition-opacity`} />
      
      <div className="relative p-6">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full bg-gradient-to-br ${getPlatformColor(platform)}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-white capitalize">
              {platform}
            </h3>
            <p className="text-white/80">@{username}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          {profileUrl && (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              View Profile
            </a>
          )}
          
          {isConnected ? (
            <button
              onClick={onDisconnect}
              className="px-4 py-2 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={onConnect}
              className="px-4 py-2 rounded-full bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors"
            >
              Connect
            </button>
          )}
        </div>
      </div>
    </GlassCard>
  )
} 