import React, {Component, useState} from 'react'
import { validatePassword } from "./validateInfo";
import AuthenticationService from "../services/AuthenticationService";
import {Navigate} from "react-router-dom";
import InvalidComponent from "./InvalidComponent";

class RegstrationComponent extends React.Component {

    constructor(props) {
        super(props);
        // console.log("     +++++       ")
        // console.log(this.props.id)
        this.state = {
            imeIPrezime: '',
            korisnickoIme: '',
            email: '',
            lozinka: '',
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
            <div className="">
                <section className="container container-px container-py">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-inputs">
                            <label htmlFor="imeIPrezime"></label>
                            <input type="text" id="imeIPrezime" name="imeIPrezime" placeholder="Ime i prezime"
                                   value={this.state.imeIPrezime} onChange={this.handleChange}/>
                        </div>
                        <div className="form-inputs">
                            <label htmlFor="korisnickoIme"></label>
                            <input type="text" id="korisnickoIme" name="korisnickoIme" placeholder="korisničko ime"
                                   value={this.state.korisnickoIme} onChange={this.handleChange}/>
                        </div>
                        <div className="form-inputs">
                            <label htmlFor="email"></label>
                            <input type="text" id="email" name="email" placeholder="email"
                                   value={this.state.email} onChange={this.handleChange}/>
                        </div>
                        <div className="form-inputs">
                            <label htmlFor="lozinka"></label>
                            <input type="text" id="lozinka" name="lozinka" placeholder="lozinka"
                                   value={this.state.lozinka} onChange={this.handleChange}/>
                        </div>
                        <button className="form-input-btn" type="submit">Login</button>
                    </form>
                </section>
            </div>
        );
    }

}


export default RegstrationComponent;