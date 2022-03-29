import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'


import {GeneralDataBar} from "./../components/navis"

import LanguageData from "./../data/languagesCont.json"

import styles from '../styles/pages/Home.module.css'

export default function Home(){
  const [currentLang, setCurrentLang]=useState("engl")
  const [langContent, setLangCont]=useState(LanguageData.englCont)

  useEffect(()=>{
    if(currentLang==="span"){
      setLangCont(LanguageData.spanCont)
    } else if (currentLang==="engl"){
      setLangCont(LanguageData.englCont)
    }
  },[currentLang])

  return(<>
    <div className={styles.homeGenCont}> 
      <GeneralDataBar 
        currentLang={currentLang} 
        setCurrentLang={setCurrentLang}
        navBTNS={langContent.navBarBTNS}
        navLinks={langContent.naviLinks}
      />
      {langContent.brandTagline}
    </div>
  </>)
}