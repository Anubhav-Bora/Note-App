import React, { useState } from 'react';

const NoteCard = ({ note, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = () => {
    onDelete(note.id);
    setShowDeleteConfirm(false);
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Note Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex-1 mr-2">
          {note.title}
        </h3>
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(note)}
              className="text-blue-600 hover:text-blue-800 transition-colors"
              title="Edit note"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Delete note"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Note Content */}
      <div className="mb-4">
        <p className="text-gray-600 whitespace-pre-wrap">
          {isExpanded ? note.content : truncateContent(note.content)}
        </p>
        {note.content.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 text-sm mt-2 focus:outline-none"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Created Date */}
      <div className="text-sm text-gray-500 border-t pt-3">
        Created: {formatDate(note.createdAt)}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h4 className="text-lg font-semibold mb-4">Confirm Delete</h4>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{note.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteCard;