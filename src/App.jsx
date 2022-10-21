import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import "react-mde/lib/styles/css/react-mde-all.css";

export default function App() {

  const DeploySplit = Split.default? Split.default: Split;

  // Get Notes from Local Storage if they exist, otherwise []
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  // Add notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Create new Note
  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "** Delete This And Enter Your Note **",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  // Update Note
  function updateNote(text) {
    // Put the most recently modified note at the top by using unshift()
    setNotes((oldNotes) => {
      const newNotes = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newNotes.unshift({ ...oldNote, body: text });
        } else {
          newNotes.push(oldNote);
        }
      }
      return newNotes;
    });

    // This code works but doesn't put the note at the top
    // setNotes(oldNotes => oldNotes.map(oldNote => oldNote.id === currentNoteId ?  {...oldNote, body: text } : oldNote))
  }

  // Find current Note
  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  // Delete Note
  function deleteNote(event, noteId) {
    event.stopPropagation()
    setNotes(oldNotes => oldNotes.filter(note => noteId !== note.id))
}

  return (
    <main>
      {notes.length > 0 ? (
        <DeploySplit sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {/* Display current Note in the Editor part */}
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </DeploySplit>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create Note
          </button>
        </div>
      )}
    </main>
  );
}
