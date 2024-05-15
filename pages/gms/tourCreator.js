import React, { useState, useEffect  } from "react";
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'


// components
import { useSession } from "next-auth/react"
import {
    DayByDayAdder, 
    anInputDisplayer, multiOptPicker, aDropdownPicker, inputToList, aSwitcher, radioSelectors, multiLineTextInput
} from "../../components/forms"
import Switch from '@mui/material/Switch';
import { SignInForm } from "../../components/authForms";
import {TourDisplayer } from "../../components/tours"
import { GMSNavii } from "../../components/navis";
import {anImageDisp} from "../gms/pix"

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CircularProgress from '@mui/material/CircularProgress';

// icons and imgs

import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import LuggageIcon from '@mui/icons-material/Luggage';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';

// Data
import LTCGenDAta from "../../data/dataAndTemplates.json"

// styles
import styles from "../../styles/pages/tourCreator.module.css"
import { Dialog } from "@mui/material";
import { RichTextDisp, TextEditor } from "../../components/textEditor";

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
export default function tourCreatorPage(props){

const router = useRouter()

// Import from Gen Tour Data
let ecoAndesDestinations= [...LTCGenDAta.countryList, "galapagos", "atacama", "easter island", "patagonia", "amazon", "machu Picchu" ].sort()
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
        "shortenedURL":nanoid(7),
        "richText": true
    }

let dayModel = {
        "dayInclusions":[
            "private Transfers",
            "guide Services",
        ],
        "flightData":[],
        "guideData":[],
        "imgArr":[],
    }
///////////////////////////////////////////////

// ver 0.1:
// password and auth protected route, 
// tour details: 
    // tour name, duration, destination, tourType, startingLoc, difficulty
    // DayByDay: with day title, includions, description, hotel, flights, guides
    // inclusions, exclusions     
    // Image selection per itinerary

    // tasks:
    // quote automaticallly from DB prices

