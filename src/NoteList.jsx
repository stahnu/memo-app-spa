import { useNotes } from "./useNotes.js";
import { NoteListItem } from "./NoteListItem.jsx";

export function NoteList({ onSelect }) {
  const notes = useNotes();

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
