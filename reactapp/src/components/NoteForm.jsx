import React, { useState } from 'react';

const NoteForm = ({ onNoteSubmit }) => {
  const [noteData, setNoteData] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteData.title || !noteData.description) {
      setError('Please provide data for fields');
    } else {
      onNoteSubmit(noteData);
      setNoteData({ title: '', description: '' }); // Clear the form after submission
      setError(''); // Clear any previous error message
    }
    
  };

  return (
    <div className="note-form-container">
      <h2 className="form-heading">Create a Note</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Title (required)"
          className="form-input"
          value={noteData.title}
          onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
        />
    
        <textarea
          placeholder="Description (required)"
          className="form-input"
          value={noteData.description}
          onChange={(e) => setNoteData({ ...noteData, description: e.target.value })}
        />

        <button type="submit" className="form-submit-button">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;