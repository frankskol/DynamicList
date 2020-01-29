import React from "react";
import axios from 'axios'

export class Login extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {lng: 0, lat: 0, username: '', error: ''}
		this.movePage = this.movePage.bind(this)
	}
	
	//Gets current user location on mount
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
	
    handleChange = event => {
        this.setState({ username: event.target.value, error: '' });
    };

	//Does and INSERT or UPDATE with the username value and switches to the Map screen
    handleSubmit = event => {
        event.preventDefault();
        if (this.state.username === '') {
            this.setState({
                error: 'Please enter username'
            })
        }
		else if (this.state.lng == 0 || this.state.lat == 0){
			this.setState({
                error: 'Allow Geolocation and try again.'
            })
		}
        else {
			console.log(window.backend);
			axios.get(window.backend + this.state.username).then(resp => {
				if ((resp.data.length || []).length === 0){
					axios.post(window.backend + 'add/', {
					username: this.state.username,
					longitude: this.state.lng,
					latitude: this.state.lat,
					status: '1'
				  })
				  .then(function (response) {  
					if(response.data == 'Insert successful'){
						this.movePage();
						console.log('success');
					}
					if(response.data == 'Insert failed'){
						throw "Username already exists";
					}
				  })
				  .catch(error => { console.log(error); this.setState({ error: 'Database connection failed' }) })
				}
				else{
					axios.post(window.backend + 'update/', {
					username: this.state.username,
					longitude: this.state.lng,
					latitude: this.state.lat,
					status: '1'
				  }).then(function (response) {  
						if(response.data == 'Update successful'){
							this.movePage();
							console.log('success');
						}
						if(response.data == 'Update failed'){
							throw "Update failed";
						}
				  }).catch(error => { console.log(error); this.setState({ error: 'Database connection failed' }) })
				}
			});
			localStorage.setItem('user', this.state.username);
			localStorage.setItem('lat', this.state.lng);
			localStorage.setItem('lng', this.state.lat);
			this.movePage();
        }
    }
	
	//Method for passing the Screen change to App.js
	movePage = () => {
        this.props.switchPage("Maps");
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
