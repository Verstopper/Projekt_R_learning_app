import React from 'react'
import AuthenticationService from "../services/AuthenticationService";
import AnswerService from "../services/AnswerService";
import MyHeader from "./MyHeader";
import Title from "antd/lib/typography/Title";
import Layout, {Content} from "antd/lib/layout/layout";
import MyFooter from "./MyFooter";
import {Button} from "antd";

class EditAnswerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultText: sessionStorage.getItem("answerText"),
            defaultCorrectness: sessionStorage.getItem("answerCorr"),
            updatedText: sessionStorage.getItem("answerText"),
            updatedCorrectness: sessionStorage.getItem("answerCorr"),
        }

        this.handleSubmit = async (event) => {
            let answer_id = AuthenticationService.getAnswerFromStorage();
            event.preventDefault();
            let response = await AnswerService.updateAnswer(answer_id, this.state.updatedText, this.state.updatedCorrectness);
            this.state.success = true;
            if (response.status >= 400) {
                this.state.success = false;
                this.setState({errors: 'Ažuriranje odgovora neuspjelo :(',})
            }
            if (this.state.success) {
                window.location.href = "/api/ZabavnoUcenje/pitanjeuredi";
            }
        }

        this.handleChange = (event) => {
            this.setState(
                {
                    [event.target.name]: event.target.value
                }
            )
        }
    }

    render() {

        return (
            <div className="">
                <Layout>
                    <MyHeader/>
                    <Content
                        style={{background: "white", position: "relative", top: '40%', left: 0, right: 0, bottom: 0}}>
                        <br/>
                        <Title style={{fontFamily: "Gabriola", alignContent: 'space-evenly'}}>
                            Uredite odgovor: </Title>
                        <section className="container container-px container-py">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-inputs">
                                    <input type="text" id="updatedText" name="updatedText"
                                           defaultValue={this.state.defaultText}
                                           value={this.state.updatedText} onChange={this.handleChange} required/>
                                </div>
                                <div className="form-inputs">
                                    <select name="updatedCorrectness" id="updatedCorrectness"
                                            onChange={this.handleChange} required>
                                        <option value="DA">DA</option>
                                        <option value="NE">NE</option>
                                    </select>
                                    <p>
                                    </p>
                                </div>
                                <Button style={{background: '#5B3758', color: "white"}} htmlType={"submit"}>
                                    Ažuriraj pitanje</Button>
                                <Button style={{background: '#5B3758', color: "white"}}
                                        href={"/api/ZabavnoUcenje/pitanjeuredi"}>Odustani</Button></form>
                        </section>
                    </Content>
                    <Content style={{background: "white"}}><br/></Content>
                    <Content style={{background: "white"}}><br/></Content>
                    <Content style={{background: "white"}}><br/></Content>
                    <MyFooter/>
                </Layout>
            </div>
        );
    }
}

export default EditAnswerComponent;