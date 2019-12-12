import React from 'react';
import './App.css';
import { Login } from "./components/login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Map from "./components/login/map";

function App() {
    return (
        <Router>
            <Switch>
                <div className="App">
                    <Route path="/" exact component={Login}/>
                    <Route path="/map" exact component={Map}/>
                </div>
            </Switch>
        </Router>
    );
}

export default App;
