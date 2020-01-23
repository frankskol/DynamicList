import React from 'react';
import UserService from "./UserService";
import { Link } from 'react-router-dom';

export default class UserInput extends React.Component {
    state = {
        username: '',
    };

    handleChange = event => {
        this.setState({username: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        let user = {
            username: this.state.username
        }
        UserService.createUser(user)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label> User Name:
                    <input type="text" name="name" onChange={this.handleChange}/>
                </label>
                <Link to="/map">
                    <button tpye="submit">Login</button>
                </Link>
            </form>
        )
    }
}

