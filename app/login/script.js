import React from 'react'
import ReactDOM from 'react-dom'
const ipc = window.require('electron').ipcRenderer

function simAfterLogin() {
    ipc.sendSync('sim-after-login-scrape', null)
}

ReactDOM.render(
    <React.StrictMode>
        <div>
            <p>Login Screen</p>
            <br />
            <button onClick={simAfterLogin}>Login (simulate Scrape Finished)</button>
        </div>
    </React.StrictMode>,
    document.getElementById("root")
)