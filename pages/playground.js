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




    const [thePriceChart, setPriceChart]=useState(LTCPriceTables)

    const [expenseTrig, setExpTrig]=useState(false)

    const [priceChartKey, setPriceChartKey]=useState("")
    const [expenseArr, setExpenseArr]=useState([])
    const [anExpense, setAnExpense]=useState()


    const expenseDisplayer=(expenseArr)=>{
        let eachExpense = expenseArr.map((elem, i)=> <React.Fragment>
            <div className={styles.anExpenseDisp}>
                
            </div>
        </React.Fragment>)
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
                {/* {console.log(elem, "here")}  */}
                
                {elem.priceDetail} </option>
            </React.Fragment>)

        }

        return(<>

            {aDropdownPicker(priceChartKeyArr, "Expense Type", false, anExpense, setPriceChartKey, optNameArr )}

            {priceChartKey&& <> 

                <select  className={styles.inputUserUI} onChange={(e)=> {
                    let tempObj=JSON.parse(e.target.value)
                    setAnExpense({
                        ...tempObj,
                        "contactName": null,
                        "contactNumb": null,
                        })
                    }}>
                    <option disabled selected  > Select Expense Type </option>
                    {dropdownOpts}
                </select>

            </>}
        </>)
    }
    const expenseEditor=(theExpense, setTheExpense)=>{
        if(theExpense){ 

        let currencyArr=["usd", "sol", "bol", "euro" ]
        let priceArrDispAndEditor

        if(theExpense.priceArr){

            let priceAndPx= theExpense.priceArr.map((elem,i)=> <React.Fragment>
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
            
            return(<>
            <form className={styles.expenseForm} onSubmit={(e)=>{
                // add expense to day arr
                e.preventDefault()
                let tempArr = expenseArr.concat(anExpense)
                console.log(tempArr)
                setExpenseArr(tempArr)
                setAnExpense()
                setPriceChartKey()
                setExpTrig(false)
            }}> 
                <div className={styles.aDataRow}>
                    <div style={{width: "35%" }}> 
                        {anInputDisplayer("Contact Name", "contactName", "text", false, "Provider's Name", theExpense, setTheExpense)}</div>
                    <div style={{width: "35%" }}> 
                        {anInputDisplayer("Contact #", "contactNumb", "number", false, "Provider's phone", theExpense, setTheExpense)}</div>
                    <div style={{width: "21%" }}>
                        {aDropdownPicker(currencyArr, "$ type", "currency", theExpense, setTheExpense, false, false)}</div>
                </div>
                <div className={styles.aDataRow}>
                    <div style={{width: "70%" }}> 
                        {anInputDisplayer("Expense Detail", "priceDetail", "text", false, theExpense.priceDetail, theExpense, setTheExpense)}</div>
                    {theExpense.price&&<>
                    <div style={{width: "25%" }}> 
                        {anInputDisplayer("price", "priceDetail", "number", false, theExpense.price, theExpense, setTheExpense)}</div>
                        </>}
                </div>
                {theExpense.priceArr&&<>
                    <div className={styles.inputLabel}> Price Table </div>
                    <i> Please select a value:</i>
                    {priceArrDispAndEditor}
                </>}


                <div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                    <div style={{width: "70%" }}> 
                        {anInputDisplayer("Additional Description", "additionalDescription", "text", false, "Extra service details", theExpense, setTheExpense)}</div>
                    <div style={{width: "25%" }}> 
                        {anInputDisplayer("max pax", "paxLimit", "number", false, theExpense.paxLimit, theExpense, setTheExpense)}</div>
                </div>
                <input className={styles.secondaryBTN} type="submit" value="Add Expense to Day =>" />
            </form>
        </>)
        } 
    }

    console.log("Expense ARR", expenseArr)

    return(<>

    {/* Will we need session on per page level, or just on Navi and it can controll it all???? */}
        {session&&<> 
            <GMSNavii  user={session.user} />

            <h1>
            Cucu
            </h1>

            <ul> 

                <li> Receive and catalogue priceData from /LTCPriceTables2023 </li>
                <li> create dayByDay[i].expenseArr </li>
                <li> add anExpense to expenseArr   </li>
                <li> calculate prices from 1 to 32 pax </li>
            
            </ul>



            {expenseTrig?<> 
                {optCataloger(thePriceChart)}
                {expenseEditor(anExpense, setAnExpense)}
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