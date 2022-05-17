import React from "react"
import Image from "next/image"

import TourData from "../../data/itineraries"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material';



import styles from "../../styles/pages/aTour.module.css"

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// itinerary updates:

// // Program descriptions are too long, change for "itinerary Highlights"
//  // image carousel, opens up image pop up dialog.


////////////////////////////////////////////////////////////



function TourPage({ aTour }){

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

    function Imagedisp(props){
        return(<>
        <Paper className={styles.carouIMG}><div className={styles.homeSliderIMG}>
            <Image
                src={props.imgData}
                alt={aTour.tripName}      
                width={2000}
                height={1500}
            />
        </div>
        </Paper>
        </>)
    }

    const carouselDisp=(theIMGArr)=>{
        return(<>
        <div className={styles.tourIMGCarousel}>
            <Carousel>
                {theIMGArr.map((elem, i)=>
                <Imagedisp key={i} imgData={elem} /> )}
            </Carousel>
        </div>
        </>)
    }

    const priceDisplayer=(theTour)=>{
        
        if(theTour.prices.priceType==="private"){
            // display last elem of price arr
            return(<>
                <span> PRIVATE <br/> DEPARTURE </span>
                <span> PRICES FROM <br/> ${theTour.prices['4stars'][9]} p. person </span>
            </>)
        } else if(theTour.prices.priceType==="fixedDeparture"){
            // display fixed dep price
            return(<>
                <span> FIXED <br/> DEPARTURE </span>
                <span> PRICES FROM <br/> ${theTour.prices.pricePerPerson} p. person </span>
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
                    <span>{aTour.duration} <br/> DAYS </span>
                    <span> TOUR TYPE: <br/> {aTour.tourType} </span>
                    {priceDisplayer(aTour)}
                </div>
            </div>
        </>)
    }





    return(<>
        <div className={styles.generalTourPage}>
            {carouselDisp(aTour.imgArr)} 
            {tourIntroDetails()}
            <div className={styles.tourContainer}>
                {accordionDisplayer("Overview", tourOverview, true)}
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