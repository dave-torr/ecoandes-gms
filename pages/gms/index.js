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

            {/* Dave's Routes */}
            {session.user.name==="David Torres"&&<>
            <Link href="/playground">  
            <a>Playground</a>
            </Link></>}

            {session.user.name==="David Torres"&&<>
            <Link href="/gms/pix">  
            <a>Pix</a>
            </Link></>}
            
            {session.user.name==="David Torres"&&<>
            <Link href="/gms/operations">  
            <a>Operations</a>
            </Link></>}

            {/* Non admin Toutes */}
            <Link href="/gms/tourCreator">  
            <a>Tour Creator</a>
            </Link>
            
            <Link href="/gms/tourExplorer">  
            <a>Tour Explorer</a>
            </Link>

          </>:<>
            <SignInForm />
          </>}
      </>
    )
  }

  return (
    <>
      <main className={styles.main}>
        <h2>Latin Travel Collection</h2>
        <h1>Guest Management System</h1>

        {session&& <h3> Hi there {session?.user.name}! </h3>}

        <div className={styles.gmsBTNCont}>
         {gmsOptionsBTN()}
        </div>

      </main>

      <footer className={styles.footer}>
        <i>by:</i>&nbsp;L | T | C
      </footer>
    </>
  )
}