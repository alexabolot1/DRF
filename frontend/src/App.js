import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/Users";
import Menu from "./components/ Menu";
import Footer from "./components/Footer";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
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

        axios.get('http://127.0.0.1:8000/api/menu/')
            .then(response => {
                const menu = response.data
                this.setState(
                    {
                        'menu': menu
                    })

            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/footer/')
            .then(response => {
                const footer = response.data
                this.setState(
                    {
                        'footer': footer
                    })

            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <Menu menu={this.state.menu}/>
                <UserList users={this.state.users}/>
                <Footer footer={this.state.footer}/>
            </div>
        )
    }
}


export default App;
