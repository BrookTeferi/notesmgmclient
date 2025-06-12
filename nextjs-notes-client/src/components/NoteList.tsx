import React from 'react';

interface Note {
    id: number | string;
    title: string;
    content: string;
}

interface NoteListProps {
    notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => (
    <div>
        <h2>Notes</h2>
        <ul>
            {notes.map(note => (
                <li key={note.id}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </li>
            ))}
        </ul>
    </div>
);

export default NoteList;