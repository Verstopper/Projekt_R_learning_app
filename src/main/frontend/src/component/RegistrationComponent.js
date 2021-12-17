import React, {Component, useState} from 'react'
import {validatePassword, validatePasswordMatch} from "./validateInfo";
import AuthenticationService from "../services/AuthenticationService";
import { Navigate } from "react-router-dom";
import InvalidComponent from "./InvalidComponent";

class RegstrationComponent extends React.Component {

    constructor(props) {
        super(props);
        // console.log("     +++++       ")
        // console.log(this.props.id)
        this.state = {
            username: this.props.id,
            password: '',
            errors: {},
            hasLoginFailed: true,
            showSuccessMessage: false
        }
        this.handleChange = (event) =>{
            // console.log("here")
            this.setState(
                {
                    [event.target.name]
                        : event.target.value
                }
            )
            // console.log("---" + this.state);
        }
        this.handleSubmit = async (event) => {
            // console.log("here")
            event.preventDefault();
            let err = {}
            err.password = validatePassword(this.state.password)
            //console.log(err)
            // console.log("i am here");
            // console.log(this.state.username + " " +  this.state.password)
            if(!err.password){
                let response = await AuthenticationService.registerProfesor(this.state.username, this.state.password);
                if(response.status >= 400){
                    this.setState(
                        {
                            errors: 'Registracija neuspjela',
                        }
                    )
                }

                //console.log(response);
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                this.setState({
                    hasLoginFailed: false,
                })
            }
            else{
                this.setState(
                    {
                        errors: err,
                    }
                )
            }
            // console.log(errs)

        }
    }

    render() {

        if(!this.state.hasLoginFailed)
            return <Navigate to='/'/>

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        if(isUserLoggedIn){
            let message = <p> Already logged in. Go to main page <a href='/'>here.</a></p>;
            return <InvalidComponent message={message} />
        }



        return (
            <div className="navigation">

                {
                    !isUserLoggedIn &&
                    <div><a href="/login">Prijava ucenika</a></div>
                }
                {!isUserLoggedIn &&
                <div>
                    <a href="/loginProf" id="">Prijava profesora</a>
                </div>
                }
                {isUserLoggedIn && <div>

                    <a href="/logout" id="">Odjava djelatnika</a>
                </div>
                }

            </div>
        );
    }

}


export default RegstrationComponent;