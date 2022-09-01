import React, {Component} from 'react'
import AuthenticationService from "../services/AuthenticationService";
import {validateUsername} from "./validateInfo";
import StudentGameComponent from "./StudentGameComponent";
import Layout, {Content} from "antd/lib/layout/layout";
import MyHeader from "./MyHeader";
import MyFooter from "./MyFooter";
import Title from "antd/lib/typography/Title";
import {Button, Space} from "antd";

class StudentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errors: "",
            hasLoginFailed: false,
            showSuccessMessage: false,
            login: false,
            existsInD: false,
            errorDB: false,
        }
        this.handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
        this.handleSubmit = async (event) => {
            event.preventDefault();
            let errs = validateUsername(this.state.username)
            if (!errs) {
                let response = await AuthenticationService.loginUcenik(this.state.username);
                if (response.data) {
                    this.setState({
                        existsInDB: true, login: true,
                    })
                } else {
                    this.setState({
                        errors: 'Učenik ne postoji!',
                    })
                }
            } else {
                this.setState({
                    errors: errs,
                })
            }
        }
    }

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        if (isUserLoggedIn) {
            return <StudentGameComponent/>
        }
        let renderValue;
        if (this.state.existsInDB && this.state.login) {
            AuthenticationService.registerSuccessfulLogin(this.state.username, " ");
            AuthenticationService.putStudentinSession();
            return <StudentGameComponent/>
        } else {
            renderValue = (<div className="">
                    <Layout>
                        <MyHeader/>
                        <Content
                            style={{background: "white", position: "fixed", top: '30%', left: 0, right: 0, bottom: 0}}>
                            <Title style={{fontFamily: "Gabriola", alignContent: 'space-evenly'}}>
                                Prijava učenika:
                            </Title>
                            <section className="container container-px container-py">
                                <form className="korisnik__odabir" onSubmit={this.handleSubmit}>
                                    <div className="form-inputs">
                                        <input type="text" id="username" name="username" placeholder="Korisničko ime"
                                               value={this.state.username} onChange={this.handleChange}/>
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
                </div>)
        }
        return renderValue;
    }
}

export default StudentComponent