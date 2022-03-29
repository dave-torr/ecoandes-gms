import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material';
import {GeneralDataBar} from "./../components/navis"

import LanguageData from "./../data/languagesCont.json"

import styles from '../styles/pages/Home.module.css'

import EcoAndLogo from "../public/assets/logos/condor1.png"
import CotopaxiClimb from "../public/assets/images/ecoAndesSite/cotoClimb.jpg"
import MachuPicc from "../public/assets/images/ecoAndesSite/maPi.jpg"
import SeaLionPic from "../public/assets/images/ecoAndesSite/seaLionGps.jpg"

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

// carousel functions:
  function Imagedisp(props){
    return(<>
      <Paper className={styles.carouIMG}><div className={styles.homeSliderIMG}>
        <Image
          src={props.imgData.src}
          alt={props.imgData.alt}      
        />
      </div>
      <div className={styles.desktopIMGCaption}>{props.imgData.alt}</div>
      </Paper>
    </>)
  }
  let desktoIMGArr=[
    {
      "src": SeaLionPic,
      "alt": "Sea Lions in the Galapagos Islands | Ecuador"
    },
    {
      "src": MachuPicc,
      "alt": "Machu Picchu Inca City | Peru"
    },
    {
      "src": CotopaxiClimb,
      "alt": "Climbing Cotopaxi Volcano | Ecuador"
    },
  ]
  const carouselDisp=()=>{
    return(<>
      <Carousel className={styles.homeCarousel}>
        {desktoIMGArr.map((elem, i)=>
        <Imagedisp key={i} imgData={elem} /> )}
      </Carousel>
    </>)
  }

  const landingSec=()=>{
    return(<>
      <div className={styles.landingSect1}>
        <div className={styles.landingText}>
          <h2>{langContent.brandTagline}</h2>
          <div className={styles.homeLandingLogo}><Image src={EcoAndLogo} alt="EcoAndes Condor Logo" />
          </div>
          <p className={styles.introText}>{langContent.companyDescription}</p>
        </div>
        {carouselDisp()}
        
      </div>
    </>)
  }

  return(<>
    <div className={styles.homeGenCont}> 
      <GeneralDataBar 
        currentLang={currentLang} 
        setCurrentLang={setCurrentLang}
        navBTNS={langContent.navBarBTNS}
        navLinks={langContent.naviLinks}
      />
      {landingSec()}
    </div>
  </>)
}