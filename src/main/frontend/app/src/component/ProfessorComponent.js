import React, {Component} from "react";
import {Navigate} from 'react-router-dom';
import {validatePassword, validateUsername} from "./validateInfo";
import AuthenticationService from "../services/AuthenticationService";
import ProfessorDashboard from "./ProfessorDashboard";
import MyHeader from "./MyHeader";
import Layout, {Content} from "antd/lib/layout/layout";
import MyFooter from "./MyFooter";
import Title from "antd/lib/typography/Title";
import {Button, Space} from "antd";


class ProfessorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "", password: "", success: false, existsInDB: false,
        }
        this.handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
        this.handleSubmit = async (event) => {
            event.preventDefault();
            let errUser = validateUsername(this.state.username)
            let errPass = validatePassword(this.state.password)

            if (!errUser && !errPass) {
                let responsePass = await AuthenticationService.loginProfessor(this.state.username, this.state.password);
                if (responsePass.status >= 400) {
                    this.setState({
                        errors: 'Neuspješna prijava.',
                    })
                }
                if (responsePass.data) {
                    AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                    AuthenticationService.putProfessorInSession();
                    this.setState({
                        existsInDb: true,
                    })
                } else {
                    this.setState({
                        errors: 'Kriva lozinka.'
                    })
                }

            } else {
                this.setState({
                    errors: errUser,
                })
            }
        }
    }

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        if (isUserLoggedIn) {
            return <ProfessorDashboard/>
        }
        let renderValue;
        if (this.state.existsInDB && !this.state.success) {
            renderValue = <Navigate to={{
                pathname: '/api/ZabavnoUcenje/profesor/login', state: {username: this.state.username},
            }}/>;
        } else {
            renderValue = (
                <div className="">
                    <Layout>
                        <MyHeader/>
                        <Content
                            style={{background: "white", position: "fixed", top: '30%', left: 0, right: 0, bottom: 0}}>
                            <Title style={{fontFamily: "Gabriola", alignContent: 'space-evenly'}}>
                                Prijava profesora:
                            </Title>
                            <section className="container container-px container-py">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-inputs">
                                        <input required type="text" id="username" name="username"
                                               placeholder="Korisničko ime"
                                               value={this.state.username} onChange={this.handleChange}/>
                                        <input required autoComplete={"off"} type="text" id="password" name="password"
                                               placeholder="Lozinka"
                                               value={this.state.password} onChange={this.handleChange}/>
                                    </div>
                                    {this.state.errors && <p>{this.state.errors}</p>}
                                    <p/>
                                    <Space size={"middle"}>
                                        <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                                htmlType={"submit"}>Prijava</Button>
                                        <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                                href={"/"}>Odustani</Button>
                                    </Space>
                                </form>
                            </section>
                        </Content>
                        <MyFooter/>
                    </Layout>
                </div>
            )
        }
        return renderValue;
    }
}

export default ProfessorComponent