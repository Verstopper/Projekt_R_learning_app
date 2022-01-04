import {Component, useState} from "react";
import ProfessorService from "../services/ProfessorService";
import AuthenticationService from "../services/AuthenticationService";
import NavBar from "./Navbar";
import {Fragment} from "react";

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
            let games = await ProfessorService.getAllGames();
            if(games.success){
                let value = [];
                for (let game in games.games){
                    let obj = {
                        id: games.games[game].id,
                        naziv: games.games[game].naziv,
                        opis: games.games[game].opis
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
        let username = AuthenticationService.getLoggedInUserName();
        let rows;
        if(this.state.games && this.state.success){
            rows = []
            for(let game in this.state.games){
                rows.push(<GameRow key={this.state.games[game].username}
                                    id={this.state.games[game]}
                                    username={this.state.games[game].username}/>)
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