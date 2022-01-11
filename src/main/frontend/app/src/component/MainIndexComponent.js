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
        );
    }
}

export default MainIndexComponent;