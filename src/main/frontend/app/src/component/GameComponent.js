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
import {render} from "@testing-library/react";
import {getElement} from "bootstrap/js/src/util";




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
            tocan1:'',
            tocan2:'',
            tocan3:'',
            tocan4:'',
            chosenOne: undefined,
            kraj: false,
            pushedNext : false,
            confirmed : false,
            truth: false,
        }


        this.handleNext = async (event) => {
            event.preventDefault();
            //this.setState({truth:undefined})
            let confirmed = false;
            let goNext = true;
            let prvo = false;
            if (this.state.pushedNext) {
                if (this.state.chosenOne == undefined) {
                    confirmed = window.confirm("Jeste li sigurni da želite preskočiti ovo pitanje?" +
                        "Niti jedan odgovro nije odabran");
                    if (confirmed) {
                        goNext = true;
                    } else {
                        goNext = false;
                    }

                } else if (!this.state.confirmed) {
                    confirmed = window.confirm("Jeste li sigurni da ne želite provjeriti ovaj odgovor?")
                    if (confirmed) {
                        goNext = true;
                    } else {
                        goNext = false;
                    }
                }
            } else {

                AuthenticationService.inicializeNumberOfAnswers();
                prvo = true;
            }

            this.setState({
                pushedNext: true
            })

            if (goNext) {

                if (!prvo) {
                    resetColors();
                }

                let yes = await QuestionService.getAllQuestions(AuthenticationService.getGameFromStorage());
                AuthenticationService.getNumberOfQuestionsIntoStorage(yes.data.length);

                if (this.state.brojac == yes.data.length) {// ovo oznacava zadnje pitanje
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
                        odgovor4: allAnswers.data[3].text,
                        tocan1: allAnswers.data[0].correctness,
                        tocan2: allAnswers.data[1].correctness,
                        tocan3: allAnswers.data[2].correctness,
                        tocan4: allAnswers.data[3].correctness

                    }));
                }

                if (this.state.truth != true) {

                    if (this.state.chosenOne == "chosenOneAns1") {
                        if (this.state.tocan1 == "DA") {
                            AuthenticationService.addCorrectAnswersIntoStorage();
                        }
                    }

                    else if (this.state.chosenOne == "chosenOneAns2") {
                        if (this.state.tocan2 == "DA") {
                            AuthenticationService.addCorrectAnswersIntoStorage();
                        }
                    }
                        else if (this.state.chosenOne == "chosenOneAns3") {
                            if (this.state.tocan3 == "DA") {
                                AuthenticationService.addCorrectAnswersIntoStorage();
                            }
                        }


                       else  if (this.state.chosenOne == "chosenOneAns4") {
                            if (this.state.tocan4 == "DA") {
                                AuthenticationService.addCorrectAnswersIntoStorage();

                            }
                        }
                    }
                        this.setState({
                            chosenOne: undefined,
                            confirmed: false,
                            truth: undefined
                        })
            }
        }

                function resetColors() {
                    document.getElementById("checkAns").className = "btn btn-warning"
                    document.getElementById("chosenOneAns1").className = "btn btn-info col"
                    document.getElementById("chosenOneAns2").className = "btn btn-info col"
                    document.getElementById("chosenOneAns3").className = "btn btn-info col"
                    document.getElementById("chosenOneAns4").className = "btn btn-info col"

                }


                this.handleChange = (event) => {
                    this.setState({
                        [event.target.name]: event.target.id
                    })
                    resetColors();

                }

                this.handleSubmit = async (event) => {
                    event.preventDefault();

                }

                this.handleAnswer = async (e) => {
                    e.preventDefault();
                    this.setState({
                        confirmed: true
                    })
                    if (this.state.chosenOne != undefined) {
                        console.log("provjeravamo točnost truth je" + this.state.truth)
                        if (this.state.chosenOne == "chosenOneAns1") {
                            if (this.state.tocan1 == "DA") {
                                document.getElementById("chosenOneAns1").className = "btn btn-success col"
                                e.target.className = 'btn btn-success col '
                                if(this.state.truth != true) {
                                    console.log("povecali smo u " + this.state.chosenOne + "1")
                                    AuthenticationService.addCorrectAnswersIntoStorage();
                                    this.setState({truth: true})
                                }
                            } else {
                                document.getElementById("chosenOneAns1").className = "btn btn-danger col"
                                e.target.className = 'btn btn-danger col '

                            }
                        }
                        else if (this.state.chosenOne == "chosenOneAns2") {
                            if (this.state.tocan2 == "DA") {
                                document.getElementById("chosenOneAns2").className = "btn btn-success col"
                                e.target.className = 'btn btn-success col '
                                if(this.state.truth != true) {
                                    console.log("povecali smo u " + this.state.chosenOne + "2")
                                    AuthenticationService.addCorrectAnswersIntoStorage();
                                    this.setState({truth: true})
                                }
                            } else {
                                document.getElementById("chosenOneAns2").className = "btn btn-danger col"
                                e.target.className = 'btn btn-danger col '
                            }
                        }
                        else if (this.state.chosenOne == "chosenOneAns3") {
                            if (this.state.tocan3 == "DA") {
                                document.getElementById("chosenOneAns3").className = "btn btn-success col"
                                e.target.className = 'btn btn-success col '
                                if(this.state.truth != true) {
                                    console.log("povecali smo u " + this.state.chosenOne + "3")
                                    AuthenticationService.addCorrectAnswersIntoStorage();
                                    this.setState({truth: true})
                                }


                                AuthenticationService.addCorrectAnswersIntoStorage();
                            } else {
                                document.getElementById("chosenOneAns3").className = "btn btn-danger col"
                                e.target.className = 'btn btn-danger col '
                            }
                        }
                        else if (this.state.chosenOne == "chosenOneAns4") {
                            if (this.state.tocan4 == "DA") {
                                document.getElementById("chosenOneAns4").className = "btn btn-success col"
                                if(this.state.truth != true) {
                                    console.log("povecali smo u " + this.state.chosenOne + "4")
                                    AuthenticationService.addCorrectAnswersIntoStorage();
                                    this.setState({truth: true})
                                }
                            } else {
                                document.getElementById("chosenOneAns4").className = "btn btn-danger col"
                                e.target.className = 'btn btn-danger col '
                            }
                        }
                    } else {
                        //render(<h1>Nije izabran niti jedan odgovor!</h1>)

                    }

                }



    }

    render() {

        let rows;

        return (
            <div>
                <NavBar/>
                {!this.state.kraj

              // staviti naziv igre i opis igre
                }
                {
                    this.state.kraj &&
                        <div>
                        <p> BRAVO ZAVRŠILI STE IGRU!</p>
                            <p>Odgovorili ste točno na {AuthenticationService.getNumberOfCorrectAnswersfromStorage()} od {AuthenticationService.getNumberOfQuestionsFromStorage()} pitanja</p>

                    <Button className={"btn btn-danger"} href="/api/ZabavnoUcenje/OdabirIgara">Vratite se na odabir igara!</Button>

            </div>}
                {!this.state.pushedNext &&
                <div className="container-fluid bg-info text-opacity-100">
                    <p>DOBRODOŠLI U IGRU, STISNITE GUMB SLJEDECE PITANJE KAKO BISTE ZAPOĆELI S IGROM</p>
                    </div>
                }
                <div className={"container-md"}>

                </div>

                { this.state.pushedNext && !this.state.kraj &&
                    <div className="button-box text-center container">
                        <div style={{height: 10 + 'rem'}}>{this.state.textpitanja}</div>
                        <div style={{height: 10 + 'rem'}} className={"row"}>
                            <button value={this.state.tocan1} id='chosenOneAns1' name={"chosenOne"}
                                    className='btn btn-info col'
                                    onClick={this.handleChange}>{this.state.odgovor1}</button>
                            <button value={this.state.tocan2} id='chosenOneAns2' name={"chosenOne"}
                                    className='btn btn-info col'
                                    onClick={this.handleChange}>{this.state.odgovor2}</button>
                        </div>
                        <div style={{height: 10 + 'rem'}} className={"row"}>
                            <button value={this.state.tocan3} id='chosenOneAns3' name={"chosenOne"}
                                    className='btn btn-info col'
                                    onClick={this.handleChange}>{this.state.odgovor3}</button>
                            <button value={this.state.tocan4} id='chosenOneAns4' name={"chosenOne"}
                                    className='btn btn-info col'
                                    onClick={this.handleChange}>{this.state.odgovor4}</button>
                        </div>

                    </div>
                }
                {!this.state.kraj &&

                <div>
                    <button className={"btn btn-primary"} onClick={this.handleNext}>Sljedeće pitanje</button>
                    <button className={"btn btn-warning"} onClick={this.handleAnswer} id = "checkAns" type={"submit"}>Provjeri odgovor</button>
                </div>
                }



                {/*<form onSubmit={this.handleAnswer}>*/}
                {/*    <input className="btn btn-secondary" type="submit"/>*/}
                {/*</form>*/}
                {/*<form onSubmit={this.handleNext}>*/}
                {/*    <input className="btn btn-primary" type="submit"/>*/}

                {/*</form>*/}


            </div>
        )
    }
}


export default GameComponent

