import ProfessorService from "../services/ProfessorService";
import AuthenticationService from "../services/AuthenticationService";
import NavBar from "./Navbar";
import {Fragment} from "react";
import React, {Component, useState} from 'react';
import { v4 as uuid_v4 } from "uuid";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Navigate} from "react-router-dom";
import EditGameComponent from "./EditGameComponent";
import {render} from "@testing-library/react";
import MainIndexComponent from "./MainIndexComponent";

class GameRow extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        function goToGame(id) {
            console.log("USLI SMO U FUJU")
            console.log("ID JE " + id)
           // return <EditGameComponent id ={id}/>

            return <Navigate to={{
                pathname: `api/ZabavnoUcenje/igra/uredi`,
                state: {id:id},
            }}
            />
        }

        return(
        <Container>
            <Row>
                <Col  md={4}>Naziv igre: {this.props.name}
                <p> Opis igre: {this.props.description} </p> </Col>
                <Col md={{ span: 4, offset: 4 }}><Button variant="danger">Izbriši</Button>
                    <Button variant="warning"  onClick={() => goToGame(this.props.id)} >Uredi</Button></Col>
            </Row>


        </Container>
        )


    }
}

class ProfessorDashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errors: '',
            password: '',
            success: undefined,
            games: undefined,
            id: ''
        }

        this.handleChange = (event) =>{
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        this.handleSubmit = async (event) => {
            event.preventDefault();
            let username = AuthenticationService.getLoggedInUserName();

            let games = await ProfessorService.getAllGames(username);
            console.log(games.success)
            if(games.success){
                let value = [];

                for (let game in games.games){

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
            }else{
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
        if(this.state.games && this.state.success){
            rows = []
            for(let game in this.state.games){
                rows.push(<GameRow key={this.state.games[game].id}
                                   id = {this.state.games[game].id}
                                   name={this.state.games[game].name}
                                   description={this.state.games[game].description}
                                    />)
                console.log(rows)
            }
        }
        if(this.state.games && !this.state.success){
            rows = this.state.games;

        }
        return(
            <div>
                <NavBar />
                <section>

                    <form onSubmit={this.handleSubmit}>
                        <a className={"btn btn-primary"} href={"/igra/dodaj"}>Dodaj igru</a>
                        <a className={"btn btn-primary"} href={"/api/ZabavnoUcenje/razred"}>Dodaj razred</a>
                        <a className={"btn btn-primary"} href={"/api/ZabavnoUcenje/dodajUcenika"}>Stvori ucenika</a>
                        <button className={"btn btn-secondary"} type="submit">Pregled igara</button>
                    </form>
                    <form>
                        {rows && rows}
                    </form>
                </section>
            </div>
        )
    }
}

export default ProfessorDashboard