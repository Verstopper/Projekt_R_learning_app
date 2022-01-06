import React, {Component} from "react";
import {Link} from "react-router-dom";
import AuthenticationService from "../services/AuthenticationService";
import {render} from "@testing-library/react";


class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasLoginFailed: true,
        }
    }

    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        let username = undefined;
        if (isUserLoggedIn) {
            username = AuthenticationService.getLoggedInUserName();
        }

        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">Početna stranica</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {!isUserLoggedIn &&
                            <a className={"nav-item nav-link"} href="/api/ZabavnoUcenje/profesor/login">Prijava
                                profesora</a>
                            }
                            {!isUserLoggedIn &&
                            <a className={"nav-item nav-link"} href="/api/ZabavnoUcenje/ucenik/login">Prijava
                                ucenika</a>
                            }
                            {!isUserLoggedIn &&
                            <a className={"nav-item nav-link"} href="/api/ZabavnoUcenje/profesor/registracija">Registracija
                                profesora</a>
                            }
                            {isUserLoggedIn &&
                            <><a className={"nav-item nav-link"} href="/api/ZabavnoUcenje/profesor/login">Prijava
                                profesora</a>
                                <a className={"nav-item nav-link"} href="/api/ZabavnoUcenje/ucenik/login">Prijava ucenika</a>
                                <a className={"nav-item nav-link"} href="/api/ZabavnoUcenje/profesor/registracija">Registracija
                                profesora</a>
                                <a className={"nav-item nav-link pull-right"} href={"/logout"}>Odjava</a>
                            </>
                            }
                        </div>
                    </div>
                </nav>

                {/*<div>
                    <a className={"btn btn-primary"} href="/">Početna stranica</a>
                    <div id="hidden">
                        {!isUserLoggedIn &&
                        <a className={"btn btn-primary"} href="/api/ZabavnoUcenje/profesor/login">Prijava profesora</a>
                        }
                        {!isUserLoggedIn &&
                        <a className={"btn btn-primary"} href="/api/ZabavnoUcenje/ucenik/login">Prijava ucenika</a>
                        }
                        {!isUserLoggedIn &&
                        <a className={"btn btn-primary"} href="/api/ZabavnoUcenje/profesor/registracija">Registracija
                            profesora</a>
                        }
                        {isUserLoggedIn &&
                        <div>
                            <a href="/api/ZabavnoUcenje/profesor/pregledIgara">Pregled igara</a>
                            <a href="/logout">Odjava</a>
                        </div>
                        }

                    </div>
                </div>*/}
            </header>
        );

    }
}

// const navbar = () => {
//     return(
//         <div>
//             <li>
//                 <Link to = '/'>Početna stranica</Link>
//             </li>
//         </div>
//     )
// }

export default NavBar;