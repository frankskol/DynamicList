import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Map from "./components/Map";


class App extends Component {
    //Changesdkfjsdfgds
  render() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/map" exact component={Map}/>
            </Switch>
        </Router>
    )
  }
}
export default App;
