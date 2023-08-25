
import React from "react"
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

export function aHotelDisplayer(aHotel){
    console.log(aHotel)

// target='_blank' href="https://wa.me/593979469989"

    const starDisp=(starz)=>{
        for(let i =0; i<starz+1; i++ ){
            return(<> <StarBorderIcon/> </>)
        }  
    }

    return(<>
        <div className={styles.aProviderCont}>
            <div className={styles.spaceBetRow}>
                <h1>{aHotel.hotelName && <> {aHotel.hotelName} </> }</h1>
                {/* star rating system */}
                <div style={{ display:"flex"}}>
                    {starDisp(aHotel.stars)}
                </div>
            </div>
            <div style={{ textTransform:"capitalize",  }}> 
            {aHotel.city && <> {aHotel.city} </> } | 
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
            <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                    <h2> Contacts </h2>
                </AccordionSummary>
                <AccordionDetails>                    
                    {aHotel.contactArr?.map((elem,i)=><React.Fragment>
                    <div className={styles.spaceBetRow}>
                        <h4> {elem.name&& <>{elem.name}</>}</h4>
                        <div className={styles.aContactRow}>
                            {elem.role&& <> {elem.role}</>}
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
        </div>
    </>)

}