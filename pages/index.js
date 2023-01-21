import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from "next/link"
import Head from "next/head"

import { Paper } from '@mui/material';
import {GeneralDataBar} from "./../components/navis"

import LanguageData from "./../data/languagesCont.json"

import styles from '../styles/pages/Home.module.css'

import EcoAndLogo from "../public/assets/logos/condor1.png"
import DjoserLogo from "../public/assets/logos/partners/djoser.svg"
import YachtAnahiLogo from "../public/assets/logos/partners/yachtAnahi.png"
import IkalaUIOLogo from "../public/assets/logos/partners/ikalaUIO.png"
import IkalaGPSLogo from "../public/assets/logos/partners/ikalaGPS.png"
import YacumaLogo from "../public/assets/logos/partners/yacuma.png"
import GpsElemsLogo from "../public/assets/logos/partners/gpsElements.png"
import UniGPSLogo from "../public/assets/logos/partners/unigalapagos.png"

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


  // Mobile optimisation
  // color pallete polish


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

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
      // "src": SeaLionPic,
      "alt": "Galapagos Islands | Ecuador"
    },
    {
      // "src": MachuPicc,
      "alt": "Machu Picchu | Peru"
    },
  ]


// Section 1: Intro and Carousel 
// POLISH CTAS!!!!
  const landingSec=()=>{
    return(<>
      <div className={styles.landingSect}>
        <div className={styles.landingText}>
          <h2 style={{textTransform: "capitalize"}}>{langContent.brandTagline}</h2>
          <div className={styles.homeLandingLogo}><Image src={EcoAndLogo} alt="EcoAndes Condor Logo" />
          </div>
          <p className={styles.introText}>{langContent.companyDescription}</p>
        <div className={styles.landingCTAs}>
          <div className={styles.cta2}> <Link href="/tours">{langContent.ctas.ctaOne}</Link> </div>
           <a target='_blank' href="mailto:info@ecoandestravel.com?cc=planificacion@ecoandestravel.com, david@latintravelcollection.com"><div className={styles.cta1}>{langContent.ctas.ctaTwo}</div></a>
        </div>
        </div>
        {/* {carouselDisp(desktoIMGArr)} */}
      </div>
    </>)
  }

// Section 2
// Each Destination Landing!!!
  const eachDestinationCard=(imgData, destination)=>{
    return(<>
      <div className={styles.destinationCardCont}>
        <h2>{destination.country}</h2>
        <Image 
          src={imgData.src}
          alt={imgData.alt}
          height={210}
          width={280}
        />
        <div className={styles.destTagLine}>{destination.tagLine}</div>
        <div className={styles.destinationCTA}>{langContent.destinationsSection.CTABtn}</div>
      </div>
    </>)
  }

  let homeImgObj= {
    "CuencaPic": "https://dsm04pap002files.storage.live.com/y4mJS5lap-BWYUo_sUs9zuHo5xsgozQfv_t2edJQ3d4S-Y8PoO53ORqSZ-orJMBk19uRtWwuhzJbiPLWsx1zN5n7gyLMPeyw7V7dozHUud5feMzeSD-4-Xea8IFkocsvU5TiQw3a_YP6rtafDKWZaexSQkr2Tt7kokMpLG2IzWAV6OgtrOvWjawa1sZSCFBf5dg?width=2000&height=1125&cropmode=none",
    "GpsCruising": "https://dsm01pap002files.storage.live.com/y4mH2mgkedRdSw08o107Q-_baPdeaopivoeurtirMHne0xu096b5Cy4booha2q_FmRK47Yv4KUWdpExNHxwLYy1OOPEWuNAI77cCl9TYRVHVZQNJSCdajn6NBN8X4cDBrJbktuUVP-d0tmuD7onmqVth6J__wusHoxetWhy7U4VOkAAKBznYhA7VdCvUOD5WP6y?width=2000&height=1500&cropmode=none",
    "CuscoOne": "https://dsm01pap002files.storage.live.com/y4mSWo99CV1Vsb-7iUxk2FGUh3UFX8LdPZ1xNF2SPWZE2gFto2ROHZYtshF0eZslhSZ5gyawkYPULYgdYHB3BtlADhGDlvdeb_xAXFNkcfsUdWGiBQaT4-G7LQbMZmJAZ6M42DEhHRfVAV9jV1JDBYKZ1UzCnFHM69Pjq3LHnYIsN7OIFRAgd4AkfaJYCKs8065?width=2000&height=1500&cropmode=none",


  }
  const destinationCards=()=>{
    return(
      <>
        <div className={styles.separatorDiv}/>
        <div className={styles.destinationsSection}>
        <h1>{langContent.destinationsSection.title} </h1>
</div>
        
        <br></br>
        <br></br>
        <div className={styles.destLandingSect}>
          
          {eachDestinationCard( {"src": homeImgObj.CuencaPic, "alt": "Cuenca | Ecuador"}, {"country": "Ecuador", "tagLine": langContent.destinationsSection.ecuadorTag} )}
          
          {eachDestinationCard( {"src": homeImgObj.GpsCruising, "alt": "Cruise Galapagos | Ecuador"}, {"country": "Galapagos", "tagLine": langContent.destinationsSection.gpsTag} )}
          
          {eachDestinationCard( {"src": homeImgObj.CuscoOne, "alt": "Inti Raymi Cusco | Peru"}, {"country": "Peru", "tagLine": langContent.destinationsSection.peruTag} )}
        </div>
        <br></br>
        <div className={styles.landingSect}>
          
          {/* {eachDestinationCard( {"src": PatagoniaOne, "alt": "Patagonia | Chile"}, {"country": "Chile", "tagLine": langContent.destinationsSection.chileTag} )} */}
          
          {/* {eachDestinationCard( {"src": Tiwanaku, "alt": "Tiwanaku | Bolivia"}, {"country": "Bolivia", "tagLine": langContent.destinationsSection.boliTag} )} */}
          
          {/* {eachDestinationCard( {"src": Travellers, "alt": "Travelling Southamerica"}, {"country": "Best of!", "tagLine": langContent.destinationsSection.featTours} )} */}
        </div>
      </>
    )
  }

// Section 3 Partner Links
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
        <p>{langContent.companyDescription2} </p>
        <h2> {langContent.partnersTitle} </h2>
      </div>
      <div className={styles.partnerLinks}>
        {eachPartnerLink()}
      </div>
    </>)
  }

  // SEO
  const pageHead=()=>{
    return(<>
    <Head>
      <title>EcoAndes Travel - Since 1991 Creating Lifetime Experiences</title>
      <meta name="description" content="Latin Travel Collection - Adventure and Travel Tour Operator" />
      <meta charSet="utf-8"/>
      <meta name="keywords" content="Galapagos, Travel Ecuador, Peru, Machu Picchu Tours"/>
      <meta name="author" content="David Torres" />
      <meta name="copyright" content="Latin Travel Collection 2022" />
    </Head>
    </>)
  }

  return(<>
    {pageHead()}
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

