import React, { useState, useEffect  } from "react";
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'


// components
import { useSession, signIn, signOut } from "next-auth/react"
import {
    DayByDayAdder, 
    anInputDisplayer, multiOptPicker, aDropdownPicker, inputToList, aSwitcher, radioSelectors, multiLineTextInput
} from "../../components/forms"
import { SignInForm } from "../../components/authForms";
import {TourDisplayer } from "../../components/tours"
import { GMSNavii } from "../../components/navis";
import { Select, Switch } from '@mantine/core';
import {anImageDisp} from "../gms/pix"


// icons and imgs
import CircularProgress from '@mui/material/CircularProgress';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';


// Data
import LTCGenDAta from "../../data/dataAndTemplates.json"

// styles
import styles from "../../styles/pages/tourCreator.module.css"
import { Dialog } from "@mui/material";


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
export default function tourCreatorPage(props){

const router = useRouter()

// Import from Gen Tour Data
let ecoAndesDestinations= [...LTCGenDAta.countryList, "galapagos" ]
let tourType=["historic", "nature", "360° itineraries", "climbing", "trekking"]
let tourDiff =[1,2,3,4,5]
let TourModel = {
        "LTCLogo": "ecoAndes",
        "highlights":[],
        "dayByDay":[],
        "countryList":[],
        "imgArr":[],
        "included":[],
        "notIncluded":[],
        "notes":[],
        "shortenedURL":nanoid(7)
    }

// ver 2 add cruises

///////////////////////////////////////////////

// ver 0.1:
// password and auth protected route, 
// tour details: 
    // tour name, duration, destination, tourType, startingLoc, difficulty
    // DayByDay: with day title, includions, description, hotel, flights, guides
    // inclusions, exclusions     
    // Image selection per itinerary


    // tasks:
    // automate day filling with templates
    // quote automaticallly from DB prices


    //////////////////////////////////////////////
    // sesh
    const { data: session } = useSession()

    // tour model
    const [aTourModel, setTourModel]=useState(TourModel)
    const [aTravelDay, setTravelDay] = useState({
        "dayInclusions":[
            "private Transfers",
            "guide Services",
        ],
        "flightData":[],
        "guideData":[],
        "imgArr":[]
    })
    const [textPlaceholder, setTxtPlaceholder]=useState("")
    const [textPlaceholder2, setTxtPlaceholder2]=useState("")
    const [destinationList, setDestList] = useState([...ecoAndesDestinations])
    const [tourCreatorStep, settourCreatorStep]=useState(0)
    const [editDayTrigger, setEditDayTrig]=useState(false)
    const [priceFixedDep, setPriceFDTrig]=useState(true)
    const [priceRangeObj, setPriceObj]=useState({})

    // img state mngmt
    // Bring in pics from Colombia
    const [fetchedImgArrs, setFetchedImgs]=useState()
    const [filteredImgArr, setFilteredImgs]=useState()
    const [loadingState, setLoadingState]=useState(false)
    const [imgDestFilter, setImgFilter]=useState(0)

    const [submitionTrig, setSubmitTrig]=useState(false)
    const [incluPlaceholder, setPlaceholder]=useState("")
    
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

    ///////////////////////////////////////////
    ///////////////////////////////////////////
    // GEN UTILS
    // const autofillFetcher=async()=>{

    // }
    const imgFetcher=async()=>{
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
    }

    // Img picker utils
    let imgCountry= ['all countries', "ecuador", 'peru', "chile", "argentina",]
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

        if(tourCreatorStep===1){ 
        if(!fetchedImgArrs){
            return(<>
            <div onClick={async()=>{
                imgFetcher()
            }}>
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

                    let tempList = [...filteredImgArr]
                    tempList.splice(i, 1)
                    setFilteredImgs(tempList)

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
            <div style={{padding: "6px 12px"}}>
                <Select
                    placeholder='Image Country'
                    data={[...imgCountry]}
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
                        let secondList=filteredImgArr.concat({"src": elem})
                        setFilteredImgs(secondList)
                    }}> x </div>
            </div>
        </React.Fragment>)

        return(<>
            <div className={styles.imgUIUtils}> 
                {eachSelectedImg}
            </div>
        </>)
    }
    const sendToBackEnd=(theTour, userData, sendIndicator)=>{

        const sendToBE=async()=>{
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
                    "email": userData.email,
                    "phono": userData.phono
                    }
            })
            const res = await fetch("/api/gms/itineraries", {
                    method: "POST",
                    body: reqData
                })
            const itinSubmition = await res.json()
            if(res.status===200){
                window.alert("Itinerary Created! Taking you to Tour Explorer")
                router.push("/gms/tourExplorer")
                }
            }
        }

        return(<>
            {sendIndicator===1 &&<> 
                <div className={styles.nextStepBTN} 
                    onClick={async()=>{sendToBE()}}>
                {submitionTrig? <>
                    <CircularProgress />
                </>:<>
                    Submit Itinerary! 
                </>}
                </div>  
            </>}
            {sendIndicator===2 && <> 
                <div className={styles.nextStepBTN}  
                    onClick={async()=>{sendToBE()}}>
                    {submitionTrig? <>
                        <CircularProgress />
                    </>:<>
                        Save and Exit &nbsp; <SaveIcon/>
                    </>}
                </div>
            </>}
        </>)
    }

    ////////////////////////////////////////////
    ////////////////////////////////////////////
    // Tour Creator Steps
    const tourDetailsIntro=()=>{ 
        // step one adds the following generalTourData:
        // - Trip Name
        // - Tour Duration
        // - Destinations
        // - Starting From
        // - Days in Tour
        // - Tour Language
        // - Tour Type

        // Hidden Details:
        //  - Submitted by (user)
        //  - Date of Submition

        return(<>
            {tourCreatorStep===0&&<>
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    settourCreatorStep(1)
                    setTourModel({
                        ...aTourModel,
                    })
                    imgFetcher()
                    window.scrollTo({ top: 0, behavior: "smooth"})
                }}>

                    {aSwitcher(aTourModel.LTCLogo, aTourModel, setTourModel, "LTCLogo", "ecoAndes", "Logo?")}
                    {aTourModel.LTCLogo&&<>
                        {radioSelectors(logoSwitcherArr, "logoRadios", aTourModel, setTourModel, "LTCLogo")}
                    </>}
                    {anInputDisplayer("Tour Name *", "tripName", "text", true, undefined, aTourModel, setTourModel, undefined, undefined, "Tour Name" )}
                    {anInputDisplayer("Duration *", "duration", "number", true, undefined, aTourModel, setTourModel, 1, undefined, "Tour Duration")}
                    {multiOptPicker(destinationList, "Destinations", "countryList", aTourModel.countryList, aTourModel, setTourModel, setDestList )}
                    {anInputDisplayer("Starting City", "startingPlace", "text", false, undefined, aTourModel, setTourModel, undefined, undefined, "Starting From")}
                    {multiLineTextInput("Overview", "tourOverview", false, undefined, aTourModel, setTourModel )}
                    {aDropdownPicker(tourType, "tour type", "tourType", aTourModel, setTourModel)}
                    {aDropdownPicker(tourDiff, "Difficulty", "difficulty", aTourModel, setTourModel)}
                    {anInputDisplayer("Language", "tripLang", "text", false, undefined, aTourModel, setTourModel, undefined, undefined, "Tour Language" )}
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
        // supplementary information
        // driving distance

        // Meals

        let eachDayEditDisp = aTourModel.dayByDay.map((elem, i)=><React.Fragment key={i}> 
            <div className={styles.editDayBTN} onClick={()=>{
                setEditDayTrig({...elem, "dayIndex": i })
            }} > D {i+1}</div>
        </React.Fragment>)

        return(<>
        <Dialog open={editDayTrigger? true : false } onClose={()=>{setEditDayTrig(false)}} >
            <div className={styles.editDayDialog}>
                {anInputDisplayer("Day Title", "dayTitle", "text", true, editDayTrigger.dayTitle, editDayTrigger, setEditDayTrig, undefined, undefined, "Main daily activity" )}
                {multiLineTextInput("Day Detail", "dayDescription", false, editDayTrigger.dayDescription, editDayTrigger, setEditDayTrig )}
                {inputToList("add to day", "dayInclusions", editDayTrigger, setEditDayTrig, editDayTrigger.dayInclusions, incluPlaceholder, setPlaceholder)}
                {anInputDisplayer("Overnight Property", "overnightProperty", "text", false, undefined, editDayTrigger, setEditDayTrig, undefined, undefined, "Hotel / Lodge Name")}
                <div className={styles.nextStepBTN} onClick={()=>{
                    let tempList = aTourModel.dayByDay.splice(editDayTrigger.dayIndex, 1, editDayTrigger)
                    setEditDayTrig(false)
                }} > Submit Day Changes </div>
            </div>
        </Dialog>

        {tourCreatorStep===2&&<>
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
                        aTravelDay={aTravelDay}
                        setTravelDay={setTravelDay}
                        filteredImgArr={filteredImgArr}
                        setFilteredImgs={setFilteredImgs}
                    />
            </>}
        </>)
    }
    const priceAndInclusionsAdder=()=>{
        return(<>
            {tourCreatorStep===3&&<> 
                {inputToList("Included In Tour", "included", aTourModel, setTourModel, aTourModel.included, textPlaceholder, setTxtPlaceholder)}
                {inputToList("Not Included In Tour", "notIncluded", aTourModel, setTourModel, aTourModel.notIncluded, textPlaceholder2, setTxtPlaceholder2)}
                <br/>
                <h3>Prices:</h3>
                <Switch checked={priceFixedDep} onChange={(e)=>{priceFixedDep? setPriceFDTrig(false):setPriceFDTrig(true) }} label="Single Price" />
                {priceFixedDep? <>
                    <div className={styles.spaceBetRow}>
                        {anInputDisplayer("F.D. Price", "price", "number", false, undefined, aTourModel, setTourModel, 0, undefined, "price per person")} &nbsp;&nbsp;
                        {anInputDisplayer("S. Supp", "singleSupp", "number", false, undefined, aTourModel, setTourModel, 0, undefined, "Single Supplement" )}
                    </div>
                    <div className={styles.spaceBetRow}>
                        {anInputDisplayer("Pax Min", "paxMin", "number", false, undefined, aTourModel, setTourModel, 0, undefined, "Pax Nimimum")} &nbsp;&nbsp;
                        {anInputDisplayer("Pax Max", "paxMax", "number", false, undefined, aTourModel, setTourModel, 0, undefined, "Pax Number")}
                    </div>
                </>:<>
                    <h4>ADD TO RANGE: </h4>
                        {anInputDisplayer("Price", "pricePerPax", "number", false, undefined, priceRangeObj, setPriceObj, 0, undefined, "price per person")}
                        {anInputDisplayer("Pax Max", "upperRange", "number", false, undefined, priceRangeObj, setPriceObj, 0, undefined, "Pax Number")}
                        <div className={styles.addRangeBTN} onClick={()=>{
                            if((priceRangeObj.upperRange && priceRangeObj.pricePerPax)){
                                let tempArr = []
                                if(aTourModel.price?.length>0){
                                    tempArr= [...aTourModel.price]
                                    tempArr.push(priceRangeObj)
                                    setTourModel({
                                        ...aTourModel,
                                        "price": tempArr
                                    })
                                    let priceVal = document.getElementById("pricePerPax")
                                    priceVal.value=undefined
                                    let guestLimitVal = document.getElementById("upperRange")
                                    guestLimitVal.value=undefined
                                } else {
                                    tempArr.push(priceRangeObj)
                                    setTourModel({
                                        ...aTourModel,
                                        "price": tempArr
                                    })
                                    let priceVal = document.getElementById("pricePerPax")
                                    priceVal.value=undefined
                                    let guestLimitVal = document.getElementById("upperRange")
                                    guestLimitVal.value=undefined
                                }
                            } else {
                                window.alert("Please fill in Price and guest upper limit")
                            }
                        }}> Add to Price Range </div>
                        <br/>
                        {anInputDisplayer("S. Supp", "singleSupp", "number", false, undefined, aTourModel, setTourModel, 0, undefined, "Single Supplement" )}

                        {aTourModel.price?.length>0 && <>
                            <table className={styles.priceTable} >
                                {aTourModel.price.map((elem,i)=><React.Fragment key={i} >
                                <div className={styles.spaceBetRow}>
                                    <tr>
                                        <td>{elem.upperRange} Pax </td>
                                        <td>${elem.pricePerPax}</td>
                                    </tr>
                                    <div onClick={()=>{
                                        if(aTourModel.price.length>1){
                                            let splicer = aTourModel.price.splice(i, 1)
                                            setTourModel({
                                                ...aTourModel,
                                                "price": aTourModel.price
                                            })
                                        } else {
                                            setTourModel({
                                                ...aTourModel,
                                                "price": undefined
                                            })
                                        }
                                    }} ><CancelIcon/> </div>
                                </div>
                                </React.Fragment> )}
                            </table>
                        </>}
                </> }
            </>}
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
                        {tourCreatorStep>0 && <>
                            {stepBTNs("prev")}
                        </>}

                        {tourDetailsIntro()}

                        {imagePickers()}

                        {dayByDayFormDispl()}

                        {priceAndInclusionsAdder()}

                        {(tourCreatorStep>0 && tourCreatorStep<=2 ) && <>
                            {stepBTNs("next")}
                            {sendToBackEnd(aTourModel, session.user, 2)}
                        </>}

                    </div>
                    <div className={styles.tourDispCont}>
                        {aTourModel.imgArr.length>0 && <>
                            {imgPickerUIUitls(aTourModel.imgArr)}</>}
                        <TourDisplayer  
                            aTour={aTourModel}
                            aTravelDay={aTravelDay}
                            />
                        {tourCreatorStep===3 &&<>
                        {sendToBackEnd(aTourModel, session.user, 1)}</>}
                    </div>
                </div>
            </>:<> 
                <SignInForm />
            </>}
        </div>
    </>)
}
