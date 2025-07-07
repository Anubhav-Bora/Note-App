import React, { useState, useEffect } from 'react';

const NoteForm = ({ onSubmit, editNote, onCancel, availableTags = [] }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (editNote) {
      setFormData({
        title: editNote.title,
        content: editNote.content,
        tags: editNote.tags || []
      });
    }
  }, [editNote]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagInputChange = (e) => {
    const value = e.target.value;
    setTagInput(value);
    setShowTagSuggestions(value.length > 0);
  };

  const addTag = (tag) => {
    const cleanTag = tag.trim().toLowerCase();
    if (cleanTag && !formData.tags.includes(cleanTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, cleanTag]
      }));
    }
    setTagInput('');
    setShowTagSuggestions(false);
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (tagInput.trim()) {
        addTag(tagInput.trim());
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    let tags = formData.tags;
    if (tagInput.trim()) {
      const cleanTag = tagInput.trim().toLowerCase();
      if (!tags.includes(cleanTag)) {
        tags = [...tags, cleanTag];
      }
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        tags,
      });
      if (!editNote) {
        setFormData({
          title: '',
          content: '',
          tags: []
        });
        setTagInput('');
      }
    } catch (error) {
      console.error('Error submitting note:', error);
      alert('Error saving note. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredSuggestions = availableTags.filter(tag =>
    tag.toLowerCase().includes(tagInput.toLowerCase()) &&
    !formData.tags.includes(tag)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {editNote ? 'Edit Note' : 'Add New Note'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter note title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>


        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Enter note content..."
            rows="6"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            required
          />
        </div>


        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <div className="relative">
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              placeholder="Add tags (press Enter or comma to add)..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            

            {showTagSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
                {filteredSuggestions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>


        {formData.tags.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Tags:
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}


        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Saving...' : (editNote ? 'Update Note' : 'Add Note')}
          </button>
          
          {editNote && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteForm;