//import UcenikComponent from "./UcenikComponent";
//import ProfesorComponent from "./ProfesorComponent";
import React, {Component} from "react";
import MainIndexComponent from "./MainIndexComponent";
import LogoutComponent from "./LogOutComponent";
import InvalidComponent from "./InvalidComponent";
//import RegistrationComponent from "./RegistrationComponent";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import StudentComponent from "./StudentComponent";
import RegistrationComponent from "./RegistrationComponent";
import ProfessorComponent from "./ProfessorComponent";
//import Wrapper from "./Wrapper";
import Navbar from '../component/Navbar'
import ProfessorDashboard from "./ProfessorDashboard";
import AddGameComponent from "./AddGameComponent";
import AddGradeComponent from "./AddGradeComponent";
import AddStudentComponent from "./AddStudentComponent";
import Wrapper from "./Wrapper";
import EditGameComponent from "./EditGameComponent";
import EditQuestionComponent from "./EditQuestionComponent";

function NavComponent() {
    return null;
}

class RouterComponent extends Component {
    render() {
        console.log("pozdrav iz routerComponent")
        //let message = <p>Enter your username <a href='/login'>here.</a></p>;
        return (
            <Router>
                {/*<Navbar/>*/}
                <Routes>
                    {/*<Route path="/" element={<MainIndexComponent /> }/>*/}
                    <Route path="/api/ZabavnoUcenje/ucenik/login" element={<StudentComponent /> }/>
                    <Route path="/api/ZabavnoUcenje/profesor/pregledIgara" element={<ProfessorDashboard />} />
                    <Route  path="/api/ZabavnoUcenje/profesor/registracija"   element={<RegistrationComponent />} />
                    <Route  path="/api/ZabavnoUcenje/profesor/login"   element={<ProfessorComponent />} />
                    <Route  path="/prvaPrijava"   element={<InvalidComponent />} />
                    <Route  path="/logout"   element={<LogoutComponent />} />
                    <Route path="/igra/dodaj" element={<AddGameComponent/>} />
                    <Route path={"/api/ZabavnoUcenje/razred"} element={<AddGradeComponent/>}/>
                    <Route path={"/api/ZabavnoUcenje/pitanjeuredi"} element={ <Wrapper component={EditQuestionComponent} animate={true} />}/>
                    <Route path={"api/ZabavnoUcenje/igrauredi"} element={ <Wrapper component={EditGameComponent} animate={true} />}/>
                    <Route path={"/api/ZabavnoUcenje/dodajUcenika"} element={<Wrapper component={AddStudentComponent} animate={true} />}/>
                </Routes>
                <Routes>
                    <Route path="/" element={<MainIndexComponent /> }/>
                </Routes>

            </Router>

        )
    }
}

export default RouterComponent