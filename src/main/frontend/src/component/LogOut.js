import React, { Component } from 'react'
import AuthenticationService from "../sevices/AuthenticationService";
import {Navigate} from "react-router-dom";
import InvalidComponent from "./InvalidComponent";

class LogoutComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        if(isUserLoggedIn){
            AuthenticationService.logout();
            return <Navigate to='/' />
        }

        let message = <p> Not logged in. Log in <a href='/login'>here.</a></p>;
        return <InvalidComponent message={message} />
    }
}

export default LogoutComponent