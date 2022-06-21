import { useState, useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react"

import ExploreIcon from '@mui/icons-material/Explore';
import {ItineraryImagePicker, HighlightAdder, TourDateAdder, DayByDayAdder} from "../components/forms"
import CancelIcon from '@mui/icons-material/Cancel';
import styles from "../styles/pages/tourMaker.module.css"
import { SignInForm, SignOutBtn } from "../components/authForms";

export default function TourMakerPage(props){

///////////////////////////////////////////////

    // Import tour displayer and use it to build an itinerary from data filled in by user

//////////////////////////////////////////////

    const { data: session } = useSession()

    const [aTourCreator, setTourCreator]=useState({
        "ecoAndesLogo": true,
        "highlights":[],
        "dayByDay":[],
    })
    const tourMakerIntro=()=>{
        return(<>
            <SignOutBtn />
            <div className={styles.teIntroCont}>
                <ExploreIcon fontSize="large" />
                <h2>EcoAndes Travel</h2>
                <h1>Tour Creator</h1>
            </div>
        </>)
    }

    /////////////////////////////////////
    // Tour Highlights
    const removeHighlight=(aList, prodIndex)=>{
        let tempList=[...aList];
        tempList.splice(prodIndex, 1)
        setTourCreator({...aTourCreator,
            "highlights": tempList
        })
    }
    const highlightDispAdder=()=>{
        let theHighlights;
        if(aTourCreator.highlights){
            theHighlights = aTourCreator.highlights.map((elem, i)=>
            <div className={styles.tourHighlightCont} key={i}>
                <div className={styles.aHighlight}> - {elem}</div>
                <CancelIcon onClick={()=>{
                    removeHighlight(aTourCreator.highlights, i)
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
                    aTour={aTourCreator} 
                    tourEditor={setTourCreator} 
                />
            </div>
        </>)
    }

    // console.log(session)

    return(<>
        <div className={styles.generalPageCont}>

            {tourMakerIntro()}
            {session?<>

                <ItineraryImagePicker 
                    aTour={aTourCreator} 
                    tourEditor={setTourCreator} 
                />

                {highlightDispAdder()}

                <TourDateAdder
                    aTour={aTourCreator} 
                    tourEditor={setTourCreator} 
                />

                <DayByDayAdder 
                    aTour={aTourCreator} 
                    tourEditor={setTourCreator} 
                />
            </>:<> 
                <SignInForm />
            </>}
        </div>
    </>)
}
