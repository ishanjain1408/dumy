import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

export const fetchNotes = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const addNote = async (title: string, content: string) => {
    const res = await axios.post(API_URL, { title, content });
    return res.data;
};

export const updateNote = async (id: number, title: string, content: string) => {
    await axios.put(`${API_URL}/${id}`, { title, content });
};

export const deleteNote = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
};
