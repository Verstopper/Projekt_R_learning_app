import ProfessorService from "../services/ProfessorService";
import AuthenticationService from "../services/AuthenticationService";
import NavBar from "./Navbar";

import React, {Component, useState} from 'react';

import {Button, Col, Container, Row} from "react-bootstrap";

class QuestionRow extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col  md={4}>Naziv igre: {this.props.name}
                        <p> Opis igre: {this.props.description} </p> </Col>
                    <Col md={{ span: 4, offset: 4 }}><Button variant="danger">Izbriši</Button>
                        <Button variant="warning" href={"/"}>Uredi</Button></Col>
                </Row>


            </Container>
        )


    }
}

class EditGameComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errors: '',
            password: '',
            success: undefined,
            games: undefined,
            id : ''
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
                rows.push(<QuestionRow key={this.state.games[game].id}
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
                    <label>UREDITE SVOJU IGRU!!</label>
                     <form onSubmit={this.handleSubmit}>

                        <button className={"btn btn-secondary"} type="submit">Pregled pitanja</button>
                    </form>/


                    <form>
                        {rows && rows}
                    </form>
                </section>
            </div>
        )
    }
}
export default EditGameComponent;