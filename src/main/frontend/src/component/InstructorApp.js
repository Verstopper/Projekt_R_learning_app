import UcenikComponent from "./UcenikComponent";

import ProfesorComponent from "./ProfesorComponent";
import {Component} from "react";

class InstructorApp extends Component {
    render() {
        let message = <p>Enter your username <a href='/login'>here.</a></p>;
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<NavComponent /> }/>
                    <Route  path="/details/:id"   element={<Wrapper component={SignUpComponent} animate={true} />} />
                    <Route path="//api/ZabavnoUcenje/Ucenik/login" element={<UcenikComponent  /> }/>
                    <Route  path="/api/ZabavnoUcenje/registracija"   element={<RegistrationComponent component={LoginComponent} animate={true} />} />
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