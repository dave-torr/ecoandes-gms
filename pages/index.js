import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from "next/link"

import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material';
import {GeneralDataBar} from "./../components/navis"

import LanguageData from "./../data/languagesCont.json"

import styles from '../styles/pages/Home.module.css'

import EcoAndLogo from "../public/assets/logos/condor1.png"
import CotopaxiClimb from "../public/assets/images/ecoAndesSite/cotoClimb.jpg"
import MachuPicc from "../public/assets/images/ecoAndesSite/maPi.jpg"
import SeaLionPic from "../public/assets/images/ecoAndesSite/seaLionGps.jpg"
import CuencaPic from "../public/assets/images/ecoAndesSite/cuenca.jpg"
import GpsCruising from "../public/assets/images/ecoAndesSite/gpsCruise.jpg"
import CuscoOne from "../public/assets/images/ecoAndesSite/cuscoOne.jpg"
import PatagoniaOne from "../public/assets/images/ecoAndesSite/chilePatagonia.jpg"
import Tiwanaku from "../public/assets/images/ecoAndesSite/tiwanakuGate.jpg"
import Travellers from "../public/assets/images/ecoAndesSite/happyTravellers.jpg"

import DjoserLogo from "../public/assets/logos/partners/djoser.svg"
import YachtAnahiLogo from "../public/assets/logos/partners/yachtAnahi.png"
import IkalaUIOLogo from "../public/assets/logos/partners/ikalaUIO.png"
import IkalaGPSLogo from "../public/assets/logos/partners/ikalaGPS.png"
import YacumaLogo from "../public/assets/logos/partners/yacuma.png"
import GpsElemsLogo from "../public/assets/logos/partners/gpsElements.png"
import UniGPSLogo from "../public/assets/logos/partners/unigalapagos.png"

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
      "alt": "Galapagos Islands | Ecuador"
    },
    {
      "src": MachuPicc,
      "alt": "Machu Picchu | Peru"
    },
    {
      "src": CotopaxiClimb,
      "alt": "Cotopaxi | Ecuador"
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

// Section 1
  const landingSec=()=>{
    return(<>
      <div className={styles.landingSect}>
        <div className={styles.landingText}>
          <h2 style={{textTransform: "capitalize"}}>{langContent.brandTagline}</h2>
          <div className={styles.homeLandingLogo}><Image src={EcoAndLogo} alt="EcoAndes Condor Logo" />
          </div>
          <p className={styles.introText}>{langContent.companyDescription}</p>
        <div className={styles.landingCTAs}>
          <div className={styles.cta2}> {langContent.ctas.ctaOne} </div>
          <div className={styles.cta1}> {langContent.ctas.ctaTwo} </div>
        </div>
        </div>
        {carouselDisp()}
      </div>
    </>)
  }

// Section 2
  const eachDestinationCard=(imgData, destination)=>{
    return(<>
      <div className={styles.destinationCardCont}>
        <h2>{destination.country}</h2>
        <Image 
          src={imgData.src}
          alt={imgData.alt}
        />
        <div className={styles.destTagLine}>{destination.tagLine}</div>
        <div className={styles.destinationCTA}>{langContent.destinationsSection.CTABtn}</div>
      </div>
    </>)
  }
  const destinationCards=()=>{
    return(
      <>
        <h1>{langContent.destinationsSection.title} </h1>
        <div className={styles.landingSect}>
          {eachDestinationCard( {"src": CuencaPic, "alt": "Cuenca | Ecuador"}, {"country": "Ecuador", "tagLine": langContent.destinationsSection.ecuadorTag} )}
          {eachDestinationCard( {"src": GpsCruising, "alt": "Cruise Galapagos | Ecuador"}, {"country": "Galapagos", "tagLine": langContent.destinationsSection.gpsTag} )}
          {eachDestinationCard( {"src": CuscoOne, "alt": "Inti Raymi Cusco | Peru"}, {"country": "Peru", "tagLine": langContent.destinationsSection.peruTag} )}
        </div>
        <br></br>
        <div className={styles.landingSect}>
          {eachDestinationCard( {"src": PatagoniaOne, "alt": "Patagonia | Chile"}, {"country": "Chile", "tagLine": langContent.destinationsSection.chileTag} )}
          {eachDestinationCard( {"src": Tiwanaku, "alt": "Tiwanaku | Bolivia"}, {"country": "Bolivia", "tagLine": langContent.destinationsSection.boliTag} )}
          {eachDestinationCard( {"src": Travellers, "alt": "Travelling Southamerica"}, {"country": "Best of!", "tagLine": langContent.destinationsSection.featTours} )}
        </div>
      </>
    )
  }

// Section 3
  let partnerArr =[
    {"src": YachtAnahiLogo, "alt": "Yacht Anahi Logo", "href": "https://www.yachtanahi.com/"},
    {"src": DjoserLogo, "alt": "Djoser Company Logo", "href": "https://www.djoser.nl/"},
    {"src": IkalaUIOLogo, "alt": "Ikala Quito Logo", "href": "https://www.ikalaquitohotel.com/"},
    {"src": IkalaGPSLogo, "alt": "Ikala Galapagos Logo", "href": "https://www.ikalagalapagoshotel.com/"},
    {"src": YacumaLogo, "alt": "Yacuma EcoLodge Logo", "href": "https://www.yacuma.travel/en/home/"},
    {"src": GpsElemsLogo, "alt": "Galapagos Elements Logo", "href": "https://www.galapagoselements.com/"},
    {"src": UniGPSLogo, "alt": "Unigalapagos Logo", "href": "https://www.unigalapagos.com/"},
  ]
  const eachPartnerLink=()=>{
    return(<>
    {partnerArr.map((elem, i)=><React.Fragment key={i}>
      <Link href={elem.href} target="_blank">
        <div className={styles.partnerLinkcont}> 
          <Image 
            src={elem.src}
            alt={elem.alt}
          />
        </div>
      </Link>
      </React.Fragment>)}
    </>)
  }

  const additionalDataAndLinks=()=>{
    return(<>
      <div className={styles.compDescr2}>
        <h1>{langContent.homeCompSubTitle} </h1>
        <p className={styles.introText}>{langContent.companyDescription2} </p>
        <h2> {langContent.partnersTitle} </h2>
      </div>
      <div className={styles.partnerLinks}>
        {eachPartnerLink()}
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
      {destinationCards()}
      {additionalDataAndLinks()}
    </div>
  </>)
}