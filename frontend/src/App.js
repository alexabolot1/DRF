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

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <li><Link to='/'>Users</Link></li>
                        <li><Link to='/notes'>Notes</Link></li>
                        <li><Link to='/projects'>Projects</Link></li>
                        <li>
                            {this.isAuth() ? <button onClick={() => this.logout()}>Logout</button> :
                                <Link to='/login'>Login</Link>}
                        </li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users}/>}/>
                        <Route exact path='/notes' element={<NoteList notes={this.state.notes}/>}/>
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
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
