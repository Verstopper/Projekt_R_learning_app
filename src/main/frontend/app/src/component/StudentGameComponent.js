import React, {Component, useState} from "react";
import StudentService from "../services/StudentService";
import AuthenticationService from "../services/AuthenticationService";
import StudentComponent from "./StudentComponent";
import NavBar from "./Navbar";
import ProfessorService from "../services/ProfessorService";
import LogoutComponent from "./LogOutComponent";
import {Button, Col, Container, Row} from "react-bootstrap";

class StudentRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        function inStorage(id,name,description) {
            AuthenticationService.getGameIntoStorage(id,name,description);
            window.location.href = "/api/ZabavnoUcenje/Igra";
        }

        return (<Container>
            <Row>
                <Col md={{span: 2, offset: 5}}>Naziv igre: {this.props.name}
                    <p> Opis igre: {this.props.description} </p></Col>
                <Button variant="success" onClick={() => inStorage(this.props.id,this.props.name,this.props.description)}>IGRAJ</Button>
            </Row>
        </Container>)
    }
}

class StudentGameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errors: "",
            password: '',
            success: undefined,
            games: undefined,
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
            let username = AuthenticationService.getLoggedInUserName();
            let games = await StudentService.getAllGames(username);
            console.log(games.games)
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
        //this.handlesubmit = async (event) => {
        //    event.preventdefault();
        //
        // let username = authenticationservice.getloggedinusername();
        // console.log(username)
        // let logout = authenticationservice.logout();

        // }
    }

    render() {
        let rows;
        console.log("aaaaaa" + this.state.games + this.state.success)
        if (this.state.games && this.state.success) {
            rows = []
            for (let game in this.state.games) {
                console.log("oib" + this.state.games[game].oib)
                rows.push(<StudentRow key={this.state.games[game].id}
                                      id = {this.state.games[game].id}
                                      name={this.state.games[game].name}
                                      description={this.state.games[game].description}
                                      oib = {this.state.games[game].description}

                    // oib = {this.state.games[game].oib
                />)
                // professor = {this.state.games[game]})
            }
        }

        if (this.state.games && !this.state.success)
            rows = rows.state.games;

        function logout() {

            AuthenticationService.logout();
            window.location.href = "/";
        }

        return (
            <div>
                <NavBar/>
                <section>
                    <form onSubmit={this.handleSubmit}>
                        <button className={"btn btn-primary"} type="submit">Pogledaj sve igre koje možes igrati</button>
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <button onClick={() => logout()}>ODJAVA</button>
                    </form>
                    <form>
                        {rows && rows}
                    </form>
                </section>
            </div>
        )
    }
}

export default StudentGameComponent