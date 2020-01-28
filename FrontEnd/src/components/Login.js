import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'

export class Login extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {lng: 0, lat: 0, username: '', error: ''}
	}
	
	//Asks for location on mount
	componentDidMount() {
		if (this.state.lng == 0 || this.state.lat == 0){
			if (navigator && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(pos => {
					this.setState({
						lat: pos.coords.latitude,
						lng: pos.coords.longitude
					});
                });
			}
		}
	}
	
	
	//Catches text being typed in the form
    handleChange = event => {
        this.setState({ username: event.target.value, error: '' });
    };

	//Catches submit button click
    handleSubmit = event => {
        event.preventDefault();
		
		//Error if username not defined
        if (this.state.username === '') {
            this.setState({
                error: 'Please enter username'
            })
        }
		
		//Error if geolocation not allowed
		else if (this.state.lng == 0 || this.state.lat == 0){
			this.setState({
                error: 'Allow Geolocation and try again.'
            })
		}
		
		//Proceeds with the request
        else {
			
			//Performs a get with the current username
			axios.get('http://localhost:3000/user/' + this.state.username).then(resp => {
				
				//If no user exists, inserts the user
				if ((resp.data.length || []).length === 0){
					axios.post('http://localhost:3000/user/add/', {
					username: this.state.username,
					longitude: this.state.lng,
					latitude: this.state.lat,
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
				  .catch(error => { console.log(error); this.setState({ error: 'Database connection failed' }) })
				}
				
				//If a user exists, updates the location and sets status to online
				else{
					axios.post('http://localhost:3000/user/update/', {
					username: this.state.username,
					longitude: this.state.lng,
					latitude: this.state.lat,
					status: '1'
				  }).then(function (response) {  
						if(response.data == 'Update successful'){
							window.location = '/map';
							console.log('success');
						}
						if(response.data == 'Update failed'){
							throw "Update failed";
						}
				  }).catch(error => { console.log(error); this.setState({ error: 'Database connection failed' }) })
				}
			});
			
			//Local Storage used for Interface to retrieve data
			localStorage.setItem('user', this.state.username);
			localStorage.setItem('lat', this.state.lng);
			localStorage.setItem('lng', this.state.lat);
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
                    <button className='button' type="submit" onClick={this.handleSubmit}> Login</button>
                </form>
            </div >
        );
    }
}

export default Login
