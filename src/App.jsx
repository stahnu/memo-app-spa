import { useState } from "react";
import { NoteList } from "./NoteList.jsx";
import { NoteEditor } from "./NoteEditor.jsx";

let nextId = 3;
const initialNotes = [
  { id: 0, content: "メモ1\nメモ1の内容\nメモ1の内容\nメモ1の内容" },
  { id: 1, content: "メモ2\nメモ2の内容\nメモ2の内容\nメモ2の内容" },
  { id: 2, content: "メモ3\nメモ3の内容\nメモ3の内容\nメモ3の内容" },
];

function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedId, setSelectedId] = useState(null);

  function handleAddNote() {
    const newNote = { id: nextId, content: "新規メモ" };

    setNotes([...notes, newNote]);
    setSelectedId(newNote.id);

    nextId++;
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
