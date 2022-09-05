import React, { Component } from "react";
import {firebase} from '../firebase'
import {Navigate} from 'react-router-dom'

const AuthGuard = (props) => {

    const user =firebase.auth().currentUser 

    if (user) {
        return <props.component/>
    }
    
    else {
        return <Navigate to='/sign_in' />
    }/*
    console.log("printing user\n")
    console.log(user)
    class AuthHoc extends React.Component{

        
        authCheck = () => {
            const user =firebase.auth().currentUser 

            console.log(user)
            //If we get a user then it means that the user is authenticated
            if (user) {
                return <Component/>
            } else {
                return <Component/>//<Navigate to='/sign_in'/>
                //return navigate('/sign_in') ////ERROR!!!!!!!!!!!!!!
            }
        }

        render(){
            return this.authCheck()
        }
    }
    return AuthHoc*/
}

export default AuthGuard