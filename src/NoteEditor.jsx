import { useContext, useState } from "react";
import { NotesDispatchContext } from "./NotesContext.js";

export function NoteEditor({ selectedNote, onClose }) {
  const dispatch = useContext(NotesDispatchContext);

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
      <button onClick={handleUpdate}>更新</button>
      <button onClick={handleDelete}>削除</button>
    </>
  );
}
