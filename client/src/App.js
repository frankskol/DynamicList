import React, {Component} from 'react';
import './App.css';
import Login from "./components/Login";
import Interface from "./components/Interface";
import './components/css/style.css';
import './components/css/skeleton.css';

const path = require("path");
//Define the backend location
window.backend= path.join(__dirname, "user/");

class App extends Component {
  
	constructor(props) {
		super(props);
		this.switchPage = this.switchPage.bind(this)
	}	
	
	state = {
		page: "Login"
    };
	
	switchPage = (data) => {
		if (data == "Maps"){
			this.setState({
				page: "Maps"
			});
			console.log("Current State: Maps");
		}
		if (data == "Login") {
			this.setState({
				page: "Login"
			});
			console.log("Current State: Login");
		}
	}
  
  render() {
	const page = this.state.page;
	let display;
	
	if (this.state.page == "Login") display = <Login switchPage={this.switchPage}/>;
	else display = <Interface switchPage={this.switchPage}/>;
	
    return (
      <div>
        {display}
      </div>
    );
  }
}
export default App;
