import { useState, useEffect } from "react";
import { useNotes, useNotesDispatch } from "./useNotes.js";
import { NoteList } from "./NoteList.jsx";
import { NoteEditor } from "./NoteEditor.jsx";

function App() {
  const notes = useNotes();
  const dispatch = useNotesDispatch();

  const [selectedId, setSelectedId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  function handleAddNote() {
    const newNote = { id: crypto.randomUUID(), content: "新規メモ" };
    dispatch({
      type: "add",
      note: newNote,
    });
    setSelectedId(newNote.id);
  }

  return (
    <>
      <h1>メモアプリ</h1>
      <button
        onClick={() => {
          setIsLoggedIn(!isLoggedIn);
        }}
      >
        {isLoggedIn ? "ログアウト" : "ログイン"}
      </button>
      <NoteList onSelect={setSelectedId} />
      {isLoggedIn && <button onClick={handleAddNote}>+</button>}
      {selectedId !== null && (
        <NoteEditor
          key={selectedId}
          isLoggedIn={isLoggedIn}
          selectedNote={notes.find((note) => note.id === selectedId)}
          onClose={() => {
            setSelectedId(null);
          }}
        />
      )}
    </>
  );
}

export default App;
