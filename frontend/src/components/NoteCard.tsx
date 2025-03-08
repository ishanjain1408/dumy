import { useState } from "react";
import "../styles/NoteCard.css";
import "../styles/Input.css";
import "../styles/TextArea.css";
import "../styles/Button.css";

interface Note {
  id: number;
  title: string;
  content: string;
}

interface NoteCardProps {
  note: Note;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [newContent, setNewContent] = useState(note.content);

  return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>
      {editMode ? (
        <textarea
          className="textarea-field"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
      ) : (
        <p className="note-content">{note.content}</p>
      )}
      <div className="button-group">
        {editMode ? (
          <button
            className="btn save-btn"
            onClick={() => {
              onUpdate(note.id, newContent);
              setEditMode(false);
            }}
          >
            Save
          </button>
        ) : (
          <button className="btn edit-btn" onClick={() => setEditMode(true)}>
            Edit
          </button>
        )}
        <button className="btn delete-btn" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
