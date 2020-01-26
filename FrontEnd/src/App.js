import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Interface from "./components/Interface";
import DynamicList from "./components/DynamicList";


class App extends Component {
	
    //Changesdkfjsdfgds
  render() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/map" exact component={Interface}/>
                <Route path="/dynamicList" exact component={DynamicList}/>
            </Switch>
        </Router>
    )
  }
}
export default App;
