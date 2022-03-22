import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/Users";
import axios from "axios";
import {HashRouter, BrowserRouter, Route, Routes, Link, useLocation, Navigate} from 'react-router-dom'
import ProjectList from "./components/Projects";
import NoteList from "./components/Notes";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'notes': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users.results
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects.results
                    })

            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/notes/')
            .then(response => {
                const notes = response.data
                this.setState(
                    {
                        'notes': notes.results
                    })

            }).catch(error => console.log(error))

    }

    render() {
        return (
            <div>
                <UserList users={this.state.users}/>
                <ProjectList projects={this.state.projects}/>
                <NoteList notes={this.state.notes}/>
            </div>
        )
    }
}

export default App;
