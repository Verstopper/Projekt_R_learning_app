import ProfessorService from "../services/ProfessorService";
import AuthenticationService from "../services/AuthenticationService";
import NavBar from "./Navbar";

import React, {Component, useState} from 'react';

import {Button, Col, Container, Row} from "react-bootstrap";
import QuestionService from "../services/QuestionService";

class QuestionRow extends Component{
    constructor(props) {
        super(props);
    }

    render() {

        function goToQuestion(id) {
            AuthenticationService.getQuestionIntoStorage(id);
            return
        }
        return(
            <Container>
                <Row>
                    <Col  md={4}>Naziv: {this.props.name}
                        <p> Text: {this.props.text} </p> </Col>
                    <Col md={{ span: 4, offset: 4 }}><Button variant="danger">Izbriši</Button>
                        <Button variant="warning" onClick={() => goToQuestion(this.state.id)} href={"/api/ZabavnoUcenje/pitanjeuredi"}>Uredi</Button></Col>
                </Row>


            </Container>
        )


    }
}

class EditGameComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errors: '',
            password: '',
            success: undefined,
            questions: undefined
        }

        this.handleChange = (event) =>{
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        this.handleSubmit = async (event) => {
            event.preventDefault();
            let id_game = AuthenticationService.getGameFromStorage();
            console.log("ID igre + " +id_game)
            let questions = await QuestionService.getAllQuestions(id_game);
            console.log(questions.questions)
            console.log(questions.data)
            if(questions.success){
                let value = [];
                console.log("UNDEFINED" + questions.questions)
                for (let question in questions.data){
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
            }else{
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
        if(this.state.questions && this.state.success){
            rows = []
            for(let question in this.state.questions){
                rows.push(<QuestionRow key={this.state.questions[question].id}
                                   id = {this.state.questions[question].id}
                                   name={this.state.questions[question].name}
                                   text={this.state.questions[question].text}
                />)
                console.log(rows)
            }
        }
        if(this.state.questions && !this.state.success){
            rows = this.state.questions;

        }


        return(
            <div>
                <NavBar />
                <section>
                    <label>UREDITE SVOJU IGRU!!</label>
                     <form onSubmit={this.handleSubmit}>

                        <button className={"btn btn-secondary"} type="submit">Pregled pitanja</button>
                     </form>/
                         <button variant = "warning" href={"/api/ZabavnoUcenje/addQuestion"}>Dodaj pitanje</button>
                    <form>
                        {rows && rows}
                    </form>
                </section>
            </div>
        )
    }
}
export default EditGameComponent;