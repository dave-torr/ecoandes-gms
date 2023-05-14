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
import ForestIcon from '@mui/icons-material/Forest';
import StadiumIcon from '@mui/icons-material/Stadium';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import PlaceIcon from '@mui/icons-material/Place';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';

import CircularProgress from '@mui/material/CircularProgress';


import LTCTypeface from "./../public/assets/logos/LTCTypeface.png"
import LTCLogoBLK from "./../public/assets/logos/ecoAndesBLK.png"
import GalapagosElementsLogo from "./../public/assets/logos/galapagosElementsLogo.png"
import YacumaLogo from "./../public/assets/logos/yacuma.png"
import UnigpsLogo from "./../public/assets/logos/unigalapagos.png"

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

export function TextTourCard(props){
    let theTour = props.aTour

    if(props.type===1) {
        return(<>
        <Link href={`/tours/${theTour.id}`}>
            <a className={styles.textTourCard} >
                <div style={{width: "100%", display:"flex", justifyContent:"space-between", alignContent: "center"}}>
                    <div style={{textTransform:"capitalize", display:"flex", justifyContent:"center" }}> 
                    <PlaceIcon/> {theTour.countryList[0]}
                    </div>
                
                    <div style={{textTransform:"capitalize", display:"flex", justifyContent:"center" }}> 
                    <HikingIcon /> {theTour.difficulty}/5 
                    </div>
                </div>
                    <div className={styles.tourCardTripName}> {theTour.tripName} </div>
                    <div> {theTour.duration}D | {theTour.tourType} </div>
            </a>
        </Link>
    </>)
    } else if(props.type===2) {
        return(<>
        {theTour.user?.name&&<> 
        <div className={styles.userNameTag}> {theTour.user?.name.substring(0, theTour.user?.name.indexOf(' '))}</div>
        </>}
        <div className={styles.textTourCard} onClick={()=>{
            props.setItin(theTour)
            props.setDialogTrigger(true)
        }}>
            <div style={{width: "100%", display:"flex", justifyContent:"space-between", alignContent: "center"}}>
                <div style={{textTransform:"capitalize", display:"flex", justifyContent:"center" }}> 
                <PlaceIcon/> {theTour.countryList[0]}
                </div>
            
                <div style={{textTransform:"capitalize", display:"flex", justifyContent:"center" }}> 
                <HikingIcon /> {theTour.difficulty}/5 
                </div>
            </div>
                <div className={styles.tourCardTripName}> {theTour.tripName} </div>
                <div> {theTour.duration}D | {theTour.tourType} </div>
        </div>
    </>)
    }
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
                <div className={styles.iconDiffDisp}>  
                <WhereToVoteIcon/> </div>
                <strong>360° Tours </strong> begin and end at a specific location, include amazing visitor sites, landscapes, culture and nature, and are created for adventurous travellers looking for a unique experience. 
            </div></>)

            case "historic":
            return(<> 
            <div className={styles.tourInfoDescriptor}>
                <div className={styles.iconDiffDisp}> <StadiumIcon /> </div>
                <strong>Historic</strong> itineraries include visits to some of the most important archeological sites of a region, breathtaking landscapes, and a strong focus on the rich local cultures and the incredible planet that we live in.
            </div></>)

