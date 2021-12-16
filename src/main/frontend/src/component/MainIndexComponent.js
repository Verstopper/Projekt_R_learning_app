import React, { Component } from 'react'
// import { Link, withRouter } from 'react-router-dom'

import AuthenticationService from "../sevices/AuthenticationService";
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from "../sevices/AuthenticationService";

class MainIndexComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasLoginFailed: true,
        }
    }
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const username = AuthenticationService.getLoggedInUserName();
        return (
            <main>
                <nav>
                    <header>
                        <div className="navigation">

                            {!isUserLoggedIn &&
                                    <div><a href="/api/ZabavnoUcenje/login">Prijava ucenika</a></div>
                            }
                            {!isUserLoggedIn &&
                            <div>
                                <a href="/api/ZabavnoUcenje/Ucenik/login" id="">Prijava profesora</a>
                            </div>
                            }
                            {isUserLoggedIn && <div>
                                <p>{username}</p>
                                <a href="/logout" id="">Odjava djelatnika</a>
                            </div>
                            }

                        </div>
                    </header>
                </nav>
                <body>
                <div>
                    <h1>ovdje ce biti opis aplikacije i opcenito nesto</h1>
                </div>
                </body>

            </main>
        );
    }
}



export default MainIndexComponent;