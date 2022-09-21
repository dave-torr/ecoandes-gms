import React, { useState, useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react"

import {HighlightAdder,  DayByDayAdder, aTextInput, LogoSwitcher} from "../../components/forms"
import { SignInForm, SignOutBtn } from "../../components/authForms";
import { GmsUserNavi } from "../../components/navis";


import ExploreIcon from '@mui/icons-material/Explore';
import CancelIcon from '@mui/icons-material/Cancel';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { MultiSelect } from '@mantine/core';

import styles from "../../styles/pages/tourMaker.module.css"




export default function TourMakerPage(props){

let ecoAndesDestinations= ['ecuador', 'galapagos', 'peru', 'bolivia', 'chile', 'argentina']
let tourType=["active", "family", "cruise", "expedition", "private", "voyage"]

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


    const editIcon=()=>{
        return(<>
        <div className={styles.editIconCont} onClick={()=>{ setTourMakerStep(tourMakerStep-1)}}>
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

                <div className={styles.introQuote}>Let's get started!</div>

                <div className={styles.aStepContainer} >
                    <div className={styles.aStepTitleBar}> general tour data</div>

                    <form className={styles.aStepForm} onSubmit={(e)=>{
                        e.preventDefault()
                        setTourMakerStep(1)
                        setTourModel({
                            ...aTourModel,
                            "countryList": [destinationList],
                            "tourType": theTourtype
                        })
                        window.scrollTo({ top: 0, behavior: "smooth"})
                    }}>
                        <LogoSwitcher aTour={aTourModel} tourEditor={setTourModel} />
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
                        {aTextInput("Tour Code", "tourCode", aTourModel, setTourModel, "text", false )}
                        {aTextInput("Tour Language", "tourLanguage", aTourModel, setTourModel, "text", false )}
                        {aTextInput("Client Reference", "clientRef", aTourModel, setTourModel, "text", false )}
                        {aTextInput("Company Contact", "companyContact", aTourModel, setTourModel, "text", false )}
                        <input type="submit" value="Next" className={styles.tMIntroContinput}/>
                    </form>
                </div>
            </>}

            {tourMakerStep===1&&<> 
                <div className={styles.introQuote}>Step Two</div>
                <div className={styles.aStepContainer}>
                    <div className={styles.offlineStepTitleBar}> general tour data</div>
                    {editIcon()}
                </div>
            </>}
        </>)
    }
    const tourMakerStepTwo=()=>{



        return(<>
        {tourMakerStep===1&&<>
            <div className={styles.aStepContainer} > 
                <div className={styles.upcomingTitleBar}>
                    Day By Day
                </div>
                    <DayByDayAdder 
                        aTour={aTourModel} 
                        tourEditor={setTourModel} 
                    />
            </div>
            </>}
            {tourMakerStep===2&&<> 
                <div className={styles.introQuote}>Step Three</div>
                <div className={styles.aStepContainer}>
                    <div className={styles.offlineStepTitleBar}> general tour data</div>
                    {editIcon()}
                </div>
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


console.log(aTourModel)

    return(<>
        <div className={styles.generalPageCont}>

            {session?<>
                <GmsUserNavi user={session.user} signOut={<SignOutBtn/>} />

                <div className={styles.tourMakerTitle}>
                    <ExploreIcon fontSize="large" />
                    <h2>EcoAndes Travel</h2>
                    <h1>Tour Creator</h1>
                </div>



                {tourMakerStepOne()}

                {tourMakerStepTwo()}






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
