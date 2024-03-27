
import React, { useState } from "react"

import styles from "../../styles/components/providers.module.css"


import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { aContactDisplayer, aRoomRateDisp, anAdditServiceDis } from "../../pages/gms/library";

////////////////////////////////////////
////////////////////////////////////////
// used in library
export function aHotelDisplayer(aHotel){

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
                        {anAdditServiceDis(elem, i, false)}
                    </React.Fragment> )}
                </AccordionDetails>
            </Accordion>
        </>)} 
    }


    if(aHotel){
    return(<>
        <div className={styles.aProviderCont}>
            <div className={styles.spaceBetRow} style={{textTransform:"capitalize", fontSize:"0.9em", padding:"15px" }}>
                <div >
                    {aHotel.hotelCountry && <> {aHotel.hotelCountry} </> }             
                    {aHotel.hotelProvince && <>&nbsp; | &nbsp; {aHotel.hotelProvince} </> }             
                    {aHotel.hotelCity && <>&nbsp; | &nbsp; {aHotel.hotelCity} </> }             
                </div>
                {aHotel.hotelCategory && <> {aHotel.hotelCategory} </> }
            </div>
            <Accordion  sx={{ boxShadow:0, padding:0 }} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" style={{display:"flex" }} >
                    <div className={styles.spaceBetRow}>
                        <h1>{aHotel.hotelName && <> {aHotel.hotelName} </> }</h1>
                        <div style={{ display:"flex"}}>
                            {starDisp(aHotel.accomodationCategory)}
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={styles.spaceBetRow}>
                        <div>   
                            <strong>Address:</strong><br/>
                            {aHotel.hotelAddress && <> {aHotel.hotelAddress}</> } 
                            {aHotel.locNotes&&<>&nbsp; &nbsp; <i>{aHotel.locNotes}</i></>}
                        </div>
                        <span className={styles.hotelLinksDisp} >
                            {aHotel.hotelWebsite && <>
                            <a target='_blank' href={`${aHotel.hotelWebsite}`}><LanguageIcon/></a></>}
                            {aHotel.gmapsLink && <>
                            <a target='_blank' href={aHotel.gmapsLink}><LocationOnIcon/></a></>}
                        </span>
                    </div>
                    {/* contacts for hotel */}
                    {aHotel.contactArr&& <>
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                            <h2> Contacts </h2>
                        </AccordionSummary>
                        <AccordionDetails>                    
                            {aHotel.contactArr?.map((elem,i)=><React.Fragment key={i}>
                            {aContactDisplayer(elem,i,false)}
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
                            {aRoomRateDisp(elem,i,false)}
                            </React.Fragment> )}
                        </AccordionDetails>
                    </Accordion>
                    </>}
                    {additionalServicesDisp(aHotel.serviceArr)}
                    {(aHotel.creditConditions?.length>0 || aHotel.priceConditions?.length>0 || aHotel.observations?.length>0 || aHotel.gratuitiesAndCond?.length>0  )&&<> 
                        <Accordion defaultExpanded={false}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                                <h2> Conditions, Gratuities and more </h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                {aHotel.creditConditions?.length>0 &&<>
                                    <strong>Credit || Payment Policies </strong>
                                    <br/>
                                    {aHotel.creditConditions.map((elem, i)=><React.Fragment key={i}>
                                        <li>{elem}</li>
                                    </React.Fragment>)}
                                    <br/>
                                </>}
                                {aHotel.priceConditions?.length>0 &&<>
                                    <strong>Price Conditions</strong>
                                    <br/>
                                    {aHotel.priceConditions.map((elem, i)=><React.Fragment key={i}>
                                        <li>{elem}</li>
                                    </React.Fragment>)}
                                    <br/>
                                </>}
                                {aHotel.observations?.length>0 &&<>
                                    <strong>Observations </strong>
                                    <br/>
                                    {aHotel.observations.map((elem, i)=><React.Fragment key={i}>
                                        <li>{elem}</li>
                                    </React.Fragment>)}
                                    <br/>
                                </>}
                                {aHotel.gratuitiesAndCond?.length>0 &&<>
                                    <strong>Gratuities || Discounts </strong>
                                    <br/>
                                    {aHotel.gratuitiesAndCond.map((elem, i)=><React.Fragment key={i}>
                                        <li>{elem}</li>
                                    </React.Fragment>)}
                                    <br/>
                                </>}
                            </AccordionDetails>
                        </Accordion>
                    </>}
                </AccordionDetails>
            </Accordion>
        </div>
    </>)
    }
}

