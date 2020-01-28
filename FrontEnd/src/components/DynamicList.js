import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionItem } from 'react-sanfona';

export default class DynamicList extends React.Component {

	constructor(props) {
        super(props);
    }
	
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
	
	//Clickable list implemented as accordion
    render() {
        return (
            <div className="App">
			
			//List differentiates between online and offline users based on a filter for the status variable
			<h5>Online Users</h5>
				<Accordion allowMultiple="true">
                    {this.props.users.filter(user => user.status == 1).sort((a, b) =>
						//Online sorts registered users based on their distance to the defined center location
						this.distance(a.latitude,a.longitude, 48.305862, 14.286444, "K").toFixed(2) - this.distance(b.latitude,b.longitude, 48.305862, 14.286444, "K").toFixed(2)
					).map(user => {
						var num = 1;
						return (
							//Accordion items send their user coordinates to interface when clicked
							<AccordionItem key={user.username} onExpand={() => {
									this.props.sendCoordinates(user.latitude, user.longitude)
									} 
								} onClose={() => {
									this.props.sendCoordinates(user.latitude, user.longitude)
									}
								}
								title={`${num++}. ${user.username} - 
								Distance: ${this.distance(user.latitude,user.longitude, 48.305862, 14.286444, "K").toFixed(2)} KM`}>
								<p>
									Location:
									<br/>
									Latitude - {user.latitude}
									<br/>
									Longitude - {user.longitude}
								</p>
							</AccordionItem>						
						);
					})}
                </Accordion>

			<h5>Offline Users</h5>
				<Accordion allowMultiple="true">
                    {this.props.users.filter(user => user.status == 0).sort((a, b) => 
						//Offline list sorts users based on alphabetic order
						a.username.localeCompare(b.username)).map(user => {
						return (
							//Accordion items send their user coordinates to interface when clicked
							<AccordionItem key={user.username} onExpand={() => {
									this.props.sendCoordinates(user.latitude, user.longitude)
									} 
								} onClose = {() => {
									this.props.sendCoordinates(user.latitude, user.longitude)
									}
								}
								title={`${user.username}`}>
								<p>
									Last seen at:
									<br/>
									Latitude - {user.latitude}
									<br/>
									Longitude - {user.longitude}
								</p>
							</AccordionItem>						
						);
					})}
                </Accordion>
            </div>
        );
    }
}


