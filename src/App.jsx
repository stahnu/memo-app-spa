import { useState } from "react";

let nextId = 3;
const initialNotes = [
  { id: 0, content: "メモ1\nメモ1の内容\nメモ1の内容\nメモ1の内容" },
  { id: 1, content: "メモ2\nメモ2の内容\nメモ2の内容\nメモ2の内容" },
  { id: 2, content: "メモ3\nメモ3の内容\nメモ3の内容\nメモ3の内容" },
];

function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedId, setSelectedId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  function resetEditor() {
    setSelectedId(null);
    setEditingContent("");
  }

  function handleSelectNote(note) {
    setSelectedId(note.id);
    setEditingContent(note.content);
  }

  function handleAddNote() {
    const newNote = { id: nextId, content: "新規メモ" };

    setNotes([...notes, newNote]);
    handleSelectNote(newNote);

    nextId++;
  }

  function handleChangeNote() {
    setNotes(
      notes.map((note) =>
        note.id === selectedId ? { ...note, content: editingContent } : note,
      ),
    );
    resetEditor();
  }

  function handleDeleteNote() {
    setNotes(notes.filter((note) => note.id !== selectedId));
    resetEditor();
  }

  return (
    <>
      <h1>メモアプリ</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <button
              onClick={() => {
                handleSelectNote(note);
              }}
            >
              {note.content.split("\n")[0]}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddNote}>+</button>
      {selectedId && (
        <>
          <textarea
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
          ></textarea>
          <button onClick={handleChangeNote}>更新</button>
          <button onClick={handleDeleteNote}>削除</button>
        </>
      )}
    </>
  );
}

export default App;