//////////////////////////////////////////////
// sesh
    const { data: session } = useSession()

    const [pageNavigator, setPageNavi]=useState('home')

    // tour model
    const [aTour, setTour]=useState(TourModel)
    const [editDayTrig, setDayTrig]= useState(false)
    const [useAFTrig, setAFTrig]= useState("start")
    const [aTravelDay, setTravelDay] = useState()
    const [itinMakerIndex, setItinMkrIndx]=useState(0)
    const [mealPlaceholder, setMealPlaceholder]=useState("")
    const [addDayImgTrig, setDayImgTrig]=useState(false)

    const [destinationList, setDestList] = useState([...ecoAndesDestinations])
    const [tourCreatorStep, settourCreatorStep]=useState(0)

    const [priceFixedDep, setPriceFDTrig]=useState(true)
    const [priceRangeObj, setPriceObj]=useState({})

    const [fetchedImgArrs, setFetchedImgs]=useState([])
    const [filteredImgArr, setFilteredImgs]=useState([])
    const [imgLocFilter, setImgFilter]=useState(0)
    const [submitionTrig, setSubmitTrig]=useState(false)
    const [incluPlaceholder, setPlaceholder]=useState("")
    const [textPlaceholder, setTxtPlaceholder]=useState('')
    const [textPlaceholder2, setTxtPlaceholder2]=useState('')
    const [textPlaceholder3, setTxtPlaceholder3]=useState('')
    
    // autofill
    const [autoFillData, setAutoFillData]=useState([])
    const [locSelection, setLocSelection]=useState(false)
    const [filteredAFEntries, setFilteredEntries]=useState([])
    const [editEntryTrig, setEntryTrig]=useState(false)
    const [editEntryObj, setEntryObj] =useState()
    const [listPlaceholder, setListPlaceholder]=useState("Inclusions")
    const [loadingState, setLoading]=useState(false)

    // Image and Autofill fetchers
    useEffect(()=>{
        (async ()=>{
            const res = await fetch("/api/gms/dayByDayDB", {
                method: "GET"
            })
            const res2 = await fetch("/api/genToolkit/pixApi",{
                method: "GET"
            })
            const docData = await res.json()
            const fetchedImages = await res2.json()
            if(res.status===200){
                setAutoFillData(docData)
                setFilteredEntries(docData)
            }
            if(res2.status===200){
                setFetchedImgs(fetchedImages)
                setFilteredImgs(fetchedImages)
            }
        })()
    },[])
    // autofill filters
    useEffect(()=>{
        if(locSelection){
            let filteringArr = autoFillData.filter((elem=> elem.location === locSelection))
            let sortedArr = filteringArr.sort((a,b)=>{
                const titleA = a.title.toUpperCase()
                const titleB = b.title.toUpperCase()
                if(titleA < titleB){
                    return -1;
                } 
                if(titleA > titleB){
                    return 1;
                } 
                return 0
            })
            setFilteredEntries(sortedArr)
        }
    },[locSelection])

    // FFD
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
            "radioKey": "LTC",
            "radioVal": "ltc"
        },
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
        {
            "radioKey": "Andes Adventures",
            "radioVal": "andesAdventures"
        },
    ]

    // Img picker utils
    useEffect(()=>{
        if(imgLocFilter){
            if(imgLocFilter==='all'){
                setFilteredImgs(fetchedImgArrs)
            } else {
                let tempArr = fetchedImgArrs.filter(elem=>elem.imgCountry===imgLocFilter)
                setFilteredImgs(tempArr)
            }
        } else if (!imgLocFilter){
            setFilteredImgs(fetchedImgArrs)
        }
    },[imgLocFilter])

    const imagePickers=(coverOrDay)=>{
        
        // IMG Picker
        // Loading Bar
        // see all imgInstace
        // Filter imgaes
        let imgLocArr=[]
        if (filteredImgArr) {
        let aPickerImg= filteredImgArr.map((elem, i)=>
        <React.Fragment key={i}>
            <div className={styles.eachImgDisp}>
                {anImageDisp(elem.src, 150, "LTCWide", elem.imgName)}
                <div className={styles.imgSelectorBTN} onClick={()=>{
                    if(coverOrDay==="cover"){
                        let tempImgArr = aTour.imgArr.concat(elem.src)
                        setTour({
                            ...aTour,
                            "imgArr": tempImgArr
                        })
                        let tempList = [...filteredImgArr]
                        tempList.splice(i, 1)
                        setFilteredImgs(tempList)
                    } else if (coverOrDay==="day"){
                        let tempImgArr = aTravelDay.imgArr.concat(elem.src)
                        setTravelDay({
                            ...aTravelDay,
                            "imgArr": tempImgArr
                        })

                        let tempList = [...filteredImgArr]
                        tempList.splice(i, 1)
                        setFilteredImgs(tempList)
                    }
                }} >  +  </div>
                <div className={styles.imgRefData}>
                    <div>{elem.imgCountry}</div>
                    <div>{elem.imgRegion}</div>
                    <div>{elem.imgName}</div>
                    <div>{elem.locationDetails}</div>
                </div>
            </div>
        </React.Fragment>)

        fetchedImgArrs?.forEach(element=>{
            const findImgLoc = imgLocArr.find(elemental=>elemental ===element.imgCountry)
            if(!findImgLoc){
                imgLocArr.push(element.imgCountry)
            }
        })

        return(<>
            <div className={styles.spaceBetRow} style={{padding:"0 12px"}}>
                <h2>Please choose {coverOrDay==="day"&&<>day</>}{coverOrDay==="cover"&&<>cover</>} images images:</h2>
                Images: {filteredImgArr.length} 
            </div>
            <div> 
                <select className={styles.imgSelectionUI} onChange={(e)=>{
                        setImgFilter(e.target.value)
                    }}>
                    <option value="all" > All Countries</option>
                    {imgLocArr.map((elem,i)=><React.Fragment key={i}>
                        <option value={elem} style={{textTransform:"capitalize"}}>{elem}</option>
                    </React.Fragment>)}
                </select>
            </div>
            <div className={styles.imgPickerCont} >
                {aPickerImg}
            </div>
        </>)
        }
    }
    const imgPickerUIUitls=(imgArr, dayOrCover)=>{
        let eachSelectedImg=imgArr.map((elem, i)=><React.Fragment key={i}>
            <div style={{padding: "6px", width:"120px", position: "relative", marginRight:"9px"}}>
                {anImageDisp(elem, 120, "LTCWide", elem.imgAlt)}
                <div className={styles.imgSelectorBTN} onClick={()=>{
                        let tempList=[...imgArr];
                        tempList.splice(i, 1)
                        if(dayOrCover==="cover"){
                            setTour({
                                ...aTour,
                                "imgArr": tempList
                            })
                        } else if(dayOrCover==="day"){
                            setTravelDay({
                                ...aTravelDay,
                                "imgArr": tempList
                            })
                        }
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
                <div className={styles.saveExitBTN} onClick={async()=>{sendToBE()}}>
                    {submitionTrig? <>
                        <CircularProgress />
                    </>:<>
                        Save and Exit &nbsp; <SaveIcon/>
                    </>}
                </div>
            </>}
        </>)
    }
    // ////////////////////////////////////////////
    // ////////////////////////////////////////////
    // // Tour Creator Steps
    // const tourDetailsIntro=()=>{ 
    //     // step one adds the following generalTourData:
    //     // - Trip Name
    //     // - Tour Duration
    //     // - Destinations
    //     // - Starting From
    //     // - Days in Tour
    //     // - Tour Language
    //     // - Tour Type

    //     // Hidden Details:
    //     //  - Submitted by (user)
    //     //  - Date of Submition

    //     return(<>
    //         {tourCreatorStep===0&&<>
    //             <form onSubmit={(e)=>{
    //                 e.preventDefault()
    //                 settourCreatorStep(1)
    //                 setTourModel({
    //                     ...aTourModel,
    //                 })
    //                 window.scrollTo({ top: 0, behavior: "smooth"})
    //             }}>

    //                 {aSwitcher(aTourModel.LTCLogo, aTourModel, setTourModel, "LTCLogo", "ecoAndes", "Logo?")}
    //                 {aTourModel.LTCLogo&&<>
    //                     {radioSelectors(logoSwitcherArr, "logoRadios", aTourModel, setTourModel, "LTCLogo")}
    //                 </>}
    //                 {anInputDisplayer("Tour Name", "tripName", "text", true, undefined, aTourModel, setTourModel, undefined, undefined, "Tour Name" )}
    //                 {anInputDisplayer("Duration", "duration", "number", true, undefined, aTourModel, setTourModel, 1, undefined, "Tour Duration")}
    //                 {multiOptPicker(destinationList, "Destinations", "countryList", aTourModel.countryList, aTourModel, setTourModel, setDestList )}
    //                 {anInputDisplayer("Starting City", "startingPlace", "text", false, undefined, aTourModel, setTourModel, undefined, undefined, "Starting From")}
    //                 <TextEditor
    //                     tempObj={aTourModel}
    //                     setTempObj={setTourModel}
    //                     inputIndex={"tourOverview"}
    //                     inputLabel={"tour Overview"}
    //                 />
    //                 {aDropdownPicker(tourType, "tour type", "tourType", aTourModel, setTourModel)}
    //                 {aDropdownPicker(tourDiff, "Difficulty", "difficulty", aTourModel, setTourModel)}
    //                 {aDropdownPicker(LTCGenDAta.tourLanguages, "Language", "tripLang", aTourModel, setTourModel)}
    //                 <input type="submit" value="Next" className={styles.nextStepBTN}/>
    //             </form>
    //         </>}
    //     </>)
    // }
    // const dayByDayFormDispl=()=>{

    //     // Flagged for update with new tour creator
    //     // day description
    //     // inclusions
    //     // overnight hotel
    //     // supplementary information
    //     // driving distance

    //     // Meals

    //     let eachDayEditDisp = aTourModel.dayByDay?.map((elem, i)=><React.Fragment key={i}> 
    //         <div className={styles.editDayBTN} onClick={()=>{
    //             setEditDayTrig({...elem, "dayIndex": i })
    //         }} > D {i+1}</div>
    //     </React.Fragment>)

    //     return(<>

    //     <Dialog open={editDayTrigger? true : false } onClose={()=>{setEditDayTrig(false)}} >
    //         <div className={styles.editDayDialog}>
    //             {anInputDisplayer("Day Title", "dayTitle", "text", true, editDayTrigger.dayTitle, editDayTrigger, setEditDayTrig, undefined, undefined, "Main daily activity" )}

    //             <TextEditor 
    //                 tempObj={editDayTrigger}
    //                 setTempObj={setEditDayTrig}
    //                 inputIndex={"dayDescription"}
    //                 inputLabel={"Day Description"}
    //                 prevData={editDayTrigger.dayDescription}
    //             />

    //             {inputToList("add to day", "dayInclusions", editDayTrigger, setEditDayTrig, editDayTrigger.dayInclusions, incluPlaceholder, setPlaceholder)}
    //             {anInputDisplayer("Overnight Property", "overnightProperty", "text", false, undefined, editDayTrigger, setEditDayTrig, undefined, undefined, "Hotel / Lodge Name")}
    //             <div className={styles.nextStepBTN} onClick={()=>{
    //                 let tempList = aTourModel.dayByDay.splice(editDayTrigger.dayIndex, 1, editDayTrigger)
    //                 setEditDayTrig(false)
    //             }} > Submit Day Changes </div>
    //         </div>

    //     </Dialog>

    //     {tourCreatorStep===2&&<>
    //         <div className={styles.upcomingTitleBar}>
    //             Day By Day
    //         </div>

    //         {aTourModel.dayByDay?.length>0&& <>
    //         <div className={styles.editDayCont} >
    //             <strong>Edit:</strong> {eachDayEditDisp}
    //         </div></>}
    //             <DayByDayAdder
    //                 aTour={aTourModel}
    //                 setTourModel={setTourModel}
    //                 editDayTrigger={editDayTrigger}
    //                 setEditDayTrig={setEditDayTrig}
    //                 aTravelDay={aTravelDay}
    //                 setTravelDay={setTravelDay}
    //                 filteredImgArr={filteredImgArr}
    //                 setFilteredImgs={setFilteredImgs}
    //                 autoFillData={autoFillData}
    //             />
    //         </>}
    //     </>)
    // }


    const tourCreatorHome=()=>{
        return(<>
            <div className={styles.spaceBetRow} style={{width:"500px", marginTop:"39px"}}>
                {localNav(setPageNavi, "creator", "CREATE ITINERARY", <LuggageIcon/>, 2 )}
                {localNav(setPageNavi, "autofill", "AUTOFILL TOOLKIT", <RateReviewIcon/>, 2 )}
            </div>
        </>)
    }

    // Autofill tools
    const autofillTools=(theEntries, allEntries, toolingOrUse)=>{
        const anAutofillEntry=(anEntry, indx)=>{
            return(<>
            <div className={styles.autofillEntryCont}>
                <div className={styles.spaceBetRow}>
                    <strong> {anEntry.title}</strong>
                    <i> {anEntry.location}</i>
                </div>
                <div className={styles.spaceBetRow}>
                <span/>
                {toolingOrUse==="tooling"?<>
                    <span onClick={()=>{
                        let dayInc;
                        if(anEntry.dayInclusions){
                            dayInc=anEntry.dayInclusions
                        } else{
                            dayInc = []
                        }
                        setEntryTrig({
                            ...anEntry,
                            "indx": indx
                        })
                        setEntryObj({
                            "_id": anEntry._id,
                            "dayInclusions":dayInc
                        })
                    }}> <EditIcon/></span>
                </>:toolingOrUse==="use"&&<>
                    <span onClick={()=>{

                        let tempArr
                        if(anEntry.dayInclusions?.length>0){
                            tempArr = [...aTravelDay.dayInclusions, ...anEntry.dayInclusions]
                        } else {
                            tempArr=[...aTravelDay.dayInclusions]
                        }

                        setTravelDay({
                            ...aTravelDay,
                            "dayDescription": anEntry.dayDescription,
                            "dayInclusions":tempArr,
                            "dayTitle":anEntry.dayTitle,
                        })
                        setAFTrig("off")
                    }}>
                        <AddCircleIcon/>
                    </span>
                </>}
                </div>
                {anEntry.dayDescription?<>
                    <div style={{padding:"15px"}}>
                        <RichTextDisp
                            richTextCont={true}
                            theValue={anEntry.dayDescription}
                        />
                    </div>
                {anEntry.dayInclusions.length>0&&<>
                <strong >INCLUSIONS:</strong>
                    {anEntry.dayInclusions.map((elem,i)=><React.Fragment key={i}>
                        - {elem}
                    </React.Fragment> )}
                </>}
                </>:<> 
                    <div style={{padding:"6px", marginBottom:"21px"}}>{anEntry.description} </div>
                </>}
            </div>
            </>) 
        }
        const editEntryDialog=()=>{
            return(
            <Dialog open={editEntryTrig? true : false} onClose={()=>{
                setEntryTrig(false)
                setEntryObj()
                }}>
                <div className={styles.eachEntryEdit}>
                    <div className={styles.spaceBetRow}>
                        <span/>
                        <span onClick={async()=>{
                            const res = await fetch("/api/gms/dayByDayDB",{
                                method:"PUT",
                                body: JSON.stringify(editEntryObj)
                            })
                            const updatedEntry = await res.json()
                            if(res.status===200){
                                let tempArr= [...theEntries]
                                let theSplicer = tempArr.splice(editEntryTrig.indx, 1, updatedEntry.value)
                                window.alert("Autofill Data Updated")
                                setAutoFillData(tempArr)
                                setEntryTrig(false)
                                setEntryObj()
                            }
                        }}>
                            <SaveIcon/>
                        </span>
                    </div>
                    {anInputDisplayer("Title", "title", "text", false, editEntryTrig.title, editEntryObj, setEntryObj, undefined, undefined, editEntryTrig.title)}
                    {anInputDisplayer("location", "location", "text", false, editEntryTrig.location, editEntryObj, setEntryObj, undefined, undefined, editEntryTrig.location)}

                    {/* non op for prev existing text */}

                    <TextEditor
                        tempObj={editEntryObj}
                        setTempObj={setEntryObj}
                        inputIndex="dayDescription"
                        inputLabel="Day Description"
                        prevState={editEntryTrig.dayDescription}
                    />
                    {inputToList("inclusions", "dayInclusions", editEntryObj, setEntryObj, editEntryObj?.dayInclusions, listPlaceholder, setListPlaceholder)}
                    
                    {/* non MVP Rates */}
                    {/* driving distance */}
                    {/* meal detail */}
                    {/* images */}
                </div>
            </Dialog>
            )
        }
        
        if(allEntries.length>0){
            let locArr = []
            allEntries?.forEach(element => {
                const findContact = locArr.find(elemental=> elemental === element.location)
                if(!findContact){
                    locArr.push(element.location)
                }
            })
            const aFSelector=()=>{
                return(<>
                <label htmlFor="LocationDropdown" className={styles.inputLabel}>
                    Select General Location
                </label>
                <select id="LocationDropdown" onChange={(e)=>{
                    if(e.target.value==="all"){
                        setLocSelection()
                    } else {
                        setLocSelection(`${e.target.value}`)
                    }
                }} >
                    <option selected disabled >Select a location </option>
                    <option value="all">All Locations </option>
                    {locArr.map((elem,i)=><React.Fragment key={i}>
                    <option value={elem} > {elem} </option>
                    </React.Fragment> )}
                </select>
                <br/>
                </>)
            }
        return(<>
        {toolingOrUse==="tooling"? <>
            {aFSelector()}
            {theEntries.map((elem,i)=><React.Fragment key={i}>
                {anAutofillEntry(elem, i)}
            </React.Fragment> )}
            {editEntryDialog()}
        </>:toolingOrUse==="use"&&<>
            <Dialog open={useAFTrig==="autofill"? true : false} onClose={()=>{setAFTrig("off")}}>
                <div className={styles.dayAFDialog}>
                {aFSelector()}
                {theEntries.map((elem,i)=><React.Fragment key={i}>
                    {anAutofillEntry(elem, i)}
                </React.Fragment> )}
                </div>
            </Dialog>
        </>}
        </>)}
    }

    // ITIN BUILDER
    const itineraryBuilder=(theNewItin, setNewItin)=>{

        const itinMakerCounterFunct=(theCounter, setTeCounter, additonalFunct)=>{

            return(<>
            <div style={{display:"flex"}}>
                {theCounter===0?<>
                    <div className={styles.creatorIndexBTNOFFLINE}>
                        <KeyboardDoubleArrowLeftIcon/>
                    </div>
                </>:theCounter>0&&<>
                    <div className={styles.creatorIndexBTNONLINE} onClick={()=>{
                        setTeCounter(theCounter - 1)
                    }}>
                        <KeyboardDoubleArrowLeftIcon/>
                    </div>
                </>}
                {theCounter<4?<>
                    <div className={styles.creatorIndexBTNONLINE}
                    onClick={()=>{
                        theCounter===1 ? additonalFunct() : setTeCounter(theCounter + 1)
                    }}>
                        <KeyboardDoubleArrowRightIcon/>
                    </div>
                </>:theCounter===4&&<>
                    <div className={styles.creatorIndexBTNOFFLINE}>
                        <KeyboardDoubleArrowRightIcon/>
                    </div>
                </>}
            </div>
            </>)
        }
        const dayArrAdder=()=>{
            if(aTour.dayByDay.length===0){
                let tempDayArr = []
                for(let i = 0; i < aTour.duration; i++){
                    tempDayArr.push(dayModel)
                }
                let theSplicer = aTour.dayByDay.splice(0,0, ...tempDayArr)
                setTour({
                    ...aTour,
                    "dyByDay": aTour.dayByDay
                })        
            }
            setItinMkrIndx(itinMakerIndex + 1)
        }
        const dayEditor=()=>{
            const mealsIncludedTool=()=>{
        
                let mealOpts=[
                    "breakfast",
                    "breakfastBox",
                    "brunch",
                    "lunch",
                    "lunchBox",
                    "snack",
                    "dinner",
                    "other"
                ]
        
                return(<>
                <br/>
                    <label className={styles.inputLabel} htmlFor="mealInput" > Add Meals </label>
                    <select className={styles.inputUserUI} id="mealInput" onChange={(e)=>{
                        setMealPlaceholder({
                            ...mealPlaceholder,
                            "meal": e.target.value
                        })
                    }}>
                        <option selected disabled >Choose a meal </option>
                        {mealOpts.map((elem, i)=><React.Fragment key={i}>
                            <option value={elem}>{elem} </option>
                        </React.Fragment> )}
                    </select>
                    {mealPlaceholder?.meal && <>
                    <br/>
                        <label className={styles.inputLabel} htmlFor="mealInput" > add {mealPlaceholder?.meal} at: </label>
                        <input className={styles.inputUserUI} type="text" placeholder="Location of Meal" onChange={(e)=>{
                            setMealPlaceholder({
                                ...mealPlaceholder,
                                "location": e.target.value
                            })
                        }}/>
                        <div className={styles.addFromRecordBTN} onClick={()=>{
                            let tempArr
                            if(aTravelDay.meals?.length>0){
                                tempArr = aTravelDay.meals.concat(mealPlaceholder)
                            } else {
                                tempArr=[mealPlaceholder]
                            }
                            setTravelDay({
                                ...aTravelDay,
                                "meals": tempArr
                            })
                            setMealPlaceholder()
                            let tempDoc = document.getElementById("mealInput")
                            tempDoc.value=""
                        }}> Add Meal +</div>
                        <br/>
                    </>}
                    <br/>
                    {aTravelDay.meals?.length>0 &&
                    <>
                        {aTravelDay.meals.map((elem,i)=><React.Fragment key={i}>
                        <div className={styles.spaceBetRow} style={{textTransform:"capitalize", padding:"6px 0" }}> 
                            <span >
                            {elem.meal} {elem.location&&<> @ -{elem.location} </>}
                            </span>
                            <span onClick={()=>{
                                if(aTravelDay.meals.length===1){
                                    setTravelDay({
                                        ...aTravelDay,
                                        "meals": []
                                    })
                                } else {
                                    let tempArr = aTravelDay.meals.splice(i, 1)
                                    setTravelDay({
                                        ...aTravelDay,
                                        "meals": tempArr
                                    })
                                }
                            }}><CancelIcon/> </span>
                        </div>
                        </React.Fragment> )}
                    </>}
                </>)
            }

            const dayImgAdder=()=>{
                if(aTravelDay){return(<>
                    <Dialog open={addDayImgTrig} onClose={()=>setDayImgTrig(false)}>
                        <div className={styles.closeDialogBTN} onClick={()=>setDayImgTrig(false)}>CLOSE X</div>
                        <div style={{padding:"21px"}} >
                            {imgPickerUIUitls(aTravelDay.imgArr, "day")}
                            {imagePickers("day")}
                        </div>
                    </Dialog>
                </>)}
            }

            return(<>
            {dayImgAdder()}
            {editDayTrig?<>
            <div style={{borderRadius:"5px", border:"solid 1px black", padding: "6px"}}>
                <div className={styles.spaceBetRow}>
                    {<h3>Edit Day {aTravelDay.dayIndex+1}</h3>}
                    <div style={{cursor:"pointer", display: "flex", padding:"0 21px" }} onClick={()=>{
                        let splicer = aTour.dayByDay.splice(aTravelDay.dayIndex, 1, aTravelDay);
                        setTour({...aTour});
                        setDayTrig(false)
                        setAFTrig("start")
                    }}> Save Day &nbsp;<SaveIcon/> </div>
                </div>
                <div className={styles.lineBreak} />
                {(useAFTrig==="off" && aTravelDay?.imgArr?.length>0 )&&<>
                    {imgPickerUIUitls(aTravelDay.imgArr, "day")}
                </>}
                <div className={styles.spaceBetRow} style={{alignItems:"flex-start"}}>

                    {useAFTrig==="start" && <>
                        <div style={{ display:"flex", flexDirection:"row", width:"100%", justifyContent:"space-around", padding:"12px 0" }}> 
                            {localNav(setAFTrig, "autofill", "AUTOFILL", <PlaylistAddIcon/>, 2)}
                            {localNav(setAFTrig, "off", "New Day", <CalendarViewDayIcon/>, 2)}
                        </div>
                    </>}
                    {useAFTrig==="autoFill"?<>
                        {autofillTools(filteredAFEntries, autoFillData, "use")}

                    </> : useAFTrig==="off" && <>
                        <div style={{width:"48%", height:"auto"}}>
                            {anInputDisplayer("day Title", "dayTitle", "text", false, aTravelDay.dayTitle, aTravelDay, setTravelDay, undefined, undefined, "Day Main Activity")}
                            <TextEditor
                                tempObj={aTravelDay}
                                setTempObj={setTravelDay}
                                inputIndex="dayDescription"
                                inputLabel="Day Description"
                                prevState={aTravelDay.dayDescription}
                            />
                            
                        </div>
                        <div style={{width:"48%"}}>
                            <div className={styles.spaceBetRow}>
                                <div className={styles.addFromRecordBTN}  onClick={()=>{
                                    setDayImgTrig(true)
                                }}> ADD IMAGES &nbsp; <AddPhotoAlternateIcon/> </div>
                            </div>
                            {anInputDisplayer("Overnight Property", "overnightProperty", "text", false, aTravelDay.overnightProperty, aTravelDay, setTravelDay, undefined, undefined, "Overnight Property")}
                            {mealsIncludedTool()}
                            {inputToList("add to day", "dayInclusions", aTravelDay, setTravelDay, aTravelDay.dayInclusions, incluPlaceholder, setPlaceholder)}
                            {anInputDisplayer("Supplementary Information", "suppInfo", "text", false, aTravelDay.suppInfo, aTravelDay, setTravelDay, undefined, undefined, "Ex: Quito is at 2,800 meters above sea level")}
                            {anInputDisplayer("Driving distance", "drivingDistance", "number", false, aTravelDay.drivingDistance, aTravelDay, setTravelDay, 0, undefined, "Ex: 150 km")}
                        </div>
                    </>}
                </div>
            </div>
            </>:<>
            EDIT DAYS:
            <div style={{ width:"100%", display:"flex", flexWrap:"wrap" }}>
                {aTour.dayByDay.map((elem,i)=><React.Fragment key={i}>
                    <div className={styles.eachDayTab} onClick={()=>{
                        setTravelDay({
                            ...elem,
                            "dayIndex": i
                        })
                        if(elem.dayTitle){
                            setAFTrig("off")
                        }
                        setDayTrig(true)
                    }}> Day {i+1}{elem.dayTitle&& <>: {elem.dayTitle.substr(0, 10) + "\u2026" }</>}</div>
                </React.Fragment> )}
            </div>
                
            {/* save and Quit options, back btns opts */}
                <div className={styles.spaceBetRow}>

                    {sendToBackEnd(aTour, session.user, 2)}

                    {itinMakerCounterFunct(itinMakerIndex,setItinMkrIndx )}
                </div>
            </>}
            </>)
        }




        
        const priceAndInclusionsAdder=()=>{
            return(<>
                <div className={styles.spaceBetRow}>
                    <div style={{width:"48%"}}>
                        {inputToList("Included In Tour", "included", aTour, setTour, aTour.included, textPlaceholder, setTxtPlaceholder)}
                        {inputToList("Not Included In Tour", "notIncluded", aTour, setTour, aTour.notIncluded, textPlaceholder2, setTxtPlaceholder2)}
                    </div>
                    <div style={{width:"48%"}}>
                        {inputToList("Operational Notes", "notes", aTour, setTour, aTour.notes, textPlaceholder3, setTxtPlaceholder3)}
                    </div>
                </div>
                <br/>
                <h3>Prices:</h3>
                <div style={{display:"flex"}}>
                    <Switch checked={priceFixedDep} onChange={(e)=>{priceFixedDep? setPriceFDTrig(false):setPriceFDTrig(true) }} />
                    <h4>Single Price?</h4>
                </div>
                {priceFixedDep? <>
                    <div className={styles.spaceBetRow}>
                        {anInputDisplayer("F.D. Price", "price", "number", false, undefined, aTour, setTour, 0, undefined, "price per person")} &nbsp;&nbsp;
                        {anInputDisplayer("S. Supp", "singleSupp", "number", false, undefined, aTour, setTour, 0, undefined, "Single Supplement" )}
                    </div>
                    <div className={styles.spaceBetRow}>
                        {anInputDisplayer("Pax Min", "paxMin", "number", false, undefined, aTour, setTour, 0, undefined, "Pax Nimimum")} &nbsp;&nbsp;
                        {anInputDisplayer("Pax Max", "paxMax", "number", false, undefined, aTour, setTour, 0, undefined, "Pax Number")}
                    </div>
                </>:<>
                    <h4>ADD TO RANGE: </h4>
                    <div className={styles.spaceBetRow}>
                        <div style={{width:"48%"}}>
                            {anInputDisplayer("Price", "pricePerPax", "number", false, undefined, priceRangeObj, setPriceObj, 0, undefined, "price per person")}
                            {anInputDisplayer("Pax Max", "upperRange", "number", false, undefined, priceRangeObj, setPriceObj, 0, undefined, "Pax Number")}
                            <div className={styles.addRangeBTN} onClick={()=>{
                                if((priceRangeObj.upperRange && priceRangeObj.pricePerPax)){
                                    let tempArr = []
                                    if(aTour.price?.length>0){
                                        tempArr= [...aTour.price]
                                        tempArr.push(priceRangeObj)
                                        setTour({
                                            ...aTour,
                                            "price": tempArr
                                        })
                                        let priceVal = document.getElementById("pricePerPax")
                                        priceVal.value=undefined
                                        let guestLimitVal = document.getElementById("upperRange")
                                        guestLimitVal.value=undefined
                                    } else {
                                        tempArr.push(priceRangeObj)
                                        setTour({
                                            ...aTour,
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
                        </div>
                        <div style={{width:"48%"}}>
                            {aTour.price?.length>0 && <>
                                <table className={styles.priceTable} >
                                    {aTour.price.map((elem,i)=><React.Fragment key={i} >
                                        <tr style={{display:"flex"}} >
                                        <td style={{width:"120px"}}>{elem.upperRange} Pax </td>
                                        <td>${elem.pricePerPax}</td>
                                        <div onClick={()=>{
                                            if(aTour.price.length>1){
                                                let splicer = aTour.price.splice(i, 1)
                                                setTour({
                                                    ...aTour,
                                                    "price": aTour.price
                                                })
                                            } else {
                                                setTour({
                                                    ...aTour,
                                                    "price": undefined
                                                })
                                            }
                                        }} ><CancelIcon/> </div>
                                        </tr>
                                    </React.Fragment> )}
                                </table>
                            </>}
                            {anInputDisplayer("S. Supp", "singleSupp", "number", false, undefined, aTour, setTour, 0, undefined, "Single Supplement" )}
                        </div>
                    </div>                
                </>}
                <br/>
                <div className={styles.spaceBetRow}>
                    {sendToBackEnd(aTour, session.user, 2)}
                    {itinMakerCounterFunct(itinMakerIndex, setItinMkrIndx, dayArrAdder)}
                </div>
            </>)
        }
        const eachStepTemplate=()=>{
            return(<>
            <div className={styles.itinToolkitContainer} >
                <Accordion defaultExpanded={true} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" > 
                    <h1>Edit Itinerary</h1>
                </AccordionSummary>
                <AccordionDetails>
                <div style={{maxHeight:"400px", overflowY:"auto"}}>

                    {itinMakerIndex===0&&<>
                        
                        <div className={styles.spaceBetRow}>
                            <span style={{width:"48%"}}>
                                {aSwitcher(aTour.LTCLogo, aTour, setTour, "LTCLogo", "ecoAndes", "Logo on itinerary?")}
                                {aTour.LTCLogo&&<>
                                    {radioSelectors(logoSwitcherArr, "logoRadios", aTour, setTour, "LTCLogo")}
                                </>}
                                {anInputDisplayer("Tour Name", "tripName", "text", true, undefined, aTour, setTour, undefined, undefined, "Tour Name" )}
                                {anInputDisplayer("Duration", "duration", "number", true, undefined, aTour, setTour, 1, undefined, "Tour Duration")}
                            </span>
                            <span style={{width:"48%"}}>
                                {anInputDisplayer("Starting City", "startingPlace", "text", false, undefined, aTour, setTour, undefined, undefined, "Example: Lima or Quito")}
                                {aDropdownPicker(tourType, "tour type", "tourType", aTour, setTour)}
                                {aDropdownPicker(tourDiff, "Difficulty", "difficulty", aTour, setTour)}
                            </span>
                        </div>
                        <div className={styles.spaceBetRow}>
                            <span/>
                            {itinMakerCounterFunct(itinMakerIndex, setItinMkrIndx)}
                        </div>
                    </>}
                    {itinMakerIndex===1&&<>
                        <div className={styles.spaceBetRow}>
                            <span style={{width:"45%"}}>
                                {multiOptPicker(destinationList, "Destinations", "countryList", aTour.countryList, aTour, setTour, setDestList )}
                            </span>
                            <span style={{width:"45%"}}>
                                {aDropdownPicker(LTCGenDAta.tourLanguages, "Language", "tripLang", aTour, setTour)}

                                <TextEditor
                                    tempObj={aTour}
                                    setTempObj={setTour}
                                    inputIndex={"tourOverview"}
                                    inputLabel={"tour Overview"}
                                />
                                <br/>
                                <br/>
                                <br/>
                                <div className={styles.spaceBetRow}>
                                    <span />
                                    {itinMakerCounterFunct(itinMakerIndex, setItinMkrIndx, dayArrAdder)}
                                </div>
                            </span>
                        </div>
                    </>}
                    {itinMakerIndex===2&&<>
                        {aTour.imgArr.length>0 && <>
                            {imgPickerUIUitls(aTour.imgArr, "cover")}
                            </>}
                        {imagePickers("cover")}
                    </>}
                    {itinMakerIndex===3&&<>
                        {/* display list of days to left, with btns to edit each day, and every option that a day has*/}
                        {dayEditor()}
                    </>}
                    {itinMakerIndex===4&&<>
                        {priceAndInclusionsAdder()}
                    </>}
                </div>
                {itinMakerIndex===2&&<>
                    <div className={styles.spaceBetRow} >
                        <span/>
                        {itinMakerCounterFunct(itinMakerIndex, setItinMkrIndx)}
                    </div>
                </>}
                </AccordionDetails>
                </Accordion>
            </div>
            </>)
        }
        const anItinDisp=()=>{
            return(<>
                <TourDisplayer 
                    aTour={aTour}
                />
            </>)
        }

        return(<>
            <div className={styles.itinBuilderCont} >
                {eachStepTemplate()}
                {anItinDisp()}
            </div>
        </>)
    }

    const localNav=(BTNFunc, BTNRes, BTNLabel, BTNIcon, BTNStyle )=>{
        if(BTNStyle===1){
            return(<>
                <div className={styles.localNav}>
                    <div className={styles.returnHomeBTN} onClick={()=>BTNFunc(BTNRes)}>{BTNIcon} {BTNLabel}</div>
                </div>
            </>)
        } else if( BTNStyle===2){
            return(<>
                <div className={styles.homeBTN} onClick={()=>BTNFunc(BTNRes)}>
                    {BTNIcon} <br/>
                    <span>
                        {BTNLabel}
                    </span>
                </div>
            </>)
        }
    }

    return(<>
        <div className={styles.generalPageCont}>
            {session?<>
                <GMSNavii user={session.user}/>
                {pageNavigator!="home"&&<>
                    {localNav(setPageNavi, "home", "Tour Creator Home", <HomeIcon/>, 1)}
                </>}
                {pageNavigator==="home"? <> 
                    <div className={styles.tourCreatorTitle}>
                        <DesignServicesIcon fontSize="large" />
                        <h2>Latin Travel Collection</h2>
                        <h1>Tour Creator</h1>
                    </div>
                    {tourCreatorHome()}
                </>: pageNavigator==="creator"?<>

                    {/* v2 */}
                    {itineraryBuilder()}
                    {autofillTools(filteredAFEntries, autoFillData, "use")}

                    {/* v1 */}
                    {/* <div className={styles.tourCreatorLayout}>
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
                    </div> */}
                </>: pageNavigator==="autofill"&&<>
                    {autofillTools(filteredAFEntries, autoFillData, "tooling")}
                </>}
            </>:<> 
                <SignInForm />
            </>}
        </div>
    </>)
}
