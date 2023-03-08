import React, { useState, useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react"

import {
    
    HighlightAdder,  DayByDayAdder, aTextInput, LogoSwitcher, IncExclAdder,

    anInputDisplayer

} from "../../components/forms"
import { SignInForm } from "../../components/authForms";
import { GMSNavii } from "../../components/navis";


import ExploreIcon from '@mui/icons-material/Explore';
import CancelIcon from '@mui/icons-material/Cancel';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { MultiSelect } from '@mantine/core';

import styles from "../../styles/pages/tourMaker.module.css"


import LTCGenDAta from "../../data/dataAndTemplates.json"



export default function TourMakerPage(props){

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
    })

    const [tourMakerStep, setTourMakerStep]=useState(0)
    const [destinationList, setDestList] = useState([])
    const [theTourtype, setTourtype]= useState()


    const editIcon=(setIndex)=>{
        return(<>
        <div className={styles.editIconCont} onClick={()=>{ setTourMakerStep(setIndex)}}>
            <ModeEditIcon />
        </div> 
        </>)
    } 


    const tourMakerStepOne=()=>{
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

        let toyrTypeOpts = tourType.map((elem, i)=><React.Fragment key={i}>
        <option value={elem} style={{textTransform:"capitalize"}}> {elem} </option>
        </React.Fragment>)

        return(<>

            {tourMakerStep===0&&<>

                <form className={styles.tourCreatorFormCont} onSubmit={(e)=>{
                    e.preventDefault()
                    setTourMakerStep(1)
                    setTourModel({
                        ...aTourModel,
                        "countryList": [destinationList],
                        "tourType": theTourtype
                    })
                    window.scrollTo({ top: 0, behavior: "smooth"})
                }}>



                {/* Revise Logo Switcher to check how it's changing the model */}
                    <LogoSwitcher aTour={aTourModel} tourEditor={setTourModel} />


                    {anInputDisplayer("Tour Name", "tripName", "text", true, "the noyage name", )}





                    {aTextInput("Trip Name *", "tripName", aTourModel, setTourModel, "text", true )}




                    <div className={styles.destPicker}>
                    <label htmlFor="destinationPickerUI">Destination:</label>
                        <MultiSelect
                            placeholder="Our Destinations"
                            data={[...ecoAndesDestinations]}
                            searchable
                            nothingFound="Nothing found..."
                            onChange={setTourtype}
                            id="destinationPickerUI"
                        />
                    </div>

                    <div className={styles.destPicker}>
                    <label htmlFor="tourTypePickerUI">Tour Type:</label>
                        <select
                            className={styles.tourTypeSelect} 
                            placeholder="Our Destinations"
                            onChange={setDestList}
                            id="tourTypePickerUI"
                        >
                        <option value="" disabled selected>Select your Type</option>
                        {toyrTypeOpts}
                        </select>
                    </div>


                    {aTextInput("Tour Reference", "tourRef", aTourModel, setTourModel, "text", false )}
                    {aTextInput("Tour Language", "tourLanguage", aTourModel, setTourModel, "text", false )}
                    {aTextInput("Client Reference", "clientRef", aTourModel, setTourModel, "text", false )}
                    {aTextInput("Tour Code (if agency)", "tourCode", aTourModel, setTourModel, "text", false )}
                    {aTextInput("Company Contact (if agency)", "companyContact", aTourModel, setTourModel, "text", false )}
                    <input type="submit" value="Next" className={styles.tMIntroContinput}/>
                </form>
            </>}

            {tourMakerStep>0&&<> 
                <div className={styles.tourCreatorFormCont}>
                    <div className={styles.offlineStepTitleBar}> general tour data</div>
                    {editIcon(0)}
                </div>
            </>}
        </>)
    }





    const tourMakerStepTwo=()=>{
        return(<>


        {tourMakerStep===1&&<>
            <div className={styles.tourCreatorFormCont} > 
                <div className={styles.upcomingTitleBar}>
                    Day By Day
                </div>
                    <DayByDayAdder 
                        aTour={aTourModel} 
                        tourEditor={setTourModel} 
                        setTourMakerStep={setTourMakerStep}
                    />
            </div>
            </>}



            {tourMakerStep>1&&<> 



                <div className={styles.tourCreatorFormCont}>
                    <div className={styles.offlineStepTitleBar}> general tour data</div>
                    {editIcon()}
                </div>
            </>}
        </>)
    }
    const tourMakerStepThree=()=>{
        return(<>
            {tourMakerStep===2&&<> 
                <IncExclAdder />
            </>}
        </>)
    }

    /////////////////////////////////////
    // Tour Highlights
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

                <div className={styles.tourMakerTitle}>
                    <ExploreIcon fontSize="large" />
                    <h2>EcoAndes Travel</h2>
                    <h1>Tour Creator</h1>
                </div>

                <div className={styles.tourMakerLayout}>
                
                <div className={styles.tMSteps}>
                    {tourMakerStepOne()}

                    {tourMakerStepTwo()}

                    {tourMakerStepThree()}


                </div>
                    TOUR DISPLAYER
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
