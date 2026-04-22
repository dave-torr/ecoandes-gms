import React, { useState, useEffect } from "react"

import styles from "./../styles/components/calcs.module.css"
import { useSession } from "next-auth/react"


export default function CalculationsPage(){

    //////////////////////////////////////////////
    // calculation grid

    // - bring in cell styling, and overall grid disp from velocirraptor.den
    // - test adding and removing calcs
    // - test adding from current hotel database
    // 
    // SAMPLE DATA
    let sampleCalcTable =[
        {"costType": "accommodation", 
        "costArr":[95, 0, 95, 0, 95, 0, 95, 0, 95, 0], 
        "costArr2":[0, 105, 105, 210, 210, 315, 315, 420, 420, 525],
        "provider":"Ikala Quito",
        "details":"suites",
        "operNotes":[],

        },
        {"costType": "guideCost", "costArr":[18, 36,54,72,90,108,126,144,162,180], "costDesc":"Full Day"},
        {"costType": "transportCost", "costArr":[60,60,60,60,65,65,65,65,65,70]},
        {"costType": "costPerPerson", "costArr":[10,20,30,40,50,60,70,80,90,100]},
    
    ]
    let tripCalcModel={
        // All data for calc, including group code, date created, version, alt versions, etc.
        "tripName": "Sample Cucu",
        "client": "A Cucu Client",
        "tourCode": "EC.SIT.SU.12.ALBO",
        "creator":"David Torres",
        "trip_id": "kajsbjbagjb;a",
        "status": 1,
        "dayByDayCalcs":[
            [...sampleCalcTable],
            undefined,
            undefined,
            [...sampleCalcTable],
        ],
    }

    //   bundle all cals into one table, and sum for each pax
    const [aPriceArr, setPriceArr]= useState([])
    const [priceCalcs, setPriceCals]=useState(
        { 
        "subtotal":[],
        "unfExpens":[],
        "profitMargin":[],
        "groupTotal":[],
        "pricePerPerson":[],
        "singleSuppArr":[],
        "tourLeaderArr":[]
        }
    )
    const [itinCalculations, setItinCalcs]=useState(tripCalcModel)

    useEffect(()=>{
        // separate rates for each day and add to aPriceArr
        itinCalculations.dayByDayCalcs.forEach((dayArrs)=>{
        dayArrs?.forEach((aCost, i)=>{
            aPriceArr.push(aCost.costArr)
            if(aCost.costArr2){
            aPriceArr.push(aCost.costArr2)
            }
            if(aCost.costType==="accommodation"){
            // add to SS & TL Costs
            // price of a single room minus half of a double room = SS
            let singleSuppPrice= ( aCost.costArr[0] - (aCost.costArr2[1] / 2) )
            priceCalcs.singleSuppArr.push(singleSuppPrice)
            priceCalcs.tourLeaderArr.push(aCost.costArr[0])
            }

        })
        })
    },[itinCalculations])

    // Total price Arr
    useEffect(()=>{
        // subtotal Calc
        let subtotalArr1=[]
        aPriceArr.map((costArr, i)=>{
        if(i===0){
            costArr.forEach((baseNum)=>{
            subtotalArr1.push(baseNum)
            })
        } else (
            costArr.forEach((elems, j)=>{
            const aSum = elems + subtotalArr1[j]
            subtotalArr1.splice(j,1,aSum)
            })
        )
        })    
        // unexp expenses
        let unexpCostArr = []
        subtotalArr1.forEach((baseNum)=>{
        const aMultiplication = (baseNum * 0.05).toFixed(2)
        unexpCostArr.push(parseFloat(aMultiplication))
        })
        // profit margin
        let profitMarginArr = []
        subtotalArr1.forEach((baseNum)=>{
        const aMultiplication = (baseNum * 0.25).toFixed(2)
        profitMarginArr.push(parseFloat(aMultiplication))
        })
        // group total
        let groupTotalArr=[]
        let tempCostArr=[[...subtotalArr1], [...unexpCostArr], [...profitMarginArr]]
        tempCostArr.map((costArr, i)=>{
        if(i===0){
            costArr.forEach((baseNum)=>{
            groupTotalArr.push(baseNum)
            })
        } else {
            costArr.forEach((elems, j)=>{
            const aSum = elems + groupTotalArr[j]
            groupTotalArr.splice(j, 1 , aSum)
            })
        }
        })    
        // PRICE PER PERSON
        let pricePerPersonArr=[]
        groupTotalArr.forEach((baseNum, i)=>{
        const aDivision = (baseNum / (i+1)).toFixed(2)
        pricePerPersonArr.push(parseFloat(aDivision))
        })

        setPriceCals({
        ...priceCalcs,
        "subtotal":[...subtotalArr1],
        "unfExpens":[...unexpCostArr],
        "profitMargin": [...profitMarginArr],
        "groupTotal": [...groupTotalArr],
        "pricePerPerson": [...pricePerPersonArr],
        })
    },[aPriceArr])
    /////////////////////////////////////
    const aGenCel = (cellType, cellContent)=>{
        if (cellType==="cashCell") return(<>
        {/* round up to 2 decimal points */}
        <div className={styles.aCashCell}> 
            {cellContent}
        </div>
        </>) 
        else if(cellType==="paxCell") return (<>
        <div className={styles.aPaxCell}> 
            {cellContent}
        </div>
        </>)
        else if(cellType==="subTtlCell") return(<>
        <div className={styles.subTtlCell}> 
            {cellContent}
        </div>
        </>)
        else if(cellType==="fillerCell") return(<>
        <div className={styles.fillerCell}> 
            {cellContent}
        </div>
        </>)
        else if(cellType==="marginCell") return(<>
        <div className={styles.marginCell}> 
            {cellContent}
        </div>
        </>)
    }  
    /////////////////////////////////////
    // GenCalcTable
    const paxCellDisp=()=>{
        // WTF why is it not displaying
        // for (let index = 0; index < 20; index++) {<React.Fragment key={index}>
        //       {aGenCel("paxCell", index+1)}
        //   </React.Fragment>}
        return(<>
        <div style={{display: "flex", width: "fit-content"}}>

        {aGenCel("fillerCell" )}
        {aGenCel("paxCell", "pax")}
        {aGenCel("paxCell", 1)}
        {aGenCel("paxCell", 2)}
        {aGenCel("paxCell", 3)}
        {aGenCel("paxCell", 4)}
        {aGenCel("paxCell", 5)}
        {aGenCel("paxCell", 6)}
        {aGenCel("paxCell", 7)}
        {aGenCel("paxCell", 8)}
        {aGenCel("paxCell", 9)}
        {aGenCel("paxCell", 10)}
        </div>
        </>)
    }
    const subtotalAdderDisp=()=>{
        let subtotalGridDisp= priceCalcs.subtotal.map((e)=><React.Fragment key={e}>
        {aGenCel("cashCell", e)}
        </React.Fragment> )
    return(<>
        <div style={{display: "flex", width: "fit-content"}}>
            {aGenCel("fillerCell" )}
            {aGenCel("subTtlCell", "subtotal")}
            {subtotalGridDisp}
        </div>
        </>)
    }
    const marginAndexpensesCalc=()=>{  
        let unforseenExpGrid = priceCalcs.unfExpens.map((e)=><React.Fragment key={e}>
        {aGenCel("cashCell", e)}
        </React.Fragment> )
        let profitMarginGrid = priceCalcs.profitMargin.map((e)=><React.Fragment key={e}>
        {aGenCel("cashCell", e)}
        </React.Fragment> )
        let groupTotalGrid = priceCalcs.groupTotal.map((e)=><React.Fragment key={e}>
        {aGenCel("cashCell", e)}
        </React.Fragment> )
        let pricePerPersonGrid = priceCalcs.pricePerPerson.map((e)=><React.Fragment key={e}>
        {aGenCel("cashCell", e)}
        </React.Fragment> )

        return(<>
        <div style={{display: "flex", width: "fit-content"}}>
            {aGenCel("marginCell", "unforseen Expenses")}
            {aGenCel("marginCell", "5%")}
            {unforseenExpGrid}
        </div>
        <div style={{display: "flex", width: "fit-content"}}>
            {aGenCel("marginCell", "profit margin")}
            {aGenCel("marginCell", "25%")}
            {profitMarginGrid}
        </div>
        <div style={{display: "flex", width: "fit-content"}}>
            {aGenCel("subTtlCell", "GROUP")}
            {aGenCel("subTtlCell", "TOTAL")}
            {groupTotalGrid}
        </div>
        <div style={{display: "flex", width: "fit-content", borderTop: "dotted 4px red" }}>
            {aGenCel("fillerCell" )}
            {aGenCel("subTtlCell", "$ per pax")}
            {pricePerPersonGrid}
        </div>
        </>)
    
    }
    const singleSuppDispl = ()=>{
        if(priceCalcs.singleSuppArr.length>0){
            let singleSuppSum = priceCalcs.singleSuppArr.reduce((acc, num) => acc + num, 0)
            let singleSuppUnforseen = singleSuppSum * 0.05
            let singleSuppMargin = singleSuppSum * 0.25
            let singleSuppTotal = singleSuppMargin + singleSuppUnforseen + singleSuppSum
        return(<>
            <div style={{display:"flex", width:"fit-content", flexDirection:"column", padding: "0 22px"}}>

            {aGenCel("cashCell", singleSuppSum)}
            {aGenCel("cashCell", singleSuppUnforseen)}
            {aGenCel("cashCell", singleSuppMargin)}
            {aGenCel("cashCell", singleSuppTotal)}
            <div style={{display: "flex", width: "fit-content", borderTop: "dotted 4px red" }}>
            {aGenCel("fillerCell" )}
            </div>
            {aGenCel("paxCell", "S.S.")}
            </div>
        </>)
        }
    }
    const tourLeaderDisp = ()=>{
        if(priceCalcs.tourLeaderArr.length>0){
            let tourLeaderSum = priceCalcs.tourLeaderArr.reduce((acc, num) => acc + num, 0)
            let tourLeaderUnforseen = tourLeaderSum * 0.05
            let tourLeaderMargin = tourLeaderSum * 0.25
            let tourLeaderTotal = tourLeaderMargin + tourLeaderUnforseen + tourLeaderSum
        return(<>
            <div style={{display:"flex", width:"fit-content", flexDirection:"column"}}>

            {aGenCel("cashCell", tourLeaderSum)}
            {aGenCel("cashCell", tourLeaderUnforseen)}
            {aGenCel("cashCell", tourLeaderMargin)}
            {aGenCel("cashCell", tourLeaderTotal)}
            <div style={{display: "flex", width: "fit-content", borderTop: "dotted 4px red" }}>
            {aGenCel("fillerCell" )}
            </div>
            {aGenCel("paxCell", "TL")}
            </div>
        </>)
        }
    }
    const genCalcDisp=()=>{
        if(aPriceArr.length>0){
        return(
        <div style={{ display:"flex" }}>
            {genItinData(itinCalculations)}
            <div style={{display:"flex", width:"fit-content", flexDirection:"column"}}>
                {subtotalAdderDisp()}
                {marginAndexpensesCalc()}
                {paxCellDisp()}
            </div>
            {singleSuppDispl()}
            {tourLeaderDisp()}
            </div>
        )
        }
    }
    const genItinData=(ItinCalcs)=>{
        if(ItinCalcs){
            return(<>
                <div className={styles.genItinData}>
                    <div><b>Created By:</b> {ItinCalcs.creator}</div>
                    <div><b>Trip Name:</b> {ItinCalcs.tripName}</div>
                    <div><b>Client:</b> {ItinCalcs.client}</div>
                    <div><b>Tour Code:</b> {ItinCalcs.tourCode}</div>
                </div>
            </>)
        } 
    }

    const costGridDisp=(itinCalcs)=>{
        const aDayBreak=(eachDayCosts, dayIndx)=>{
            // separator per day
            // if table exists, make each cost display
            return(<>
            <div className={styles.daySeparator} >Day {dayIndx+1}</div>
                {eachDayCosts===undefined&&<>
                    <div style={{padding:"21px 33px"}}>
                        No costs have been added to this day
                    </div>
                </>}







                {eachDayCosts?.length>1 && <> 
                    Display costssss
                </>}






            </>)
        }

        return(<>
            <div className={styles.genCostGrid}>

                {/* for each day display costs */}

                {aDayBreak(sampleCalcTable, 1)}
                {aDayBreak(undefined, 2)}
            </div>
        </>) 
    }

    // Tab functionality:
    // - Calculations v1 & alt versions
    // - hotel & provider list with rates (replacing price refs)
    // - price summary per version, including prices with TC, different margins/unforseenexp, sales rates


    return(<>
    <div className={styles.page}>
        {genCalcDisp()}
        {costGridDisp(itinCalculations)}
    </div>
    </>)
}
