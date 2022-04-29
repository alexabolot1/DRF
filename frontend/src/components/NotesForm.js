import React from 'react'

class NotesForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'projects': '',
            'text_note': '',
            'users': ''
        }
    }

    handleSubmit(event) {
        this.props.newNote(this.state.projects, this.state.text_note, this.state.users)
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleNumberChange(event) {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <select name='projects' onChange={(event) => this.handleNumberChange(event)}>
                    {this.props.projects.map((project) => <option
                        value={project.id}>{project.name}</option>)}
                </select>
                <input
                    type="text"
                    name="text_note"
                    placeholder="text_note"
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.text_note}
                />
                <select name='users' onChange={(event) => this.handleNumberChange(event)}>
                    {this.props.users.map((user) => <option
                        value={user.id}>{user.username}</option>)}
                </select>
                <input type="submit" value="Create"/>
            </form>
        )
    }
}

export default NotesForm