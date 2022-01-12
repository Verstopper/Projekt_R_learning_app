import ProfessorService from "../services/ProfessorService";
import AuthenticationService from "../services/AuthenticationService";
import NavBar from "./Navbar";
import React, {Component, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import GameService from "../services/GameService";
import Popup from './Popup';
import QuestionService from "../services/QuestionService";
import {forEach} from "react-bootstrap/ElementChildren";


function QuestionRow() {
    return null;
}

class GameComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultName: AuthenticationService.getGameNameFormStorage(),
            defaultDescription : AuthenticationService.getDescriptionFromStorage(),
            success: undefined,
            questions: QuestionService.getAllQuestions(AuthenticationService.getGameFromStorage()),

        }
        console.log("Q" + this.state.questions);
        this.handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        let rows = QuestionService.getAllQuestions(AuthenticationService.getGameFromStorage());
        console.log("E" + rows)
        this.handleSubmit = async (event) => {
            event.preventDefault();
            let dataQ;
            let row = [];
            let all = await rows;
            console.log("he" + all);
            rows.then(function(result) {
                console.log(result.data);
                dataQ = result.data;
                for(let item in result.data) {
                    console.log("item" + result.data[item].id)
                    row.push(<QuestionRow key={result.data[item].id}
                                          id={result.data[item].name}></QuestionRow>
                    )
                }
                // "Promise resolved successfully"
            }, err => {
                console.log(err); // Error: "Promise rejected"
            });
            console.log("AAAAA")
          for(let item in dataQ) {
              console.log("item" + dataQ[item].id)
              row.push(<QuestionRow key = {dataQ[item].id}
                                    id = {dataQ[item].name}></QuestionRow>
            )
              console.log("row" + row)
          }


        }
    }

    render() {


        return (
            <div>
                <NavBar/>

                    <p> IGRAŠ IGRU:  + {this.state.defaultName} </p>
                    <p>OPIS: {this.state.defaultDescription}</p>
                <form className="korisnik__odabir" onSubmit={this.handleSubmit}>
                    <button className="btn btn-primary" type="submit">Prijava</button>
                    <a className={"btn btn-danger"} href={"/"}>Odustani</a>
                </form>

                {row}
            </div>
        )
    }
}

export default GameComponent