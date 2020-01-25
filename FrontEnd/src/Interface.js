import React from 'react';
import UserService from "./UserService";
import { Link } from 'react-router-dom';

import MapContainer from './Map';

export default class Interface extends React.Component {



    render() {
        return (
			<div className="App">
                <h1>
                    Map & List
                </h1>
				<MapContainer>
				</MapContainer>
			</div>	
        );
    }
}
