import React, {Component, useState} from 'react'
import {Navigate} from 'react-router-dom'
import AuthenticationService from "../services/AuthenticationService";
import InvalidComponent from "./InvalidComponent";
//import axios from 'axios';
import {validateUsername} from "./validateInfo";
import StudentGameComponent from "./StudentGameComponent";

class StudentComponent extends Component {

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
        this.handleChange = (event) => {
            this.setState(
                {
                    [event.target.name]: event.target.value
                }
            )
        }
        this.handleSubmit = async (event) => {
            event.preventDefault();
            let errs = validateUsername(this.state.username)
            if (!errs) {
                let response = await AuthenticationService.loginUcenik(this.state.username);
                if (response.data) {
                    this.setState({
                        existsInDB: true,
                        login: true,
                    })
                } else {
                    this.setState({
                        errors: 'Učenik ne postoji!',
                    })
                }
            } else {
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
        console.log("USER JE LOGINAN VALJDA  " + isUserLoggedIn)
        if (isUserLoggedIn) {
            let message = <p> Already logged in. Go to main page <a href='/'>here.</a></p>;
            return <StudentGameComponent/>
        }
        //replace username with id
        let renderValue;
        if (this.state.existsInDB && this.state.login) {
            //renderValue = <Navigate to={{
            //  pathname:   `/api/ZabavnoUcenje/ucenik/${this.state.username}`,
            //state: { username: this.state.username},
            //}}
            ///> ;
            AuthenticationService.registerSuccessfulLogin(this.state.username, " ");
            AuthenticationService.putStudentinSession();
            return <StudentGameComponent/>
        } else {
            console.log("StudentComponent dobar")
            renderValue = (
                <div className="wrapper fadeInDown">
                    <section className="container container-px container-py">
                        <form className="korisnik__odabir" onSubmit={this.handleSubmit}>
                            <div className="form-inputs">
                                {/*<label htmlFor="username">Username</label>*/}
                                <input type="text" id="username" name="username" placeholder="Korisničko ime"
                                       value={this.state.username} onChange={this.handleChange}/>
                            </div>
                            {this.state.errors && <p>{this.state.errors}</p>}

                            <button className="btn btn-primary" type="submit">Prijava</button>
                            <a className={"btn btn-danger"} href={"/"}>Odustani</a>
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
        console.log("bok od StudentComponent");
    }
}

export default StudentComponent