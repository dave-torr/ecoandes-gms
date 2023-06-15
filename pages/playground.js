import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from "next-auth/react"


import { Select } from '@mantine/core';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CircularProgress from '@mui/material/CircularProgress';

import { aDropdownPicker, anInputDisplayer} from "../components/forms"

import LTCPriceTables from "../data/LTCPriceTables2023.json"


import {GMSNavii} from "./../components/navis"

import styles from "./../styles/pages/playground.module.css"



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
}


 const sampleDeparture={
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
        "accomodationType": "matrimonial",
        "singleSupp": false,
      },
      {
        "guest":{
          "guestName": "Yeti Michu",
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
          "guestName": "Mrs. Icicle",
          "guestDOB": "27/10/93",
          "guestID": String,
          "guestNotes": [
          ],
          "passport": "A256824",
          "nationality": "Tibet",
        },
        "accomodationType": "matrimonial",
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
        "guest3":{
          "guestName": "Third Guest",
          "guestDOB": "6/7/98",
          "guestID": String,
          "guestNotes": [
            "Gluten free"
          ],
          "passport": "A2664",
          "nationality": "Malaysia",
        },
        "accomodationType": "triple",
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
          "nationality": "Nepal",
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

    "startingDate": "6/6/2023",
    "maxPaxNumb": 16,
    "duration": 6,
    "departureNotes":[
      "group of birders, need early breakfasts",
    ],
    "clientObj":{
      "clientName": "Tibetan Tours Trips",
    }
  }
  

// Bitacora logo:
// import TrackChangesIcon from '@mui/icons-material/TrackChanges';

