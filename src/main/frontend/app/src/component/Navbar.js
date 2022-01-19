import React, {Component} from "react";
import {Navigate} from "react-router-dom";
import AuthenticationService from "../services/AuthenticationService";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoginFailed: true, logout: false
        }
    }

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        var role = AuthenticationService.getRole();
        if (this.state.logout) {
            return <Navigate to={"/"}/>
        }

        return (<header>
                <nav className="navbar navbar-expand navbar-light bg-light">
                    <a className="navbar-brand" href="/">Početna stranica</a>
                    {/*<button className="navbar-toggler" type="button" data-toggle="collapse"*/}
                    {/*        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"*/}
                    {/*        aria-label="Toggle navigation">*/}
                    {/*    <span className="navbar-toggler-icon"></span>*/}
                    {/*</button>*/}
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {!isUserLoggedIn && <>
                                <a className={"nav-item nav-link"} href="/api/ZabavnoUcenje/profesor/login">Prijava
                                    profesora</a>
                                <a className={"nav-item nav-link"} href="/api/ZabavnoUcenje/ucenik/login">Prijava
                                    učenika</a>
                                <a className={"nav-item nav-link"} href="/api/ZabavnoUcenje/profesor/registracija">Registracija
                                    profesora</a>
                            </>}
                            {isUserLoggedIn && <>
                                {!role && <a className={"nav-item nav-link"} href="/api/ZabavnoUcenje/profesor/login">Kontrolna
                                    ploča</a>}
                                <a className={"nav-item nav-link pull-right"} href={"/logout"}>Odjava</a>
                            </>}
                        </div>
                    </div>
                </nav>
            </header>);

    }
}

export default NavBar;