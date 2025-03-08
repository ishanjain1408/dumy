import { useContext } from 'react';
import { NotesContext } from '../context/NotesContext';
import NoteForm from '../components/NoteForm';
import NoteCard from '../components/NoteCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css'

const Home = () => {
    const notesContext = useContext(NotesContext);

    if (!notesContext) return <p>Loading...</p>;

    const { notes, updateNote, deleteNote } = notesContext;

    return (
        <div>
            <Header />
            <NoteForm />
            {notes.length > 0 ? (
                notes.map((note,index) => (
                    <NoteCard 
                    key={note.id || index}
                        note={note} 
                        onUpdate={updateNote} 
                        onDelete={deleteNote} 
                    />
                ))
            ) : (
                <p>No notes available. Start by adding a new note!</p>
            )}
            <Footer />
        </div>
    );
};

export default Home;
