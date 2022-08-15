import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import styles from "./../styles/components/tourCmpnts.module.css"

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExploreIcon from '@mui/icons-material/Explore';
import EventIcon from '@mui/icons-material/Event';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import Dialog from '@mui/material/Dialog';

export function ATourCard(props){

    let theTour = props.aTour

    const aMapFunction=(theArray)=>{
        let eachArrayItem=theArray.map((elem, i)=><React.Fragment key={i}>
            {i>0 &&<> | </>}{elem} 
        </React.Fragment>)
        return(<>{eachArrayItem}</>)
    }

    return(<>
    <Link href={`/tours/${theTour.id}`}>
        <div className={styles.tourCardCont} >
            <div className={styles.tourCardImage}>
                <Image 
                    src={theTour.imgArr[0]}
                    width={320}
                    height={180}
                    alt={`A tour image: ${theTour.tripName}`}
                />
            </div>

            <div className={styles.tourCardTextCont}>
                <div className={styles.tourCardDestinations} > 
                    {aMapFunction(theTour.countryList)} </div>
                <div className={styles.tourCardTripName}> {theTour.tripName} </div>
                <div > {theTour.duration} day itinerary &nbsp;  | &nbsp; {theTour.tourType} </div>
                <div className={styles.tourCardCTA}> see experience </div>
            </div>
        </div>
    </Link>
    </>)
}

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

export function TourDisplayer(props){

    let aTour = props.aTour

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
                let theInclusions = dayIncl.map((elem, i)=><React.Fragment key={i}><li>{elem}</li></React.Fragment>)
                return(<><div className={styles.dayInclusionCont}> 
                    <h4>Includes:</h4>
                    <ul>{theInclusions}</ul>
                </div></>)
            }
        }
        const dayNotices=(theDayData)=>{
            if(theDayData.specialNotice){
                return(<>
                    <h4>Special Notice:</h4>
                    {theDayData.specialNotice}
                </>)
            }
        }

        let theDays = tourDayByDay.map((elem,i)=> 
        <React.Fragment key={i}>
            <Accordion className={styles.accordionCont}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" > 
                    <h2>{i+1&&<>{i+1}.-</>}  {elem.dayTitle} </h2></AccordionSummary>
                <AccordionDetails> 
                    {elem.dayDescription}
                    {dayInclDisp(elem.dayInclusions)}
                    {dayNotices(elem)} 
                </AccordionDetails>
            </Accordion>
        </React.Fragment>)
        return(<>
            {accordionDisplayer("Day by Day", theDays, false)}
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
                    {i>0&&<React.Fragment key={i}>
                        <Imagedisp imgData={elem} /> 
                    </React.Fragment>}
                    </>)}
            </div>
            {/* <div className={styles.carouselIconCont}>
                <ArrowForwardIosIcon />
            </div>
            <div className={styles.carouselIconCont2}>
                <ArrowForwardIosIcon />
            </div>
            <div className={styles.carouselIconCont3}>
                <ArrowBackIosIcon />
            </div>
            <div className={styles.carouselIconCont4}>
                <ArrowBackIosIcon /> 
            </div> */}
        </div>
        <Dialog open={imgDialogContr} fullScreen onClose={()=>srtImgDialogcontr(false)}>
            <div className={styles.imgDialogCont}>
                <div onClick={()=>{srtImgDialogcontr(false)}} className={styles.closeDialogBtn}>
                    Close | x </div>
                <div className={styles.dialogImgCont}>
                    {selectedImg.src &&
                        <><Image
                            src={selectedImg.src}
                            alt={selectedImg.alt}      
                            width={2000}
                            height={1125}
                        />
                        <h3>{selectedImg.alt}</h3>
                    </>}
                </div>
            </div>
        </Dialog>
        </>)
    }
    const priceDisplayer=(theTour)=>{
        if(theTour.prices.priceType==="fixedDeparture"){
            // display fixed dep price
            return(<>
                <span> <EventIcon/> FIXED <br/> DEPARTURE </span>
                <span> <LocalOfferIcon /> PRICES FROM <br/> ${theTour.prices.pricePerPerson} p. person </span>
            </>)
        } else if (theTour.prices.privateDeparture){
            return(<>
                <span onClick={()=>props.bookingProcess(1)}> <EventIcon/> PRIVATE <br/> DEPARTURE </span>
                <span> <LocalOfferIcon /> PRICES FROM <br/> ${theTour.prices.pricePerPerson} p. person </span>
            </>)
        }
    }
    const tourIntroDetails=()=>{
        let countryList = aTour.countryList.map((elem, i)=><React.Fragment key={i}> { i >0 &&<> / </>}{elem} </React.Fragment>)
        return(<>
            <div className={styles.tourIntroCont}>
                <div className={styles.tourCountryList}>        
                    Destinations: &nbsp;{countryList}</div>
                <div className={styles.tourTitleBar}>
                    {aTour.tripName}</div>
                <a className={styles.tourOverview}> 
                    {aTour.tripDescription} </a>
                {aTour.prices.privateDeparture&&<>
                    <div className={styles.privateDeparturesTitle} onClick={()=>props.bookingProcess(1)}>
                    Book Trip <i>Here</i></div> </>}
                <div className={styles.tourDetails}>
                    <span> <AccessTimeIcon /> {aTour.duration} <br/> DAYS </span>
                    <span><ExploreIcon /> TOUR TYPE: <br/> {aTour.tourType} </span>
                    {priceDisplayer(aTour)}
                </div>
            </div>
        </>)
    }
    const mainImagedisp=()=>{
        return(<>
            <div className={styles.mainImgdisplayer}>
                <Image
                    src={aTour.imgArr[0]}
                    height={1125}
                    width={2000}
                    alt="sss"
                />
            </div>
        </>)
    }
    const breadcrumbNavigation=()=>{
        if(props.breadcrumb){
        return(<>
            <div className={styles.breadcrumbNaviCont}>
                <Link href="/" >
                    <a >Home </a>
                </Link>
                <Link href="/tours" >
                    <a>{"->"} itineraries </a>
                </Link>
                    <a>{"->"} {aTour.tripName}</a>
            </div>
        </>)
        } else if (props.partnerLogo){
            return(<>
                <div className={styles.partnerLogo}>{props.partnerLogo}</div>
            </>)
        }
    }
    const hotelList=(theTour)=>{
        if(theTour.hotelList){
            let theHotels=theTour.hotelList.map((elem, i)=>
                <div className={styles.hotelLink} key={i}>
                    <li>{elem.hotelName}</li> &nbsp;<a href={elem.hotelLink} target="_blank"><InsertLinkIcon /> </a>  
                </div>)
            let hotelListAndNotice=<div>
                {theHotels}
                {theTour.prices.priceNotice&&<h4> *{theTour.prices.priceNotice} </h4>}
            </div>
            return(<>
                {accordionDisplayer("Hotel List", hotelListAndNotice, false)}
            </>)
        }
    }

    return(<>
        <article className={styles.generalTourPage}>
            <div className={styles.tourContainer}>
                {mainImagedisp()}
                {breadcrumbNavigation()}
                {tourIntroDetails()}
                {carouselDisp(aTour.imgArr)} 
            </div>
            <div className={styles.tourDetailsContainer}>
                {dayByDaydisp(aTour.dayByDay)}
                {accordionDisplayer("Tour Inclusions / Exclusions", incExcCont, false)}
                {hotelList(aTour)}
            </div>
        </article>
    </>)
}
