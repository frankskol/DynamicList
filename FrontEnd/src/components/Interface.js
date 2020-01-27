import React from 'react';
import UserService from "./UserService";
import { Link } from 'react-router-dom';
import axios from 'axios'
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

import MapContainer from './Map';
import DynamicList from "./DynamicList";

export default class Interface extends React.Component {

	state = {
	currentUser: localStorage.getItem('user'),
	users: []
    };

	componentDidMount() {
		this.setupBeforeUnloadListener();
		axios.get('http://localhost:3000/user/').then(response => {
			console.log(response.data);
			this.setState({ users: response.data }); 
		})
		this.interval = setInterval(() =>{axios.get('http://localhost:3000/user/').then(response => {
			console.log(response.data);
			if (!(JSON.stringify(this.state.users) === JSON.stringify(response.data))) this.setState({ users: response.data }); 
			
			if (navigator && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(pos => {
					if (pos.coords.latitude != localStorage.getItem('lat') || pos.coords.longitude != localStorage.getItem('lng')) {
						axios.post('http://localhost:3000/user/update/', {
							username: this.state.currentUser,
							longitude: pos.coords.longitude,
							latitude: pos.coords.latitude,
							status: '1'
						  }).then(function (response) {  
								if(response.data == 'Update successful'){
									console.log('Location Updated');
								}
								if(response.data == 'Update failed'){
									throw "Location update failed";
								}
					  }).catch(error => { console.log(error); this.setState({ error: 'Error during location update' }) })
					  localStorage.setItem('lat', pos.coords.latitude);
					  localStorage.setItem('lng', pos.coords.longitude);
					}
                });
			}
			
		})}, 10000);
	}
	componentWillUnmount() {
	  clearInterval(this.interval);
	  this.handleLogout();
	}
	
	handleLogout = event => {
        event.preventDefault();
  
			axios.post('http://localhost:3000/user/update/', {
				username: this.state.currentUser,
				longitude: localStorage.getItem('lng'),
				latitude: localStorage.getItem('lat'),
				status: '0'
				  }).then(function (response) {  
						if(response.data == 'Update successful'){
							window.location = '/';
							console.log('Logout Succesful');
						}
						if(response.data == 'Update failed'){
							throw "Logout failed";
						}
				  }).catch(error => { console.log(error); this.setState({ error: 'Logout failed' }) })
			localStorage.clear();
    }
	handleDelete = event => {
        event.preventDefault();
			axios.delete('http://localhost:3000/user/' + this.state.currentUser).then(function (response) {  
						if(response.data == 'Deletion successful'){
							window.location = '/';
							console.log('Deletion successful');
						}
						else{
							throw "Deletion failed";
						}
				  }).catch(error => { console.log(error); this.setState({ error: 'Deletion failed' }) })
			localStorage.clear();
    }
	
    doSomethingBeforeUnload = () => {
        axios.post('http://localhost:3000/user/update/', {
				username: this.state.currentUser,
				longitude: localStorage.getItem('lng'),
				latitude: localStorage.getItem('lat'),
				status: '0'
				  }).then(function (response) {  
						if(response.data == 'Update successful'){
							window.location = '/';
							console.log('Logout Succesful');
						}
						if(response.data == 'Update failed'){
							throw "Logout failed";
						}
				  }).catch(error => { console.log(error); this.setState({ error: 'Logout failed' }) })
		localStorage.clear();
    }

    // Setup the `beforeunload` event listener
    setupBeforeUnloadListener = () => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            return this.doSomethingBeforeUnload();
        });
    };

	render() {
        return (
			<div className="App">
                <h1>
                    Dynamic List
                </h1>
				<h4>Current User: {localStorage.getItem('user')}</h4>
				<button className='button' style={{margin: 20}} type="submit" onClick={this.handleLogout}> Logout</button> 
				<button className='button' style={{margin: 20}} type="submit" onClick={this.handleDelete}> Delete Account</button>
				<SplitterLayout>
				<DynamicList users={this.state.users}/>
				<MapContainer users={this.state.users}>
				</MapContainer>
				</SplitterLayout>
			</div>	
        );
    }
}
