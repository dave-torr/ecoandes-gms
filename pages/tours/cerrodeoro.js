import React, { useEffect, useState } from "react"
import Image from "next/image"

import theTourData from "../../data/caneteDig.json"

import {TourDisplayer} from "../../components/tours"
import AncientOdysLogo from "./../../public/assets/logos/partners/ancientOdy.webp"



import styles from "./../../styles/components/tourCmpnts.module.css"
import { LTCNaviBar } from "../../components/navis"

export default function CaneteDigTour(props){
    

    let partnerLogo = <Image src={AncientOdysLogo} alt="Ancient Odysseys Logo" />


    return(<>
    <LTCNaviBar inTrip={true}/>
    <br/>
    <br/>
    <br/>
    <TourDisplayer 
        aTour={theTourData} breadcrumb={true} partnerLogo={partnerLogo} />
    </>)
}