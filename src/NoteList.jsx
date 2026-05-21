import { NoteListItem } from "./NoteListItem.jsx";

export function NoteList({ notes, onSelect }) {
  return (
    <>
      <ul>
        {notes.map((note) => (
          <NoteListItem key={note.id} note={note} onSelect={onSelect} />
        ))}
      </ul>
    </>
  );
}
