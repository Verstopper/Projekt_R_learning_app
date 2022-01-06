import ProfessorService from "../services/ProfessorService";
import AuthenticationService from "../services/AuthenticationService";
import NavBar from "./Navbar";
import {Fragment} from "react";
import React, {Component, useState} from 'react';

class GameRow extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <label>{this.props.username}</label>
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

            let gamess = await ProfessorService.getAllGames(username);
            if(gamess.success){
                let value = [];
                for (let game in gamess.games){
                    let obj = {
                        id: gamess.games[game].id_igre,
                        naziv: gamess.games[game].naziv,
                        opis: gamess.games[game].opis
                    }
                    value.push(obj)
                }
                this.setState({
                    games: value,
                    success: true,
                })
            }else{
                let value = gamess.games
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
                                    opis={this.state.games[game].opis}
                                    />)
            }
        }
        if(this.state.games && !this.state.success){
            rows = this.state.games;
        }
        return(
            <div>
                {/*<NavBar />*/}
                <section>
                    <a>Dodaj igru</a>
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