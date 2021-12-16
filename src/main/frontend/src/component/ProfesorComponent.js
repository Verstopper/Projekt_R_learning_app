import React, {Component, useState} from "react";
//import Navigate from 'react-router-dom';
import {validatePassword, validateUsername} from "./validateInfo";
import UcenikComponent from "./UcenikComponent";
import AuthenticationService from "../services/AuthenticationService";
import InvalidComponent from "./InvalidComponent";
import {Navigate} from "react-router-dom";


class ProfesorComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            success: false,
            existsInDB: false,
        }
        this.handleChange = (event) => {
            this.setState(
                {
                    [event.target.name]: event.target.value
                }
            )
        }
        this.handleSubmit = async (event) => {
            event.preventDefault();
            let errUser = validateUsername(this.state.username)
            let errPass = validatePassword(this.state.password)

            if (!errUser && !errPass) {

                    let responsePass = await AuthenticationService.loginAdmin(this.state.username, this.state.password);
                    if (responsePass.status >= 400) {
                        this.setState(
                            {
                                errors: 'Neuspješna prijava.',
                            }
                        )
                    }
                    if (responsePass.data) {
                        AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                        this.setState({
                            existsInDb: true,
                        })
                    } else {

                        this.setState({
                            errors: 'Kriva lozinka'
                        })
                    }

            } else {
                this.setState(
                    {
                        errors: errUser,
                    }
                )
            }

        }
    }

    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        if(isUserLoggedIn){
            let message = <p> Već ste prijavljeni. Vratite se na početnu stranicu <a href='/'>ovdje.</a></p>;
            return <InvalidComponent message={message} />
        }
        //replace username with id
        let renderValue;
        if(this.state.existsInDB && !this.state.success){
            renderValue =  <Navigate to={{
                pathname: '/loginAdmin',
                state: { username: this.state.username},
            }} /> ;
        }else{
            renderValue = (
                <div className="">
                    <section className="container container-px container-py">
                        <form className="korisnik__odabir"  onSubmit={this.handleSubmit}>
                            <div className="form-inputs">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" placeholder="Username"
                                       value={this.state.username} onChange={this.handleChange}/>
                                <label htmlFor="password">Password</label>
                                <input type="text" id="password" name="password" placeholder="Password"
                                       value={this.state.password} onChange={this.handleChange}/>
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

export default  ProfesorComponent