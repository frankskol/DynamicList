import React from 'react';
import UserService from "./UserService";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Accordion, AccordionItem } from 'react-sanfona';

export default class DynamicList extends React.Component {

	constructor(props) {
        super(props);
    }
	
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
	
	
    render() {
        return (
            <div className="App">
			<h5>Online Users</h5>
				<Accordion>
                    {this.props.users.filter(user => user.status == 1).sort((a, b) =>
						this.distance(a.latitude,a.longitude, 48.305862, 14.286444, "K").toFixed(2) - this.distance(b.latitude,b.longitude, 48.305862, 14.286444, "K").toFixed(2)
					).map(user => {
						var num = 1;
						return (
						<AccordionItem key={user.username} title={`${num++}. ${user.username} - 
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
				<Accordion>
                    {this.props.users.filter(user => user.status == 0).sort((a, b) => a.username.localeCompare(b.username)).map(user => {
						return (
						<AccordionItem key={user.username} title={`${user.username}`}>
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


