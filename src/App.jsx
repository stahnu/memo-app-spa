import { useEffect, useState } from "react";
import { NoteList } from "./NoteList.jsx";
import { NoteEditor } from "./NoteEditor.jsx";

function App() {
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function handleAddNote() {
    const newNote = { id: crypto.randomUUID(), content: "新規メモ" };
    setNotes([...notes, newNote]);
    setSelectedId(newNote.id);
  }

  function handleUpdateNote(content) {
    setNotes(
      notes.map((note) =>
        note.id === selectedId ? { ...note, content } : note,
      ),
    );
  }

  function handleDeleteNote() {
    setNotes(notes.filter((note) => note.id !== selectedId));
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

export default App;
