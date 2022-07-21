import React, { useState } from "react";
import styles from "./../../styles/pages/gms.module.css"
import { useSession, signOut } from "next-auth/react"

import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';

import CountryData from "./../../data/ecoAndesCountryData"


export default function HotelRates(props){

    const { data: session } = useSession()
    const [hotelAdderContr, setHotelAdd]= useState(false)
    const [aHotelSchema, setHotelSchema]=useState({})
    console.log(CountryData)
    console.log(aHotelSchema)

    const aTextInput=(aPlaceholder, inputId, anObject, setAnObject, inputType, reqBoolean)=>{
        return(<>
        <div className={styles.anInputcont}>
            <label htmlFor={inputId} className={styles.anInputLabel}>{aPlaceholder}:</label> 
            <input
                placeholder={aPlaceholder}
                type={inputType}
                id={inputId}
                required={reqBoolean}
                onChange={(e)=>{
                    e.preventDefault()
                    setAnObject({
                        ...anObject,
                        [inputId]: e.target.value
                    })
                }}
                />
            </div>
        </>)
    }

    const locationPickers=(locationList, provOrCity )=>{
        let destinationOpts=locationList.map((elem, i)=><option key={i}>{elem}</option>)
        return(<>
            <div className={styles.anInputcont}>
                <label htmlFor={provOrCity} className={styles.anInputLabel}>    
                    {provOrCity} *:</label>
                <select required id={provOrCity} onChange={(e)=>{
                    setHotelSchema({
                        ...aHotelSchema,
                        [provOrCity]: e.target.value
                    })
                }} >{destinationOpts}</select>
            </div>
        </>)
    }

    const hotelAdderdialog=()=>{
        return(<>
        <Dialog open={hotelAdderContr} onClose={()=>setHotelAdd(false)} fullScreen>
            <div className={styles.hotelAdderCont}>
                <div className={styles.closeDialogBTN} onClick={()=>setHotelAdd(false)}>close&nbsp;<CloseIcon/></div>
                <form style={{padding: "21px"}}>
                    <h2>Add hotel to Database</h2>
                    {aTextInput("Hotel Name *", "hotelName", aHotelSchema, setHotelSchema, "text", true )}
                    {locationPickers(CountryData.ecuadorProvinces, "province")}
                    {locationPickers(CountryData.ecuadorCities, "city")}
                    {aTextInput("Location Notes", "hotelName", aHotelSchema, setHotelSchema, "text", false )}
                    <h3>Contact</h3>
                    {aTextInput("Contact Email *", "hotelEmail", aHotelSchema, setHotelSchema, "email", true )}
                    {aTextInput("Phone (main) *", "hotelEmail", aHotelSchema, setHotelSchema, "number", true )}
                    {aTextInput("Phone (mobile)", "hotelEmail", aHotelSchema, setHotelSchema, "number", false )}
                    {aTextInput("Hotel Website", "hotelUrl", aHotelSchema, setHotelSchema, "urkl", false )}
                </form>
            </div>
        </Dialog>
        </>)
    }



    return(<>
        <div className={styles.main}>
            <div className={styles.ratesNavBar}>
                <h2>EcoAndes Hotel Database</h2>
                <div className={styles.addHotelBTN} onClick={()=>{setHotelAdd(true)}}> Add Hotel &nbsp;<AddBoxIcon /></div>
            </div>
        </div>
        {hotelAdderdialog()}
    </>)
}