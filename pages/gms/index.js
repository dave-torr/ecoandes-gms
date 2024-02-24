import React from 'react'
import { useState } from 'react'
import Link from 'next/link'

import styles from '../../styles/pages/gms.module.css'

import { SignInForm } from "./../../components/authForms"
import { useSession } from "next-auth/react"


/////////////////////////////////////////////
/////////////////////////////////////////////
// To Dos:
//  - 'update password' pop up component, form and API route
//  - change doc name to tourCreator
//  - create different link for "Tour Explorer", where we can find all trips to mix and match
//  - Wishlist
//  - likeTourBTN  ( + 1 to likeCount in aTour )

export default function GMS(){
  const { data: session } = useSession()

  const gmsOptionsBTN=()=>{
    return(
      <>
        {/* PROTECTED ROUTES */}
          {session? <>

            {/* Dave's Routes */}
            {session.user.name==="David Torres"&&<>
            <Link href="/playground">  
            Playground
            </Link></>}

            {session.user.name==="David Torres"&&<>
            <Link href="/gms/pix">  
            Pix
            </Link></>}

            {session.user.name==="David Torres"&&<>
            <Link href="/gms/adminDash">  
            Admin
            </Link></>}
            {session.user.name==="David Torres"&&<>
            <Link href="/gms/library">
            Library
            </Link></>}
            
        {/* Non admin Toutes */}
            <Link href="/gms/operations">  
            Operations
            </Link>

            <Link href="/gms/tourCreator">  
            Tour Creator
            </Link>
            
            <Link href="/gms/tourExplorer">  
            Tour Explorer
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