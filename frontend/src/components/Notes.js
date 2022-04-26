import React from 'react'

const NoteItem = ({note, deleteNote}) => {
    return (
        <tr>
            <td>
                {note.project_name}
            </td>
            <td>
                {note.text_note}
            </td>
            <td>
                {note.author_note}
            </td>
            <td>
                <button onClick={() => deleteNote(note.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const NoteList = ({notes, deleteNote}) => {
    return (
        <table>
            <th>
                Project name
            </th>
            <th>
                Text note
            </th>
            <th>
                Author note
            </th>
            {notes.map((note) => <NoteItem note={note} deleteNote={deleteNote}/>)}
        </table>
    )
}

export default NoteList
