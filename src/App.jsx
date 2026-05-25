import { useContext, useState } from "react";
import { NoteList } from "./NoteList.jsx";
import { NoteEditor } from "./NoteEditor.jsx";
import { NotesContext, NotesDispatchContext } from "./NotesContext.js";

function App() {
  const notes = useContext(NotesContext);
  const dispatch = useContext(NotesDispatchContext);

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
      <NoteList onSelect={setSelectedId} />
      <button onClick={handleAddNote}>+</button>
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
