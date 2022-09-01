import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';

const {Footer} = Layout;

class MyFooter extends Component{
    render() {
        return(
            <Footer style={{background: '#5B3758', position: "fixed", bottom: 0, width: '100%'}}></Footer>
        );
    }
}

export default MyFooter;