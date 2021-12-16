import React, { Component } from 'react'
import logPng from '../static/login.png'
import AuthenticationService from "../sevices/AuthenticationService";
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from "../sevices/AuthenticationService";

class MainIndexComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasLoginFailed: true,
        }
    }

    handleClickHamburger = () => {
        //console.log("here")
        const header = document.querySelector("header");

        const hidden = document.querySelector("#hidden")
        if (header.classList.contains("is-active")) {
            header.classList.remove("is-active")
            hidden.style.display = 'none'
        } else {
            header.classList.add("is-active")
            hidden.style.display = 'block'
        }

    }
    render() {
        //console.log(logPng)
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const username = AuthenticationService.getLoggedInUserName();
        return (
            <header className="container container-py">

                <nav className="container container-px  flex jc-sb ai-c">
                    <a href="/">red u red</a>
                    <button id="hamburger" onClick={this.handleClickHamburger} className="header__hamburger hide-for-desktop ">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </nav>
                <div>
                    <div id="hidden">
                        {/*
                        check djelatnik is logged in, session
*/}
                        {!isUserLoggedIn &&
                        <div>
                            <a href="/login" id=""><img src="../static/login.png" alt=""/>Prijava djelatnika</a>
                        </div>
                        }
                        {!isUserLoggedIn &&
                        <div>
                            <a href="/loginAdmin" id=""><img src="../static/login.png" alt=""/>Prijava admina</a>
                        </div>
                        }
                        {isUserLoggedIn && <div>
                            <p>{username}</p>
                            <a href="/logout" id=""><img src={logPng} alt=""/>Odjava djelatnika</a>
                        </div>}{/* later username, session*/}
                    </div>
                </div>
            </header>
        );
    }
}



export default MainIndexComponent;