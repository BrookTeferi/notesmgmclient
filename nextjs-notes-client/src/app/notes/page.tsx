// ...existing code from src/pages/notes/index.tsx...
'use client';
import { useEffect, useState } from 'react';
import NoteList from '../../components/NoteList';
import { fetchNotes } from '../../utils/api';

export default function NotesPage() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getNotes = async () => {
            try {
                const data = await fetchNotes();
                // Ensure notes is always an array
                const notesArray = Array.isArray(data) ? data : (data.notes || []);
                setNotes(notesArray);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getNotes();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Your Notes</h1>
            <NoteList notes={notes} />
        </div>
    );
}
