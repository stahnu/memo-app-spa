import { useContext } from "react";
import { NotesContext, NotesDispatchContext } from "./NotesContext.js";

export function useNotes() {
  return useContext(NotesContext);
}

export function useNotesDispatch() {
  return useContext(NotesDispatchContext);
}
