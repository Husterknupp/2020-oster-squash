import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Registration } from "./DTOs";

/* todo
  * rename todo -> osteranmeldung
  * git-ify
  * have only necessary directories
  * basic 2-panel layout
  * list calendar dates
  * create registration when clicking on a date
  * allow more details in side panel
 */


function callBackend(): Promise<Registration[]> {
  return fetch("http://localhost:8000/api/registrations").then(fetchResponse =>
    fetchResponse.json().then(json => json as Registration[])
  );
}

const App: React.FC = () => {
  useEffect(() => {
    callBackend();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
