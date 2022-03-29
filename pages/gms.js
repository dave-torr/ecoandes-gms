import React from 'react'
import { useState } from 'react'
import Link from 'next/link'

import styles from '../styles/pages/gms.module.css'

import {UserSignupModal, SignInForm} from "../components/authForms"
import { useSession, signIn, signOut } from "next-auth/react"


export default function GMS(){
  const [gmsBTNSwitcher, setGmsSwitcher]=useState("btns")
  const [signUpModalCont, setSignUpMod] = useState(false)
  const { data: session, status } = useSession()
  const gmsOptionsBTN=()=>{
    return(
      <>
        {/* PROTECTED ROUTES */}
        {session? <>
          <div className={styles.gmsOptBTN}> <Link href="/tourExplorer">Tour Explorer</Link></div> 
        </>:<> 
          <div className={styles.gmsOptBTN} onClick={()=>{setGmsSwitcher("adminLogin")}}>Log In!</div> 
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