import React from "react";
import { Link } from 'react-router-dom';
import './style.css';
import UserInput from "./UserInput";
import axios from 'axios'

export class Login extends React.Component {
    state = {
        username: '',
        error: ''
    }
    handleChange = event => {
        this.setState({ username: event.target.value, error: '' });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.username === '') {
            this.setState({
                error: 'Please enter username'
            })
        }
        else {
            axios.post('http://localhost:3000/user/add/', {
				username: this.state.username,
				longitude: '100',
				latitude: '100',
				status: '1'
			  })
			  .then(function (response) {  
				if(response.data == 'Insert successful'){
					window.location = '/map';
                    console.log('success');
				}
				if(response.data == 'Insert failed'){
					throw "Username already exists";
				}
			  })
			  .catch(error => { console.log(error); this.setState({ error: 'Username already exists' }) })
        }
    }
    render() {
        return (
            <div className="base">
                <h1 className='head'>Log In</h1>
                <form className='form'>
                    <p className='head'>Enter username to continue</p>
                    <input className='input' value={this.state.username} type="text" name="name" onChange={this.handleChange} />
                    {
                        this.state.error === '' ? null : <div className='error'>{this.state.error}</div>
                    }
                    <button className='button' type="submit" onClick={this.handleSubmit}>Login</button>
                </form>
            </div >
        );
    }
}

export default Login