export default function PlaygroundPage(props){
    const { data: session } = useSession()
    // ///////////////////////////////
    // ///////////////////////////////




/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// operations calc

    const [tempDayByDay, setDayByDay]=useState()

    // calculations
    const [thePriceChart, setPriceChart]=useState(LTCPriceTables)
    const [expenseTrig, setExpTrig]=useState(false)
    const [priceChartKey, setPriceChartKey]=useState("")
    const [expenseArr, setExpenseArr]=useState([])
    const [anExpense, setAnExpense]=useState()
    // providers
    const [providerArr, setProviderArr]=useState([])
    const [contactTrig, setContactTrig]=useState(false)


    const paxStats=(theItin, setPxTotal, setRooming)=>{

        // useEffect???

        let paxTotal = 0
        let roomObj= {
            "singleRooms": 0,
            "twinRooms":0,
            "matrimonialRooms":0,
            "tripleRooms":0,
            "quadRooms":0,
        }
        let nationalityArr=[]



        // each guest loop
        theItin.roomingList.forEach((elem)=>{
            if(elem.guest){
                paxTotal= paxTotal + 1;
                const findContact = nationalityArr.find(element => element === elem.guest.nationality)
                if(!findContact){nationalityArr.push(elem.guest.nationality)}
            }
            if(elem.guest2){
                paxTotal= paxTotal + 1
                const findContact = nationalityArr.find(element => element === elem.guest2.nationality)
                if(!findContact){nationalityArr.push(elem.guest2.nationality)}
            }
            if(elem.guest3){
                paxTotal= paxTotal + 1
                const findContact = nationalityArr.find(element => element === elem.guest3.nationality)
                if(!findContact){nationalityArr.push(elem.guest3.nationality)}
            }
            if(elem.guest4){
                paxTotal= paxTotal + 1
                const findContact = nationalityArr.find(element => element === elem.guest4.nationality)
                if(!findContact){nationalityArr.push(elem.guest4.nationality)}
            }
            if(elem.singleSupp){
                roomObj={
                    ...roomObj,
                    "singleRooms":roomObj.singleRooms + 1
                }
            }
            if(elem.accomodationType==="twin"){
                roomObj={
                    ...roomObj,
                    "twinRooms":roomObj.twinRooms + 1
                }
            }
            if(elem.accomodationType==="matrimonial"){
                roomObj={
                    ...roomObj,
                    "matrimonialRooms":roomObj.matrimonialRooms + 1
                }
            }
            if(elem.accomodationType==="triple"){
                roomObj={
                    ...roomObj,
                    "tripleRooms":roomObj.tripleRooms + 1
                }
            }
            if(elem.accomodationType==="quad"){
                roomObj={
                    ...roomObj,
                    "quadRooms":roomObj.quadRooms + 1
                }
            }

        })

        console.log("pax total:", paxTotal)
        console.log("rooming:",  roomObj)
        console.log("nationality:",  nationalityArr)

        // setPxTotal(paxTotal)
        // setRooming(roomObj)
    }


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
                priceChartKeyArrTwo.push(elem.priceKey)
            });
            theSecondLevel.forEach((elem, i) => {
                optNameArr2.push(elem.priceDetail)
            });
            dropdownOpts= theSecondLevel.map((elem,i)=><React.Fragment key={i}> 
                <option value={JSON.stringify(elem)}>                 
                {elem.priceDetail} </option>
            </React.Fragment>)
        }

        return(<>

            {aDropdownPicker(priceChartKeyArr, "Expense Type", false, anExpense, setPriceChartKey, optNameArr )}

            {priceChartKey&& <> 

                <select  className={styles.inputUserUI} onChange={(e)=> {
                    let tempObj=JSON.parse(e.target.value)

                    if(tempObj.contactName){
                        setAnExpense({
                            ...tempObj,
                            "contactNumb": null,
                        })
                    } else {
                        setAnExpense({
                            ...tempObj,
                            "contactName": "Provider",
                            "contactNumb": 100000,
                        })
                    }
                    }}>
                    <option disabled selected  > Select Expense Type </option>
                    {dropdownOpts}
                </select>

            </>}
        </>)
    }
    const expenseEditor=(theExpense, setTheExpense, contactArr)=>{
        if(theExpense){ 

        let currencyArr=["usd", "sol", "bol", "euro" ]
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
                <div className={styles.addContactBTN} onClick={()=>{
                    setTheExpense({
                        ...theExpense,
                        "contactName": elem.contactName,
                        "contactNumb": elem.contactNumb,
                    })
                    setContactTrig(true) 
                }}> + {elem.contactName} </div>
            </React.Fragment>)
        }
        
        return(<>
            <form className={styles.expenseForm} 
            onSubmit={(e)=>{
                // add expense to day arr
                e.preventDefault()
                let tempArr = expenseArr.concat(anExpense)
                setExpenseArr(tempArr)
                setPriceChartKey()
                let tempProviderObj = {
                    "contactName": anExpense.contactName,
                    "contactNumb": anExpense.contactNumb,
                    "expenseKey": anExpense.expenseKey
                }
                const findContact = providerArr.find(elem => elem.contactName === anExpense.contactName)
                if(!findContact){
                    let tempContArr = providerArr.concat(tempProviderObj)
                    setProviderArr(tempContArr)
                }
                setTheExpense()
                setExpTrig(false)
                setContactTrig(false)
            }}> 

                {contactArr.length>0&& <>
                <br></br>
                    Previous providers:
                    <div style={{display:"flex", alignItems:"center", margin:'9px'}}> {contactOpts} </div>
                </>}

                <div className={styles.aDataRow}>

                    {/* <div style={{width: "35%"}}>
                        <h3> CONTACT NAME</h3>
                        {theExpense.contactName} </div>
                    <div style={{width: "35%" }}>
                        <h3> CONTACT NUMBER</h3>
                        #0{theExpense.contactNumb} </div> */}

                {/* {contactTrig? <></>:<></>} */}


                    <div style={{width: "35%" }}> 
                        {anInputDisplayer("Contact Name*", "contactName", "text", false, theExpense.contactName, theExpense, setTheExpense)}</div>
                    <div style={{width: "35%" }}> 
                        {anInputDisplayer("Contact #", "contactNumb", "number", false, theExpense.contactNumb, theExpense, setTheExpense)}</div>
                
                   <div style={{width: "21%" }}>
                        {aDropdownPicker(currencyArr, "$", "currency", theExpense, setTheExpense, false, false)}</div> 
                </div>
                <div className={styles.aDataRow}>
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
                        {anInputDisplayer("# Required*", "varExpTickets", "number", true, "Tickets", theExpense, setTheExpense)}</div>
                    </>:<>
                    <div style={{width: "25%" }}> 
                        {anInputDisplayer("max pax", "paxLimit", "number", false, theExpense.paxLimit, theExpense, setTheExpense)}</div>
                    </>}

                </div>
                <input className={styles.secondaryBTN} type="submit" value="Add Expense to Day +" />
            </form>
        </>)
        } 
    }
    const expenseDisplayer=(theExpenseArr)=>{
        let eachExpense = theExpenseArr.map((elem, i)=> <React.Fragment key={i}>
            <div className={styles.anExpenseDisp}>
                <div style={{width:"55%"}}> {elem.priceDetail} </div>
                <div style={{display:"flex"}}>
                {providerArr.length>1&&<><strong>
                    {elem.contactName!="Provider"&&<>{elem.contactName}</>} |</strong></>}
                <div style={{width:"27px", textAlign:"end"}}> {elem.varExpTickets&& <>{elem.varExpTickets} x </>} </div>
                <div style={{width:"66px", textAlign:"end"}}> $ {elem.price}</div></div>
                
            </div>
        </React.Fragment>)

        if(theExpenseArr.length>0){
        return(<>
            Expenses:
            <div className={styles.expenseGridDisp}>
                {eachExpense}
            </div>
        </>)
        }
    }
    // per day
    const totalsAdder=(theExpenseArr)=>{
        let adderNumb = 0

        if(theExpenseArr.length>0){
            theExpenseArr.forEach((elem)=>{

                // if varExpense, multiply elem.price*varExpTickets
                if(elem.expenseKey==="variableExpense"){
                    adderNumb = adderNumb + (elem.price * elem.varExpTickets)
                } else {

                    adderNumb= adderNumb + elem.price

                }
            })

            return(<>
                Daily Totals:
                <div className={styles.anExpenseDisp}>
                    <div> Total </div>
                    <div> $ {adderNumb} </div>
                </div>
            </>)
        }
    }
    const contactArrDisp=(theArr)=>{
        if(theArr.length>0){
            const guideTypeSwitcher=(theKey)=>{
                switch (theKey) {
                    case "guideExpense":
                        return " - Guide Service";
                        
                }
            }
            let eachContact=theArr.map((elem, i)=><React.Fragment key={i}>
                <div className={styles.anExpenseDisp}>
                    <div><strong>{elem.contactName}</strong> {guideTypeSwitcher(elem.expenseKey)}</div>
                    {elem.contactNumb!=100000 &&<><div> # 0{elem.contactNumb}</div></>}
                </div>
            </React.Fragment> )
            return(<>
                Contacts:
                {eachContact}
            </>)            
        }
    }



    // const anOperationsFileDisp=(theDep)=>{



    //     return(<>

    //     </>)
    // }







    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////

    return(<>

    {/* Will we need session on per page level, or just on Navi and it can controll it all???? */}
        {session&&<> 
            <GMSNavii  user={session.user} />

            <h1>
            Cucu
            </h1>

            <ul> 

                {/* <li> Receive and catalogue priceData from /LTCPriceTables2023 </li> */}
                {/* <li> create dayByDay[i].expenseArr </li> */}
                {/* <li> add anExpense to expenseArr   </li> */}
                <li> add expenseArr to dayByDay </li>

                <dl> 
                    <dt> Global Expense Arr</dt>
                    <dd> Filter by provider name, create different docs from templates, and display each provider's services </dd>
                    <dd> Req Economico per provider </dd>
                </dl>

                <li> Add additional expense functionality  </li>
                <dl> 
                    <dt> Hotel Expenses </dt>
                    <dd> if eachDay.overnightProperty? add to contactList </dd>
                    <dd> Can select room type, & set price per type </dd>
                    <dd> Can select number of rooms per type </dd>
                    <dd> Hotel name and address required </dd>
                    <dd> feed hotel contact from prev hotels </dd>
                </dl>

                bring in sampleDep, calculate number of pax in rooming list, use to calc variable prices. 

            
            </ul>

            {/* Day by day elems */}

            {contactArrDisp(providerArr)}

            {expenseDisplayer(expenseArr)}

            {totalsAdder(expenseArr)}

            {paxStats(sampleDeparture)}

            {expenseTrig?<> 
                {optCataloger(thePriceChart)}
                {expenseEditor(anExpense, setAnExpense, providerArr)}
            </>:<>
                <div className={styles.secondaryBTN} onClick={()=>setExpTrig(true)}> Add expense to day + </div>
            </>}

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </>}
    </>)
}