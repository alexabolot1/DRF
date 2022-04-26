import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/Users";
import axios from "axios";
import {BrowserRouter, Route, Routes, Link, useLocation, Navigate} from 'react-router-dom'
import ProjectList from "./components/Projects";
import NoteList from "./components/Notes";
import ProjectsInfo from "./components/ProjectInfo";
import LoginForm from "./components/LoginForm";
import ProjectForm from "./components/ProjectForm";
import NotesForm from "./components/NotesForm";

const NotFound = () => {
    let location = useLocation()
    return (
        <div> К сожалению страница "{location.pathname}" не найдена :( </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'notes': [],
            'token': ''
        }
    }

    getData() {
        let headers = this.getHeader()

        axios
            .get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data
                this.setState({
                    'users': users
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'users': []
                })
            })

        axios
            .get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data

                this.setState({
                    'projects': projects
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'projects': []
                })
            })

        axios
            .get('http://127.0.0.1:8000/api/notes/', {headers})
            .then(response => {
                const notes = response.data

                this.setState({
                    'notes': notes
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'notes': []
                })
            })
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
            'token': token
        }, this.getData)
    }

    isAuth() {
        return !!this.state.token
    }

    getHeader() {
        if (this.isAuth()) {
            return {
                'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
//        return {
//            'Accept': 'application/json; version=2.0'
//        }
    }

    getToken(login, password) {
        console.log(login, password)
        axios
            .post('http://127.0.0.1:8000/api-token-auth/', {'username': login, 'password': password})
            .then(response => {
                const token = response.data.token
                console.log(token)
                localStorage.setItem('token', token)
                this.setState({
                    'token': token
                }, this.getData)
            })
            .catch(error => console.log(error))
    }

    logout() {
        localStorage.setItem('token', '')
        this.setState({
            'token': ''
        }, this.getData)
    }

    deleteProject(id) {
        let headers = this.getHeader()
        console.log(id)
        axios
            .delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({
                    projects: this.state.projects.filter((project) => project.id !== id)
                })
            }).catch(error => console.log(error))
    }

    deleteNote(id) {
        let headers = this.getHeader()
        console.log(id)
        axios
            .delete(`http://127.0.0.1:8000/api/notes/${id}`, {headers})
            .then(response => {
                this.setState({
                    notes: this.state.notes.filter((note) => note.id !== id)
                })
            }).catch(error => console.log(error))
    }

    newProject(name, link, users) {
        let headers = this.getHeader()
        console.log(name, link, users)
        axios
            .post('http://127.0.0.1:8000/api/projects/', {'name': name, 'link': link, 'users': users}, {headers})
            .then(response => {
                this.getData()
            })
            .catch(error => {
                console.log(error)
            })
    }

    newNote(project_name, text_note, author_note) {
        let headers = this.getHeader()
        console.log(project_name, text_note, author_note)
        // axios
        //     .post('http://127.0.0.1:8000/api/notes/',
        //         {'project_name': project_name, 'text_note': text_note, 'author_note': author_note}, {headers})
        //     .then(response => {
        //         this.getData()
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <li><Link to='/'>Users</Link></li>
                        <li><Link to='/notes'>Notes</Link></li>
                        <li><Link to='/projects'>Projects</Link></li>
                        <li><Link to='/projects/create'>New Project</Link></li>
                        <li><Link to='/notes/create'>New Note</Link></li>
                        <li>
                            {this.isAuth() ? <button onClick={() => this.logout()}>Logout</button> :
                                <Link to='/login'>Login</Link>}
                        </li>

                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users}/>}/>
                        <Route exact path='/notes' element={<NoteList notes={this.state.notes}
                                                                      deleteNote={(id) => this.deleteNote(id)}/>}/>
                        <Route exact path='/notes/create'
                               element={<NotesForm project_name={this.state.project_name}
                                                   author_note = {this.state.author_note}
                                                     newNote={(project_name, text_note, author_note) =>
                                                         this.newNote(project_name, text_note, author_note)}/>}/>
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects}
                                                                            deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route exact path='/projects/create'
                               element={<ProjectForm users={this.state.users}
                                                     newProject={(name, link, users) => this.newProject(name, link, users)}/>}/>
                        <Route exact path='/users' element={<Navigate to='/'/>}/>
                        <Route exact path='/login'
                               element={<LoginForm getToken={(login, password) => this.getToken(login, password)}/>}/>
                        <Route path='/projects/:id' element={<ProjectsInfo projects={this.state.projects}/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
