import React, { useState, useEffect } from 'react'

import { useSession } from "next-auth/react"
import { SignInForm } from "../../components/authForms"

import styles from "../../styles/pages/yacuma.module.css"

import ForestIcon from '@mui/icons-material/Forest';
import CircularProgress from '@mui/material/CircularProgress';

import { anInputDisplayer, inputToList } from '../../components/forms';
import { GMSNavii } from '../../components/navis';

// log in for Fausto,
// display first letters of name if picture is not available
// correct Cristina's profile picture

// . charAt()

// Camera Trap Log Book
// Bitacora de Camara Trampa

// save to local storage in phone, when connected to internet, save to database


let toDate= new Date()
const TrapCamRegModel={
    "submitDate": toDate,
    "height": Number,
    "region": String,
    "comments": [],
    "locationNotes": [],
}

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}


export default function YacumaPage(){
    const { data: session } = useSession()

    const [fetchedRecords, setFetchedRecs]=useState()
    const [sortedRecords, setSortedRecs]=useState()


    const [registrationObj, setRegistrationObj] = useState(TrapCamRegModel)
    const [isLocalNetwork, setNetworkCon]=useState(false)
    const [listPlaceHolder, setListPalceholder]=useState("Ej: a 200 metros de lodge, sur-norte")
    const [listTwoPlaceHolder, setListTwoPalceholder]=useState("Ej: siguiendo rastro de huellas")
    const [newReportTrig, setReportTrig]=useState(false)
    const [isLoading, setIsLoading]=useState(false)

    useEffect(()=>{
          const interval = setInterval(() => {
            // console.log(navigator.onLine)
            // if Set interval is false, 
            if(navigator.onLine){
                setNetworkCon(false)
            } else if ((!navigator.onLine && !isLocalNetwork )){
                setNetworkCon(true)
            }
        }, 5000);
        return () => clearInterval(interval);
    },[])
    useEffect(async()=>{
        const res = await fetch("/api/yacuma",{
            method: "GET"
        })
        const theRecords = await res.json()
        if(theRecords){
            setFetchedRecs(theRecords)
        }
    },[])
    useEffect(()=>{
        if(fetchedRecords?.length>0){
            let tempArr = fetchedRecords.sort((a,b)=>new Date(b.submitDate) - new Date(a.submitDate) )
            setSortedRecs(tempArr)
        }
    },[fetchedRecords])

    const newTramCamRegForm=()=>{
        if(newReportTrig){
            return(<>
                <form className={styles.aPaper} 
                onKeyPress={(e)=>{
                    if(e.key === 'Enter'){
                        e.preventDefault()
                    }
                }}
                onSubmit={async(e)=>{
                    e.preventDefault()
                    if(isLocalNetwork){
                        let reportArr = window.localStorage.getItem("reportArr")
                        JSON.parse(reportArr)
                        console.log(JSON.parse(reportArr))
                        let tempArr=[]
                        if(reportArr){
                            tempArr = reportArr.push(registrationObj)
                            console.log(tempArr, "tempArr, Here")
                            let tempString = JSON.stringify(tempArr)
                            window.localStorage.setItem("reportArr", tempString )
                        } else {
                            tempArr=[registrationObj]
                            console.log(tempArr, "tempArr")
                            let tempString = JSON.stringify(tempArr)
                            window.localStorage.setItem("reportArr", tempString )
                        }
                    } else {
                        setIsLoading(true)
                        // submit to DB
                        let stringifiedRecord = JSON.stringify(registrationObj)
                        const res = await fetch("/api/yacuma",{
                            method: "POST",
                            body: stringifiedRecord
                        })
                        const newRecord = await res.json()
                        if(res.status===200){
                            window.alert("record created")
                            let tempObj = {
                                ...registrationObj,
                                "_id": newRecord.insertedId 
                                }
                            let tempArr = [...fetchedRecords]
                            tempArr.push(tempObj)
                            setFetchedRecs(tempArr)
                            setRegistrationObj(TrapCamRegModel)
                            setReportTrig(false)
                        }
                    }
                }}>
                    <div onClick={()=>setReportTrig(false)} className={styles.closeBTN}> CERRAR &nbsp; X </div>
                    <h1>Nuevo Reporte de Camara Trampa: </h1>
                    <div className={styles.spaceBetRow}>
                        <div style={{width:"60%"}}>
                        {anInputDisplayer("Region", "region", "text", true, undefined, registrationObj, setRegistrationObj, undefined, undefined, "Ej: Rio Bueno" )}
                        </div>
                        <div style={{width:"35%"}}>
                        {anInputDisplayer("Altura", "height", "number", false, undefined, registrationObj, setRegistrationObj, 0, undefined, "Ej: 40 cm" )}
                        </div>
                    </div>
                    {inputToList("notas de ubicacion", "locationNotes", registrationObj, setRegistrationObj, registrationObj.locationNotes, listPlaceHolder, setListPalceholder )}
                    {inputToList("Comentarios", "comments", registrationObj, setRegistrationObj, registrationObj.comments, listTwoPlaceHolder, setListTwoPalceholder )}
                    {isLoading? <>
                        <CircularProgress />
                    </>:<>
                        <input className={styles.saveBTN} type="submit" value=" Añadir reporte a base de datos" />
                    </> }
                </form>
            </>)
        }
    }
    const eachRecordDisp=(aRecord)=>{
        let eachDate = new Date(aRecord.submitDate)

        return(<>
            <div className={styles.recordCont}>
                {eachDate.toLocaleDateString("es-ES", dateOptions)}
                <div>region:</div>
                {aRecord.region}
                <div>Altura:</div>
                {aRecord.height} cm
            </div>
        </>)
    }

    return(<>
        <div className={styles.main}>
        
            {session ? <>
                <GMSNavii user={session.user} />
                <div style={{ padding:"21px 0", margin:"33px", display:"flex", flexDirection:"column", alignItems:"center" }}>
                    <h1>Yacuma EcoLodge </h1>
                    <ForestIcon/>
                </div>

                {!newReportTrig&&<>

                <div className={styles.yacumaMain}>
                    <div className={styles.mainWelcome}>
                        <div className={styles.spaceBetRow}>
                            <h2>Reportes Camaras Trampa </h2>
                            {sortedRecords?.length} registros
                        </div>
                        {sortedRecords?.map((elem,i)=><React.Fragment key={i} >
                            {eachRecordDisp(elem)}
                        </React.Fragment> )}
                    </div>

                    <div className={styles.mainBTNS}>
                        <div className={styles.aMainBTN} onClick={()=>{
                            setReportTrig(true)
                        }} > Nuevo Reporte Cam. Tra.</div>
                    </div>
                </div>
                </>}

                {newTramCamRegForm()}
            </> :<>
                <SignInForm  />
            </>}
        </div>
    </>)
}