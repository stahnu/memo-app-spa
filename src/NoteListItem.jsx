export function NoteListItem({ note, onSelect }) {
  return (
    <>
      <li>
        <button
          onClick={() => {
            onSelect(note.id);
          }}
        >
          {note.content.split("\n")[0]}
        </button>
      </li>
    </>
  );
}
