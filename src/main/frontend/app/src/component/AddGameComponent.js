import React from 'react'
import AuthenticationService from "../services/AuthenticationService";
import GameService from "../services/GameService";
import ProfessorDashboard from "./ProfessorDashboard";
import {Button} from "react-bootstrap";

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
                console.log(response)
                if (response === false) {
                    this.state.success = false;
                    console.log("usli smo " + this.state.success)
                    this.setState(
                        {
                            errors: 'Dodavanje igre neuspješno.',
                        }
                    )
                } else {
                    this.state.success = true;
                    console.log("usli smo " + this.state.success)
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
        /*const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        if(isUserLoggedIn){
            let message = <p> Already logged in. Go to main page <a href='/'>here.</a></p>;
            return <InvalidComponent message={message} />
        }*/
        let pom;
        function goTo() {
            console.log("USLO JE U GO TO")
            return <ProfessorDashboard/>
        }
        return (
            <div className="">
                <section className="container container-px container-py">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-inputs">
                            {/*<label htmlFor="name"></label>*/}
                            <input type="text" id="name" name="name" placeholder="Ime igre"
                                   value={this.state.name} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-inputs">
                            {/*<label htmlFor="description"></label>*/}
                            <input type="text" id="description" name="description" placeholder="Opis igre"
                                   value={this.state.description} onChange={this.handleChange} required/>
                        </div>
                        {/*<div className="form-inputs">*/}
                        {/*    <label htmlFor="oib"></label>*/}
                        {/*    <input type="text" id="oib" name="oib" placeholder="OIB"*/}
                        {/*           value={this.state.oib} onChange={this.handleChange} required/>*/}
                        {/*</div>*/}
                        {
                            !this.state.success && <p>Došlo je do greške prilikom dodavanja igre. Pokušajte ponovno</p>
                        }
                        <Button className={"btn btn-primary"} type="submit">Dodaj igru</Button>
                        <Button className={"btn btn-danger"} href="javascript:history.go(-1)">Odustani</Button>
                    </form>
                </section>
            </div>
        );
    }
}

export default AddGameComponent;