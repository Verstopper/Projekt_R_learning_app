import React, {Component, useState} from 'react'

import AuthenticationService from "../services/AuthenticationService";

import {Button, Dropdown} from "react-bootstrap";
import AnswerService from "../services/AnswerService";
import LogoutComponent from "./LogOutComponent";

class AddAnswerComponent extends React.Component {


    constructor(props) {
        super(props);
        // console.log("     +++++       ")
        // console.log(this.props.id)
        this.state = {
            name: '',
            name2: '',
            name3: '',
            name4: '',
            check1: false,
            check2: false,
            check3: false,
            check4: false,
            errors: {},
            hasLoginFailed: true,
            showSuccessMessage: false,
            success: true,
            wrong: true
        }
        this.handleChange = (event) => {

            this.setState(
                {
                    [event.target.name]: event.target.value,

                }
            )

        }
        function setFalse() {
            console.log("USLI SMO")
            this.setState(
                {
                    wrong: false

                }
            )
        }

        this.handleSubmit = async (event) => {
            console.log("CHCEK1 " + this.state.check1 + " CHECK2 " + this.state.check2 + " check3 " + this.state.check3 + " check4 " + this.state.check4)
            event.preventDefault();
            if(this.state.check1 == true  && this.state.check3 == true &&  this.state.check2 == true &&  this.state.check4 == true) {

                this.setState(
                    {
                        wrong: false

                    }
                )
            }
            if(this.state.check1 == false && this.state.check2 == false) {

                this.setState(
                    {
                        wrong: false

                    }
                )
            } else if(this.state.check1 == false && this.state.check3 == false) {

                this.setState(
                    {
                        wrong: false

                    }
                )
            }else if(this.state.check1 == false && this.state.check4 == false) {

                this.setState(
                    {
                        wrong: false

                    }
                )
            }else if(this.state.check2 == false && this.state.check3 == false) {

                this.setState(
                    {
                        wrong: false

                    }
                )
            }else if(this.state.check2 == false && this.state.check4 == false) {

                this.setState(
                    {
                        wrong: false

                    }
                )
            }else if(this.state.check3 == false && this.state.check4 == false) {

                this.setState(
                    {
                        wrong: false

                    }
                )
            }
            let err = {}
            console.log("this.state.wrong" + this.state.wrong)
            if (this.state.wrong) {
                console.log("ULAZIM IZ NEKOM MENI NEPOZNATOG RAZLOGA")
                let idquestion = AuthenticationService.getQuestionFromStorage();
                let response = await AnswerService.addAnswer(idquestion, this.state.name, this.state.check1, this.state.name2, this.state.check2, this.state.name3, this.state.check3,this.state.name4, this.state.check4)

                if (response.success == false ) {
                    this.setState(
                        {
                            errors: 'Dodavanje odgovora je bilo neuspješno',
                        }
                    )
                    this.state.success = false;
                    window.location.href = "/api/ZabavnoUcenje/pitanjeuredi";


                    // console.log(errs)


                } else {
                    this.state.success = true;
                    window.location.href = "/api/ZabavnoUcenje/pitanjeuredi";
                }
            } else {
                this.setState({
                    errors: 'Dodvanje odgovora je bilo neuspješno',
                })
            }
        }

    }
        render()
        {


            return (
                <div className="">
                    <section className="container container-px container-py">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-inputs">

                                <input type="text" id="name" name="name" placeholder="Naziv odgovora"
                                       value={this.state.name} onChange={this.handleChange} required/>
                            </div>
                            <div className="form-inputs">
                                <label htmlFor="description"></label>


                                <h5>Ovaj odgovor je točan:</h5>
                                <div>
                                    <input className="form-check-input" type="radio" name="correctOne" id="correctOne"
                                           value={this.state.check1} onChange={this.handleChange}
                                           aria-label="TOČAN ODGOVOR"/>
                                </div>

                                <p>
                                </p>
                            </div>
                            <div className="form-inputs">

                                <input type="text" id="name2" name="name2" placeholder="Naziv odgovora"
                                       value={this.state.name2} onChange={this.handleChange} required/>
                            </div>
                            <div className="form-inputs">
                                <label htmlFor="description"></label>

                                <h5>Ovaj odgovor je točan:</h5>
                                <div>
                                    <input className="form-check-input" type="radio" id="correctOne" name="correctOne"
                                           value={this.state.check2} onChange={this.handleChange}
                                           aria-label="TOČAN ODGOVOR"/>
                                </div>

                                <p>
                                </p>
                            </div>
                            <div className="form-inputs">
                                <label htmlFor="name"></label>
                                <input type="text" id="name3" name="name3" placeholder="Naziv odgovora"
                                       value={this.state.name3} onChange={this.handleChange} required/>
                            </div>
                            <div className="form-inputs">
                                <label htmlFor="description"></label>

                                <h5>Ovaj odgovor je točan:</h5>
                                <div>
                                    <input className="form-check-input" type="radio" id="correctOne" name="correctOne"
                                           value={this.state.check3} onChange={this.handleChange}
                                           aria-label="TOČAN ODGOVOR"/>
                                </div>
                                <p>
                                </p>
                            </div>
                            <div className="form-inputs">
                                <label htmlFor="name"></label>
                                <input type="text" id="name4" name="name4" placeholder="Naziv odgovora"
                                       value={this.state.name4} onChange={this.handleChange} required/>
                            </div>
                            <div className="form-inputs">
                                <label htmlFor="description"></label>

                                <h5>Ovaj odgovor je točan:</h5>
                                <div>
                                    <input className="form-check-input" type="radio" id="correctOne" name="correctOne"
                                           value={this.state.check4} onChange={this.handleChange}
                                           aria-label="TOČAN ODGOVOR"/>
                                </div>

                                <p>
                                </p>
                            </div>
                            {
                                !this.state.success &&
                                <p>Došlo je do greške prilikom dodavanja igre. Pokušajte ponovno</p>
                            }
                            {
                                this.state.wrong && <p>SAMO JEDAN ODGOVOR JE TOČAN!</p>
                            }
                            <Button className={"btn btn-primary"} type="submit">Dodaj odgovor</Button>
                            <Button className={"btn btn-danger"} href="javascript:history.go(-1)">Odustani</Button>
                        </form>
                    </section>
                </div>
            );
        }

    }


export default AddAnswerComponent;