// Check to see if we can add nature category. Find different name. add nature-focused itineraries

            case "nature":
            return(<> 
            <div className={styles.tourInfoDescriptor}>
                <div className={styles.iconDiffDisp}> <ForestIcon /> </div>
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

    const [imgDialogContr, srtImgDialogcontr]=useState(false)
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
    const dayByDaydisp=(tourDayByDay, openContr)=>{
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
            <Accordion className={styles.accordionCont} defaultExpanded={openContr}>
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
        if (theIMGArr.length>1)return(<>
        <div className={styles.carouselSection}>

            <div className={styles.tourIMGCarousel}>
                    {theIMGArr.map((elem, i)=><>
                    {i>0&&<React.Fragment key={i}>
                        <Imagedisp imgData={elem} /> 
                    </React.Fragment>}
                    </>)}
            </div>
            <div className={styles.sliderV2}> 
            <PanToolAltIcon fontSize="large" /></div>
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
        let partnerLogo;
        if(aTour.LTCLogo==="ecoAndes"){
            partnerLogo=<div className={styles.partnerLogoCont}>
                <Image height={45} width={180} src={LTCLogoBLK} alt="EcoAndes Travel Logo" /></div>
        } else if(aTour.LTCLogo==="galapagosElements"){
            partnerLogo=<div style={{display: "flex", justifyContent:"center", paddingTop: "27px"}} >
                <Image height={80} width={210} src={GalapagosElementsLogo} alt="Galapagos Elements Logo" /></div>
        } else if(aTour.LTCLogo=="yacuma"){
            partnerLogo=<div className={styles.partnerLogoCont}>
                <Image height={55} width={210} src={YacumaLogo} alt="Yacuma Logo" /></div>
        } else if(aTour.LTCLogo=="unigalapagos"){
            partnerLogo=<div className={styles.partnerLogoCont}>
                <Image height={75} width={110} src={UnigpsLogo} alt="Unigalapagos Logo" /></div>
        } else if(!aTour.LTCLogo){
            partnerLogo=false
        }        

        let countryList = aTour.countryList.map((elem, i)=><React.Fragment key={i}> { i >0 &&<> / </>}{elem} </React.Fragment>)

        return(<>
            {aTour.LTCLogo&&<>
                <div className={styles.partnerLogo}>
                {partnerLogo} </div> 
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
                {!aTour.LTCLogo&&<>
                
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
                {accordionDisplayer("Hotel List", hotelListAndNotice, true)}
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
        <footer  style={{width: "100%"}} >
            <div className={styles.footerBar} >
            <Link href="/tours"><a>
                    <Image src={LTCTypeface} alt="LTC Travel Logo" width={55} height={30} />
                    <span>{aTour.tripName}</span> 
            </a></Link>
            </div>
        </footer>
        </>)
    }

    return(<>

    {/* update dropdown triggers so that on print, all DD are open. */}


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

                    <div className={styles.pageBreak}></div>

                    <div className={styles.sectionTitles}> &nbsp;Overview</div>
                        {dayByDaydisp(aTour.dayByDay, true)}</>}
                    {aTour.included.length>0&&<>
                    <div className={styles.pageBreak}></div>
                    <div className={styles.sectionTitles}>&nbsp;additional information</div>
                        {accordionDisplayer("Tour Inclusions / Exclusions", incExcCont, true)}
                        {hotelList(aTour)}</>}
                </div>
                {aTour.tourType&&<>
                    <div className={styles.supportInfoCont}>
                        {TourTypeCard(aTour.tourType)}
                        {TourDifficultyCard(aTour.difficulty)}
                    </div>
                </>}
            </div>
        {tourFooter()}
        </article>
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

export function SortingItinUI(props){
    // const [sortContr, setSortContr]=useState("duration")
    // const [props.sortOrder, setSortOrder]=useState("ascending")

    return(<>
        <div className={styles.sortingUICont}>
            <div className={styles.sortBTNCont}>
                Sort By: 
                <span>
                {props.sortContr==="duration"&&<>
                    <div className={styles.sortOptionBTN} onClick={()=>{
                        props.setSortContr("duration")
                        }} ><AccessTimeIcon/></div>
                    {props.priceSortTrigger&& <>
                    <div className={styles.sortOptionBTNOffline} onClick={()=>{
                        props.setSortContr("price")
                        }} ><PriceCheckIcon/></div></>}
                    <div className={styles.sortOptionBTNOffline} onClick={()=>{
                        props.setSortContr("difficulty")
                        }} ><SportsGymnasticsIcon/></div>
                </>}
                {props.sortContr==="price"&&<>
                    <div className={styles.sortOptionBTNOffline} onClick={()=>{
                        props.setSortContr("duration")
                        }} ><AccessTimeIcon/></div>
                    {props.priceSortTrigger&& <> 
                    <div className={styles.sortOptionBTN} onClick={()=>{
                        props.setSortContr("price")
                        }} ><PriceCheckIcon/></div></>}
                    <div className={styles.sortOptionBTNOffline} onClick={()=>{
                        props.setSortContr("difficulty")
                        }} ><SportsGymnasticsIcon/></div>
                </>}
                {props.sortContr==="difficulty"&&<>
                    <div className={styles.sortOptionBTNOffline} onClick={()=>{
                        props.setSortContr("duration")
                        }} ><AccessTimeIcon/></div>
                    {props.priceSortTrigger&& <> 
                    <div className={styles.sortOptionBTNOffline} onClick={()=>{
                        props.setSortContr("price")
                        }} ><PriceCheckIcon/></div></>}
                    <div className={styles.sortOptionBTN} onClick={()=>{
                        props.setSortContr("difficulty")
                        }} ><SportsGymnasticsIcon/></div>
                </>}
                </span>

            </div>

            <div className={styles.orderBTNCont}>
                <div className={styles.sortContrDispl}>
                    {props.sortContr}:</div>
                {props.sortOrder==="descending"?<>
                <span>
                    <div className={styles.selectedOrderDisp}>
                        <ArrowUpwardIcon/>
                    </div>
                    <div className={styles.unselectedOrderDisp} onClick={()=>{
                        props.sortOrder==="descending"? props.setSortOrder("ascending"): props.setSortOrder("descending")
                    }}>
                        <ArrowDownwardIcon/>
                    </div>
                </span>
                </>:<>
                <span>
                    <div className={styles.unselectedOrderDisp} onClick={()=>{
                        props.sortOrder==="descending"? props.setSortOrder("ascending"): props.setSortOrder("descending")
                    }}>
                        <ArrowUpwardIcon/>
                    </div>
                    <div className={styles.selectedOrderDisp}>
                        <ArrowDownwardIcon/>
                    </div>
                </span>
                </>}
            </div> 
        </div>
    </>)    
}
////////////////////////////////////////////////
////////////////////////////////////////////////
export function ItinDuplicator(props){

    const [loadingTrig, setLoadingTrig]=useState(false)
    const [loadingStateStyle, setLoadingStyle]=useState(styles.tourCopyBTNS)

    return(<>
        <Dialog open={props.dialogTrig}>
            <div className={styles.userUIDialogCont}>
                <h2> Copy {props.aTour?.tripName}? </h2>
                <h4> <strong>Renamed to:</strong> COPY {props.aTour?.tripName} </h4>

                <div className={loadingStateStyle} >
                    <span onClick={()=>{if(!loadingTrig){props.setDialogTrig(false)}}}> 
                        Cancel</span> 
                    <span onClick={async()=>{
                        setLoadingTrig(true)
                        setLoadingStyle(styles.tourCopyBTNSOFFLINE)
                        if(!loadingTrig){
                            let toDate = new Date()
                            let tripName= `COPY ${props.aTour.tripName}`
                    
                            delete props.aTour._id
                            let reqData = JSON.stringify({
                                ...props.aTour,
                                "dateCreated":toDate,
                                "tripName": tripName,
                                "version": 0,
                                "status": 1,
                                "user": {
                                    "name": props.userData.name,
                                    "email": props.userData.email
                                    }
                            })
                            const res = await fetch("/api/gms/itineraries", {
                                    method: "POST",
                                    body: reqData
                                })
                            const itinSubmition = await res.json()
                            console.log(itinSubmition)
                            if(res.status===200){
                                window.alert("Itinerary Created! Taking you to Tour Explorer")
                                location.reload()
                            }
                            }
                        }}>
                       Copy!
                    </span>
                </div>

                {loadingTrig&& <>
                <div className={styles.loadingSpinner}>
                    <CircularProgress /></div></>}
            </div>
        </Dialog>
    </>)
}
////////////////////////////////////////////////
////////////////////////////////////////////////
export function ItinDeletor(props){

    const [loadingTrig, setLoadingTrig]=useState(false)
    const [loadingStateStyle, setLoadingStyle]=useState(styles.tourCopyBTNS)

    return(<>
        <Dialog open={props.dialogTrig}>
            <div className={styles.userUIDialogCont}>
                <h2> Delete '{props.aTour?.tripName}'? </h2> <br/>
                <div className={loadingStateStyle}>
                    <span onClick={()=>{if(!loadingTrig){props.setDialogTrig(false)}}}> 
                        Cancel</span> 
                    <span onClick={async()=>{
                        setLoadingTrig(true)
                        setLoadingStyle(styles.tourCopyBTNSOFFLINE)
                        if(!loadingTrig){                    
                            let backendPackage= { 
                                "aTour": props.aTour,  
                                "dbCommand": "DELETE"
                                }
                            let reqData = JSON.stringify( backendPackage )
                            const res = await fetch("/api/gms/itineraries", {
                                    method: "DELETE",
                                    body: reqData
                                })
                            const itinDeletion = await res.json()
                            console.log(itinDeletion, "Deletion")
                            if(res.status===200){
                                window.alert("Itinerary Deleted! Taking you to Tour Explorer")
                                location.reload()
                            }
                            }
                        }}>
                       Delete!
                    </span>
                </div>
                {loadingTrig&& <>
                <div className={styles.loadingSpinner}>
                    <CircularProgress /></div></>}
            </div>
        </Dialog>
    </>)
}
////////////////////////////////////////////////
////////////////////////////////////////////////

export function ItinDataDisp(props){
    return(<>
        <Dialog open={props.dialogTrig} onClose={()=>props.setDialogTrig(false) }>
            <div className={styles.userUIDialogCont}>
                <h2> <strong>Supplemental Data for:</strong>  <br/> '{props.aTour?.tripName}': </h2> <br/>
            
                {props.aTour?.tripRef&& <> 
                    <div className={styles.suppDataCont} > 
                        <h5> Trip Reference: </h5> {props.aTour?.tripRef}
                    </div>
                </>}
                {props.aTour?.tripLang&& <> 
                    <div className={styles.suppDataCont} > 
                        <h5> Trip Language: </h5> {props.aTour?.tripLang}
                    </div>
                </>}
                {props.aTour?.tourCode&& <> 
                    <div className={styles.suppDataCont} > 
                        <h5> Trip Code: </h5> {props.aTour?.tourCode}
                    </div>
                </>}
                {props.aTour?.compContact&& <> 
                    <div className={styles.suppDataCont} > 
                        <h5> Company Contact: </h5> {props.aTour?.compContact}
                    </div>
                </>}

            </div>
        </Dialog>
    </>)
}

export function ItinEditor(props){

    const [loadingTrig, setLoadingTrig]=useState(false)
    const [loadingStateStyle, setLoadingStyle]=useState(styles.tourCopyBTNS)

    const [editItinStep, setEditStep]= useState(0)
    const [editObjTemplate, setEditTemplate]=useState({})

    const editItinUserBtns=( editObj )=>{
        if(editItinStep>0){
        return(<>
            <div className={loadingStateStyle}>
                <span onClick={()=>{if(!loadingTrig){props.setDialogTrig(false)}}}> 
                    Cancel</span> 
                <span onClick={async()=>{
                    setLoadingTrig(true)
                    setLoadingStyle(styles.tourCopyBTNSOFFLINE)
                    if(!loadingTrig){                    
                        let backendPackage= { 
                            "aTour": props.aTour,  
                            "dbCommand": "edit"
                            // add edit object
                            }
                        let reqData = JSON.stringify( backendPackage )
                        const res = await fetch("/api/gms/itineraries", {
                                method: "DELETE",
                                body: reqData
                            })
                        const itinDeletion = await res.json()
                        console.log(itinDeletion, "Deletion")
                        if(res.status===200){
                            window.alert("Itinerary Deleted! Taking you to Tour Explorer")
                            location.reload()
                        }
                        }
                    }}>
                    Delete!
                </span>
            </div>
        </>)
        } 
    }

    const editTourSelect=(theStep)=>{

    }

    return(<>
        <Dialog open={props.dialogTrig} onClose={()=>props.setDialogTrig(false) }>
            <div className={styles.userUIDialogCont}>
                <h2> Edit '{props.aTour?.tripName}': </h2> <br/>
                {loadingTrig&& <>

                {editItinUserBtns()}

                <div className={styles.loadingSpinner}>
                    <CircularProgress /></div></>}
            </div>
        </Dialog>
    </>)
}