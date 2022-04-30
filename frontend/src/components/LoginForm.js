import React from 'react'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'login': '',
            'password': ''
        }
    }

    handSubmit(event) {
        this.props.getToken(this.state.login, this.state.password)
        event.preventDefault()
    }

    handChange(event) {
        this.setState( {
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={(event) => this.handSubmit(event)}>
                <input type='text' name='login' placeholder='login' onChange={(event) =>
                    this.handChange(event)} value={this.state.login}/>
                <input type='text' name='password' placeholder='password' onChange={(event) =>
                    this.handChange(event)} value={this.state.password}/>
                <input type="submit" value="Login" />
            </form>
        )
    }
}

export default LoginForm
