import React, {Component} from "react";
import MainIndexComponent from "./MainIndexComponent";
import LogoutComponent from "./LogOutComponent";
import InvalidComponent from "./InvalidComponent";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import StudentComponent from "./StudentComponent";
import RegistrationComponent from "./RegistrationComponent";
import ProfessorComponent from "./ProfessorComponent";
import ProfessorDashboard from "./ProfessorDashboard";
import AddGameComponent from "./AddGameComponent";
import AddGradeComponent from "./AddGradeComponent";
import AddStudentComponent from "./AddStudentComponent";
import Wrapper from "./Wrapper";
import EditGameComponent from "./EditGameComponent";
import EditQuestionComponent from "./EditQuestionComponent";
import AddQuestionComponent from "./AddQuestionComponent";
import AddAnswerComponent from "./AddAnswerComponent";
import EditAnswerComponent from "./EditAnswerComponent";
import GameComponent from "./GameComponent";
import StudentGameComponent from "./StudentGameComponent";

class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/api/ZabavnoUcenje/ucenik/login" element={<StudentComponent/>}/>
                    <Route path="/api/ZabavnoUcenje/profesor/pregledIgara" element={<ProfessorDashboard/>}/>
                    <Route path="/api/ZabavnoUcenje/profesor/registracija" element={<RegistrationComponent/>}/>
                    <Route path="/api/ZabavnoUcenje/profesor/login" element={<ProfessorComponent/>}/>
                    <Route path="/prvaPrijava" element={<InvalidComponent/>}/>
                    <Route path="/logout" element={<LogoutComponent/>}/>
                    <Route path="/igra/dodaj" element={<AddGameComponent/>}/>
                    <Route path={"/api/ZabavnoUcenje/razred"} element={<AddGradeComponent/>}/>
                    <Route path={"/api/ZabavnoUcenje/pitanjeuredi"}
                           element={<Wrapper component={EditQuestionComponent} animate={true}/>}/>
                    <Route path={"api/ZabavnoUcenje/igrauredi"}
                           element={<Wrapper component={EditGameComponent} animate={true}/>}/>
                    <Route path={"api/ZabavnoUcenje/odgovoruredi"}
                           element={<Wrapper component={EditAnswerComponent} animate={true}/>}/>
                    <Route path={"/api/ZabavnoUcenje/dodajUcenika"}
                           element={<Wrapper component={AddStudentComponent} animate={true}/>}/>
                    <Route path={"/api/ZabavnoUcenje/addQuestion"} element={<AddQuestionComponent/>}/>
                    <Route path={"/api/ZabavnoUcenje/addAnswer"} element={<AddAnswerComponent/>}/>
                    <Route path={"/api/ZabavnoUcenje/Igra"} element={<GameComponent/>}/>
                    <Route path={"/api/ZabavnoUcenje/OdabirIgara"} element={<StudentGameComponent/>}/>
                </Routes>
                <Routes>
                    <Route path="/" element={<MainIndexComponent/>}/>
                </Routes>
            </Router>
        )
    }
}

export default RouterComponent