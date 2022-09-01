import React from 'react'
import AuthenticationService from "../services/AuthenticationService";
import {Navigate} from "react-router-dom";
import InvalidComponent from "./InvalidComponent";
import ProfessorService from "../services/ProfessorService";
import MyHeader from "./MyHeader";
import Title from "antd/lib/typography/Title";
import MyFooter from "./MyFooter";
import Layout, {Content} from "antd/lib/layout/layout";
import {Button, Space} from "antd";

class RegstrationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oib: '',
            fullName: '',
            username: '',
            email: '',
            password: '',
            errors: {},
            hasLoginFailed: true,
            showSuccessMessage: false
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
                let response = await ProfessorService.professorSignUp(this.state.oib, this.state.username, this.state.password, this.state.fullName, this.state.email);
                if (response.status >= 400) {
                    this.setState({
                        errors: 'Registracija neuspjela',
                    })
                }
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                this.setState({
                    hasLoginFailed: false,
                })
            } else {
                this.setState({
                    errors: err,
                })
            }
        }
    }

    render() {
        if (!this.state.hasLoginFailed) return <Navigate to='/api/ZabavnoUcenje/profesor/login'/>

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        if (isUserLoggedIn) {
            let message = <p> Already logged in. Go to main page <a href='/'>here.</a></p>;
            return <InvalidComponent message={message}/>
        }

        return (
            <div className="">
                <Layout>
                    <MyHeader/>
                    <Content
                        style={{background: "white", position: "fixed", top: '18%', left: 0, right: 0, bottom: 0}}>
                        <Title style={{fontFamily: "Gabriola", alignContent: 'space-evenly'}}>
                            Registracija profesora:
                        </Title>
                        <section className="container container-px container-py">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-inputs">
                                    <input type="text" id="fullName" name="fullName" placeholder="Ime i prezime"
                                           value={this.state.fullName} onChange={this.handleChange} required/>
                                </div>
                                <div className="form-inputs">
                                    <input type="text" id="oib" name="oib" placeholder="OIB"
                                           value={this.state.oib} onChange={this.handleChange} required/>
                                </div>
                                <div className="form-inputs">
                                    <input type="text" id="username" name="username" placeholder="korisničko ime"
                                           value={this.state.username} onChange={this.handleChange} required/>
                                </div>
                                <div className="form-inputs">
                                    <input type="text" id="email" name="email" placeholder="email"
                                           value={this.state.email} onChange={this.handleChange} required/>
                                </div>
                                <div className="form-inputs">
                                    <input type="text" id="password" name="password" placeholder="lozinka"
                                           value={this.state.password} onChange={this.handleChange} required/>
                                </div>
                                <p/>
                                <Space size={"middle"}>
                                    <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                            htmlType={"submit"}>Registracija</Button>
                                    <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                            href={"/"}>Odustani</Button>
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

export default RegstrationComponent;