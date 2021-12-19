import React, { Component } from 'react';
import  {Link, withRouter } from 'react-router-dom';


class MainIndexComponent extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <main>
                <section>
                    <a href="/api/ZabavnoUcenje/professor/login">HEJ SVIJET</a>
                </section>

            </main>
        );
    }
}



export default MainIndexComponent;