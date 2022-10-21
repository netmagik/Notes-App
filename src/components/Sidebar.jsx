import React from "react";

export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        {/* Display only the 1st line of the note as the Note Title in the Sidebar */}
        <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
        {/* Pass the event to the onClick handler because it needs to stop event Propogation in App.js */}
        <button
          className="delete-btn"
          onClick={(event) => props.deleteNote(event, note.id)}
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>My Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          + New Note
        </button>
      </div>
      {noteElements}
    </section>
  );
}
