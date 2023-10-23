
import React, { useState } from "react"

import styles from "../../styles/components/providers.module.css"

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { aDropdownPicker, anInputDisplayer } from "../forms";
import CountryData from "../../data/dataAndTemplates.json"


export function aHotelDisplayer(aHotel){
    // console.log(aHotel)

// target='_blank' href="https://wa.me/593979469989"

    const starDisp=(starz)=>{
        let starArr=[]
        for(let i = 0; i<starz; i++ ){
            starArr.push( <StarBorderIcon/> )
        }  
        return(<>
            {starArr}
        </>)
    }

    const additionalServicesDisp=(servArr)=>{
        if(servArr){return(<>
            <Accordion defaultExpanded={false}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                    <h2> Additional Services </h2>
                </AccordionSummary>
                <AccordionDetails>
                    {servArr.map((elem, i)=><React.Fragment key={i}>
                    <div className={styles.hotelRoomDisp}>
                        <div style={{ display:"flex", flexDirection:"column", width:"50%", textTransform:"capitalize" }}> 
                            {elem.priceDescription}
                            <strong> {elem.priceType} </strong>
                        </div>              
                        <div style={{ display:"flex", flexDirection:"column", width:"40%", textTransform:"capitalize" }}> 
                            <span> <strong> PRICE: </strong> USD $ {elem.price}</span>
                            {elem.guestMax &&<> <span><strong>MAXIMUM GUESTS: </strong>  {elem.guestMax} Pax  </span>  </> }
                        </div>              
                    </div>
                    </React.Fragment> )}
                </AccordionDetails>
            </Accordion>
        </>)} 
    }

    if(aHotel){
    return(<>
        <div className={styles.aProviderCont}>
            <div className={styles.spaceBetRow}>
                <h1>{aHotel.hotelName && <> {aHotel.hotelName} </> }</h1>
                {/* star rating system */}
                <div style={{ display:"flex"}}>
                    {starDisp(aHotel.stars)}
                </div>
            </div>
            <div style={{ textTransform:"capitalize"}}> 
            {aHotel.city && <> {aHotel.city} | </> } 
            {aHotel.country && <> {aHotel.country} </> } </div> <br/>

            <div className={styles.spaceBetRow}>
                <span style={{ textTransform:"uppercase",  }}>
                    {aHotel.hotelCategory && <> {aHotel.hotelCategory} </> }
                </span>

                <span className={styles.hotelLinksDisp} >
                    {aHotel.website && <>
                    <a target='_blank' href={aHotel.website}><LanguageIcon/></a></>}
                    {aHotel.gmapsLink && <>
                    <a target='_blank' href={aHotel.gmapsLink}><LocationOnIcon/></a></>}
                    {aHotel.email && <>
                    <a target='_blank' href={`mailto:${aHotel.email}`}><MailOutlineIcon/></a></>}
                </span>
            </div>

            {/* contacts for hotel */}
            {aHotel.contactArr&& <>
            <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                    <h2> Contacts </h2>
                </AccordionSummary>
                <AccordionDetails>                    
                    {aHotel.contactArr?.map((elem,i)=><React.Fragment>
                    <div className={styles.spaceBetRow}>
                        <div className={styles.aContactRow}>
                            <h4>{elem.name&& <>{elem.name}</>}</h4>
                            {elem.role&& <>&nbsp; &nbsp;{elem.role}</>}
                        </div>
                        <div className={styles.aContactRow}>
                            {elem.email&& <>
                                <span><a target='_blank' href={`mailto:${elem.email}`}> <MailOutlineIcon/> </a></span></>}
                            {elem.phono&& <>
                                <span><a target='_blank' href={`tel:+593${elem.phono}`}> <PhoneForwardedIcon/></a></span></>}
                            {elem.wapp&& <>
                                <span><a target='_blank' href={`https://wa.me/593${elem.wapp}`}> 
                                <WhatsAppIcon/></a></span></>}
                        </div>
                    </div>
                    </React.Fragment>)}
                </AccordionDetails>
            </Accordion>
            </>}

            {aHotel.roomPriceArr&& <>
            <Accordion defaultExpanded={false}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                    <h2> Room Types </h2>
                </AccordionSummary>
                <AccordionDetails>
                    {aHotel.roomPriceArr?.map((elem,i)=><React.Fragment key={i}>
                        <div className={styles.hotelRoomDisp}>
                            <div style={{ display:"flex", flexDirection:"column", width:"60%" }}> 
                                {elem.roomDescription &&<>
                                    <strong> ROOM TYPE </strong>
                                    {elem.roomDescription}
                                </>} 
                            </div>
                            <div style={{ display:"flex", flexDirection:"column", width:"18%" }}>
                                {elem.price &&<>
                                    <strong> PRICE </strong>
                                    <span style={{ textTransform:"uppercase"}}>
                                        {aHotel.currency} ${elem.price}</span>
                                </>} 
                            </div>
                            <div style={{ display:"flex", flexDirection:"column", width:"18%" }}>
                                {elem.additionalBed &&<>
                                    <strong> ADD. BED </strong>
                                    <span style={{ textTransform:"uppercase"}}>
                                        {aHotel.currency} ${elem.additionalBed}</span>
                                </>} 
                            </div>


                        </div>
                    </React.Fragment> )}
                </AccordionDetails>
            </Accordion>
            </>}

            {additionalServicesDisp(aHotel.additionalServices)}
        </div>
    </>)
    }
}

