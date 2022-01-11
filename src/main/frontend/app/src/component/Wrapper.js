import React, {Component} from "react";
import {useLocation, useParams} from "react-router-dom";

function Wrapper({component, animate}) {
    let params = useParams();
    // let location = useLocation();
    return React.createElement(component, {id: params.id});
}

export default Wrapper