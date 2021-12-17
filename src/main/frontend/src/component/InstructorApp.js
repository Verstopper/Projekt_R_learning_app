import UcenikComponent from "./UcenikComponent";
import ProfesorComponent from "./ProfesorComponent";
import React, {Component} from "react";
import MainIndexComponent from "./MainIndexComponent";
import LogoutComponent from "./LogOut";
import InvalidComponent from "./InvalidComponent";
import RegistrationComponent from "./RegistrationComponent";
import {BrowserRouter as Route, Router, Routes} from "react-router-dom";
import Wrapper from "./Wrapper";

function NavComponent() {
    return null;
}

class InstructorApp extends Component {
    render() {
        let message = <p>Enter your username <a href='/login'>here.</a></p>;
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<NavComponent /> }/>
                    <Route path="/api/ZabavnoUcenje/Ucenik/login" element={<Wrapper component={UcenikComponent} animate={true} /> }/>
                    <Route  path="/api/ZabavnoUcenje/registracija"   element={<RegistrationComponent />} />
                    <Route  path="/api/ZabavnoUcenje/profesor/login"   element={<ProfesorComponent message={message}/>} />
                    <Route  path="/prvaPrijava"   element={<InvalidComponent message={message}/>} />
                    <Route  path="/logout"   element={<LogoutComponent />} />
                </Routes>
                <Routes>
                    <Route path="/" element={<MainIndexComponent /> }/>
                </Routes>

            </Router>

        )
    }
}

export default InstructorApp