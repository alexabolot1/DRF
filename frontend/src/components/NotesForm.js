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

    handleProjectsChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let project_name = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            project_name.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState({
            'project_name': project_name
        })
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <select multiple onChange={(event) => this.handleProjectsChange(event)}>
                    {this.props.project_name.map((project) => <option
                        value={project.id}>{project.users} {project.name} {project.link} </option>)}
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