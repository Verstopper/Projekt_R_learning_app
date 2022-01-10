import React, {Component, useState} from 'react'
import { validatePassword } from "./validateInfo";
import AuthenticationService from "../services/AuthenticationService";
import {Navigate} from "react-router-dom";
import InvalidComponent from "./InvalidComponent";
import ProfessorService from "../services/ProfessorService";

class AddQuestionComponent extends React.Component {

    constructor(props) {
        super(props);
        // console.log("     +++++       ")
        // console.log(this.props.id)
        this.state = {
            name: '',
            description: '',
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
            //err = validatePassword(this.state.password);
            //err.password = validatePassword(this.state.password)
            //console.log(err)
            console.log(err.password);
            console.log("i am here");
            console.log(this.state.username + " " +  this.state.password)
            if(!err.password){
                let response = await ProfessorService.professorSignUp(this.state.oib, this.state.username, this.state.password, this.state.fullName, this.state.email);
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
                            <label htmlFor="name"></label>
                            <input type="text" id="name" name="name" placeholder="Naziv pitanja"
                                   value={this.state.name} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-inputs">
                            <label htmlFor="description"></label>
                            <input type="text" id="description" name="description" placeholder="description"
                                   value={this.state.description} onChange={this.handleChange} required/>
                        </div>
                        <button className={"btn btn-primary"} type="submit">Promjeni</button>
                        <a className={"btn btn-danger"} href="javascript:history.go(-1)" >Odustani</a>
                    </form>
                </section>
            </div>
        );
    }

}


export default AddQuestionComponent;