import React, {Component, useState} from 'react'
import { validatePassword } from "./validateInfo";
import AuthenticationService from "../services/AuthenticationService";
import {Navigate} from "react-router-dom";
import InvalidComponent from "./InvalidComponent";
import ProfessorService from "../services/ProfessorService";
import ProfessorDashboard from "./ProfessorDashboard";
import GradeService from "./GradeService";

class AddGameComponent extends React.Component {

    constructor(props) {
        super(props);
        // console.log("     +++++       ")
        // console.log(this.props.id)
        let username = AuthenticationService.getLoggedInUserName();
        this.state = {
            username: username,
            success: false,
            name: '',
            generation: '',
            oib: '',
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
            console.log("ime igre:" + this.state.name + ", generacija: " +  this.state.generation)
            if(!err.password){
                //let username = AuthenticationService.getLoggedInUserName();
                let response = await GradeService.addGrade(this.state.name, this.state.generation, this.state.username);
                this.state.success = true;
                if(response.status >= 400){
                    this.state.success = false;
                    this.setState(
                        {
                            errors: 'Dodavanje razreda neuspješno.',
                        }
                    )
                }
            }
            else{
                this.setState(
                    {
                        errors: err,
                    }
                )
            }
            // console.log(errs)
            if(this.state.success){
                return(
                    <ProfessorDashboard/>
                )
            }
        }
    }

    render() {

        if(this.state.success){
            return(
                <ProfessorDashboard/>
            )
        }

        /*const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        if(isUserLoggedIn){
            let message = <p> Already logged in. Go to main page <a href='/'>here.</a></p>;
            return <InvalidComponent message={message} />
        }*/



        return (
            <div className="">
                <section className="container container-px container-py">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-inputs">
                            <label htmlFor="name"></label>
                            <input type="text" id="name" name="name" placeholder="Ime razreda"
                                   value={this.state.name} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-inputs">
                            <label htmlFor="description"></label>
                            <input type="text" id="generation" name="generation" placeholder="Generacija"
                                   value={this.state.generation} onChange={this.handleChange} required/>
                        </div>

                        {/*<div className="form-inputs">*/}
                        {/*    <label htmlFor="oib"></label>*/}
                        {/*    <input type="text" id="oib" name="oib" placeholder="OIB"*/}
                        {/*           value={this.state.oib} onChange={this.handleChange} required/>*/}
                        {/*</div>*/}
                        <button className={"btn btn-primary"} type="submit">Dodaj razred</button>
                        <a className={"btn btn-danger"} href="javascript:history.go(-1)">Odustani</a>
                    </form>
                </section>
            </div>
        );
    }

}


export default AddGameComponent;