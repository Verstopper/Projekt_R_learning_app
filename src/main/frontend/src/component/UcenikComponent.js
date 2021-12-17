import React, {Component, useState} from 'react'


//import  { Navigate  } from 'react-router-dom'
import AuthenticationService from "../services/AuthenticationService";
import InvalidComponent from "./InvalidComponent";
import axios from 'axios';
import {validateUsername} from "./validateInfo";
import {Navigate} from "react-router-dom";


class UcenikComponent extends Component {

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
            let errs = validateUsername(this.state.username)
            //console.log(errs);
            if(!errs){
                // check if exists in DB
                //if doesnt exist in DB => error

                let response = await  AuthenticationService.loginUcenik(this.state.username);
                //console.log(response.data);

                //console.log("here")

                if(response.data){
                    this.setState({
                        existsInDB: true,
                        login: true,
                    })
                }else{
                    this.setState({
                        errors: 'Učenik ne postoji!',
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
        if(this.state.existsInDB && this.state.login){
            renderValue = <Navigate to={{
                pathname:   `/api/ZabavnoUcenje/Ucenik/${this.state.username}`,
                state: { username: this.state.username},
            }}
            /> ;

        }else{
            renderValue = (
                <div className="wrapper fadeInDown">
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
                    {/*<div id="formContent">
                        <!-- Tabs Titles -->
                        <h2 className="active"> Sign In </h2>


                        <!-- Login Form -->
                        <form>
                            <input type="text" id="login" className="fadeIn first" name="userName" placeholder="login"></input>
                                <input formAction="/login" type="submit" className="fadeIn third" value="Prijavi se"></input>
                        </form>

                    </div>*/}
                </div>
            )
        }
        return renderValue;
    }

}

export default  UcenikComponent