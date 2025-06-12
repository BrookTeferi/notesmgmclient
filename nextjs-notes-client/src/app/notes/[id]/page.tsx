'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import NoteList from '../../../components/NoteList';
import { fetchNotes, fetchNotesByUser } from '../../../utils/api';

export default function UserNotesPage() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();
    const params = useParams();

    // Try to get userId from params or localStorage
    const userId = params?.id || (typeof window !== 'undefined' ? localStorage.getItem('user_id') : null);

    useEffect(() => {
        const getNotes = async () => {
            try {
                // Use the backend API to fetch notes by userId
                const data = await fetchNotesByUser(userId);
                setNotes(Array.isArray(data) ? data : data.notes || []);
            } catch (err: any) {
                if (err.response && err.response.status === 401) {
                    router.push('/login');
                } else {
                    setError(err.message || 'Failed to fetch notes');
                }
            } finally {
                setLoading(false);
            }
        };
        getNotes();
    }, [userId]);

    const handleAddNote = () => {
        router.push('/notes/create');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <button onClick={handleAddNote} style={{ marginBottom: 16 }}>Add Note</button>
            {error && <div style={{ color: 'red', marginBottom: 16 }}>Error: {error}</div>}
            {notes.length === 0 && !error ? (
                <p>You have no notes yet.</p>
            ) : (
                <NoteList notes={notes} />
            )}
        </div>
    );
}
