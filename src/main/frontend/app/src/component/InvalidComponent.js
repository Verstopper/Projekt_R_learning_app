import React, { Component }  from 'react';

class InvalidComponent extends Component {

    constructor(props) {
        super(props);
        //  console.log(this.props.message);
    }
    render() {
        return (
            <div>
                <section>
                    {this.props.message}
                </section>
            </div>
        );
    }
}

export default InvalidComponent;