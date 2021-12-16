import React from 'react';
import ReactDom from 'react';
import App from "./App";
import './static/style.css'
import * as ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
