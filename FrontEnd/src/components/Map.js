import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from './location';

var iconBase = '/icons/';

var icons = {
        online: {
			icon: 'IconOnline.png'
        },
		offline: {
			icon: 'IconOffline.png'
        },


};

export class MapContainer extends Component {
	
	constructor(props) {
        super(props);
    }
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };
	
	//Shows info window when clicking on marker
    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
	}

	//Closes the info window
    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
	
	//Renders all markers passed down from Interface
	displayMarkers = () => {
		return this.props.users.map((user, index) => {
			if (user.status == 1){
				return <Marker onClick={this.onMarkerClick} key={index} icon={icons.online.icon} name={user.username} status={user.status} position={{
				   lat: user.latitude,
				   lng: user.longitude
				}} />
			}
			else {
				return <Marker onClick={this.onMarkerClick} key={index} icon={icons.offline.icon} name={user.username} status={user.status} position={{
				   lat: user.latitude,
				   lng: user.longitude
				}} />			
			}

		})
	}
	
	//Displays status in the info window as On- or Offline instead of 1 or 0
	displayStatus = () => {
		if (this.state.selectedPlace.status == 1) return "Online";
		else return "Offline";
	}
	
	//Displays marker coordinates in the info window
	displayLocation = () => {
		if (this.state.selectedPlace.position) {
		return <div>
		<h6>Location</h6>
		<p>Latitude: {this.state.selectedPlace.position.lat}</p>
		<p>Longitude: {this.state.selectedPlace.position.lng}</p>
		</div>
		}
	}
	
    render() {
        return (
            <div className="App">
				
				//PanLat and PanLng are passed down to the location component
                <CurrentLocation centerAroundCurrentLocation panLat={this.props.panLat} panLng={this.props.panLng} users={this.props.users} google={this.props.google}>
					{this.displayMarkers()}
					{console.log(icons.online)}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h5>{this.state.selectedPlace.name}</h5>
								{this.displayLocation()}
							<p>Status:  {this.displayStatus()}</p>
                        </div>
                    </InfoWindow>
                </CurrentLocation>
            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: 'API_KEY'
})(MapContainer);
