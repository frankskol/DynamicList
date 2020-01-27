import React from 'react';
import UserService from "./UserService";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Accordion, AccordionItem } from 'react-sanfona';

export default class DynamicList extends React.Component {

	constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
			<h5>Online Users</h5>
				<Accordion>
                    {this.props.users.filter(user => user.status == 1).map(user => {
						return (
						<AccordionItem title={`Item ${user.username}`}>
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
                    {this.props.users.filter(user => user.status == 0).map(user => {
						return (
						<AccordionItem title={`Item ${user.username}`}>
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
				

            </div>
        );
    }
}


