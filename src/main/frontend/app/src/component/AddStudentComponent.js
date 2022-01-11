import React, {Component} from 'react'
import AuthenticationService from "../services/AuthenticationService";
import ProfessorService from "../services/ProfessorService";
import ProfessorDashboard from "./ProfessorDashboard";
import StudentService from "../services/StudentService";

class GradeItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <option value={this.props.name}>{this.props.name}</option>
    }
}

class AddStudentComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            username: '',
            fullName: '',
            grade: '',
            showSuccessMessage: false
        }
        this.handleChange = async (event) => {

            this.setState(
                {
                    [event.target.name]: event.target.value
                }
            )
        }
        this.handleSubmit = async (event) => {
            event.preventDefault();
            let err = {}
            console.log(err.password);
            console.log("i am here");
            if (!err.password) {
                let response = await StudentService.addStudent(this.state.fullName, this.state.username, this.state.grade);
                this.state.success = true;
                if (response.status >= 400) {
                    this.state.success = false;
                    this.setState(
                        {
                            errors: 'Dodavanje učenika neuspješno.',
                        }
                    )
                }
            } else {
                this.setState(
                    {
                        errors: err,
                    }
                )
            }
            if (this.state.success) {
                return (
                    <ProfessorDashboard/>
                )
            }
        }
    }

    async componentDidMount() {
        let usernameOfProfessor = AuthenticationService.getLoggedInUserName();
        await ProfessorService.getAllGrades(usernameOfProfessor).then(res => {
            console.log("res " + res)
            this.setState({
                data: res.data,
            })
        });
        console.log("+++++++++++++++++")
        console.log(this.state.data)
        console.log(typeof this.state.data)
        //console.log(this.state.data.map)
        console.log("+++++++++++++++++")
    }

    render() {
        let rows;
        if (this.state.data) {
            rows = []
            for (let grade in this.state.data) {
                rows.push(<GradeItem key={this.state.data[grade].id}
                                     name={this.state.data[grade].name}/>)
            }
        }
        console.log(rows);

        if (this.state.success) {
            return (
                <ProfessorDashboard/>
            )
        }

        /*const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        if(isUserLoggedIn){
            let message = <p> Already logged in. Go to main page <a href='/'>here.</a></p>;
            return <InvalidComponent message={message} />
        }*/

        return (
            <div className="">
                <section className="container container-px container-py">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-inputs">
                            {/*<label htmlFor="name"></label>*/}
                            <input type="text" id="fullName" name="fullName" placeholder="Ime učenika"
                                   value={this.state.fullName} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-inputs">
                            {/*<label htmlFor="username"></label>*/}
                            <input type="text" id="username" name="username" placeholder="Korisničko ime učenika"
                                   value={this.state.username} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="grade">Odabir razreda</label>
                            <select className="dropdown" name="grade" onChange={this.handleChange} required>
                                {rows && rows}
                            </select>
                        </div>
                        <button className={"btn btn-primary"} type="submit">Dodaj učenika</button>
                        <a className={"btn btn-danger"} href="javascript:history.go(-1)">Odustani</a>
                    </form>
                </section>
            </div>
        );
    }
}

export default AddStudentComponent;