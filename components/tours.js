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
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import MapIcon from '@mui/icons-material/Map';
import HikingIcon from '@mui/icons-material/Hiking';
import TerrainIcon from '@mui/icons-material/Terrain';

import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';

import EcoAndesLogo from "./../public/assets/logos/condor1.png"

import Dialog from '@mui/material/Dialog';

let theLocalStorage


export function ATourCard(props){

    let theTour = props.aTour

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
            <div className={styles.tourCardImageMobile}>
                <Image 
                    src={theTour.imgArr[0]}
                    width={430}
                    height={240}
                    alt={`A tour image: ${theTour.tripName}`}
                />
            </div>

            <div className={styles.tourCardTextCont}>
                <div className={styles.difficultyDispCont}> 
                    Difficulty: {theTour.difficulty}/5 </div>
                <span>
                    {theTour.startingPlace? <>
                    <div className={styles.tourStartingPlace} > 
                        starting from {theTour.startingPlace} </div>
                    </>: <>
                        <div className={styles.tourStartingPlace}/>
                    </>}
                    <div className={styles.tourCardTripName}> {theTour.tripName} </div>
                    <div> {theTour.duration} day itinerary &nbsp;  | &nbsp; {theTour.tourType} </div>
                </span>
                <div className={styles.tourCardCTA}> see experience </div>
            </div>
        </div>
    </Link>
    </>)
}
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

export function TourDifficultyCard(props){
    const tourDiffSwitcher=(theDiff)=>{
        switch(theDiff){
            case 1:
            return(<><div className={styles.tourInfoDescriptor}>
                <div className={styles.iconDiffDisp}>
                    <span>
                        <MapIcon />
                    </span>
                    <span>
                        <DirectionsWalkIcon />
                        &nbsp; &nbsp;
                        <Filter1Icon /> 
                    </span>
                </div>
                <strong>Easy Adventures</strong> require minimal prior knowledge and no technical skills. We enjoy our activities with in stages and at a relaxed pace, with enough time to enjoy the views and arrive at the destinations. Can be achieved by anyone with regular physical conditions.
            </div></>)

            case 2:
            return(<><div className={styles.tourInfoDescriptor}>
                <div className={styles.iconDiffDisp}>
                    <span>
                        <MapIcon />
                    </span>
                    <span>
                        <DirectionsWalkIcon />
                        &nbsp; &nbsp;
                        <Filter2Icon /> 
                    </span>
                </div>
                <strong>Moderate Adventures</strong> involve a little work to reach the destinations, although can be achieved by most visitors with a basic fitness level. There is no technical knowledge required, and little to none previous experience is needed. Moderate adventures can involve activities such as hiking and cycling.
            </div></>)

            case 3:
            return(<><div className={styles.tourInfoDescriptor}>
                <div className={styles.iconDiffDisp}>
                    <TerrainIcon />
                    <span>
                    <DirectionsWalkIcon />
                    &nbsp; &nbsp;
                    <Filter3Icon /> 
                    </span>
                </div>
                <strong>Moderate - Hard Adventures </strong> require some physical work from participants, have relatively steep ascents, moderately high altitudes and can require of good equipment and basic previous experience. 
            </div></>)

            case 4:
            return(<><div className={styles.tourInfoDescriptor}>
                <div className={styles.iconDiffDisp}>
                    <TerrainIcon />
                    <span>
                        <HikingIcon />
                        &nbsp; &nbsp;
                        <Filter4Icon /> 
                    </span>
                </div>
                <strong>Hard Adventures</strong> include steep ascents, altitudes over 13,000 ft/ 4,000 m, cold temperatures and previous use and knowledge of technical equipment is strongly recommended. Routes have high incline sections and can have exposed climbing in ice, glacier and rock. Good physical condition is needed
            </div></>)

            case 5:
            return(<><div className={styles.tourInfoDescriptor}>
                <div className={styles.iconDiffDisp}>
                    <TerrainIcon />
                    <span>
                        <HikingIcon />
                        &nbsp; &nbsp;
                        <Filter5Icon /> 
                    </span>
                </div>
                <strong>Extreme Adventures</strong> include tough, steep ascents, altitudes over 15,000 ft/ 4,000 m, very cold temperatures and previous high altitude mountaineering and climbing experience is required. Good use of technical equipment, techniques and knowledge is mandatory. Very good physical condition is needed.
            </div></>)
        }
    }

    return(<>
        <span>
            <div className={styles.sectionTitles}> Difficulty</div>
            {tourDiffSwitcher(props)}
        </span>
    </>)
}
////////////////////////////////////////////////
////////////////////////////////////////////////
export function TourTypeCard(props){
    const tourTypeSwitcher=(theTourType)=>{
        switch (theTourType){
            case "360° tours":
            return(<> 
            <div className={styles.tourInfoDescriptor}>
                <strong>360° Tours </strong> begin and end at a specific location, include amazing visitor sites, landscapes, culture and nature, and are created for adventurous travellers looking for a unique experience. 
            </div></>)

            case "historic":
            return(<> 
            <div className={styles.tourInfoDescriptor}>
                <strong>Historic</strong> tours include visits to some of the most important archeological sites of a region, amazing landscapes, and a strong focus on local culture and nature.
            </div></>)

            case "climbing":
            return(<> 
            <div className={styles.tourInfoDescriptor}>
                <strong>Climbing</strong> tours include high altitude mountaneering and trekking sections, professional mountaineering guides and staff, and can include ice climbing; all in the amazing Andes Mountains.
            </div></>)

            case "trekking":
            return(<> 
            <div className={styles.tourInfoDescriptor}>
                <strong>Trekking</strong> tours include multi-day trekking, with comfortable campsites or mountain huts, well trained staff and guides, all in gorgeous sceneries that the high Andes is known for.
            </div></>)
        }
    }

    return(<>
        <span>
            <div className={styles.sectionTitles}> Tour Type</div>
            {tourTypeSwitcher(props)}
        </span>
    </>)
}

