import React from 'react';
import axios from 'axios'
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

import MapContainer from './Map';
import DynamicList from "./DynamicList";

export default class Interface extends React.Component {

	constructor(props) {
        super(props);
		this.getCoordinates = this.getCoordinates.bind(this)
		this.movePage = this.movePage.bind(this)
    }
	
	//There are two important states categories. 
	//1. The Current User is the one who logged in.
	//2. The Pan categories tell where the maps should be centered after a list click
	state = {
	currentUser: localStorage.getItem('user'),
	currentLat: localStorage.getItem('lat'),
	currentLng: localStorage.getItem('lng'),
	panLat: localStorage.getItem('lat'),
	panLng: localStorage.getItem('lng'),
	users: []
    };

	componentDidMount() {
		this.setupBeforeUnloadListener();
		
		axios.get(window.backend).then(response => {
			console.log(response.data);
			this.setState({ users: response.data }); 
		})
		this.interval = setInterval(() =>{axios.get(window.backend).then(response => {
			console.log(response.data);
			if (!(JSON.stringify(this.state.users) === JSON.stringify(response.data))) this.setState({ users: response.data }); 
			
			if (navigator && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(pos => {
					if (pos.coords.latitude != this.state.currentLat || pos.coords.longitude != this.state.currentLng) {
						axios.post(window.backend + 'update/', {
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
						this.setState({
							currentLat: localStorage.getItem('lat'),
							currentLng: localStorage.getItem('lng')
						});
					}
                });
			}
			
		})}, 7000);
	}
	componentWillUnmount() {
	  clearInterval(this.interval);
	  this.handleLogout();
	}
	
	handleLogout = event => {
		axios.post(window.backend + 'update/', {
			username: this.state.currentUser,
			longitude: this.state.currentLng,
			latitude: this.state.currentLat,
			status: '0'
			  }).then(function (response) {  
					if(response.data == 'Update successful'){
						this.movePage();
						console.log('Logout Succesful');
					}
					if(response.data == 'Update failed'){
						throw "Logout failed";
					}
			 }).catch(error => { console.log(error); this.setState({ error: 'Logout failed' }) })
			localStorage.clear();
			this.movePage();
    }
	handleDelete = event => {
		axios.delete(window.backend + this.state.currentUser).then(function (response) {  
					if(response.data == 'Deletion successful'){
						this.movePage();
						console.log('Deletion successful');
					}
					else{
						throw "Deletion failed";
					}
			  }).catch(error => { console.log(error); this.setState({ error: 'Deletion failed' }) })
		localStorage.clear();
		this.movePage();
    }
	
	movePage = () => {
        this.props.switchPage("Login");
    }
	
    doSomethingBeforeUnload = () => {
        axios.post(window.backend + 'update/', {
				username: this.state.currentUser,
				longitude: this.state.currentLng,
				latitude: this.state.currentLat,
				status: '0'
				  }).then(function (response) {  
						if(response.data == 'Update successful'){
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
	
	getCoordinates(lat, lng){
		this.setState({
			panLat: lat,
			panLng: lng
		});
	}
	
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
				<DynamicList users={this.state.users} sendCoordinates={this.getCoordinates}/>
				<MapContainer users={this.state.users} panLat={this.state.panLat} panLng={this.state.panLng}>
				</MapContainer>
				</SplitterLayout>
			</div>	
        );
    }
}
