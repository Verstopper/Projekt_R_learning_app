import React, {Component} from 'react'
import AuthenticationService from "../services/AuthenticationService";
import ProfessorService from "../services/ProfessorService";
import ProfessorDashboard from "./ProfessorDashboard";
import StudentService from "../services/StudentService";
import MyHeader from "./MyHeader";
import Title from "antd/lib/typography/Title";
import MyFooter from "./MyFooter";
import Layout, {Content} from "antd/lib/layout/layout";
import {Button, Space} from "antd";

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
            success: false, username: '', fullName: '', grade: '', showSuccessMessage: false,
            id: '', name: ''
        }
        this.handleChange = async (event) => {

            this.setState({
                [event.target.name]: event.target.value
            })
        }
        this.handleSubmit = async (event) => {
            event.preventDefault();
            let err = {}
            if (!err.password) {
                let response = await StudentService.addStudent(this.state.fullName, this.state.username, this.state.grade);
                if (response === false) {
                    this.state.success = false;
                    this.setState({
                        errors: 'Dodavanje učenika neuspješno.',
                    })
                } else {
                    this.state.success = true;
                    window.location.href = "/api/ZabavnoUcenje/profesor/pregledIgara";

                }
            } else {
                this.setState(
                    {
                        errors: err,
                    }
                )
            }
        }
    }

    async componentDidMount() {
        let usernameOfProfessor = AuthenticationService.getLoggedInUserName();
        await ProfessorService.getAllGrades(usernameOfProfessor).then(res => {
            this.setState({
                data: res.data,
            })
        });
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

        if (this.state.success) {
            return (<ProfessorDashboard/>)
        }

        return (<div className="">
            <Layout>
                <MyHeader/>
                <Content
                    style={{background: "white", position: "fixed", top: '30%', left: 0, right: 0, bottom: 0}}>
                    <Title style={{fontFamily: "Gabriola", alignContent: 'space-evenly'}}>
                        Dodaj učenika: </Title>
                    <section className="container container-px container-py">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-inputs">
                                <input type="text" id="fullName" name="fullName" placeholder="Ime učenika"
                                       value={this.state.fullName} onChange={this.handleChange} required/>
                            </div>
                            <div className="form-inputs">
                                <input type="text" id="username" name="username" placeholder="Korisničko ime učenika"
                                       value={this.state.username} onChange={this.handleChange} required/>
                            </div>
                            <div className="form-group">
                                <select onChange={this.handleChange} required>
                                    {rows && rows}
                                </select>
                            </div>
                            <p/>
                            <Space size={"middle"}>
                                <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                        htmlType={"submit"}>Dodaj</Button>
                                <Button shape={"round"} style={{background: '#5B3758', color: "white"}}
                                        href={"/api/ZabavnoUcenje/profesor/login"}>Odustani</Button>
                            </Space>
                        </form>
                    </section>
                </Content>
                <MyFooter/>
            </Layout>
        </div>);
    }
}

export default AddStudentComponent;