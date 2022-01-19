import React, {Component} from 'react';
import NavBar from "./Navbar";
import MyHeader from "./MyHeader";
import MyFooter from "./MyFooter";
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import Title from "antd/lib/typography/Title";

const {Content} = Layout;

class MainIndexComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Layout>
                    <MyHeader/>
                    <NavBar/>
                    <Content style={{background: "white", position: "fixed", top: '40%', left: 0, right: 0, bottom: 0}}>
                        <Title style={{fontFamily: "Gabriola", alignContent: 'space-evenly'}}>
                            Dobro došli u aplikaciju za učinkovitije učenje!
                        </Title>
                        <p>Ako ste profesor i imate svoj korisnički račun prijavite se, a ako nemate račun registrirajte
                            se.</p>
                        <p>Ako ste učenik prijavite se, a ako niste sigurni za svoje pristupne podatke obratite se svome
                            profesoru.</p>
                        <p>Ako ste već prijavljeni i želite nastaviti koristiti aplikaciju stisnite na "Kontrolna ploča".</p>
                    </Content>
                    <MyFooter/>
                </Layout>
            </>
        );
    }
}

export default MainIndexComponent;