import React from 'react'
import { useState } from 'react'
import Link from 'next/link'

import styles from '../../styles/pages/gms.module.css'

import { SignInForm, SignOutBtn } from "./../../components/authForms"
import {TourDisplayer } from "./../../components/tours"
import { useSession, signOut } from "next-auth/react"


/////////////////////////////////////////////
/////////////////////////////////////////////
// To Dos:
//  - 'update password' pop up component, form and API route
//  - change doc name to tourCreator
//  - create different link for "Tour Explorer", where we can find all trips to mix and match
//  - Wishlist
//  - likeTourBTN  ( + 1 to likeCount in aTour )


export default function GMS(){
  const [logInTrig, setLogInTrig]=useState(false)

  const { data: session } = useSession()

  const gmsOptionsBTN=()=>{
    return(
      <>
        {/* PROTECTED ROUTES */}
          {session? <>
            <div className={styles.gmsOptBTN}> <Link href="/gms/tourCreator">
              Tour Creator</Link></div> 
            <div className={styles.gmsOptBTN}> <Link href="/gms/tourExplorer">
              Tour Explorer</Link></div> 
            <div className={styles.gmsOptBTN}> <Link href="/gms/operations">
              Document Generator</Link></div> 
            <div className={styles.gmsOptBTN}> <Link href="/rafle">
              T&AS Raffle</Link></div> 
          </>:<> 
            {logInTrig? <> 
              <SignInForm />
            </>:<> 
              <div className={styles.gmsOptBTN} onClick={()=>{setLogInTrig(true)}}>Log In!</div> 
            </>}
          </>}
      </>
    )
  }



  return (
    <div >

      <main className={styles.main}>
        <h2>EcoAndes Travel</h2>
        <h1>Guest Management System</h1>

        {session&& <h2> Hi there {session?.user.name}! </h2>}

        <div className={styles.gmsBTNCont}>
         {gmsOptionsBTN()}
        </div>

      </main>

      <footer className={styles.footer}>
        <i>by:</i>&nbsp;L | T | C
      </footer>

    </div>
  )
}