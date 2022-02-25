import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'

import { useUser } from '../utils/auth/userHook'

import Link from 'next/link'

import styles from '../styles/pages/Home.module.css'

import {AdminLogIn, UserSignupModal} from "../components/forms"

export default function Home(){
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState('');
  const [homeBTNSwitcher, setHomeSwitcher]=useState("btns")
  const [logInModalContr, setLogInMod] = useState(false)

  const homeOptionsBTN=()=>{
    return(
      <>
      <div className={styles.homeOptBTN} onClick={()=>{setHomeSwitcher("adminLogin")}}>Admin Log In</div> 
      <div className={styles.homeOptBTN}> <Link href="/tourExplorer">Tour Explorer</Link></div> 
      </>
    )
  }
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
            <AdminLogIn />
        </>
      )
    }
  }

console.log(user)
console.log(errorMsg)

  return (
    <div className={styles.container}>
      <Head>
        <title>EcoAndes GMS</title>
        <meta name="description" content="Guest Management System by LTC" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div><UserSignupModal 
        modalController={logInModalContr}
        setModalController={setLogInMod}
        userMutation={mutate}
        setErrorMsg={setErrorMsg}
        /></div>
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