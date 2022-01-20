import React from 'react'
import AuthenticationService from "../services/AuthenticationService";
import GameService from "../services/GameService";
import MyHeader from "./MyHeader";
import Title from "antd/lib/typography/Title";
import MyFooter from "./MyFooter";
import {Button, Space} from "antd";
import Layout, {Content} from "antd/lib/layout/layout";

class AddGameComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            success: true,
            name: '',
            description: '',
            oib: '',
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
            let err = {}
            if (!err.password) {
                let username = AuthenticationService.getLoggedInUserName();
                let response = await GameService.addGame(this.state.name, this.state.description, username);
                if (response === false) {
                    this.state.success = false;
                    this.setState(
                        {
                            errors: 'Dodavanje igre neuspješno.',
                        }
                    )
                } else {
                    this.state.success = true;
                    window.location.href = "/api/ZabavnoUcenje/profesor/pregledIgara";
                }
            } else {
                this.setState(
                    {
                        errors: err,
                    }
                )
            }
        }
    }

    render() {
        return (
            <div className="">
                <Layout>
                    <MyHeader/>
                    <Content
                        style={{background: "white", position: "fixed", top: '30%', left: 0, right: 0, bottom: 0}}>
                        <Title style={{fontFamily: "Gabriola", alignContent: 'space-evenly'}}>
                            Kreiraj igru: </Title>
                        <section className="container container-px container-py">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-inputs">
                                    <input type="text" id="name" name="name" placeholder="Ime igre"
                                           value={this.state.name} onChange={this.handleChange} required/>
                                </div>
                                <div className="form-inputs">
                                    <input type="text" id="description" name="description" placeholder="Opis igre"
                                           value={this.state.description} onChange={this.handleChange} required/>
                                </div>
                                {
                                    !this.state.success &&
                                    <p>Došlo je do greške prilikom dodavanja igre. Pokušajte ponovno</p>
                                }
                                <p/>
                                <Space size={"middle"}>
                                    <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                            htmlType={"submit"}>Dodaj</Button>
                                    <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                            href={"/api/ZabavnoUcenje/profesor/login"}>Odustani</Button>
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

    export default AddGameComponent;