import React, {Component, useState} from 'react'
import { validatePassword } from "./validateInfo";
import AuthenticationService from "../services/AuthenticationService";
import {Navigate} from "react-router-dom";
import InvalidComponent from "./InvalidComponent";
import ProfessorService from "../services/ProfessorService";
import GameService from "../services/GameService";
import ProfessorDashboard from "./ProfessorDashboard";
import StudentService from "../services/StudentService";

class AddStudentComponent extends React.Component {

    constructor(props) {
        super(props);
        // console.log("     +++++       ")
        // console.log(this.props.id)
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
            // console.log("here")
            event.preventDefault();
            let err = {}
            //err = validatePassword(this.state.password);
            //err.password = validatePassword(this.state.password)
            //console.log(err)
            console.log(err.password);
            console.log("i am here");
            console.log("ime ucenika:" + this.state.full + ", username ucenika: " +  this.state.username)
            if(!err.password){
                let response = await StudentService.addStudent(this.state.fullName, this.state.username, this.state.grade);
                this.state.success = true;
                if(response.status >= 400){
                    this.state.success = false;
                    this.setState(
                        {
                            errors: 'Dodavanje učenika neuspješno.',
                        }
                    )
                }
            }
            else{
                this.setState(
                    {
                        errors: err,
                    }
                )
            }
            // console.log(errs)
            if(this.state.success){
                return(
                    <ProfessorDashboard/>
                )
            }
        }
    }

    componentDidMount() {
        let usernameOfProfessor = AuthenticationService.getLoggedInUserName();
        ProfessorService.getAllGrades(usernameOfProfessor).then( res => {
            console.log(res)
            this.setState({
                data : res.data,
            })
        });
        console.log("+++++++++++++++++")
        console.log(this.state.data)
        //console.log(this.state.data.map)
        console.log("+++++++++++++++++")
    }

    render() {

        if(this.state.success){
            return(
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
                            <label htmlFor="name"></label>
                            <input type="text" id="fullName" name="fullName" placeholder="Ime učenika"
                                   value={this.state.fullName} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-inputs">
                            <label htmlFor="username"></label>
                            <input type="text" id="username" name="username" placeholder="Korisničko ime učenika"
                                   value={this.state.username} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="grade">Odabir razreda</label>
                            <select className="dropdown" name="grade" id="" onChange={this.handleChange} required>
                                <option>1.a</option>
                                <option>blabla</option>
                                {/*{this.state.data.map(grade => (*/}
                                {/*    <option key={grade.id} value = {grade.id}>{grade.name}</option>*/}
                                {/*))}*/}
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