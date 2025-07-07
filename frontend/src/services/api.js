import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const notesAPI = {
  getNotes: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.search) {
      queryParams.append('search', params.search);
    }
    
    if (params.tag) {
      queryParams.append('tag', params.tag);
    }
    
    const url = `/notes${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return api.get(url);
  },

  createNote: (noteData) => {
    return api.post('/notes', noteData);
  },

  updateNote: (id, noteData) => {
    return api.put(`/notes/${id}`, noteData);
  },

  deleteNote: (id) => {
    return api.delete(`/notes/${id}`);
  },
};

export default api;