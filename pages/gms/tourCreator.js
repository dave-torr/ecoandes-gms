import React, { useState, useEffect  } from "react";
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'


// components
import { useSession } from "next-auth/react"
import {
    DayByDayAdder, 
    anInputDisplayer, multiOptPicker, aDropdownPicker, inputToList, aSwitcher, radioSelectors, multiLineTextInput
} from "../../components/forms"
import { SignInForm } from "../../components/authForms";
import {TourDisplayer } from "../../components/tours"
import { GMSNavii } from "../../components/navis";
import {anImageDisp} from "../gms/pix"

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

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
let ecoAndesDestinations= [...LTCGenDAta.countryList, "galapagos", "atacama", "easter island", "patagonia", "amazon" ].sort()
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
    const [useAFTrig, setAFTrig]= useState(false)
    const [aTravelDay, setTravelDay] = useState()
    const [itinMakerIndex, setItinMkrIndx]=useState(0)
    const [mealPlaceholder, setMealPlaceholder]=useState("")

    
    const [destinationList, setDestList] = useState([...ecoAndesDestinations])
    // FFD
    const [tourCreatorStep, settourCreatorStep]=useState(0)
    const [priceFixedDep, setPriceFDTrig]=useState(true)
    const [priceRangeObj, setPriceObj]=useState({})

    const [fetchedImgArrs, setFetchedImgs]=useState([])
    const [filteredImgArr, setFilteredImgs]=useState([])
    const [imgDestFilter, setImgFilter]=useState(0)
    const [submitionTrig, setSubmitTrig]=useState(false)
    const [incluPlaceholder, setPlaceholder]=useState("")
    



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
        } else {
            let sortedArr = autoFillData.sort((a,b)=>{
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

    // const imagePickers=()=>{
        
    //     // add to itin with or without complimentary data?
    //     // IMG Picker
    //     // Loading Bar
    //     // see all imgInstace
    //     // Filter imgaes

    //     if(tourCreatorStep===1){ 
    //     if (filteredImgArr) {
    //     let aPickerImg= filteredImgArr.map((elem, i)=>
    //     <React.Fragment key={i}>
    //         <div className={styles.eachImgDisp}>
    //             {anImageDisp(elem.src, 150, "LTCWide", elem.imgAlt)}
    //             <div className={styles.imgSelectorBTN} onClick={()=>{
    //                 // addToItinImgArr
    //                 let tempImgArr = aTourModel.imgArr.concat(elem.src)
    //                 setTourModel({
    //                     ...aTourModel,
    //                     "imgArr": tempImgArr
    //                 })

    //                 let tempList = [...filteredImgArr]
    //                 tempList.splice(i, 1)
    //                 setFilteredImgs(tempList)

    //             }} >  +  </div>
    //             <div className={styles.imgRefData}>
    //                 <div>{elem.imgCountry}</div>
    //                 <div>{elem.imgRegion}</div>
    //                 <div>{elem.imgName}</div>
    //                 <div>{elem.locationDetails}</div>
    //             </div>
    //         </div>
    //     </React.Fragment>)

    //     return(<>
    //     <div className={styles.imgSelectionCont} >
    //         <div style={{padding: "6px 12px"}}>
    //             <Select
    //                 placeholder='Image Country'
    //                 data={[...imgCountry]}
    //                 onChange={setImgFilter}
    //                 id="imgSelectUI"
    //             /></div>
    //         <div style={{textAlign: "end", padding: "6px 12px"}}>
    //             Images: {filteredImgArr.length} </div>
    //         <div className={styles.imgPickerCont} >
    //             {aPickerImg}
    //         </div>
    //     </div> 
    //     </>)
    //     }}
    // }
    // const imgPickerUIUitls=(imgArr)=>{
    //     let eachSelectedImg=imgArr.map((elem, i)=><React.Fragment key={i}>
    //         <div style={{padding: "6px", width:"120px", position: "relative"}}>
    //             {anImageDisp(elem, 120, "LTCWide", elem.imgAlt)}
    //             <div className={styles.imgSelectorBTN} onClick={()=>{
    //                     let tempList=[...imgArr];
    //                     tempList.splice(i, 1)
    //                     setTourModel({
    //                         ...aTourModel,
    //                         "imgArr": tempList
    //                     })
    //                     let secondList=filteredImgArr.concat({"src": elem})
    //                     setFilteredImgs(secondList)
    //                 }}> x </div>
    //         </div>
    //     </React.Fragment>)

    //     return(<>
    //         <div className={styles.imgUIUtils}> 
    //             {eachSelectedImg}
    //         </div>
    //     </>)
    // }
    // const sendToBackEnd=(theTour, userData, sendIndicator)=>{

    //     const sendToBE=async()=>{
    //         if(!submitionTrig){
    //         setSubmitTrig(true)
    //         let toDate = new Date()
    //         let reqData = JSON.stringify({
    //             ...theTour,
    //             "dateCreated":toDate,
    //             "version": 0,
    //             "status": 1,
    //             "user": {
    //                 "name": userData.name,
    //                 "email": userData.email,
    //                 "phono": userData.phono
    //                 }
    //         })
    //         const res = await fetch("/api/gms/itineraries", {
    //                 method: "POST",
    //                 body: reqData
    //             })
    //         const itinSubmition = await res.json()
    //         if(res.status===200){
    //             window.alert("Itinerary Created! Taking you to Tour Explorer")
    //             router.push("/gms/tourExplorer")
    //             }
    //         }
    //     }

    //     return(<>
    //         {sendIndicator===1 &&<> 
    //             <div className={styles.nextStepBTN} 
    //                 onClick={async()=>{sendToBE()}}>
    //             {submitionTrig? <>
    //                 <CircularProgress />
    //             </>:<>
    //                 Submit Itinerary! 
    //             </>}
    //             </div>  
    //         </>}
    //         {sendIndicator===2 && <> 
    //             <div className={styles.nextStepBTN}  
    //                 onClick={async()=>{sendToBE()}}>
    //                 {submitionTrig? <>
    //                     <CircularProgress />
    //                 </>:<>
    //                     Save and Exit &nbsp; <SaveIcon/>
    //                 </>}
    //             </div>
    //         </>}
    //     </>)
    // }
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
    // const priceAndInclusionsAdder=()=>{
    //     return(<>
    //         {tourCreatorStep===3&&<> 
    //             {inputToList("Included In Tour", "included", aTourModel, setTourModel, aTourModel.included, textPlaceholder, setTxtPlaceholder)}
    //             {inputToList("Not Included In Tour", "notIncluded", aTourModel, setTourModel, aTourModel.notIncluded, textPlaceholder2, setTxtPlaceholder2)}
    //             <br/>
    //             <h3>Prices:</h3>
    //             <Switch checked={priceFixedDep} onChange={(e)=>{priceFixedDep? setPriceFDTrig(false):setPriceFDTrig(true) }} label="Single Price" />
    //             {priceFixedDep? <>
    //                 <div className={styles.spaceBetRow}>
    //                     {anInputDisplayer("F.D. Price", "price", "number", false, undefined, aTourModel, setTourModel, 0, undefined, "price per person")} &nbsp;&nbsp;
    //                     {anInputDisplayer("S. Supp", "singleSupp", "number", false, undefined, aTourModel, setTourModel, 0, undefined, "Single Supplement" )}
    //                 </div>
    //                 <div className={styles.spaceBetRow}>
    //                     {anInputDisplayer("Pax Min", "paxMin", "number", false, undefined, aTourModel, setTourModel, 0, undefined, "Pax Nimimum")} &nbsp;&nbsp;
    //                     {anInputDisplayer("Pax Max", "paxMax", "number", false, undefined, aTourModel, setTourModel, 0, undefined, "Pax Number")}
    //                 </div>
    //             </>:<>
    //                 <h4>ADD TO RANGE: </h4>
    //                     {anInputDisplayer("Price", "pricePerPax", "number", false, undefined, priceRangeObj, setPriceObj, 0, undefined, "price per person")}
    //                     {anInputDisplayer("Pax Max", "upperRange", "number", false, undefined, priceRangeObj, setPriceObj, 0, undefined, "Pax Number")}
    //                     <div className={styles.addRangeBTN} onClick={()=>{
    //                         if((priceRangeObj.upperRange && priceRangeObj.pricePerPax)){
    //                             let tempArr = []
    //                             if(aTourModel.price?.length>0){
    //                                 tempArr= [...aTourModel.price]
    //                                 tempArr.push(priceRangeObj)
    //                                 setTourModel({
    //                                     ...aTourModel,
    //                                     "price": tempArr
    //                                 })
    //                                 let priceVal = document.getElementById("pricePerPax")
    //                                 priceVal.value=undefined
    //                                 let guestLimitVal = document.getElementById("upperRange")
    //                                 guestLimitVal.value=undefined
    //                             } else {
    //                                 tempArr.push(priceRangeObj)
    //                                 setTourModel({
    //                                     ...aTourModel,
    //                                     "price": tempArr
    //                                 })
    //                                 let priceVal = document.getElementById("pricePerPax")
    //                                 priceVal.value=undefined
    //                                 let guestLimitVal = document.getElementById("upperRange")
    //                                 guestLimitVal.value=undefined
    //                             }
    //                         } else {
    //                             window.alert("Please fill in Price and guest upper limit")
    //                         }
    //                     }}> Add to Price Range </div>
    //                     <br/>
    //                     {anInputDisplayer("S. Supp", "singleSupp", "number", false, undefined, aTourModel, setTourModel, 0, undefined, "Single Supplement" )}

    //                     {aTourModel.price?.length>0 && <>
    //                         <table className={styles.priceTable} >
    //                             {aTourModel.price.map((elem,i)=><React.Fragment key={i} >
    //                             <div className={styles.spaceBetRow}>
    //                                 <tr>
    //                                     <td>{elem.upperRange} Pax </td>
    //                                     <td>${elem.pricePerPax}</td>
    //                                 </tr>
    //                                 <div onClick={()=>{
    //                                     if(aTourModel.price.length>1){
    //                                         let splicer = aTourModel.price.splice(i, 1)
    //                                         setTourModel({
    //                                             ...aTourModel,
    //                                             "price": aTourModel.price
    //                                         })
    //                                     } else {
    //                                         setTourModel({
    //                                             ...aTourModel,
    //                                             "price": undefined
    //                                         })
    //                                     }
    //                                 }} ><CancelIcon/> </div>
    //                             </div>
    //                             </React.Fragment> )}
    //                         </table>
    //                     </>}
    //             </>}
    //             {/* Vendor notes here!!!! */}
    //             {inputToList("Operational Notes", "notes", aTourModel, setTourModel, aTourModel.notes, textPlaceholder3, setTxtPlaceholder3)}
    //         </>}
    //     </>)
    // }

    ///////////////////////////////////////////////
    // homeBTNS
    
    const tourCreatorHome=()=>{
        return(<>
            <div className={styles.spaceBetRow} style={{width:"500px", marginTop:"39px"}}>
                <div className={styles.homeBTN} onClick={()=>setPageNavi("creator")}>
                    <LuggageIcon/> <br/>
                    <span>
                        CREATE <br/> ITINERARY
                    </span>
                </div>
                <div className={styles.homeBTN} onClick={()=>setPageNavi("autofill")}>
                    <RateReviewIcon/> <br/>
                    <span>
                        AUTOFILL <br/> TOOLKIT
                    </span>
                </div>
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
                            // add description to daily text, add inclusions to day list, close Dialog
                            if(aTravelDay?.dayDescription){
                                let parsedEntryDescr = JSON.parse(anEntry.dayDescription)
                                let tempTravDes= JSON.parse(aTravelDay.dayDescription)
                                let tempObj = {
                                    ...tempTravDes,
                                    "root":{
                                        ...tempTravDes.root,
                                        "children":[
                                            ...tempTravDes.root.children,
                                            ...parsedEntryDescr.root.children
                                        ]
                                    }
                                }

                                // text editor is not updating, help!
                                setTravelDay({
                                    ...aTravelDay,
                                    "dayDescription": JSON.stringify(tempObj)
                                })
                                setAFTrig(false)




                            } else {
                                setTravelDay({
                                    ...aTravelDay,
                                    "dayDescription": anEntry.dayDescription
                                })
                                setAFTrig(false)
                            }
                        }}>
                            <AddCircleIcon/>
                        </span>

                    </>}
                </div>
                <i> {anEntry.location}</i>
                {anEntry.dayDescription?<>
                    <div style={{padding:"15px"}}>
                        <RichTextDisp
                            richTextCont={true}
                            theValue={anEntry.dayDescription}
                        />
                    </div>
                {anEntry.dayInclusions.length>0&&<>
                    <strong >INCLUSIONS:</strong><br/>
                    {anEntry.dayInclusions.map((elem,i)=><React.Fragment key={i}>
                        - {elem}
                    </React.Fragment> )}
                </>}
                </>: <> 
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
                            {/*display loading circle, when updating is happening  */}
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
            <Dialog open={useAFTrig} onClose={()=>{setAFTrig(false)}}>
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
                
                <div className={styles.creatorIndexBTNONLINE}
                onClick={()=>{
                    // day by Day
                    theCounter===1 ? additonalFunct() : setTeCounter(theCounter + 1)
                }}>
                    <KeyboardDoubleArrowRightIcon/>
                </div>
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
            return(<>

            {editDayTrig?<>
                <div className={styles.spaceBetRow}>
                    {<h3>Edit Day {aTravelDay.dayIndex+1}</h3>}
                    <div style={{cursor:"pointer", display: "flex" }} onClick={()=>{
                        let splicer = aTour.dayByDay.splice(aTravelDay.dayIndex, 1, aTravelDay);
                        setTour({...aTour});
                        setDayTrig(false)
                    }}> Save Day &nbsp;<SaveIcon/> </div>
                </div>
                <div className={styles.lineBreak} />
                <div className={styles.spaceBetRow}>
                    <div style={{width:"48%", height:"auto"}}>
                        {anInputDisplayer("day Title", "dayTitle", "text", false, aTravelDay.dayTitle, aTravelDay, setTravelDay, undefined, undefined, "Day Main Activity")}
                        <TextEditor
                            tempObj={aTravelDay}
                            setTempObj={setTravelDay}
                            inputIndex="dayDescription"
                            inputLabel="Day Description"
                            prevState={aTravelDay.dayDescription}
                        />
                        {anInputDisplayer("Overnight Property", "overnightProperty", "text", false, aTravelDay.overnightProperty, aTravelDay, setTravelDay, undefined, undefined, "Overnight Property")}
                        {mealsIncludedTool()}
                    </div>
                    <div style={{width:"48%"}}>
                        <div className={styles.spaceBetRow}>
                            {/* <div className={styles.addFromRecordBTN} onClick={()=>{
                                setAFTrig(true)
                            }}> ADD AUTOFILL &nbsp; <PlaylistAddIcon/> </div> */}


                            <div className={styles.addFromRecordBTN}  onClick={()=>{
                                // set img trigger
                            }}> ADD IMAGES &nbsp; <AddPhotoAlternateIcon/> </div>
                        </div>
                        {inputToList("add to day", "dayInclusions", aTravelDay, setTravelDay, aTravelDay.dayInclusions, incluPlaceholder, setPlaceholder)}
                        {anInputDisplayer("Supplementary Information", "suppInfo", "text", false, aTravelDay.suppInfo, aTravelDay, setTravelDay, undefined, undefined, "Ex: Quito is at 2,800 meters above sea level")}
                        {anInputDisplayer("Driving distance", "drivingDistance", "number", false, aTravelDay.drivingDistance, aTravelDay, setTravelDay, 0, undefined, "Ex: 150 km")}
                    </div>
                </div>
            </>:<>
            
            Edit Days:
            <div style={{ width:"100%", display:"flex", flexWrap:"wrap" }}>
                {aTour.dayByDay.map((elem,i)=><React.Fragment key={i}>
                    <div className={styles.eachDayTab} onClick={()=>{
                        setTravelDay({
                            ...elem,
                            "dayIndex": i
                        })
                        setDayTrig(true)
                    }}> Day {i+1}{elem.dayTitle&& <>: {elem.dayTitle.substr(0, 10) + "\u2026" }</>}</div>
                </React.Fragment> )}
            </div>
                
            {/* save and Quit options, back btns opts */}
                <div className={styles.spaceBetRow}>
                    <div style={{display:"flex"}} onClick={()=>{
                        // save and submit itin
                    } }> Save & Quit &nbsp;<SaveIcon/></div>
                    {itinMakerCounterFunct(itinMakerIndex,setItinMkrIndx )}
                </div>
            </>}
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

                {itinMakerIndex===0&&<>
                    <div className={styles.spaceBetRow}>

                        {aSwitcher(aTour.LTCLogo, aTour, setTour, "LTCLogo", "ecoAndes", "Logo on itinerary?")}
                        {aTour.LTCLogo&&<>
                            {radioSelectors(logoSwitcherArr, "logoRadios", aTour, setTour, "LTCLogo")}
                        </>}
                    </div>
                    <div className={styles.spaceBetRow}>
                        <span style={{width:"65%"}}>
                            {anInputDisplayer("Tour Name", "tripName", "text", true, undefined, aTour, setTour, undefined, undefined, "Tour Name" )}
                        </span>
                        <span style={{width:"30%"}}>

                           {anInputDisplayer("Duration", "duration", "number", true, undefined, aTour, setTour, 1, undefined, "Tour Duration")}
                        </span>
                    </div>


                    <div className={styles.spaceBetRow}>
                        <span style={{width:"45%"}}>
                            {aDropdownPicker(tourType, "tour type", "tourType", aTour, setTour)}
                        </span>
                        <span style={{width:"45%"}}>
                            {aDropdownPicker(tourDiff, "Difficulty", "difficulty", aTour, setTour)}
                        </span>
                    </div>

                    <div className={styles.spaceBetRow}>
                        <span style={{width:"48%"}}>
                            {anInputDisplayer("Starting City", "startingPlace", "text", false, undefined, aTour, setTour, undefined, undefined, "Example: Lima or Quito")}
                        </span>

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
                    {/* display list of days to left, with btns to edit each day, and every option that a day has*/}
                    {dayEditor()}
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



    return(<>
        <div className={styles.generalPageCont}>
            {session?<>
                <GMSNavii user={session.user}/>
                <div className={styles.tourCreatorTitle}>
                    <DesignServicesIcon fontSize="large" />
                    <h2>Latin Travel Collection</h2>
                    <h1>Tour Creator</h1>
                </div>

                {pageNavigator!="home"&&<>
                    <div className={styles.localNav}>
                        <div className={styles.returnHomeBTN} onClick={()=>setPageNavi("home")}><HomeIcon/> Tour Creator Home</div>
                    </div>
                </>}
                {pageNavigator==="home"? <> 
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
