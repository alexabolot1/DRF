import React from 'react'

const NoteItem = ({note}) => {
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
        </tr>
    )
}

const NoteList = ({notes}) => {
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
            {notes.map((note) => <NoteItem note={note}/>)}
        </table>
    )
}

export default NoteList
