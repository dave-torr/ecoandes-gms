import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { nanoid } from 'nanoid'

import {GMSNavii} from "./../components/navis"
import styles from "./../styles/pages/playground.module.css"
import { TourDisplayer } from '../components/tours'


import AddCommentIcon from '@mui/icons-material/AddComment';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mantine/core'

import {$getRoot, $getSelection} from 'lexical';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

// Bitacora logo:
// import TrackChangesIcon from '@mui/icons-material/TrackChanges';


// temp Dep

// for planner:
// identify trips in operation today and for next 7 days.
// select disp elemes for operations.
// show and toggle elements for planner as necesary.
// mobile display for operations page?? Planner??

// duplicate this dep with slight changes and dep dates to see how planner can work.

let tempDep= {
    "itineraryID": "djoserNLJecga",
    "tourCode": "Vh Hitt",
    "roomingList": [
    {
        "guestArr": [
        {
            "guestName": "Una guesta",
            "guestNotes": [
            "Frutillas en desayuno todos los dias",
            "Alergia al mani"
            ],
            "passport": "E77",
            "nationality": "Ecuador",
            "bootSize": "36"
        }
        ],
        "accomodationType": "single",
        "singleSupp": true
    },
    {
        "guestArr": [
        {
            "guestName": "Yeti Michuo",
            "guestDOB": "1990-10-22",
            "guestNotes": [],
            "passport": "I88",
            "nationality": "Tibet",
            "bootSize": "60"
        },
        {
            "guestName": "Yeti Secondo",
            "guestDOB": "1987-12-21",
            "guestNotes": [
            "Second of it's kind"
            ],
            "passport": "Pass88",
            "nationality": "Tibet",
            "bootSize": "55"
        }
        ],
        "accomodationType": "twin",
        "singleSupp": false
    },
    {
        "guestArr": [
        {
            "guestName": "Juan Orozco",
            "guestDOB": "1994-08-25",
            "guestNotes": [
            "vegano"
            ],
            "passport": "1545415",
            "nationality": "Ecuador ",
            "bootSize": "43"
        }
        ],
        "accomodationType": "single",
        "singleSupp": true
    }
    ],
    "tourLeader": [
    {
        "guestArr": [
        {
            "guestName": "Yeti Dicho",
            "guestDOB": "1992-02-08",
            "guestNotes": [
            "Notess"
            ],
            "passport": "U77",
            "nationality": "Ecuador"
        }
        ],
        "accomodationType": "single",
        "singleSupp": true
    }
    ],
    "dayByDayExp": [
    null,
    [
        {
        "currency": "usd",
        "expenseKey": "guideExpense",
        "pricekey": "transferService",
        "priceArr": [
            35,
            35,
            35,
            35,
            40,
            40,
            40,
            40,
            40,
            45,
            45,
            45,
            45,
            45,
            45,
            45
        ],
        "priceDetail": "Transfer IN/OUT Service",
        "paxLimit": 16,
        "contactName": "Guide Dave",
        "contactNumb": 987546465,
        "price": 40
        },
        {
        "currency": "usd",
        "expenseKey": "variableExpense",
        "pricekey": "UIOCatedralEntFee",
        "price": 6.5,
        "priceDetail": "Catedral Entrance Fee",
        "contactName": "Guide Dave",
        "contactNumb": 987546465,
        "varExpTickets": 3,
        "econReq": true
        },
        {
        "currency": "usd",
        "expenseKey": "transportExpense",
        "pricekey": "fullDayTransportService",
        "priceArr": [
            90,
            90,
            100,
            100,
            100,
            100,
            110,
            110,
            110,
            110,
            130,
            130,
            130,
            130,
            150,
            150
        ],
        "priceDetail": "Full Day: Quito / Overnight",
        "paxLimit": 16,
        "contactName": "Driver Dave",
        "contactNumb": "987665421.00",
        "price": 150
        }
    ],
    [
        {
        "currency": "usd",
        "expenseKey": "transportExpense",
        "pricekey": "transferService",
        "priceArr": [
            45,
            45,
            50,
            50,
            50,
            50,
            60,
            60,
            60,
            60,
            70,
            70,
            70,
            70,
            90,
            90
        ],
        "priceDetail": "UIO Transfer IN/OUT Service",
        "paxLimit": 16,
        "contactName": "Driver Dave",
        "contactNumb": "987665421.00",
        "price": "60.00"
        }
    ],
    [
        {
        "currency": "usd",
        "expenseKey": "transportExpense",
        "pricekey": "fullDayTransportService",
        "priceArr": [
            90,
            90,
            100,
            100,
            100,
            100,
            110,
            110,
            110,
            110,
            130,
            130,
            130,
            130,
            150,
            150
        ],
        "priceDetail": "Full Day: Quito / Overnight",
        "paxLimit": 16,
        "contactName": "Driver Dave",
        "contactNumb": "987665421.00",
        "price": "110.00"
        }
    ]
    ],
    "operationalNotes": [
    [
        {
        "target": "general",
        "note": "General Day note"
        },
        {
        "target": "general",
        "note": "Pick up 9:00 am "
        }
    ],
    null,
    [
        {
        "target": "general",
        "note": "Another Note"
        }
    ],
        [
            {
            "target": "Driver Dave",
            "note": "Pick uo 8:00 am "
            },
            {
            "target": "general",
            "note": "Grupo VIP Aleman"
            }
        ]
    ],
    "startingDate": "2023-08-10",
    "maxPaxNumb": 20,
    "duration": 20,
    "departureNotes": [],
    "flights": [
        null,
        [
            {
            "target": "group",
            "dayIndex": 1,
            "theDate": "2023-08-12T00:00:00.000Z",
            "departureTime": "08:12",
            "depLocation": "QUITO",
            "arriLocation": "Cusco",
            "airline": "LATAM",
            "flightNumb": "906",
            "confNumber": "TRIXXIT"
            },
            {
            "target": "client",
            "clientName": "Yeti Michuo",
            "dayIndex": 1,
            "theDate": "2023-08-12T00:00:00.000Z",
            "departureTime": "23:21",
            "depLocation": "Baltra",
            "arriLocation": "Lima",
            "airline": "EQUAIR",
            "flightNumb": "116",
            "confNumber": "OPIUTN"
            }
        ]
    ],
    "cruises": [],
    "saleProcess": "confirmed",
    "dateCreated": "2023-08-28T16:55:42.395Z",
    "tripName": "Djoser NL JECGA",
    "version": 0,
    "status": 1,
    "user": {
    "name": "David Torres",
    "email": "david@latintravelcollection.com"
    },
    "aComp": "Explorer Chick",
    "tripRef": "Wilkins Dallas",
    "compContact": "Deiviid",
    "assigment": "Cristina Paez",
    "assignment": "Carlos del Salto"
};

