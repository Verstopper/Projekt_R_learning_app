//import UcenikComponent from "./UcenikComponent";
//import ProfesorComponent from "./ProfesorComponent";
import React, {Component} from "react";
import MainIndexComponent from "./MainIndexComponent";
import LogoutComponent from "./LogOutComponent";
import InvalidComponent from "./InvalidComponent";
//import RegistrationComponent from "./RegistrationComponent";
import {BrowserRouter as Route, Router, Routes} from "react-router-dom";
import StudentComponent from "./StudentComponent";
import RegistrationComponent from "./RegistrationComponent";
import ProfessorComponent from "./ProfessorComponent";
//import Wrapper from "./Wrapper";

function NavComponent() {
    return null;
}

class RouterComponent extends Component {
    render() {
        let message = <p>Enter your username <a href='/login'>here.</a></p>;
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<NavComponent /> }/>
                    <Route path="/api/ZabavnoUcenje/Ucenik/login" element={<StudentComponent /> }/>
                    <Route  path="/api/ZabavnoUcenje/registracija"   element={<RegistrationComponent />} />
                    <Route  path="/api/ZabavnoUcenje/professor/login"   element={<ProfessorComponent message={message}/>} />
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

export default RouterComponent