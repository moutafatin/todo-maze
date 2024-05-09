import {Textarea} from "@/Components/ui/textarea";
import {useForm} from "@inertiajs/react";
import {Note} from "@/types";

type NoteProps = {
    note: Note
    collectionSlug: string
}

export function NoteTextArea({note, collectionSlug}: NoteProps) {
    const addNote = useForm({
        note: note.content ?? ''
    })

    const initialNoteContent = note.content;
    const addOrUpdateNote = () => {
        if (initialNoteContent !== addNote.data.note) {
            addNote.patch(route('todos.update', {
                collection: collectionSlug,
                todo: note.todo_id
            }))
        }
    }
    return <Textarea placeholder='Add a note'
                     value={addNote.data.note}
                     onChange={(e) => addNote.setData('note', e.target.value)}
                     className='border-none flex-grow focus-visible:ring-1 focus:outline-none focus:ring-0 hover:bg-slate-100 transition-colors'
                     onBlur={addOrUpdateNote}
    />
}
