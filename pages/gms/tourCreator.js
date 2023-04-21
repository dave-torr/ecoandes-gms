import React, { useState, useEffect, useRef,  } from "react";
import Image from "next/image"
import { useRouter } from 'next/router'

// components
import { useSession, signIn, signOut } from "next-auth/react"
import {
    DayByDayAdder, 
    anInputDisplayer, multiOptPicker, aDropdownPicker, inputToList, aSwitcher, radioSelectors
} from "../../components/forms"
import { SignInForm } from "../../components/authForms";
import {TourDisplayer } from "../../components/tours"
import { GMSNavii } from "../../components/navis";
import { Select } from '@mantine/core';
import {anImageDisp} from "../gms/pix"


// icons and imgs
import CircularProgress from '@mui/material/CircularProgress';
import DesignServicesIcon from '@mui/icons-material/DesignServices';


// Data
import LTCGenDAta from "../../data/dataAndTemplates.json"

// styles
import styles from "../../styles/pages/tourCreator.module.css"


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
export default function tourCreatorPage(props){

const router = useRouter()

// Import from Gen Tour Data
let ecoAndesDestinations= LTCGenDAta.countryList
let tourType=["historic", "nature", "360° itineraries", "climbing", "trekking"]
let tourDiff =[1,2,3,4,5]


// ver 2 add cruises

///////////////////////////////////////////////

// ver 0.1:
// password and auth protected route, 
// tour details: 
    // tour name, duration, destination, tourType, startingLoc, difficulty
    // DayByDay: with day title, includions, description, hotel
    // inclusions, exclusions     
    // Image selection per itinerary


    // tasks:
    // edit day info, prev data





// FLIGHT TO MIA MAY
// 







    // Display created Itinerary
    //  .findOneAndUpdate:
        // if(reqData.editController==="additionalDetails"){
        // updatedReservations = await db
        // .collection("yachtReservations")
        // .findOneAndUpdate(
        //     { "_id": ObjectID(reqData._id) },
        //     {$set: {
        //         flightInfo: reqData.flightInfo,
        //         bookingRequirements: reqData.bookingRequirements,
        //         clientReference: reqData.clientReference,
        //     }},
        //     {
        //         returnNewDocument: true
        //     }
        // );

    // copy itineraries 
    // 


    //////////////////////////////////////////////
    // sesh
    const { data: session } = useSession()

    // tour model
    const [aTourModel, setTourModel]=useState({
        "LTCLogo": "ecoAndes",
        "highlights":[],
        "dayByDay":[],
        "countryList":[],
        "imgArr":[],
        "included":[],
        "notIncluded":[],
    })
    const [textPlaceholder, setTxtPlaceholder]=useState("")
    const [textPlaceholder2, setTxtPlaceholder2]=useState("")
    const [destinationList, setDestList] = useState([...ecoAndesDestinations])
    const [tourCreatorStep, settourCreatorStep]=useState(0)
    const [editDayTrigger, setEditDayTrig]=useState(false)
    // img state mngmt
    const [fetchedImgArrs, setFetchedImgs]=useState()
    const [filteredImgArr, setFilteredImgs]=useState()
    const [loadingState, setLoadingState]=useState(false)
    const [imgDestFilter, setImgFilter]=useState(0)

    const [submitionTrig, setSubmitTrig]=useState(false)

    // partner logo


    // utils
    const stepBTNs=(nextOrPrev)=>{
        if(nextOrPrev==="next"){
            return(<>
                <div className={styles.nextStepBTN} onClick={()=>{
                    settourCreatorStep(tourCreatorStep+1)
                    }}>
                Continue with itinerary
                </div>
            </>)
        } else if (nextOrPrev==="prev"){
            return(<>
                <div className={styles.nextStepBTN} onClick={()=>{
                    settourCreatorStep(tourCreatorStep-1)
                    }}>
                {"< -"} Back
                </div>
            </>)
        }
    }

    const logoSwitcherArr=[
        {
            "radioKey": "EcoAndes Travel",
            "radioVal": "ecoAndes"
        },
        {
            "radioKey": "Galapagos Elements",
            "radioVal": "galapagosElements"
        },
        {
            "radioKey": "Yacuma EcoLodge",
            "radioVal": "yacuma"
        },
        {
            "radioKey": "Unigalapagos",
            "radioVal": "unigalapagos"
        },
    ]

    ////////////////////////////////////////////
    ////////////////////////////////////////////
    // Tour Creator Steps
    const tourDetailsIntro=()=>{
        // step one adds the following generalTourData:
        // - Trip Name
        // - Tour Duration
        // - Destinations
        // - Starting From
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

                    {/* <LogoSwitcher aTour={aTourModel} tourEditor={setTourModel} /> */}

                    {aSwitcher(aTourModel.LTCLogo, aTourModel, setTourModel, "LTCLogo", "ecoAndes")}
                    {aTourModel.LTCLogo&&<>
                        {radioSelectors(logoSwitcherArr, "logoRadios", aTourModel, setTourModel, "LTCLogo")}
                    </>}

                    {anInputDisplayer("Tour Name", "tripName", "text", true, "Trip name", aTourModel, setTourModel )}
                    {anInputDisplayer("Duration", "duration", "number", true, "Trip duration", aTourModel, setTourModel)}
                    {multiOptPicker(destinationList, "Destinations", "countryList", aTourModel.countryList, aTourModel, setTourModel, setDestList )}

                    {anInputDisplayer("Starting", "startingPlace", "text", false, "Starting From", aTourModel, setTourModel)}
                    {anInputDisplayer("Overview", "tourOverview", "text", false, "Tour Overview", aTourModel, setTourModel)}
                    {aDropdownPicker(tourType, "tour type", "tourType", aTourModel, setTourModel)}
                    {aDropdownPicker(tourDiff, "Difficulty", "difficulty", aTourModel, setTourModel)}
                    {anInputDisplayer("Reference ^", "tripRef", "text", false, "Tour Reference", aTourModel, setTourModel )}
                    {anInputDisplayer("Language ^", "tripLang", "text", false, "Tour Language", aTourModel, setTourModel )}
                    {anInputDisplayer("Tour Code ^", "tourCode", "text", false, "Tour Code", aTourModel, setTourModel )}
                    {anInputDisplayer("Contact ^", "compContact", "text", false, "Company Contact", aTourModel, setTourModel )}
                    <input type="submit" value="Next" className={styles.nextStepBTN}/>
                </form>
            </>}


        </>)
    }
    const dayByDayFormDispl=()=>{

        // OP
        // day description
        // inclusions
        // overnight hotel

        // ver 2
        // supplementary information

        let eachDayEditDisp = aTourModel.dayByDay.map((elem, i)=><React.Fragment key={i}> 
            <div className={styles.editDayBTN} onClick={()=>{
                setEditDayTrig(i+1)
            }} > D {i+1}</div>
        </React.Fragment>)
        

        return(<>
        {tourCreatorStep===1&&<>
            <div className={styles.tourCreatorFormCont}> 
            {stepBTNs("prev")}
                <div className={styles.upcomingTitleBar}>
                    Day By Day
                </div>

                {aTourModel.dayByDay.length>0&& <>
                <div className={styles.editDayCont} >
                    <strong>Edit:</strong> {eachDayEditDisp}
                </div></>}
                    
                    <DayByDayAdder
                        aTour={aTourModel}
                        setTourModel={setTourModel}
                        editDayTrigger={editDayTrigger}
                        setEditDayTrig={setEditDayTrig}
                    />

                {aTourModel.dayByDay.length>0&&<> 
                    {stepBTNs("next")}
                </>}
            </div>
            </>}
        </>)
    }
    const incluExluAdder=()=>{
        return(<>
            {tourCreatorStep===2&&<> 
                <div className={styles.tourCreatorFormCont}>
                {stepBTNs("prev")}
                    {inputToList("Included In Tour", "included", aTourModel, setTourModel, aTourModel.included, textPlaceholder, setTxtPlaceholder)}
                    {inputToList("Not Included In Tour", "notIncluded", aTourModel, setTourModel, aTourModel.notIncluded, textPlaceholder2, setTxtPlaceholder2)}
                {aTourModel.dayByDay.length>0&&<> 
                    {stepBTNs("next")}  </>}
                </div>
            </>}
        </>)
    }

    // Img picker utils
    let imcCountry= ['all countries', "ecuador", 'peru', "chile", "argentina",]
    useEffect(()=>{
        if(imgDestFilter){
            if(imgDestFilter==='all countries'){
                setFilteredImgs(fetchedImgArrs)
            } else {
                let tempArr = fetchedImgArrs.filter(elem=>elem.imgCountry===imgDestFilter)
                setFilteredImgs(tempArr)
            }

        } else if (!imgDestFilter){
            setFilteredImgs(fetchedImgArrs)
        }
    },[imgDestFilter])
    const imagePickers=()=>{
        
        // add to itin with or without complimentary data?
        // IMG Picker
        // Loading Bar
        // see all imgInstace
        // Filter imgaes

        if(tourCreatorStep===3){
        if(!fetchedImgArrs) {return(<>
            <div className={styles.tourCreatorFormCont} onClick={async()=>{
                setLoadingState(true)
                const res = await fetch("/api/genToolkit/pixApi",{
                    method: "GET"
                })
                const fetchedImages = await res.json()
                if(res.status===200){
                    setFetchedImgs(fetchedImages)
                    setFilteredImgs(fetchedImages)
                    setLoadingState(false)
                }
            }} >
                {loadingState? <>
                    <CircularProgress />
                </>:<>
                    <div className={styles.nextStepBTN}>
                        Fetch Itinerary Pix 
                    </div>
                </>}        
            </div>
        </>) } else if (filteredImgArr) {
        let aPickerImg= filteredImgArr.map((elem, i)=>
        <React.Fragment key={i}>
            <div className={styles.eachImgDisp}>
                {anImageDisp(elem.src, 150, "LTCWide", elem.imgAlt)}
                <div className={styles.imgSelectorBTN} onClick={()=>{
                    // addToItinImgArr
                    let tempImgArr = aTourModel.imgArr.concat(elem.src)
                    setTourModel({
                        ...aTourModel,
                        "imgArr": tempImgArr
                    })
                }} >  +  </div>
                <div className={styles.imgRefData}>
                    <div>{elem.imgCountry}</div>
                    <div>{elem.imgRegion}</div>
                    <div>{elem.imgName}</div>
                    <div>{elem.locationDetails}</div>
                </div>
            </div>
        </React.Fragment>)

        return(<>
        <div className={styles.imgSelectionCont} >
            {stepBTNs("prev")}
            <div style={{padding: "6px 12px"}}>
                <Select
                    placeholder='Image Country'
                    data={[...imcCountry]}
                    onChange={setImgFilter}
                    id="imgSelectUI"
                /></div>
            <div style={{textAlign: "end", padding: "6px 12px"}}>
                Images: {filteredImgArr.length} </div>
            <div className={styles.imgPickerCont} >
                {aPickerImg}
            </div>
        </div> 
        </>)
        }}
    }
    const imgPickerUIUitls=(imgArr)=>{
        let eachSelectedImg=imgArr.map((elem, i)=><React.Fragment key={i}>
            <div style={{padding: "6px", width:"120px", position: "relative"}}>
                {anImageDisp(elem, 120, "LTCWide", elem.imgAlt)}
                <div className={styles.imgSelectorBTN} onClick={()=>{
                        let tempList=[...imgArr];
                        tempList.splice(i, 1)
                        setTourModel({
                            ...aTourModel,
                            "imgArr": tempList
                        })
                    }}> x </div>
            </div>
        </React.Fragment>)

        return(<>
            <div className={styles.imgUIUtils}> 
                {eachSelectedImg}
            </div>
        </>)
    }

    const sendToBackEnd=(theTour, userData)=>{
        return(<>
            <div className={styles.nextStepBTN} 
            onClick={async()=>{
                if(!submitionTrig){
                setSubmitTrig(true)
                let toDate = new Date()
                let reqData = JSON.stringify({
                    ...theTour,
                    "dateCreated":toDate,
                    "version": 0,
                    "status": 1,
                    "user": {
                        "name": userData.name,
                        "email": userData.email
                        }
                })
                const res = await fetch("/api/gms/itineraries", {
                        method: "POST",
                        body: reqData
                    })
                const itinSubmition = await res.json()
                console.log(itinSubmition)
                if(res.status===200){
                    console.log(itinSubmition, "Img Submitions") 
                    window.alert("Itinerary Created! Taking you to Tour Explorer")
                    router.push("/gms/tourExplorer")
                    }
                }
            }} > 
            
            {submitionTrig? <>
                <CircularProgress />
            </>:<>
                Submit Itinerary! 
            </>}
            </div>
        </>)
    }

    return(<>
        <div className={styles.generalPageCont}>
            {session?<>
                <GMSNavii user={session.user}/>
                <div className={styles.tourCreatorTitle}>
                    <DesignServicesIcon fontSize="large" />
                    <h2>Latin Travel Collection</h2>
                    <h1>Tour Creator</h1>
                </div>
                <div className={styles.tourCreatorLayout}>
                    <div className={styles.tMSteps}>

                        {tourDetailsIntro()}

                        {dayByDayFormDispl()}

                        {incluExluAdder()}

                        {imagePickers()}

                    </div>
                    <div className={styles.tourDispCont}>
                        {aTourModel.imgArr.length>0 && <>
                            {imgPickerUIUitls(aTourModel.imgArr)}</>}
                        <TourDisplayer  
                            aTour={aTourModel} 
                            />
                        {aTourModel.imgArr.length>0&& <>
                        {sendToBackEnd(aTourModel, session.user)}</>}
                    </div>
                </div>
            </>:<> 
                <SignInForm />
            </>}
        </div>
    </>)
}
