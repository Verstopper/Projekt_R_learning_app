import ProfessorService from "../services/ProfessorService";
import AuthenticationService from "../services/AuthenticationService";
import NavBar from "./Navbar";

import React, {Component, useState} from 'react';

import {Button, Col, Container, Row} from "react-bootstrap";
import QuestionService from "../services/QuestionService";
import AnswerService from "../services/AnswerService";
import AddAnswerComponent from "./AddAnswerComponent";

class AnswerRow extends Component{
    constructor(props) {
        super(props);
    }

    render() {

        function deleteAnswer(id) {
            AnswerService.deleteAnswers(id);
            window.location.reload(false);
            return
        }
        return(
            <Container>
                <Row>
                    <Col  md={4}>Naziv: {this.props.text}
                        <p> Točnost: {this.props.correctness} </p> </Col>
                    <Col md={{ span: 4, offset: 4 }}><Button variant="danger" onClick={() => deleteAnswer(this.props.id)}>Izbriši</Button>
                        <Button variant="warning" href={""}>Uredi</Button></Col>
                </Row>


            </Container>
        )


    }
}

class EditQuestionComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errors: '',
            password: '',
            success: undefined,
            answers: undefined
        }

        this.handleChange = (event) =>{
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        this.handleSubmit = async (event) => {
            event.preventDefault();
            let id_question = AuthenticationService.getQuestionFromStorage();
            console.log("SVI ODGOVROI OD PITANJA SA ID " + id_question)
            let answers = await AnswerService.getAllAnswers(id_question)
            console.log(answers.questions)
            console.log(answers.data)
            if(answers.success){
                let value = [];
                console.log("UNDEFINED" + answers.answers)
                for (let answer in answers.data){

                    let obj = {
                        id: answers.data[answer].id,
                        correctness: answers.data[answer].correctness,
                        text: answers.data[answer].text
                    }
                    value.push(obj)
                }
                this.setState({
                    answers: value,
                    success: true,
                })
            }else{
                let value = answers.answers
                this.setState({
                    answers: value,
                    success: false,
                })
            }
        }
    }

    render() {



        let rows;
        if(this.state.answers && this.state.success){
            rows = []
            for(let answer in this.state.answers){
                rows.push(<AnswerRow key={this.state.answers[answer].id}
                                       id = {this.state.answers[answer].id}
                                       correctness={this.state.answers[answer].correctness}
                                       text={this.state.answers[answer].text}
                />)
                console.log(rows)
            }
        }
        if(this.state.answers && !this.state.success){
            rows = this.state.answers;

        }

        function goTo() {
            console.log("RADI GUMB")
            return <AddAnswerComponent />
        }

        return(
            <div>
                <NavBar />
                <section>
                    <label>UREDITE SVOJE PITANJE</label>
                    <form onSubmit={this.handleSubmit}>
                        <button className={"btn btn-secondary"} type="submit">Pregled odgovora</button>
                    </form>
                    <button className={"btn btn-secondary"} onClick={() => goTo()}  >Dodaj odgovor</button>



                    <form>
                        {rows && rows}
                    </form>
                </section>
            </div>
        )
    }
}
export default EditQuestionComponent;