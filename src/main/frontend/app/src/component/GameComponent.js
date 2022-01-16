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
            tocan1:'',
            tocan2:'',
            tocan3:'',
            tocan4:'',
            chosenOne: undefined,
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
                    odgovor4: allAnswers.data[3].text,
                    tocan1: allAnswers.data[0].correctness,
                    tocan2: allAnswers.data[1].correctness,
                    tocan3: allAnswers.data[2].correctness,
                    toacn4: allAnswers.data[3].correctness

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

        this.handleAnswer = async (e) => {
            e.preventDefault();
            if(this.state.chosenOne != undefined) {
                console.log("izabran je odgovor idemo provjeirtit")
                console.log(this.state.chosenOne)
                if(this.state.chosenOne == 1) {
                    if(this.state.tocan1 == "DA") {
                        e.target.className = 'btn btn-success col '
                    }else {
                        e.target.className = 'btn btn-error col '
                    }
                }if(this.state.chosenOne == 12) {
                    if(this.state.tocan1 == "DA") {
                        e.target.className = 'btn btn-success col '
                    }else {
                        e.target.className = 'btn btn-error col '
                    }
                }if(this.state.chosenOne == 3) {
                    if(this.state.tocan1 == "DA") {
                        e.target.className = 'btn btn-success col '
                    }else {
                        e.target.className = 'btn btn-error col '
                    }
                }if(this.state.chosenOne == 4) {
                    if(this.state.tocan1 == "DA") {
                        e.target.className = 'btn btn-success col '
                    }else {
                        e.target.className = 'btn btn-error col '
                    }
                }
            } else {
                console.log("nije izabran niti jedan odgovor") }
        }

        //ovo radi samo u jednom smjeru popravit cu kasnije --Mislav
        //sad radi za sve gumbe i kad se stisne jednom ode u zuto, drugi put kad se stisne u plavo itd...
        //sad bi tu mozda bilo fora staviti da zapamti koji je stisnut i kad se stisne submit se poboja
        // koji je bio tocan a koji netocan na ovu foru samo sa zeleno crveno (success je zeleno, danger je crveno)
        let count1 = 0;
        this.handleColor1 = (e)=>{
            e.preventDefault();
            console.log("this is working fine");
            this.setState({
                chosenOne : e.target.value
            })
            console.log("ovo je chosenOne 1" + this.state.chosenOne);

            console.log(e.target);
            if (count1 == 0) {
                e.target.className = 'btn btn-warning col '
                count1 = 1;
            }
            else {
                e.target.className = 'btn btn-info col '
                count1 = 0;
            }
        }
        let count2 = 0;
        this.handleColor2 = (e)=>{
            console.log("this is working fine");
            this.setState({
                [e.target.name]: e.target.value
            })
            console.log("ovo je chosenOne 2" + this.state.chosenOne);
            e.preventDefault();
            console.log(e.target);
            if (count2 == 0) {
                e.target.className = 'btn btn-warning col '
                count2 = 1;
            }
            else {
                e.target.className = 'btn btn-info col '
                count2 = 0;
            }
        }
        let count3 = 0;
        this.handleColor3 = (e)=>{
            console.log("this is working fine");
            this.setState({
                [e.target.name]: e.target.value
            })
            console.log("ovo je chosenOne 3" + this.state.chosenOne);
            e.preventDefault();
            console.log(e.target);
            if (count3 == 0) {
                e.target.className = 'btn btn-warning col '
                count3 = 1;
            }
            else {
                e.target.className = 'btn btn-info col '
                count3 = 0;
            }
        }
        let count4 = 0;
        this.handleColor4 = (e)=>{
            console.log("this is working fine");
            this.setState({
                [e.target.name]: e.target.value
            })
            console.log("ovo je chosenOne 4" + this.state.chosenOne);
            e.preventDefault();
            console.log(e.target);
            if (count4 == 0) {
                e.target.className = 'btn btn-warning col '
                count4 = 1;
            }
            else {
                e.target.className = 'btn btn-info col '
                count4 = 0;
            }
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


                <div className={"container-md"}>

                </div>


                <div className="button-box text-center container">
                    <div style={{height: 10 + 'rem'}} className={"row"}>
                            <button value={1} id='chosenOne' name={"chosenOne"} type="radio" className='btn btn-info col' onClick={this.handleColor1}>{this.state.odgovor1}</button>
                            <button value={2} id='chosenOne' name={"chosenOne"}  type="radio" className='btn btn-info col' onClick={this.handleColor2}>{this.state.odgovor2}</button>
                    </div>
                    <div style={{height: 10 + 'rem'}} className={"row"}>
                        <button value={3} id='chosenOne' name={"chosenOne"} type="radio" className='btn btn-info col' onClick={this.handleColor3}>{this.state.odgovor3}</button>
                        <button value={4} id='chosenOne' name={"chosenOne"} type="radio" className='btn btn-info col' onClick={this.handleColor4}>{this.state.odgovor4}</button>
                    </div>

                </div>


                <p>{this.state.idpitanja}</p>
                <p>{this.state.namepitanja}</p>
                <p>{this.state.textpitanja}</p>
                <p>{this.state.odgovor1}</p>
                <p>{this.state.odgovor2}</p>
                <p>{this.state.odgovor3}</p>
                <p>{this.state.odgovor4}</p>
                <p>{this.state.kraj} </p>


                <form onSubmit={this.handleAnswer}>
                    <input className="btn btn-secondary" type="submit"/>
                </form>
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

