import ProfessorService from "../services/ProfessorService";
import AuthenticationService from "../services/AuthenticationService";
import NavBar from "./Navbar";
import {Fragment} from "react";
import React, {Component, useState} from 'react';
import { v4 as uuid_v4 } from "uuid";

class GameRow extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <label>{this.props.name}</label>
                <label>{this.props.description}</label>
            </div>
        )
    }
}

class GameComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errors: '',
            password: '',
            success: undefined,
            games: undefined,
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
                    <a href={"/igra/dodaj"}>Dodaj igru</a>
                    <form onSubmit={this.handleSubmit}>
                        <button type="submit">Pregled igara</button>
                    </form>
                    <form>
                        {rows && rows}
                    </form>
                </section>
            </div>
        )
    }
}

export default GameComponent