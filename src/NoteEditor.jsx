import { useState } from "react";
import { useLogin } from "./login/useLogin.js";
import { useNotesDispatch } from "./notes/useNotes.js";

export function NoteEditor({ selectedNote, onClose }) {
  const { isLoggedIn } = useLogin();
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
      {isLoggedIn && (
        <>
          <textarea
            value={editingContent}
            onChange={(e) => {
              setEditingContent(e.target.value);
            }}
          ></textarea>
          <button onClick={handleUpdate}>更新</button>
          <button onClick={handleDelete}>削除</button>
        </>
      )}
    </>
  );
}
