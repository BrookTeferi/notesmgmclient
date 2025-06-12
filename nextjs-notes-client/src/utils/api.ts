import axios from 'axios';

const API_BASE = 'http://localhost:5033'; // No trailing slash

export interface RegisterUserData {
    username: string;
    password: string;
}

export const registerUser = async (userData: RegisterUserData) => {
    const response = await axios.post(`${API_BASE}/api/auth/register`, userData);
    return response.data;
};

export interface LoginCredentials {
    username: string;
    password: string;
}

// Store JWT token after login
export const loginUser = async (credentials: LoginCredentials) => {
    const response = await axios.post(`${API_BASE}/api/auth/login`, credentials);
    // Store the accessToken (not 'token')
    const { accessToken } = response.data;
    if (accessToken) {
        localStorage.setItem('jwt_token', accessToken);
    }
    return response.data;
};

// Helper to get auth header
const getAuthHeader = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const refreshToken = async () => {
    const response = await axios.post(`${API_BASE}/api/auth/refresh`, {}, { withCredentials: true });
    return response.data;
};

export const fetchNotes = async () => {
    const response = await axios.get(`${API_BASE}/api/Notes`, { headers: getAuthHeader() });
    return response.data;
};

export interface NoteData {
    title: string;
    content: string;
}

export const createNote = async (noteData: NoteData) => {
    const response = await axios.post(`${API_BASE}/api/Notes`, noteData, { headers: getAuthHeader() });
    return response.data;
};

export const fetchNoteById = async (id: string | number) => {
    const response = await axios.get(`${API_BASE}/api/Notes/${id}`, { headers: getAuthHeader() });
    return response.data;
};

export const updateNote = async (id: string | number, noteData: NoteData) => {
    const response = await axios.put(`${API_BASE}/api/Notes/${id}`, noteData, { headers: getAuthHeader() });
    return response.data;
};

export const deleteNote = async (id: string | number) => {
    const response = await axios.delete(`${API_BASE}/api/Notes/${id}`, { headers: getAuthHeader() });
    return response.data;
};

export const fetchNotesByUser = async (userId: string | number) => {
    const response = await axios.get(`${API_BASE}/api/Notes?userId=${userId}`, { headers: getAuthHeader() });
    return response.data;
};