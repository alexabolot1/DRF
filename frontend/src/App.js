import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/Users";
import axios from "axios";
import {BrowserRouter, Route, Routes, Link, useLocation, Navigate} from 'react-router-dom'
import ProjectList from "./components/Projects";
import NoteList from "./components/Notes";
import ProjectsInfo from "./components/ProjectInfo";

const NotFound = () => {
    let location = useLocation()
    return (
        <div> К сожалению страница  "{location.pathname}" не найдена :( </div>
    )
}

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
                <BrowserRouter>
                    <nav>
                        <li><Link to='/'>Users</Link></li>
                        <li><Link to='/notes'>Notes</Link></li>
                        <li><Link to='/projects'>Projects</Link></li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element = {<UserList users={this.state.users} />} />
                        <Route exact path='/notes' element = {<NoteList notes={this.state.notes} />} />
                        <Route exact path='/projects' element = {<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/users' element = {<Navigate to='/' />} />
                        <Route path='/projects/:id' element = {<ProjectsInfo projects={this.state.projects} />} />
                        <Route path="*" element = {<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
