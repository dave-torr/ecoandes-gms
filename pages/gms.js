import React from 'react'
import { useState } from 'react'
import Link from 'next/link'

import styles from '../styles/pages/gms.module.css'

import {UserSignupModal, SignInForm} from "../components/authForms"
import { useSession, signIn, signOut } from "next-auth/react"


/////////////////////////////////////////////
/////////////////////////////////////////////
// To Dos:
//  - 'update password' pop up component, form and API route
//  - change doc name to tourCreator
//  - create different link for "Tour Explorer", where we can find all trips to mix and match
//  - Wishlist
//  - likeTourBTN  ( + 1 to likeCount in aTour )









export default function GMS(){
  const [gmsBTNSwitcher, setGmsSwitcher]=useState("btns")
  const [signUpModalCont, setSignUpMod] = useState(false)
  const { data: session, status } = useSession()

  const gmsOptionsBTN=()=>{
    return(
      <>
        {/* PROTECTED ROUTES */}
        {/* session.user.userType==='admin'  */}
        {session&&<> 
          {session.user.userType==='admin'? <>

            {/* <div className={styles.gmsOptBTN}> <Link href="/tourMaker">Tour Maker 500</Link></div>  */}

            <div className={styles.gmsOptBTN}> <Link href="/tourExplorer">Tour Explorer</Link></div> 
          </>:<> 
            <div className={styles.gmsOptBTN} onClick={()=>{setGmsSwitcher("adminLogin")}}>Log In!</div> 
            <div className={styles.gmsOptBTN}>Create Profile</div>
          </>}
        </>}
      </>
    )
  }

  console.log(session)

  const backMenuBTN=()=>{
    return(<>
      <div className={styles.backManuBTN} onClick={()=>setGmsSwitcher("btns")}> {"<"} Back </div>
    </>)
  }
  const gmsDisplayer=()=>{
    if(gmsBTNSwitcher==="btns"){
      return(
        <>
          {gmsOptionsBTN()}
        </>
      )
    } else if (gmsBTNSwitcher==="adminLogin"){
      return(
        <>
          {backMenuBTN()}
          <SignInForm setMenuDisp={setGmsSwitcher} />
        </>
      )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.authBar}>
        <UserSignupModal 
          modalController={signUpModalCont}
          setModalController={setSignUpMod}
          />
      </div>
      <main className={styles.main}>

        <h2>EcoAndes Travel</h2>
        <h1>Guest Management System</h1>
        {session&& <h2> Hi there {session?.user.name}! </h2>}
        <div className={styles.gmsBTNCont}>
         {gmsDisplayer()}
        </div>

      </main>
      <footer className={styles.footer}>
        <i>by:</i>&nbsp;L | T | C
      </footer>
    </div>
  )
}