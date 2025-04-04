import React from 'react';

const NoteDisplay = ({ notes }) => {
  return (
    <div className="note-display-container">
      <h2 className="note-heading">Notes</h2>
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <h3>{note.title}</h3>
          <p>{note.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NoteDisplay;