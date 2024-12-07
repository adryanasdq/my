import { useDispatch, useSelector } from 'react-redux';
import { NotesState } from '../notesReducer';
import { addNote } from '../actions';
import { NewNoteInput } from './NewNoteInput';

function Main3() {
  const notes = useSelector<NotesState, NotesState['notes']>(
    (state) => state.notes
  );
  const dispatch = useDispatch();

  const onAddNote = (note: string) => {
    dispatch(addNote(note));
  };

  return (
    <>
      <NewNoteInput addNote={onAddNote} />
      <hr />
      <ul>
        {notes.map((note) => {
          return <li key={note}>{note}</li>;
        })}
      </ul>
    </>
  );
}

export { Main3 };
