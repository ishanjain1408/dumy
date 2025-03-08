import { useState, useEffect } from "react";
import { fetchNotes, addNote, updateNote, deleteNote } from "../services/notesService";

export interface Note {
    id: number;
    title: string;
    content: string;
}

const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const loadNotes = async () => {
            const data = await fetchNotes();
            setNotes(data);
        };
        loadNotes();
    }, []);

    const handleAddNote = async (title: string, content: string) => {
        const newNote = await addNote(title, content);
        setNotes((prev) => [...prev, newNote]);
    };

    const handleUpdateNote = async (id: number, title: string, content: string) => {
        await updateNote(id, title, content);
        setNotes((prev) =>
            prev.map((note) => (note.id === id ? { ...note, title, content } : note))
        );
    };

    const handleDeleteNote = async (id: number) => {
        await deleteNote(id);
        setNotes((prev) => prev.filter((note) => note.id !== id));
    };

    return { notes, handleAddNote, handleUpdateNote, handleDeleteNote };
};

export default useNotes;
