import ProfessorService from "../services/ProfessorService";
import AuthenticationService from "../services/AuthenticationService";
import NavBar from "./Navbar";
import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import GameService from "../services/GameService";
import MyHeader from "./MyHeader";
import MyFooter from "./MyFooter";
import Layout, {Content} from "antd/lib/layout/layout";
import {Button, Card, Space} from "antd";

class GameRow extends Component {
    game;

    constructor(props) {
        super(props);
    }

    render() {
        function goToGame(id, name, description) {
            console.log("USLI SMO U FUJU")
            console.log("ID JE " + id)
            AuthenticationService.getGameIntoStorage(id, name, description);
        }

        function deleteGame(id) {
            let confirmed = window.confirm("Jeste li sigurni da želite izbrisati igru?")
            if (confirmed) GameService.deleteGame(id);
            console.log("ID IGRE JE " + id);
            window.location.reload(false);
        }

        return (
            <Container>
                <p/>
                <Card>
                    <p>Naziv igre: {this.props.name}</p>
                    <p> Opis igre: {this.props.description} </p>
                    <Space>
                        <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                onClick={() => deleteGame(this.props.id)}>Izbriši</Button>
                        <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                href="/api/ZabavnoUcenje/igrauredi"
                                onClick={() => goToGame(this.props.id, this.props.name, this.props.description)}>Uredi</Button>
                    </Space>
                </Card>
            </Container>
        )
    }
}


class ProfessorDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errors: '',
            password: '',
            success: undefined,
            games: undefined,
            isOpen: false,
            setIsOpen: false

        }

        this.handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        this.handleSubmit = async (event) => {
            event.preventDefault();
            let username = AuthenticationService.getLoggedInUserName();
            let games = await ProfessorService.getAllGames(username);
            if (games.success) {
                let value = [];
                for (let game in games.games) {
                    let obj = {
                        id: games.games[game].id,
                        name: games.games[game].name,
                        description: games.games[game].description
                    }
                    value.push(obj)
                }
                this.setState({
                    games: value,
                    success: true,
                })
            } else {
                let value = games.games
                this.setState({
                    games: value,
                    success: false,
                })
            }
        }
    }

    render() {


        let rows;
        if (this.state.games && this.state.success) {
            rows = []
            for (let game in this.state.games) {
                rows.push(<GameRow key={this.state.games[game].id}
                                   id={this.state.games[game].id}
                                   name={this.state.games[game].name}
                                   description={this.state.games[game].description}
                />)
            }
        }
        if (this.state.games && !this.state.success) {
            rows = this.state.games;

        }

        return (
            <div>
                <Layout>
                    <MyHeader/>
                    <NavBar/>
                    <Content style={{background: "white"}}><p/></Content>
                    <Content
                        style={{background: "white", position: "relative", top: '20%', left: 0, right: 0, bottom: 0}}>

                        <section>
                            <form onSubmit={this.handleSubmit}>
                                <Space size={"small"}>
                                    <Button style={{background: '#5B3758', color: "white"}}
                                            href={"/igra/dodaj"}>Dodaj igru</Button>
                                    <Button style={{background: '#5B3758', color: "white"}}
                                            href={"/api/ZabavnoUcenje/razred"}>Dodaj razred</Button>
                                    <Button style={{background: '#5B3758', color: "white"}}
                                            href={"/api/ZabavnoUcenje/dodajUcenika"}>Stvori
                                        učenika</Button>
                                    <Button style={{background: '#5B3758', color: "white"}}
                                            htmlType="submit">Pregled igara</Button>
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
                    <Content style={{background: "white"}}><p/></Content>
                    <MyFooter/>
                </Layout>
            </div>
        )
    }
}

export default ProfessorDashboard