import React, { useState, useEffect, useRef,  } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"


import {
    
    HighlightAdder,  DayByDayAdder, aTextInput, LogoSwitcher, IncExclAdder,

    anInputDisplayer, multiOptPicker

} from "../../components/forms"


import { SignInForm } from "../../components/authForms";
import {TourDisplayer } from "../../components/tours"
import { GMSNavii } from "../../components/navis";


import ExploreIcon from '@mui/icons-material/Explore';
import CancelIcon from '@mui/icons-material/Cancel';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { MultiSelect } from '@mantine/core';

import styles from "../../styles/pages/tourCreator.module.css"


import LTCGenDAta from "../../data/dataAndTemplates.json"

import EcoAndesLogoBLK from "../../public/assets/logos/ecoAndesBLK.png"

export default function tourCreatorPage(props){

// Import from Gen Tour Data
let ecoAndesDestinations= LTCGenDAta.countryList
let tourType=["all types", "historic", "nature", "360° itineraries", "climbing", "trekking"]


// ver 2 add cruises

///////////////////////////////////////////////

// Import tour displayer and use it to build an itinerary from data filled in by user

//////////////////////////////////////////////

    const { data: session } = useSession()

    const [aTourModel, setTourModel]=useState({
        "ecoAndesLogo": true,
        "highlights":[],
        "dayByDay":[],
        "countryList":[],
        "imgArr":[],
    })

    let partnerLogo;
    if(aTourModel.ecoAndesLogo){
        partnerLogo=<div className={styles.partnerLogoCont}><Image height={45} width={180} src={EcoAndesLogoBLK} alt="EcoAndes Travel Logo" /></div>
    } else if(!aTourModel.ecoAndesLogo){
        partnerLogo=false
    }

    const [tourCreatorStep, settourCreatorStep]=useState(0)
    const [destinationList, setDestList] = useState([...ecoAndesDestinations])

    const editIcon=(setIndex)=>{
        return(<>
        <div className={styles.editIconCont} onClick={()=>{ settourCreatorStep(setIndex)}}>
            <ModeEditIcon />
        </div> 
        </>)
    } 

    const tourDetailsIntro=()=>{
        // step one adds the following generalTourData:
        // - Destinations
        // - Trip Name
        // - Client Reference (ex: Hunter x 4)
        // - FIT | Agency | alt clientType
        // - Days in Tour
        // - Tour Language
        // - Tour Type

        // If Agency:
        //  - Tour Code
        //  - Company Contact
        

        // Optionals:
        //  -- Tour Dates
        //  -- Tour Ref?

        // Hidden Details:
        //  - Submitted by (user)
        //  - Date of Submition


        return(<>

            {tourCreatorStep===0&&<>

                <form className={styles.tourCreatorFormCont} onSubmit={(e)=>{
                    e.preventDefault()
                    settourCreatorStep(1)
                    setTourModel({
                        ...aTourModel,
                    })
                    window.scrollTo({ top: 0, behavior: "smooth"})
                }}>

                {/* Revise Logo Switcher to check how it's changing the model */}

                    <LogoSwitcher aTour={aTourModel} tourEditor={setTourModel} />


                    {anInputDisplayer("Tour Name", "tripName", "text", true, "Trip name", aTourModel, setTourModel )}
                    {multiOptPicker(destinationList, "Destinations", "countryList", aTourModel.countryList, aTourModel, setTourModel, setDestList )}
                    {anInputDisplayer("Reference", "tripRef", "text", false, "Tour Reference", aTourModel, setTourModel )}
                    {anInputDisplayer("Language", "tripLang", "text", false, "Tour Language", aTourModel, setTourModel )}
                    {anInputDisplayer("Tour Code", "tourCode", "text", false, "Tour Code", aTourModel, setTourModel )}
                    {anInputDisplayer("Contact", "compContact", "text", false, "Company Contact", aTourModel, setTourModel )}


                    <input type="submit" value="Next" className={styles.tMIntroContinput}/>
                </form>
            </>}

            {tourCreatorStep>0&&<> 
                <div className={styles.tourCreatorFormCont}>
                    <div className={styles.offlineStepTitleBar}> general tour data</div>
                    {editIcon(0)}
                </div>
            </>}
        </>)
    }
    const tourCreatorStepTwo=()=>{
        return(<>


        {tourCreatorStep===1&&<>
            <div className={styles.tourCreatorFormCont} > 
                <div className={styles.upcomingTitleBar}>
                    Day By Day
                </div>
                    <DayByDayAdder 
                        aTour={aTourModel} 
                        tourEditor={setTourModel} 
                        settourCreatorStep={settourCreatorStep}
                    />
            </div>
            </>}



            {tourCreatorStep>1&&<> 



                <div className={styles.tourCreatorFormCont}>
                    <div className={styles.offlineStepTitleBar}> general tour data</div>
                    {editIcon()}
                </div>
            </>}
        </>)
    }
    const tourCreatorStepThree=()=>{
        return(<>
            {tourCreatorStep===2&&<> 
                <IncExclAdder />
            </>}
        </>)
    }

    /////////////////////////////////////
    // UTILS: Tour Highlights 
    const removeHighlight=(aList, prodIndex)=>{
        let tempList=[...aList];
        tempList.splice(prodIndex, 1)
        setTourModel({...aTourModel,
            "highlights": tempList
        })
    }
    const highlightDispAdder=()=>{
        let theHighlights;
        if(aTourModel.highlights){
            theHighlights = aTourModel.highlights.map((elem, i)=>
            <div className={styles.tourHighlightCont} key={i}>
                <div className={styles.aHighlight}> - {elem}</div>
                <CancelIcon onClick={()=>{
                    removeHighlight(aTourModel.highlights, i)
                }} />
            </div>)
        }

        return(<>
            <div className={styles.highlightList}> 
                <h2> Tour Highlights: </h2>
                    {theHighlights} 
            </div>
            <div>
                <HighlightAdder 
                    aTour={aTourModel} 
                    tourEditor={setTourModel} 
                />
            </div>
        </>)
    }



    return(<>
        <div className={styles.generalPageCont}>

            {session?<>
                <GMSNavii user={session.user}/>

                <div className={styles.tourCreatorTitle}>
                    <ExploreIcon fontSize="large" />
                    <h2>EcoAndes Travel</h2>
                    <h1>Tour Creator</h1>
                </div>

                <div className={styles.tourCreatorLayout}>
                
                    <div className={styles.tMSteps}>
                        {tourDetailsIntro()}

                        {tourCreatorStepTwo()}

                        {tourCreatorStepThree()}

                    </div>

                    <div className={styles.tourDispCont}>
                        <TourDisplayer  aTour={aTourModel} partnerLogo={partnerLogo} />
                    </div>

                </div>

                {/* <ItineraryImagePicker 
                    aTour={aTourModel} 
                    tourEditor={setTourModel} 
                /> */}

                {/* {highlightDispAdder()} */}

                {/* <TourDateAdder
                    aTour={aTourModel} 
                    tourEditor={setTourModel} 
                /> */}








            </>:<> 
                <SignInForm />
            </>}
        </div>
    </>)
}
