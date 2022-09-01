import AuthenticationService from "../services/AuthenticationService";
import NavBar from "./Navbar";
import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import QuestionService from "../services/QuestionService";
import AnswerService from "../services/AnswerService";

import EditGameComponent from "./EditGameComponent";
import MyHeader from "./MyHeader";
import Title from "antd/lib/typography/Title";
import {Button, Card, Space} from "antd";
import Layout, {Content} from "antd/lib/layout/layout";
import MyFooter from "./MyFooter";

class AnswerRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        function goToAnswer(id, answerText, answerCorrectness) {
            AuthenticationService.getAnswerIntoStorage(id, answerText, answerCorrectness);
        }

        function deleteAnswer(id) {
            let confirmed = window.confirm("Jeste li sigurni da želite izbrisati odgovor?");
            if (confirmed) AnswerService.deleteAnswers(id);
            window.location.reload(false);
        }

        return (
            <Container>
                <p/>
                <Card>
                    <p> Naziv: {this.props.text}</p>
                    <p> Točnost: {this.props.correctness} </p>
                    <Space>
                        <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                onClick={() => deleteAnswer(this.props.id)}>Izbriši</Button>
                        <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                onClick={() => goToAnswer(this.props.id, this.props.text, this.props.correctness)}
                                href={"/api/ZabavnoUcenje/odgovoruredi"}>Uredi</Button>
                    </Space>
                </Card>
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


        this.state.data.then((result) => {
            if (result.data == 4) {
                this.setState({show: true})
            }
        })


        this.handleQuestionUpdate = async (event) => {
            let id_question = AuthenticationService.getQuestionFromStorage();
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
            let answers = await AnswerService.getAllAnswers(id_question)
            if (answers.success) {
                let value = [];
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
            }
        }
        if (this.state.answers && !this.state.success) {
            rows = this.state.answers;
        }

        return (
            <div>
                <Layout>
                    <MyHeader/>
                    <NavBar/>
                    <Content
                        style={{background: "white", position: "relative", top: '20%', left: 0, right: 0, bottom: 0}}>
                        <br/>
                        <Title style={{fontFamily: "Gabriola", alignContent: 'space-evenly'}}>
                            Uredite pitanje: </Title>
                        <section className="container container-px container-py">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-inputs">
                                    <input type="text" id="updatedName" name="updatedName"
                                           defaultValue={this.state.defaultName}
                                           value={this.state.updatedName} onChange={this.handleChange} required/>
                                </div>
                                <div className="form-inputs">
                                    <input type="text" id="updatedText" name="updatedText"
                                           defaultValue={this.state.defaultText}
                                           value={this.state.updatedText} onChange={this.handleChange} required/>
                                </div>
                                <p/>
                                <Space size={"middle"}>
                                    <Button style={{background: '#5B3758', color: "white"}} htmlType={"submit"}
                                            onClick={this.handleQuestionUpdate}>Ažuriraj pitanje</Button>
                                    <Button style={{background: '#5B3758', color: "white"}} htmlType={"submit"}
                                            onSubmit={this.handleSubmit}>Pregled odgovora</Button>
                                    <Button style={{background: '#5B3758', color: "white"}}
                                            href={"/api/ZabavnoUcenje/addAnswer"} disabled={this.state.show}>Dodaj
                                        odgovore</Button>
                                    <Button style={{background: '#5B3758', color: "white"}}
                                            href={"/api/ZabavnoUcenje/igrauredi"}>Odustani</Button>
                                </Space>
                            </form>
                            <form>
                                {rows && rows}
                            </form>
                        </section>
                    </Content>
                    <Content style={{background: "white"}}><br/></Content>
                    <Content style={{background: "white"}}><br/></Content>
                    <Content style={{background: "white"}}><br/></Content>
                    <MyFooter/>
                </Layout>
            </div>
        )
    }
}

export default EditQuestionComponent;