import React, { useState } from 'react'
import { useEffect } from 'react'
import { GMSNavii } from "../../components/navis";
import { useSession } from "next-auth/react"

import CircularProgress from '@mui/material/CircularProgress';
import HubIcon from '@mui/icons-material/Hub';

import styles from "../../styles/pages/operations.module.css"

import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import SaveIcon from '@mui/icons-material/Save';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import FlightIcon from '@mui/icons-material/Flight';
import SailingIcon from '@mui/icons-material/Sailing';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { aDropdownPicker, anInputDisplayer, flightsAdder} from "../../components/forms"

import LTCPriceTables from "../../data/LTCPriceTables2023.json"
import LTCItins from "../../data/LTCItinerary.json"
import EcoAndesItins from "../../data/ecoAndesFixedDepartures.json"

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
    "transport": "Transport"
}
const aRoomModel={
  "guestArr":[
      {
        "guestName": String,
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
    "tourLeader":false,
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

  // OPERATIONS DASHBOARD

  // - Fetch departures and itineraries (to create departures)

  // - Deliver stats calculated at moment of login
    // number of active groups
    // number of clients
    // nationalities

  // Generate opDocs, roomingLists, automatic emails for providers.  

    // OPERATIONS DOCUMENTS:
    // - ORDEN DE TRABAJO:
    //  - Rooming List 
    // provide hotel data & edit cap
    // provider database
    // -- guides
    // -- hotels
    // -- cruise
    // -- transportation


    //  NON OP: add contact from DB to expense. 
    //  NON OP: duplicate hotel accommodations on following nights
    //  NON OP: edit prev set expenses. 
    //  Yacht Reservation Form
    // requerimiento economico (cash management)
    
    
    
    // For active departures, show day title of currently running day, hotel, guide name.
    // planner page: print horizontally, 

    const { data: session } = useSession()

    const [activeDeps, setActiveDeps]=useState([])
    const [fetchedDeps, setFetchedDeps]=useState([])
    const [fetchedItins, setFetchedItins]=useState([])
    const [upcomingDeps, setUpcomingDeps]=useState([])
    const [fixedDeps, setFixedDeps]=useState([])

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
    const [anExpense, setAnExpense]=useState()
    const [addHotelTrig, setHotelAddTrig]=useState(false)

    // roomingList
    const [paxData, setPaxData]=useState()
    const [newRoomObj, setRoomObj]=useState(aRoomModel)
    const [addGuest, setAddGuest]=useState(false)
    const [guestAddCount, setGuestAddCount]=useState(0)
    const [addGuestNote, setAddGuestNote]=useState(false)
    const [addTLObj, setTLObj]=useState(false)
    const [addTLNote, setTLNote]=useState(false)
    const [roomingEditIndex, setRoomingEditIndex]=useState(null)

    // general utils
    const [fileSwitch, setfileSwitch]=useState(false)
    const [editSwitch, setEditSwitch]=useState(false)
    const [docsSwitch, setDocSwitch]=useState(false)
    const [dayIndex, setDayIndex]=useState()
    const [temporaryRoomObj, setTempRoomObj]=useState({})
    const [loadingTrigger, setLoadingTrig]=useState(true)
    const [addDepartureNote, setAddDepartureNote]=useState(false)
    const [documentGenerator, setDocumentGenera]=useState(false)
    const [addOperationalNote, setAddOPNote]=useState(false)
    const [opDocEditSwitch, setOPDocSwitch]=useState(false)
    const [saveDocSwitch, setSavedoc]=useState(true)

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
    useEffect(async()=>{
        const res = await fetch("/api/gms/departures",{
        method: "GET"
        })
        let fetchedData = await res.json()
        if(fetchedData){
        setFetchedDeps(fetchedData);

        // filter for deps active today. upper limit defined by midnight end of day
            let theTempArr=[]
            let anotherTempArr= []
            fetchedData.forEach(element => {
                let loweLimitDate=new Date(element.startingDate)
                let theDur = parseInt(element.duration)
                let upperLimitDate = addDays(element.startingDate, theDur+1)
                //  filters out currently active voyages. 
                if((toDate > loweLimitDate) && (upperLimitDate > toDate) ){
                    theTempArr.push(element)
                }
                if (loweLimitDate >= toDate ){
                    anotherTempArr.push(element)
                }
            })
            setActiveDeps(theTempArr)
            setUpcomingDeps(anotherTempArr)
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
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setEditSwitch(false)
        setTempRoomObj({})
        setAddGuest(false)
        setGuestAddCount(0)
        setAddOPNote(false)
        setOPDocSwitch(false)
        setAnExpense()
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
    const aDateDisp=(dateLabel, theDate, tripDuration, dayIndex)=>{
        let firstDate=new Date(theDate)
        let toDateFormatter 
        let upperLimitDate           
        if(tripDuration){
            let theDuration = parseInt(tripDuration)-1
            upperLimitDate = addDays(theDate, theDuration)
            toDateFormatter = upperLimitDate.toLocaleDateString('en-GB', dateOptions)
        } else if (dayIndex) {
            let theDayIndex = parseInt(dayIndex)
            upperLimitDate = addDays(theDate, theDayIndex +1)
            toDateFormatter = upperLimitDate.toLocaleDateString('en-GB', dateOptions)
        } else {
            toDateFormatter = firstDate.toLocaleDateString('en-GB', dateOptions)
        }
        return(<>
        <div className={styles.eachDateCont}>
            <div className={styles.eachDetailTitle}>{dateLabel}</div>
            <div>  
                {toDateFormatter}                
            </div>
        </div>
        </>)
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
                <> <span className={styles.statusOne}>.</span>on Sale</> 
            : theDep.saleProcess==="reserved"?
                <><span className={styles.statusTwo}>.</span>Reserved</> 
            : theDep.saleProcess==="confirmed"&&
                <><span className={styles.statusThree}>.</span>Confirmed</> }
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
                    {!elem.user&& <> {elem.countryList.map((elemz)=><> {elemz} </>)} </>}
                </div>
                <h3>{elem.tripName}</h3>
                <div className={styles.spaceBetRow}>
                {elem.duration} days
                <span className={styles.createDepBTN} onClick={()=>{
                    if(elem.user){
                        setTheDeparture({
                            ...aDepModel,
                            "itineraryID": elem._id,
                            "duration":elem.duration
                        })
                    } else {

                        setTheDeparture({
                            ...aDepModel,
                            "itineraryID": elem.id,
                            "duration":elem.duration
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
            {logoSwitcher(theItin)}
            <h2>{theItin.tripName}</h2>
            <form onSubmit={async(e)=>{
            e.preventDefault(),
            // send dep to BE
            setfileSwitch(true)
            setSavedoc(false)
            let reqData = JSON.stringify({
                ...theDeparture,
                "dateCreated":toDate,
                "tripName": theItin.tripName,
                "version": 0,
                "status": 1,
                "user": {
                    "name": session.user.name,
                    "email": session.user.email
                    }
            })
            const res = await fetch("/api/gms/departures", {
                method: "POST",
                body: reqData
            })
            const depCreationRes = await res.json()
            if(res.status===200){
                window.alert("Departure Created! Add aditional information below, and do not forget to save your work!")
                setSavedoc(true)
            }

            }}>
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
                            setTheDeparture({...theDeparture,
                                "startingDate": e.target.value
                            })
                        }}
                        placeholder='Departure Date'
                    />
                </div>
                <div style={{width:"49%"}}>
                    {aDateDisp("Starting Date", theDeparture.startingDate, 1)}
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <div style={{width:"49%"}}>
                    <strong>DURATION:</strong> {theItin.duration} days
                </div>
                <div style={{width:"49%"}}>
                    {aDateDisp("Ending Date", theDeparture.startingDate, theItin.duration )}
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <div style={{width:"49%"}}>
                    {anInputDisplayer("Tour Code*", "tourCode", "text", true, "Ex: USA AZ 01 22", theDeparture, setTheDeparture, )}
                </div>
                <div style={{width:"49%"}}>
                    {anInputDisplayer("reference", "tripRef", "text", false, "Ex: Lincoln x 5", theDeparture, setTheDeparture, )}
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <div style={{width:"49%"}}>
                    {anInputDisplayer("Company*", "aComp", "text", true, "Ex: Darkwing Tours", theDeparture, setTheDeparture, )}
                </div>
                <div style={{width:"49%"}}>
                    {anInputDisplayer("Contact", "compContact", "text", false, "Ex: Maria Molina", theDeparture, setTheDeparture, )}
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <div style={{width:"49%"}}>
                    {anInputDisplayer("Guest Maximum*", "maxPaxNumb", "number", true, "Ex: 16", theDeparture, setTheDeparture, 0 )}
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
    const depDisplayer=(depArr, theTitle, isActive )=>{
        const guestAdder=(roomingLi)=>{
            let theAdder=0
            roomingLi.forEach(elem=> {
                theAdder = theAdder + elem.guestArr.length
            })
            return(<>{theAdder}</>)
        }
        let allItins =[
            ...fetchedItins, ...LTCItins
        ]        
        const currentOPDay=(theDep, availTtins, dispCntroller)=>{
            let startingDate = new Date(theDep.startingDate)
            let dayIndex =  Math.ceil((toDate.getTime() - startingDate.getTime()) / (1000*3600 *24))
            let foundItin = availTtins.find(element => (element.id === theDep.itineraryID)||(element._id === theDep.itineraryID))

            if(dispCntroller==="dayTitle"){
                return(<><div> {foundItin?.dayByDay[dayIndex-1].dayTitle} </div></>)
            } else if(dispCntroller==="dayCount"){
                return(<>{dayIndex}</>)
            }
        }

        let depMapper 
        if(isActive){
            depMapper= depArr.map((elem, i)=><React.Fragment key={i}>
            <div className={styles.spaceBetRow}> 
                <div /> 
                <div className={styles.depCardFileTab}>
                    {elem.tourCode}
                </div>
            </div>
            <div className={styles.aDepCard} onClick={()=>{
                let foundItin = allItins.find(element => (element.id === elem.itineraryID)||(element._id === elem.itineraryID))
                setfileSwitch(true)
                setTheDeparture(elem)
                setTheItinerary(foundItin)
            }}>
                <div className={styles.depCardRow}>
                    {/* <span>{elem.startingDate}</span> */}
                    <strong> {elem.tripName} </strong>
                    <span>{currentOPDay(elem, allItins, "dayCount")}/{elem.duration} days &nbsp;
                    {guestAdder(elem.roomingList)}/{elem.maxPaxNumb} pax
                    </span>
                </div>
                <div className={styles.depCardRow}>
                    {currentOPDay(elem, allItins, "dayTitle")}
                </div>
            </div>
        </React.Fragment> )
        } else {
            depMapper = depArr.map((elem, i)=><React.Fragment key={i}>
            <div className={styles.aDepCard} onClick={()=>{
                let allItins =[
                    ...fetchedItins, ...LTCItins
                ]
                let foundItin = allItins.find(element => (element.id === elem.itineraryID)||(element._id === elem.itineraryID))
                setfileSwitch(true)
                setTheDeparture(elem)
                setTheItinerary(foundItin)
            }}>
                <div className={styles.spaceBetRow}> 
                    {elem.startingDate}
                    <span>
                        {elem.duration} D
                    </span>
                </div>
                <strong> {elem.tripName} </strong>
            </div>
        </React.Fragment> )
        }

        if(depArr.length>0){
        return(<>
            <div className={styles.depCardCont}>
                <div className={styles.spaceBetRow}>
                    <h2> {theTitle} </h2>
                    <span>{depArr.length}</span>
                </div>
                <div className={styles.depCardMapper} >  
                    {depMapper}
                </div>
            </div>
        </>)
        }
    }

    // flights
    const flightsAdderForm=(minDate, )=>{
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
                aTempGuestArr.push(elemental.guestName)
            })
        })
        return(<>
        <form id="flightAdderForm" onSubmit={(e)=>{
            e.preventDefault();
            // add to flight arr with day index

            console.log("add flight to dep")

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
                <div style={{width:"48%" }}>
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
                        {theDateOpts.map((elem,i)=><React.Fragment key={i}>
                            <option value={JSON.stringify(elem)}> {elem.theDate.toLocaleDateString('en-GB', dateOptions)} </option>
                        </React.Fragment>)}
                    </select>                 
                    </>}
                </div>
                <div style={{width:"48%" }}> 
                    <div className={styles.inputLabel}>
                        Select Date
                    </div>
                    <input className={styles.inputUserUI} type="time" />
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
                    {anInputDisplayer("Airline", "airline", "text", true, false, flightObj, setFlightObj)}
                </div>
                <div style={{width:"48%" }}> 
                    {anInputDisplayer("flight #", "flightNumb", "text", true, false, flightObj, setFlightObj )}
                </div>
            </div>
            <div className={styles.spaceBetRow}> 
                <div style={{width:"48%" }}> 
                    {anInputDisplayer("Confirmation #", "confNumber", "text", true, false, flightObj, setFlightObj )}
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
    const flightsDisp=()=>{
        let minDate = addDays(theDeparture.startingDate, -1).toISOString().split("T")[0]

        return(<>
            <div className={styles.spaceBetRow}> 
                <h2>Flights</h2>
                <div style={{cursor:"pointer", paddingRight: "12px"}} 
                    onClick={()=>{
                    if(editSwitch){setEditSwitch(false)} else {setEditSwitch(true)}
                }}>
                    {theDeparture.flights.length>0 && <>
                    {editSwitch?<><EditOffIcon/></>:<><EditIcon/></>}
                    </>}
                </div>                
            </div>
            {theDeparture.flights.length>0? <> 

            </>:<>
                {flightsAdderForm(minDate)}
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

  ///////////////////////////////////////////
  // File funtions
    const aFileDisplayer=(theItin, theDep)=>{
        return(<>
        {/* keys */}
        <div className={styles.providerFuncBar}>
            <div onClick={()=>{
                setFileKey("intro")
                setTheDeparture()
                setTheItinerary()
                setfileSwitch(false)
                setTLObj(false)
            }}>
                <CloseFullscreenIcon />
            </div>
            {saveIconDisp(saveDocSwitch, saveFunction, )}
        </div>

        <div className={styles.spaceBetRow} style={{width:"760px" }}>
            <span onClick={()=>{
                // Delete Departure
            }}> 
            {/* <DeleteForeverIcon/>  */}
            </span>
            <div className={styles.keySelectors}>
                {fileDisplayKey!="intro"&&<> 
                    <span onClick={()=>{setFileKey("intro"); setEditSwitch(false); setDocSwitch(false); setDocumentGenera(false); setExpTrig(false)}}>home </span></>}
                {fileDisplayKey!="rooming"&&<> 
                    <span onClick={()=>{setFileKey("rooming"); setEditSwitch(false); setDocSwitch(false); setDocumentGenera(false); setExpTrig(false)}}>pax & rooming </span></>}
                {fileDisplayKey!="providers"&&<> {providerArr.length>0&&<> 
                    <span onClick={()=>{setFileKey("providers"); setEditSwitch(false); setDocSwitch(false); setDocumentGenera(false); setExpTrig(false)}}>providers </span>
                    </>}</>}
                {fileDisplayKey!="expenses"&&<> 
                    <span onClick={()=>{setFileKey("expenses"); setEditSwitch(false); setDocSwitch(false); setDocumentGenera(false); setExpTrig(false)}}>expenses</span></>}
                {fileDisplayKey!="dayByDay"&&<> 
                    <span onClick={()=>{setFileKey("dayByDay"); setEditSwitch(false); setDocSwitch(false); setDocumentGenera(false); setExpTrig(false)}}>day by day</span></>}
                {/* {fileDisplayKey!="flights"&&<> 
                    <span onClick={()=>{setFileKey("flights"); setEditSwitch(false); setDocSwitch(false); setDocumentGenera(false); setExpTrig(false)}}>flights</span></>} */}
            </div>
        </div>


        {/* Display */}
        <div className={styles.aFileContainer}>
            {fileDisplayKey==="intro"&&<>
                {itineraryHeaderDisp(theItin, theDep)}
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
                {expenseDisplayer(theDep.dayByDayExp, theItin.dayByDay)}
            </>}
            {fileDisplayKey==="dayByDay"&&<>
                {dayByDayDisp(theItin.dayByDay)}
            </>}

            {fileDisplayKey==="flights"&&<>
                {flightsDisp()}
            </>}
            {fileDisplayKey==="cruises"&&<>

            </>}
        </div>

        <div className={styles.extraSelectors}> 
            {/* If flights, from useEffect, link to flights page */}
            {(fileDisplayKey!="flights"&& theDep.roomingList.length>0) &&<>
                <span onClick={()=>{
                    setFileKey("flights"); 
                    setFlightObj({"target": "group"})
                }}> <FlightIcon/> </span>
            </>}
            {(fileDisplayKey!="cruises"&& theDep.roomingList.length>0) &&<>
                <span onClick={()=>{setFileKey("cruises")}}> <SailingIcon/> </span>
            </>}
        </div>

        {expenseTrig&&<>
            <div className={styles.aFileContainer}>
                <h3>Add expense to day {dayIndex+1} </h3>
                {optCataloger(thePriceChart)}
                {expenseEditor(anExpense, setAnExpense, providerArr, dayIndex, theDeparture, setTheDeparture, paxData)}
            </div>
        </>}
        {fileDisplayKey==="intro"&&<>
            {headerEdit()}
        </>}
        {temporaryRoomObj.guestArr&&<>
            {roomingListEdit("edit")}
        </>}
        { (addGuest || paxData?.paxTotal===0) &&<>
            <br/>
            <br/>
            {addGuestCont()}
        </>}
        {addTLObj&&<>
            <br/>
            <br/>
            {addGuestCont(true)}
        </>}
        </>)
    }

    let paxTotalCount=<>{paxData?.paxTotal} / {theDeparture?.maxPaxNumb} maximum</>

  // Stats
    const statsDisplayer=(activeDepartures, upcomingDeps)=>{
        // sum up all current clients in Rooming List
        // = number of active clients.
        // sum active tours

    // summ all guests in rooming list
        let clientGeneralSum = 0

        activeDepartures.forEach((elem,i)=>{
            elem.roomingList?.forEach((elem)=>{
            clientGeneralSum = clientGeneralSum + elem.guestArr.length
            })
        })

        const eachDataRow=(theDataKey, dataValue)=>{
        return(<>
            <div style={{ display: "flex", justifyContent:"space-between", padding:"0 6px" }}>
            <h5> {theDataKey} </h5>
            <h5> {dataValue} </h5>
            </div>
        </>)
        }
        return(<>
        <div className={styles.statsBar}> 
        {activeDepartures.length>0? <> 
            <h3>General Statistics:</h3>
            {eachDataRow("ACTIVE DEPARTURES:", activeDepartures.length )}
            {eachDataRow("PAX TOTAL:", clientGeneralSum )}
            <div className={styles.aLineSeparator}/>
            {eachDataRow("UPCOMING DEPARTURES:", upcomingDeps.length )}
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
    const logoSwitcher=(theItin)=>{
        switch (theItin.LTCLogo) {
            case "galapagosElements":
                return(<><h3>Galapagos Elements</h3></>);
            case "ecoAndes":
                return(<><h3>EcoAndes Travel</h3></>);
            case "yacuma":
                return(<><h3>Yacuma EcoLodge</h3></>);
            case "unigalapagos":
                return(<><h3>Unigalapagos</h3></>);
            default:
                break;
        }
    }
    const eachIntroDetail=(theTitle, theDetail)=>{
        return(<>
        <div className={styles.eachDetailCont}>
            <div className={styles.eachDetailTitle}>{theTitle}</div>
            <div>{theDetail}</div>
        </div>
        </>)
    }
    const itineraryHeaderDisp=(theItin, theDep)=>{
        if(theItin){
        return(<>
            <div className={styles.spaceBetRow}>
                <div>
                    {logoSwitcher(theItin)}
                    <h1>{theItin.tripName}</h1>
                </div>
                <div className={styles.aColumn}>
                {departureStatusDisp(theDep)}
                <div style={{cursor:"pointer", paddingRight: "20px"}} 
                    onClick={()=>{
                    if(editSwitch){setEditSwitch(false)} else {setEditSwitch(true)}
                }}>
                    {editSwitch?<><EditOffIcon/></>: <><EditIcon/></>}
                </div>
                </div>
            </div>

            <div className={styles.roomingListCont} > 
                <div className={styles.detailDispl}>
                    {theItin.tripLang&&<>{eachIntroDetail("trip language", theItin.tripLang)}</>}
                    {theDep.tourCode&&<>{eachIntroDetail("Tour code", theDep.tourCode)}</>}
                    {theDep.aComp&&<>{eachIntroDetail("company", theDep.aComp)}</>}
                    {theDep.compContact&&<>{eachIntroDetail("contact", theDep.compContact)}</>}
                    {theDep.tripRef&&<>{eachIntroDetail("trip Reference", theDep.tripRef)}</>}
                    {theDep.maxPaxNumb&&<>{eachIntroDetail("guests", paxTotalCount)}</>}
                </div>
            <h2> Tour Dates </h2>
            <div className={styles.spaceBetRow}> 
                <div style={{width: "47%" }}>
                    {aDateDisp("starting date", theDep.startingDate)}
                </div>
                <div style={{width: "47%" }}>
                    {aDateDisp("Ending date", theDep.startingDate, theDep.duration)}
                </div>
            </div>
            </div>
        </>)
        }
    }
    const headerEdit=()=>{
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
                            <option disabled defaultValue > Select Status </option>
                            {theDeparture.saleProcess!=="onSale"&& <>  
                                <option value="onSale"> On Sale</option></>}
                            {theDeparture.saleProcess!=="reserved"&& <>  
                                <option value="reserved"> Reserved</option></>}
                            {theDeparture.saleProcess!=="confirmed"&& <>  
                                <option value="confirmed"> Confirmed</option></>}
                        </select>
                    </div>

                    {departureStatusDisp(theDeparture)}
                
                </div>
                <div className={styles.spaceBetRow}>
                    <div style={{width: "47%" }}>
                        {anInputDisplayer("starting Date", "startingDate", "date", false, theDeparture.startingDate, theDeparture, setTheDeparture )}
                    </div> 
                    <div style={{width: "47%" }}>
                        {aDateDisp("Arrival Date", theDeparture.startingDate, theDeparture.duration)}
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

  // rooming 
    const roomingListDisp=(theDep)=>{
        const ageConverter=(theDOB)=>{
            if(theDOB){
                let clientDOB=new Date(theDOB)
                return toDate.getUTCFullYear() - clientDOB.getUTCFullYear()
            }
        }
        let eachNote=[]
        const eachGuestData=(guestData)=>{
        if(guestData.guestNotes){
            eachNote.push({
                "name":guestData.guestName,
                "notes":guestData.guestNotes
            })
        }
        return(<>
            <div className={styles.roomingGuestRow}>
                <div style={{width:"180px", textAlign:"start"}}> &nbsp; {guestData.guestName}</div>
                <div style={{width:"120px", borderLeft:"solid 1px black" }}> {guestData.nationality}</div>
                <div style={{width:"100px", borderLeft:"solid 1px black" }}> {guestData.guestDOB}</div>
                <div style={{width:"120px", borderLeft:"solid 1px black" }}> {guestData.passport}</div>
                <div style={{width:"66px", borderLeft:"solid 1px black" }}> {guestData.guestDOB&&<>{ageConverter(guestData.guestDOB)}</>}</div>
            </div>
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
                    {elem?.singleSupp &&<>SINGLE</>}
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

        /////////////////
        return(<>
        <div className={styles.roomingListCont}>
            <div className={styles.spaceBetRow}> 
                <h2> Rooming List</h2>
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
                    <div style={{cursor:"pointer", paddingRight: "196px"}} className={styles.printDEL} onClick={()=>{
                        if(editSwitch){setEditSwitch(false); setTempRoomObj({}); setAddGuest(false); setTLObj(false)} else {setEditSwitch(true)}
                    }}>
                        {editSwitch? <><EditOffIcon/></>: <><EditIcon/></>}
                    </div>
                </>}
            </div>
            {paxData&&<><div className={styles.guestTotal}>{paxData.paxTotal} guests
                {theDep?.tourLeader.guestArr && <> 
                    + {theDep?.tourLeader?.guestArr.length} TL </>}
                </div></>} 
            {theRoomingBreakdownDispl()}

            <div className={styles.roomingListGrid}>
                {paxData.paxTotal>0 && <>
                <div className={styles.roomingListKEYS}>
                    <div style={{width:"33px"}}> # </div>
                    <div style={{width:"108px", borderLeft:"solid 1px black"}}>ROOM TYPE</div>
                    <div style={{width:"180px", borderLeft:"solid 1px black", textAlign:"start" }}>&nbsp;&nbsp;GUEST NAME </div>
                    <div style={{width:"120px", borderLeft:"solid 1px black" }}> NATIONALITY </div>
                    <div style={{width:"100px", borderLeft:"solid 1px black" }}> D.O.B. </div>
                    <div style={{width:"120px", borderLeft:"solid 1px black" }}> PASSPORT </div>
                    <div style={{width:"66px", borderLeft:"solid 1px black" }}> AGE </div>
                </div>
                </>}
                {eachRoom}

                {/* Tour Leader Add & Data */}
                {theDep.tourLeader.guestArr&& <>
                    <h4>Tour Leader</h4>
                    <div className={styles.eachRoomDisplayer}>
                    {/* edit data */}
                    {editSwitch&&<>
                        <div className={styles.editRoomingIcon} onClick={()=>{
                            setTempRoomObj(theDep.tourLeader)
                        }} > 
                        <EditIcon />
                        </div>
                        <div className={styles.deleteARoomIcon} onClick={()=>{
                                setTheDeparture({
                                    ...theDep,
                                    "tourLeader":null
                                })
                            }}>
                            <RemoveCircleOutlineIcon />
                        </div>
                    </>}
                        <div style={{width:"33px"}}> TL </div>
                        <div className={styles.aRoomingDetail} style={{width:"108px", borderLeft:"solid 1px black"}}>
                            SINGLE
                        </div>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            {theDep.tourLeader.guestArr?.map((guestElem, i)=> <> {eachGuestData(guestElem)}</> ) }
                        </div>
                    </div>
                    <div className={styles.eachRoomDisplayer}>
                        <span style={{textTransform:"capitalize"}}>
                        <strong>NOTES:</strong> &nbsp;
                        {theDep.tourLeader.guestArr[0].guestNotes.map((theNote,i)=><React.Fragment key={i}>{i>0&&<>,</>} {theNote}</React.Fragment>)}
                        </span>
                    </div>
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
            {eachNote.length>0&&<>
                <h2>Guest Notes </h2>
                <div className={styles.roomingListGrid}>
                <div className={styles.roomingListKEYS}>
                    <div style={{width:"180px", textAlign:"start" }}>&nbsp; GUEST NAME </div>
                    <div style={{borderLeft:"solid 1px black" }}>&nbsp; SPECIAL INDICATIONS </div>
                </div>
                    {noteDisp}
                </div>
            </>}

            {theDep.departureNotes.length>0 ? <>
            <h2>Departure Notes </h2>
            </> : <> </>}
            {editSwitch?<>
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
                    {theDep.departureNotes?.map((elem, i)=><>
                        <div className={styles.eachGuestNote} onClick={()=>{
                            let tempGuestNotes=theDep.departureNotes.splice(i, 1)
                            setTheDeparture({
                                ...theDep
                            })
                        }} >
                            {elem}&nbsp; <RemoveCircleOutlineIcon />
                        </div> &nbsp; &nbsp;
                    </>)}
                </div>
            </> : <>
                <div className={styles.depNotesCont}>
                    {theDep.departureNotes.map((elem, i)=><>
                        &nbsp; &nbsp; <div style={{textTransform:"capitalize"}}>
                        {i!=0&&<>, </>}
                            {elem}
                        </div>
                    </>)}
                </div>
                <br/>
            </>}
        </div>
        </>)
        }
    }
    const roomingListEdit=()=>{
        // add rooms and guests
        let eachGuestForm
        if(roomingEditIndex>=0){
        eachGuestForm= theDeparture.roomingList[roomingEditIndex].guestArr.map((eachGuestElm,i)=><React.Fragment key={i}>
                <div className={styles.eachGuestTitleEdit}>
                    <h4>Edit guest #{i+1}</h4>
                    <span onClick={()=>{
                    let tempGuestArr = [...theDeparture.roomingList[roomingEditIndex].guestArr]                    
                    tempGuestArr.splice(i, 1)
                    if(tempGuestArr.length===3){
                        let roomUpdate=
                        {
                            ...theDeparture.roomingList[roomingEditIndex],
                            "guestArr":tempGuestArr,
                            "accomodationType": "triple",
                        }
                        let tempRoomiDoobie=theDeparture.roomingList.splice(roomingEditIndex,1, roomUpdate)
                        setTheDeparture({
                        ...theDeparture,
                        })
                    } else if (tempGuestArr.length===2){
                        let roomUpdate=
                            {
                                ...theDeparture.roomingList[roomingEditIndex],
                                "guestArr":tempGuestArr,
                                "accomodationType": "twin",
                            }
                        let tempRoomiDoobie=theDeparture.roomingList.splice(roomingEditIndex,1, roomUpdate)
                        setTheDeparture({
                            ...theDeparture,
                        })
                    } else if (tempGuestArr.length===1){
                        let roomUpdate=
                            {
                                ...theDeparture.roomingList[roomingEditIndex],
                                "guestArr":tempGuestArr,
                                "accomodationType": null,
                                "singleSupp": true,
                            }
                        let tempRoomiDoobie=theDeparture.roomingList.splice(roomingEditIndex,1, roomUpdate)
                        setTheDeparture({
                            ...theDeparture,
                        })
                    }
                    }} > <RemoveCircleOutlineIcon/></span>
                </div>
                <div className={styles.spaceBetRow}>
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
                            let tempRoomUpdater = theDeparture.roomingList[roomingEditIndex].guestArr.splice(i,1,tempGuestObj)
                            setTheDeparture({
                                ...theDeparture,
                            })
                        }}
                        type='text'
                    />
                    </div> 
                <div style={{width: "47%" }}> 
                    <div className={styles.inputLabel}>
                        Nationality
                    </div>
                    <input 
                    className={styles.inputUserUI}
                    placeholder={eachGuestElm.nationality}
                    onChange={(e)=>{
                        let tempGuestObj={
                            ...eachGuestElm,
                            "nationality": e.target.value
                        }
                        let tempRoomUpdater = theDeparture.roomingList[roomingEditIndex].guestArr.splice(i,1,tempGuestObj)
                        setTheDeparture({
                            ...theDeparture,
                        })
                    }}
                    type='text'
                    />
                </div>
                </div>
                &nbsp;
                <div className={styles.spaceBetRow}>
                    <div style={{width: "47%" }}> 
                        <div className={styles.inputLabel}>
                            Passport
                        </div>
                        <input 
                            className={styles.inputUserUI}
                            placeholder={eachGuestElm.passport}
                            onChange={(e)=>{
                                let tempGuestObj={
                                    ...eachGuestElm,
                                    "passport": e.target.value
                                }
                                let tempRoomUpdater = theDeparture.roomingList[roomingEditIndex].guestArr.splice(i,1,tempGuestObj)
                                setTheDeparture({
                                    ...theDeparture,
                                })
                            }}
                            type='text'

                        />

                        </div> 
                    <div style={{width: "47%" }}> 
                        <div className={styles.inputLabel}>
                            Date of birth - {eachGuestElm.guestDOB}
                        </div>
                        <input 
                            className={styles.inputUserUI}
                            onChange={(e)=>{
                                let tempGuestObj={
                                    ...eachGuestElm,
                                    "guestDOB": e.target.value
                                }
                                let tempRoomUpdater = theDeparture.roomingList[roomingEditIndex].guestArr.splice(i,1,tempGuestObj)
                                setTheDeparture({
                                    ...theDeparture,
                                })
                            }}
                            type='date'
                        />
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
                        let tempGuestArr= theDeparture.roomingList[roomingEditIndex].guestArr.concat(newGuestObj)
                        let tempRoom
                        if(theDeparture.roomingList[roomingEditIndex].accomodationType==="single" || theDeparture.roomingList[roomingEditIndex].accomodationType===null){
                            tempRoom={
                                ...theDeparture.roomingList[roomingEditIndex],
                                "accomodationType":"twin",
                                "singleSupp":false,
                                "guestArr":tempGuestArr
                            }
                        } else if(theDeparture.roomingList[roomingEditIndex].accomodationType==="twin" || theDeparture.roomingList[roomingEditIndex].accomodationType==="matrimonial"){
                            tempRoom={
                                ...theDeparture.roomingList[roomingEditIndex],
                                "accomodationType":"triple",
                                "singleSupp":false,
                                "guestArr":tempGuestArr
                            }
                        }

                        let splicerFunc=theDeparture.roomingList.splice(roomingEditIndex, 1, tempRoom)
                        setTheDeparture({
                            ...theDeparture
                        })
                    }} >
                        ADD GUEST &nbsp; <AddCircleOutlineIcon/> 
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
            </React.Fragment> )
        }
        let switchController
        let acoomType= theDeparture.roomingList[roomingEditIndex].accomodationType
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
                ...theDeparture.roomingList[roomingEditIndex],
                "accomodationType": roomTypeUTIL
            }
            let tempRoomUpdater = theDeparture.roomingList.splice(roomingEditIndex,1,tempRoomObj)
            setTheDeparture({
                ...theDeparture,
            })
        }

        return(<>
        <br/><br/>
            <div className={styles.aFileContainer}>
                <div className={styles.spaceBetRow}>
                    <h2>Edit room # {roomingEditIndex+1}:</h2>
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
                        {theDeparture.roomingList[roomingEditIndex].accomodationType}
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
                <div className={styles.aLineSeparator}/>
                <div className={styles.spaceBetRow}>
                    <div style={{width: "47%" }}> 
                        <div className={styles.inputLabel}>
                            {isTL? <> 
                                Tour Leader Data:                            
                            </>:<>
                                Guest {guestIndex +1} Name
                            </>}
                        </div>
                        <input 
                            className={styles.inputUserUI}
                            placeholder="Guest Name"
                            onChange={(e)=>{
                                if(isTL){
                                    let tempTLObj={
                                        ...addTLObj.guestArr[0],
                                        "guestName": e.target.value
                                    }
                                    let roomUpdater = addTLObj.guestArr.splice(0,1,tempTLObj)
                                    setTLObj({
                                        ...addTLObj
                                    })
                                } else {
                                    let tempGuestObj={
                                        ...newRoomObj.guestArr[guestIndex],
                                        "guestName": e.target.value
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
                    <div style={{width: "47%" }}> 
                        <div className={styles.inputLabel}>
                            Nationality
                        </div>
                        <input 
                            className={styles.inputUserUI}
                            placeholder="Nationality"
                            onChange={(e)=>{
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
                            }}
                            type='text'
                        />
                    </div>
                </div>
                &nbsp;
                <div className={styles.spaceBetRow}>
                    <div style={{width: "47%" }}> 
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
                    <div style={{width: "47%" }}> 
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
                    {!isTL&& <> 
                    <div className={styles.roomTypeIndicator} onClick={()=>{
                        setGuestAddCount(guestAddCount+1)
                        let aTempGuestArr = newRoomObj.guestArr.concat({
                            "guestName": String,
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
                    }} > ADD GUEST &nbsp; <AddCircleOutlineIcon/> </div>
                    </>}
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

        return(<>
        <form id="tourLeaderForm">         
        <div className={styles.aFileContainer}>
            <div className={styles.spaceBetRow}>
                <h2> Add {isTL? <> Tour Leader </>:<>Room</>}</h2>
                <div className={styles.addRoomBTN} onClick={()=>{
                    if(isTL){
                        setTheDeparture({
                            ...theDeparture,
                            "tourLeader": addTLObj
                        })
                        setTLObj(false)
                        editOffFunction()
                    } else {
                        if(newRoomObj.guestArr[0].guestName.length>1){
                            // add room splicing daShiat
                            let tempDepArre =theDeparture.roomingList.push(newRoomObj)
                            setRoomObj({
                                "guestArr":[
                                    {
                                        "guestName": String,
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
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                            setTheDeparture({
                                ...theDeparture
                            })
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
                    {newRoomObj.accomodationType} &nbsp; <AddCircleOutlineIcon/> 
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
    const theRoomingBreakdownDispl=()=>{
        if(paxData.paxTotal>0){
        return(<>
        <div className={styles.roomingListTotalCont}>
            {paxData?.roomReq.singleRooms>0&&<><div>{paxData.roomReq.singleRooms} SINGLE Room{paxData.roomReq.singleRooms>1&&<>s</>}</div></>} 
            {paxData?.roomReq.twinRooms>0&&<><div>{paxData.roomReq.twinRooms} twin Room{paxData.roomReq.twinRooms>1&&<>s</>}</div></>} 
            {paxData?.roomReq.matrimonialRooms>0&&<><div>{paxData.roomReq.matrimonialRooms} matrimonial Room{paxData.roomReq.matrimonialRooms>1&&<>s</>}</div></>} 
            {paxData?.roomReq.tripleRooms>0&&<><div>{paxData.roomReq.tripleRooms} triple Room{paxData.roomReq.tripleRooms>1&&<>s</>}</div></>} 
            {paxData?.roomReq.quadRooms>0&&<><div>{paxData.roomReq.quadRooms} cuadruple Room{paxData.roomReq.quadRooms>1&&<>s</>}</div></>} 
        </div>
        </>)
        } 
    }

  // expenses
    const expenseBadgeDisp=(anExpKey)=>{
        if(anExpKey==="transportExpense"){
            return(<><div style={{fontSize:"1.1em", marginRight:"9px", fontWeight:"700", backgroundColor:" coral", padding:"6px 9px", color:"white"  }} >T {" "}{" "}</div></>)
        } else if(anExpKey==="guideExpense"){
            return(<><div style={{fontSize:"1.1em", marginRight:"9px", fontWeight:"700", backgroundColor:" black", padding:"6px 9px", color:"white"  }} > G {" "}</div></>)
        } else if(anExpKey==="accommodation"){
            return(<><div style={{fontSize:"1.1em", marginRight:"9px", fontWeight:"700", backgroundColor:" teal", padding:"6px 9px", color:"white"  }} > A {" "}</div></>)
        }
    }
    const totalExpAdder=(expenseArr)=>{
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
            return totalAggegator?.toFixed(2)
    }
    const expenseDisplayer=(theExpenseArr, dayByDay )=>{
        const anExpenseDisp=(eachExp, expIndex, dailyExpArray)=>{
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
                        }}> <RemoveCircleOutlineIcon/> </span></>}
                    {expenseBadgeDisp(eachExp.expenseKey)} &nbsp;
                    {eachExp.priceDetail}
                    {eachExp.hotelName&&<>- {eachExp.hotelName}
                    </>}
                    {eachExp.varExpTickets&& <> |  {eachExp.varExpTickets} x ${eachExp.price?.toFixed(2)} </>}
                </div>
                <div style={{display:"flex", textAlign:"end"}}>
                    {providerArr.length>1&&<><strong>
                        {eachExp.contactName!="Provider"&&<>{eachExp.contactName}</>}</strong></>}
                    <div style={{width:"27px", textAlign:"end"}}>  </div>
                    {eachExp.expenseKey==="accommodation"? <>
                        <div style={{width:"66px", textAlign:"end"}}> $ {roomPriceAdder?.toFixed(2)}</div>
                    </> : eachExp.expenseKey==="variableExpense"? <>
                        <div style={{width:"66px", textAlign:"end"}}> $ {eachExp.price?.toFixed(2) * eachExp.varExpTickets }</div>
                    </> : <> 
                        <div style={{width:"66px", textAlign:"end"}}> $ {eachExp.price?.toFixed(2)}</div>
                    </>}
                </div>
            </div>
            </>)
        }
        const expenseMapper=(dailyExpArr)=>{
        if(dailyExpArr){
            return(<>
                {dailyExpArr.map((element, i)=><React.Fragment key={i}>
                    {anExpenseDisp(element, i, dailyExpArr)}
                </React.Fragment>)}
            </>)
        }
        }
        let eachDayTitleExp=dayByDay.map((dayElem, i)=><>
        <React.Fragment key={i}>
            <div className={styles.dailyTitleCont}>  
                <h5> Day {i+1}: {dayElem.dayTitle&&<>{dayElem.dayTitle}</>}</h5>
                {editSwitch&& <>
                    <div className={styles.addExpBTN} onClick={()=>{
                        setExpTrig(true)
                        setDayIndex(i)
                        window.scrollTo({
                            top: 33000,
                            behavior: "smooth",
                        });
                    }}>
                    <AddCircleOutlineIcon/>
                </div></>}
            </div>
            {expenseMapper(theExpenseArr[i])}
        </React.Fragment>
        </>)
        return(<>
            <div className={styles.spaceBetRow}> 
                <h2>Expenses:</h2>
                <div style={{cursor:"pointer"}} onClick={()=>{
                    if(editSwitch){setEditSwitch(false); setExpTrig(false); setAnExpense(); setTLObj(false)} 
                    else {setEditSwitch(true)}
                }}>
                    {editSwitch? <><EditOffIcon/></>:<><EditIcon/></>}
                </div>
            </div>
            {theExpenseArr.length>0 && <> 
            <div className={styles.totalExpCont}> 
                TOTAL
                |<span> ${totalExpAdder(theExpenseArr)} </span>

            </div>
            </>}
            <div>
                {eachDayTitleExp}
            </div>
        </>)
    }  
    const expenseEditor=(theExpense, setTheExpense, contactArr, dayIndx, theDep, setTheDep)=>{
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
                    <span><strong>Pax </strong></span> 
                    <span><strong>$$- </strong></span>
                </div> 
                {priceAndPx}
            </div></> 
        }
        let contactOpts
        if(contactArr.length>0){
            contactOpts=contactArr.map((elem,i)=><React.Fragment key={i}>
            {elem?.expenseKey!="accommodation"&& <>
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
                        <div className={styles.aRoomDescription}> ${elem?.roomsTotal?.toFixed(2)}</div> 
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
                return totalCounter?.toFixed(2)
            }

            return(<>
                <strong style={{letterSpacing:"1px"}}>NEEDED ROOMS</strong>
                {theRoomingBreakdownDispl()}
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
                setEditSwitch(false)
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
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
                {anInputDisplayer("Phone #", "contactNumb", "number", false, theExpense.contactNumb, theExpense, setTheExpense)}</div>
            
                {/* currency  non op */}
                {/* <div style={{width: "21%" }}>
                    {aDropdownPicker(currencyArr, "$", "currency", theExpense, setTheExpense, false, false)}</div>  */}
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
                    {anInputDisplayer("Price", "price", "number", false, theExpense.price, theExpense, setTheExpense)}</div>
                    </>}
                </div>
                {theExpense.priceArr&&<>
                    <div className={styles.inputLabel}> Price Table </div>
                    <i> Please select a value:</i>
                    {priceArrDispAndEditor}
                </>}
                <div style={{display: "flex", width:"100%", justifyContent:"space-between"}}>
                    <div style={{width: "70%" }}> 
                    {anInputDisplayer("Additional Description", "additionalDescription", "text", false, "Extra service details", theExpense, setTheExpense)}</div> 
                    {theExpense.expenseKey==="variableExpense"? <> 
                    <div style={{width: "25%" }}> 
                        {anInputDisplayer("#Needed", "varExpTickets", "number", true, paxData.paxTotal, theExpense, setTheExpense)}</div>
                    </>:<>
                    <div style={{width: "25%" }}> 
                    {anInputDisplayer("max pax", "paxLimit", "number", false, theExpense.paxLimit, theExpense, setTheExpense)}</div>
                    </>}
                </div>
            </>}
            <input className={styles.secondaryBTN} type="submit" value="Add Expense to Day +" />
            </form>
        </>)
        } 
    }
 
  // providers
    const contactArrDisp=(theArr)=>{
        if(theArr.length>0){
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
                {elem?.hotelName&&<> - {elem?.hotelName} Hotel</>}
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
                    <div className={styles.eachDocBTN} onClick={()=>{
                    setDocumentGenera({
                        "docKey": "contract",
                        ...elem
                    })
                    }}> Contract + </div>
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
    }
    const totalProviderExpAdder=(expenseArr)=>{
        let totalAggegator=0
        expenseArr.forEach((elem)=>{
        if(elem.expenseKey==="accommodation"){
            elem.roomPriceArr.forEach((elemental)=>{
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
            totalAggegator =
            totalAggegator + elem.price
        }
        })
        return totalAggegator?.toFixed(2)
    }
    const documentCreator=(theDocs)=>{
        // for work orders, econ requirements, contracts
        let eachProviderExp=[]
        theDeparture.dayByDayExp.forEach((element, i)=>{
        element.forEach(elem=>{
            if(elem.contactName===theDocs?.contactName){
                eachProviderExp.push({...elem, "dayIndex": i})
            }
        })
        })
        let eachProviderMapper
        if(theDocs.expenseKey!="accommodation"){
        eachProviderMapper = theDeparture.dayByDayExp.map((elem,i)=><React.Fragment key={i}>
            {elem.find(elem2 => elem2.contactName===theDocs?.contactName)?<>
            <div style={{display:"flex", alignItems:"center"}}> 
                <h4>Day {i + 1}:</h4> &nbsp; {theItinerary?.dayByDay[i].dayTitle}
            </div>

            {/* General note mapper */}
            {theDeparture?.operationalNotes[i]?.length>0&&<> 
                <div style={{width:"90%", marginLeft:"4%", marginBottom:"9px", fontSize:"0.9em"}}>
                    <div style={{display:"flex", flexDirection:"column"}}>

                    {/* each provider's notes */}
                    {theDeparture?.operationalNotes[i].map((elem,index)=> 
                    <React.Fragment key={index}> {elem.target===theDocs?.contactName&&<>
                        <div className={styles.spaceBetRow}>
                            <span>- {elem.note}</span>
                            {opDocEditSwitch&& <>
                                <span onClick={()=>{
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

                    {theDeparture?.operationalNotes[i].find(elem => elem.target==="general")&&<>
                        <strong style={{fontSize:"0.8em", marginTop:"9px"}}> GENERAL DAY NOTES</strong>
                    </> }
                    {theDeparture?.operationalNotes[i].map((elem,index)=> 
                    <React.Fragment key={index}> {elem.target==="general"&&<>
                        <div className={styles.spaceBetRow}>
                            <span>- {elem.note}</span>
                            {opDocEditSwitch&& <>
                                <span onClick={()=>{
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
                    <span className={styles.eachGuestNote} style={{margin:"3px", marginLeft:"3%"}} onClick={()=>setAddOPNote({
                        "target":"general"
                    })}>
                        Add General OP Note
                    </span>
                    <span className={styles.eachGuestNote} style={{margin:"3px"}} onClick={()=>setAddOPNote({
                        "target": theDocs?.contactName
                    })}>
                        add targeted note
                    </span>
                </div>
                </>}
            </>}
            </>:<> </>}
        {elem.map(element=><>{element.contactName===theDocs?.contactName&&<>
            <div className={styles.documentGeneraExpense}>
            <span>
                <strong>{element.priceDetail}</strong> <br/>
                {element.additionalDescription&&<>{element.additionalDescription}</>}
            </span>
            <span>
                ${element.price?.toFixed(2)}
            </span>
            </div>
        </>}</>)}
        <br/>
        </React.Fragment>)
        }
        return(<>
            <div className={styles.spaceBetRowPRINT} style={{borderBottom:"solid 1px black"}}>
                <h2>Document Generator:</h2>
                <div style={{cursor:"pointer"}} onClick={()=>{
                    setDocumentGenera(false)
                }}>
                    <CancelPresentationIcon/>
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <h1> 
                    {theDocs.docKey==="workOrder"&&<> Work Order</>} 
                    {theDocs.docKey==="contract"&&<> Contract</>}
                    {theDocs.docKey==="cashReq"&&<> Economic Requirement</>}
                    {theDocs.docKey==="accommodation"&&<> Accommodations Requirement</>}
                </h1>
                {theDocs.docKey!="accommodation"&& <>
                    <div style={{cursor:"pointer"}} className={styles.printDEL} onClick={()=>{
                        if(opDocEditSwitch){editOffFunction()} 
                        else {setOPDocSwitch(true)}
                    }}>
                        {opDocEditSwitch? <><EditOffIcon/></>:<><EditIcon/></>}
                    </div>
                </>}
            </div>
            <div className={styles.spaceBetRow}>  
                <h2>For: {theDocs?.contactName} </h2>
                {theDocs?.contactNumb!=100000 &&<> Phone: #0{theDocs?.contactNumb}</>}
            </div>
            {theDocs?.hotelName&&<><h2>For: <strong>{theDocs?.hotelName}</strong></h2></>}
            <div>By: {session?.user.name} | Operations Department</div> <br/>

            <div className={styles.detailDispl}>
                {eachIntroDetail("Date Created", toDate.toLocaleDateString('en-GB', dateOptions))}
                {theDocs.expenseKey==="workOrder"&&<>
                    {theItinerary?.tripLang&&<>{eachIntroDetail("trip language", theItinerary.tripLang)}</>}
                </> }
                {theDeparture?.tourCode&&<>{eachIntroDetail("Tour Code", theDeparture.tourCode)}</>}
                {theDeparture?.tripRef&&<>{eachIntroDetail("Trip Reference", theDeparture.tripRef)}</>}
                {theDeparture.tourLeader&&<>{eachIntroDetail("Tour leader", theDeparture.tourLeader.guestArr[0].guestName)}</>}
            </div>
            {theDocs.docKey==="accommodation"&&<>
                <h2>Required Dates:</h2>
                {eachProviderExp.map((elemnt, indx)=> <React.Fragment key={indx}>
                    <div className={styles.spaceBetRow}> 
                        <span style={{width:"49%"}}>
                            {aDateDisp("Date In", theDeparture.startingDate, false, elemnt.dayIndex)}
                        </span>
                        <span style={{width:"49%"}}>
                            {aDateDisp("Date Out", theDeparture.startingDate, false, (elemnt.dayIndex+1))}
                        </span>
                    </div>
                </React.Fragment>)}
            </>}
            {theDocs.docKey!="cashReq"&&<> 
                {roomingListDisp(theDeparture)}
                <div className={styles.pageBreak}> . </div>
            
            {theDocs.docKey!="accommodation"&&<>
                <h2> Day by Day Requirements</h2>
                {eachProviderMapper}
            </>}
            </>}
            {theDocs.docKey!="accommodation"&&<>
                <h2>Service Breakdown</h2>
                {eachProviderExp.map((element,i)=><React.Fragment key={i}>
                    <div className={styles.documentGeneraExpense} style={{borderTop:"solid 1px black", borderLeft:"solid 1px black" }}>
                        <span>
                            D{element.dayIndex+1}: 
                            <strong> {element.priceDetail}</strong> <br/>
                            {element.additionalDescription&&<>{element.additionalDescription}</>}
                        </span>
                        <span>
                            ${element.price?.toFixed(2)}
                        </span>
                    </div>
                </React.Fragment> )}
                <div className={styles.documentGenTotal} >
                    <strong>TOTAL:</strong> USD $ {totalProviderExpAdder(eachProviderExp)}
                </div>
                <br/>
                <br/>
                <strong> Please remember to arrive 15 minutes before schedule. </strong>
                <div style={{width:"100%", display:"flex", justifyContent:"space-between", marginTop:"44px"}}> 
                    <div style={{textAlign:"center" }}>
                        <div> {session?.user.name}</div>
                        <div> Operations Department<br/> EcoAndes Travel, LTC</div> 
                    </div>
                    <div style={{textAlign:"center"}}>
                        <div> {theDocs?.contactName}  </div>
                        <div> {theDocs?.expenseKey==="guideExpense"&&<>
                            Guide
                        </>}</div> 
                    </div>
                </div>
            </>}
        </>)
    }

    const dayByDayDisp=(theDays)=>{

        // non MVP
        // flight adder BTN
        // Cruise Adder BTN
        // switch to turn on or off day detail

        // print capability: Dep Dates, 

        const flightAdder=()=>{

        }

        // need to replace it with a usestate trigger
        let descriptionSwitcher=true
        let theProgramDays=theDays.map((elem,i)=><React.Fragment key={i}>
            <div className={styles.eachDayCont}>
                <div className={styles.spaceBetRow} style={{marginTop:"15px" }}>  
                    <h5> Day {i+1}: {elem?.dayTitle&&<>{elem?.dayTitle}</>}</h5>
                    {editSwitch&& <> 
                    <span onClick={()=>{
                        // set note trigger
                    }}>
                        <AddCircleOutlineIcon/>
                    </span>
                    </>}
                </div>
                {elem?.dayDescription}
            </div>

                

                {theDeparture.operationalNotes[i]&& <>
                    <br/> <strong> NOTES</strong>
                </>}
                {theDeparture.operationalNotes.length>0&& <>
                    {theDeparture.operationalNotes[i]?.map((elemnt, ind)=><>
                        <div  style={{fontSize:"0.9em"}}>
                        - {elemnt.note} {elemnt.target!="general"&&<> | <strong>{elemnt.target}</strong> </>}
                        </div>
                    </>)}
                </>}
        </React.Fragment> )
        return(<>
        <div className={styles.spaceBetRow}>
            <h2>Day by Day:</h2>

            {/* <div style={{cursor:"pointer"}} onClick={()=>{    
            // add flight functionality here
            }}> <AddCircleOutlineIcon/> <FlightIcon/> </div> */}


            {/* <div style={{cursor:"pointer"}} onClick={()=>{    
            // add flight functionality here
            setEditSwitch(true)
            }}> <EditNoteIcon/> </div> */}




        </div>
        <div className={styles.dayByDayCont}>
            {theProgramDays}
        </div>
        </>)
    }

  //////////////////////////////////////////////
  //////////////////////////////////////////////
  return(<>
    <div className={styles.aGMSPage}>
      {session? <> 
        <GMSNavii user={session.user} />
        <div className={styles.titleBar}>
            <HubIcon fontSize="large" />
            <h2>Latin Travel Collection</h2>
            <h1>Operations</h1>
        </div>  
        <strong className={styles.printDEL} >{toDateDisplayer}</strong>
      {loadingTrigger? <>
        {loadingScreen("Fetching Departure Data")}
      </>:<>

        <div>
          {/* Daily(monthly||weekly ) Planner */}
          {theDeparture? <>
            {fileSwitch ? <>
                <div style={{display: "flex", flexDirection:"column", alignItems:"center", margin:"15px" }}> 
                    {aFileDisplayer(theItinerary, theDeparture)}
                </div>
            </>:<> 
                {depCreator(theItinerary, theDeparture)}
            </> }
          </>:<>
            {/* display itineraries and select a dep for file */}
            <h1>Departures </h1>
            <div className={styles.spaceBetRow} style={{alignItems:"baseline", justifyContent: "space-around" }} > 
                {statsDisplayer(activeDeps, upcomingDeps)}            
                {depDisplayer(activeDeps, "active Departures", true)}
                {depDisplayer(upcomingDeps, "upcoming Departures", false)}
            </div>

            <div className={styles.spaceBetRow} >
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

            <br/><br/>
            {itinFetcherLTCSwitch ? <> 
                {depSelector("LTC Published Itineraries", LTCItins)}
            </> :<> 
                <div className={styles.depTrigBTN} onClick={()=>{
                    setLTCItinFetcherSwitch(true)
                }} >
                
                    {itinFetcherLTCSwitch ? <>
                        <CircularProgress />
                    </>:<>
                        <AddCircleOutlineIcon/> &nbsp; &nbsp; departure from LTC itineraries
                    </> }

                </div>
            </> }

            <br/><br/>
            {ecoAndesFixedDepartures ? <> 
                {depSelector("EcoAndes Fixed Departures", EcoAndesItins)}
            </> :<> 
                <div className={styles.depTrigBTN} onClick={()=>{
                    setEcoAndesFD(true)
                }} >
                
                    {ecoAndesFixedDepartures ? <>
                        <CircularProgress />
                    </>:<>
                        <AddCircleOutlineIcon/> &nbsp; &nbsp; departure from EcoAndes FD itineraries
                    </> }

                </div>
            </> }


          </>}
        </div>
      </>}
      </>:<>
        {/* nav export to reuse on all pages */}
        GMS Sgn in OPTS
      </> }
  </div>
  </>)
}