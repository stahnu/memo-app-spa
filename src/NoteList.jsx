import { useContext } from "react";
import { NotesContext } from "./NotesContext.js";
import { NoteListItem } from "./NoteListItem.jsx";

export function NoteList({ onSelect }) {
  const notes = useContext(NotesContext);

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
