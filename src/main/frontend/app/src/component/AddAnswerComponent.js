import React from 'react'

import AuthenticationService from "../services/AuthenticationService";

import AnswerService from "../services/AnswerService";
import MyHeader from "./MyHeader";
import Title from "antd/lib/typography/Title";
import Layout, {Content} from "antd/lib/layout/layout";
import MyFooter from "./MyFooter";
import {Button, Space} from "antd";

class AddAnswerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            name2: '',
            name3: '',
            name4: '',
            check1: false,
            check2: false,
            check3: false,
            check4: false,
            errors: {},
            hasLoginFailed: true,
            showSuccessMessage: false,
            success: true,
            wrong: true
        }
        this.handleChange = (event) => {
            this.setState(
                {
                    [event.target.name]: event.target.value,

                }
            )

        }
        this.handleSubmit = async (event) => {
            event.preventDefault();
            console.log(this.state.check1, this.state.check2, this.state.check3, this.state.check4)
            if (this.state.check1 === true && this.state.check3 === true && this.state.check2 === true && this.state.check4 === true) {
                this.setState(
                    {
                        wrong: false
                    }
                )
            }
            if (this.state.check1 === false && this.state.check2 === false) {
                this.setState(
                    {
                        wrong: false
                    }
                )
            } else if (this.state.check1 === false && this.state.check3 === false) {
                this.setState(
                    {
                        wrong: false
                    }
                )
            } else if (this.state.check1 === false && this.state.check4 === false) {
                this.setState(
                    {
                        wrong: false
                    }
                )
            } else if (this.state.check2 === false && this.state.check3 === false) {
                this.setState(
                    {
                        wrong: false
                    }
                )
            } else if (this.state.check2 === false && this.state.check4 === false) {
                this.setState(
                    {
                        wrong: false
                    }
                )
            } else if (this.state.check3 === false && this.state.check4 === false) {
                this.setState(
                    {
                        wrong: false
                    }
                )
            }
            if (this.state.wrong) {
                let idquestion = AuthenticationService.getQuestionFromStorage();
                let response = await AnswerService.addAnswer(idquestion, this.state.name, this.state.check1, this.state.name2, this.state.check2, this.state.name3, this.state.check3, this.state.name4, this.state.check4)

                if (response.success === false) {
                    this.setState(
                        {
                            errors: 'Dodavanje odgovora je bilo neuspješno',
                        }
                    )
                    this.state.success = false;
                    window.location.href = "/api/ZabavnoUcenje/pitanjeuredi";
                } else {
                    this.state.success = true;
                    window.location.href = "/api/ZabavnoUcenje/pitanjeuredi";
                }
            } else {
                this.setState({
                    errors: 'Dodvanje odgovora je bilo neuspješno',
                })
            }
        }

    }

    render() {
        return (
            <div className="">
                <Layout>
                    <MyHeader/>
                    <Content
                        style={{background: "white", position: "fixed", top: '12%', left: 0, right: 0, bottom: 0}}>
                        <Title style={{fontFamily: "Gabriola", alignContent: 'space-evenly'}}>
                            Kreiraj odgovore: </Title>
                        <section className="container container-px container-py">
                            <form onSubmit={this.handleSubmit}>
                                <Space>
                                    <input className="form-check-input" type="radio" name="correctOne"
                                           id="correctOne"
                                           value={this.state.check1} onChange={this.handleChange}
                                           aria-label="TOČAN ODGOVOR"/>
                                    <input type="text" id="name" name="name" placeholder="Naziv odgovora"
                                           value={this.state.name} onChange={this.handleChange} size={100} required/>
                                </Space>
                                <Space>
                                    <input className="form-check-input" type="radio" name="correctOne"
                                           id="correctOne"
                                           value={this.state.check2} onChange={this.handleChange}
                                           aria-label="TOČAN ODGOVOR"/>
                                    <input type="text" id="name2" name="name2" placeholder="Naziv odgovora"
                                           value={this.state.name2} onChange={this.handleChange} size={100} required/>
                                </Space>
                                <Space>
                                    <input className="form-check-input" type="radio" name="correctOne"
                                           id="correctOne"
                                           value={this.state.check3} onChange={this.handleChange}
                                           aria-label="TOČAN ODGOVOR"/>
                                    <input type="text" id="name3" name="name3" placeholder="Naziv odgovora"
                                           value={this.state.name3} onChange={this.handleChange} size={100} required/>
                                </Space>
                                <Space>
                                    <input className="form-check-input" type="radio" name="correctOne"
                                           id="correctOne"
                                           value={this.state.check4} onChange={this.handleChange}
                                           aria-label="TOČAN ODGOVOR"/>
                                    <input type="text" id="name4" name="name4" placeholder="Naziv odgovora"
                                           value={this.state.name4} onChange={this.handleChange} size={100} required/>

                                </Space>
                                <p/>
                                {
                                    !this.state.success &&
                                    <p>Došlo je do greške prilikom dodavanja igre. Pokušajte ponovno</p>
                                }
                                {
                                    this.state.wrong &&
                                    <Title style={{fontFamily: "Gabriola", alignContent: 'space-evenly'}}>
                                        Samo jedan odgovor je točan!</Title>
                                }
                                <Space size={"middle"}>
                                    <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                            htmlType={"submit"} onClick={this.handleSubmit}>Dodaj odgovore</Button>
                                    <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                            href={"/api/ZabavnoUcenje/pitanjeuredi"}>Odustani</Button>
                                </Space>
                            </form>
                        </section>
                    </Content>
                    <MyFooter/>
                </Layout>
            </div>
        );
    }
}


export default AddAnswerComponent;