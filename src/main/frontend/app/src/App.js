import Style from './static/style.css'
import RouterComponent from "./component/RouterComponent";
import React, {useState, useEffect} from "react";
import './App.css';
import './static/style.css'

/*function App() {
  return (
    <div className="App">

      <RouterComponent />
      {/!*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*!/}
    </div>
  );
}*/
function App(){
    console.log("pozdrav iz app.js")
    return (
        <>
            <div className= "App">
                <RouterComponent />
            </div>
        </>
    )
}

/*class App extends React.Component {
    render() {
        return (
            <div className="App">
                <RouterComponent />

            </div>
        );
    }
}*/

export default App;
