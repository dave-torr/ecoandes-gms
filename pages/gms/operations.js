import React, { useState } from 'react'
import { useEffect } from 'react'
import Image from "next/image"
import { useRouter } from 'next/router'

import { GMSNavii } from "../../components/navis";
import { useSession } from "next-auth/react"
import { aDropdownPicker, anInputDisplayer } from "../../components/forms"

import styles from "../../styles/pages/operations.module.css"

import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import HubIcon from '@mui/icons-material/Hub';
import { Dialog, FormControlLabel } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import SaveIcon from '@mui/icons-material/Save';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import FlightIcon from '@mui/icons-material/Flight';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HandshakeIcon from '@mui/icons-material/Handshake';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import DateRangeIcon from '@mui/icons-material/DateRange';

import LTCLogoBLK from "../../public/assets/logos/ecoAndesBLK.png"
import GalapagosElementsLogo from "../../public/assets/logos/galapagosElementsLogo.png"
import YacumaLogo from "../../public/assets/logos/yacuma.png"
import UnigpsLogo from "../../public/assets/logos/unigalapagos.png"
import MaexgalLogo from "../../public/assets/logos/maexgal.png"


import LTCPriceTables from "../../data/LTCPriceTables2023.json"
import LTCItins from "../../data/LTCItinerary.json"
import EcoAndesItins from "../../data/ecoAndesFixedDepartures.json"

import GeneralDataTemplates from "../../data/dataAndTemplates.json"


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

let catalogIndex={
    "adventureGuides":"Adventure Guides",
    "driverGuideServices":"Driver Guides",
    "nativeGuides":"Native Guides",
    "guideServices":"Guide Services",
    "galapagosVarCosts":"Galapagos Variable Costs",
    "galapagosCharterCosts":"Galapagos Charters",
    "galapagosDayTours":"Galapagos Day Tours",
    "galapagosDiving":"Galapagos Diving Tours",
    "maexgal":"Galapagos Luxury Island Hopping",
    "continentalVarCosts":"Continental Variable Costs",
    "ikalaHotels":"Ikala Hotels",
    "LTCPartnerAccoms":"LTC Partner Accomodations",
    "transport": "Transport",
    "hotelAdditionalServices": "Hotel Services"
}
const aRoomModel={
  "guestArr":[
      {
        "guestName": String,
        "guestFName": String,
        "guestLName": String,
        "guestDOB": String,
        "guestID": String,
        "guestNotes": [],
        "passport": String,
        "nationality": String,
        "sex": String
      }
    ],
    "accomodationType": "single",
    "singleSupp": true,       
}
const aDepModel={
    "itineraryID": String,
    "tourCode":String,
    "roomingList": [],
    "tourLeader":[],
    "dayByDayExp":[],
    "operationalNotes":[],
    "startingDate": String,
    "maxPaxNumb": Number,
    "duration": Number,
    "departureNotes":[],
    "flights":[],
    "cruises":[],
    "saleProcess": "onSale"
}

let toDate= new Date()

export default function OperationsDashboard(){
    let WorldCountryList = []

    GeneralDataTemplates.countriesAndPhones.forEach((elem)=>{
        WorldCountryList.push(elem.name)
    })

  // OPERATIONS DASHBOARD

  // - Fetch departures and itineraries (to create departures)

  // - Deliver stats calculated at moment of login
    // number of active groups
    // number of clients
    // nationalities

  // Generate opDocs, roomingLists, automatic emails for providers.  

    // OPERATIONS DOCUMENTS:
    // - ORDEN DE TRABAJO:
    // - Rooming List 
    // - requerimiento economico (cash management)
    // provide hotel data & edit cap

    //  NON OP: edit prev set expenses. 
    //  NON OP: duplicate hotel accommodations on following nights

    // NON OP 
    //    provider database
    // -- guides
    // -- hotels
    // -- cruise
    // -- transportation

    
    //  NON OP: add contact from DB to expense. 
    //  Yacht Reservation Form
    
    // For active departures, show day title of currently running day, hotel, guide name.
    // planner page: print horizontally, 

    const { data: session } = useSession()
    const [theLang, setLang]= useState("english")

    const [activeDeps, setActiveDeps]=useState([])
    const [fetchedItins, setFetchedItins]=useState([])
    const [upcomingDeps, setUpcomingDeps]=useState([])
    const [weeklyPlanner, setWeeklyPlanner]=useState([])

    const [itinFetcherGMSSwitch, setGMSItinFetcherSwitch]=useState(false)
    const [itinFetcherLTCSwitch, setLTCItinFetcherSwitch]=useState(false)
    const [ecoAndesFixedDepartures, setEcoAndesFD]=useState(false)

    // itin and dep obj, selected from fetched data, or new dep
    const [theItinerary, setTheItinerary]=useState()
    const [theDeparture, setTheDeparture]=useState()

    // expenses, price Tables
    const [fileDisplayKey, setFileKey]=useState("intro")
    const [thePriceChart, setPriceChart]=useState(LTCPriceTables)
    const [priceChartKey, setPriceChartKey]=useState("")  
    const [expenseTrig, setExpTrig]=useState(false)
    const [expenseEditTrig, setExpEditTrig]=useState(false)
    const [expenseIndex, setExpenseIndex]=useState()
    const [anExpense, setAnExpense]=useState()
    const [addHotelTrig, setHotelAddTrig]=useState(false)

    // roomingList
    const [paxData, setPaxData]=useState()
    const [newRoomObj, setRoomObj]=useState(aRoomModel)
    const [addGuest, setAddGuest]=useState(false)
    const [addGuestTrig, setAddGuestTrig]=useState(false)
    const [guestAddCount, setGuestAddCount]=useState(0)
    const [addGuestNote, setAddGuestNote]=useState(false)
    const [editTLTrig, setEditTLTrig]=useState(false)
    const [addTLObj, setTLObj]=useState(false)
    const [addTLNote, setTLNote]=useState(false)
    const [roomingEditIndex, setRoomingEditIndex]=useState(null)

    // general utils
    const [exitDocTrig, setexitDocTrig]=useState(false)
    const [plannerTrig, setPlannerTrig]=useState(false)
    const [createdep, setCreateDep]=useState(false)
    const [guestPopUpData , setGuestPopUpData]= useState(false)
    const [fileSwitch, setfileSwitch]=useState(false)
    const [editSwitch, setEditSwitch]=useState(false)
    const [docsSwitch, setDocSwitch]=useState(false)
    const [dayIndex, setDayIndex]=useState()
    const [temporaryRoomObj, setTempRoomObj]=useState({})


    const [loadingTrigger, setLoadingTrig]=useState(false)


    const [addDepartureNote, setAddDepartureNote]=useState(false)
    const [documentGenerator, setDocumentGenera]=useState(false)
    const [addOperationalNote, setAddOPNote]=useState(false)
    const [opDocEditSwitch, setOPDocSwitch]=useState(false)
    const [saveDocSwitch, setSavedoc]=useState(true)
    const [documentDispTrigs, setDocTrigs]=useState({
        "logo":true,
        "roomingList":true,
        "guestNotes":true,
        "bootSizes":true,
    })
    const [tempChecklist, setTempCheckList]=useState()
    const [checklistSwitch, setChecklistSwitch]=useState(false)

  // providers
    const [providerArr, setProviderArr]=useState([])
    const [flightObj, setFlightObj]=useState(false)

    useEffect(()=>{
        {paxDataExtractor(theDeparture, setPaxData)}
        let tempContArr=[]
        if(theDeparture){
        // does this need to run every time theDep changes?
            theDeparture.dayByDayExp.forEach((elem)=>{
                elem?.forEach((element)=>{
                    const findContact = tempContArr.find(elemental => elemental.contactName === element.contactName)
                    if(findContact===undefined){
                        if(element.expenseKey==="accommodation"){
                            let tempProviderObj = {
                                "contactName": element.contactName,
                                "contactNumb": element.contactNumb,
                                "expenseKey": element.expenseKey,
                                "priceDetail": element.priceDetail,
                                "hotelName":element.hotelName
                            }
                            tempContArr.push(tempProviderObj)
                        } else {
                            let tempProviderObj = {
                                "contactName": element.contactName,
                                "contactNumb": element.contactNumb,
                                "expenseKey": element.expenseKey,
                                "priceDetail": element.priceDetail
                            }
                            tempContArr.push(tempProviderObj)
                        }
                    }
                })
            })
        }
        setProviderArr(tempContArr)
    },[theDeparture])  

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Fetch Deps & Itins on mount. 
    useEffect(()=>{
        (async ()=>{
            const res = await fetch("/api/gms/departures",{
            method: "GET"
            })
            let fetchedData = await res.json()
            if(fetchedData){
            // filter for deps active today. upper limit defined by midnight end of day
                let theTempArr=[]
                let anotherTempArr= []

                let sndDayItins=[]
                let trdDayItins=[]
                let frthDayItins=[]
                let fifthDayItins=[]

                fetchedData.forEach(element => {
                    
                    let lowerLimitDaterr = new Date(element.startingDate)
                    let loweLimitDate=addDays(lowerLimitDaterr, 1)
                    let theDur = parseInt(element.duration)
                    let upperLimitDate = addDays(element.startingDate, theDur+1)
                    //  filters out currently active voyages. 

                    if((toDate > loweLimitDate) && (upperLimitDate > toDate) ){
                        theTempArr.push(element)
                    }
                    if((addDays(toDate,2) > loweLimitDate) && (upperLimitDate >= addDays(toDate,2)) ){
                        sndDayItins.push(element)
                    }
                    if((addDays(toDate,3) > loweLimitDate) && (upperLimitDate >= addDays(toDate,3)) ){
                        trdDayItins.push(element)
                    }
                    if((addDays(toDate,4) > loweLimitDate) && (upperLimitDate >= addDays(toDate,4)) ){
                        frthDayItins.push(element)
                    }
                    if((addDays(toDate,5) > loweLimitDate) && (upperLimitDate >= addDays(toDate,5)) ){
                        fifthDayItins.push(element)
                    }
                    if (loweLimitDate >= toDate ){
                        anotherTempArr.push(element)
                    }
                })

                setActiveDeps(theTempArr.sort((a,b)=>{
                    if(a.startingDate< b.startingDate){return -1}
                    if(a.startingDate> b.startingDate){return 1}
                return 0
                }))
                setUpcomingDeps(anotherTempArr.sort((a,b)=>{
                    if(a.startingDate< b.startingDate){return -1}
                    if(a.startingDate> b.startingDate){return 1}
                return 0
                }))
                setWeeklyPlanner([sndDayItins, trdDayItins, frthDayItins, fifthDayItins])
                setLoadingTrig(false)

            }
            const res2 = await fetch("/api/gms/itineraries",{
                method: "GET"
            })
            let fetchedData2 = await res2.json()
            if(fetchedData2){
                // filter / sort functions
                setFetchedItins(fetchedData2)
            }
        })()
    },[])  

  ///////////////////////////////////////////
  // gen Utils
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    let toDateDisplayer= toDate.toLocaleDateString('en-GB', dateOptions)
  
    function addDays(theDate, someDays){
        let result = new Date(theDate);
        result.setDate(result.getDate() + someDays)
        return result;
    }
    const loadingScreen=(fetchingTitle)=>{
        return(<>
        <div className={styles.loadingStateScreen}> 
            <h3>{fetchingTitle}</h3>
            ... loading
            <CircularProgress />
        </div>
        </>)
    }
    const editOffFunction=()=>{
        setEditSwitch(false)
        setAddGuestTrig(false)
        setTempRoomObj({})
        setAddGuest(false)
        setGuestAddCount(0)
        setAddOPNote(false)
        setOPDocSwitch(false)
        setAnExpense()
        setEditTLTrig(false)
    }
    const paxDataExtractor=(theDep, setPxData)=>{
        if(theDep){
        let paxTotal = 0
        let roomObj= {
            "singleRooms":0,
            "twinRooms":0,
            "matrimonialRooms":0,
            "tripleRooms":0,
            "quadRooms":0,
        }
        let nationalityArr=[]
        // each guest loop
        theDep.roomingList.forEach((elem)=>{
            if(elem?.guestArr){
                paxTotal= paxTotal+ elem?.guestArr.length
                elem?.guestArr.forEach((guestElemz)=>{
                    const findContact = nationalityArr.find(element => element === guestElemz.nationality )
                        if(!findContact){
                            nationalityArr.push(guestElemz.nationality)
                        }
                })
            }
        if(elem?.singleSupp){
            roomObj={
                ...roomObj,
                "singleRooms":roomObj.singleRooms + 1
            }
        }
        if(elem?.accomodationType==="twin"){
            roomObj={
                ...roomObj,
                "twinRooms":roomObj.twinRooms + 1
            }
        }
        if(elem?.accomodationType==="matrimonial"){
            roomObj={
                ...roomObj,
                "matrimonialRooms":roomObj.matrimonialRooms + 1
            }
        }
        if(elem?.accomodationType==="triple"){
            roomObj={
                ...roomObj,
                "tripleRooms":roomObj.tripleRooms + 1
            }
        }
        if(elem?.accomodationType==="quad"){
            roomObj={
                ...roomObj,
                "quadRooms":roomObj.quadRooms + 1
            }
        }
        })
        setPxData({
            "paxTotal":paxTotal,
            "roomReq": roomObj,
            "nationalityArr":nationalityArr
        })
        }
    }
    const aDateDisp=(dateLabel, theDate, tripDuration, dayIndex, isShort)=>{
        let firstDate=new Date(`${theDate}T00:01:00`)
        let theDateFormatter 
        let upperLimitDate           
        if(tripDuration){
            let theDuration = parseInt(tripDuration-1)
            upperLimitDate = addDays(firstDate, theDuration)
            if(isShort){
                theDateFormatter = upperLimitDate.toDateString
            } else {
                theDateFormatter = upperLimitDate.toLocaleDateString('en-GB', dateOptions)
            }
        } else if (dayIndex || dayIndex===0) {
            let theDayIndex = parseInt(dayIndex)
            upperLimitDate = addDays(firstDate, theDayIndex)
            theDateFormatter = upperLimitDate.toLocaleDateString('en-GB', dateOptions)
        } else {
            theDateFormatter = firstDate.toLocaleDateString('en-GB', dateOptions)
        }
        if(dateLabel){return(<>
        <div className={styles.eachDateCont}>
            <div className={styles.eachDetailTitle}>{dateLabel}</div>
            <div>  
                {theDateFormatter}                
            </div>
        </div>
        </>)} else {
            return(<>
                {theDateFormatter}                
            </>)
        }
    }
    const saveFunction=async(theDep, )=>{
        setSavedoc(false)
        // record to bitacora the change, 
        // update document with similar functionality as Itinerary creation
        let backendPackage =JSON.stringify({ 
            "theDeparture": theDep,  
        })

        const res = await fetch("/api/gms/departures", {
            method:"PUT",
            body: backendPackage
        })
        const depUpdate = await res.json()
        if(res.status===200){
            window.alert("Departure Edited! ")
            setSavedoc(true)
        }
    }
    const saveIconDisp=(theTrigger, saveIconFunct)=>{

        return(<>
            <div className={styles.saveIconCont}> 
                {theTrigger? <>
                    <div onClick={()=>saveIconFunct(theDeparture)}> 
                        <SaveIcon />
                    </div>
                </> : <> 
                    <SaveIcon fontSize={'small'} />
                    <span> <CircularProgress color="success" /> </span>
                </>}
            </div>
        </>)
    }
    const departureStatusDisp=(theDep)=>{
        return(<> 
        <div className={styles.depStatusIndicator}>
            {theDep.saleProcess==="onSale"? 
                <><span className={styles.statusOne}>.</span>on Sale</> 
            : theDep.saleProcess==="reserved"?
                <><span className={styles.statusTwo}>.</span>Reserved</> 
            : theDep.saleProcess==="confirmed"?
                <><span className={styles.statusFour}>.</span>confirmed</> 
            : theDep.saleProcess==="running"&&
                <><span className={styles.statusThree}>.</span>running</> }
        </div>
        </>)
    }
    const logoDisplayer=(theItin, dispSwitch)=>{
        if(dispSwitch==="text"){
            switch (theItin.LTCLogo) {
                case "ltc":
                    return(<><h3>Latin Travel Collection</h3></>);
                case "galapagosElements":
                    return(<><h3>Galapagos Elements</h3></>);
                case "ecoAndes":
                    return(<><h3>EcoAndes Travel</h3></>);
                case "yacuma":
                    return(<><h3>Yacuma EcoLodge</h3></>);
                case "unigalapagos":
                    return(<><h3>Unigalapagos</h3></>);
                case "andesAdventures":
                    return(<><h3>Andes Adventures</h3></>);
                case "maexgal":
                    return(<><h3>Maexgal</h3></>);
                default:
                    break;
            }
        } else if (dispSwitch==="logo"){
            switch (theItin.LTCLogo) {
                case "galapagosElements":
                    return(<><div style={{display: "flex", justifyContent:"center", paddingTop: "27px"}} >
                <Image height={80} width={210} src={GalapagosElementsLogo} alt="Galapagos Elements Logo" /></div></>);
                case "ecoAndes":
                    return(<><div className={styles.partnerLogoCont}>
                <Image height={45} width={180} src={LTCLogoBLK} alt="EcoAndes Travel Logo" /></div></>);
                case "yacuma":
                    return(<><div className={styles.partnerLogoCont}>
                <Image height={55} width={210} src={YacumaLogo} alt="Yacuma Logo" /></div></>);
                case "unigalapagos":
                    return(<><div className={styles.partnerLogoCont}>
                <Image height={75} width={110} src={UnigpsLogo} alt="Unigalapagos Logo" /></div></>);
                case "andesAdventures":
                    return(<><div className={styles.partnerLogoCont}>
                <Image height={75} width={155} src={AndesAdventuresLogo} alt="Andes Adventures Logo" /></div></>);
                case "maexgal":
                    return(<><div className={styles.partnerLogoCont}>
                <Image height={120} width={210} src={MaexgalLogo} alt="Maexgal Logo" /></div></>);
                default:
                    break;
            }
        }
    }
    const logoSwitcher=()=>{
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
                "radioKey": "Maexgal",
                "radioVal": "maexgal"
            },
        ]
                
        return(<>
            <select onChange={(e)=>{
                e.target.value
                setTheItinerary({
                    ...theItinerary,
                    "LTCLogo": e.target.value
                })
            }} >  
                {logoSwitcherArr.map((elem,i)=><React.Fragment key={i}>
                    <option value={elem.radioVal}>{elem.radioKey} </option>
                </React.Fragment>)}
            </select>
        </>)
    }
    const detailWithTitleDisp=(theTitle, theDetail)=>{
        return(<>
        <div className={styles.eachDetailCont}>
            <div className={styles.eachDetailTitle}>{theTitle}</div>
            <div style={{ textTransform:"capitalize" }} >{theDetail}</div>
        </div>
        </>)
    }
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    // dep utilities
    const depSelector=(theLabel, theItineraries)=>{

    // need to make a dropdown filter for gms itins
    //      with sorting by duration, date created. 

        const eachItinDisp=(theItinArr)=>{

            let eachItinMapper=theItinArr.map((elem,i)=> <React.Fragment key={i}>
            <div className={styles.anItinCont}>
                <div className={styles.spaceBetRow}>
                    {elem.user?.name} 
                    {!elem.user&& <> {elem.countryList.map((elemz,i)=>
                        <React.Fragment key={i}>
                            {elemz} </React.Fragment>)} </>}
                </div>
                <h3>{elem.tripName}</h3>
                <div className={styles.spaceBetRow}>
                {parseInt(elem.duration)} days
                <span className={styles.createDepBTN} onClick={()=>{
                    if(elem.user){
                        setTheDeparture({
                            ...aDepModel,
                            "itineraryID": elem._id,
                            "duration":parseInt(elem.duration)
                        })
                    } else {
                        setTheDeparture({
                            ...aDepModel,
                            "itineraryID": elem.id,
                            "duration":parseInt(elem.duration)
                        })
                    }
                    setTheItinerary({...elem})
                }}> 
                    <AddCircleOutlineIcon/> Departure </span>
                </div>

            </div>
            </React.Fragment>)
            return(<>
            <div className={styles.itinPickerRow}>
                {eachItinMapper}
            </div>
            </>)
        }
        return(<>
            {theItineraries.length>0 && <>
                <h2>{theLabel}</h2>
                {eachItinDisp(theItineraries)}
            </>}
        </>)
    }
    const depCreator=(theItin, theDep)=>{

    // Add Inputs for minimum needed info for dep:
    // Logo
    // Dep date, 
    // Group code,
    // Trip Reference
    // compamny
    // contact
    // guest max

    return(<>
        <div className={styles.departureGenCont}> 
        <div className={styles.aFileContainer} style={{minHeight:"33vh" }} >
            <div className={styles.spaceBetRow}>
                <h1> Create Departure </h1>
                <div style={{cursor:"pointer"}} onClick={()=>{
                    setTheItinerary()
                    setTheDeparture()
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }}> <CancelPresentationIcon/></div>
            </div>
            <div className={styles.spaceBetRow}>
                <h2>{theItin.tripName}</h2>

                {theItin.logo && <> 
                    {logoDisplayer(theItin, "logo")} </>}
            </div>

            <br/>
            <form onSubmit={async(e)=>{
                e.preventDefault();

                // send dep to BE
                setfileSwitch(true)
                setSavedoc(false)
                let reqData;
                reqData = {
                    ...theDep,
                    "dateCreated":toDate,
                    "tripName": theItin.tripName,
                    "version": 0,
                    "status": 1,
                    "user": {
                        "name": session.user.name,
                        "email": session.user.email
                        }
                }
                if(session?.user.hierarchy!=1){
                    reqData = {
                    ...theDep,
                    "assignment": session.user.name
                    }
                }
                const res = await fetch("/api/gms/departures", {
                    method: "POST",
                    body: JSON.stringify(reqData)
                })
                const depCreationRes = await res.json()
                if(res.status===200){
                    window.alert("Departure Created! Add aditional information below, and do not forget to save your work!")
                    setSavedoc(true)

                    // add to departures array immediatly, compare with bd fetched deps after. 
                }

            }}>
            <br/>

            {session?.user.hierarchy===1&& <>
            <div className={styles.spaceBetRow}>
                <div style={{width:"49%"}}>
                    <div className={styles.inputLabel}> Assign Folder to: </div>
                    <select className={styles.inputUserUI} onChange={(e)=>{
                        e.preventDefault()
                        setTheDeparture({
                            ...theDep,
                            "assignment": e.target.value
                        })
                    }}> 
                        <option disabled selected > Select Folder Operator </option>
                        <option value="Cristina Paez"> Cristina Paez </option>
                        <option value="Carolina Cruz"> Carolina Cruz </option>
                    </select> &nbsp;
                </div>
                {/* <div style={{width:"49%"}}>
                    <div className={styles.inputLabel}> Logo Switcher </div>
                    <select className={styles.inputUserUI} onChange={(e)=>{
                        e.preventDefault()
                        setTheDeparture({
                            ...theDep,
                            "assignment": e.target.value
                        })
                    }}> 
                        <option disabled selected > Select Folder Operator </option>
                        <option value="Cristina Paez"> Cristina Paez </option>
                        <option value="Carolina Cruz"> Carolina Cruz </option>
                        <option value="Carlos del Salto"> Carlos del Salto </option>
                    </select> &nbsp;
                </div> */}
            </div>
            </> }            

            <div className={styles.spaceBetRow}>
                <div style={{width:"49%"}}>
                    <div className={styles.inputLabel}>
                        Add departure Date*
                    </div>
                    <input 
                        className={styles.inputUserUI} 
                        type='date'
                        required
                        onChange={(e)=>{
                            e.preventDefault;
                            setTheDeparture({...theDep,
                                "startingDate": e.target.value
                            })
                        }}
                        placeholder='Departure Date'
                    />
                </div>
                <div style={{width:"49%"}}>
                    {aDateDisp("Starting Date", theDep.startingDate)}
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <div style={{width:"49%"}}>
                    <strong>DURATION:</strong> {parseInt(theItin.duration)} days
                </div>
                <div style={{width:"49%"}}>
                    {aDateDisp("Ending Date", theDep.startingDate, parseInt(theItin.duration))}
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <div style={{width:"49%"}}>
                    {anInputDisplayer("Tour Code", "tourCode", "text", true, undefined, theDep, setTheDeparture, undefined, undefined, "Ex: USA AZ 01 22" )}
                </div>
                <div style={{width:"49%"}}>
                    {anInputDisplayer("reference", "tripRef", "text", false, undefined, theDep, setTheDeparture, undefined, undefined, "Ex: Lincoln x 5" )}
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <div style={{width:"49%"}}>
                    {anInputDisplayer("Company", "aComp", "text", false, undefined, theDep, setTheDeparture, undefined, undefined, "Ex: Darkwing Tours" )}
                </div>
                <div style={{width:"49%"}}>
                    {anInputDisplayer("Contact", "compContact", "text", false, undefined, theDep, setTheDeparture, undefined, undefined, "Ex: Maria Molina")}
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <div style={{width:"49%"}}>
                    {anInputDisplayer("Guest Maximum", "maxPaxNumb", "number", true, undefined, theDep, setTheDeparture, 0, undefined )}
                </div>
                <div style={{width:"49%"}}>
                <input type="submit" className={styles.submitDepBTN}  />
                </div>
            </div>
            </form>
        </div>
        </div>
    </>)
    }
    const guestAdder=(roomingLi)=>{
        let theAdder=0
        roomingLi.forEach(elem=> {
            theAdder = theAdder + elem.guestArr.length
        })
        return(<>{theAdder}</>)
    }
    const depDisplayer=(depArr, theTitle, isActive )=>{
        let allItins =[
            ...fetchedItins, ...LTCItins, ...EcoAndesItins
        ]        
        const currentOPDay=(theDep, dispCntroller)=>{
            let startingDate = new Date(theDep.startingDate)
            let dayIndex =  Math.ceil((toDate.getTime() - startingDate.getTime()) / (1000*3600 *24))
            // check dates to see WTF
            let foundItin = allItins.find(element => (element.id === theDep.itineraryID)||(element._id === theDep.itineraryID))

            if(dispCntroller==="dayTitle"){
                return(<>
                <div> {foundItin?.dayByDay[dayIndex-1].dayTitle}</div>
                </>)
            } else if(dispCntroller==="dayCount"){
                return(<>{dayIndex}</>)
            }
        }

        let depMapper 
        if(isActive){
            depMapper= depArr.map((elem, i)=><React.Fragment key={i}>
            <div className={styles.spaceBetRow}> 
                <div className={styles.depCardFileTab}>
                    {elem.tourCode}
                </div>
                <div/> 
            </div>
            <div className={styles.aDepCard} onClick={()=>{
                let foundItin = allItins.find(element => (element.id === elem.itineraryID)||(element._id === elem.itineraryID))
                setfileSwitch(true)
                setTheDeparture(elem)
                setTheItinerary(foundItin)
            }}>
                <div className={styles.depCardRow}>
                    {currentOPDay(elem, "dayTitle")}
                </div>
                <div className={styles.depCardRow}>
                    <strong>{elem.tripName}</strong>
                    <span>{currentOPDay(elem, "dayCount")}/{elem.duration} days &nbsp; | &nbsp;
                    {guestAdder(elem.roomingList)}/{elem.maxPaxNumb} pax
                    </span>
                </div>
            </div>
        </React.Fragment> )
        } else {
            depMapper = depArr.map((elem, i)=><React.Fragment key={i}>
            <div className={styles.aDepCard} onClick={()=>{
                let allItins =[
                    ...fetchedItins, ...LTCItins, ...EcoAndesItins
                ]
                let foundItin = allItins.find(element => (element.id === elem.itineraryID)||(element._id === elem.itineraryID))
                setfileSwitch(true)
                setTheDeparture(elem)
                setTheItinerary(foundItin)
            }}>
                <div className={styles.spaceBetRow}>
                    <div>
                        {/* {console.log(elem)} */}
                        {elem.tripRef && <>{elem.tripRef}</>}
                    </div>

                    <div >
                        {elem.duration} days from {elem.startingDate}
                    </div>
                </div>
                <strong style={{textTransform:"capitalize" }}> {elem.tripName} </strong>
            </div>
        </React.Fragment> )
        }

        if(depArr.length>0){
        return(<>
            <div className={styles.depCardCont}>
                <div className={styles.spaceBetRow}>
                    <h2> {theTitle} </h2>
                    <span>{depArr.length} departures </span>
                </div>
                <div className={styles.depCardMapper} >  
                    {depMapper}
                </div>
            </div>
        </>)
        }
    }

