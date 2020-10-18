import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Welcome from "../Welcome";
import {AuthProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="bodyDiv">
                    <PrivateRoute exact path="/home" component={Home}/>
                    <Route exact path="/" component={Welcome}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/login" component={Login}/>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
    