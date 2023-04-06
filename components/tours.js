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
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MapIcon from '@mui/icons-material/Map';
import HikingIcon from '@mui/icons-material/Hiking';
import TerrainIcon from '@mui/icons-material/Terrain';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


import PlaceIcon from '@mui/icons-material/Place';

import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';

import LTCTypeface from "./../public/assets/logos/LTCTypeface.png"

import Dialog from '@mui/material/Dialog';

// ///////////////////
    // v. ++: 
    // Save Local Likes!!!

    // useEffect(()=>{
        // let sampleObj = {
        //     "key1": "the trip",
        //     "key2": "some other"
        // }
        // let strngifiedObj = JSON.stringify(sampleObj)
        // localStorage.setItem("theTrips", strngifiedObj)
    // },[])
// ///////////////////


export function ATourCard(props){

    let theTour = props.aTour

    return(<>
    <Link href={`/tours/${theTour.id}`}>
        <a className={styles.tourCardCont} >
            
            <div className={styles.tourCardImageMobile}>
                <Image 
                    src={theTour.imgArr[0]}
                    width={430}
                    height={240}
                    alt={`A tour image: ${theTour.tripName}`}
                    blurDataURL={theTour.imgArr[0]}
                    placeholder="blur"
                />
            </div>

            <div className={styles.tourCardTextCont}>
                <div className={styles.difficultyDispCont}> 
                    Difficulty: {theTour.difficulty}/5 </div>
                <span>
                    {theTour.startingPlace? <>
                    <div className={styles.tourStartingPlace} > 
                         from {theTour.startingPlace} </div>
                    </>: <>
                        <div className={styles.tourStartingPlace}/>
                    </>}
                    <div className={styles.tourCardTripName}> {theTour.tripName} </div>
                    <div> {theTour.duration} day itinerary &nbsp;  | &nbsp; {theTour.tourType} </div>
                </span>
                <div className={styles.tourCardCTA}> see experience </div>
            </div>
        </a>
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
                <strong>Easy Adventures</strong> require minimal prior knowledge and no technical skills. We enjoy our activities in stages and at a relaxed pace, with enough time to enjoy the views and arrive at the destinations. Can be achieved by anyone with regular physical conditions.
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
                    <span>
                        <TerrainIcon />
                    </span>
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
                    <span>
                        <TerrainIcon />
                    </span>
                    <span>
                        <HikingIcon />
                        &nbsp; &nbsp;
                        <Filter4Icon /> 
                    </span>
                </div>
                <strong>Hard Adventures</strong> include steep ascents, altitudes over 13,000 ft || 4,000 m, cold temperatures and previous use and knowledge of technical equipment is strongly recommended. Routes have high incline sections and can have exposed climbing in ice, glacier and rock. Good physical condition is needed
            </div></>)

            case 5:
            return(<><div className={styles.tourInfoDescriptor}>
                <div className={styles.iconDiffDisp}>
                    <span>
                        <TerrainIcon />
                    </span>
                    <span>
                        <HikingIcon />
                        &nbsp; &nbsp;
                        <Filter5Icon /> 
                    </span>
                </div>
                <strong>Extreme Adventures</strong> include tough, steep ascents, altitudes over 15,000 ft || 4,000 m, very cold temperatures and previous high altitude mountaineering and climbing experience is required. Good use of technical equipment, techniques and knowledge is mandatory. Very good physical condition is needed.
            </div></>)
        }
    }
    let prsdInt = parseInt(props)
    return(<>
        <span>
            <div className={styles.sectionTitles}> Difficulty</div>
            {tourDiffSwitcher(prsdInt)}
        </span>
    </>)
}
////////////////////////////////////////////////
////////////////////////////////////////////////
export function TourTypeCard(props){
    const tourTypeSwitcher=(theTourType)=>{
        switch (theTourType){
            case "360° itineraries":
            return(<> 
            <div className={styles.tourInfoDescriptor}>
                <strong>360° Tours </strong> begin and end at a specific location, include amazing visitor sites, landscapes, culture and nature, and are created for adventurous travellers looking for a unique experience. 
            </div></>)

            case "historic":
            return(<> 
            <div className={styles.tourInfoDescriptor}>
                <strong>Historic</strong> itineraries include visits to some of the most important archeological sites of a region, breathtaking landscapes, and a strong focus on the rich local cultures and the incredible planet that we live in.
            </div></>)



// Check to see if we can add nature category. Find different name. add nature-focused itineraries

            case "nature":
            return(<> 
            <div className={styles.tourInfoDescriptor}>
                <strong>Nature-focused</strong> itineraries have wildlife and nature as front and center. Our focus is to explore the wild places and amazing landscapes that this beautiful world has to offer.
            </div></>)

            case "climbing":
            return(<> 
            <div className={styles.tourInfoDescriptor}>
                <strong>Climbing</strong> itineraries include trekking sections to base camps and high altitude mountaneering, with the support of professional mountaineering guides and staff, and can include rock, ice, and mixed climbing; all in the amazing Andes Mountains.
            </div></>)

            case "trekking":
            return(<> 
            <div className={styles.tourInfoDescriptor}>
                <strong>Trekking</strong> itineraries include multi-day trekking in some of the world's most impressive landscapes, with best-in-class, quality campsites or mountain huts, handpicked, professional staff and guides; surrounded by the gorgeous sceneries that the high Andes is known for.
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
////////////////////////////////////////////////
////////////////////////////////////////////////



export function TourDisplayer(props){
    let aTour = props.aTour

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
        {aTour.included.length>0&&<> 
            {incExcDisplayer(aTour.included, "Included in Tour")} </>}
        {aTour.notIncluded.length>0&&<>
            {incExcDisplayer(aTour.notIncluded, "Not included in Tour")} </>}
            </div>

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
        const hotelDetailDisp=(overnightProperty)=>{
            if(overnightProperty){
                return(<><div className={styles.dayInclusionCont}> 
                    <h4>Overnight property:</h4>
                    <ul>{overnightProperty}</ul>
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
                    {hotelDetailDisp(elem.overnightProperty)}
                    {dayNotices(elem)} 
                    {trekDataDisp(elem.trekData)}
                </AccordionDetails>
            </Accordion>
        </React.Fragment>)

        return(<>
            {accordionDisplayer("Day by Day", theDays, true)}
            <br/>

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
                blurDataURL={props.imgData}
                placeholder="blur"                
            />
        </div>
        </>)
    }
    const carouselDisp=(theIMGArr)=>{
        if (theIMGArr.length>0)return(<>
        <div className={styles.carouselSection}>

            <div className={styles.tourIMGCarousel}>
                    {theIMGArr.map((elem, i)=><>
                    {i>0&&<React.Fragment key={i}>
                        <Imagedisp imgData={elem} /> 
                    </React.Fragment>}
                    </>)}
            </div>
            <div className={styles.sliderV2}> <PanToolAltIcon fontSize="large" /> </div>
            <div> BROWSE GALLERY </div>
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
                            width={1800}
                            height={1125}
                            blurDataURL={selectedImg.src}
                            placeholder="blur" 
                        />

                        <h3>{selectedImg.alt}</h3>
                    </>}
                </div>
            </div>
        </Dialog>
        </>)
    }
    const aTourIconDisp=()=>{
        const anIconRow=(theIcon, theIconName, theIconContent)=>{
            // Check if you can add some SEO to this section to be easily indexed and understood by crawlers
            return(<>
                <div className={styles.iconCont}>
                    <div>{theIcon} &nbsp; &nbsp; </div>
                    <div> 
                        <strong>{theIconName}</strong>
                        <div className={styles.iconContent}>{theIconContent}</div>
                    </div>
                </div>
            </>)
        }

        let daysContent=<>{aTour.duration} days</>
        let priceContent=<>${aTour.price} p. person</>

        return(<>
            <div className={styles.tourDetails}>
                {aTour.duration&&<>{anIconRow(<AccessTimeIcon />, "duration:", daysContent)}</>}
                {aTour.tourType&&<>{anIconRow(<ExploreIcon />, "tour type:", aTour.tourType )}</>}

                {aTour.prices&&<>
                    {aTour.prices.priceType==="fixedDeparture"&&<>
                        {anIconRow(<EventIcon />, "departure type:", "Scheduled" )}
                        {anIconRow(<LocalOfferIcon />, "prices from:", priceContent )}
                    </>}
                    {aTour.prices.priceType==="privateDeparture"&&<>
                        {anIconRow(<EventIcon />, "departure type:", "private" )}
                    </>}
                </>}

            </div>
        </>)
    }
    const tourTitle=()=>{
        let countryList = aTour.countryList.map((elem, i)=><React.Fragment key={i}> { i >0 &&<> / </>}{elem} </React.Fragment>)
        return(<>
            {props.partnerLogo&&<>
                <div className={styles.partnerLogo}>
                {props.partnerLogo} </div> 
            </>}
            <div className={styles.tourTitleCard}>
                <h1 className={styles.tourTitleBar}>
                    {aTour.tripName}{aTour.duration&&<> | {aTour.duration} Days</>}</h1>
                <div className={styles.tourCountryList}>
                    {aTour.countryList.length>0&&<>
                    <PlaceIcon /> &nbsp;{countryList}</>}</div> 
            </div>
        </>)
    }
    const tourIntroDetails=()=>{
        return(<>
            <div className={styles.tourIntroCont}>

                {aTour.startingPlace&& <>
                <div className={styles.startingplace}>
                    Starting from {aTour.startingPlace}</div>
                </>}
                <p className={styles.tourOverview}> 
                    {aTour.tourOverview} </p>

{/* Include We Travel Widget BTN || CONTACT US BTN for Private Departures */}
                {!props.partnerLogo&&<>
                
                {aTour.tourType==="climbing"&&<>
                    <a href={`mailto:info@ecoandestravel.com?cc=planificacion@ecoandestravel.com, david@latintravelcollection.com&subject=${aTour.tripName} Request&body=Hi! I'm interested in ${aTour.tripName} for the following dates/season:`}>
                    <div className={styles.contactNowBTN}>
                        Contact Us About {aTour.tripName} </div></a>
                    </>}
                </>}

                {/* INCORPORATE WIDGET FROM WE TRAVEL IN VER 2.0 */}

                {aTour.weTravelURL&&<>

                    {/* export as separate function CALL TO ACTIONS CTAs  */}
                    {/* With widget, which is NON OP, Make further test with Dulce and team, embedded is always better. */}


                    {/* <button className="wtrvl-checkout_button" id="wetravel_button_widget" data-env="https://www.wetravel.com" data-version="v0.3" data-uid="476590" data-uuid={aTour.paymentLink} href={`https://www.wetravel.com/checkout_embed?uuid=${aTour.paymentLink}`} 
                    style={{border: "solid 2px var(--pop-orange)", color:"var(--pop-orange)", backgroundColor:"white", borderRadius: "5px", textTransform: "uppercase", fontWeight: "800", fontSize: "14px", webkitFontSmoothing: "antialiased", padding: "13px 24px", textDecoration: "none", textAlign: "center", lineHeight: "14px", display: "inline-block", cursor: "pointer"}} >
                    
                        Book Now</button> <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet"/> <script src="https://cdn.wetravel.com/widgets/embed_checkout.js"></script> */}


                <div className={styles.aTourCTACont}> 
                    <a href={aTour.weTravelURL} target="_blank" rel="noopener noreferrer">
                    <div className={styles.contactNowBTN}>
                        Book {aTour.tripName} experience</div></a>

                    {/* whatsAppCTA */}
                    <a target='_blank' href="https://wa.me/593979469989"> <div className={styles.secondaryCTABTN}> 
                        <WhatsAppIcon/> </div>
                    </a>
                    {/* eMailCTA */}
                    <a href={`mailto:info@ecoandestravel.com?cc=planificacion@ecoandestravel.com, david@latintravelcollection.com&subject=${aTour.tripName} Request&body=Hi, Im interested in ${aTour.tripName} for the following dates/season:`}><div className={styles.secondaryCTABTN}> 
                        <MailOutlineIcon/> </div>
                    </a>
                </div>
                </>}


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
        if (aTour.imgArr.length>0) return(<>
            <div className={styles.mainImgDisplayer}>
                <Image
                    src={aTour.imgArr[0]}
                    height={1125}
                    width={2000}
                    alt="a Tour Image"
                    blurDataURL={aTour.imgArr[0]}
                    placeholder="blur" 
                />
            </div>
        </>)
    }
    const breadcrumbNavigation=()=>{
        if(props.breadcrumb){
        return(<>
            <div className={styles.breadcrumbNaviCont}>
                <Image src={LTCTypeface} alt="LTC Travel Logo" width={55} height={30} />
                <Link href="/tours" >
                    <a>{"->"} &nbsp; itineraries </a>
                </Link>
                    <span>{"->"} &nbsp; {aTour.tripName}</span>
            </div>
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
            <Link href="/tours"><a>
                <div className={styles.footerBar} >
                    <Image src={LTCTypeface} alt="LTC Travel Logo" width={55} height={30} /> &nbsp; &nbsp; &nbsp;
                    {aTour.tripName}
                </div>
                </a>
            </Link>
            
            <address></address>

        </footer>
        </>)
    }

    return(<>
        <article className={styles.generalTourPage}>
            <div className={styles.tourContainer}>
                {tourTitle()}
                {mainImagedisp()}
                {aTourIconDisp()}
                {breadcrumbNavigation()}
                {tourIntroDetails()}
                {carouselDisp(aTour.imgArr)} 
            </div>
            <div className={styles.tourDataCont}>
                <div className={styles.tourData}>
                    {aTour.dayByDay.length>0&&<>
                    <div className={styles.sectionTitles}> &nbsp;Overview</div>
                        {dayByDaydisp(aTour.dayByDay)}</>}
                    {aTour.included.length>0&&<>
                    <div className={styles.sectionTitles}>&nbsp;additional information</div>
                        {accordionDisplayer("Tour Inclusions / Exclusions", incExcCont, false)}
                        {hotelList(aTour)}</>}
                </div>
                {aTour.tourType&&<>
                    <div className={styles.supportInfoCont}>
                        {TourTypeCard(aTour.tourType)}
                        {TourDifficultyCard(aTour.difficulty)}
                    </div>
                </>}
            </div>
        </article>
        {tourFooter()}
    </>)
}
////////////////////////////////////////////////
////////////////////////////////////////////////
export function SquaredTourCard(props){
    if(props.tripName){
    return(<>

        <Link href={`/tours/${props.id}`}>  
        
        <div className={styles.aSquaredCont} style={{ cursor:"pointer" }}> 
            <Image 
                src={props.imgSrc}
                width={500}
                height={500}
                alt={`${props.tripName}, by L.T.C.`}
                blurDataURL={props.imgSrc}
                placeholder="blur"                
            />
            <div className={styles.highlightTourTitle}>
                {props.tripName} 
                </div>
        </div>
        
        </Link>
    </>)
    }
}
////////////////////////////////////////////////
////////////////////////////////////////////////
export function RectangularTourCard(props){
    if(props.tripName){
    return(<>

        <Link href={`/tours/${props.id}`}>  
        
        <div className={styles.aRectangCont} style={{ cursor:"pointer" }}> 
            <Image 
                src={props.imgSrc}
                height={1125}
                width={2000}
                alt={`${props.tripName}, by L.T.C.`}
                blurDataURL={props.imgSrc}
                placeholder="blur"                
            />
            <div className={styles.highlightTourTitle}>
                {props.tripName} 
            </div>
        </div>
        
        </Link>
    </>)
    } else return(<> cu cu </>)
}