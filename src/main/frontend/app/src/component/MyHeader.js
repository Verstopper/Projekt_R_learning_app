import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import Title from "antd/lib/typography/Title";

const {Header} = Layout;

class MyHeader extends Component {
    render() {
        return(
            <Header style={{background: '#5B3758'}}>
                <p/>
                <Title style={{color: 'white', fontFamily: "Gabriola", alignContent: 'space-evenly'}}>
                    Zabavno učenje
                </Title>
            </Header>
        );
    }
}

export default MyHeader;