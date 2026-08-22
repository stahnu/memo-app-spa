export function NoteEditor({ editingContent, onChange, onUpdate, onDelete }) {
  return (
    <>
      <textarea
        value={editingContent}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      ></textarea>
      <button onClick={onUpdate}>更新</button>
      <button onClick={onDelete}>削除</button>
    </>
  );
}
