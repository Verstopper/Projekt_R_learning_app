import React, { Component } from 'react'
// import { Link, withRouter } from 'react-router-dom'


class MainIndexComponent extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <main>
                <nav>
                    <header>
                        <div className="navigation">
                            <a href="index.html">Početna</a>
                            <a href="ucenik.html">Učenik</a>
                            <a href="profesor.html">Profesor</a>
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