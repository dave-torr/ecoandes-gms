import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from "next-auth/react"



import {GMSNavii} from "./../components/navis"
import LTCPriceTables from "../data/LTCPriceTables2023.json"
import { aHotelDisplayer, hotelAdderForm } from '../components/operations/providers'
import styles from "./../styles/pages/playground.module.css"

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

export default function PlaygroundPage(){
    const { data: session } = useSession()
    const [testerObj, setTester]=useState({})

    const [tempAdderObj, setTempObj]=useState(false)
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

    const getGoogleDataBTN=()=>{

        return(<>
            <div
                onClick={async()=>{
                    const res = await fetch("/api/googleApi", {
                        method: "GET"
                    })
                    const docData = await res.json()
                    if(res.status===200){
                        console.log(docData)
                    } else (res)
                }}
            > GET DATA</div>
        </>)
    }

    return(<>
        {session&&<> 
            <GMSNavii  user={session.user} />
            <div className={styles.playgroundPage}>

                {/* {aHotelDisplayer(sampleHotel)}
                {aHotelDisplayer(testerObj)}
                {hotelAdderForm(testerObj, setTester, tempAdderObj, setTempObj)} */}

                {getGoogleDataBTN()}

            </div> 
        </>}
    </>)
}
