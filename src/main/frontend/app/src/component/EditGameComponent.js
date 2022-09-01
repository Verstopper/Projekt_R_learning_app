import AuthenticationService from "../services/AuthenticationService";
import NavBar from "./Navbar";
import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import QuestionService from "../services/QuestionService";
import GameService from "../services/GameService";
import ProfessorDashboard from "./ProfessorDashboard";
import MyHeader from "./MyHeader";
import Layout, {Content} from "antd/lib/layout/layout";
import MyFooter from "./MyFooter";
import Title from "antd/lib/typography/Title";
import {Space, Button, Card} from "antd";

class QuestionRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        function goToQuestion(id, questionName, questionText) {
            AuthenticationService.getQuestionIntoStorage(id, questionName, questionText);
        }

        function deleteQuestion(id) {
            let confirmed = window.confirm("Jeste li sigurni da želite izbrisati pitanje?")
            if (confirmed) QuestionService.deleteAllQuestions(id);
            window.location.reload(false);
        }

        return (
            <Container>
                <p/>
                <Card>
                    <p> Naziv: {this.props.name}</p>
                    <p> Opis: {this.props.text} </p>
                    <Space>
                        <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                onClick={() => deleteQuestion(this.props.id)}>Izbriši</Button>
                        <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                onClick={() => goToQuestion(this.props.id, this.props.name, this.props.text)}
                                href={"/api/ZabavnoUcenje/pitanjeuredi"}>Uredi</Button>
                    </Space>
                </Card>
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
            updatedName: sessionStorage.getItem("gameName"),
            updatedDescription: sessionStorage.getItem("gameDesc"),
            defaultname: sessionStorage.getItem("gameName"),
            defaultDescription: sessionStorage.getItem("gameDesc")
        }

        this.handleGameUpdate = async (event) => {
            let id_game = AuthenticationService.getGameFromStorage();
            event.preventDefault();
            let response = await GameService.updateGame(id_game, this.state.updatedName, this.state.updatedDescription);
            this.state.success = true;
            if (response.status >= 400) {
                this.state.success = false;
                this.setState({errors: 'Ažuriranje igre neuspjelo :(',})
            }
            if (this.state.success) {
                return (<ProfessorDashboard/>)
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
            let questions = await QuestionService.getAllQuestions(id_game);
            if (questions.success) {
                let value = [];
                for (let question in questions.data) {
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
            }
        }
        if (this.state.questions && !this.state.success) {
            rows = this.state.questions;

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
                            Uredite igru: </Title>
                        <section className="container container-px container-py">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-inputs">
                                    <input type="text" id="updatedName" name="updatedName"
                                           defaultValue={this.state.defaultname}
                                           value={this.state.updatedName} onChange={this.handleChange} required/>
                                </div>
                                <div className="form-inputs">
                                    <input type="text" id="updatedDescription" name="updatedDescription"
                                           defaultValue={this.state.defaultDescription}
                                           value={this.state.updatedDescription} onChange={this.handleChange} required/>
                                </div>
                                <p/>
                                <Space size={"middle"}>
                                    <Button style={{background: '#5B3758', color: "white"}} htmlType={"submit"}
                                            onClick={this.handleGameUpdate}>Ažuriraj igru</Button>
                                    <Button style={{background: '#5B3758', color: "white"}} htmlType={"submit"}
                                            onSubmit={this.handleSubmit}>Pregled pitanja</Button>
                                    <Button style={{background: '#5B3758', color: "white"}}
                                            href={"/api/ZabavnoUcenje/addQuestion"}>Dodaj pitanje</Button>
                                    <Button style={{background: '#5B3758', color: "white"}}
                                            href={"/api/ZabavnoUcenje/profesor/pregledIgara"}>Odustani</Button>
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

export default EditGameComponent;