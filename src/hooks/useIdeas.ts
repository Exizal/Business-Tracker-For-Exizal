import { useState, useEffect } from 'react'

interface Idea {
  id: string
  title: string
  description?: string
  status: string
  priority: string
  categoryId?: string
  tags?: string
  createdAt: string
  updatedAt: string
  category?: {
    id: string
    name: string
    color?: string
  }
}

export function useIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchIdeas = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/ideas')
      if (!response.ok) throw new Error('Failed to fetch ideas')
      const data = await response.json()
      setIdeas(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ideas')
    } finally {
      setLoading(false)
    }
  }

  const createIdea = async (ideaData: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ideaData),
      })
      if (!response.ok) throw new Error('Failed to create idea')
      const data = await response.json()
      setIdeas(prev => [data, ...prev])
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create idea')
    }
  }

  const updateIdea = async (id: string, ideaData: Partial<Idea>) => {
    try {
      const response = await fetch('/api/ideas', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...ideaData }),
      })
      if (!response.ok) throw new Error('Failed to update idea')
      const data = await response.json()
      setIdeas(prev => prev.map(idea => idea.id === id ? data : idea))
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update idea')
    }
  }

  const deleteIdea = async (id: string) => {
    try {
      const response = await fetch(`/api/ideas?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete idea')
      setIdeas(prev => prev.filter(idea => idea.id !== id))
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete idea')
    }
  }

  useEffect(() => {
    fetchIdeas()
  }, [])

  return {
    ideas,
    loading,
    error,
    createIdea,
    updateIdea,
    deleteIdea,
    refreshIdeas: fetchIdeas,
  }
} 