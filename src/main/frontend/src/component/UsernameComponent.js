import React, {Component, useState} from 'react'
import {validateUserName} from "./validateInfo";
import LoginComponent from "./LogInComponent";
import SignUpComponent from "./SignUpComponent";
import LogInComponent from "./LogInComponent";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import NavComponent from "./NavComponent";
import MainIndexComponent from "./MainIndexComponent";
import  { Navigate  } from 'react-router-dom'
import AuthenticationService from "../sevices/AuthenticationService";
import InvalidComponent from "./InvalidComponent";


class UsernameComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errors: "",
            hasLoginFailed: false,
            showSuccessMessage: false,
            login: false,
            existsInD: false,
            errorDB: false,
        }
        this.handleChange = (event) =>{
            //  console.log("here")
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
            let errs = validateUserName(this.state.username)
            //console.log(errs);
            if(!errs){
                // check if exists in DB
                //if doesnt exist in DB => error

                let response = await  AuthenticationService.checkUsernameInDB(this.state.username);
                //console.log(response.data);

                //console.log("here")

                if(response.data && response.data.lozinka){
                    this.setState({
                        existsInDB: true,
                        login: true,
                    })
                }else if(response.data && !response.data.lozinka){
                    this.setState({
                        existsInDB: true,
                        login: false,
                    })
                }else{
                    this.setState({
                        errors: 'Djelatnik ne postoji!',
                    })
                }
            }else{
                this.setState(
                    {
                        errors: errs,
                    }
                )
            }

        }
    }

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        if(isUserLoggedIn){
            let message = <p> Already logged in. Go to main page <a href='/'>here.</a></p>;
            return <InvalidComponent message={message} />
        }
        //replace username with id
        let renderValue;
        if(this.state.existsInDB && !this.state.login){
            renderValue =  <Navigate to={{
                pathname:   `/prvaPrijava/${this.state.username}`,
                state: { username: this.state.username},
            }} /> ;
        }else if(this.state.existsInDB && this.state.login){
            renderValue = <Navigate to={{
                pathname:   `/prijava/${this.state.username}`,
                state: { username: this.state.username},
            }}
            /> ;

        }else{
            renderValue = (
                <div className="">
                    <section className="container container-px container-py">
                        <form className="korisnik__odabir"  onSubmit={this.handleSubmit}>
                            <div className="form-inputs">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" placeholder="Username"
                                       value={this.state.username} onChange={this.handleChange}/>
                            </div>
                            {this.state.errors && <p>{this.state.errors}</p>}

                            <button className="form-input-btn" type="submit">Login</button>
                        </form>
                    </section>
                </div>
            )
        }
        return renderValue;
    }

}

export default  UserNameComponent