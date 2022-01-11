import React from 'react'
import AuthenticationService from "../services/AuthenticationService";
import {Button} from "react-bootstrap";
import AnswerService from "../services/AnswerService";

class AddAnswerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            name2: '',
            name3: '',
            name4: '',
            text: '',
            text2: '',
            text3: '',
            text4: '',
            errors: {},
            hasLoginFailed: true,
            showSuccessMessage: false,
            success: true
        }


        this.handleChange = (event) => {
            this.setState(
                {
                    [event.target.name]: event.target.value
                }
            )
        }
        this.handleSubmit = async (event) => {
            event.preventDefault();

            let idquestion = AuthenticationService.getQuestionFromStorage();
            let response = await AnswerService.addAnswer(idquestion, this.state.name, this.state.text)
            let response2 = await AnswerService.addAnswer(idquestion, this.state.name2, this.state.text2)
            let response3 = await AnswerService.addAnswer(idquestion, this.state.name3, this.state.text3)
            let response4 = await AnswerService.addAnswer(idquestion, this.state.name4, this.state.text4)
            if (response.success === false || response2.success === false || response3.success === false || response4.success === false) {
                this.setState(
                    {
                        errors: 'Dodvanje pitanja je bilo neuspješno',
                    }
                )
                this.state.success = false;
                window.location.href = "/api/ZabavnoUcenje/pitanjeuredi";

            } else {
                this.state.success = true;
            }
        }
    }


    render() {

        return (
            <div className="">
                <section className="container container-px container-py">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-inputs">
                            <input type="text" id="name" name="name" placeholder="Naziv odgovora"
                                   value={this.state.name} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-inputs">
                            {/*<label htmlFor="description"></label>*/}
                            <h5>Točnost:</h5>
                            <select name="text" id="text" onChange={this.handleChange} required>
                                <option value="DA">DA</option>
                                <option value="NE">NE</option>
                            </select>
                            <p>
                            </p>
                        </div>
                        <div className="form-inputs">
                            <input type="text" id="name2" name="name2" placeholder="Naziv odgovora"
                                   value={this.state.name2} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-inputs">
                            {/*<label htmlFor="description"></label>*/}
                            <h5>Točnost:</h5>
                            <select name="text2" id="text2" onChange={this.handleChange} required>
                                <option value="DA">DA</option>
                                <option value="NE">NE</option>
                            </select>
                            <p>
                            </p>
                        </div>
                        <div className="form-inputs">
                            {/*<label htmlFor="name"></label>*/}
                            <input type="text" id="name3" name="name3" placeholder="Naziv odgovora"
                                   value={this.state.name3} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-inputs">
                            {/*<label htmlFor="description"></label>*/}
                            <h5>Točnost:</h5>
                            <select name="text3" id="text3" onChange={this.handleChange} required>
                                <option value="DA">DA</option>
                                <option value="NE">NE</option>
                            </select>
                            <p>
                            </p>
                        </div>
                        <div className="form-inputs">
                            {/*<label htmlFor="name"></label>*/}
                            <input type="text" id="name4" name="name4" placeholder="Naziv odgovora"
                                   value={this.state.name4} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-inputs">
                            {/*<label htmlFor="description"></label>*/}
                            <h5>Točnost:</h5>
                            <select name="text4" id="text4" onChange={this.handleChange} required>
                                <option value="DA">DA</option>
                                <option value="NE">NE</option>
                            </select>
                            <p>
                            </p>
                        </div>
                        {
                            !this.state.success && <p>Došlo je do greške prilikom dodavanja igre. Pokušajte ponovno</p>
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