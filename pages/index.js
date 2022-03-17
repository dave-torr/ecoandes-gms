import React from 'react'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/pages/Home.module.css'

import {UserSignupModal, SignInForm} from "../components/authForms"
import { useSession, signIn, signOut } from "next-auth/react"


export default function Home(){
  const [homeBTNSwitcher, setHomeSwitcher]=useState("btns")
  const [signUpModalCont, setSignUpMod] = useState(false)
  const { data: session, status } = useSession()
  const homeOptionsBTN=()=>{
    return(
      <>
        {/* PROTECTED ROUTES */}
        {session? <>
          <div className={styles.homeOptBTN}> <Link href="/tourExplorer">Tour Explorer</Link></div> 
        </>:<> 
          <div className={styles.homeOptBTN} onClick={()=>{setHomeSwitcher("adminLogin")}}>Log In!</div> 
        </>}
      </>
    )
  }

  console.log(session)

  const backMenuBTN=()=>{
    return(<>
      <div className={styles.backManuBTN} onClick={()=>setHomeSwitcher("btns")}> {"<"} Back </div>
    </>)
  }
  const homeDisplayer=()=>{
    if(homeBTNSwitcher==="btns"){
      return(
        <>
          {homeOptionsBTN()}
        </>
      )
    } else if (homeBTNSwitcher==="adminLogin"){
      return(
        <>
          {backMenuBTN()}
          <SignInForm setMenuDisp={setHomeSwitcher} />
        </>
      )
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>EcoAndes GMS</title>
        <meta name="description" content="Guest Management System by LTC" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.authBar}>
        <UserSignupModal 
          modalController={signUpModalCont}
          setModalController={setSignUpMod}
          />
      </div>
      <main className={styles.main}>

        <h2>EcoAndes Travel</h2>
        <h1>Guest Management System</h1>

        <div className={styles.homeBTNCont}>
         {homeDisplayer()}
        </div>

      </main>
      <footer className={styles.footer}>
        <i>by:</i>&nbsp;L | T | C
      </footer>
    </div>
  )
}