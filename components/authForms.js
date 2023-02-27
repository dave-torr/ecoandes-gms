import React from "react"
import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"

import Dialog from '@mui/material/Dialog';

import {aTextInput} from "./forms"

import styles from "../styles/components/forms.module.css"


export function SignInForm(){
    const [userLogIn, setLogInObj]=useState({
        email: String,
        password: String
    })
    const submitLogIn = async ()=>{
        const status = await signIn('credentials',{
            redirect: false,
            email: userLogIn.email,
            password: userLogIn.password
        })
        if(status.error){
            window.alert(`Error logging in: ${status.error}`)
        }
    }

    return(<>
        <form className={styles.signInForm} onSubmit={(e)=>{
            e.preventDefault()
            submitLogIn()
        }}>
            Log In:
            {aTextInput("Email*", "email", userLogIn, setLogInObj, "email", true)}
            {aTextInput("Password*", "password", userLogIn, setLogInObj, "password", true)}

            <input type="submit" value="Submit!" className={styles.submitBTN} />
        </form>
    </>)
}
/////////////////////////// ///////////////////////////
//////////////////////////////////////////////////////

// used in GMS Nav Bar
export function SignOutBtn(){
    const { data: session } = useSession()
    return(<>
        <div className={styles.authBar}>
            {session&&<> 
                <div className={styles.signOutBTN} onClick={()=>signOut()}>Sign Out</div>
            </>}
        </div>
    </>)
}


// Only for Admins, IT department 
export function UserSignupModal(props){

    // Create user sign up form
    // if user is created open login modal
    let toDate = new Date()
    const { data: session, status } = useSession()
    const [userSignupObj, setSignUpObj]=useState({
        name: String,
        email: String, 
        password: String, 
        company: "EcoAndes Travel",
        department: String,
        companyTitle: String,
        clientType: "LTC",
        userType: String,
        // planning & Sales, operations, admin, 
        resArray: [],
        signUpStream: "website",
        active: false,
        registeredBy: toDate
    })

    const submitSignUp=async()=>{
        let stringifiedUserMod= JSON.stringify(userSignupObj)
        const res = await fetch("/api/auth/signUp",{
            method: "POST",
            body: stringifiedUserMod
        })
        const userSignup = await res.json()
        console.log(userSignup)
        if(res.status===201){
            window.alert("User Created!")
            props.setModalController(false)
        } else {
            window.alert(`Error with sign up: ${userSignup.message}`)
        }
    }

    return(<>
        {session? <>
            <div className={styles.authBTN} onClick={()=>signOut({redirect: false})}> Sign Out</div>
        </>:<> 
            <div onClick={()=>props.setModalController(true)} className={styles.authBTN}> 
            Sign Up</div>
        </>}

        <Dialog open={props.modalController} onClose={()=>props.setModalController(false)}>
            <div className={styles.logInModCont} >
                <h2 style={{color: "white", fontSize: "2em", fontWeight: "450"}}>Sign Up</h2>
                <h3 style={{color: "white"}}> to use the EcoAndes Travel GMS</h3>
                <form className={styles.signUpForm} onSubmit={(e)=>{
                    e.preventDefault()
                    if(userSignupObj.password.length>5){
                        submitSignUp()
                    }
                    }}>
                    {aTextInput("Full Name*", "name", userSignupObj, setSignUpObj, "text", true)}
                    {aTextInput("Email*", "email", userSignupObj, setSignUpObj, "email", true)}
                    {aTextInput("Department*", "department", userSignupObj, setSignUpObj, "text", true)}
                    {aTextInput("Company Title*", "companyTitle", userSignupObj, setSignUpObj, "text", true)}
                    {aTextInput("Password*", "password", userSignupObj, setSignUpObj, "password", true)}
                    <input type="submit" value="Submit!" className={styles.submitBTN} />
                </form>
            </div>
        </Dialog>
    </>)
}