let condorMiniLogo = <Image src={EcoAndesLogo} alt="EcoAndes Travel Logo" width={35} height={35} />

export function TourDisplayer(props){

    let aTour = props.aTour

    useEffect(()=>{
        // let sampleObj = {
        //     "key1": "the trip",
        //     "key2": "some other"
        // }
        // let strngifiedObj = JSON.stringify(sampleObj)
        // localStorage.setItem("theTrips", strngifiedObj)
        console.log(window.localStorage, "cucu");
    },[])

    const [imgDialogContr, srtImgDialogcontr]= useState(false)
    const [selectedImg, setSelectedImg]=useState(false)

    const accordionDisplayer=(accordTitle, accordContent, openContr, numerator)=>{
        return(<>
        <Accordion defaultExpanded={openContr} className={styles.accordionCont}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" > 
                <h2>{numerator&&<>{numerator} -</>}  {accordTitle} </h2></AccordionSummary>
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
    const incExcCont = <div className={styles.inclusionsExclusionsSec}> 
        {incExcDisplayer(aTour.included, "Included in Tour")}
        {incExcDisplayer(aTour.notIncluded, "Not included in Tour")} </div>;

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
        const trekDataDisp=(theTrekData)=>{
            if(theTrekData){
                return(<>
                    <div className={styles.dayInclusionCont}>
                    <h4>Daily Trekking Data::</h4>
                        {theTrekData.totalTrekTime&&<>
                            <div className={styles.trekDataCont}> 
                                <div>total Trek time:</div> 
                                {theTrekData.totalTrekTime} 
                            </div>
                        </>}
                        {theTrekData.distanceCovered&&<>
                            <div className={styles.trekDataCont}> 
                                <div>Distance Covered:</div> 
                                {theTrekData.distanceCovered} kms || {theTrekData.distanceCovered * 0.62} mi
                            </div>
                        </>}
                    </div>
                </>)
            }
        }

        let theDays = tourDayByDay.map((elem,i)=> 
        <React.Fragment key={i}>
            <Accordion className={styles.accordionCont}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" > 
                    <h3>{i+1&&<>{i+1}: </>}  {elem.dayTitle} </h3></AccordionSummary>
                <AccordionDetails> 
                    <div style={{textAlign:"justify"}}>
                        {elem.dayDescription}</div>
                    {dayInclDisp(elem.dayInclusions)}
                    {dayNotices(elem)} 
                    {trekDataDisp(elem.trekData)}
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
                    Destinations:&nbsp;{countryList}</div>
                <div className={styles.tourTitleBar}>
                    {aTour.tripName}</div>
                {aTour.startingPlace&& <>
                <div className={styles.startingplace}>
                    Starting from {aTour.startingPlace}</div>
                </>}
                <a className={styles.tourOverview}> 
                    {aTour.tripDescription} </a>
                {aTour.prices.privateDeparture&&<>
                    <div className={styles.bookNowBTN} onClick={()=>props.bookingProcess(1)}>
                    Book Trip <i>Here</i></div> </>}
                <div className={styles.tourDetails}>
                    <span> <AccessTimeIcon /> {aTour.duration} <br/> DAYS </span>
                    <span><ExploreIcon /> TOUR TYPE: <br/> {aTour.tourType} </span>
                    {priceDisplayer(aTour)}
                </div>
            </div>
            {aTour.adventureType&& <> 
            <div className={styles.trekDiffNotice}>
                {aTour.tripName} includes&nbsp;
                {aTour.difficulty&&<i>{difficultyList(aTour.difficulty)}</i>}&nbsp;
                {aTour.adventureType&&<>{aTour.adventureType}</>}
            </div></>}
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
                 {condorMiniLogo}
                <Link href="/tours" >
                    <a>{"->"} &nbsp; itineraries </a>
                </Link>
                    <a>{"->"} &nbsp; {aTour.tripName}</a>
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
    const difficultyList=(diffLevel)=>{
        switch(diffLevel){
            case 1:
            return(<>Easy Adventure!</>)
            case 2:
            return(<>moderate</>)
            case 3:
            return(<>moderate - hard</>)
            case 4:
            return(<>hard</>)
            case 5:
            return(<>extreme</>)
        }
    }

    const tourFooter=()=>{

        return(<>
        <footer>
            <div className={styles.footerBar} >
                {condorMiniLogo} &nbsp; &nbsp; &nbsp;
                {aTour.tripName}
            </div>
            
            <address></address>

        </footer>
        </>)
    }

    return(<>
        <article className={styles.generalTourPage}>
            <div className={styles.tourContainer}>
                {mainImagedisp()}
                {breadcrumbNavigation()}
                {tourIntroDetails()}
                {carouselDisp(aTour.imgArr)} 
            </div>
            <div className={styles.tourDataCont}>
                <div className={styles.tourData}>
                    <div className={styles.sectionTitles}>Overview</div>
                    {dayByDaydisp(aTour.dayByDay)}
                    <div className={styles.sectionTitles}>additional information</div>
                    {accordionDisplayer("Tour Inclusions / Exclusions", incExcCont, false)}
                    {hotelList(aTour)}
                </div>
                <div className={styles.supportInfoCont}>
                    {TourTypeCard(aTour.tourType)}
                    {TourDifficultyCard(aTour.difficulty)}
                </div>
            </div>
        </article>
        {tourFooter()}
    </>)
}