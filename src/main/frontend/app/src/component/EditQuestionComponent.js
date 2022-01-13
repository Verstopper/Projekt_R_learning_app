import AuthenticationService from "../services/AuthenticationService";
import NavBar from "./Navbar";
import React, {Component, useRef} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import QuestionService from "../services/QuestionService";
import AnswerService from "../services/AnswerService";
import AddAnswerComponent from "./AddAnswerComponent";
import * as PropTypes from "prop-types";
import EditGameComponent from "./EditGameComponent";

class AnswerRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        function goToAnswer(id, answerText, answerCorrectness) {
            console.log("ID ANSWER " + id)
            AuthenticationService.getAnswerIntoStorage(id, answerText, answerCorrectness);
        }

        function deleteAnswer(id) {
            let confirmed = window.confirm("Jeste li sigurni da želite izbrisati odgovor?");
            if(confirmed) AnswerService.deleteAnswers(id);
            window.location.reload(false);
        }

        return (
            <Container>
                <Row>
                    <Col md={4}>Naziv: {this.props.text}
                        <p> Točnost: {this.props.correctness} </p></Col>
                    <Col md={{span: 4, offset: 4}}><Button variant="danger"
                                                           onClick={() => deleteAnswer(this.props.id)}>Izbriši</Button>
                        <Button variant="warning"
                                onClick={() => goToAnswer(this.props.id, this.props.text, this.props.correctness)}
                                href={"/api/ZabavnoUcenje/odgovoruredi"}>Uredi</Button></Col>
                </Row>
            </Container>
        )
    }
}

class EditQuestionComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errors: '',
            password: '',
            success: undefined,
            answers: undefined,
            updatedName: sessionStorage.getItem("questionName"),
            updatedText: sessionStorage.getItem("questionText"),
            defaultName: sessionStorage.getItem("questionName"),
            defaultText: sessionStorage.getItem("questionText"),
            show: false,
            data: AnswerService.getNumberOfAnswers(AuthenticationService.getQuestionFromStorage())

        }


        this.state.data.then((result) =>{
            console.log("GELDAMO" + result.data)
            if(result.data == 4) {
            console.log("USLI SMO U NUTRA " + result)
            this.setState({show:true})}
        } , reason => {
            console.log("GRESKA")
        })



        this.handleQuestionUpdate = async (event) => {
            let id_question = AuthenticationService.getQuestionFromStorage();
            console.log("usao u handle update za question.....")
            console.log("updatetdQuestionName: " + this.state.updatedName);
            console.log("updatetdQuestionDescription: " + this.state.updatedText);
            console.log("id: " + id_question);
            event.preventDefault();
            let response = await QuestionService.updateQuestion(id_question, this.state.updatedName, this.state.updatedText);
            this.state.success = true;
            if (response.status >= 400) {
                this.state.success = false;
                this.setState({errors: 'Ažuriranje pitanja neuspjelo :(',})
            }
            if (this.state.success) {
                return (<EditGameComponent/>)
            }

        }

        this.handleChange = (event) => {
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
            if (answers.success) {
                let value = [];
                console.log("UNDEFINED" + answers.answers)
                for (let answer in answers.data) {

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
            } else {
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
        if (this.state.answers && this.state.success) {
            rows = []
            for (let answer in this.state.answers) {
                rows.push(<AnswerRow key={this.state.answers[answer].id}
                                     id={this.state.answers[answer].id}
                                     correctness={this.state.answers[answer].correctness}
                                     text={this.state.answers[answer].text}
                />)
                console.log(rows)
            }
        }
        if (this.state.answers && !this.state.success) {
            rows = this.state.answers;

        }


        return (
            <div>
                <NavBar/>
                <section>
                    <label>UREDITE SVOJE PITANJE</label>
                    <div   className="">
                        <section className="container container-px container-py">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-inputs">
                                    <label htmlFor="updatedName"></label>
                                    <input type="text" id="updatedName" name="updatedName"
                                           defaultValue={this.state.defaultName}
                                           value={this.state.updatedName} onChange={this.handleChange} required/>
                                </div>
                                <div className="form-inputs">
                                    <label htmlFor="updatedText"></label>
                                    <input type="text" id="updatedText" name="updatedText"
                                           defaultValue={this.state.defaultText}
                                           value={this.state.updatedText} onChange={this.handleChange} required/>
                                </div>
                                <button className={"btn btn-primary"} type="submit"
                                        onClick={this.handleQuestionUpdate}>Ažuriraj pitanje
                                </button>
                                <a className={"btn btn-danger"} href="javascript:history.go(-1)">Odustani</a>
                            </form>
                        </section>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <button className={"btn btn-secondary"} type="submit">Pregled odgovora</button>
                    </form>

                    {/*<Button className={"btn btn-secondary"} disabled={showButton()} href={"/api/ZabavnoUcenje/addAnswer"}>Dodaj odgovor</Button>*/}

                    <Button className={"btn btn-secondary"} disabled={this.state.show} href={"/api/ZabavnoUcenje/addAnswer"}>Dodaj odgovor</Button>
                    <form>
                        {rows && rows}
                    </form>
                </section>
            </div>
        )
    }
}

export default EditQuestionComponent;