import React, { Component } from 'react'
import AuthenticationService from "../services/AuthenticationService";
import {Navigate} from "react-router-dom";
import InvalidComponent from "./InvalidComponent";
import RouterComponent from "./RouterComponent";

class LogoutComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        if(isUserLoggedIn){
            AuthenticationService.logout();
            return <RouterComponent/>
        }

        //let message = <p> Not logged in. Log in <a href='/login'>here.</a></p>;
        //return <InvalidComponent message={message} />
    }
}

export default LogoutComponent