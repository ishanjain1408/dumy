import { createContext, useState, useEffect } from "react";
import axios from "axios";

export interface Note {
    id: number;
    title: string;
    content: string;
}

interface NotesContextType {
    notes: Note[];
    addNote: (title: string, content: string) => void;
    updateNote: (id: number, content: string) => void;
    deleteNote: (id: number) => void;
}

export const NotesContext = createContext<NotesContextType | null>(null);
const NotesProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get("http://localhost:5000/notes");
                setNotes(res.data);
            } catch (err) {
                console.error("Error fetching notes:", err);
            }
        };

        fetchNotes();
    }, []);

    const addNote = async (title: string, content: string) => {
        try {
            const res = await axios.post("http://localhost:5000/notes", { title, content });
            setNotes((prevNotes) => [...prevNotes, res.data]);
        } catch (err) {
            console.error("Error adding note:", err);
        }
    };

    const updateNote = async (id: number, content: string) => {
        const noteToUpdate = notes.find((note) => note.id === id);
        if (!noteToUpdate) return;

        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, content } : note
            )
        );

        try {
            await axios.put(`http://localhost:5000/notes/${id}`, {
                title: noteToUpdate.title,
                content: content,
            });
            console.log("Note updated in DB");
        } catch (err) {
            console.error("Error updating note:", err);

            setNotes((prevNotes) => [...prevNotes]);
        }
    };

    const deleteNote = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/notes/${id}`);
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        } catch (err) {
            console.error("Error deleting note:", err);
        }
    };

    return (
        <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
            {children}
        </NotesContext.Provider>
    );
};

export default NotesProvider;
