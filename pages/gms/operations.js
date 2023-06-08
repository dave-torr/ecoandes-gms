import React, { useState } from 'react'
import { useEffect } from 'react'
import { GMSNavii } from "../../components/navis";
import { useSession } from "next-auth/react"

import CircularProgress from '@mui/material/CircularProgress';
import HubIcon from '@mui/icons-material/Hub';

import styles from "../../styles/pages/operations.module.css"


  const sampleDeparture=[
    {
    "itineraryID": "quacks",
    "tourCode":"TTT TIB 05 23",
    "roomingList": [
      {
        "guest":{
          "guestName": "Yeti Dicho",
          "guestDOB": "10/28/1992",
          "guestID": String,
          "guestNotes": [
            "Alergic to Peanuts",
            "Vegetarian"
          ],
          "passport": "A256824",
          "nationality": "Tibet",
        },
        "guest2":{
          "guestName": "Mrs. Snow",
          "guestDOB": "27/10/93",
          "guestID": String,
          "guestNotes": [
          ],
          "passport": "A256824",
          "nationality": "Tibet",
        },
        "accomodationType": "twin",
        "singleSupp": false,
      },
      {
        "guest":{
          "guestName": "Hegi Segara",
          "guestDOB": "6/5/1942",
          "guestID": String,
          "guestNotes": [
            "Alergic to Shrimp",
          ],
          "passport": "A256824",
          "nationality": "Tibet",
        },
        "guest2":{
          "guestName": "Majorne Kepecz",
          "guestDOB": "6/7/95",
          "guestID": String,
          "guestNotes": [
            "Gluten free"
          ],
          "passport": "A256824",
          "nationality": "Tibet",
        },
        "accomodationType": "twin",
        "singleSupp": false,
      },
      {
        "guest":{
          "guestName": "Mr.Bear Donoso",
          "guestDOB": "8/15/1972",
          "guestID": String,
          "guestNotes": [
            "Alergic to Peanuts",
            "Vegetarian"
          ],
          "passport": "A256824",
          "nationality": "Tibet",
        },
        "singleSupp": true,
      }
    ],
    "hotelList":[
      "Ikala Quito",
      "Ikala Galapagos",
      "Ikala Galapagos",
      "Iguana Crossing",
      "Ikala Galapagos"
    ],
    "guides":{
      
    },
    "transport":{

    },
    "flights":[

    ],

    "startingDate": "6/1/2023",
    "maxPaxNumb": 16,
    "duration": 6,
    "departureNotes":[
      "group of birders, need early breakfasts",
    ],
    "clientObj":{
      "clientName": "Tibetan Tours Trips",
    }
  }
  ]





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
  //  - - General Doc Data:
  //  - - - Date
  //  - - - from
  //  - - - group code
  //  - - - pax numb
  //  - - - for (guide/transport)

  //  - - Operational notices

  //  - Requested Dates   DyRen

  //  - Rooming List  DyRen
  //  - - each pax comments, DOB, Nationality, Room type

  //  - Day By Day    DyRen
  //  - - - filtered by guide / transport for only needed days
  //  - - - day title, description, dailyExpenseArr, with alt display for each type of cost:
  //  - - - let expenseKeyArr = ["guideExpense", "transportExpense", "hotelExpense", "fAndBExpense", "attractionExpense", "otherExpenses" ]
  //  - - - 
  
  let expenseObj = { 
    // defaults
    // "expenseKey": The keys , 


    // // "hotelExpense"
    // "expenseKey": "hotelExpense", 
    "propertyName":"Ikala Galapagos Hotel", 
    // "price":200, 
    "priceKey": "doubleRoom",
    "location":"Tomas de Berlanga & Moises Brito, Puerto Ayora, Galapagos",
    "phoneNumber":"05 252 6133",
    // "specialRooming":[],
    // "accommodationNotes": ""


    // // guideExpenses:
    "expenseKey": "guideExpense", 
    "currency":"usd",
    "pricekey": "fullDayService",
    "guideName": "David Torres",
    "guidePhoneNumber": "0986222700",
    "guideCategory": "Galapagos Naturalist",
    "priceDetail": "Pick Up From airport + Highland Ranches",
    "price": 180,

    }

  


  //  - - - - pass through filtering, adding and disp functions, with switch statement.
  // - - - when analizing data, add guide contacts to a "tourGuideArr", and produce work order for each guide
  // same with transport providers



  let toDate= new Date()


  const { data: session } = useSession()

  const [activeDeps, setActiveDeps]=useState([])
  const [fetchedDeps, setFetchedDeps]=useState()
  const [fetchedItins, setFetchedItins]=useState()

  // general stateUtils
  const [loadingTrigger, setLoadingTrig]=useState(true)




  const [anExpense, setAnExpense]=useState({
    // defaults:
    "currency":"usd",
    "additionalDescription": "",
    "expenseKey": null, 
    "contactName": null,
    "contactNumb": null,

    // alternatives
    // key = "price" || "priceArr"

    


  })










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

      // filter for deps active today.
      sampleDeparture.forEach(element => {
        let loweLimitDate=new Date(element.startingDate)
        let upperLimitDate = addDays(element.startingDate, element.duration)
        if(toDate > loweLimitDate && upperLimitDate > toDate ){
          setLoadingTrig(false)
          let tempArr = activeDeps.concat(element)
          setActiveDeps(tempArr)
        }
      })
    }

    const res2 = await fetch("/api/gms/itineraries",{
      method: "GET"
    })
    let fetchedData2 = await res2.json()
    if(fetchedData2){
      setFetchedItins(fetchedData2)
    }
  },[])  

  function addDays(theDate, days){
    let result = new Date(theDate);
    result.setDate(result.getDate() + days)
    return result;
  }


  const statsDisplatyer=(activeDepartures)=>{
    // sum up all current clients in Rooming List
    // = number of active clients.

    // sum active tours

    console.log(activeDepartures, "active Deps at stats displayer")

    return(<>
      <div className={styles.statsBar}> 
        <h3>General Stats</h3>
      </div>
    </>)
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
    

  //////////////////////////////////////////////
  //////////////////////////////////////////////
  return(<>
    {session? <> 
      <GMSNavii user={session.user} />
      <div className={styles.titleBar}>
          <HubIcon fontSize="large" />
          <h2>Latin Travel Collection</h2>
          <h1>Operations</h1>
      </div>


    <ul>
      {/* <li> fetch aTourDeparture from DB </li> */}
      <li> Create Stats page with current trips </li>
      <li> if no departures exist, fetch itins from database and create dep.</li>
      <li> Develop EcoAndes templates </li>
    </ul>


    {loadingTrigger? <>
      {loadingScreen("Fetching Departure Data")}
    </>:<> 
      <div>
        {/* Daily(monthly||weekly ) Planner */}
        {statsDisplatyer(activeDeps)}
      </div>
    </>}

    </>:<>
      GMS Sgn in OPTS
    </> }
  </>)
}