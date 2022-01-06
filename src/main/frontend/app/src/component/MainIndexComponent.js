import React, { Component } from 'react';
import {Link, Navigate, withRouter} from 'react-router-dom';
import NavBar from "./Navbar";



class MainIndexComponent extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
            <NavBar/>
            <div>
                HELLO POCETNA STRANICA
            </div>
            </>
            /*<main>
                <section>
                    <a href="/api/ZabavnoUcenje/profesor/login">Prijava profesora</a>
                    <br/>
                    <a href= "/api/ZabavnoUcenje/ucenik/login"> Prijava ucenika</a>
                    <br/>
                    <a href= "/api/ZabavnoUcenje/profesor/registracija">Registracija profesora</a>
                    <br/>
                </section>

            </main>*/
        );
    }
}



export default MainIndexComponent;