import { useState } from "react";
import { useNotesDispatch } from "./useNotes.js";

export function NoteEditor({ selectedNote, onClose, isLoggedIn }) {
  const dispatch = useNotesDispatch();

  const [editingContent, setEditingContent] = useState(selectedNote.content);

  function handleUpdate() {
    dispatch({
      type: "update",
      id: selectedNote.id,
      content: editingContent,
    });
    onClose();
  }

  function handleDelete() {
    dispatch({
      type: "delete",
      id: selectedNote.id,
    });
    onClose();
  }

  return (
    <>
      <textarea
        value={editingContent}
        onChange={(e) => {
          setEditingContent(e.target.value);
        }}
      ></textarea>
      {isLoggedIn && (
        <>
          <button onClick={handleUpdate}>更新</button>
          <button onClick={handleDelete}>削除</button>
        </>
      )}
    </>
  );
}
