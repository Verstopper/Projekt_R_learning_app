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
                <nav>
                    <a href= "/">Početna stranica</a>
                </nav>

                <div>
                    <div id="hidden">
                        {!isUserLoggedIn &&
                            <div>
                                <a href="/api/ZabavnoUcenje/profesor/login">Prijava profesora</a>
                            </div>
                        }
                        {!isUserLoggedIn &&
                        <div>
                            <a href="/api/ZabavnoUcenje/ucenik/login">Prijava ucenika</a>
                        </div>
                        }
                        <div>
                            <a href="/api/ZabavnoUcenje/profesor/registracija">Registracija profesora</a>
                        </div>
                        {isUserLoggedIn &&
                        <div>
                            <a href="/logout">Odjava</a>
                        </div>
                        }

                    </div>
                </div>

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