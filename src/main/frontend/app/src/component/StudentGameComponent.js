import React, {Component} from "react";
import StudentService from "../services/StudentService";
import AuthenticationService from "../services/AuthenticationService";
import {Container} from "react-bootstrap";
import MyHeader from "./MyHeader";
import MyFooter from "./MyFooter";
import Layout, {Content} from "antd/lib/layout/layout";
import {Button, Card, Space} from "antd";

class StudentRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        function inStorage(id, name, description) {
            AuthenticationService.getGameIntoStorage(id, name, description);
            window.location.href = "/api/ZabavnoUcenje/Igra";
        }

        return (
            <Container>
                <p/>
                <Card>
                    <p>Naziv igre: {this.props.name}</p>
                    <p> Opis igre: {this.props.description} </p>
                    <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                            onClick={() => inStorage(this.props.id, this.props.name, this.props.description)}>IGRAJ</Button>
                </Card>
                <p/>
            </Container>
        )
    }
}

class StudentGameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', errors: "", password: '', success: undefined, games: undefined,
        }
        this.handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
        this.handleSubmit = async (event) => {
            event.preventDefault();
            let username = AuthenticationService.getLoggedInUserName();
            let games = await StudentService.getAllGames(username);
            if (games.success) {
                let value = [];
                for (let game in games.games) {
                    let obj = {
                        id: games.games[game].id,
                        name: games.games[game].name,
                        description: games.games[game].description,

                    }
                    value.push(obj)
                }
                this.setState({
                    games: value, success: true,
                })
            } else {
                let value = games.games
                this.setState({
                    games: value, success: false,
                })
            }
        }
    }

    render() {
        let rows;
        if (this.state.games && this.state.success) {
            rows = []
            for (let game in this.state.games) {
                rows.push(<StudentRow key={this.state.games[game].id}
                                      id={this.state.games[game].id}
                                      name={this.state.games[game].name}
                                      description={this.state.games[game].description}
                                      oib={this.state.games[game].description}

                />)
            }
        }

        if (this.state.games && !this.state.success) rows = rows.state.games;

        function logout() {
            AuthenticationService.logout();
            window.location.href = "/";
        }

        return (
            <div>
                <Layout>
                    <MyHeader/>
                    <Content
                        style={{
                            background: "white", position: "relative", top: '18%', left: 0, right: 0, bottom: '20%'
                        }}>
                        <section>
                            <form onSubmit={this.handleSubmit}>
                                <p/>
                                <Space size={"small"}>
                                    <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                            htmlType={"submit"}>Pogledaj sve igre koje možeš igrati</Button>
                                    <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                            onClick={() => logout()}>Odjava</Button>
                                </Space>

                            </form>
                            <form>
                                {rows && rows}
                            </form>
                        </section>
                    </Content>
                    <Content style={{background: "white"}}><p/></Content>
                    <Content style={{background: "white"}}><p/></Content>
                    <Content style={{background: "white"}}><p/></Content>
                    <MyFooter/>
                </Layout>
            </div>
        )
    }
}

export default StudentGameComponent