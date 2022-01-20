import React from 'react'
import AuthenticationService from "../services/AuthenticationService";
import ProfessorDashboard from "./ProfessorDashboard";
import GradeService from "../services/GradeService";
import MyHeader from "./MyHeader";
import Title from "antd/lib/typography/Title";
import MyFooter from "./MyFooter";
import Layout, {Content} from "antd/lib/layout/layout";
import {Button, Space} from "antd";

class AddGameComponent extends React.Component {
    constructor(props) {
        super(props);
        let username = AuthenticationService.getLoggedInUserName();
        this.state = {
            username: username, success: false, name: '', generation: '', oib: '', showSuccessMessage: false
        }
        this.handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
        this.handleSubmit = async (event) => {
            event.preventDefault();
            let err = {}
            if (!err.password) {
                let response = await GradeService.addGrade(this.state.name, this.state.generation, this.state.username);
                if (response === false) {
                    this.state.success = false;
                    this.setState({
                        errors: 'Dodavanje razreda neuspješno.',
                    })
                } else {
                    this.state.success = true;
                    window.location.href = "/api/ZabavnoUcenje/profesor/pregledIgara";

                }
            } else {
                this.setState({
                    errors: err,
                })
        }
    }}

    render() {
        if (this.state.success) {
            return (<ProfessorDashboard/>)
        }

        return (<div className="">
                <Layout>
                    <MyHeader/>
                    <Content
                        style={{background: "white", position: "fixed", top: '30%', left: 0, right: 0, bottom: 0}}>
                        <Title style={{fontFamily: "Gabriola", alignContent: 'space-evenly'}}>
                            Kreiraj razred: </Title>
                        <section className="container container-px container-py">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-inputs">
                                    <input type="text" id="name" name="name" placeholder="Ime razreda"
                                           value={this.state.name} onChange={this.handleChange} required/>
                                </div>
                                <div className="form-inputs">
                                    <input type="text" id="generation" name="generation" placeholder="Generacija"
                                           value={this.state.generation} onChange={this.handleChange} required/>
                                </div>

                                <p/>
                                <Space size={"middle"}>
                                    <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                            htmlType={"submit"} onClick={this.handleSubmit}>Dodaj</Button>
                                    <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                            href={"/api/ZabavnoUcenje/profesor/login"}>Odustani</Button>
                                </Space>
                            </form>
                        </section>
                    </Content>
                    <MyFooter/>
                </Layout>
            </div>);
    }

}


export default AddGameComponent;