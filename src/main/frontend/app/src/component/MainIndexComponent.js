import React, { Component } from 'react';
import  {Link, withRouter } from 'react-router-dom';


class MainIndexComponent extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <main>
                <section>
                    <a href="/api/ZabavnoUcenje/profesor/login">Prijava profesora</a>
                    <br/>
                    <a href= "/api/ZabavnoUcenje/ucenik/prijava"> Prijava ucenika</a>
                    <br/>
                    <a href= "/api/ZabavnoUcenje/profesor/registracija">Registracija profesora</a>
                    <br/>
                </section>

            </main>
        );
    }
}



export default MainIndexComponent;