import { useState, useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import '../styles/NoteForm.css'
import "../styles/Input.css";
import "../styles/TextArea.css";
import "../styles/Button.css";


const NoteForm = () => {
    const notesContext = useContext(NotesContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    if (!notesContext) return null;
    const { addNote } = notesContext;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addNote(title, content);
        setTitle("");
        setContent("");
    };

    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter your note title..."
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Write your note..."
                value={content}
                className="textarea-field"
                onChange={(e) => setContent(e.target.value)}
            />
            <button className="btn add-btn" type="submit">Add Note</button>
        </form>
    );
};

export default NoteForm;
