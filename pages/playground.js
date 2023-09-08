import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from "next-auth/react"


import {GMSNavii} from "./../components/navis"

import LTCPriceTables from "../data/LTCPriceTables2023.json"

import { aHotelDisplayer } from '../components/operations/providers'



import styles from "./../styles/pages/playground.module.css"

// Bitacora logo:
// import TrackChangesIcon from '@mui/icons-material/TrackChanges';

export default function PlaygroundPage(props){
    const { data: session } = useSession()
    const [testerObj, setTester]=useState({})
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

    let sampleVal="previous Value"

    console.log(testerObj)

    return(<>
        {session&&<> 
            <GMSNavii  user={session.user} />
            <div className={styles.playgroundPage}>

            <div style={{ width: "90%", backgroundColor:"white", padding:"33px" }} >
            
            </div>


            </div> 
        </>}
    </>)
}