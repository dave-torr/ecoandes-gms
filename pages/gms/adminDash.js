import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from "next-auth/react"


import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import CircularProgress from '@mui/material/CircularProgress';

import { anInputDisplayer } from '../../components/forms';

import {GMSNavii} from "./../../components/navis"

import styles from "./../../styles/pages/adminDash.module.css"

// import TrackChangesIcon from '@mui/icons-material/TrackChanges';

// Bitacora
// user Admin
// Financials

export default function AdminDash(){
    const { data: session } = useSession()
    //////////////////////////////////////
    let toDate = new Date()
    const [homeKey, setHomeKey]=useState("home")
    const [userKey, setUserKey]=useState("userOpts")
    const [userSignUpObj, setSignUpObj]=useState({
        name: String,
        email: String, 
        password: String, 
        company: String,
        department: String,
        companyTitle: String,
        profilePic: String,
        clientType: "LTC",
        userType: String,
        // planning & Sales, operations, admin, 
        resArray: [],
        signUpDate: toDate
    })
    const [addUserTrig, setAddUserTrig] = useState(false)

    const submitSignUp=async()=>{
        let stringReqBody= JSON.stringify(userSignUpObj)

        // check api route to see if user is signed up immediately

        const res = await fetch("/api/auth/signUp",{
            method: "POST",
            body: stringReqBody
        })
        const userSignup = await res.json()
        if(res.status===201){
            window.alert("User Created!")
        } else {
            window.alert(`Error with sign up: ${userSignup.message}`)
        }
    }
    const addUserDisp=()=>{
        if(userKey==="addUser"){
        return(<>
            <form className={styles.aPage} id="userCreateForm" onSubmit={(e)=>{
                e.preventDefault()
                if(!addUserTrig){
                    {submitSignUp()}
                }
                setAddUserTrig(true)
            }}>
                <div className={styles.spaceBetRow}> 
                    <h2>Add Users </h2> 
                    <span style={{cursor:"pointer" }} onClick={()=>setUserKey("userOpts")}>
                        <CancelPresentationIcon />
                    </span>
                </div>
                <div className={styles.spaceBetRow}> 
                    <div style={{ width:"48%" }}> 
                        {anInputDisplayer("user name", "name", "text", true, userSignUpObj.name, userSignUpObj, setSignUpObj )}
                    </div>
                    <div style={{ width:"48%" }}> 
                        {anInputDisplayer("email", "email", "text", true, userSignUpObj.email, userSignUpObj, setSignUpObj )}
                    </div>
                </div>
                <div className={styles.spaceBetRow}> 
                    <div style={{ width:"48%" }}> 
                        {anInputDisplayer("company", "company", "text", true, userSignUpObj.company, userSignUpObj, setSignUpObj )}
                    </div>
                    <div style={{ width:"48%" }}> 
                        {anInputDisplayer("Department", "department", "text", true, userSignUpObj.department, userSignUpObj, setSignUpObj )}
                    </div>
                </div>
                <div className={styles.spaceBetRow}> 
                    <div style={{ width:"48%" }}> 
                        {anInputDisplayer("Profile pic", "profilePic", "text", false, userSignUpObj.profilePic, userSignUpObj, setSignUpObj )}
                    </div>
                    <div style={{ width:"48%" }}> 
                        {anInputDisplayer("Hierarchy", "hierarchy", "number", true, userSignUpObj.hierarchy, userSignUpObj, setSignUpObj, 0, 4 )}
                    </div>
                </div>
                <div className={styles.spaceBetRow}> 
                    <div style={{ width:"48%" }}> 
                        {anInputDisplayer("Password", "password", "password", true, false, userSignUpObj, setSignUpObj )}
                    </div>
                    <div style={{ width:"48%",  }}>
                        {addUserTrig ? <>
                            <CircularProgress />
                        </>:<>
                            <input type="submit" className={styles.submitBTN} />
                        </> }
                    </div>
                </div>
            </form>
        </>)
        } 
    }
    // user Dash
    const userAdminDisp=()=>{
        if(homeKey==="users"){
        

        // fetch users from db
        // create middleware to filter out sensitive info

        // add user BTN

        return(<>
            <div className={styles.spaceBetRow} >
                <h1>User Administration</h1>
            </div>
            {userKey==="userOpts"&&<>
                <div className={styles.userAdminOptsCont}> 
                    <span onClick={()=>setUserKey("addUser")}> 
                        <AddCircleOutlineIcon/> &nbsp; add user
                    </span>
                </div>
            </>}

            {addUserDisp()}


        </>)
    }}




    // general page disp
    const adminDashHome=()=>{
        return(<>
            {homeKey!="home"? <> 
                <div className={styles.spaceBetRow}> 
                    <div className={styles.returnHomeBTN} 
                    onClick={()=>setHomeKey("home")}> 
                        <ArrowBackIosNewIcon /> home
                    </div>
                </div>
            </>:<> 
            <AdminPanelSettingsIcon fontSize="large"  />
            <h2>Latin Travel Collection</h2>
            <h1>Admin Dashboard</h1>

            <div className={styles.adminDashOptCont}> 
                <span onClick={()=>setHomeKey("users")}>  
                    <ContactPageIcon fontSize="large" />
                    <h3> GMS Users </h3>
                </span>
            </div>

            </>}
        </>)
    }




///////////////////////////////////////
///////////////////////////////////////
return(
<>{session && <>
    <GMSNavii  user={session.user} />
    <div className={styles.adminPage}>

        {adminDashHome()}
        {userAdminDisp()}


    </div>
</>}</>)}