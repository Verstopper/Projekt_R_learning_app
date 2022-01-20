import React from 'react'
import AuthenticationService from "../services/AuthenticationService";
import QuestionService from "../services/QuestionService";
import MyHeader from "./MyHeader";
import Title from "antd/lib/typography/Title";
import MyFooter from "./MyFooter";
import Layout, {Content} from "antd/lib/layout/layout";
import {Button, Space} from "antd";

class AddQuestionComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            errors: {},
            hasLoginFailed: true,
            showSuccessMessage: false
        }
        this.handleChange = (event) => {
            this.setState(
                {
                    [event.target.name]: event.target.value
                }
            )
        }
        this.handleSubmit = async (event) => {
            event.preventDefault();
            let idGame = AuthenticationService.getGameFromStorage();
            let response = await QuestionService.addQuestion(idGame, this.state.name, this.state.description);
            if (response.success === false) {
                this.setState(
                    {
                        errors: 'Dodvanje pitanja je bilo neuspješno',
                    }
                )
            }
            window.location.href = "/api/ZabavnoUcenje/igrauredi";
        }
    }

    render() {

        return (
            <div className="">
                <Layout>
                    <MyHeader/>
                    <Content
                        style={{background: "white", position: "fixed", top: '25%', left: 0, right: 0, bottom: 0}}>
                        <Title style={{fontFamily: "Gabriola", alignContent: 'space-evenly'}}>
                            Kreiraj pitanje: </Title>
                        <section className="container container-px container-py">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-inputs">
                                    <input type="text" id="name" name="name" placeholder="Naziv pitanja"
                                           value={this.state.name} onChange={this.handleChange} required/>
                                </div>
                                <div className="form-inputs">
                                    <input type="text" id="description" name="description" placeholder="Opis pitanja"
                                           value={this.state.description} onChange={this.handleChange} required/>
                                </div>
                                <p/>
                                <Space size={"middle"}>
                                    <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                            htmlType={"submit"}>Dodaj</Button>
                                    <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                            href={"/api/ZabavnoUcenje/igrauredi"}>Odustani</Button>
                                </Space></form>
                        </section>
                    </Content>
                    <MyFooter/>
                </Layout>
            </div>
        );
    }
}

export default AddQuestionComponent;