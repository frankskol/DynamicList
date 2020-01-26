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
	users: []
    };

	componentDidMount() {
		axios.get('http://localhost:3000/user/').then(response => {
			console.log(response.data);
			this.setState({ users: response.data }); 
		})
		this.interval = setInterval(() =>{axios.get('http://localhost:3000/user/').then(response => {
			console.log(response.data);
			if (!(JSON.stringify(this.state.users) === JSON.stringify(response.data))) this.setState({ users: response.data }); 
		})}, 10000);
	}
	componentWillUnmount() {
	  clearInterval(this.interval);
	}

	render() {
        return (
			<div className="App">
                <h1>
                    Map & List
                </h1>
				<SplitterLayout>
				<DynamicList/>
				<MapContainer users={this.state.users}>
				</MapContainer>
				</SplitterLayout>
			</div>	
        );
    }
}
