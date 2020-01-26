import React from 'react';
import UserService from "./UserService";
import { Link } from 'react-router-dom';
import axios from 'axios'

export default class DynamicList extends React.Component {

    state = {
        users: []
    };

    componentDidMount() {
        axios
            .get('http://localhost:3000/user/')
            .then(response => {

                const newUsers = response.data.map(c => {
                    return {
                        username: c.username
                    };
            });
                const newState = Object.assign({}, this.state, {
                    users: newUsers
                });
                this.setState(newState);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="App">

                <ul>
                    {this.state.users.map(user => (
                        <li key={user.username}>
                            User: {user.username}
                        </li>
                    ))}

                </ul>


            </div>
        );
    }
}