export function hotelAdderForm(HotelObj, setHotelObj, theTempObj, setTheTemp ){

    const cityPicker=(country)=>{
        let cityArr=[]
        if(country==="ecuador"){cityArr=CountryData.ecuadorCities }
        else if(country==="argentina"){cityArr=CountryData.argentinaCities }
        else if(country==="peru"){cityArr=CountryData.peruCities }
        else if(country==="bolivia"){cityArr=CountryData.boliviaCities }
        else if(country==="chile"){cityArr=CountryData.chileCities }
        return(<>
        <div style={{width:"48%"}}>
            {HotelObj.country&& <>
            {aDropdownPicker(cityArr, "City", "city", HotelObj, setHotelObj,)}
            </>}
        </div>
        </>)
    }
    const contactAdder=()=>{
        return(<>
        <h3>Add Contacts:</h3>
            <div className={styles.spaceBetRow}>
                <div style={{width:"65%"}}>
                    {anInputDisplayer("Contact Name", "name", "text", false, undefined, theTempObj, setTheTemp, undefined, undefined, "Contact Name")}
                </div>
                <div style={{width:"30%"}}>
                    {anInputDisplayer("Role", "role", "text", false, undefined, theTempObj, setTheTemp, undefined, undefined, "Contact Role")}
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <div style={{width:"48%"}}>
                    {anInputDisplayer("Contact Phono", "phono", "number", false, undefined, theTempObj, setTheTemp, undefined, undefined, "0987556422")}
                </div>
                <div style={{width:"48%"}}>
                    {anInputDisplayer("WhatsApp", "wapp", "number", false, undefined, theTempObj, setTheTemp, undefined, undefined, "Whats App")}
                </div>
            </div>
            {anInputDisplayer("Email", "email", "email", false, undefined, theTempObj, setTheTemp, undefined, undefined, "reservations@samplehotel.com")}
            <div className={styles.spaceBetRow}>
                <span/>
                <div className={styles.addCntctBTN} onClick={()=>{
                    let tempContArr
                    if(HotelObj.contactArr){
                        tempContArr= [...HotelObj.contactArr]
                    } else {tempContArr=[]}
                    tempContArr.push(theTempObj)
                    setHotelObj({
                        ...HotelObj,
                        "contactArr":tempContArr
                    })
                    setTheTemp(false)
                }}> ADD TO CONTACT LIST </div>
            </div>
        </>)
    }


    return(<>
        <form className={styles.aProviderCont}>
            <h2> Hotel Adder Form:</h2>
            {/* Gen Data */}
            <div className={styles.spaceBetRow}>
                <div style={{width:"70%"}}>
                    {anInputDisplayer("Hotel Name", "hotelName", "text", true, undefined, HotelObj, setHotelObj, undefined, undefined, "Property Name")}
                </div>
                <div style={{width:"28%"}}>
                    {anInputDisplayer("Stars", "stars", "number", true, undefined, HotelObj, setHotelObj, 2, 5, "Ex: 4")}
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <div style={{width:"48%"}}>
                    {aDropdownPicker(CountryData.countryList, "Country", "country", HotelObj, setHotelObj,)}
                </div>
                {cityPicker(HotelObj.country)}
            </div>
            <div className={styles.spaceBetRow}>
                <div style={{width:"48%"}}>
                    {anInputDisplayer("website", "website", "text", true, undefined, HotelObj, setHotelObj, undefined, undefined, "Website")}
                </div>
                <div style={{width:"48%"}}>
                    {anInputDisplayer("Gmaps Location", "gmapsLink", "text", true, undefined, HotelObj, setHotelObj, undefined, undefined, "GPS Location")}
                </div>
            </div>
            <div className={styles.spaceBetRow}>
                <div style={{width:"48%"}}>
                    {anInputDisplayer("Hotel Category", "hotelCategory", "text", true, undefined, HotelObj, setHotelObj, undefined, undefined, "Ex: Boutique")}
                </div>
                <div style={{width:"48%"}}>
                    {anInputDisplayer("Main Email", "email", "text", true, undefined, HotelObj, setHotelObj, undefined, undefined, "sales@samplehotel.com")}
                </div>
            </div>

            {/* Contact Arr */}
            <div className={styles.spaceBetRow}>
            <span/> _______________________________________
            <span/> 
            </div>
            {theTempObj?<>
                {contactAdder()}
            </>:<>
                <div className={styles.spaceBetRow}>
                    <span/>
                    <div className={styles.addCntctBTN} onClick={()=>{
                        setTheTemp({})
                    }}>
                        ADD NEW CONTACT
                    </div>
                </div>
            </>}

        </form>
    </>)
}