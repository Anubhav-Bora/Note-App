const express = require('express');
const Note=require('../models/Note');
const router=express.Router();
let notes=[];

router.get('/', (req, res) => {
    try {
      const { tag, search } = req.query;
      let filteredNotes = notes;
  
      if (tag) {
        filteredNotes = filteredNotes.filter(note => 
          note.tags.some(noteTag => 
            noteTag.toLowerCase().includes(tag.toLowerCase())
          )
        );
      }
      if (search) {
        filteredNotes = filteredNotes.filter(note => 
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.content.toLowerCase().includes(search.toLowerCase())
        );
      }
      filteredNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      res.json(filteredNotes);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });  


router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const note = notes.find(note => note.id === id);
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

  router.post('/', (req, res) => {
    try {
      const { title, content, tags } = req.body;
      

      const validation = Note.validateNote({ title, content });
      if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
      }
  
      const processedTags = tags 
        ? [...new Set(tags.map(tag => tag.trim()).filter(tag => tag !== ''))]
        : [];
  
      const newNote = new Note(title.trim(), content.trim(), processedTags);
      notes.push(newNote);
  
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.delete('/:id', (req, res) => {
    try {
      const { id } = req.params;
      const noteIndex = notes.findIndex(note => note.id === id);
  
      if (noteIndex === -1) {
        return res.status(404).json({ error: 'Note not found' });
      }
  
      notes.splice(noteIndex, 1);
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.put('/:id', (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, tags } = req.body;
      
      const noteIndex = notes.findIndex(note => note.id === id);
      
      if (noteIndex === -1) {
        return res.status(404).json({ error: 'Note not found' });
      }

      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }
  
      const validation = Note.validateNote({ title, content });
      if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
      }
  
      const processedTags = tags 
        ? [...new Set(tags.map(tag => tag.trim()).filter(tag => tag !== ''))]
        : [];
  
      notes[noteIndex].update({
        title: title.trim(),
        content: content.trim(),
        tags: processedTags
      });
  
      res.json(notes[noteIndex]);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;