let tempGenData={
    "weeklyResponsible": "Carlos Del Salto",
    "changedBy": ["David Torres"]
}

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

// MS graph api to get files from IMG folder
// Hotel Database
// provider Database

export default function PlaygroundPage(){
    const { data: session } = useSession()
    const [tempData, setTempData]=useState()

    const [locObject, setTempObj]=useState(false)
    const [autofillOpts, setAutofillOps]=useState()
    const [aTour, setTour]=useState(TourModel)
    const [aTravelDay, setTravelDay] = useState({
        "dayInclusions":[
            "private Transfers",
            "guide Services",
        ],
        "flightData":[],
        "guideData":[],
        "imgArr":[]
    })

    useEffect(()=>{
        setAutofillOps()
        const getDataz = async ()=>{
            if(locObject){
                const res = await fetch("/api/googleApi",{
                    method: "POST",
                    body: locObject
                })
                const locData = await res.json()
                if(res.status===200){
                    setAutofillOps(locData)
                    return () => {};
                }
            }
        }
        getDataz()
    },[locObject])
    
    // useEffect(()=>{
    //     console.log(autofillOpts)
    // },[autofillOpts])

    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////

    let sampleHotel={
            "currency":"usd",
            "expenseKey": "accommodation", 
            "pricekey": "ikalaGPS",
            "hotelName":"Ikala Galapagos Hotel",
            "roomPriceArr": [
                {
                    "roomkey":"singleStandard",
                    "roomDescription":"Single Standard Room",
                    "price":170
                },
                {
                    "roomkey":"twinMatStandard",
                    "roomDescription":"Twin or Matrimonial Standard Room",
                    "price":186
                },
                {
                    "roomkey":"singleSuite",
                    "roomDescription":"Single Suite Room",
                    "price":195
                },
                {
                    "roomkey":"twinMatSuite",
                    "roomDescription":"Twin or Matrimonial Suite Room",
                    "price":214,
                    "additionalBed":70
                },
                {
                    "roomkey":"matDuplexSuite",
                    "roomDescription":"Matrimonial Duplex Suite",
                    "price":300,
                    "additionalBed":70
                }
            ],
            "gmapsLink":"https://goo.gl/maps/xpN6XkPM9isvvj24A",
            "website":"https://www.ikalagalapagoshotel.com/",
            "email":"sales@ikalagalapagoshotel.com",
            "stars": 4,
            "hotelCategory":"boutique hotel",
            "city":"Puerto Ayora",
            "country":"ecuador",
            "priceDetail": "Accomodation Ikala Galapagos Hotel - Pto. Ayora",
            "contactArr": [
                {
                    "name":"Jose Andrade",
                    "phono": 999729265,
                    "wapp": 999729265,
                    "role":"reservations",
                    "email":"sales@ikalagalapagoshotel.com",
                }
            ],
            "additionalServices":[
                {
                    "priceKey":"additionalServices",
                    "priceDescription":"standard dinner",
                    "priceType":"per person",
                    "price":20
                },    
                {
                    "priceKey":"additionalServices",
                    "priceDescription":"premium dinner",
                    "priceType":"per person",
                    "price":30
                },
                {
                    "priceKey":"additionalServices",
                    "priceDescription":"taxi airport pickup",
                    "priceType":"per group",
                    "guestMax":4,
                    "price":35
                },
                {
                    "priceKey":"additionalServices",
                    "priceDescription":"taxi airport pickup",
                    "priceType":"per group",
                    "guestMax":12,
                    "price":85
                },
            ]
        }

    let toDate = new Date()

    const expenseModel ={
        "date": toDate,
        "event": String,
        "madeBy": ["David Torres", ],
        "expenseName": String,
        "expenseDetail": String,
        "expenseType":String,
        "method":String,
        "madeFor":[],
        "currency": "usd",
        "amount": Number,
        "cardNum": String,
    }
    const sampExpense ={
        "date": toDate,
        "event": "fitur",
        "method":"card",
        "cardNum": "0920",
        "madeBy": ["David Torres", ],
        "expenseName": "Lunch Snack",
        "expenseDetail": "Mid day snack",
        "expenseType":"meal",
        "madeFor":["everyone"],
        "currency": "usd",
        "amount": 33.1
    }
    const fairArray =[
        "FITUR",
        "ITB",
        "ATWS",
        "TAS"
    ]
    const paymentMethods=[
        "Cash",
        "Debit Card",
        "Credit Card",
        "Transfer",
    ]
    const cardEndings=[
        "0920"
    ]

    const getOneDriveBTN=()=>{

        return(<>
            <div
                onClick={async()=>{
                    const res = await fetch(`https://login.microsoftonline.com/$08521e6b-7c64-4338-a5e5-7b30ff568552/oauth2/token`, {
                        method: "POST",
                        body:{
                            "grant_type": "client_credentials",
                            "client_id": process.env.ENTRA_APP_CLIENT_ID,
                            "client_secret": process.env.ONEDRIVE_CLIENT_SECRET,
                            "resource": "https://graph.microsoft.com"
                        }
                    })
                    const docData = await res.json()
                    if(res.status===200){
                        console.log(docData)
                    } else (res)

                }}
            > GET DATA</div>
            {tempData && <> 
                <select id="LocationDropdown" onChange={(e)=>{
                    setTempObj(`${e.target.value}`)
                }} >
                    <option selected disabled >Select a location </option>
                    {tempData.map((elem,i)=><React.Fragment key={i}>
                    <option value={elem.properties.title} > {`${elem.properties.title}`} </option>
                </React.Fragment> )}
                </select>
            </>}
            {autofillOpts && <>
                <div className={styles.autofillGrid}> 
                <label className={styles.inputLabel}> Pick a description to add to day </label>
                    {autofillOpts.map((elem,i)=><React.Fragment key={i}>
                        <div className={styles.eachAutoFill} >
                            <div style={{width: "25%"}}>
                                <div contentEditable onInput={(e)=>{
                                    let splicer = autofillOpts[i].splice(0, 1, e.target.innerHTML )
                                    setAutofillOps(autofillOpts)
                                }} >
                                {elem[0]} 
                                </div>

                                {i>0&& <>
                                    <br/><br/><br/>
                                    <div className={styles.addFromRecordBTN} onClick={async()=>{
                                        let aRecordObj ={
                                            "location": locObject,
                                            "title": elem[0],
                                            "description": elem[1],
                                            "createdBy": session.user.name
                                        }
                                        const res = await fetch("/api/gms/dayByDayDB",{
                                            method: "POST",
                                            body: JSON.stringify(aRecordObj)
                                        })
                                        let databaseRes = await res.json()
                                        if(res.status===200){
                                            let splicer = autofillOpts.splice(i, 1)
                                            setAutofillOps(autofillOpts)
                                            window.alert("template created")
                                            console.log(autofillOpts)
                                        }
                                    }}> 
                                        + add to backEnd
                                    </div>
                                </>}
                            
                            </div>
                            <div style={{width: "75%"}}> 
                            <div contentEditable onInput={(e)=>{
                                    let splicer = autofillOpts[i].splice(1, 1, e.target.innerHTML )
                                    setAutofillOps(autofillOpts)
                                }} >
                                {elem[1]} 
                            </div>
                            </div>
                        </div>
                    </React.Fragment> )}
                </div>
            </>}
        </>)
    }

    const newitineraryBuilder=(theNewItin, setNewItin,)=>{


        const eachStepTemplate=()=>{
            return(<>

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
            <dov className={styles.itinBuilderCont} >
                <div className={styles.spaceBetRow} > 
                    <h1>Itinerary Creator:</h1>
                    Ccu
                </div>
                <br/>
                {anItinDisp()}

                {eachStepTemplate()}
            
            </dov>
        </>)
    }

    const [expenseArr, setExpArr]=useState([sampExpense])
    const [expenseBuild, setExpenseBuild]=useState({})
    const [expenseTrig, setExpTrig]= useState(false)
    const eachExpDisp=(theExp)=>{
        return(<>
            <div className={styles.eachExpCont}> 
                <div className={styles.spaceBetRow}>
                        {theExp.event&&<>
                            <div style={{ textTransform:"uppercase", fontSize:"0.9em", letterSpacing:"1px" }}>
                                {theExp.event}  </div>
                        </>}
                    <span style={{display:"flex", fontSize:"1.2em"}} >
                        {theExp.method&&<>{theExp.method}
                        &nbsp; &nbsp;</>}
                        {theExp.cardNum&&<>#{theExp.cardNum} &nbsp; - &nbsp; </>}
                        {theExp.amount&&<>
                            ${theExp.amount}</>}
                    </span>
                </div>
                <div className={styles.spaceBetRow}>
                    <span style={{display:"flex"}} >
                        {theExp.expenseName&&<><strong style={{fontSize:"1.2em"}}>
                            {theExp.expenseName}</strong></>}
                        {theExp.expenseType&&<>&nbsp; &nbsp; - &nbsp; {theExp.expenseType}</>}
                    </span>
                    {theExp.expenseDetail&&<>
                        <i>{theExp.expenseDetail}</i></>}
                </div>
                <div className={styles.spaceBetRow}>
                    {theExp.madeBy.length>0&&<>
                        <div style={{display:"flex"}} >
                            <strong>By: </strong> &nbsp;
                            {theExp.madeBy.map((elem,i)=><React.Fragment key={i}>
                                <div style={{textTransform:"capitalize"}}> 
                                {elem}
                                </div>
                            </React.Fragment>)}
                        </div>
                    </>}
                    {theExp.madeFor.length>0&&<>
                        <div style={{display:"flex"}} >
                            <strong>For: </strong> &nbsp;
                            {theExp.madeFor.map((elem,i)=><React.Fragment key={i}>
                                <div style={{textTransform:"capitalize"}}> 
                                {elem}
                                </div>
                            </React.Fragment>)}
                        </div>
                    </>}
                </div>
            </div>
        </>)
    }
    const expenseAdder=()=>{
        const anInput=(placeholder, inputID, anObject, setAnObject, inptType, styleObj, optArr)=>{
            if(inptType===1){
            return(<>
                <span style={{ width:"160px" }} > 
                    <TextField id="outlined-basic" label={placeholder} variant="outlined" onChange={(e)=>{
                        setAnObject({
                            ...anObject,
                            [inputID]: e.target.value
                        })
                    }}  />
                </span>
            </>)
            } else if (inptType===2){
                return(<>
                    <div style={styleObj} >
                    <Autocomplete
                        data={optArr}
                        placeholder={placeholder}
                        onSelect={(e)=>{
                            setAnObject({
                                ...anObject,
                                [inputID]: e.target.value
                            })
                        }}
                    /></div> 
                </>)
            }
        }

        console.log(expenseBuild)

        return(<>
            {expenseTrig? <>
                <div className={styles.closeBTN} 
                    onClick={()=>setExpTrig(false)}>
                    Close
                    <CancelIcon/>
                </div>
                <form className={styles.expenseForm}
                    onSubmit={(e)=>{
                    e.preventDefault();
                    
                }}>
                    <h2>Add Expense:</h2>
                    <div className={styles.spaceBetRow} style={{textTransform:"capitalize" }}> 
                        {anInput("Event", "event", expenseBuild, setExpenseBuild,2, { width:"210px" }, fairArray )}
                        <span style={{display:"flex"}}>
                            {anInput("Payment Methods", "method", expenseBuild, setExpenseBuild,2, { width:"150px" }, paymentMethods )}
                            {(expenseBuild?.method==="Credit Card"||expenseBuild?.method==="Debit Card")&& <>
                                &nbsp;
                                {anInput("Card Num", "cardNum", expenseBuild, setExpenseBuild,2, { width:"130px" }, cardEndings )}
                            </>}
                            &nbsp;
                            {anInput("Amount $", "amount", expenseBuild, setExpenseBuild,2, { width:"130px" }, [] )}
                        </span>
                    </div>
                </form>
            </>:<>
                <div className={styles.addFromRecordBTN} 
                    onClick={()=>setExpTrig(true)}
                    style={{width:"240px", marginBottom:"21px"}}>
                    Add Expense: &nbsp;
                    <AddCommentIcon />
                </div>
            </> }
        </>)
    }
    const expenseTable =(expensesArr)=>{
        let theKeys = Object.keys(expenseModel)



        return(<>
            <div className={styles.expensesContainer}>

                <h2>Expenses:</h2>

                    {expenseAdder()}

                    {expensesArr.map((elem,i)=><React.Fragment key={i}>
                        {eachExpDisp(elem)}
                    </React.Fragment>)}
            </div>
        </>)
    }



    return(<>
        {(session && session.user.name==="David Torres" ) &&<> 
            <GMSNavii  user={session.user} />
            <div className={styles.playgroundPage}>

                {/* {aHotelDisplayer(sampleHotel)}
                {aHotelDisplayer(testerObj)}
                {hotelAdderForm(testerObj, setTester, locObject, setTempObj)} */}
                {/* {aHotelDisplayer(sampleHotel)} */}
                {/* {getOneDriveBTN()} */}

                {/* <div contentEditable plaintext-only onInput={(e)=>{
                    console.log(e.target.innerHTML)
                }} > TESTER 
                
                </div> */}


                {expenseTable(expenseArr)}



                {/* {newitineraryBuilder( )} */}

            </div> 
        </>}
    </>)
}