// ADD FLIGHT EDITOR!!!
    // flights
    const flightsAdderForm=()=>{
        let minDate = new Date(theDeparture.startingDate).toISOString().split("T")[0]
        
        let theDateOpts = []
        for (let i=0; i< parseInt(theDeparture.duration); i++ ){
            theDateOpts.push({
                "dayIndex": i,
                "theDate": addDays(minDate, i+1)
            })
        }
        let aTempGuestArr =[]
        theDeparture.roomingList.forEach(elem=> {
            elem.guestArr.forEach(elemental=>{
                if(elemental.guestName){
                    aTempGuestArr.push(elemental.guestName)
                } else {
                    console.log(`${elemental.guestFName} ${elemental.guestLName} `)
                    let guestName = `${elemental.guestFName} ${elemental.guestLName} `
                    aTempGuestArr.push(guestName)
                }
            })
        })
        return(<>
        <form id="flightAdderForm" onSubmit={(e)=>{
            e.preventDefault();
            // add to flight arr with day index
            let dayIndex= flightObj.dayIndex
            let tempFlightArr=[]
            if(theDeparture.flights[dayIndex]){
                tempFlightArr = [...theDeparture.flights[dayIndex]]
            } 
            tempFlightArr.push(flightObj)
            theDeparture.flights[dayIndex] = tempFlightArr
            setTheDeparture({
                ...theDeparture,
                "flights": theDeparture.flights
            })
            setEditSwitch(false)

        }}>
            <h3> Please add flights here: </h3>
            <div className={styles.spaceBetRow}>                
                <div className={styles.roomEditSwitcher}>
                    <h3>GUEST FLIGHT</h3>
                    <div style={{marginLeft:"33px", display: "flex", alignItems: "center"}}>
                    <FormControlLabel 
                        control={
                        <Switch checked={flightObj.target==="group"}
                        onChange={()=>{
                            if(flightObj.target==="group"){
                                setFlightObj({
                                    ...flightObj,
                                    "target": "client"
                                })
                            } else {
                                setFlightObj({
                                    ...flightObj,
                                    "target": "group"
                                })
                            }
                        }}/>} 
                    />            
                    </div>
                    <h3>GROUP FLIGHT</h3>
                </div>

                {flightObj.target==="client"&& <>
                <div style={{width:"48%", paddingBottom:"12px" }}>
                    <div className={styles.inputLabel}>
                        Select Client
                    </div>
                    <select className={styles.inputUserUI} required name="Flight Target Selector" onChange={(e)=>{
                        setFlightObj({
                            ...flightObj,
                            "clientName":e.target.value
                        })
                    }}>
                        <option disabled>Please select from guests</option>
                        {aTempGuestArr.map((elem,i)=><React.Fragment key={i} >
                            <option value={elem} >{elem} </option>
                        </React.Fragment> )}
                    </select>
                </div>
                </>}

            </div>
            <div className={styles.spaceBetRow}> 
                <div style={{width:"48%" }}> 
                    <div className={styles.inputLabel}>
                        Select Date
                    </div>
                    {theDateOpts&& <> 
                    <select className={styles.inputUserUI} required name="Flight Date Selector" 
                        onChange={(e)=>{
                            // set dayIndex for each flight & Flight Date
                            let parsedVal= JSON.parse(e.target.value)
                            setFlightObj({
                                ...flightObj,
                                "dayIndex":parsedVal.dayIndex,
                                "theDate":parsedVal.theDate,
                            })
                        }}>
                        <option selected disabled > Please pick a date </option>
                        {theDateOpts.map((elem,i)=><React.Fragment key={i}>
                            <option value={JSON.stringify(elem)}> {elem.theDate.toLocaleDateString('en-GB', dateOptions)} </option>
                        </React.Fragment>)}
                    </select>                 
                    </>}
                </div>
                <div style={{width:"48%" }}> 
                    <div className={styles.inputLabel}>
                        Select time
                    </div>
                    <input className={styles.inputUserUI} type="time" onChange={(e)=>{
                        setFlightObj({
                            ...flightObj,
                            "departureTime": e.target.value
                        })
                    }} />
                </div>
            </div>
            <div className={styles.spaceBetRow}> 
                <div style={{width:"48%" }}> 
                    {anInputDisplayer("from", "depLocation", "text", true, false, flightObj, setFlightObj)}
                </div>
                <div style={{width:"48%" }}> 
                    {anInputDisplayer("to", "arriLocation", "text", true, false, flightObj, setFlightObj )}
                </div>
            </div>
            <div className={styles.spaceBetRow}> 
                <div style={{width:"48%" }}> 
                    {anInputDisplayer("Airline", "airline", "text", false, false, flightObj, setFlightObj)}
                </div>
                <div style={{width:"48%" }}> 
                    {anInputDisplayer("flight #", "flightNumb", "text", false, false, flightObj, setFlightObj )}
                </div>
            </div>
            <div className={styles.spaceBetRow}> 
                <div style={{width:"48%" }}> 
                    {anInputDisplayer("Confirmation #", "confNumber", "text", false, false, flightObj, setFlightObj )}
                </div>
                <input 
                    className={styles.roomTypeIndicator} 
                    value={`Add flight`} 
                    type="submit"
                    /> 
            </div>
        </form>
        </>)
    }
    const eachFlight=(flightData, dayFlightArr, flightIndx)=>{
        return(<>
        <span>{flightData.theDate&&<>{new Date(flightData.theDate).toDateString()}</>}</span>
        <div className={styles.spaceBetRow}>
            {editSwitch && <>
                <span style={{ color:"red", cursor:"pointer" }} onClick={()=>{
                    dayFlightArr.splice(flightIndx, 1)
                    setTheDeparture({...theDeparture})
                    setEditSwitch(false)
                }}> <RemoveCircleOutlineIcon/> </span>
            </>}
            <div className={styles.flightDisplayer}>
                <span>{flightData.target==="group"?<><strong>GROUP FLIGHT</strong></>:<>{flightData.clientName}</>}</span>
                <span>{flightData.departureTime&&<><strong>Time:</strong><br/> {flightData.departureTime}</>}</span>                
                <span>{flightData.depLocation&& <><strong>FROM:</strong><br/> {flightData.depLocation}</>}</span>
                <span>{flightData.arriLocation&& <><strong>TO:</strong><br/>{flightData.arriLocation}</>}</span>
                <span>{flightData.airline&& <><strong>airline:</strong><br/>{flightData.airline}</>}</span>
                <span>{flightData.confNumber&& <><strong>confirmation:</strong><br/>{flightData.confNumber}</>}</span>
            </div>
        </div>
        </>)
    }
    const flightsDisp=()=>{
        return(<>
            <div className={styles.spaceBetRow}> 
                <h2>Flights</h2>
                {(session?.user.hierarchy===1 || session?.user.name===theDeparture.assignment)&& <>
                    <div style={{cursor:"pointer", paddingRight: "12px"}} 
                        onClick={()=>{
                        if(editSwitch){setEditSwitch(false)} else {setEditSwitch(true)}
                    }}>
                        {theDeparture.flights.length>0 && <>
                        {editSwitch?<><EditOffIcon/></>:<><EditIcon/></>}
                        </>}
                </div></>}
            </div>
            {theDeparture.flights.length>0? <> 
                {theDeparture.flights.map((elem, i)=> <React.Fragment key={i}>
                    {elem?.length>0 && <> <br/>
                        Day {i+1}:
                        {elem.map((element, i)=><React.Fragment key={i}>
                            {eachFlight(element, elem, i)}
                        </React.Fragment>)}
                    </>}
                </React.Fragment>)}
            </>:<>
                {flightsAdderForm()}
            </>}
        </>)
    }
    ///////////////////////////////////////////
    // expenses
    const optCataloger=(priceChart)=>{
        let priceChartKeyArr = Object.keys(priceChart)
        let optNameArr =[]
        if(priceChartKeyArr.length>0){
            priceChartKeyArr.forEach((elem, i) => {
                optNameArr.push(catalogIndex[elem])
            });
        }
        let optNameArr2=[]
        let priceChartKeyArrTwo=[]
        let dropdownOpts
        let theSecondLevel
        if(priceChartKey){
            theSecondLevel = priceChart[priceChartKey]
            theSecondLevel.forEach((elem, i) => {
                priceChartKeyArrTwo.push(elem?.priceKey)
            });
            theSecondLevel.forEach((elem, i) => {
                optNameArr2.push(elem?.priceDetail)
            });
            dropdownOpts= theSecondLevel.map((elem,i)=><React.Fragment key={i}> 
                <option value={JSON.stringify(elem)}>                 
                {elem?.priceDetail} </option>
            </React.Fragment>)
        }
        return(<>
        {aDropdownPicker(priceChartKeyArr, "Expense Type", false, anExpense, setPriceChartKey, optNameArr)}
        {priceChartKey&& <> 
            <select  className={styles.inputUserUI} onChange={(e)=> {
            let tempObj=JSON.parse(e.target.value)
            if(tempObj.contactName){
                setAnExpense({
                ...tempObj,
                "contactNumb": tempObj.contactNumb,
                })
            } else {
                setAnExpense({
                ...tempObj,
                "contactName": null,
                "contactNumb": 100000,
                })
            }
            }}>
                <option disabled selected > Select Expense Type </option>
                {dropdownOpts}
            </select>
        </>}
        </>)
    } 
    /////////////////////////////////////////
    /////////////////////////////////////////
    // Stats
    const statsDisplayer=(activeDepartures, ghostInside)=>{
        // sum up all current clients in Rooming List
        // = number of active clients.
        // sum active tours

    // summ all guests in rooming list
        let clientGeneralSum = 0
        activeDepartures.forEach((elem)=>{
            elem.roomingList?.forEach((elem)=>{
            clientGeneralSum = clientGeneralSum + elem.guestArr.length
            })
        })

        const eachDataRow=(theDataKey, dataValue)=>{
        return(<>
            <div style={{ display: "flex", justifyContent:"space-between", padding:"2px 3px" }}>
                <span> {theDataKey} </span>
                <span> {dataValue} </span>
            </div>
        </>)
        }
        return(<>
        <div className={styles.statsBar}> 
        {activeDepartures.length>0? <> 
            {eachDataRow("Active Departures:", activeDepartures.length )}
            {eachDataRow("Pax Total:", clientGeneralSum )}



            {/* Weekly responsible contact */}
            {/* List of active deps with links to each??? */}
            {/* what other quick elems can we display? Nationality? */}


        </>:<>
            <div className={styles.placeholderData}> 
            <h3>There are currently</h3>
            <h2><strong> NO DEPARTURES</strong></h2>
            <h3>in operation</h3>
            </div>
        </>}

        </div>
        </>)
    }
    /////////////////////////////////////////
    /////////////////////////////////////////
    // file home
    let paxTotalCount=<>{paxData?.paxTotal} / {theDeparture?.maxPaxNumb} maximum</>
    const aFileHome=(theItin, theDep)=>{
        return(<>
            <div className={styles.spaceBetRow}>
                {(session?.user.hierarchy===1 || session?.user.name===theDep?.assignment)&& <>
                    <div className={styles.editBTN} 
                        onClick={()=>{
                        if(editSwitch){setEditSwitch(false)} else {setEditSwitch(true)}
                    }}>
                        {editSwitch?<><EditOffIcon/></>: <><EditIcon/></>}
                    </div>
                </>}
            </div>
            <div className={styles.detailDispl}>
                {theDep?.assignment&&<>{detailWithTitleDisp("folder Assignment", theDep?.assignment)}</>}
                {theItin?.duration&&<>{detailWithTitleDisp("duration", `${theItin?.duration} Days`)}</>}
                {theItin?.tripLang&&<>{detailWithTitleDisp("trip language", theItin?.tripLang)}</>}
                {theDep?.aComp&&<>{detailWithTitleDisp("company", theDep?.aComp)}</>}
                {theDep?.compContact&&<>{detailWithTitleDisp("contact", theDep?.compContact)}</>}
                {theDep?.tripRef&&<>{detailWithTitleDisp("trip Reference", theDep?.tripRef)}</>}
                {theDep?.maxPaxNumb&&<>{detailWithTitleDisp("guests", paxTotalCount)}</>}
            </div>
            <br/>
            <h2> Tour Dates </h2>
            <div className={styles.spaceBetRow}> 
                <div style={{width: "47%" }}>
                    {aDateDisp("starting date", theDep.startingDate,)}
                </div>
                <div style={{width: "47%" }}>
                    {aDateDisp("Ending date", theDep.startingDate, parseInt(theDep.duration))}
                </div>
            </div>


            {theDep?.departureNotes.length>0 ? <><br/>
            <h2>Departure Notes </h2>
            </> : <> </>}
            {editSwitch?<> <br/>
                <div className={styles.spaceBetRow}>
                    <div style={{width: "40%" }}> 
                        <div className={styles.inputLabel}>
                            Add departure note
                        </div>
                        <div className={styles.inputAndRow}> 
                            <input 
                                className={styles.inputUserUI} 
                                type='text'
                                onChange={(e)=>{
                                    e.preventDefault;
                                    setAddDepartureNote(e.target.value)
                                }}
                                placeholder='Departure Note'
                            />
                            &nbsp;
                            &nbsp;
                            <span onClick={()=>{
                                let gNIndex = theDep.departureNotes.length
                                let theSplicer=theDep.departureNotes.splice(gNIndex, 0, addDepartureNote)
                                setTheDeparture({
                                    ...theDep,
                                })
                            }}>
                                <AddCircleOutlineIcon/> 
                            </span>
                        </div>
                    </div>
                </div>
                <br/>
                <div className={styles.depNotesCont}> 
                    {theDep?.departureNotes?.map((elem, i)=>
                    <React.Fragment key={i}>
                        <div className={styles.eachGuestNote} onClick={()=>{
                            let tempGuestNotes=theDep.departureNotes.splice(i, 1)
                            setTheDeparture({
                                ...theDep
                            })
                        }} >
                            {elem}&nbsp; <RemoveCircleOutlineIcon />
                        </div> &nbsp; &nbsp;
                    </React.Fragment>)
                    }
                </div>
            </> : <>
                <div className={styles.homeNotesDisp}>
                    {theDep?.departureNotes.map((elem, i)=><React.Fragment key={i}>
                        &nbsp; &nbsp; <li>
                           {elem}</li>
                    </React.Fragment>)}
                </div>
                <br/>
            </>}
        </>)
    }
    const aFileHomeEdit=()=>{
        if(editSwitch){return(<>
        <br/><br/>
            <div className={styles.aFileContainer}>
                <div className={styles.spaceBetRow}>
                    <h2 style={{width: "47%" }}>
                        Edit Departure general information
                    </h2>
                    <div style={{cursor:"pointer"}}
                        onClick={()=>{
                            if(editSwitch){setEditSwitch(false)} else {setEditSwitch(true)}
                        }}>
                        <EditOffIcon/>
                    </div>
                </div>
                <br/>
                {session?.user.hierarchy===1&& <>
                <div className={styles.spaceBetRow}>
                    <div style={{width:"47%"}}>
                        <div className={styles.inputLabel}> Assign Folder to: </div>
                        <select className={styles.inputUserUI} onChange={(e)=>{
                            e.preventDefault()
                            setTheDeparture({
                                ...theDeparture,
                                "assignment": e.target.value
                            })
                        }}> 
                            <option disabled selected > Select Folder Operator </option>
                            <option value="Cristina Paez"> Cristina Paez </option>
                            <option value="Carolina Cruz"> Carolina Cruz </option>
                        </select> &nbsp;
                    </div>
                </div>
                </>}
                <div className={styles.spaceBetRow} >
                    <div style={{width: "47%" }}>
                        <div className={styles.inputLabel}>
                            Set departure status
                        </div>
                        <select className={styles.inputUserUI} onChange={(e)=>{
                            e.preventDefault()
                            setTheDeparture({
                                ...theDeparture,
                                "saleProcess": e.target.value
                            })
                        }} >
                            <option disabled selected > Select Status </option>
                                <option value="onSale"> On Sale</option>
                                <option value="reserved"> Reserved</option>
                                <option value="confirmed"> Confirmed</option>
                                <option value="running"> Running</option>
                        </select>
                    </div>

                    {departureStatusDisp(theDeparture)}
                
                </div>
                <div className={styles.spaceBetRow}>
                    <div style={{width: "47%" }}>
                        {anInputDisplayer("starting Date", "startingDate", "date", false, theDeparture.startingDate, theDeparture, setTheDeparture )}
                    </div> 
                    <div style={{width: "47%" }}>
                        {aDateDisp("Departure Date", theDeparture.startingDate, theDeparture.duration )}
                    </div> 
                </div>
                <div className={styles.spaceBetRow}>
                    <div style={{width: "47%" }}>
                        {anInputDisplayer("Guest Maximum", "maxPaxNumb", "number", false, theDeparture.maxPaxNumb, theDeparture, setTheDeparture, 0 )}
                    </div> 
                    <div style={{width: "47%" }}>
                        <div className={styles.eachDateCont}>
                            <div className={styles.eachDetailTitle}>
                                Guest Maximum
                            </div>
                            {paxTotalCount}
                        </div>
                    </div> 
                </div>
                <div className={styles.spaceBetRow}>
                    <div style={{width:"49%"}}>
                        {anInputDisplayer("Tour Code", "tourCode", "text", true, theDeparture.tourCode, theDeparture, setTheDeparture, )}
                    </div>
                    <div style={{width:"49%"}}>
                        {anInputDisplayer("reference", "tripRef", "text", true, theDeparture.tripRef, theDeparture, setTheDeparture, )}
                    </div>
                </div>
                <div className={styles.spaceBetRow}>
                    <div style={{width:"49%"}}>
                        {anInputDisplayer("Company", "aComp", "text", true, theDeparture.aComp, theDeparture, setTheDeparture, )}
                    </div>
                    <div style={{width:"49%"}}>
                        {anInputDisplayer("Contact", "compContact", "text", true, theDeparture.compContact, theDeparture, setTheDeparture, )}
                    </div>
                </div>
            </div>
        </>)
        }
    }
    const roomingListDisp=(theDep)=>{
        const ageConverter=(theDOB)=>{
            if(theDOB){
                let clientDOB=new Date(theDOB)
                return toDate.getUTCFullYear() - clientDOB.getUTCFullYear()
            }
        }
        let eachNote=[]
        let bootArr=[]

        const genderConverter=(theGender)=>{
            switch(theGender){
                case "male":
                return(<>Mr.</>);
                case "female":
                return(<>Mrs.</>);
            }
        }

        const eachGuestData=(guestData)=>{
            if(guestData.guestNotes.length>0){
                if(guestData.guestFName || guestData.guestLName  ){
                    let guestName = `${guestData.guestFName} ${guestData.guestLName} `
                    eachNote.push({
                        "name":guestName,
                        "notes":guestData.guestNotes
                    })
                    
                } else {
                    eachNote.push({
                        "name":guestData.guestFName,
                        "notes":guestData.guestNotes
                    })
                }
            }

            if(guestData.bootSize){
                if(guestData.guestFName || guestData.guestLName ){
                    let guestName = `${guestData.guestFName} ${guestData.guestLName} `
                    bootArr.push({
                        "name":guestName,
                        "bootSize":guestData.bootSize
                    })
                } else {
                    bootArr.push({
                        "name":guestData.guestName,
                        "bootSize":guestData.bootSize
                    })
                }
            }
            return(<>
                <div className={styles.roomingGuestRow}>
                    <div style={{width:"180px", textAlign:"start"}}> &nbsp;{genderConverter(guestData.gender)}  {guestData.guestName} {guestData.guestFName} {guestData.guestLName}</div>
                    <div onClick={()=>setGuestPopUpData(guestData)} className={styles.guestPopUpIcon} >
                        <AddCommentIcon/>   
                    </div>
                    <div style={{width:"120px", borderLeft:"solid 1px black" }}> {guestData.nationality}</div>
                    <div style={{width:"100px", borderLeft:"solid 1px black" }}> {guestData.guestDOB}</div>
                    <div style={{width:"120px", borderLeft:"solid 1px black" }}> {guestData.passport}</div>
                    <div style={{width:"66px", borderLeft:"solid 1px black" }}> {guestData.guestDOB&&<>{ageConverter(guestData.guestDOB)}</>}</div>
                </div>
                    <Dialog open={guestPopUpData} onClose={()=>setGuestPopUpData(false) } maxWidth={"xl"} >  
                    <div className={styles.guestDataDialog}>
                        <div >
                            <strong>Guest Name:  </strong>{genderConverter(guestPopUpData.gender)}  {guestPopUpData.guestName} {guestPopUpData.guestFName} {guestPopUpData.guestLName} </div>
                        <div >
                            <strong>Nationality </strong> {guestPopUpData.nationality}</div>
                        <div >
                            <strong>DOB: </strong> {guestPopUpData.guestDOB}</div>
                        <div >
                            <strong>Passport </strong> {guestPopUpData.passport}</div>
                        <div >
                            <strong>Age: </strong> {guestPopUpData.guestDOB&&<>{ageConverter(guestData.guestDOB)}</>}</div>
                    </div>
                    </Dialog>
            </>)
        }
        
        if(theDep){
        let eachRoom=theDep.roomingList.map((elem, i)=>
        <React.Fragment key={i}>
            {!elem?.tourLeader&&<>
            <div className={styles.eachRoomDisplayer}>

            {editSwitch&&<>
                <div className={styles.editRoomingIcon} onClick={()=>{
                    setTempRoomObj(elem)
                    setRoomingEditIndex(i)
                    setAddGuest(false)
                    setAddGuestTrig(true)
                    window.scrollTo({
                        top: 33000,
                        behavior: "smooth",
                    });
                }}>
                <EditIcon />
                </div>
                <div className={styles.deleteARoomIcon} onClick={()=>{
                    let tempRooming = [...theDep.roomingList]
                    tempRooming.splice(i,1)
                    setTheDeparture({
                        ...theDep,
                        "roomingList":tempRooming
                    })
                }}>
                <RemoveCircleOutlineIcon />
                </div>
            </>}
            <div style={{width:"33px"}}> {i+1} </div>
                <div className={styles.aRoomingDetail} style={{width:"108px", borderLeft:"solid 1px black"}}>
                    {elem?.singleSupp &&<>
                    {theLang==="english"? <>
                        SINGLE
                    </>: theLang==="espanol" && <>
                        SENCILLA
                    </>}
                    </>}
                    {elem?.accomodationType!="single" && <>
                        {elem?.accomodationType}
                    </>}
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                    {elem?.guestArr.map((guestElem, i)=> <> {eachGuestData(guestElem)}</> ) }
                </div>
            </div>
        </>}
        </React.Fragment>)
        let noteDisp
        if(eachNote.length>0){
        noteDisp=eachNote.map((elem,i)=><React.Fragment key={i}> 
            {elem?.notes.length>0&&<>
            <div className={styles.eachRoomDisplayer}>
                <span style={{width:"180px", textAlign:"start"}}>&nbsp;{elem?.name}</span>
                <span style={{borderLeft:"solid 1px black", textTransform:"capitalize", textAlign:"start", padding:"0 3px" }}> &nbsp;
                {elem?.notes.map((elem,i)=><React.Fragment key={i}>{i>0&&<>, </>} {elem}</React.Fragment>)}
                </span>
            </div>
            </>}
        </React.Fragment> )
        }
        let bootDisp
        if(bootArr.length>0){
        bootDisp=bootArr.map((elem,i)=><React.Fragment key={i}> 
            <div className={styles.eachRoomDisplayer}>
                <span style={{width:"180px", textAlign:"start"}}>&nbsp;{elem?.name}</span>
                <span style={{borderLeft:"solid 1px black", textTransform:"capitalize", textAlign:"start", padding:"0 3px" }}> &nbsp;{elem?.bootSize}</span>
            </div>
        </React.Fragment> )
        }
        let eachTLRoom=theDep.tourLeader?.map((elemTL, i)=><React.Fragment key={i}>
            <div className={styles.eachRoomDisplayer}>
            {editSwitch&&<>
                <div className={styles.editRoomingIcon} onClick={()=>{
                    // setTempRoomObj(theDep.tourLeader[i])
                    setEditTLTrig(true)
                    setRoomingEditIndex(i)
                    setTempRoomObj(elemTL)
                }}> 
                <EditIcon />
                </div>
                <div className={styles.deleteARoomIcon} onClick={()=>{
                    let tempTLArr = theDep.tourLeader.splice(i,1)
                        setTheDeparture({
                            ...theDep,
                            "tourLeader": theDep.tourLeader
                        })
                    }}>
                    <RemoveCircleOutlineIcon />
                </div>
            </>}
                <div style={{width:"33px"}}> TL </div>
                <div className={styles.aRoomingDetail} style={{width:"108px", borderLeft:"solid 1px black"}}>
                    {theLang==="english"? <>
                        SINGLE
                    </>: theLang==="espanol" && <>
                        SENCILLA
                    </>}
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                    {elemTL.guestArr?.map((guestElem, i)=> <React.Fragment key={i}>
                        {eachGuestData(guestElem)}
                    </React.Fragment>)}
                </div>
            </div>
            {elemTL.guestArr[0].guestNotes.length>0 &&  <>
                <div className={styles.eachRoomDisplayer}>
                    <span style={{textTransform:"capitalize"}}>
                    <strong>
                    {theLang==="english"? <>
                        NOTES:
                    </>: theLang==="espanol" && <>
                        NOTASÑ
                    </>}
                    </strong> &nbsp;
                    {elemTL.guestArr[0].guestNotes.map((theNote,i)=><React.Fragment key={i}>{i>0&&<>,</>} {theNote}</React.Fragment>)}
                    </span>
                </div>
            </>}
            {elemTL.guestArr[0].bootSize&&<>
                <div className={styles.eachRoomDisplayer}>
                    <span style={{textTransform:"capitalize"}}>
                    <strong>
                    {theLang==="english"? <>
                        BOOT SIZE:
                    </>: theLang==="espanol" && <>
                        TAMAÑO BOTAS
                    </>}
                    </strong> &nbsp;
                    {elemTL.guestArr[0].bootSize}
                    </span>
                </div>
            </>}
        </React.Fragment>)

        /////////////////
        return(<>
        <div className={styles.roomingListCont}>
            {/* rooming */}
            {documentDispTrigs.roomingList&&<> 
            <div className={styles.spaceBetRow}>             
                <h2> 
                    {theLang==="english"? <>
                        Rooming List
                    </>: theLang==="espanol" && <>
                        Lista de Acomodacion & Huespedes
                    </>}
                </h2>
                {/* edit data */}
                {!documentGenerator&&<>
                    {editSwitch&& <> 
                        <div style={{cursor:"pointer", paddingRight: "33px"}}  onClick={()=>{
                            setAddGuest(true)
                            window.scrollTo({
                                top: 2000,
                                behavior: "smooth",
                            });
                        }}> <AddCircleOutlineIcon /></div>
                    </>}
                    {(session?.user.hierarchy===1 || session?.user.name===theDep.assignment)&&<> 
                        <div className={styles.editSwitchA}  onClick={()=>{
                            if(editSwitch){setEditSwitch(false); setTempRoomObj({}); setAddGuest(false); setTLObj(false)} else {setEditSwitch(true)}
                        }}>
                            {editSwitch? <><EditOffIcon/></>: <><EditIcon/></>}
                        </div>
                    </>}
                </>}
            </div>
            {paxData&&<><div className={styles.guestTotal}>{paxData.paxTotal}&nbsp; 
                {theLang==="english"? <>
                    guest{paxData.paxTotal>1&&<>s</>}
                </>: theLang==="espanol" && <>
                    huesped{paxData.paxTotal>1&&<>es</>}
                </>}
                {theDep?.tourLeader.length>0 && <> 
                    {" "} + {theDep?.tourLeader?.length} TL </>}
                </div></>} 
            {roomingSummaryDisp()}

            <div className={styles.roomingListGrid}>
                {paxData.paxTotal>0 && <>
                <div className={styles.roomingListKEYS}>
                    <div style={{width:"33px"}}> # </div>
                    <div style={{width:"108px", borderLeft:"solid 1px black"}}>
                    {theLang==="english"? <>
                        ROOM TYPE
                    </>: theLang==="espanol" && <>
                        TIPO HAB.
                    </>}
                    </div>
                    <div style={{width:"180px", borderLeft:"solid 1px black", textAlign:"start" }}>&nbsp;&nbsp;
                    {theLang==="english"? <>
                        GUEST NAME 
                    </>: theLang==="espanol" && <>
                        NOMBRE HUESPED
                    </>}
                    </div>
                    <div style={{width:"120px", borderLeft:"solid 1px black" }}> 
                    {theLang==="english"? <>
                        NATIONALITY 
                    </>: theLang==="espanol" && <>
                        NACIONALIDAD
                    </>}
                    </div>
                    <div style={{width:"100px", borderLeft:"solid 1px black" }}> 
                    {theLang==="english"? <>
                        D.O.B. 
                    </>: theLang==="espanol" && <>
                        F. NACI
                    </>}
                    </div>
                    <div style={{width:"120px", borderLeft:"solid 1px black" }}> 
                    {theLang==="english"? <>
                        PASSPORT 
                    </>: theLang==="espanol" && <>
                        PASAPORTE
                    </>}
                    </div>
                    <div style={{width:"66px", borderLeft:"solid 1px black" }}> 
                    {theLang==="english"? <>
                        AGE 
                    </>: theLang==="espanol" && <>
                        EDAD
                    </>}
                    </div>
                </div>
                </>}
                {eachRoom}

                {/* Tour Leader Add & Data */}
                {theDep.tourLeader.length>0&& <>
                    <h4>Tour Leader</h4>
                    {eachTLRoom}                   
                </>}
            </div>
            {editSwitch && <>
                <div className={styles.spaceBetRow}>
                    <span className={styles.inputLabel} style={{marginTop:"18px", marginBottom:"6px", cursor:'pointer' }} onClick={()=>{
                        setTLObj(aRoomModel)
                        window.scrollTo({
                            top: 33000,
                            behavior: "smooth",
                        });
                    }} > Add Tour Leader &nbsp; <AddCircleOutlineIcon /> </span>
                </div>
            </>}
            </>}

            {/* guest Notes */}
            {documentDispTrigs.guestNotes&&<>
            
            {eachNote.length>0&&<>
                <h2>
                    {theLang==="english"? <>
                        Guest Notes 
                    </>: theLang==="espanol" && <>
                        Notas de Huespedes
                    </>}
                </h2>
                <div className={styles.roomingListGrid}>
                <div className={styles.roomingListKEYS}>
                    <div style={{width:"180px", textAlign:"start" }}>&nbsp; &nbsp;
                        {theLang==="english"? <>
                        GUEST NAME 
                    </>: theLang==="espanol" && <>
                        Nombre huesped
                    </>}
                    </div>
                    <div style={{borderLeft:"solid 1px black" }}>&nbsp; &nbsp;
                        {theLang==="english"? <>
                        SPECIAL INDICATIONS 
                    </>: theLang==="espanol" && <>
                        Indicaciones especiales
                    </>}
                    </div>
                </div>
                    {noteDisp}
                </div>
            </>}</>}

            {/* boot Size */}
            {documentDispTrigs.bootSizes&&<>
            {bootArr.length>0&&<>
                <h2>
                {theLang==="english"? <>
                    Guest Boot sizes 
                </>: theLang==="espanol" && <>
                    Tamaño botas huespedes
                </>}
                </h2>
                <div className={styles.roomingListGrid}>
                <div className={styles.roomingListKEYS}>
                    <div style={{width:"180px", textAlign:"start" }}>&nbsp; &nbsp;
                    {theLang==="english"? <>
                        GUEST NAME 
                    </>: theLang==="espanol" && <>
                        Nombre huesped
                    </>}
                    </div>
                    <div style={{borderLeft:"solid 1px black" }}>&nbsp; &nbsp;
                    {theLang==="english"? <>
                        Boot Size 
                    </>: theLang==="espanol" && <>
                        tamaño botas
                    </>}
                    </div>
                </div>
                    {bootDisp}
                </div>
            </>}</>}


            {theDep.departureNotes.length>0 ? <>
            <h2>
                {theLang==="english"? <>
                    Departure Notes 
                </>: theLang==="espanol" && <>
                    Notas de salida
                </>}
            </h2>
            </> : <> </>}
            {editSwitch?<> <br/>
                <div className={styles.spaceBetRow}>
                    <div style={{width: "40%" }}> 
                        <div className={styles.inputLabel}>
                            Add departure note
                        </div>
                        <div className={styles.inputAndRow}> 
                            <input 
                                className={styles.inputUserUI} 
                                type='text'
                                onChange={(e)=>{
                                    e.preventDefault;
                                    setAddDepartureNote(e.target.value)
                                }}
                                placeholder='Departure Note'
                            />
                            &nbsp;
                            &nbsp;
                            <span onClick={()=>{
                                let gNIndex = theDep.departureNotes.length
                                let theSplicer=theDep.departureNotes.splice(gNIndex, 0, addDepartureNote)
                                setTheDeparture({
                                    ...theDep,
                                })
                            }}>
                                <AddCircleOutlineIcon/> 
                            </span>
                        </div>
                    </div>
                </div>
                <br/>
                <div className={styles.depNotesCont}> 
                    {theDep.departureNotes?.map((elem, i)=><React.Fragment key={i}>
                        <div className={styles.eachGuestNote} onClick={()=>{
                            let tempGuestNotes=theDep.departureNotes.splice(i, 1)
                            setTheDeparture({
                                ...theDep
                            })
                        }} >
                            {elem}&nbsp; <RemoveCircleOutlineIcon />
                        </div> &nbsp; &nbsp;
                    </React.Fragment>)}
                </div>
            </> : <>
                <div className={styles.depNotesCont}>
                    {theDep.departureNotes.map((elem, i)=><React.Fragment key={i}>
                        <li style={{textTransform:"capitalize"}}>
                            {elem} 
                        </li> &nbsp; &nbsp; &nbsp; &nbsp;
                    </React.Fragment>)}
                </div>
                <br/>
            </>}

        </div>
        </>)
        }
    }
    const roomingListEdit=(isTL, roomIndexz)=>{
        let sourceArr
        if(isTL){
            sourceArr=theDeparture.tourLeader
        } else {
            sourceArr=theDeparture.roomingList
        }

        // add rooms and guests
        let eachGuestForm
        if(roomIndexz>=0){
        eachGuestForm= sourceArr[roomIndexz].guestArr.map((eachGuestElm,i)=><React.Fragment key={i}>
            <div className={styles.eachGuestTitleEdit}>
                <h4>Edit {isTL?<>Tour Leader</>:<>guest</> }  #{i+1}</h4>
                <span onClick={()=>{
                    let tempGuestArr = [...sourceArr[roomIndexz].guestArr]                    
                    tempGuestArr.splice(i, 1)
                    if(tempGuestArr.length===3){
                        let roomUpdate=
                        {
                            ...sourceArr[roomIndexz],
                            "guestArr":tempGuestArr,
                            "accomodationType": "triple",
                        }
                        let tempRoomiDoobie=sourceArr.splice(roomIndexz,1, roomUpdate)
                        setTheDeparture({
                        ...theDeparture,
                        })
                    } else if (tempGuestArr.length===2){
                        let roomUpdate=
                            {
                                ...sourceArr[roomIndexz],
                                "guestArr":tempGuestArr,
                                "accomodationType": "twin",
                            }
                        let tempRoomiDoobie=sourceArr.splice(roomIndexz,1, roomUpdate)
                        setTheDeparture({
                            ...theDeparture,
                        })
                    } else if (tempGuestArr.length===1){
                        let roomUpdate=
                            {
                                ...sourceArr[roomIndexz],
                                "guestArr":tempGuestArr,
                                "accomodationType": null,
                                "singleSupp": true,
                            }
                        let tempRoomiDoobie=sourceArr.splice(roomIndexz,1, roomUpdate)
                        setTheDeparture({
                            ...theDeparture,
                        })
                    }
                }} > <RemoveCircleOutlineIcon/></span>
            </div>
            <div className={styles.spaceBetRow}>
                {eachGuestElm.guestName? <>
                    <div style={{width: "47%" }}> 
                        <div className={styles.inputLabel}>
                            Guest Name
                        </div>
                        <input 
                            className={styles.inputUserUI}
                            placeholder={eachGuestElm.guestName}
                            onChange={(e)=>{
                                let tempGuestObj={
                                    ...eachGuestElm,
                                    "guestName": e.target.value
                                }
                                let tempRoomUpdater = sourceArr[roomIndexz].guestArr.splice(i,1,tempGuestObj)
                                setTheDeparture({
                                    ...theDeparture,
                                })
                            }}
                            type='text'
                        />
                    </div>
                </>:<>
                    <div className={styles.spaceBetRow} style={{width: "47%" }}>
                        <div style={{width: "47%" }}>
                            <div className={styles.inputLabel}>
                                First Name
                            </div>
                            <input 
                                className={styles.inputUserUI}
                                placeholder={eachGuestElm.guestFName}
                                onChange={(e)=>{
                                    let tempGuestObj={
                                        ...eachGuestElm,
                                        "guestFName": e.target.value
                                    }
                                    let tempRoomUpdater = sourceArr[roomIndexz].guestArr.splice(i,1,tempGuestObj)
                                    setTheDeparture({
                                        ...theDeparture,
                                    })
                                }}
                                type='text'
                            />
                        </div>
                        <div style={{width: "47%" }}>
                            <div className={styles.inputLabel}>
                                Last Name
                            </div>
                            <input 
                                className={styles.inputUserUI}
                                placeholder={eachGuestElm.guestLName}
                                onChange={(e)=>{
                                    let tempGuestObj={
                                        ...eachGuestElm,
                                        "guestLName": e.target.value
                                    }
                                    let tempRoomUpdater = sourceArr[roomIndexz].guestArr.splice(i,1,tempGuestObj)
                                    setTheDeparture({
                                        ...theDeparture,
                                    })
                                }}
                                type='text'
                            />
                        </div>
                    </div>
                
                </>}
                <div style={{width: "47%" }}> 
                    <div className={styles.inputLabel}>
                        Nationality
                    </div>

                    <select className={styles.inputUserUI} onChange={(e)=>{
                        let tempGuestObj={
                            ...eachGuestElm,
                            "nationality": e.target.value
                        }
                        let tempRoomUpdater = sourceArr[roomIndexz].guestArr.splice(i,1,tempGuestObj)
                        setTheDeparture({
                            ...theDeparture,
                        })
                    }}>
                        <option disabled selected > {eachGuestElm.nationality} </option>
                        <option value={"Netherlands"} >Netherlands </option>
                        <option value={"United States"} >United States </option>
                        <option value={"Sweden"} >Sweden </option>
                        <option value={"Germany"} >Germany </option>
                        <option value={"Ecuador"} >Ecuador </option>
                        <option disabled>-------------- </option>
                        <option disabled>-------------- </option>
                        {WorldCountryList.map((elem,i)=> <React.Fragment key={i}>
                            <option value={elem} >{elem} </option>
                        </React.Fragment> )}
                    </select>
                </div>
            </div>
            &nbsp;
            <div className={styles.spaceBetRow}>
                <div className={styles.spaceBetRow} style={{width: "47%" }}>
                    <div style={{width:"30%"}}>
                        <div className={styles.inputLabel}>
                            Gender
                        </div>
                        <select className={styles.inputUserUI} onChange={(e)=>{
                            let tempGuestObj={
                                ...eachGuestElm,
                                "gender": e.target.value
                            }
                            let tempRoomUpdater = sourceArr[roomIndexz].guestArr.splice(i,1,tempGuestObj)
                            setTheDeparture({
                                ...theDeparture,
                            })
                        }} >
                            <option disabled selected > Gender</option>
                            <option value={"male"} >Male </option>
                            <option value={"female"} >Female </option>
                            <option value={"notListed"} >Gender Not Listed </option>
                            <option value={"notSay"} >Prefer not say </option>
                        </select>
                    </div>
                    <div style={{width:"65%"}}>
                        <div className={styles.inputLabel}>
                            Passport
                        </div>
                        <input 
                            className={styles.inputUserUI}
                            placeholder="Passport"
                            onChange={(e)=>{
                                let tempGuestObj={
                                    ...eachGuestElm,
                                    "passport": e.target.value
                                }
                                let tempRoomUpdater = sourceArr[roomIndexz].guestArr.splice(i,1,tempGuestObj)
                                setTheDeparture({
                                    ...theDeparture,
                                })
                            }}
                            type='text'
                        />
                    </div>
                </div>  

                <div className={styles.spaceBetRow} style={{width: "47%" }}>
                    <div style={{width:"49%"}}>
                        <div className={styles.inputLabel}>
                            Pass. Expiration
                        </div>
                        <input 
                            className={styles.inputUserUI}
                            onChange={(e)=>{
                                let tempGuestObj={
                                    ...eachGuestElm,
                                    "passportExpiration": e.target.value
                                }
                                let tempRoomUpdater = sourceArr[roomIndexz].guestArr.splice(i,1,tempGuestObj)
                                setTheDeparture({
                                    ...theDeparture,
                                })
                            }}
                            type='date'
                        />
                    </div>
                    <div style={{width:"49%"}}>
                        <div className={styles.inputLabel}>
                            DOB - {eachGuestElm.guestDOB}
                        </div>
                        <input 
                            className={styles.inputUserUI}
                            onChange={(e)=>{
                                let tempGuestObj={
                                    ...eachGuestElm,
                                    "guestDOB": e.target.value
                                }
                                let tempRoomUpdater = sourceArr[roomIndexz].guestArr.splice(i,1,tempGuestObj)
                                setTheDeparture({
                                    ...theDeparture,
                                })
                            }}
                            type='date'
                        />
                    </div>
                </div>
            </div>
            &nbsp;
            <div className={styles.spaceBetRow}>
                <div style={{width: "40%" }}> 
                    <div className={styles.inputLabel}>
                        Add note
                    </div>
                    <div className={styles.inputAndRow}> 
                        <input 
                            className={styles.inputUserUI} 
                            type='text'
                            onChange={(e)=>{
                                e.preventDefault;
                                setAddGuestNote(e.target.value)
                            }}
                            placeholder='A Note'
                        />
                        &nbsp;
                        &nbsp;
                        <span onClick={()=>{
                            let gNIndex = eachGuestElm.guestNotes.length
                            let theSplicer=eachGuestElm.guestNotes.splice(gNIndex, 0, addGuestNote)
                            setTheDeparture({
                                ...theDeparture,
                            })
                        }}>
                            <AddCircleOutlineIcon/> 
                        </span>
                    </div>
                </div>
                <div style={{width: "47%" }}> 
                    <div className={styles.inputLabel}>
                        Boot size
                    </div>
                    <div className={styles.inputAndRow}> 
                        <input 
                            className={styles.inputUserUI} 
                            type='number'
                            onChange={(e)=>{
                                let tempGuestObj={
                                    ...eachGuestElm,
                                    "bootSize": e.target.value
                                }
                                let tempRoomUpdater = sourceArr[roomIndexz].guestArr.splice(i,1,tempGuestObj)
                                setTheDeparture({
                                    ...theDeparture,
                                })
                            }}
                            placeholder='Ex: 42'
                            min={0}
                            max={50}
                        />
                    </div>
                </div>

            </div>
            &nbsp;
            {eachGuestElm.guestNotes?.length>0&&<>
                <div className={styles.guestNotesCont}>
                {eachGuestElm.guestNotes.map((theNote, i)=> <React.Fragment key={i}> <div className={styles.eachGuestNote} onClick={()=>{
                    let tempGuestNotes=eachGuestElm.guestNotes.splice(i, 1)
                    setTheDeparture({
                        ...theDeparture
                    })
                }}>
                    {theNote} &nbsp; <RemoveCircleOutlineIcon /></div> &nbsp; &nbsp;
                </React.Fragment> )}
                </div>
            </>}
            <div className={styles.roomTypeIndicator} onClick={()=>{
                let newGuestObj={
                    "guestName": String,
                    "guestDOB": String,
                    "guestID": String,
                    "guestNotes": [],
                    "passport": String,
                    "nationality": String,
                    "sex": String
                }
                let tempGuestArr= sourceArr[roomIndexz].guestArr.concat(newGuestObj)
                let tempRoom
                if(sourceArr[roomIndexz].accomodationType==="single" || sourceArr[roomIndexz].accomodationType===null){
                    tempRoom={
                        ...sourceArr[roomIndexz],
                        "accomodationType":"twin",
                        "singleSupp":false,
                        "guestArr":tempGuestArr
                    }
                } else if(sourceArr[roomIndexz].accomodationType==="twin" || sourceArr[roomIndexz].accomodationType==="matrimonial"){
                    tempRoom={
                        ...sourceArr[roomIndexz],
                        "accomodationType":"triple",
                        "singleSupp":false,
                        "guestArr":tempGuestArr
                    }
                }

                let splicerFunc=sourceArr.splice(roomIndexz, 1, tempRoom)
                setTheDeparture({
                    ...theDeparture
                })
            }} >
            ADD GUEST &nbsp; <AddCircleOutlineIcon/> 
            </div>
        </React.Fragment> )
        }
        let switchController
        let acoomType= sourceArr[roomIndexz].accomodationType
        if(acoomType==="twin"){
            switchController=false
        } else if (acoomType==="matrimonial"){
            switchController=true
        }
        let roomTypeUTIL;
        const handleChange=()=>{
            if (switchController) {
                roomTypeUTIL = "twin"
            } else {
                roomTypeUTIL = "matrimonial"
            }
            let tempRoomObj={
                ...sourceArr[roomIndexz],
                "accomodationType": roomTypeUTIL
            }
            let tempRoomUpdater = sourceArr.splice(roomIndexz,1,tempRoomObj)
            setTheDeparture({
                ...theDeparture,
            })
        }

        return(<>
        <br/><br/>
            <div className={styles.aFileContainer}>
                <div className={styles.spaceBetRow}>
                    <h2>Edit {isTL&&<>Tour Leader </>} room # {roomIndexz+1}:</h2>
                    <div style={{cursor:"pointer"}} onClick={()=>{
                        editOffFunction()
                    }} >
                        <EditOffIcon/>
                    </div>
                </div>
                {(acoomType==="twin" || acoomType==="matrimonial")?<>
                    <div className={styles.roomEditSwitcher}>
                        <h3>TWIN</h3>
                        <div style={{marginLeft:"33px", display: "flex", alignItems: "center"}}>
                        <FormControlLabel 
                            control={
                            <Switch checked={switchController}
                            onChange={handleChange} />} 
                        />            
                        </div>
                        <h3>MATRIMONIAL</h3>
                    </div>
                </>:<>
                <div className={styles.spaceBetRow}>
                    <span></span> 
                    <div className={styles.roomTypeIndicator}> 
                        {sourceArr[roomIndexz].accomodationType}
                    </div>
                </div>
                </>}
                {eachGuestForm}
            </div>
        </>)
    }
    const addGuestCont=(isTL)=>{
        const guestForm=(guestIndex)=>{
            return(<>
                <div className={styles.aLineSeparator}/> <br/>
                <h2>{isTL? <> 
                    Tour Leader
                </>:<>
                    Guest {guestIndex +1}
                </>}</h2> <br/>
                <div className={styles.spaceBetRow}>
                    <div className={styles.spaceBetRow} style={{width: "47%" }}>
                        <div style={{width: "48%" }}>
                            <div className={styles.inputLabel}>
                                First Name:                            
                            </div>
                            <input 
                                className={styles.inputUserUI}
                                placeholder="Guest Name"
                                onChange={(e)=>{
                                    if(isTL){
                                        let tempTLObj={
                                            ...addTLObj.guestArr[0],
                                            "guestFName": e.target.value
                                        }
                                        let roomUpdater = addTLObj.guestArr.splice(0,1,tempTLObj)
                                        setTLObj({
                                            ...addTLObj
                                        })
                                    } else {
                                        let tempGuestObj={
                                            ...newRoomObj.guestArr[guestIndex],
                                            "guestFName": e.target.value
                                        }
                                        let tempRoomUpdater = newRoomObj.guestArr.splice(guestIndex,1,tempGuestObj)
                                        setRoomObj({
                                            ...newRoomObj,
                                        })
                                    }
                                }}
                                type='text'
                            />
                        </div>
                        <div style={{width: "48%" }}>
                            <div className={styles.inputLabel}>
                                {isTL? <> 
                                    Last Name:                            
                                </>:<>
                                    Last Name:
                                </>}
                            </div>
                            <input 
                                className={styles.inputUserUI}
                                placeholder="Guest Name"
                                onChange={(e)=>{
                                    if(isTL){
                                        let tempTLObj={
                                            ...addTLObj.guestArr[0],
                                            "guestLName": e.target.value
                                        }
                                        let roomUpdater = addTLObj.guestArr.splice(0,1,tempTLObj)
                                        setTLObj({
                                            ...addTLObj
                                        })
                                    } else {
                                        let tempGuestObj={
                                            ...newRoomObj.guestArr[guestIndex],
                                            "guestLName": e.target.value
                                        }
                                        let tempRoomUpdater = newRoomObj.guestArr.splice(guestIndex,1,tempGuestObj)
                                        setRoomObj({
                                            ...newRoomObj,
                                        })
                                    }
                                }}
                                type='text'
                            />
                        </div>
                    </div>
                    <div style={{width: "47%" }}> 
                        <div className={styles.inputLabel}>
                            Nationality
                        </div>

                        <select className={styles.inputUserUI} onChange={(e)=>{
                                if(isTL){
                                    let tempTLObj={
                                        ...addTLObj.guestArr[0],
                                        "nationality": e.target.value
                                    }
                                    let roomUpdater = addTLObj.guestArr.splice(0,1,tempTLObj)
                                    setTLObj({
                                        ...addTLObj
                                    })
                                }else{
                                    let tempGuestObj={
                                        ...newRoomObj.guestArr[guestIndex],
                                        "nationality": e.target.value
                                    }
                                    let tempRoomUpdater = newRoomObj.guestArr.splice(guestIndex,1,tempGuestObj)
                                    setRoomObj({
                                        ...newRoomObj,
                                    })
                                }
                            }} >
                            <option disabled selected > Select Country </option>
                            <option value={"Netherlands"} >Netherlands </option>
                            <option value={"United States"} >United States </option>
                            <option value={"Sweden"} >Sweden </option>
                            <option value={"Germany"} >Germany </option>
                            <option value={"Ecuador"} >Ecuador </option>
                            <option disabled>-------------- </option>
                            <option disabled>-------------- </option>
                            {WorldCountryList.map((elem,i)=> <React.Fragment key={i}>
                                <option value={elem} >{elem} </option>
                            </React.Fragment> )}
                        </select>
                    </div>
                </div>
                &nbsp;
                <div className={styles.spaceBetRow}>
                    <div className={styles.spaceBetRow} style={{width: "47%" }}>
                        <div style={{width:"30%"}}>
                            <div className={styles.inputLabel}>
                                Gender
                            </div>
                            <select className={styles.inputUserUI} onChange={(e)=>{
                                if(isTL){
                                    let tempTLObj={
                                        ...addTLObj.guestArr[0],
                                        "gender": e.target.value
                                    }
                                    let roomUpdater = addTLObj.guestArr.splice(0,1,tempTLObj)
                                    setTLObj({
                                        ...addTLObj
                                    })
                                }else{
                                    let tempGuestObj={
                                        ...newRoomObj.guestArr[guestIndex],
                                        "gender": e.target.value
                                    }
                                    let tempRoomUpdater = newRoomObj.guestArr.splice(guestIndex,1,tempGuestObj)
                                    setRoomObj({
                                        ...newRoomObj,
                                    })
                                }
                            }} >
                                <option disabled selected > Gender</option>
                                <option value={"male"} >Male </option>
                                <option value={"female"} >Female </option>
                                <option value={"notListed"} >Gender Not Listed </option>
                                <option value={"notSay"} >Prefer not say </option>
                            </select>
                        </div>
                        <div style={{width:"65%"}}>
                            <div className={styles.inputLabel}>
                                Passport
                            </div>
                            <input 
                                className={styles.inputUserUI}
                                placeholder="Passport"
                                onChange={(e)=>{
                        
                                    if(isTL){
                                        let tempTLObj={
                                            ...addTLObj.guestArr[0],
                                            "passport": e.target.value
                                        }
                                        let roomUpdater = addTLObj.guestArr.splice(0,1,tempTLObj)
                                        setTLObj({
                                            ...addTLObj
                                        })
                                    }else{
                                        let tempGuestObj={
                                            ...newRoomObj.guestArr[guestIndex],
                                            "passport": e.target.value
                                        }
                                        let tempRoomUpdater = newRoomObj.guestArr.splice(guestIndex,1,tempGuestObj)
                                        setRoomObj({
                                            ...newRoomObj,
                                        })
                                    }
                                }}
                                type='text'
                            />
                        </div>
                    </div> 
                    <div className={styles.spaceBetRow} style={{width: "47%" }}>
                        <div style={{width:"49%"}}>
                            <div className={styles.inputLabel}>
                                Pass. Expiration
                            </div>
                            <input 
                                className={styles.inputUserUI}
                                onChange={(e)=>{
                                    if(isTL){
                                        let tempTLObj={
                                            ...addTLObj.guestArr[0],
                                            "passportExpiration": e.target.value
                                        }
                                        let roomUpdater = addTLObj.guestArr.splice(0,1,tempTLObj)
                                        setTLObj({
                                            ...addTLObj
                                        })
                                    }else{
                                        let tempGuestObj={
                                            ...newRoomObj.guestArr[guestIndex],
                                            "passportExpiration": e.target.value
                                        }
                                        let tempRoomUpdater = newRoomObj.guestArr.splice(guestIndex,1,tempGuestObj)
                                        setRoomObj({
                                            ...newRoomObj,
                                        })
                                    }
                                }}
                                type='date'
                            />
                        </div>
                        <div style={{width:"49%"}}>
                            <div className={styles.inputLabel}>
                                Date of birth
                            </div>
                            <input 
                                className={styles.inputUserUI}
                                onChange={(e)=>{
                                    if(isTL){
                                        let tempTLObj={
                                            ...addTLObj.guestArr[0],
                                            "guestDOB": e.target.value
                                        }
                                        let roomUpdater = addTLObj.guestArr.splice(0,1,tempTLObj)
                                        setTLObj({
                                            ...addTLObj
                                        })
                                    }else{
                                        let tempGuestObj={
                                            ...newRoomObj.guestArr[guestIndex],
                                            "guestDOB": e.target.value
                                        }
                                        let tempRoomUpdater = newRoomObj.guestArr.splice(guestIndex,1,tempGuestObj)
                                        setRoomObj({
                                            ...newRoomObj,
                                        })
                                    }
                                }}
                                type='date'
                            />
                        </div>
                    </div>
                </div>
                &nbsp;
                <div className={styles.spaceBetRow}>
                    <div style={{width: "40%" }}> 
                        <div className={styles.inputLabel}>
                            Add guest note
                        </div>
                        <div className={styles.inputAndRow}> 
                            <input 
                                className={styles.inputUserUI} 
                                type='text'
                                onChange={(e)=>{
                                    e.preventDefault;
                                    if(isTL){
                                        setTLNote(e.target.value)
                                    }else{
                                        setAddGuestNote(e.target.value)
                                    }
                                }}
                                placeholder='A Note'
                            />
                            &nbsp;
                            &nbsp;
                            <span onClick={()=>{
                                if(isTL){
                                    let TLNoteIndex=addTLObj.guestArr[0].guestNotes.length
                                    let theSplicer =addTLObj.guestArr[0].guestNotes.splice(TLNoteIndex,0,addTLNote)
                                    setTLObj({
                                        ...addTLObj
                                    })
                                } else {
                                    let gNIndex = newRoomObj.guestArr[guestIndex].guestNotes.length
                                    let theSplicer=newRoomObj.guestArr[guestIndex].guestNotes.splice(gNIndex, 0, addGuestNote)
                                    setRoomObj({
                                        ...newRoomObj,
                                    })
                                }
                            }}>
                                <AddCircleOutlineIcon/> 
                            </span>
                        </div>
                    </div>
                    <div style={{width:"47%"}}>
                        <div className={styles.inputLabel}>Boot Size</div>
                        <input 
                            type="number"
                            min={0}
                            max={60}
                            className={styles.inputUserUI} 
                            placeholder='Ex: 42'
                            onChange={(e)=>{
                                e.preventDefault()
                                let tempGuestObj={
                                    ...newRoomObj.guestArr[guestIndex],
                                    "bootSize": e.target.value
                                }
                                let tempRoomUpdater = newRoomObj.guestArr.splice(guestIndex,1,tempGuestObj)
                                setRoomObj({
                                    ...newRoomObj,
                                })                                
                            }}
                        />
                    </div>                    
                </div>
                &nbsp;
                <div className={styles.depNotesCont}>
                    {isTL? <>
                        {addTLObj.guestArr[0]?.guestNotes.map((elem,i)=><React.Fragment key={i}>
                            <div className={styles.eachGuestNote} onClick={()=>{
                                let tempTLNotes=addTLObj.guestArr[0].guestNotes.splice(i, 1)
                                setTLObj({
                                    ...addTLObj
                                })
                                }}>
                                {elem} &nbsp; <RemoveCircleOutlineIcon />
                            </div> &nbsp; &nbsp;   
                        </React.Fragment> )}
                    </>:<>
                        {newRoomObj.guestArr[guestIndex]?.guestNotes.map((elem,i)=> <React.Fragment key={i}>
                            <div className={styles.eachGuestNote} onClick={()=>{
                                let tempGuestNotes=newRoomObj.guestArr[guestIndex].guestNotes.splice(i, 1)
                                setRoomObj({
                                    ...newRoomObj,
                                })
                            }}>
                                {elem} &nbsp; <RemoveCircleOutlineIcon />
                            </div> &nbsp; &nbsp;  
                        </React.Fragment> )}
                    </>}
                </div>
                &nbsp;
                {!isTL&& <> 
                <div className={styles.roomTypeIndicator} onClick={()=>{
                    setGuestAddCount(guestAddCount+1)
                    let aTempGuestArr = newRoomObj.guestArr.concat({
                        "guestName": String,
                        "guestFName": String,
                        "guestLName": String,
                        "guestDOB": String,
                        "guestID": String,
                        "guestNotes": [],
                        "passport": String,
                        "nationality": String,
                        "sex": String
                    })
                    if(newRoomObj.accomodationType==="single"){
                        let tempRoomObj={
                                ...newRoomObj,
                                "guestArr":aTempGuestArr,
                                "accomodationType": "twin",
                                "singleSupp":false
                            }
                        setRoomObj({
                            ...tempRoomObj,
                        })
                    } else if (newRoomObj.accomodationType==="twin" ||newRoomObj.accomodationType==="matrimonial"){
                        let tempRoomObj={
                                ...newRoomObj,
                                "guestArr":aTempGuestArr,
                                "accomodationType": "triple"
                            }
                        setRoomObj({
                            ...tempRoomObj,
                        })
                    } else if (newRoomObj.accomodationType==="triple"){
                        let tempRoomObj={
                                ...newRoomObj,
                                "guestArr":aTempGuestArr,
                                "accomodationType": "quad"
                            }
                        setRoomObj({
                            ...tempRoomObj,
                        })
                    }
                }} > ADD GUEST TO ROOM &nbsp; <AddCircleOutlineIcon/></div>
                </>}
            </>)
        }
        const handleChangez=()=>{
            if(newRoomObj.accomodationType==="twin"){
                let tempRoomObj={
                        ...newRoomObj,
                        "accomodationType": "matrimonial"
                    }
                setRoomObj({
                    ...tempRoomObj,
                })
            } else if(newRoomObj.accomodationType==="matrimonial"){
                let tempRoomObj={
                        ...newRoomObj,
                        "accomodationType": "twin"
                    }
                setRoomObj({
                    ...tempRoomObj,
                })
            }
        }


        console.log(newRoomObj)


        return(<>
        <form id="tourLeaderForm">         
        <div className={styles.aFileContainer}>
            <div className={styles.spaceBetRow}>
                <h2> Add {isTL? <> Tour Leader </>:<>Room</>}</h2>
                <div className={styles.addRoomBTN} onClick={()=>{
                    if(isTL){
                        let TLArr=[...theDeparture.tourLeader]
                        TLArr.push(addTLObj)
                        setTheDeparture({
                            ...theDeparture,
                            "tourLeader": TLArr
                        })
                        setTLObj(false)
                        editOffFunction()
                        setTLNote(false)
                    } else {
                        if(newRoomObj.guestArr[0].guestName.length>1 || newRoomObj.guestArr[0].guestFName.length>1 || newRoomObj.guestArr[0].guestLName.length>1 ){
                            // add room splicing daShiat
                            let tempDepArre =theDeparture.roomingList.push(newRoomObj)
                            setRoomObj({
                                "guestArr":[
                                    {
                                        "guestName": String,
                                        "guestLName": String,
                                        "guestFName": String,
                                        "guestDOB": String,
                                        "guestID": String,
                                        "guestNotes": [],
                                        "passport": String,
                                        "nationality": String,
                                        "sex": String
                                    }
                                ],
                                "accomodationType": "single",
                                "singleSupp": true,       
                            })
                            setEditSwitch(false)
                            setAddGuest(false)
                            setGuestAddCount(0)
                            setAddGuestNote(false)
                            setTheDeparture({
                                ...theDeparture
                            })
                            window.alert("Room Added")
                        } else {
                            window.alert("Please Add Guest Name")
                        }
                    }
                }}>
                    <AddCircleOutlineIcon/> &nbsp; add to rooming
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <div> 
                {(newRoomObj.accomodationType==="twin" || newRoomObj.accomodationType==="matrimonial") && <>
                <div className={styles.roomEditSwitcher}>
                    <h3>TWIN</h3>
                    <div style={{marginLeft:"33px", display: "flex", alignItems: "center"}}>
                    <FormControlLabel 
                        control={
                        <Switch checked={newRoomObj.accomodationType==="matrimonial"}
                        onChange={handleChangez} />} 
                    />            
                    </div>
                    <h3>MATRIMONIAL</h3>
                </div>
                </>}
                </div>
                <div className={styles.roomTypeIndicator}>
                    {newRoomObj.accomodationType}
                </div>
            </div>
                {guestForm(0)}
            {guestAddCount>=1&&<>
                {guestForm(1)}
            </>}
            {/* triple OP or additional bed NON OP*/}
            {guestAddCount>=2&&<>
                {guestForm(2)}
            </>}
        </div>
        </form>
        </>)
    }
    const roomingSummaryDisp=()=>{
        if(paxData.paxTotal>0){
        return(<>
        <div className={styles.roomingListTotalCont}>
            {paxData?.roomReq.singleRooms>0&&<><div>
            {theLang==="english"? <>
                SINGLE{paxData.roomReq.singleRooms>1&&<>s</>} 
            </>: theLang==="espanol" && <>
                SENCILLA{paxData.roomReq.singleRooms>1&&<>s</>} 
            </>} 
            &nbsp; x {paxData.roomReq.singleRooms}</div></>} 
            {paxData?.roomReq.twinRooms>0&&<><div>
            {theLang==="english"? <>
                twin Room{paxData.roomReq.twinRooms>1&&<>s</>}
            </>: theLang==="espanol" && <>
                habitacion{paxData.roomReq.twinRooms>1&&<>es</>} doble{paxData.roomReq.twinRooms>1&&<>s</>}
            </>}
            &nbsp; x {paxData.roomReq.twinRooms} 
            </div></>} 
            {paxData?.roomReq.matrimonialRooms>0&&<><div>
            {theLang==="english"? <>
                matrimonial Room{paxData.roomReq.matrimonialRooms>1&&<>s</>}
            </>: theLang==="espanol" && <>
                habitacion{paxData.roomReq.twinRooms>1&&<>es</>} matrimonial{paxData.roomReq.twinRooms>1&&<>es</>}
            </>}
            &nbsp; x {paxData.roomReq.matrimonialRooms} 
            </div></>} 
            {paxData?.roomReq.tripleRooms>0&&<><div>
            {theLang==="english"? <>
                triple Room{paxData.roomReq.tripleRooms>1&&<>s</>}
            </>: theLang==="espanol" && <>
                habitacion{paxData.roomReq.twinRooms>1&&<>es</>} triples{paxData.roomReq.twinRooms>1&&<>es</>}
            </>}
            &nbsp; x {paxData.roomReq.tripleRooms} 
            </div></>} 
            {paxData?.roomReq.quadRooms>0&&<><div>
            {theLang==="english"? <>
                cuadruple Room{paxData.roomReq.quadRooms>1&&<>s</>}
            </>: theLang==="espanol" && <>
                habitacion{paxData.roomReq.twinRooms>1&&<>es</>} cuadruple{paxData.roomReq.twinRooms>1&&<>s</>}
            </>}
            &nbsp; x {paxData.roomReq.quadRooms} 
            </div></>} 
        </div>
        </>)
        } 
    }

    // Create Departures
    const departureCreator=()=>{
        return(<>
            <div className={styles.returnUIBar} onClick={()=>{setCreateDep(false)}}>
                <span> 
                <ArrowBackIosNewIcon/></span> BACK 
            </div>
            <div className={styles.spaceBetRow}>
                <h1>Create a departure: </h1>
                <div> {fetchedItins&&<>{fetchedItins.length} GMS Itineraries,</>}
                    {LTCItins&&<>{" "}{LTCItins.length} LTC Itineraries</>}
                </div>
            </div>

            {fetchedItins.length>0 ? <> 
                {depSelector("GMS  Itineraires", fetchedItins)}
            </> : <> 
                <div className={styles.depTrigBTN} onClick={async()=>{
                    // fetch GMS itineraries
                    if(!itinFetcherGMSSwitch){
                    setGMSItinFetcherSwitch(true)
                        const res2 = await fetch("/api/gms/itineraries",{
                            method: "GET"
                        })
                        let fetchedData2 = await res2.json()
                        if(fetchedData2){
                            // filter / sort functions
                            setFetchedItins(fetchedData2)
                        }
                    }
                }} > 
                    {itinFetcherGMSSwitch ? <>
                        <CircularProgress />
                    </>:<>
                        <AddCircleOutlineIcon/> &nbsp; &nbsp; departure from GMS itineraries
                    </> }
                </div>
            </> }

            {/* pick from EcoAndes fixed itins */}
            <br/><br/>
            {ecoAndesFixedDepartures ? <> 
                {depSelector("EcoAndes Fixed Departures", EcoAndesItins)}
            </>:<> 
                <div className={styles.depTrigBTN} onClick={()=>{
                    setEcoAndesFD(true)
                }} >
                    {ecoAndesFixedDepartures ? <>
                        <CircularProgress />
                    </>:<>
                        <AddCircleOutlineIcon/> &nbsp; &nbsp; departure from EcoAndes FD itineraries
                    </> }
                </div>
            </>}


            {/* Pick Published Itins */}
            <br/><br/>
            {itinFetcherLTCSwitch ? <> 
                {depSelector("LTC Published Itineraries", LTCItins)}
            </>:<> 
                <div className={styles.depTrigBTN} onClick={()=>{
                    setLTCItinFetcherSwitch(true)
                }} >
                    {itinFetcherLTCSwitch ? <>
                        <CircularProgress />
                    </>:<>
                        <AddCircleOutlineIcon/> &nbsp; &nbsp; departure from LTC itineraries
                    </> }

                </div>
            </>}        
        </>)
    }

    // expenses
    const expenseBadgeDisp=(anExpKey)=>{
        if(anExpKey==="transportExpense"){
            return(<><div style={{fontSize:"1.1em", fontWeight:"700", marginRight:"6px",  backgroundColor:" coral", padding:"6px 9px", color:"white"  }} >T {" "}{" "}</div></>)
        } else if(anExpKey==="guideExpense"){
            return(<><div style={{fontSize:"1.1em", fontWeight:"700", marginRight:"6px",  backgroundColor:" black", padding:"6px 9px", color:"white"  }} > G {" "}</div></>)
        } else if(anExpKey==="accommodation"){
            return(<><div style={{fontSize:"1.1em", fontWeight:"700", marginRight:"6px",  backgroundColor:" teal", padding:"6px 9px", color:"white"  }} > A {" "}</div></>)
        } else {
            return(<><span style={{width:"36px"}} /></>)
        }
    }
    const totalExpAdder=(expenseArr)=>{
        // not working proterly, need to check WTF
        let totalAggegator=0
        expenseArr.forEach((elem)=>{
            if(elem?.length>0){
                if(elem[0].expenseKey==="accommodation"){
                    elem[0].roomPriceArr.forEach((elemental)=>{
                        if(elemental.reqRooms){
                            if(elemental.reqAdditionalBed){
                                totalAggegator=
                                totalAggegator
                                +
                                (elemental.reqRooms * elemental.price)
                                +
                                (elemental.reqAdditionalBed * elemental.additionalBed)
                            } else {
                                totalAggegator=
                                totalAggegator
                                +
                                (elemental.reqRooms * elemental.price)
                            }
                        }
                    })
                    
                } else {
                    totalAggegator=
                    totalAggegator + elem[0].price
                }
            }
        })
            return totalAggegator
    }
    const accomOptAndPicker=()=>{
        let eachRoomOpt=anExpense.roomPriceArr.map((elem, i)=><React.Fragment key={i}>
        <div className={styles.aRoomOpt}>
            <div className={styles.aColumn}>
                <div className={styles.roomOptLabel}>Room Type</div>
                <div className={styles.aRoomDescription}>{elem?.roomDescription}</div>
            </div>
            <div className={styles.aColumn}>
                <div className={styles.roomOptLabel}>price [room] </div>
                <div className={styles.aRoomPrice}> 
                    ${elem?.price}
                    </div>
            </div>
            {/* room requ & Price Calc */}
            <div className={styles.aColumn}>
                <div className={styles.roomOptLabel}>room req</div>
                <div className={styles.aRoomPrice}>
                    <div style={{width:"33px"}}> 
                    {anExpense.roomPriceArr[i].reqRooms?<>
                        <span onClick={()=>{
                        let prevCount = anExpense.roomPriceArr[i].reqRooms
                        let roomPriceTotal
                        if(prevCount){
                            if(anExpense.roomPriceArr[i].reqAdditionalBed){
                            roomPriceTotal=
                                ((prevCount-1)* anExpense.roomPriceArr[i].price)
                                +
                                (anExpense.roomPriceArr[i].reqAdditionalBed 
                                *
                                anExpense.roomPriceArr[i].additionalBed)
                            } else {
                            roomPriceTotal=
                                ((prevCount-1)* anExpense.roomPriceArr[i].price)
                            }
                            let tempRoomObj={
                                ...anExpense.roomPriceArr[i],
                                "reqRooms": prevCount-1,
                                "roomsTotal":roomPriceTotal
                                }
                            anExpense.roomPriceArr.splice(i,1, tempRoomObj)
                            setAnExpense({...anExpense})
                                }
                            }}> 
                            {anExpense.roomPriceArr[i].reqRooms&&<>
                                <RemoveCircleOutlineIcon />
                            </>}
                        </span>
                        </>: <> </>}
                    </div>
                    <div style={{width:"33px", textAlign: "center"}}> 
                    <span> 
                        {anExpense.roomPriceArr[i].reqRooms?<>
                            x {anExpense.roomPriceArr[i].reqRooms}
                        </>:<> 
                            x 0
                        </>}
                    </span>
                    </div>
                    <div style={{width:"33px"}}> 
                    <span onClick={()=>{
                        let prevCount = anExpense.roomPriceArr[i].reqRooms
                        let roomPriceTotal
                        if(prevCount){
                        if(anExpense.roomPriceArr[i].reqAdditionalBed){
                            roomPriceTotal=
                            ((prevCount+1)* anExpense.roomPriceArr[i].price)
                            +
                            (anExpense.roomPriceArr[i].reqAdditionalBed 
                            *
                            anExpense.roomPriceArr[i].additionalBed)
                        } else {
                            roomPriceTotal=
                            ((prevCount+1)* anExpense.roomPriceArr[i].price)
                        }
                        let tempRoomObj={
                            ...anExpense.roomPriceArr[i],
                            "reqRooms": prevCount+1,
                            "roomsTotal":roomPriceTotal
                            }
                        anExpense.roomPriceArr.splice(i,1, tempRoomObj)
                        setAnExpense({...anExpense})
                        } else {
                        if(anExpense.roomPriceArr[i].reqAdditionalBed){
                            roomPriceTotal=
                            (1 * anExpense.roomPriceArr[i].price)
                            +
                            (anExpense.roomPriceArr[i].reqAdditionalBed 
                            *
                            anExpense.roomPriceArr[i].additionalBed)
                        } else {
                            roomPriceTotal=
                            (1 * anExpense.roomPriceArr[i].price)
                        }
                            let tempRoomObj={
                            ...anExpense.roomPriceArr[i],
                            "reqRooms":1,
                            "roomsTotal":roomPriceTotal
                            }
                            anExpense.roomPriceArr.splice(i,1, tempRoomObj)
                            setAnExpense({...anExpense})
                        }
                        }}>
                            <AddCircleOutlineIcon/>
                        </span>
                    </div>
                </div>
            </div>

            {/* Additional Bedding Req */}
            <div className={styles.aColumn}>
                {elem?.additionalBed&&<>
                <div className={styles.roomOptLabel}>Additional bed</div>
                <div className={styles.aRoomPrice}>
                +${elem?.additionalBed} 
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div style={{width:"18px"}}> 
                    {anExpense.roomPriceArr[i].reqAdditionalBed?<>
                    <span onClick={()=>{
                        let prevCount = anExpense.roomPriceArr[i].reqAdditionalBed
                        let roomPriceTotal
                        if(prevCount){
                            roomPriceTotal=
                                ((prevCount-1) * anExpense.roomPriceArr[i].additionalBed)
                                +
                                (anExpense.roomPriceArr[i].price 
                                *
                                anExpense.roomPriceArr[i].reqRooms)
                            let tempRoomObj={
                                ...anExpense.roomPriceArr[i],
                                "reqAdditionalBed": prevCount-1,
                                "roomsTotal": roomPriceTotal
                                }
                            anExpense.roomPriceArr.splice(i,1, tempRoomObj)
                            setAnExpense({...anExpense})
                        }
                    }}> 
                    {anExpense.roomPriceArr[i].reqAdditionalBed&&<>
                        <RemoveCircleOutlineIcon />
                    </>}
                    </span>
                    </>:<></>}
                </div>
                <div style={{width:"39px", textAlign: "center"}}> 
                    <span> 
                    {anExpense.roomPriceArr[i].reqAdditionalBed?<>
                        x {anExpense.roomPriceArr[i].reqAdditionalBed}
                    </>:<> 
                        x 0
                    </>}
                    </span>
                </div>
                <div style={{width:"33px"}}> 
                    <span onClick={()=>{
                        let prevCount = anExpense.roomPriceArr[i].reqAdditionalBed
                        let roomPriceTotal
                        if(prevCount){
                            roomPriceTotal=
                                ((prevCount+1) * anExpense.roomPriceArr[i].additionalBed)
                                +
                                (anExpense.roomPriceArr[i].price 
                                *
                                anExpense.roomPriceArr[i].reqRooms);

                            let tempRoomObj={
                                ...anExpense.roomPriceArr[i],
                                "reqAdditionalBed": prevCount+1,
                                "roomsTotal":roomPriceTotal
                                }
                            anExpense.roomPriceArr.splice(i,1, tempRoomObj)
                            setAnExpense({...anExpense})
                        } else {
                            roomPriceTotal=
                                ( 1 * anExpense.roomPriceArr[i].additionalBed)
                                +
                                (anExpense.roomPriceArr[i].price 
                                *
                                anExpense.roomPriceArr[i].reqRooms);
                            let tempRoomObj={
                                ...anExpense.roomPriceArr[i],
                                "reqAdditionalBed":1,
                                "roomsTotal":roomPriceTotal
                                }
                            anExpense.roomPriceArr.splice(i,1, tempRoomObj)
                            setAnExpense({...anExpense})
                        }
                    }}>
                        <AddCircleOutlineIcon/>
                    </span>
                </div>
                </div>
                </>}
            </div>
            {/*  price display */}
            <div className={styles.aColumn}> 
                {elem?.roomsTotal?<>
                    <div className={styles.roomOptLabel}>Room total</div>
                    <div className={styles.aRoomDescription}> ${elem?.roomsTotal}</div> 
                </> :<> </>}
            </div>
            </div>
        </React.Fragment>)
        const genericRoomPriceSetter=(tempRoomObj, setTempRoom, setExpense, theExpense)=>{
            return(<>
            <div className={styles.roomPriceSetCont}>
                <span> 
                    <div className={styles.roomOptLabel}> 
                        Room Type*</div>
                    <div className={styles.roomOptInput}>
                        <input placeholder='ex: Single Suite' type="text" onChange={(e)=>{
                            setTempRoom({
                                ...tempRoomObj,
                                "roomDescription":e.target.value
                            })
                        }} />
                    </div>
                </span>
                <span> 
                    <div className={styles.roomOptLabel}> 
                        Room price*</div>
                    <div className={styles.roomOptInput}>
                        $<input placeholder='ex: $100' type="number" onChange={(e)=>{
                            setTempRoom({
                                ...tempRoomObj,
                                "price":e.target.value
                            })
                        }} />
                    </div>
                </span>
                <span> 
                    <div className={styles.roomOptLabel}> 
                        Additional Bed</div>
                    <div className={styles.roomOptInput}>
                        $<input placeholder='ex: $55 - optional' type="number" onChange={(e)=>{
                            setTempRoom({
                                ...tempRoomObj,
                                "additionalBed":e.target.value
                            })
                        }} />
                    </div>
                </span>
                <div className={styles.addRoomTypeBTN} onClick={()=>{
                    let tempRoomArr = theExpense.roomPriceArr.concat(tempRoomObj)
                    setExpense({
                        ...theExpense,
                        "roomPriceArr":tempRoomArr
                    })
                    setTempRoom({})
                    setHotelAddTrig(false)
                }}>
                    Add Room +
                </div>
            </div>
            </>)

        }
        const totalPerAccom=(theExpArr)=>{
            let totalCounter=0
            theExpArr.forEach((elem)=>{
                if(elem?.reqRooms){

                if(elem?.reqAdditionalBed){
                    totalCounter=
                    totalCounter
                    + (elem?.reqAdditionalBed * elem?. additionalBed)
                    + (elem?.reqRooms * elem?.price)
                } else {
                    totalCounter = 
                    totalCounter
                    + (elem?.reqRooms * elem?.price)
                }
                }
            })
            return totalCounter
        }
        return(<>
            <strong style={{letterSpacing:"1px"}}>NEEDED ROOMS</strong>
            {roomingSummaryDisp()}
            <div className={styles.roomOptsGrid}> 
                {eachRoomOpt}

                {(anExpense.roomPriceArr.length===0 || addHotelTrig)
                ?<>
                    {genericRoomPriceSetter(temporaryRoomObj, setTempRoomObj, setAnExpense, anExpense)}
                </>:<>
                    <div className={styles.addRoomsBTN} onClick={()=>{
                        setHotelAddTrig(true)
                    }}> + Add room </div>
                </>}

            </div>
            <div className={styles.roomTotalBox}>
                <div className={styles.aColumn}>
                    <div className={styles.roomTotalLabel}>Total per accommodation</div>
                    <div className={styles.aRoomPrice}> 
                        $ {totalPerAccom(anExpense.roomPriceArr)}
                    </div>
                </div>
            </div>
        </>)
    }
    const expenseDisplayer=(theExpenseArr, dayByDay )=>{
        const anExpenseDisp=(eachExp, expIndex, dailyExpArray, dayIndex)=>{
            let roomPriceAdder=0
            let eachDayRooming=[]
            if(eachExp.expenseKey==="accommodation"){
                eachExp.roomPriceArr.forEach((elem)=>{
                    if(elem?.reqRooms){
                    if(elem?.reqAdditionalBed){
                        roomPriceAdder= 
                        roomPriceAdder
                        +
                        (elem?.reqAdditionalBed * elem?.additionalBed)
                        +
                        (elem?.reqRooms * elem?.price)
                    eachDayRooming.push({
                        "roomDescription":elem?.roomDescription,
                        "reqRooms":elem?.reqRooms,
                        "price":elem?.price,
                        "reqAdditionalBed":elem?.reqAdditionalBed,
                        "additionalBed":elem?.additionalBed,
                    })
                } else {
                    // 
                    roomPriceAdder= 
                    roomPriceAdder
                    +
                    (elem?.reqRooms * elem?.price)
                    eachDayRooming.push({
                        "roomDescription":elem?.roomDescription,
                        "reqRooms":elem?.reqRooms,
                        "price":elem?.price,
                    })
                }
                }
            })
            }
            let roomingSummary=eachDayRooming.map((elem,i)=> <React.Fragment key={i}>
                &nbsp;&nbsp;{elem?.roomDescription} | ${elem?.price} x {elem?.reqRooms} 
                {elem?.reqAdditionalBed&&<> + {elem?.reqAdditionalBed} additional bed{elem?.reqAdditionalBed>1&&<>s</>}</>} <br/>
            </React.Fragment>)

            return(<>
            {eachExp.expenseKey==="accommodation"&&<> 
            <div className={styles.accomListDisp}>
                <strong>ROOMING REQUIREMENT:</strong>
                {roomingSummary}
            </div>
            </>}
            <div className={styles.anExpenseDisp}>
                <div style={{width:"55%", display:"flex", alignItems:"center"}}>
                    {editSwitch&& <>
                        <span className={styles.rmvExpBTN} onClick={()=>{
                            let tempArr = dailyExpArray.splice(expIndex, 1)
                            setTheDeparture({
                                ...theDeparture
                            })
                        }}> <RemoveCircleOutlineIcon/> </span>

                        <span className={styles.editExpBTN} onClick={()=>{
                            setExpEditTrig(true)
                            setAnExpense(dailyExpArray[expIndex])
                            setExpenseIndex(expIndex)
                            setDayIndex(dayIndex)
                        }}> <EditIcon/> </span>
                    </>}
                    {expenseBadgeDisp(eachExp.expenseKey)} &nbsp;
                    {eachExp.hotelName&&<><strong>{eachExp.hotelName}</strong></>}
                    {eachExp.priceDetail}
                    {eachExp.varExpTickets&& <> &nbsp; {eachExp.varExpTickets} x ${eachExp.price} </>}
                </div>
                <div style={{display:"flex", textAlign:"end"}}>
                    {providerArr.length>1&&<><strong>
                        {eachExp.contactName!="Provider"&&<>{eachExp.contactName}</>}</strong></>}
                    <div style={{width:"27px", textAlign:"end"}}>  </div>
                    {eachExp.expenseKey==="accommodation"? <>
                        <div style={{width:"66px", textAlign:"end"}}> $ {roomPriceAdder}</div>
                    </> : eachExp.expenseKey==="variableExpense"? <>
                        <div style={{width:"66px", textAlign:"end"}}> $ {eachExp.price * eachExp.varExpTickets }</div>
                    </> : <> 
                        <div style={{width:"66px", textAlign:"end"}}> $ {eachExp.price}</div>
                    </>}
                </div>
            </div>
            </>)
        }
        const expenseMapper=(dailyExpArr, dayIndex)=>{
        if(dailyExpArr){
            return(<>
                {dailyExpArr.map((element, i)=><React.Fragment key={i}>
                    {anExpenseDisp(element, i, dailyExpArr, dayIndex)}
                </React.Fragment>)}
            </>)
        }
        }
        let eachDayTitleExp=dayByDay.map((dayElem, i)=><React.Fragment key={i}>
            <div className={styles.dailyTitleCont}>  
                <h5> Day {i+1}: {dayElem.dayTitle&&<>{dayElem.dayTitle}</>}</h5>
                {editSwitch&& <>
                    <div className={styles.addExpBTN} onClick={()=>{
                        setExpTrig(true)
                        setDayIndex(i)
                    }}>
                    <AddCircleOutlineIcon/>
                </div></>}
            </div>
            {expenseMapper(theExpenseArr[i], i)}
        </React.Fragment>        )
        return(<>
            <div className={styles.spaceBetRow}> 
                <h2>Expenses:</h2>
                {(session?.user.hierarchy===1 || session?.user.name===theDeparture.assignment)&&<>
                    <div className={styles.editBTN} onClick={()=>{
                        if(editSwitch){setEditSwitch(false); setExpTrig(false); setAnExpense(); setTLObj(false)} 
                        else {setEditSwitch(true)}
                    }}>
                        {editSwitch? <><EditOffIcon/></>:<><EditIcon/></>}
                    </div>
                </> }
            </div>
            <div>
                {eachDayTitleExp}
            </div>
        </>)
    }  
    const expenseAdder=(theExpense, setTheExpense, contactArr, dayIndx, theDep, setTheDep)=>{
        if(theExpense){ 
        let priceArrDispAndEditor
        if(theExpense.priceArr){
            let priceAndPx= theExpense.priceArr.map((elem,i)=> <React.Fragment key={i}>
            <div className={styles.aPriceColumn} onClick={()=>{
                setTheExpense({
                    ...theExpense,
                    "price": elem
                })
            }}>
            <span><strong>{i+1}</strong></span>
            <span>${elem} </span>
            </div>
            </React.Fragment>)
            priceArrDispAndEditor=<><div className={styles.priceDataRow}>
                <div className={styles.aPriceColumn}>
                    <span><strong>Pax</strong></span> 
                    <span><strong>$$</strong></span>
                </div> 
                {priceAndPx}
            </div></> 
        }
        let contactOpts
        if(contactArr.length>0){
            contactOpts=contactArr.map((elem,i)=><React.Fragment key={i}>
            {elem?.expenseKey==="accommodation"? <>
                <div className={styles.addContactBTN} onClick={()=>{
                    setTheExpense({
                        ...theExpense,
                        "contactName": elem?.contactName,
                        "contactNumb": elem?.contactNumb,
                        "hotelName": elem?.hotelName
                    })
                }}> + {elem.hotelName} </div>
            </>:<>
                <div className={styles.addContactBTN} onClick={()=>{
                    setTheExpense({
                        ...theExpense,
                        "contactName": elem?.contactName,
                        "contactNumb": elem?.contactNumb,
                    })
                }}> + {elem?.contactName} </div>
            </>}
            </React.Fragment>)
        }

        // btn to add cuises, multi-day packages, per group or per pax

        ////////////
        return(<>
            <form className={styles.expenseForm} 
            onSubmit={(e)=>{
                    // send to back end 
                e.preventDefault()
                let updatingExpArr
                if(theDep.dayByDayExp[dayIndx]){
                    updatingExpArr=[...theDep.dayByDayExp[dayIndx]];
                } else {
                    updatingExpArr=[]
                }
                updatingExpArr.push(anExpense)
                theDep.dayByDayExp[dayIndx]= updatingExpArr
                setTheDep({
                    ...theDep,
                    "dayByDayExp": theDep.dayByDayExp
                })
                setPriceChartKey()
                setTheExpense()
                setExpTrig(false)
                // setEditSwitch(false)
            }}>

            {contactArr.length>0&& <>
                <br></br>
                {theExpense?.expenseKey==="accommodation"?<> 
                </>:<> 
                Previous providers:
                <div style={{display:"flex", alignItems:"center", margin:'9px'}}> {contactOpts} </div>
                </>}
            </>}
            {theExpense?.expenseKey==="accommodation"&& <>
            <div className={styles.spaceBetRow}>
                <div style={{width: "47%" }}> 
                    {anInputDisplayer("Hotel Name", "hotelName", "text", false, theExpense.hotelName, theExpense, setTheExpense)}</div>
            </div>
            </>}
            <div className={styles.spaceBetRow}>
                <div style={{width: "47%" }}> 
                {anInputDisplayer("Contact Name*", "contactName", "text", false, theExpense.contactName, theExpense, setTheExpense)}</div>
                <div style={{width: "47%" }}> 
                {anInputDisplayer("Phone #", "contactNumb", "number", false, undefined, theExpense, setTheExpense, undefined, undefined, theExpense.contactNumb)}</div>
            </div>
            {theExpense?.expenseKey==="accommodation"?<>
                <div style={{width: "70%" }}> 
                {anInputDisplayer("Expense Detail", "priceDetail", "text", false, theExpense.priceDetail, theExpense, setTheExpense)}</div>
                {accomOptAndPicker()}
            </>:<>
                <div className={styles.spaceBetRow}>
                <div style={{width: "70%" }}> 
                    {anInputDisplayer("Expense Detail", "priceDetail", "text", false, theExpense.priceDetail, theExpense, setTheExpense)}</div>
                {theExpense.price&&<>
                <div style={{width: "25%" }}> 
                    {anInputDisplayer("Price", "price", "number", true, theExpense.price, theExpense, setTheExpense)}</div>
                    </>}
                </div>
                {theExpense.priceArr&&<>
                    <div className={styles.inputLabel}> Price Table </div>
                    <i> Please select a value:</i>
                    {priceArrDispAndEditor}
                </>}
                <div style={{display: "flex", width:"100%", justifyContent:"space-between"}}>
                    <div style={{width: "70%" }}> 
                    {anInputDisplayer("Additional Description", "additionalDescription", "text", false, undefined, theExpense, setTheExpense, undefined, undefined, "Extra service details")}</div> 
                    {theExpense.expenseKey==="variableExpense"? <> 
                    <div style={{width: "25%" }}> 
                        {anInputDisplayer("#Needed", "varExpTickets", "number", true, "Required", theExpense, setTheExpense)}</div>
                    </>:<>
                    <div style={{width: "25%" }}> 
                    {anInputDisplayer("max pax", "paxLimit", "number", false, theExpense.paxLimit, theExpense, setTheExpense)}</div>
                    </>}
                </div>
            </>}
            <div className={styles.spaceBetRow}> 
                <div style={{width: "35%" }}>
                    <div className={styles.spaceBetRow}>
                        <div style={{display:"flex" }}>
                            <label for="cashCheckBox" className={styles.inputLabel}> Economic Requirement</label> &nbsp;
                            <input type='checkbox' id="cashCheckBox" onChange={()=>{
                                if(theExpense.econReq){
                                    setTheExpense({
                                        ...theExpense,
                                        "econReq":false
                                    }) 
                                } else {
                                    setTheExpense({
                                        ...theExpense,
                                        "econReq":true
                                    }) 
                                }
                            }} /> 
                        </div>
                    </div>
                </div>    
                <input className={styles.secondaryBTN} type="submit" value="Add Expense to Day +" />
            </div>
            </form>
        </>)
        } 
    }
    const expenseEditor=(theExpense, setTheExpense, expenseIndex, dayIndx, theDep, setTheDep)=>{
        if(theExpense){
            return(<>
                {theExpense?.expenseKey==="accommodation"&& <> 
                    <h3>Edit Accommodation</h3>
                </>}
                {theExpense?.meal && <>
                    <h3>Edit Meal Service</h3>
                </>}
                <form className={styles.expenseForm} 
                    onSubmit={(e)=>{
                        e.preventDefault()
                        let tempArr = theDep?.dayByDayExp[dayIndx].splice(expenseIndex,1, theExpense)
                        setTheDep(theDep) 
                        setExpenseIndex()
                        setAnExpense()
                        setDayIndex()
                        setExpEditTrig(false)
                    }}>
                    {(theExpense?.expenseKey==="accommodation" || theExpense?.hotelName) && <> 
                    <div className={styles.spaceBetRow}>
                        <div style={{width: "47%" }}> 
                            {anInputDisplayer("Hotel Name", "hotelName", "text", false, theExpense.hotelName, theExpense, setTheExpense)}</div>
                    </div>
                    </>}
                    <div className={styles.spaceBetRow}>
                        <div style={{width: "47%" }}> 
                        {anInputDisplayer("Contact Name*", "contactName", "text", false, theExpense.contactName, theExpense, setTheExpense)}</div>
                        <div style={{width: "47%" }}> 
                        {anInputDisplayer("Phone #", "contactNumb", "number", false, theExpense.contactNumb, theExpense, setTheExpense)}</div>
                    </div>
                    <div className={styles.spaceBetRow}>
                        {(theExpense?.expenseKey==="accommodation" || theExpense?.hotelName)&& <>
                        <div style={{width: "47%" }}> 
                            {anInputDisplayer("Expense Detail", "priceDetail", "text", false, theExpense.priceDetail, theExpense, setTheExpense)}</div></>}
                    </div>
                     <div className={styles.spaceBetRow}>
                         <div style={{width: "33%" }}>
                         {anInputDisplayer("Price", "price", "number", true, theExpense.price, theExpense, setTheExpense)}
                         </div>

                         <div style={{width: "33%" }}>
                         {anInputDisplayer("# Needed", "varExpTickets", "number", true, theExpense.varExpTickets, theExpense, setTheExpense)}
                         </div>
                         <div style={{display:"flex" }}>
                             <label for="cashCheckBox" className={styles.inputLabel}> Economic <br/> Requirement</label> &nbsp;
                           <input type='checkbox' id="cashCheckBox" onChange={()=>{
                                 if(theExpense.econReq){
                                     setTheExpense({
                                         ...theExpense,
                                         "econReq":false
                                     }) 
                                 } else {
                                     setTheExpense({
                                         ...theExpense,
                                         "econReq":true
                                     }) 
                                 }
                             }} /> 
                         </div>
                     </div>


                    {theExpense?.expenseKey==="accommodation"&& <> 
                        {accomOptAndPicker()}
                    </>}

                    <div className={styles.spaceBetRow}>
                        <span/>
                        <input className={styles.secondaryBTN} type="submit" value="Edit Expense" />
                    </div>
                </form>
            </>)
        }
    }
    // providers
    const contactArrDisp=(theArr)=>{
        let eachContact=theArr.map((elem, i)=><React.Fragment key={i}>
            <div className={styles.aProviderDisp}>
            <div className={styles.providerRow}>
                <div style={{display:"flex", width:"70%", alignItems:"center" }}>
                {expenseBadgeDisp(elem?.expenseKey)}
                    <strong>
                    {elem?.contactName!="Provider"?<>
                    {elem?.contactName}
                    </>:<>
                    Name not provided
                    </>}</strong>
                {elem?.hotelName&&<> -{elem?.hotelName}</>}
                </div>
                {elem?.contactNumb!=100000 &&<><div> # 0{elem?.contactNumb}</div></>}
            </div>
            {docsSwitch&&<>
            <div className={styles.providerRow}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {(elem?.expenseKey==="transportExpense" || elem?.expenseKey==="guideExpense" )&& <>

                    <div className={styles.eachDocBTN} onClick={()=>{
                    setDocumentGenera({
                        "docKey": "workOrder",
                        ...elem
                    })
                    }}> Work Order + </div>


                    <div className={styles.eachDocBTN} onClick={()=>{
                    setDocumentGenera({
                        "docKey": "cashReq",
                        ...elem
                    })
                    }}> Cash Requirement + </div>
                    {/* <div className={styles.eachDocBTN} onClick={()=>{
                    setDocumentGenera({
                        "docKey": "contract",
                        ...elem
                    })
                    }}> Contract + </div> */}
                </>}
                {elem?.expenseKey==="accommodation" && <>
                    <div className={styles.eachDocBTN} onClick={()=>{
                    setDocumentGenera({
                        "docKey": "accommodation",
                        ...elem
                    })
                    }}> Accommodation Requirements + </div>
                </>}  
            </div>
            </>}
            </div>
        </React.Fragment>)
            return(<>
                <div>
                <div className={styles.spaceBetRow}> 
                    <h2>Providers:</h2>
                    <div style={{cursor:"pointer"}} onClick={()=>{
                        if(docsSwitch){setDocSwitch(false)}else{setDocSwitch(true)}
                    }}>
                        {docsSwitch? <><CancelPresentationIcon/></>:<><DocumentScannerIcon/></>}
                    </div>
                </div>
                {eachContact}                
                </div>
            </>)            
    }
    const totalProviderExpAdder=(expenseArr, econReq)=>{
        let totalAggegator=0
        let totalEconReq = 0
            expenseArr.forEach((elem)=>{
            if(elem.expenseKey==="accommodation"){
                elem.roomPriceArr.forEach((elemental)=>{
                if(elemental.reqRooms){
                    if(elemental.reqAdditionalBed){
                        totalAggegator=
                        totalAggegator
                        +
                        (elemental.reqRooms * (parseFloat(elemental.price)) )
                        +
                        (elemental.reqAdditionalBed * elemental.additionalBed)
                    } else {
                    totalAggegator=
                    totalAggegator
                    +
                    (elemental.reqRooms * parseFloat(elemental.price))
                }
                }
                })
            } else if (elem.econReq){
                if (elem.varExpTickets){
                    totalEconReq =
                    totalEconReq + (parseFloat(elem.price) * elem.varExpTickets)
                } else {
                    totalEconReq =
                    totalEconReq + parseFloat(elem.price)
                }
            } else{
                if (elem.varExpTickets){
                    totalAggegator =
                    totalAggegator + (parseFloat(elem.price) * elem.varExpTickets)
                } else {
                    totalAggegator =
                    totalAggegator + parseFloat(elem.price)
                }
            }
        })

        if(econReq){
            return totalEconReq.toFixed(2)
        }else{
            return totalAggegator.toFixed(2)
        }
    }
    // docs
    const documentTriggers=()=>{
        return(<>
        <div className={styles.printDEL} style={{borderBottom:"solid 1px black", paddingBottom:"12px"}}>
            <div className={styles.spaceBetRow}>
                <div style={{ width:"47%", display:"flex" }}>
                <h4>Logo</h4> &nbsp;&nbsp;
                <FormControlLabel 
                        control={
                        <Switch checked={documentDispTrigs.logo}
                        onChange={()=>{
                            if(documentDispTrigs.logo){
                                setDocTrigs({
                                    ...documentDispTrigs,
                                    "logo": false
                                })
                            } else {
                                setDocTrigs({
                                    ...documentDispTrigs,
                                    "logo": true
                                })
                            }
                        }}/>} 
                    /> 
                </div>
                <div style={{ width:"47%", display:"flex" }}>
                {documentDispTrigs.logo && <> 
                    <h4>Logo Selector </h4> &nbsp;&nbsp;
                    {logoSwitcher()}
                </>}
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <div style={{ width:"47%", display:"flex" }}>
                <h4>Guest Notes</h4> &nbsp;&nbsp;
                <FormControlLabel 
                        control={
                        <Switch checked={documentDispTrigs.guestNotes}
                        onChange={()=>{
                            if(documentDispTrigs.guestNotes){
                                setDocTrigs({
                                    ...documentDispTrigs,
                                    "guestNotes": false
                                })
                            } else {
                                setDocTrigs({
                                    ...documentDispTrigs,
                                    "guestNotes": true
                                })
                            }
                        }}/>} 
                    /> 
                </div>
                <div style={{ width:"47%", display:"flex" }}>
                <h4>Guest Boot Sizes </h4> &nbsp;&nbsp;
                <FormControlLabel 
                        control={
                        <Switch checked={documentDispTrigs.bootSizes}
                        onChange={()=>{
                            if(documentDispTrigs.bootSizes){
                                setDocTrigs({
                                    ...documentDispTrigs,
                                    "bootSizes": false
                                })
                            } else {
                                setDocTrigs({
                                    ...documentDispTrigs,
                                    "bootSizes": true
                                })
                            }
                        }}/>} 
                    /> 
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <div style={{ width:"47%", display:"flex" }}>
                    <h4>Rooming List</h4> &nbsp;&nbsp;
                    <FormControlLabel 
                        control={
                        <Switch checked={documentDispTrigs.roomingList}
                        onChange={()=>{
                            if(documentDispTrigs.roomingList){
                                setDocTrigs({
                                    ...documentDispTrigs,
                                    "roomingList": false
                                })
                            } else {
                                setDocTrigs({
                                    ...documentDispTrigs,
                                    "roomingList": true
                                })
                            }
                        }}/>} 
                    /> 
                </div>
                <div style={{ width:"47%", display:"flex" }}>
                <h4>Day Description </h4> &nbsp;&nbsp;
                <FormControlLabel 
                        control={
                        <Switch checked={documentDispTrigs.dayDescript}
                        onChange={()=>{
                            if(documentDispTrigs.dayDescript){
                                setDocTrigs({
                                    ...documentDispTrigs,
                                    "dayDescript": false
                                })
                            } else {
                                setDocTrigs({
                                    ...documentDispTrigs,
                                    "dayDescript": true
                                })
                            }
                        }}/>} 
                    /> 
                </div>
            </div>

            <h4>language:</h4>
            <input type="radio" id="English" name="fav_language" defaultChecked value="english" onClick={(e)=>{
                setLang(e.target.value)
            }}/>
            <label for="English">English</label>
            <input type="radio" id="Espanol" name="fav_language" value="espanol" onClick={(e)=>{
                setLang(e.target.value)
            }}/>
            <label for="Espanol">Español</label>




        </div>
        </>)
    }
    const documentCreator=(theDocs)=>{
        // for work orders, econ requirements, contracts
        let eachProviderExp=[]
        theDeparture.dayByDayExp.forEach((element, i)=>{
        element?.forEach(elem=>{
            if(elem.contactName===theDocs?.contactName){
                eachProviderExp.push({...elem, "dayIndex": i})
            }
        })
        })
        let eachProviderMapper
        if(theDocs.expenseKey!="accommodation"){
            eachProviderMapper = theDeparture.dayByDayExp.map((elem,i)=>
            <React.Fragment key={i}>
                { elem?.find(elem2 => elem2.contactName===theDocs?.contactName) &&<>
                <div className={styles.spaceBetRow} style={{marginTop:"12px"}} >
                    <div style={{display:"flex", alignItems:"center"}}>
                        <h4>{theLang==="english"? <>
                            Day
                        </>: theLang==="espanol" && <>
                            Dia
                        </>}{i + 1}:</h4> &nbsp; {theItinerary?.dayByDay[i].dayTitle}
                    </div>
                    {aDateDisp(undefined, theDeparture.startingDate, undefined, i)}
                </div>    

                {/* day description */}
                {documentDispTrigs.dayDescript&& <> 
                {theItinerary?.dayByDay[i].dayDescription}
                </>}

                {theDeparture?.operationalNotes[i]?.length>0&&<> 
                    <div style={{width:"90%", marginLeft:"4%", marginBottom:"9px", fontSize:"0.9em"}}>
                        <div style={{display:"flex", flexDirection:"column"}}>

                        
                        {theDeparture?.operationalNotes[i].find(elem => elem.target==="general")&&<>
                            <strong style={{marginTop:"9px"}}>DAY NOTES</strong>
                        </>}
                        {theDeparture?.operationalNotes[i].map((elem,index)=> 
                        <React.Fragment key={index}> {elem.target==="general"&&<>
                            <div className={styles.spaceBetRow}>
                                <span>- {elem.note}</span>
                                {opDocEditSwitch&& <>
                                    <span style={{color:"red"}} onClick={()=>{
                                        let tempArr = theDeparture?.operationalNotes[i].splice(index, 1)
                                        setTheDeparture({
                                            ...theDeparture
                                        })
                                    }}>
                                        <RemoveCircleOutlineIcon />
                                    </span>
                                </>}
                            </div>
                        </>}</React.Fragment> ) }

                        {/* each provider's notes */}
                        {theDeparture?.operationalNotes[i].find(elem => elem.target===theDocs?.contactName) &&<>
                            <strong style={{marginTop:"9px"}}> {theDocs?.contactName} Notes </strong>
                        </>}
                        {theDeparture?.operationalNotes[i].map((elem,index)=> 
                        <React.Fragment key={index}> {elem.target===theDocs?.contactName &&<>
                            <div className={styles.spaceBetRow}>
                                <span>- {elem.note}</span>
                                {opDocEditSwitch&& <>
                                    <span style={{color:"red"}} onClick={()=>{
                                        let tempArr = theDeparture?.operationalNotes[i].splice(index, 1)
                                        setTheDeparture({
                                            ...theDeparture
                                        })
                                    }}>
                                        <RemoveCircleOutlineIcon />
                                    </span>
                                </>}
                            </div>
                        </>}</React.Fragment> ) }
                        </div>
                    </div>
                </>}

                {/* Operational note mapper */}
                {addOperationalNote? <>
                    <div className={styles.spaceBetRow}> 
                        <div className={styles.inputAndRow} style={{margin:"12px 4%"}}> 
                            <input 
                                className={styles.inputUserUI} 
                                type='text'
                                onChange={(e)=>{
                                    e.preventDefault;
                                    setAddOPNote({
                                        ...addOperationalNote,
                                        "note":e.target.value
                                    })
                                }}
                                placeholder='Add Note'
                            />
                            &nbsp;
                            &nbsp;
                            <span onClick={()=>{
                                if(theDeparture?.operationalNotes[i]?.length>0){
                                    theDeparture.operationalNotes[i].push(addOperationalNote)
                                    setTheDeparture({...theDeparture})
                                } else {
                                    theDeparture.operationalNotes[i] = [addOperationalNote]
                                    setTheDeparture({...theDeparture})
                                    setAddOPNote(false)
                                }
                            }}>
                                <AddCircleOutlineIcon/> 
                            </span>
                        </div>
                        <span onClick={()=>setAddOPNote(false)}>
                            <CancelPresentationIcon/>
                        </span>
                    </div>
                </> : <>
                    {opDocEditSwitch && <> 
                    <div style={{display:"flex", margin:"12px 0"}}>
                        <span className={styles.eachGuestNote} style={{color:"red", margin:"3px", marginLeft:"3%"}} onClick={()=>setAddOPNote({
                            "target":"general"
                        })}>
                            Add General Operational Note
                        </span>
                        <span className={styles.eachGuestNote} style={{margin:"3px", color:"red",}} onClick={()=>setAddOPNote({
                            "target": theDocs?.contactName
                        })}>
                            add note for {theDocs?.contactName}
                        </span>
                    </div>
                    </>}
                </>}
                </>}

                {elem?.map(element=><>{(!element.econReq && element.contactName===theDocs?.contactName)&&<>
                    {!element.econReq && <>
                    </> }
                    <div className={styles.documentGeneraExpense}>
                    <span>
                        <strong>{element.priceDetail}</strong> <br/>
                        {element.additionalDescription&&<>{element.additionalDescription}</>}
                    </span>
                    <span>
                        ${parseFloat(element.price).toFixed(2)} {element.varExpTickets&&<> x {element.varExpTickets} = ${(element.price * element.varExpTickets).toFixed(2)}</>}
                    </span>
                    </div>
                </>}</>)}
            </React.Fragment>)
        }
        let chosenGloss={}
        const engGlossary={
            "tripStart": "Trip Starting Date",
            "tripEnd": "Trip Ending Date",
            "tourName": "Tour Name",
            "createdDate": "Date Created",
            "duration": "Duration",
            "tripRef": "Trip Reference",
            "tourLeader": "Tour Leader",
            "tourLang": "Tour Language",
            "tourCode": "Tour Code",
            "dateIn": "Date In",
            "dateOut": "Date Out",
        }
        const spaGlossary={
            "tripStart": "Fecha Inicio Viaje",
            "tripEnd": "Fecha Fin Viaje",
            "tourName": "Itinerario",
            "createdDate": "Fecha:",
            "duration": "Duracion itinerario",
            "tripRef": "Referencia Itinerario",
            "tourLeader": "Tour Leader",
            "tourLang": "Lenguaje Programa",
            "tourCode": "Codigo Grupo",
            "dateIn": "Fecha Entrada",
            "dateOut": "Fecha salida",
        }
        if(theLang==="english"){
            chosenGloss = engGlossary
        } else if ( theLang === "espanol"){
            chosenGloss = spaGlossary
        }


        return(<>
            <div className={styles.spaceBetRowPRINT}>
                <h2>Document Generator:</h2>
                <div style={{cursor:"pointer"}} onClick={()=>{
                    setDocumentGenera(false)
                    setLang("english")
                }}>
                    <CancelPresentationIcon/>
                </div>
            </div>
            {theDocs.docKey!="cashReq"&&<>
                {documentTriggers(theDocs.docKey)}</>}
            {documentDispTrigs.logo && <> <span style={{ display:"flex", justifyContent:"center", width:"100%" }}>
                {logoDisplayer(theItinerary, "logo")}</span></>}
            <div className={styles.spaceBetRow}>
                <h1> 
                    {theDocs.docKey==="workOrder"&&<> 
                    {theLang==="english"? <>
                        Work Order
                    </>: theLang==="espanol" && <>
                        Orden de Trabajo
                    </>}
                    </>} 
                    {theDocs.docKey==="contract"&&<> Contract</>}
                    {theDocs.docKey==="cashReq"&&<>
                    {theLang==="english"? <>
                        Economic Requirement
                    </>: theLang==="espanol" && <>
                        Requerimiento Economico
                    </>}</>}
                    {theDocs.docKey==="accommodation"&&<> 
                    {theLang==="english"? <>
                        Accommodations Requirement
                    </>: theLang==="espanol" && <>
                        Requerimiento Hospedaje
                    </>}</>}
                </h1>
                {(session?.user.hierarchy===1 || session?.user.name===theDeparture.assignment)&& <>
                    {(theDocs.docKey!="accommodation"&& theDocs.docKey!="cashReq")&& <>
                        <div style={{cursor:"pointer"}} className={styles.printDEL} onClick={()=>{
                            if(opDocEditSwitch){editOffFunction()} 
                            else {setOPDocSwitch(true)}
                        }}>
                            {opDocEditSwitch? <><EditOffIcon/></>:<><EditIcon/></>}
                        </div>
                    </>}
                </>}
            </div>
            <div className={styles.spaceBetRow}>  
                <h2>{theLang==="english"? <>
                        For:
                    </>: theLang==="espanol" && <>
                        Para:
                    </>}
                    {theDocs?.contactName} 
                </h2>
            </div>
            {theDocs?.hotelName&&<><h2><strong>{theDocs?.hotelName}</strong></h2></>}
            <div>{theLang==="english"? <>
                        By:
                    </>: theLang==="espanol" && <>
                        Por:
                    </>}
            {session?.user.name}</div> <br/>
            <div className={styles.detailDispl}>
                {theDeparture?.tripName&&<>{detailWithTitleDisp(chosenGloss.tourName, theDeparture.tripName)}</>}
                {detailWithTitleDisp(chosenGloss.createdDate, toDate.toLocaleDateString('en-GB', dateOptions))}
                {theDeparture?.tourCode&&<>{detailWithTitleDisp(chosenGloss.tourCode, theDeparture.tourCode)}</>}
                {theDeparture.duration&&<>{detailWithTitleDisp(chosenGloss.duration, `${theDeparture.duration} days`)}</>}
                {theDeparture?.tripRef&&<>{detailWithTitleDisp(chosenGloss.tripRef, theDeparture.tripRef)}</>}
                {theDeparture.tourLeader.length>0&&<>{detailWithTitleDisp(chosenGloss.tourLeader, theDeparture.tourLeader[0].guestArr[0].guestName)} {theDeparture.tourLeader[0].guestArr[0].guestFName} {theDeparture.tourLeader[0].guestArr[0].guestLName} </>}
                {theDocs.expenseKey==="workOrder"&&<>
                    {theItinerary?.tripLang&&<>{detailWithTitleDisp(chosenGloss.tourLang, theItinerary.tripLang)}</>}
                </>}
            </div>
            {theDocs.docKey!="accommodation" &&<> 
                <div className={styles.spaceBetRow}>
                    <div style={{width:"49%"}}>
                    {aDateDisp(chosenGloss.tripStart, theDeparture.startingDate)}
                    </div>
                    <div style={{width:"49%"}}>
                    {aDateDisp(chosenGloss.tripEnd, theDeparture.startingDate, parseInt(theDeparture.duration) )}
                    </div>
                </div>
            </>}
            {theDocs.docKey==="accommodation"&&<>
                <h2>{theLang==="english"? <>
                        Required Dates:
                    </>: theLang==="espanol" && <>
                        Fechas requeridas
                    </>}</h2>
                
                {eachProviderExp.map((elemnt, indx)=> <React.Fragment key={indx}>
                {elemnt.expenseKey==="accommodation"&&<>
                    <div className={styles.spaceBetRow}> 
                        <span style={{width:"49%"}}>
                            {aDateDisp("Date In", theDeparture.startingDate, undefined, elemnt.dayIndex)}
                        </span>
                        <span style={{width:"49%"}}>
                            {aDateDisp("Date Out", theDeparture.startingDate, undefined, elemnt.dayIndex+1)}
                        </span>
                    </div>
                </>}
                </React.Fragment>)}
            </>}
            {theDocs.docKey!="cashReq"&&<>
                {roomingListDisp(theDeparture)}
                <div className={styles.pageBreak}> </div>
                {theDocs.docKey!="accommodation"?<>
                    <h2>
                    {theLang==="english"? <>
                        Day by Day Requirements
                    </>: theLang==="espanol" && <>
                        Requerimiento Dia por Dia
                    </>}
                    </h2>
                    {eachProviderMapper}
                    <br/><br/> 
                </>:<> 
                    {eachProviderExp.find(elem => elem.expenseKey!="accommodation")&& <> 
                        {/* dep details intro again, with separate doc feel */}
                        <h2> 
                        {theLang==="english"? <>
                            Additional Services
                        </>: theLang==="espanol" && <>
                            Servicios Adicionales
                        </>}
                        </h2>
                        {eachProviderExp.map((elemz, i)=><React.Fragment key={i}>
                            {elemz.expenseKey!="accommodation"&&<> 
                                &nbsp; - {aDateDisp(undefined, theDeparture.startingDate, undefined, i)}
                                <div className={styles.documentGeneraExpense}>
                                <span>
                                    <strong>{elemz.priceDetail}</strong> <br/>
                                    {elemz.additionalDescription&&<>{elemz.additionalDescription}</>}
                                </span>
                                <span>
                                    ${parseFloat(elemz.price).toFixed(2)} {elemz.varExpTickets&&<> x {elemz.varExpTickets} <br/> TOTAL: ${(elemz.price * elemz.varExpTickets).toFixed(2)}</>}
                                </span>
                                </div>                        
                            </>}
                        </React.Fragment>)}
                    </>}
                </>}
            </>}
            {theDocs.docKey==="cashReq"&&<>
                {eachProviderExp.find(elem => elem.econReq)&& <> <br/>
                    <h2> 
                    {theLang==="english"? <>
                        Economic Requirements
                    </>: theLang==="espanol" && <>
                        Requerimiento Economico
                    </>}
                    </h2>
                    {eachProviderExp.map((elemz, i)=><React.Fragment key={i}>
                        {elemz.econReq&&<> 
                            <br/>
                            {aDateDisp(undefined, theDeparture.startingDate, undefined, elemz.dayIndex )}
                            <div className={styles.documentGeneraExpense}>
                                <span>
                                    <strong>{elemz.priceDetail}</strong> <br/>
                                    {elemz.additionalDescription&&<>{elemz.additionalDescription}</>}
                                </span>
                            <span>
                                ${parseFloat(elemz.price).toFixed(2)} {elemz.varExpTickets&&<> x {elemz.varExpTickets} = ${(elemz.price * elemz.varExpTickets).toFixed(2)}</>} 
                            </span>
                            </div>                        
                        </>}
                    </React.Fragment>)}
                    <br/><br/>
                    <div className={styles.documentGenTotal} >
                        <strong>TOTAL:</strong> USD $ {totalProviderExpAdder(eachProviderExp, true)}
                    </div>
                </>}
            </>}
            {(theDocs.docKey!="accommodation" && theDocs.docKey!="cashReq")&&<>
                <h2>
                    {theLang==="english"? <>
                        Service Breakdown
                    </>: theLang==="espanol" && <>
                        Resumen de Servicios
                    </>}
                </h2>
                {eachProviderExp.map((element,i)=><React.Fragment key={i}>
                {!element.econReq && <>
                    <div className={styles.documentGeneraExpense} style={{borderTop:"solid 1px black", borderLeft:"solid 1px black" }}>
                        <span>
                            D{element.dayIndex+1}: 
                            <strong> {element.priceDetail}</strong> <br/>
                            {element.additionalDescription&&<>{element.additionalDescription}</>}
                        </span>
                        <span>
                            ${parseFloat(element.price).toFixed(2)} {element.varExpTickets&&<> x {element.varExpTickets} = ${(element.price * element.varExpTickets).toFixed(2)} </>}
                        </span>
                    </div>
                </>}
                </React.Fragment> )}

                <div className={styles.documentGenTotal} >
                    <strong>TOTAL:</strong> USD $ {totalProviderExpAdder(eachProviderExp)}
                </div>


            </>}
            {theDocs.docKey!="accommodation" && <> 
                <br/>
                <br/>
                <strong> 
                    {theLang==="english"? <>
                        Please remember to arrive 15 minutes before schedule. 
                    </>: theLang==="espanol" && <>
                        Por favor recordar llegar 15 minutos con antelación.
                    </>}
                </strong>
                <div style={{width:"100%", display:"flex", justifyContent:"space-between", marginTop:"44px"}}> 
                    <div style={{textAlign:"center" }}>
                        <div> {session?.user.name}</div>
                        <div>{logoDisplayer(theItinerary, "text")}</div> 
                    </div>
                    <div style={{textAlign:"center"}}>
                        <div> {theDocs?.contactName}  </div>
                        <div> {theDocs?.expenseKey==="guideExpense"&&<>
                            {theLang==="english"? <>
                                Guide
                            </>: theLang==="espanol" && <>
                                Guia
                            </>}
                        </>}</div> 
                    </div>
                </div>
            </>}
            <br/>
        </>)
    }
    const dayByDayDisp=(theDays, startingDate)=>{

        // non OP
        // Cruise Adder BTN
        // switch to turn on or off day detail

        // need to replace it with a usestate trigger
        let theProgramDays=theDays?.map((elem,i)=><React.Fragment key={i}>
            <div className={styles.eachDayCont}>
                <div className={styles.spaceBetRow} style={{marginTop:"15px" }}>

                    <h5> Day {i+1}: {elem?.dayTitle&&<>{elem?.dayTitle}</>}</h5>

                    <div className={styles.eachDateDisp}> 
                        {aDateDisp(undefined, startingDate, undefined, i)}
                    </div>
                </div>
                {elem?.dayDescription}
            </div>

            {addOperationalNote&& <>
                <div className={styles.spaceBetRow}> 
                    <div className={styles.inputAndRow} style={{margin:"12px", display:"flex",  alignItems:"center" }}> 
                        <input 
                            className={styles.inputUserUI} 
                            type='text'
                            onChange={(e)=>{
                                e.preventDefault;
                                setAddOPNote({
                                    ...addOperationalNote,
                                    "note":e.target.value
                                })
                            }}
                            placeholder='Add Note'
                        />
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <span style={{cursor:"pointer", paddingTop:"12px" }} onClick={()=>{
                            if(theDeparture?.operationalNotes[i]?.length>0){
                                theDeparture.operationalNotes[i].push(addOperationalNote)
                                setTheDeparture({...theDeparture})
                            } else {
                                theDeparture.operationalNotes[i] = [addOperationalNote]
                                setTheDeparture({...theDeparture})
                                // setAddOPNote(false)
                            }
                        }}>
                            <AddCircleOutlineIcon/> 
                        </span>
                    </div>
                </div>
            </>}
            {theDeparture?.operationalNotes[i]?.length>0&& <>
                <br/> <strong> NOTES</strong>
                {theDeparture.operationalNotes[i]?.map((elemnt, ind)=><React.Fragment key={ind}>
                    <div className={styles.aDayNote}>
                    {addOperationalNote&& <> 
                        <span style={{color:"red"}} onClick={()=>{
                            let tempArr = theDeparture?.operationalNotes[i].splice(ind, 1)
                            setTheDeparture({
                                ...theDeparture
                            })
                        }}>
                            <RemoveCircleOutlineIcon /> &nbsp;
                        </span>
                        </>}
                    {elemnt.target!="general"?<> <strong>{elemnt.target} &nbsp; | &nbsp; </strong> </> : <> - </> } {elemnt.note}
                    </div>
                </React.Fragment>)}
            </>}
            {theDeparture.flights[i]?.length>0&& <> 
                &nbsp;<strong>Flights:</strong>
                <div style={{ paddingRight:"12px"}}>
                {theDeparture.flights[i].map((elem,i)=><React.Fragment>
                    {eachFlight(elem)}
                </React.Fragment> )}
                </div>
            </>}
            <span style={{width:"100%", height:"5px", borderBottom:"dotted 2px grey ", paddingBottom:"33px", marginBottom:"9px"  }} />
        </React.Fragment> )
        return(<>
        <div className={styles.spaceBetRow}>
            <h2>Day by Day:</h2>
            {addOperationalNote? <>
                <span onClick={()=>setAddOPNote(false)}>
                    <CancelPresentationIcon/>
                </span>
            </>:<>
                <span onClick={()=>{
                    setAddOPNote({
                        "target":"general"
                        })
                    }}>
                    <AddCircleOutlineIcon/>
                </span>
            </>}
        </div>
        <div className={styles.dayByDayCont}>
            {theProgramDays}
        </div>
        </>)
    }

    // planner
    const operationsPlanner=( activeDep, thePlannerData )=>{

        let allItins =[
            ...fetchedItins, ...LTCItins, ...EcoAndesItins
        ]

        const eachDayDet=(theDayDet, dayIndexx)=>{

            let tempDayIndx 
            if(dayIndexx===0){
                tempDayIndx = toDate
            } else {
                tempDayIndx = addDays(toDate, dayIndexx)
            }

            let startingDate = new Date(theDayDet.startingDate)
            let dayIndex =  Math.ceil((tempDayIndx.getTime() - startingDate.getTime()) / (1000*3600*24))
            let foundItin = allItins.find(element => (element.id === theDayDet.itineraryID)||(element._id === theDayDet.itineraryID))
            let guestNumb = guestAdder(theDayDet.roomingList)

            let dailyNoteDisp=[]
            if(theDayDet.operationalNotes[dayIndex-1]){
                theDayDet.operationalNotes[dayIndex-1].forEach(elem=>dailyNoteDisp.push(elem))
            }

            let guidesDisp=[]
            let accommodationsDisp=[]
            let transportDisp=[]
            let mealsDisp=[]
            if(theDayDet.dayByDayExp[dayIndex-1]){
                theDayDet.dayByDayExp[dayIndex-1].forEach(elem=>{
                    if(elem.pricekey==="mealBudget" || elem.pricekey==="accommodationBudget"  ){
                    } else if(elem.expenseKey==="guideExpense"){
                        guidesDisp.push(elem)
                    } else if(elem.expenseKey==="accommodation"){
                        accommodationsDisp.push(elem)
                    } else if(elem.expenseKey==="transportExpense"){
                        transportDisp.push(elem)
                    } else if((elem.expenseKey==="variableExpense" && elem.pricekey==="mealService")){
                        mealsDisp.push(elem)
                    }
                })
            }

            return(<>
                <div className={styles.plannerFileDataRow}>
                    <div className={styles.depCardFileTab} >
                        {theDayDet?.tourCode}
                    </div>
                    <div className={styles.depCardGenData}>
                        {theDayDet.duration&& <>Day {dayIndex} / {theDayDet.duration} </>}
                    </div>
                    <div className={styles.depCardGenData}>
                        {theDayDet.maxPaxNumb&& <>{guestNumb}  Guest{guestNumb>1&&<>s</>}</>}
                    </div>
                </div>

                <div className={styles.aPlannerCard} onClick={()=>{
                    setfileSwitch(true)
                    setTheDeparture(theDayDet)
                    setTheItinerary(foundItin)
                }}>
                    <div className={styles.aRow}>
                        <div className={styles.plannerDayDetail}> {foundItin?.dayByDay[dayIndex-1]?.dayTitle} </div>

                        {accommodationsDisp.length>0 &&<>
                        <div className={styles.secondDataBox}>
                        <strong> HOTEL IN:</strong>
                            {accommodationsDisp.map((elem,i)=><React.Fragment key={i}>
                                &nbsp; -- {elem.hotelName} - {elem.contactName} | 0{elem.contactNumb}
                            </React.Fragment> )}
                        </div></>}
                    </div>
                    <div className={styles.aRow}>
                        <div style={{ width:"525px", fontSize:"0.9em", }}>
                            {guidesDisp.length>0 &&<>
                                GUIDES &nbsp; &nbsp; &nbsp; &nbsp;
                                {guidesDisp.map((elem,i)=>
                                <React.Fragment key={i}>
                                    -- {elem.contactName} | 0{elem.contactNumb}
                                </React.Fragment> )}<br/>
                            </>}
                            {transportDisp.length>0 && <>
                                TRANSPORT &nbsp;

                                {transportDisp.map((elem, i)=> 
                                <React.Fragment key={i}> 
                                    -- {elem.contactName} | 0{elem.contactNumb}
                                    </React.Fragment>)}
                            </>} 
                        </div>

                        <div className={styles.secondDataBox}>
                        {dailyNoteDisp.length>0 && <>
                        <strong > NOTES:</strong>
                            {dailyNoteDisp.length>0 && <>
                                {dailyNoteDisp.map((elem,i)=>
                                <React.Fragment key={i}>
                                    {elem.target==="general" &&<> 
                                        -- {elem.note}<br/> 
                                    </>}
                                </React.Fragment> )}
                            </>}
                        <div style={{textTransform:"capitalize"}}>
                            {dailyNoteDisp.length>0 && <>
                                {dailyNoteDisp.map((elem,i)=>
                                <React.Fragment key={i}>
                                    {elem.target!="general" &&<> -- <strong>{elem.target}</strong> {elem.note}</> }
                                </React.Fragment> )}
                            </>}
                        </div>
                        </>}
                        </div>

                    </div>
                </div>
            </>)
        }

        let guestCountToday=0
        activeDep.forEach((elem)=>{
            elem.roomingList?.forEach((elem)=>{
            guestCountToday = guestCountToday + elem.guestArr.length
            })
        })

        const dailyBreakdown=(itinArr, futureDayz)=>{
            let eachDayCount=0
            itinArr[futureDayz-1]?.forEach((elem)=>{
                elem.roomingList?.forEach((elem)=>{
                eachDayCount = eachDayCount + elem.guestArr.length
                })
            })

            return(<>
                <div className={styles.plannerDateDisp}>
                    {addDays(toDate, futureDayz)?.toLocaleDateString('en-GB', dateOptions)}
                </div>
                <div className={styles.generalPlannerGrid}>
                    <div className={styles.spaceBetRow}>
                        <span>Total Pax: {eachDayCount} </span>
                        <span>Total Departures: {itinArr[futureDayz-1]?.length} </span>
                    </div> <br/>

                    {itinArr[futureDayz-1]?.map((elem,i)=> <React.Fragment key={i}> 
                        {eachDayDet(elem, futureDayz)}
                    </React.Fragment> )}
                    
                </div>
            </>)

        }


        return(<>
            <div className={styles.returnUIBar} onClick={()=>{setPlannerTrig(false)}}>
                <span> 
                <ArrowBackIosNewIcon/></span> BACK 
            </div>
            <div className={styles.spaceBetRow}>
                <h2>Weekly Planner</h2> 
            </div>

            <div className={styles.plannerDateDisp}>
                <strong> TODAY </strong> {toDateDisplayer}
            </div>
            <div className={styles.generalPlannerGrid}>
                <div className={styles.spaceBetRow}>
                    <span>Total Pax: {guestCountToday} </span>
                    <span>Total Departures: {activeDep.length} </span>
                </div> <br/>

                {activeDep.map((elem,i)=> <React.Fragment key={i}> 
                    {eachDayDet(elem, 0)}
                </React.Fragment> )}
            </div>


            {dailyBreakdown(thePlannerData,1)}
            {dailyBreakdown(thePlannerData,2)}
            {dailyBreakdown(thePlannerData,3)}
            {dailyBreakdown(thePlannerData,4)}


            {/* next Day */}
        </>)
    }
    const departureChecklistDisp=()=>{
        return(<>
        <div className={styles.spaceBetRow} >
            <h2>Checklist</h2>
            {checklistSwitch? <>
                <span onClick={()=>setChecklistSwitch(false)}> <EditOffIcon/> </span>
            </> : <>
                <span onClick={()=>setChecklistSwitch(true)}> <EditIcon/> </span>
            </> }
        </div>
            {theDeparture.theCheckList&&<>
            {Object.keys(theDeparture.theCheckList).map((elem, i)=><React.Fragment key={i}>
                <div className={styles.eachCheckbox}>  
                    <input type="checkbox" 
                    id={`${elem}Checkbox`} checked={theDeparture.theCheckList[elem]} onClick={()=>{
                        if(theDeparture.theCheckList[elem]){
                            let tempObj = {
                                    ...theDeparture.theCheckList,
                                    [elem]:false
                                }
                            setTheDeparture({
                                ...theDeparture,
                                "theCheckList": tempObj
                            })
                        } else {
                            let tempObj = {
                                    ...theDeparture.theCheckList,
                                    [elem]:true
                                }
                            setTheDeparture({
                                ...theDeparture,
                                "theCheckList": tempObj
                            })
                        }
                    }}  />
                    <div className={styles.spaceBetRow} > 
                        <label htmlFor={`${elem}Checkbox`} >{elem} </label>
                        {checklistSwitch&&<>
                            <span onClick={()=>{
                                let tempObj = delete theDeparture.theCheckList[elem]
                                setTheDeparture({
                                    ...theDeparture,
                                    "theCheckList": theDeparture.theCheckList
                                })
                            }} ><RemoveCircleOutlineIcon/> </span>
                        </>}
                    </div>
                </div>
            </React.Fragment>)}
            </>}
            {checklistSwitch&&<> 
                <div className={styles.spaceBetRow} style={{display:"flex", alignItems:"flex-end", justifyContent:"center", width:"60%" }}> 
                <input
                    type='text'
                    className={styles.inputUserUI}
                    placeholder="Add to List"
                    onChange={(e)=>{
                        setTempCheckList(e.target.value)
                    }}
                    id="checkboxInput"
                />
                <span onClick={()=>{
                    if(theDeparture.theCheckList){
                        let tempObj = {
                            ...theDeparture.theCheckList,
                            [tempChecklist]: false
                        }
                        setTheDeparture({
                            ...theDeparture,
                            "theCheckList":tempObj
                        })
                    } else {
                        setTheDeparture({
                            ...theDeparture,
                            "theCheckList": { [tempChecklist]: false }
                        })
                    }
                    setTempCheckList()
                    document.getElementById("checkboxInput").value=''
                }} ><AddCircleOutlineIcon/> </span>
                </div>
            </>}
        </>)
    }
    ///////////////////////////////////////////
    // File funtions
    const aFileDisplayer=(theItin, theDep)=>{
        const changeTabGenFunct=()=>{
            setAddOPNote(false);
            setEditSwitch(false);
            setDocSwitch(false);
            setLang("english");
            setDocumentGenera(false)
            setExpTrig(false);
            setChecklistSwitch(false)
            setDocTrigs({
                "logo":true,
                "roomingList":true,
                "guestNotes":true,
                "bootSizes":true,
                "dayDescript":false,
            })
        }
        return(<>
        <div className={styles.aFileContainer}>
        {/* keys */}
            <div className={styles.aDepKeysandNav} id="floatingDepNav" >
                <div className={styles.depFunctBar}>
                    <div onClick={()=>{
                        setexitDocTrig(true)
                    }}>
                        <CloseFullscreenIcon />
                    </div>
                    <Dialog open={exitDocTrig} maxWidth={'xl'} onClose={()=>{setexitDocTrig(false)}}>
                        <div className={styles.spaceBetRow}> 
                            <div className={styles.popUpBTN} onClick={()=>{
                                setFileKey("intro")
                                setTheDeparture()
                                setTheItinerary()
                                setfileSwitch(false)
                                setTLObj(false)
                                setexitDocTrig(false)
                                setLang("english")
                            }}> 
                                Exit
                            </div>
                            <div className={styles.popUpBTN} onClick={()=>{
                                saveFunction(theDeparture)
                                setFileKey("intro")
                                setTheDeparture()
                                setTheItinerary()
                                setfileSwitch(false)
                                setTLObj(false)
                                setexitDocTrig(false)
                                setLang("english")
                            }}> 
                                Save & Exit
                            </div>
                        </div>
                    </Dialog>
                    {saveIconDisp(saveDocSwitch, saveFunction, )}
                </div> 
                <div className={styles.spaceBetRow}>
                    {fileDisplayKey==="intro"? <> <h1>Home</h1></>
                        :fileDisplayKey==="checklist"?<><h1>Checklist</h1></>
                        :fileDisplayKey==="rooming"?<><h1>Rooming</h1></>
                        :fileDisplayKey==="providers"?<><h1>providers</h1></>
                        :fileDisplayKey==="expenses"?<><h1>expenses</h1></>
                        :fileDisplayKey==="dayByDay"?<><h1>Day By Day</h1></>
                        :fileDisplayKey==="flights"&&<><h1>flights</h1></>}

                    <div className={styles.keySelectors}>        
                        {fileDisplayKey!="intro"&&<> 
                            <span onClick={()=>{setFileKey("intro"); changeTabGenFunct(); }}>
                                <HomeIcon/> </span></>}
                        {fileDisplayKey!="checklist"&&<> 
                            <span onClick={()=>setFileKey("checklist")}>
                            <ChecklistIcon/> </span></>}

                        {fileDisplayKey!="flights"&&<>
                            <span onClick={()=>{
                                setFileKey("flights"); 
                                setFlightObj({"target": "group"})
                                setLang("english")
                            }}> <FlightIcon/> </span></>}

                            {/* future cruise functionality */}
                            {/* {(fileDisplayKey!="cruises"&& theDep.roomingList.length>0) &&<>
                                <span onClick={()=>{setFileKey("cruises")}}> <SailingIcon/> </span>
                            </>} */}

                        {fileDisplayKey!="rooming"&&<> 
                            <span onClick={()=>{setFileKey("rooming"); changeTabGenFunct();}}>
                                <PeopleAltIcon/> </span></>}
                        {fileDisplayKey!="providers"&&<>
                            <span onClick={()=>{setFileKey("providers"); changeTabGenFunct() }}>
                                <HandshakeIcon/> </span></>}
                        {fileDisplayKey!="expenses"&&<> 
                            <span onClick={()=>{setFileKey("expenses"); changeTabGenFunct() }}>
                                <RequestQuoteIcon/></span></>}
                        {fileDisplayKey!="dayByDay"&&<> 
                            <span onClick={()=>{setFileKey("dayByDay"); changeTabGenFunct() }}>
                                <DateRangeIcon/></span></>}
                    </div>
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <div>
                    <h3>{theDep?.tourCode}</h3>
                    <h1>{theItin?.tripName}</h1>
                </div>
                {departureStatusDisp(theDep)}
            </div>
            {fileDisplayKey==="intro"&&<>
                {aFileHome(theItin, theDep)}
            </>}
            {fileDisplayKey==="checklist"&&<>
                {departureChecklistDisp()}
            </>}
            {fileDisplayKey==="rooming"&&<>
                {roomingListDisp(theDep)}
            </>}
            {fileDisplayKey==="providers"&&<>
                {documentGenerator? <> 
                    {documentCreator(documentGenerator)}
                </>:<>
                    {contactArrDisp(providerArr)}
                </>} 
            </>}
            {fileDisplayKey==="expenses"&&<>
                {expenseDisplayer(theDep?.dayByDayExp, theItin?.dayByDay)}
            </>}
            {fileDisplayKey==="dayByDay"&&<>
                {dayByDayDisp(theItin?.dayByDay, theDep?.startingDate)}
            </>}
            {fileDisplayKey==="flights"&&<>
                {flightsDisp()}
                {editSwitch&& <>
                    <br/> {flightsAdderForm()}
                </>}
            </>}
            {/* {fileDisplayKey==="cruises"&&<>

            </>} */}
        </div>

        {/* Expense Adder Dialog */}
        <Dialog open={expenseTrig}  maxWidth={"xl"} onClose={()=>setExpTrig(false)}>
            <div className={styles.aFileContainer}>
                <h3>Add expense to day {dayIndex+1} </h3>
                {optCataloger(thePriceChart)}
                {expenseAdder(anExpense, setAnExpense, providerArr, dayIndex, theDeparture, setTheDeparture, paxData)}
            </div>
        </Dialog>

        {/* Expense Editor Dialog */}
        <Dialog open={expenseEditTrig}  maxWidth={"xl"} onClose={()=>{
            setExpEditTrig(false)
            setAnExpense()
            setExpenseIndex()
        }}>

            <div className={styles.aFileContainer}>
                {expenseEditor(anExpense, setAnExpense, expenseIndex, dayIndex, theDeparture, setTheDeparture, paxData)}
            </div>
        </Dialog>

        {fileDisplayKey==="intro"&&<>
            {aFileHomeEdit()}
        </>}
        {addGuestTrig&&<>
            {roomingListEdit(false, roomingEditIndex, )}
        </>}

        {editTLTrig&& <> 
            {roomingListEdit(true, roomingEditIndex)}
        </>}
        {(addGuest || paxData?.paxTotal===0) &&<>
            <br/>
            <br/>
            <div className={styles.printDEL}>
                {addGuestCont()}
            </div>
        </>}
        {addTLObj&&<>
            <br/>
            <br/>
            <div className={styles.printDEL}>
                {addGuestCont(true)}
            </div>
        </>}
        </>)
    }

    // Op Page Home
    const weeklyAssignment=()=>{
        // display weekly assignment
        return(<>
            fetched from 
        </>)
    }

    return(<>
        <div className={styles.aGMSPage}>
        {session&&<> 
            <GMSNavii user={session.user} />
            <div className={styles.titleBar}>
                <HubIcon fontSize="large" />
                <h1 style={{margin: "6px 0"}}>Operations</h1>
            </div>  
            {loadingTrigger? <>
                {loadingScreen("Fetching Departure Data")}
            </>:<>
                {/* Daily(monthly||weekly ) Planner */}
                {theDeparture? <>
                    {fileSwitch ? <>
                        {aFileDisplayer(theItinerary, theDeparture)}
                    </>:<> 
                        {depCreator(theItinerary, theDeparture)}
                    </>}
                </> : plannerTrig ? <>
                {/* PLANNER */}
                    {operationsPlanner(activeDeps, weeklyPlanner)}   
                </> : createdep ? <>
                    {departureCreator()}
                </> : <>
                    {/* Home */}
                    <div className={styles.operPageHome}>
                        {/* Dep Highlights */}
                        <div className={styles.verticalCont}>
                            {depDisplayer(activeDeps, "active Departures", true)}
                            {depDisplayer(upcomingDeps, "upcoming Departures", false)}
                        </div>
                        {/* Home Side Bar */}
                        <div className={styles.verticalCont}>
                            <strong className={styles.printDEL} >{toDateDisplayer}</strong><br/>
                            {statsDisplayer(activeDeps, upcomingDeps)}
                            <div className={styles.statsBar} onClick={()=>{
                                window.scrollTo({top: 0})
                                setPlannerTrig(true);  
                                }}>
                                open planner</div>

                            <div className={styles.statsBar} onClick={()=>{
                                window.scrollTo({top: 0})
                                setCreateDep(true)
                                }}> 
                                create departure
                                </div>
                        </div>
                        {/* {weeklyAssignment()} */}
                    </div>
                </>}
            </>}
        </>}
        </div>
    </>)
}