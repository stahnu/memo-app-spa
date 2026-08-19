import { useState } from "react";
import { useLogin, useSetLogin } from "./login/useLogin.js";
import { useNotes, useNotesDispatch } from "./notes/useNotes.js";
import { NoteList } from "./NoteList.jsx";
import { NoteEditor } from "./NoteEditor.jsx";

function App() {
  const notes = useNotes();
  const dispatch = useNotesDispatch();
  const isLoggedIn = useLogin();
  const setLogin = useSetLogin();

  const [selectedId, setSelectedId] = useState(null);

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
          setLogin(!isLoggedIn);
        }}
      >
        {isLoggedIn ? "ログアウト" : "ログイン"}
      </button>
      <NoteList onSelect={setSelectedId} />
      {isLoggedIn && <button onClick={handleAddNote}>+</button>}
      {selectedId !== null && (
        <NoteEditor
          key={selectedId}
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
