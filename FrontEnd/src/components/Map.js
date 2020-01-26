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

var icon =  "iconTest.png";

export class MapContainer extends Component {
	
	constructor(props) {
        super(props);
    }
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
	displayStatus = () => {
		if (this.state.selectedPlace.status == 1) return "Online";
		else return "Offline";
	}
	displayLocation = () => {
		if (this.state.selectedPlace.position) {
		return <div>
		<h3>Location</h3>
		<h4>Latitude: {this.state.selectedPlace.position.lat}</h4>
		<h4>Longitude: {this.state.selectedPlace.position.lng}</h4>
		</div>
		}
	}
	
    render() {
        return (
            <div className="App">
                <CurrentLocation centerAroundCurrentLocation users={this.props.users} google={this.props.google}>
					{this.displayMarkers()}
					{console.log(icons.online)}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h2>{this.state.selectedPlace.name}</h2>
								{this.displayLocation()}
							<h4>Status:  {this.displayStatus()}</h4>
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
