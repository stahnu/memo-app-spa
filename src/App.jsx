import { useEffect, useReducer, useState } from "react";
import { NoteList } from "./NoteList.jsx";
import { NoteEditor } from "./NoteEditor.jsx";

function App() {
  const [notes, dispatch] = useReducer(notesReducer, undefined, initNotes);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function handleAddNote() {
    const newNote = { id: crypto.randomUUID(), content: "新規メモ" };
    dispatch({
      type: "add",
      note: newNote,
    });
    setSelectedId(newNote.id);
  }

  function handleUpdateNote(content) {
    dispatch({
      type: "update",
      id: selectedId,
      content: content,
    });
  }

  function handleDeleteNote() {
    dispatch({
      type: "delete",
      id: selectedId,
    });
  }

  return (
    <>
      <h1>メモアプリ</h1>
      <NoteList notes={notes} onSelect={setSelectedId} />
      <button onClick={handleAddNote}>+</button>

      {selectedId !== null && (
        <NoteEditor
          key={selectedId}
          note={notes.find((note) => note.id === selectedId)}
          onUpdate={handleUpdateNote}
          onDelete={handleDeleteNote}
          onClose={() => {
            setSelectedId(null);
          }}
        />
      )}
    </>
  );
}

function notesReducer(notes, action) {
  switch (action.type) {
    case "add": {
      return [...notes, action.note];
    }
    case "update": {
      return notes.map((note) =>
        note.id === action.id ? { ...note, content: action.content } : note,
      );
    }
    case "delete": {
      return notes.filter((note) => note.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function initNotes() {
  const storedNotes = localStorage.getItem("notes");
  return storedNotes ? JSON.parse(storedNotes) : [];
}

export default App;
