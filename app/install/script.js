import React from 'react'
import ReactDOM from 'react-dom'
const ipc = window.require('electron').ipcRenderer

function backToLogin() {
    ipc.sendSync('install-to-login', null)
}

ReactDOM.render(
    <React.StrictMode>
        <div>
            <p>Course Selection Screen</p>
            <br />
            <button onClick={backToLogin}>Back</button>
        </div>
    </React.StrictMode>,
    document.getElementById("root")
)