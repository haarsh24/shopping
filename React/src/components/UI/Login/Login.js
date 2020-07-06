import React from 'react'
import './Login.css'
import Navigational from '../../Navigational/Navigational'
import Auxilary from '../../../HOC/Auxilary/Auxilary'
import axios from '../../../axios'
import { connect } from 'react-redux'

class Login extends React.Component {

    state = {
        email: null,
        password: null,
        error: false
    }
    onSubmit = (event) => {
        event.preventDefault();
        let login = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', login)
            .then(response => {
                this.props.settingToken(response.data.user.tokens[0].token)
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ error: true })
            });
    }
    updateEmail = (evt) => {
        this.setState({ email: evt.target.value })
    }
    updatePassword = (evt) => {
        this.setState({ password: evt.target.value })
    }
    render() {
        let login = <div>
            < form className='Login'>
                <input name='email' type='email' placeholder='email' required onChange={this.updateEmail}></input>
                <br></br>
                <br></br>
                <br></br>
                <input name='password' tpye='password' placeholder='password' required onChange={this.updatePassword}></input>
                <br></br>
                <br></br>
                <br></br>
                <button onClick={this.onSubmit} >Submit</button>
            </form >
        </div>
        if (this.state.error) {
            login = <div>
                <h1>Wrong Info</h1>
                < form className='Login'>
                    <input name='email' type='email' placeholder='email' required onChange={this.updateEmail}></input>
                    <br></br>
                    <br></br>
                    <br></br>
                    <input name='password' tpye='password' placeholder='password' required onChange={this.updatePassword}></input>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button onClick={this.onSubmit} >Submit</button>
                </form >
            </div>
        }
        return (
            <Auxilary>
                <Navigational />
                {login}
            </Auxilary >
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        settingToken: (token) => dispatch({ type: 'SETTOKEN', token: token })
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        auth: state.authentication
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)