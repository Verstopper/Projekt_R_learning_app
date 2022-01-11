import React, {Component, useState} from 'react'
import { validatePassword } from "./validateInfo";
import AuthenticationService from "../services/AuthenticationService";
import {Navigate} from "react-router-dom";
import InvalidComponent from "./InvalidComponent";
import ProfessorService from "../services/ProfessorService";
import GameService from "../services/GameService";
import ProfessorDashboard from "./ProfessorDashboard";
import {logDOM} from "@testing-library/react";


class AddGameComponent extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            success: undefined,
            name: '',
            description: '',
            oib: '',
            showSuccessMessage: false
        }
        this.handleChange = (event) =>{

            this.setState(
                {
                    [event.target.name]
                        : event.target.value
                }
            )

        }
        this.handleSubmit = async (event) => {

            event.preventDefault();
            let err = {}
            const header = document.querySelector("header");

            const hidden = document.querySelector("#hidden")
            if (header.classList.contains("is-active")) {
                header.classList.remove("is-active")
                hidden.style.display = 'none'
            } else {
                header.classList.add("is-active")
                hidden.style.display = 'block'
            }
            if(!err.password){
                let username = AuthenticationService.getLoggedInUserName();
                let response = await GameService.addGame(this.state.name, this.state.description, username);
                console.log("STATUS" + response.status + " su"  + this.state.success)
                if(response.success == false){
                    this.state.success = false;
                    this.setState(
                        {
                            errors: 'Dodavanje igre neuspješno.',
                        }
                    )
                }else {

                    this.state.success = true;
                }
            }
            else{
                this.setState(
                    {
                        errors: err,
                    }
                )
            }


        }
    }

    render() {

        if(this.state.success){
            return <Navigate to={{
                pathname: `/api/ZabavnoUcenje/profesor/pregledIgara`,
                state: {username: this.state.username},
            }}/>
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
                            <input type="text" id="name" name="name" placeholder="Ime igre"
                                   value={this.state.name} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-inputs">
                            <label htmlFor="description"></label>
                            <input type="text" id="description" name="description" placeholder="Opis igre"
                                   value={this.state.description} onChange={this.handleChange} required/>
                        </div>

                        {/*<div className="form-inputs">*/}
                        {/*    <label htmlFor="oib"></label>*/}
                        {/*    <input type="text" id="oib" name="oib" placeholder="OIB"*/}
                        {/*           value={this.state.oib} onChange={this.handleChange} required/>*/}
                        {/*</div>*/}
                        <button className={"btn btn-primary"} type="submit"  >Dodaj igru</button>
                        <a className={"btn btn-danger"} href="javascript:history.go(-1)">Odustani</a>
                    </form>
                    <div id="hidden">
                        {/*
                        check djelatnik is logged in, session
*/}
                        {!this.state.success &&
                        <div>
                            <label >Dogodila se pogreška prilikom dodavanja igre.Pokušajte ponovno ili se vratite na početnu stranicu.</label>
                        </div>
                        }

                    </div>
                </section>
            </div>

        );
    }

}


export default AddGameComponent;