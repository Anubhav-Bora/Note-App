import React, { useState, useEffect } from 'react';
import { notesAPI } from './services/api';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import SearchBar from './components/searchbar';

function App() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [error, setError] = useState('');

  const getAllTags = (notesList) => {
    const allTags = notesList.flatMap(note => note.tags || []);
    return [...new Set(allTags)].sort();
  };

  const fetchNotes = async (filters = {}) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await notesAPI.getNotes(filters);
      setNotes(response.data);
      setFilteredNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to load notes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    applyFilters(term, selectedTag);
  };

  const handleTagFilter = (tag) => {
    setSelectedTag(tag);
    applyFilters(searchTerm, tag);
  };

  const applyFilters = async (search, tag) => {
    const filters = {};
    if (search) filters.search = search;
    if (tag) filters.tag = tag;
    
    await fetchNotes(filters);
  };

  const handleCreateNote = async (noteData) => {
    try {
      const response = await notesAPI.createNote(noteData);
      await fetchNotes({ search: searchTerm, tag: selectedTag });
      setError('');
    } catch (error) {
      console.error('Error creating note:', error);
      setError('Failed to create note. Please try again.');
      throw error;
    }
  };

  const handleEditNote = async (noteData) => {
    try {
      await notesAPI.updateNote(editingNote.id, noteData);
      setEditingNote(null);
      await fetchNotes({ search: searchTerm, tag: selectedTag });
      setError('');
    } catch (error) {
      console.error('Error updating note:', error);
      setError('Failed to update note. Please try again.');
      throw error;
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await notesAPI.deleteNote(noteId);
      await fetchNotes({ search: searchTerm, tag: selectedTag });
      setError('');
    } catch (error) {
      console.error('Error deleting note:', error);
      setError('Failed to delete note. Please try again.');
    }
  };

  const startEditing = (note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditing = () => {
    setEditingNote(null);
  };

  const availableTags = getAllTags(notes);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📝 My Notes App
          </h1>
          <p className="text-gray-600">
            Create, organize, and search your personal notes
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}

        <NoteForm
          onSubmit={editingNote ? handleEditNote : handleCreateNote}
          editNote={editingNote}
          onCancel={editingNote ? cancelEditing : null}
          availableTags={availableTags}
        />

        <SearchBar
          onSearch={handleSearch}
          onTagFilter={handleTagFilter}
          availableTags={availableTags}
        />

        <NoteList
          notes={filteredNotes}
          onDelete={handleDeleteNote}
          onEdit={startEditing}
          isLoading={isLoading}
        />

        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Built with React.js and Node.js
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;