import React from 'react'
import AuthenticationService from "../services/AuthenticationService";
import QuestionService from "../services/QuestionService";

class AddQuestionComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            errors: {},
            hasLoginFailed: true,
            showSuccessMessage: false
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
            let err = {}
            let idGame = AuthenticationService.getGameFromStorage();
            let response = await QuestionService.addQuestion(idGame, this.state.name, this.state.description);
            if (response.success === false) {
                this.setState(
                    {
                        errors: 'Dodvanje pitanja je bilo neuspješno',
                    }
                )
            }
            window.location.href = "/api/ZabavnoUcenje/igrauredi";
        }
    }

    render() {

        return (
            <div className="">
                <section className="container container-px container-py">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-inputs">
                            <label htmlFor="name"></label>
                            <input type="text" id="name" name="name" placeholder="Naziv pitanja"
                                   value={this.state.name} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-inputs">
                            <label htmlFor="description"></label>
                            <input type="text" id="description" name="description" placeholder="Opis pitanja"
                                   value={this.state.description} onChange={this.handleChange} required/>
                        </div>
                        <button className={"btn btn-primary"} type="submit">Dodaj pitanje</button>
                        <a className={"btn btn-danger"} href="javascript:history.go(-1)">Odustani</a>
                    </form>
                </section>
            </div>
        );
    }
}

export default AddQuestionComponent;