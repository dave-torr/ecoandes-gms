import React, { useState } from "react"
import Image from "next/image"

import {EcoAndesBar} from "./../../components/navis"

import TourData from "../../data/itineraries"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExploreIcon from '@mui/icons-material/Explore';
import EventIcon from '@mui/icons-material/Event';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import styles from "../../styles/pages/aTour.module.css"
import Dialog from '@mui/material/Dialog';
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// itinerary updates:

// // Program descriptions are too long, change for "itinerary Highlights"
//  // image carousel, opens up image pop up dialog.


////////////////////////////////////////////////////////////

function TourPage({ aTour }){

    const [imgDialogContr, srtImgDialogcontr]= useState(false)
    const [selectedImg, setSelectedImg]=useState(false)


    // FFE - Components
    const accordionDisplayer=(accordTitle, accordContent, openContr, numerator)=>{
        return(<>
        <Accordion defaultExpanded={openContr} className={styles.accordionCont}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" > 
                <h2>{numerator&&<>{numerator}.-</>}  {accordTitle} </h2></AccordionSummary>
            <AccordionDetails> 
                {accordContent} </AccordionDetails>
        </Accordion>
        </>)
    }

    // FFU - Replace by highlight list
    const tourOverview = <div className={styles.tourOverviewCont}> {aTour.tripDescription} </div>

    const incExcDisplayer=(itemList, listTille)=>{
        let eachItem = itemList.map((elem, i)=><React.Fragment key={i}> <li className={styles.incExcItems}>{elem}</li></React.Fragment> )
        return(<>
            <div className={styles.incExcCont}> 
                <h3> {listTille} </h3>
                <ul> {eachItem} </ul>
            </div>
        </>)
    }
    const incExcCont= <div className={styles.inclusionsExclusionsSec}> 
        {incExcDisplayer(aTour.included, "Included in Tour")}
        {incExcDisplayer(aTour.notIncluded, "Not included in Tour")}
        </div>;

    // FFU - theme colors
    const dayByDaydisp=(tourDayByDay)=>{
        const dayInclDisp=(dayIncl)=>{
            if(dayIncl){
                let theInclusions = dayIncl.map((elem)=><><li>{elem}</li></>)
                return(<><div className={styles.dayInclusionCont}> 
                    <h4>Includes:</h4>
                    <ul>{theInclusions}</ul>
                </div></>)
            }
        }

        let theDays = tourDayByDay.map((elem,i)=> 
        <React.Fragment key={i} >
            <Accordion className={styles.accordionCont}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" > 
                    <h2>{i+1&&<>{i+1}.-</>}  {elem.dayTitle} </h2></AccordionSummary>
                <AccordionDetails> 
                    {elem.dayDescription}
                    {dayInclDisp(elem.dayInclusions)} 
                </AccordionDetails>
            </Accordion>
        </React.Fragment>)
        return(<>
            {accordionDisplayer("Day by Day", theDays, false)}
        </>)
    }
    const mainImagedisp=(imageData)=>{
        return(<>
            <div className={styles.mainImage}>
                <Image
                    src={aTour.imgArr[0]}
                    alt={aTour.tripName}
                    layout="fill"
                />
            </div>
        </>)
    }






    function Imagedisp(props){
        return(<>        
        <div className={styles.aTourImage} onClick={()=>{
            setSelectedImg({
                "src": props.imgData,
                "alt": aTour.tripName  
            })
            srtImgDialogcontr(true)
        }}>
            <Image
                src={props.imgData}
                alt={aTour.tripName}      
                layout="fill"
            />
        </div>
        </>)
    }

    const carouselDisp=(theIMGArr)=>{
        return(<>
        <div className={styles.carouselSection}>
            <div className={styles.tourIMGCarousel}>
                    {theIMGArr.map((elem, i)=><>
                    {i>0 && <> 
                        <Imagedisp key={i} imgData={elem} /> 
                    </>} </>)}
            </div>
            <div className={styles.carouselIconCont}>
                <ArrowForwardIosIcon />
            </div>
        </div>
        <Dialog open={imgDialogContr} maxWidth='xl' onClose={()=>srtImgDialogcontr(false)}>
            <div className={styles.imgDialogCont}>
                <div onClick={()=>{srtImgDialogcontr(false)}} className={styles.closeDialogBtn}>
                    Close | x </div>
                <div className={styles.dialogImgCont}>
                    {selectedImg.src &&
                        <><Image
                            src={selectedImg.src}
                            alt={selectedImg.alt}      
                            width={2000}
                            height={1500}
                        />
                        <h3>{selectedImg.alt}</h3>
                    </>}
                </div>
            </div>
        </Dialog>
        </>)
    }






    const priceDisplayer=(theTour)=>{
        
        if(theTour.prices.priceType==="private"){
            // display last elem of price arr
            return(<>
                <span> <EventIcon/> PRIVATE <br/> DEPARTURE </span>
                <span> <LocalOfferIcon /> PRICES FROM <br/> ${theTour.prices['4stars'][9]} p. person </span>
            </>)
        } else if(theTour.prices.priceType==="fixedDeparture"){
            // display fixed dep price
            return(<>
                <span> <EventIcon/> FIXED <br/> DEPARTURE </span>
                <span> <LocalOfferIcon /> PRICES FROM <br/> ${theTour.prices.pricePerPerson} p. person </span>
            </>)
        }
    }
    const tourIntroDetails=()=>{
        let countryList = aTour.countryList.map((elem, i)=><React.Fragment key={i}> { i >0 &&<> / </>}{elem} </React.Fragment>)
        return(<>
            <div className={styles.tourIntroCont}>
                <div className={styles.tourCountryList}>        
                    <strong>Destinations:</strong> {countryList}</div>
                <div className={styles.tourTitleBar}>{aTour.tripName}</div>
                <div className={styles.tourDetails}>
                    <span> <AccessTimeIcon /> {aTour.duration} <br/> DAYS </span>
                    <span><ExploreIcon /> TOUR TYPE: <br/> {aTour.tourType} </span>
                    {priceDisplayer(aTour)}
                </div>
            </div>
        </>)
    }

    return(<>
        <div className={styles.generalTourPage}>
        <EcoAndesBar />
            <div className={styles.tourContainer}>
            {mainImagedisp()}
            {tourIntroDetails()}
            {accordionDisplayer("Overview", tourOverview, true)}
            </div>
            {carouselDisp(aTour.imgArr)} 
            <div className={styles.tourContainer}>
                {accordionDisplayer("Tour Inclusions / Exclusions", incExcCont, false)}
                {dayByDaydisp(aTour.dayByDay)}
            </div>
        </div>
    </>)
}

// Dynamic rendering shtuff
export async function getStaticPaths(){
    const paths = TourData.map((elem)=>({
        params: { id: elem.id.toString() }
    }))
    return {
        paths,
        fallback: false
    }
}
export async function getStaticProps({ params }){
    // const sampleTour= { "general": "cucu" }
    const thetours = TourData.filter(elem=> elem.id.toString() ===params.id )

    return{
        props: {aTour: thetours[0] }
    }
}
export default TourPage