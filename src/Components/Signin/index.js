import React, { useState,useEffect } from "react";
import { firebase } from "../../firebase";

import { useNavigate ,Navigate } from 'react-router-dom'//new feature...used in place os props.history.push('/')
import { CircularProgress } from "@mui/material";
import { Redirect } from 'react-router-dom'  //obsolete...not used any more...here useNavigate is used instead of Redirect

import { useFormik } from 'formik'
import * as Yup from 'yup'


import { showErrorToast, showSuccessToast } from '../Utils/tools'
const Signin = (props) => {
   // console.log("printing user")
   // console.log(props.user)
    //for loading icon
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: 'himoncpp@gmail.com',
            password: 'himon1234'
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')//If the user inputs invalid email then this error msg is shown
                .required("The email is required"),

            password: Yup.string()
                .required('The password is required')
        }),

        onSubmit: (values) => {
            //go to server with field values
            console.log(values)
            setLoading(true)//loading shows when we submit the form
            submitForm(values)
        }
    })

    const submitForm = (values) => {



        firebase.auth()
            .signInWithEmailAndPassword(
                values.email,
                values.password
            ).then(() => {
                //show success toast
                showSuccessToast('Welcome Back')
                navigate('/dashboard')
            }).catch(error => {
                setLoading(false)
                showErrorToast('Incorrect Password')


                //show toasts
            })
    }
    //On submitting the form, Formik will do the necessary validation and hence we are callign formik.handleSubmit 
    return (

        <div>
            {!props.user ?

                <div className="container">
                    <div className="signin_wrapper" style={{ margin: '100px' }}>
                        <form onSubmit={formik.handleSubmit}>
                            <h2>Please Login</h2>
                            <input
                                name="email"
                                placeholder="Email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ?
                                <div className="error_label">
                                    {formik.errors.email}
                                </div>
                                : null
                            }
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your passoword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <div className="error_label">
                                    {formik.errors.password}
                                </div>
                                : null
                            }

                            {
                                loading ?
                                    <CircularProgress color='secondary' className="progress" />
                                    :
                                    <button type="submit">Login</button>
                            }


                        </form>
                    </div>
                </div>
                : <Navigate to='/dashboard' />
            }
             
        </div>
    )
}

export default Signin