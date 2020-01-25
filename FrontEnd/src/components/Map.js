import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import axios from 'axios'

import CurrentLocation from './location';

var users = []

axios.get('http://localhost:3000/user/').then(response => {
	console.log(response.data);
	users = response.data;
}); 

var myInt = setInterval(function () {
    		axios.get('http://localhost:3000/user/').then(response => {
			console.log(response.data);
			users = response.data;
			}); 
}, 9000);


export class MapContainer extends Component {
	
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
		console.log(this.props.user);
	}

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
	
	displayMarkers = () => {
		return users.map((user, index) => {
		  return <Marker onClick={this.onMarkerClick} key={index} name={user.username} status={user.status} position={{
		   lat: user.latitude,
		   lng: user.longitude
		 }} />
		})
	}
	
    render() {
        return (
            <div className="App">
                <CurrentLocation centerAroundCurrentLocation users={users} google={this.props.google}>
					{this.displayMarkers()}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h2>{this.state.selectedPlace.name}</h2>
							<h4>"Status: " + {this.state.selectedPlace.status}</h4>
                        </div>
                    </InfoWindow>
                </CurrentLocation>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'API KEY'
})(MapContainer);
