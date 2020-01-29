import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Interface from "./components/Interface";
import './components/css/style.css';
import './components/css/skeleton.css';



class App extends Component {
  
  render() {
    return (
		//Defines existing Routes. The initial screen is LogIn, which then links to Interface
        <Router>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/map" exact component={Interface}/>
            </Switch>
        </Router>
    )
  }
}
export default App;
