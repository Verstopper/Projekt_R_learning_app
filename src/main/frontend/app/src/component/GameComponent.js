import ProfessorService from "../services/ProfessorService";
import AuthenticationService from "../services/AuthenticationService";
import NavBar from "./Navbar";
import React, {Component, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import GameService from "../services/GameService";
import Popup from './Popup';
import QuestionService from "../services/QuestionService";
import {forEach} from "react-bootstrap/ElementChildren";
import triggerBrowserReflow from "react-bootstrap/triggerBrowserReflow";
import AnswerService from "../services/AnswerService";


class QuestionRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (

            <div>
                )}</div>
        )

    }
}

class GameComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            defaultName: AuthenticationService.getGameNameFormStorage(),
            defaultDescription: AuthenticationService.getDescriptionFromStorage(),
            success: false,
            questions: '',
            brojac: 0,
            idpitanja: '',
            namepitanja: '',
            textpitanja: '',
            odgovor1: '',
            odgovor2: '',
            odgovor3: '',
            odgovor4: '',
            kraj: false
        }


        this.handleNext = async (event) => {

            event.preventDefault();
            let yes = await QuestionService.getAllQuestions(AuthenticationService.getGameFromStorage());
            console.log("BROJ PITANJA " + yes.data.length)
            if (this.state.brojac == yes.data.length - 1) {// ovo oznacava zadnje pitanje
                this.setState({
                    kraj: true
                })
            }


            if (!this.state.kraj) {
                let idQuestion = yes.data[this.state.brojac].id;
                let allAnswers = await AnswerService.getAllAnswers(idQuestion);

                this.setState(({
                    idpitanja: yes.data[this.state.brojac].id,
                    namepitanja: yes.data[this.state.brojac].name,
                    textpitanja: yes.data[this.state.brojac].text,
                    brojac: ++this.state.brojac,
                    odgovor1: allAnswers.data[0].text,
                    odgovor2: allAnswers.data[1].text,
                    odgovor3: allAnswers.data[2].text,
                }));
            }


        }


        this.handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        this.handleSubmit = async (event) => {
            event.preventDefault();

        }


    }

    render() {

        let rows;

        return (
            <div>
                <NavBar/>

                <p> IGRAŠ IGRU: + {this.state.defaultName} </p>
                <p>OPIS: {this.state.defaultDescription}</p>

                <p>ISPOD JE ROW hehe</p>


                    <p>{this.state.idpitanja}</p>
                    <p>{this.state.namepitanja}</p>
                    <p>{this.state.textpitanja}</p>
                    <p>{this.state.odgovor1}</p>
                    <p>{this.state.odgovor2}</p>
                    <p>{this.state.odgovor3}</p>
                    <p>{this.state.kraj} </p>


                <form onSubmit={this.handleNext}>
                    <input className="btn btn-primary" type="submit"/>
                </form>
                <div>
                    {rows && rows}
                </div>
            </div>
        )
    }
}


    export default GameComponent

