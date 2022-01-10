import ProfessorService from "../services/ProfessorService";
import AuthenticationService from "../services/AuthenticationService";
import NavBar from "./Navbar";

import React, {Component, useState} from 'react';

import {Button, Col, Container, Row} from "react-bootstrap";
import QuestionService from "../services/QuestionService";
import GameService from "../services/GameService";
import ProfessorDashboard from "./ProfessorDashboard";

class QuestionRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        function goToQuestion(id) {
            console.log("ID QUESTION " + id)
            AuthenticationService.getQuestionIntoStorage(id);
            return
        }

        function deleteQuestion(id) {
            let response = QuestionService.deleteAllQuestions(id);
            window.location.reload(false);
        }

        return (
            <Container>
                <Row>
                    <Col md={4}>Naziv: {this.props.name}
                        <p> Text: {this.props.text} </p></Col>
                    <Col md={{span: 4, offset: 4}}><Button variant="danger"
                                                           onClick={() => deleteQuestion(this.props.id)}>Izbriši</Button>
                        <Button variant="warning" onClick={() => goToQuestion(this.props.id)}
                                href={"/api/ZabavnoUcenje/pitanjeuredi"}>Uredi</Button></Col>
                </Row>


            </Container>
        )


    }
}

class EditGameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errors: '',
            password: '',
            success: undefined,
            questions: undefined,
            updatedName: '',
            updatedDescription: '',
        }

        this.handleGameUpdate = async (event) => {
            console.log("usao u handle update.....")
            console.log("name: "+ this.props.name);
            console.log("description: "+ this.props.description);
            console.log("id: "+ this.state.id);
            event.preventDefault();
            let response = await GameService.updateGame(this.props.name, this.props.description, this.state.id);
            this.state.success = true;
            if(response.status >= 400){
                this.state.success = false;
                this.setState({errors: 'Ažuriranje igre neuspjelo :(',})
            }
            if(this.state.success){
                return(<ProfessorDashboard/>)
            }

        }

        this.handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        this.handleSubmit = async (event) => {
            event.preventDefault();
            let id_game = AuthenticationService.getGameFromStorage();
            console.log("ID igre + " + id_game)
            let questions = await QuestionService.getAllQuestions(id_game);
            console.log(questions.questions)
            console.log(questions.data)
            if (questions.success) {
                let value = [];
                console.log("UNDEFINED" + questions.questions)
                for (let question in questions.data) {
                    console.log("QUESTION " + question)
                    let obj = {
                        id: questions.data[question].id,
                        name: questions.data[question].name,
                        text: questions.data[question].text
                    }
                    value.push(obj)
                }
                this.setState({
                    questions: value,
                    success: true,
                })
            } else {
                let value = questions.questions
                this.setState({
                    questions: value,
                    success: false,
                })
            }
        }
    }

    render() {
        let rows;
        if (this.state.questions && this.state.success) {
            rows = []
            for (let question in this.state.questions) {
                rows.push(<QuestionRow key={this.state.questions[question].id}
                                       id={this.state.questions[question].id}
                                       name={this.state.questions[question].name}
                                       text={this.state.questions[question].text}
                />)
                console.log(rows)
            }
        }
        if (this.state.questions && !this.state.success) {
            rows = this.state.questions;

        }


        return (
            <div>
                <NavBar/>
                <section>
                    <label>UREDITE SVOJU IGRU!!</label>
                    <div className="">
                        <section className="container container-px container-py">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-inputs">
                                    <label htmlFor="name"></label>
                                    <input type="text" id="name" name="name"
                                           defaultValue={sessionStorage.getItem("gameName")}
                                           value={this.props.name} onChange={this.handleChange} required/>
                                </div>
                                <div className="form-inputs">
                                    <label htmlFor="description"></label>
                                    <input type="text" id="description" name="description"
                                           defaultValue={sessionStorage.getItem("gameDesc")}
                                           value={this.props.description} onChange={this.handleChange} required/>
                                </div>

                                {/*<div className="form-inputs">*/}
                                {/*    <label htmlFor="oib"></label>*/}
                                {/*    <input type="text" id="oib" name="oib" placeholder="OIB"*/}
                                {/*           value={this.state.oib} onChange={this.handleChange} required/>*/}
                                {/*</div>*/}
                                <button className={"btn btn-primary"} type="submit" onClick={this.handleGameUpdate}>Ažuriraj igru</button>
                                <a className={"btn btn-danger"} href="javascript:history.go(-1)">Odustani</a>
                            </form>
                        </section>
                    </div>
                    <form onSubmit={this.handleSubmit}>

                        <button className={"btn btn-secondary"} type="submit">Pregled pitanja</button>
                    </form>
                    /
                    <Button variant="warning" href={"/api/ZabavnoUcenje/addQuestion"}>Dodaj pitanje</Button>
                    <form>
                        {rows && rows}
                    </form>
                </section>
            </div>
        )
    }
}

export default EditGameComponent;