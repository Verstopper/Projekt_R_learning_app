/*import ProfessorService from "../services/ProfessorService";
import AuthenticationService from "../services/AuthenticationService";
import NavBar from "./Navbar";
import React, {Component, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import GameService from "../services/GameService";
import Popup from './Popup';
import QuestionService from "../services/QuestionService";
import {forEach} from "react-bootstrap/ElementChildren";
import triggerBrowserReflow from "react-bootstrap/triggerBrowserReflow";


class QuestionRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("PROPs")
        console.log(this.props)


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
            defaultDescription : AuthenticationService.getDescriptionFromStorage(),
            success: false,
            questions: ''

        }

        this.handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        this.handleSubmit = async (event) => {
            event.preventDefault();

            let yes = await QuestionService.getAllQuestions(AuthenticationService.getGameFromStorage());
            if(yes.success) {
                this.setState( {
                    questions : yes.data,
                    success: true
                })
            }

        }


    }

    render() {

        let rows;
        if(this.state.success) {
        rows = []

        this.state.questions.forEach((item,i) => rows.push(<QuestionRow key={item.id} name={item.name} i={i++}/>))
        }

        return (
            <div>
                <NavBar/>

                    <p> IGRAŠ IGRU:  + {this.state.defaultName} </p>
                    <p>OPIS: {this.state.defaultDescription}</p>
                <form className="korisnik__odabir" onSubmit={this.handleSubmit}>
                    <button className="btn btn-primary" type="submit">ZAPOČNI IGRU</button>
                    <a className={"btn btn-danger"} href={"/"}>Odustani</a>
                </form>
                <p>ISPOD JE ROW hehe</p>
                <form>{this.state.questions.map((item) => (
                    <p>{item.id}</p>
                ) ) }</form>



            </div>
        )
    }
}

export default GameComponent

*/