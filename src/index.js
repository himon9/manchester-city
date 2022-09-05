import React from 'react';
import ReactDOM from 'react-dom/client';
import RoutesFunc from './routes'
import './Resources/css/app.css'

import {firebase} from './firebase'


const App= (props) => {
    return (
        <RoutesFunc {...props}/>
    )
}
const root = ReactDOM.createRoot(document.getElementById('root'));


firebase.auth().onAuthStateChanged((user)=>{//remembers user if he was logged in previously
    root.render(
        <App user={user}/>
    );
})
