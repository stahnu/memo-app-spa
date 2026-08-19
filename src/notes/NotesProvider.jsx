import { useReducer, useEffect } from "react";
import { NotesContext, NotesDispatchContext } from "./NotesContext.js";

export function NotesProvider({ children }) {
  const [notes, dispatch] = useReducer(notesReducer, undefined, initNotes);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <NotesContext value={notes}>
      <NotesDispatchContext value={dispatch}>{children}</NotesDispatchContext>
    </NotesContext>
  );
}

function notesReducer(notes, action) {
  switch (action.type) {
    case "add": {
      return [...notes, action.note];
    }
    case "update": {
      return notes.map((note) =>
        note.id === action.id ? { ...note, content: action.content } : note,
      );
    }
    case "delete": {
      return notes.filter((note) => note.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function initNotes() {
  const storedNotes = localStorage.getItem("notes");
  return storedNotes ? JSON.parse(storedNotes) : [];
}
