'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Filter, Grid, List, Plus, X, Trash2, Edit, Calendar, SortAsc, SortDesc, MoreVertical } from 'lucide-react';


import { Tag, TagGroup } from '@/components/ui/Tag';

interface Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  createdAt: string;
  tags: Array<{ id: string; label: string; variant: 'tech' | 'finance' | 'urgent' | 'low' | 'medium' | 'high' | 'critical' | 'default' }>;
}

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: 1,
      title: "AI-Powered Analytics Dashboard",
      description: "A comprehensive analytics dashboard that uses machine learning to provide insights and predictions for business metrics.",
      category: "Analytics",
      status: "In Progress",
      priority: "High",
      createdAt: "2024-01-15",
      tags: [
        { id: '1', label: 'Tech', variant: 'tech' },
        { id: '2', label: 'AI/ML', variant: 'tech' },
        { id: '3', label: 'Urgent', variant: 'urgent' }
      ]
    },
    {
      id: 2,
      title: "E-commerce Mobile App",
      description: "A modern mobile application for e-commerce with advanced features like AR product visualization and AI recommendations.",
      category: "E-commerce",
      status: "Completed",
      priority: "Medium",
      createdAt: "2024-01-16",
      tags: [
        { id: '4', label: 'Mobile', variant: 'tech' },
        { id: '5', label: 'Finance', variant: 'finance' }
      ]
    },
    {
      id: 3,
      title: "Productivity Task Manager",
      description: "A smart task management system that integrates with calendar, email, and project management tools.",
      category: "Productivity",
      status: "Planning",
      priority: "Low",
      createdAt: "2024-01-17",
      tags: [
        { id: '6', label: 'Productivity', variant: 'default' }
      ]
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'progress'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: '',
    priority: '',
    tags: [] as Array<{ id: string; label: string; variant: 'tech' | 'finance' | 'urgent' | 'low' | 'medium' | 'high' | 'critical' | 'default' }>
  });
  
  // Comments state
  const [comments, setComments] = useState<Array<{
    id: string;
    ideaId: number;
    text: string;
    author: string;
    timestamp: string;
  }>>([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  // Filter and sort ideas
  const filteredAndSortedIdeas = ideas
    .filter(idea => {
      const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           idea.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || idea.category === selectedCategory;
      const matchesStatus = !selectedStatus || idea.status === selectedStatus;
      const matchesPriority = !selectedPriority || idea.priority === selectedPriority;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'priority':
          const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
          comparison = priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
          break;
               case 'progress':
         // Since we removed progress, sort by date instead
         comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
         break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleAddIdea = () => {
    if (formData.title && formData.description && formData.category && formData.status && formData.priority) {
      const newIdea: Idea = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        status: formData.status,
        priority: formData.priority,
        createdAt: new Date().toISOString().split('T')[0],
        tags: formData.tags
      };
      setIdeas([...ideas, newIdea]);
      setFormData({ title: '', description: '', category: '', status: '', priority: '', tags: [] });
      setShowAddModal(false);
    }
  };

  const handleDeleteIdea = () => {
    if (selectedIdea) {
      setIdeas(ideas.filter(idea => idea.id !== selectedIdea.id));
      setShowDeleteModal(false);
      setSelectedIdea(null);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && selectedIdea) {
      const comment = {
        id: Date.now().toString(),
        ideaId: selectedIdea.id,
        text: newComment.trim(),
        author: 'You',
        timestamp: new Date().toISOString()
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleEditIdea = () => {
    // TODO: Implement edit functionality
    console.log('Edit idea:', selectedIdea);
  };

  const handleCardClick = (idea: Idea) => {
    setSelectedIdea(idea);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedIdea(null);
  };

  // Drag and drop functionality
  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === targetId) return;

    const draggedIndex = ideas.findIndex(idea => idea.id === draggedItem);
    const targetIndex = ideas.findIndex(idea => idea.id === targetId);
    
    const newIdeas = [...ideas];
    const [draggedIdea] = newIdeas.splice(draggedIndex, 1);
    newIdeas.splice(targetIndex, 0, draggedIdea);
    
    setIdeas(newIdeas);
    setDraggedItem(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Planning': return 'bg-yellow-500';
      case 'On Hold': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="ideas-page">
      {/* Search and Filter Controls */}
      <div className="search-filter-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search ideas..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="search-icon" size={20} />
        </div>
        
        <div className="filter-controls">
          <select
            className="form-input form-select filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Analytics">Analytics</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Productivity">Productivity</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>

          <select
            className="form-input form-select filter-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>

          <select
            className="form-input form-select filter-select"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

          <div className="sort-controls">
            <select
              className="form-input form-select sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'progress')}
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="progress">Sort by Progress</option>
            </select>
            
            <button
              className="glass-button sort-button"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
            </button>
          </div>
        </div>
        
        <div className="view-toggle">
          <button
            className={`${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={18} />
          </button>
          <button
            className={`${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={18} />
          </button>
        </div>
        
        <div className="add-button-container">
          <button
            className="glass-button add-button"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={18} />
            Add Idea
          </button>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className={`content-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
        {filteredAndSortedIdeas.map((idea) => (
          <div
            key={idea.id}
            className="content-card"
            draggable
            onDragStart={(e) => handleDragStart(e, idea.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, idea.id)}
            onClick={() => handleCardClick(idea)}
          >
            <div className="card-header">
              <div className="card-title-section">
                <h3 className="card-title">{idea.title}</h3>
                <div className="card-badges">
                  <span className={`priority-badge ${getPriorityColor(idea.priority)}`}>
                    {idea.priority}
                  </span>
                  <span className={`status-badge ${getStatusColor(idea.status)}`}>
                    {idea.status}
                  </span>
                </div>
              </div>
              
              <div className="card-actions">
                <button
                  className="card-action-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle edit
                  }}
                >
                  <Edit size={16} />
                </button>
                <button
                  className="card-action-button delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIdea(idea);
                    setShowDeleteModal(true);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="card-description-section">
              <p className="card-description">{idea.description}</p>
            </div>



            <div className="card-tags-section">
              <TagGroup tags={idea.tags} size="sm" />
            </div>

            <div className="card-footer">
              <div className="card-category-section">
                <span className="card-category">{idea.category}</span>
              </div>
              <div className="card-date">
                <Calendar size={14} />
                <span>{idea.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Idea Modal */}
      {showAddModal && (
        <div className="modal-overlay active" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add New Idea</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-form">
              <div className="form-group">
                <label className="form-label required">Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter idea title"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label required">Description</label>
                <textarea
                  className="form-input form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your idea"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label required">Category</label>
                  <select
                    className="form-input form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Select category</option>
                    <option value="Analytics">Analytics</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label required">Status</label>
                  <select
                    className="form-input form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="">Select status</option>
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label required">Priority</label>
                <select
                  className="form-input form-select"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="">Select priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>
            
            <div className="modal-actions">
              <button
                className="glass-button"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="glass-button primary"
                onClick={handleAddIdea}
              >
                Add Idea
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Idea Detail Modal */}
      {showDetailModal && selectedIdea && (
        <div className="modal-overlay active" onClick={closeDetailModal}>
          <div className="expanded-modal-container">
            {/* Main Modal Content */}
            <div className="modal-content expanded-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">{selectedIdea.title}</h2>
                <button className="modal-close" onClick={closeDetailModal}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="modal-section">
                <h3 className="modal-section-title">Description</h3>
                <div className="modal-section-content">
                  {selectedIdea.description}
                </div>
              </div>
              
              <div className="modal-section">
                <h3 className="modal-section-title">Tags</h3>
                <div className="modal-section-content">
                  <TagGroup tags={selectedIdea.tags} />
                </div>
              </div>
              
              <div className="modal-section">
                <h3 className="modal-section-title">Details</h3>
                <div className="modal-details-grid">
                  <div className="modal-detail-item">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{selectedIdea.category}</span>
                  </div>
                  <div className="modal-detail-item">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value">{selectedIdea.status}</span>
                  </div>
                  <div className="modal-detail-item">
                    <span className="detail-label">Priority:</span>
                    <span className="detail-value">{selectedIdea.priority}</span>
                  </div>
                  <div className="modal-detail-item">
                    <span className="detail-label">Created:</span>
                    <span className="detail-value">{selectedIdea.createdAt}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="modal-actions">
                <button
                  className="glass-button primary"
                  onClick={handleEditIdea}
                >
                  EDIT IDEA
                </button>
                <button
                  className="glass-button"
                  onClick={() => setShowComments(!showComments)}
                >
                  add comment
                </button>
              </div>
            </div>
            
            {/* Comments Widget */}
            {showComments && (
              <div className="comments-widget" onClick={(e) => e.stopPropagation()}>
                <div className="comments-header">
                  <h3>Comments</h3>
                  <button 
                    className="comments-close"
                    onClick={() => setShowComments(false)}
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="comments-list">
                  {comments
                    .filter(comment => comment.ideaId === selectedIdea.id)
                    .map(comment => (
                      <div key={comment.id} className="comment-item">
                        <div className="comment-header">
                          <span className="comment-author">{comment.author}</span>
                          <span className="comment-date">
                            {new Date(comment.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="comment-text">{comment.text}</div>
                      </div>
                    ))}
                </div>
                
                <div className="comment-input-section">
                  <textarea
                    className="comment-input"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <button
                    className="glass-button primary"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedIdea && (
        <div className="modal-overlay active" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Idea</h2>
              <button className="modal-close" onClick={() => setShowDeleteModal(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-section">
              <p className="delete-message">
                Are you sure you want to delete "<strong>{selectedIdea.title}</strong>"? 
                This action cannot be undone.
              </p>
            </div>
            
            <div className="modal-actions">
              <button
                className="glass-button"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="glass-button danger"
                onClick={handleDeleteIdea}
              >
                Delete Idea
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 