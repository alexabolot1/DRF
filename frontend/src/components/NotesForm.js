import React from 'react'

class NotesForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'project_name': '',
            'text_note': '',
            'author_note': ''
        }
    }

    handleSubmit(event) {
        this.props.newNote(this.state.project_name, this.state.text_note, this.state.author_note)
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <select onChange={(event) => this.handleChange(event)}>
                    {this.props.project_name.map((project) => <option
                        value={project.id}>{project.name}</option>)}
                </select>
                <input
                    type="text"
                    name="text_note"
                    placeholder="text_note"
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.text_note}
                />
                <select onChange={(event) => this.handleChange(event)}>
                    {this.props.author_note.map((author) => <option
                        value={author.id}>{author.name}</option>)}
                </select>
                <input type="submit" value="Create"/>
            </form>
        )
    }
}

export default NotesForm