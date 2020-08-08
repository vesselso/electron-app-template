import React from 'react'
import ReactDOM from 'react-dom'
const ipc = window.require('electron').ipcRenderer

import internet from './asset/internet.png'
import BigButton from './component/BigButton'

function backToLogin() {
    ipc.sendSync('install-to-login', null)
}

ReactDOM.render(
    <React.StrictMode>
        <div>
            <h2>React Part</h2>
            <p>Course Selection Screen</p>
            <button onClick={backToLogin}>Back</button>
            <br />
            <p>This button is a React child component</p>
            <BigButton />
            <p>This image is rendered in React</p>
            <img src={internet} style={{width: '400px'}}></img>
        </div>
    </React.StrictMode>,
    document.getElementById("root")
)