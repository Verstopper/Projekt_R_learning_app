import React from 'react'
import AuthenticationService from "../services/AuthenticationService";
import {Button} from "react-bootstrap";
import EditGameComponent from "./EditGameComponent";
import AnswerService from "../services/AnswerService";

class EditAnswerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultText: sessionStorage.getItem("answerText"),
            defaultCorrectness: sessionStorage.getItem("answerCorr"),
            updatedText: sessionStorage.getItem("answerText"),
            updatedCorrectness: sessionStorage.getItem("answerCorr"),
        }

        this.handleSubmit = async (event) => {
            let answer_id = AuthenticationService.getAnswerFromStorage();
            event.preventDefault();
            let response = await AnswerService.updateAnswer(answer_id, this.state.updatedText, this.state.updatedCorrectness);
            this.state.success = true;
            if (response.status >= 400) {
                this.state.success = false;
                this.setState({errors: 'Ažuriranje odgovora neuspjelo :(',})
            }
            if (this.state.success) {
                window.location.href = "/api/ZabavnoUcenje/pitanjeuredi";
            }
        }

        this.handleChange = (event) => {
            this.setState(
                {
                    [event.target.name]: event.target.value
                }
            )
        }
    }

    render() {

        return (
            <div className="">
                <section className="container container-px container-py">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-inputs">

                            <input type="text" id="updatedText" name="updatedText" defaultValue={this.state.defaultText}
                                   value={this.state.updatedText} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-inputs">
                            <h5>Točnost:</h5>
                            <select name="updatedCorrectness" id="updatedCorrectness" onChange={this.handleChange} required>
                                <option value="DA">DA</option>
                                <option value="NE">NE</option>
                            </select>
                            <p>
                            </p>
                        </div>
                        <Button className={"btn btn-primary"} type="submit">Ažuriraj odgovor</Button>
                        <Button className={"btn btn-danger"} href="javascript:history.go(-1)">Odustani</Button>
                    </form>
                </section>
            </div>
        );
    }
}

export default EditAnswerComponent;