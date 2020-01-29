import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Interface from "./components/Interface";
import DynamicList from "./components/DynamicList";
import './components/css/style.css';
import './components/css/skeleton.css';

//Define the backend location
window.backend="http://localhost:3000/user/";

class App extends Component {
  
  render() {
    return (
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
