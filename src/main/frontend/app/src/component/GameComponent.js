import AuthenticationService from "../services/AuthenticationService";
import React, {Component} from 'react';
import QuestionService from "../services/QuestionService";
import AnswerService from "../services/AnswerService";
import {Button, Space} from "antd";
import MyHeader from "./MyHeader";
import MyFooter from "./MyFooter";
import Layout, {Content} from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";


class GameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultName: AuthenticationService.getGameNameFormStorage(),
            defaultDescription: AuthenticationService.getDescriptionFromStorage(),
            success: false,
            questions: '',
            brojac: 0,
            idpitanja: '',
            namepitanja: '',
            textpitanja: '',
            odgovor1: '',
            odgovor2: '',
            odgovor3: '',
            odgovor4: '',
            tocan1: '',
            tocan2: '',
            tocan3: '',
            tocan4: '',
            chosenOne: undefined,
            kraj: false,
            pushedNext: false,
            confirmed: false,
            truth: false,
        }

        this.handleNext = async (event) => {
            event.preventDefault();
            let confirmed = false;
            let goNext = true;
            let prvo = false;
            if (this.state.pushedNext) {
                if (this.state.chosenOne == undefined) {
                    confirmed = window.confirm("Jeste li sigurni da želite preskočiti ovo pitanje?" + "Niti jedan odgovro nije odabran");
                    if (confirmed) {
                        goNext = true;
                    } else {
                        goNext = false;
                    }

                } else if (!this.state.confirmed) {
                    confirmed = window.confirm("Jeste li sigurni da ne želite provjeriti ovaj odgovor?")
                    goNext = confirmed;
                }
            } else {
                AuthenticationService.inicializeNumberOfAnswers();
                prvo = true;
            }

            this.setState({
                pushedNext: true
            })

            if (goNext) {
                if (!prvo) {
                    console.log("reset colors")
                    resetColors();
                }

                let yes = await QuestionService.getAllQuestions(AuthenticationService.getGameFromStorage());
                AuthenticationService.getNumberOfQuestionsIntoStorage(yes.data.length);

                if (this.state.brojac == yes.data.length) {// ovo oznacava zadnje pitanje
                    this.setState({
                        kraj: true
                    })
                }


                if (!this.state.kraj) {
                    let idQuestion = yes.data[this.state.brojac].id;
                    let allAnswers = await AnswerService.getAllAnswers(idQuestion);

                    this.setState(({
                        idpitanja: yes.data[this.state.brojac].id,
                        namepitanja: yes.data[this.state.brojac].name,
                        textpitanja: yes.data[this.state.brojac].text,
                        brojac: ++this.state.brojac,
                        odgovor1: allAnswers.data[0].text,
                        odgovor2: allAnswers.data[1].text,
                        odgovor3: allAnswers.data[2].text,
                        odgovor4: allAnswers.data[3].text,
                        tocan1: allAnswers.data[0].correctness,
                        tocan2: allAnswers.data[1].correctness,
                        tocan3: allAnswers.data[2].correctness,
                        tocan4: allAnswers.data[3].correctness

                    }));
                }

                if (this.state.truth != true) {

                    if (this.state.chosenOne == "chosenOneAns1") {
                        if (this.state.tocan1 == "DA") {
                            AuthenticationService.addCorrectAnswersIntoStorage();
                        }
                    } else if (this.state.chosenOne == "chosenOneAns2") {
                        if (this.state.tocan2 == "DA") {
                            AuthenticationService.addCorrectAnswersIntoStorage();
                        }
                    } else if (this.state.chosenOne == "chosenOneAns3") {
                        if (this.state.tocan3 == "DA") {
                            AuthenticationService.addCorrectAnswersIntoStorage();
                        }
                    } else if (this.state.chosenOne == "chosenOneAns4") {
                        if (this.state.tocan4 == "DA") {
                            AuthenticationService.addCorrectAnswersIntoStorage();
                        }
                    }
                }
                this.setState({
                    chosenOne: undefined, confirmed: false, truth: undefined
                })
            }
        }

        function resetColors() {
            document.getElementById("checkAns").style.backgroundColor = "#5B3758"
            console.log("USO SAM U RESET COLORS")
            document.getElementById("chosenOneAns1").style.backgroundColor = "#B48EAE"
            document.getElementById("chosenOneAns2").style.backgroundColor = "#B48EAE"
            document.getElementById("chosenOneAns3").style.backgroundColor = "#B48EAE"
            document.getElementById("chosenOneAns4").style.backgroundColor = "#B48EAE"

        }

        this.handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.id
            })
            console.log("handle change")
            resetColors();

        }


        this.handleAnswer = async (e) => {
            e.preventDefault();
            this.setState({
                confirmed: true
            })
            if (this.state.chosenOne != undefined) {
                console.log("provjeravamo točnost truth je" + this.state.truth)
                if (this.state.chosenOne == "chosenOneAns1") {
                    if (this.state.tocan1 == "DA") {
                        document.getElementById("chosenOneAns1").style.backgroundColor = "green"
                        document.getElementById("checkAns").style.backgroundColor = "green"
                        if (this.state.truth != true) {
                            console.log("povecali smo u " + this.state.chosenOne + "1")
                            AuthenticationService.addCorrectAnswersIntoStorage();
                            this.setState({truth: true})
                        }
                    } else {
                        document.getElementById("chosenOneAns1").style.backgroundColor = "red"
                        document.getElementById("checkAns").style.backgroundColor = "red"

                    }
                } else if (this.state.chosenOne == "chosenOneAns2") {
                    if (this.state.tocan2 == "DA") {
                        document.getElementById("chosenOneAns2").style.backgroundColor = "green"
                        document.getElementById("checkAns").style.backgroundColor = "green"

                        if (this.state.truth != true) {
                            console.log("povecali smo u " + this.state.chosenOne + "2")
                            AuthenticationService.addCorrectAnswersIntoStorage();
                            this.setState({truth: true})
                        }
                    } else {
                        document.getElementById("chosenOneAns2").style.backgroundColor = "red"
                        document.getElementById("checkAns").style.backgroundColor = "red"

                    }
                } else if (this.state.chosenOne == "chosenOneAns3") {
                    if (this.state.tocan3 == "DA") {
                        document.getElementById("chosenOneAns3").style.backgroundColor = "green"
                        document.getElementById("checkAns").style.backgroundColor = "green"

                        if (this.state.truth != true) {
                            console.log("povecali smo u " + this.state.chosenOne + "3")
                            AuthenticationService.addCorrectAnswersIntoStorage();
                            this.setState({truth: true})
                        }
                        AuthenticationService.addCorrectAnswersIntoStorage();
                    } else {
                        document.getElementById("chosenOneAns3").style.backgroundColor = "red"
                        document.getElementById("checkAns").style.backgroundColor = "red"

                    }
                } else if (this.state.chosenOne == "chosenOneAns4") {
                    if (this.state.tocan4 == "DA") {
                        document.getElementById("chosenOneAns4").style.backgroundColor = "green"
                        document.getElementById("checkAns").style.backgroundColor = "green"
                        if (this.state.truth != true) {
                            console.log("povecali smo u " + this.state.chosenOne + "4")
                            AuthenticationService.addCorrectAnswersIntoStorage();
                            this.setState({truth: true})
                        }
                    } else {
                        document.getElementById("chosenOneAns4").style.backgroundColor = "red"
                        document.getElementById("checkAns").style.backgroundColor = "red"

                    }
                }
            }
        }
    }

    render() {
        return (<div>
            <Layout>
                <MyHeader/>
                <Content
                    style={{
                        background: "white", position: "relative", top: '20%', left: 0, right: 0, bottom: '20%'
                    }}>
                    {!this.state.kraj

                        // staviti naziv igre i opis igre
                    }
                    {this.state.kraj && <div>
                        <Content><p/></Content>
                        <Content><p/></Content>
                        <Title style={{fontFamily: "Gabriola", alignContent: 'space-evenly'}}>
                            BRAVO ZAVRŠILI STE IGRU!
                        Odgovorili ste točno
                            na {AuthenticationService.getNumberOfCorrectAnswersfromStorage()} od {AuthenticationService.getNumberOfQuestionsFromStorage()} pitanja</Title>

                        <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                href="/api/ZabavnoUcenje/OdabirIgara">Vratite se na
                            odabir igara!</Button>

                    </div>}
                    {!this.state.pushedNext && <div className="">
                        <p/>
                        <Title style={{fontFamily: "Gabriola", alignContent: 'space-evenly'}}>
                            Dobrodošli u igru, stisnite gumb sljedeće pitanje kako biste započeli s igrom!
                        </Title>
                    </div>}
                    <div className={"container-md"}>

                    </div>

                    {this.state.pushedNext && !this.state.kraj &&
                        <div className="button-box text-center container">
                            <Content><p/></Content>
                            <Title style={{
                                fontFamily: "Gabriola",
                                alignContent: 'space-evenly'
                            }}>{this.state.textpitanja}</Title>
                            <div style={{height: 10 + 'rem'}} className={"row"}>
                                <button value={this.state.tocan1} id='chosenOneAns1' name={"chosenOne"}
                                        className='col' style={{background: '#B48EAE', color: "white"}}
                                        onClick={this.handleChange}>{this.state.odgovor1}</button>
                                <button value={this.state.tocan2} id='chosenOneAns2' name={"chosenOne"}
                                        className='col' style={{background: '#B48EAE', color: "white"}}
                                        onClick={this.handleChange}>{this.state.odgovor2}</button>
                            </div>
                            <div style={{height: 10 + 'rem'}} className={"row"}>
                                <button value={this.state.tocan3} id='chosenOneAns3' name={"chosenOne"}
                                        className='col' style={{background: '#B48EAE', color: "white"}}
                                        onClick={this.handleChange}>{this.state.odgovor3}</button>
                                <button value={this.state.tocan4} id='chosenOneAns4' name={"chosenOne"}
                                        className='col' style={{background: '#B48EAE', color: "white"}}
                                        onClick={this.handleChange}>{this.state.odgovor4}</button>
                            </div>
                        </div>}
                    {!this.state.kraj && <Space size={"middle"}>
                        <p/>
                        <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                onClick={this.handleNext}>Sljedeće pitanje</Button>
                        <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                onClick={this.handleAnswer} id="checkAns" htmlType={"submit"}>Provjeri
                            odgovor</Button>
                    </Space>}
                </Content>
                <MyFooter/>
            </Layout>
        </div>)
    }
}


export default GameComponent

