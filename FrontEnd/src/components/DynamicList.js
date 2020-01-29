import React from 'react';
import FlipMove from 'react-flip-move'; //Takes care of transitions
import Collapsible from 'react-collapsible';

export default class DynamicList extends React.Component {
	
	//Formula for calculating distance between two coordinates
	distance = (lat1, lon1, lat2, lon2, unit) => {
		if ((lat1 == lat2) && (lon1 == lon2)) {
			return 0;
		}
		else {
			var radlat1 = Math.PI * lat1/180;
			var radlat2 = Math.PI * lat2/180;
			var theta = lon1-lon2;
			var radtheta = Math.PI * theta/180;
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			if (dist > 1) {
				dist = 1;
			}
			dist = Math.acos(dist);
			dist = dist * 180/Math.PI;
			dist = dist * 60 * 1.1515;
			if (unit=="K") { dist = dist * 1.609344 }
			if (unit=="N") { dist = dist * 0.8684 }
			return dist;
		}
	}
	
	//Clickable list implemented as collapsible for the online users. On click updates the sendCoordinates props.
	renderOnlineChildren = () => {
		return this.props.users.filter(user => user.status == 1).sort((a, b) =>
			this.distance(a.latitude,a.longitude, 48.305862, 14.286444, "K").toFixed(2) - this.distance(b.latitude,b.longitude, 48.305862, 14.286444, "K").toFixed(2)
			).map(user => {
				return (
				<Collapsible transitionTime="200" key={user.username} onOpen={() => {
					this.props.sendCoordinates(user.latitude, user.longitude)
					} 
				} onClose={() => {
					this.props.sendCoordinates(user.latitude, user.longitude)
					}
				}
				trigger={`${user.username} - 
					Distance: ${this.distance(user.latitude,user.longitude, 48.305862, 14.286444, "K").toFixed(2)} KM`}>
					<p>
					Location:
					<br/>
					Latitude - {user.latitude}
					<br/>
					Longitude - {user.longitude}
					</p>
				</Collapsible>						
			);
		})
	}
	
	//Clickable list implemented as collapsible for the offline users. On click updates the sendCoordinates props.
	renderOfflineChildren = () => {
		return this.props.users.filter(user => user.status == 0).sort((a, b) => a.username.localeCompare(b.username)).map(user => {
			return (
				<Collapsible transitionTime="200" key={user.username} onOpen={() => {
						this.props.sendCoordinates(user.latitude, user.longitude)
					}
				} onClose = {() => {
						this.props.sendCoordinates(user.latitude, user.longitude)
					}
				}
				trigger={`${user.username}`}>
					<p>
					Last seen at:
					<br/>
					Latitude - {user.latitude}
					<br/>
					Longitude - {user.longitude}
					</p>
				</Collapsible>						
			);
		})		
	}
	
    render() {
        return (
            <div className="App">
			<h5>Online Users</h5>
			<FlipMove>
				{this.renderOnlineChildren()}
			</FlipMove>

			<h5>Offline Users</h5>
			<FlipMove>
                    {this.renderOfflineChildren()}
			</FlipMove>
            </div>
        );
    }
}


