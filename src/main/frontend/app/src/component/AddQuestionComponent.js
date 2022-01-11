import React, {Component, useState} from 'react'
import { validatePassword } from "./validateInfo";
import AuthenticationService from "../services/AuthenticationService";
import {Navigate} from "react-router-dom";
import InvalidComponent from "./InvalidComponent";
import ProfessorService from "../services/ProfessorService";
import QuestionService from "../services/QuestionService";

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
                let idGame = AuthenticationService.getGameFromStorage();
                let response = await QuestionService.addQuestion(idGame,this.state.name,this.state.description);
                if(response.success == false){
                    this.setState(
                        {
                            errors: 'Dodvanje pitanja je bilo neuspješno',
                        }
                    )
                }


            // console.log(errs)

        }
    }

    render() {





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
                            <input type="text" id="description" name="description" placeholder="Opis pitanja"
                                   value={this.state.description} onChange={this.handleChange} required/>
                        </div>
                        <button className={"btn btn-primary"} type="submit">Dodaj pitanje</button>
                        <a className={"btn btn-danger"} href="javascript:history.go(-1)" >Odustani</a>
                    </form>
                </section>
            </div>
        );
    }

}


export default AddQuestionComponent;