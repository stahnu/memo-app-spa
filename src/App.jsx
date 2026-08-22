import { useState } from "react";
import { useNotes, useNotesDispatch } from "./useNotes.js";
import { NoteList } from "./NoteList.jsx";
import { NoteEditor } from "./NoteEditor.jsx";

function App() {
  const notes = useNotes();
  const dispatch = useNotesDispatch();

  const [selectedId, setSelectedId] = useState(null);
  const [editingContents, setEditingContents] = useState({});
  const selectedNote = notes.find((note) => note.id === selectedId);

  function handleAddNote() {
    const newNote = { id: crypto.randomUUID(), content: "新規メモ" };
    dispatch({
      type: "add",
      note: newNote,
    });
    setSelectedId(newNote.id);
  }

  function handleUpdateNote() {
    dispatch({
      type: "update",
      id: selectedId,
      content: editingContents[selectedId],
    });

    discardEditingContents();
    closeEditor();
  }

  function handleDeleteNote() {
    dispatch({
      type: "delete",
      id: selectedId,
    });
    closeEditor();
  }

  function handleChangeContent(content) {
    setEditingContents((prev) => ({
      ...prev,
      [selectedId]: content,
    }));
  }

  function discardEditingContents() {
    setEditingContents((prev) => {
      const next = { ...prev };
      delete next[selectedId];
      return next;
    });
  }

  function closeEditor() {
    setSelectedId(null);
  }

  return (
    <>
      <h1>メモアプリ</h1>
      <NoteList onSelect={setSelectedId} />
      <button onClick={handleAddNote}>+</button>
      {selectedId !== null && (
        <NoteEditor
          key={selectedId}
          editingContent={editingContents[selectedId] ?? selectedNote.content}
          onChange={handleChangeContent}
          onUpdate={handleUpdateNote}
          onDelete={handleDeleteNote}
        />
      )}
    </>
  );
}

export default App;
