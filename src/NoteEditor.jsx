import { useState } from "react";

export function NoteEditor({ note, onUpdate, onDelete, onClose }) {
  const [editingContent, setEditingContent] = useState(note.content);

  function handleUpdate() {
    onUpdate(editingContent);
    onClose();
  }

  function handleDelete() {
    onDelete();
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
