import React from "react"
import Image from "next/image"

import TourData from "../../data/ecuItinEng"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material';



import styles from "../../styles/pages/aTour.module.css"


function TourPage({ aTour }){

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

    const tourOverview = <div className={styles.tourOverviewCont}> {aTour.tripDescription} </div>

    const incExcDisplayer=(itemList, controller)=>{
        let eachItem = itemList.map((elem, i)=><React.Fragment key={i}> <li className={styles.incExcItems}>{elem}</li></React.Fragment> )
        return(<>
            <div className={styles.incExcCont}> 
                <h3> {controller} </h3>
                <ul> {eachItem} </ul>
            </div>
        </>)
    }
    const incExcCont= <div className={styles.inclusionsExclusionsSec}> 
        {incExcDisplayer(aTour.included, "Included in Tour")}
        {incExcDisplayer(aTour.notIncluded, "Not included in Tour")}
        </div>;

    const dayByDaydisp=(tourDayByDay)=>{
        let theDays = tourDayByDay.map((elem,i)=> <React.Fragment key={i} >
            {accordionDisplayer(elem.dayTitle, elem.dayDescription, false, i+1)}
        </React.Fragment>)
        return(<>
            {accordionDisplayer("Day by Day", theDays, false)}
        </>)
    }

    function Imagedisp(props){
        // console.log(props.imgData)
        return(<>
        <Paper className={styles.carouIMG}><div className={styles.homeSliderIMG}>
            <Image
                src={`/assets/images/tourCovers/${props.imgData}`}
                alt={aTour.tripName}      
                width={2000}
                height={1500}
            />
        </div>
        <div className={styles.desktopIMGCaption}>{props.imgData.alt}</div>
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

    const tourIntroDetails=()=>{
        let countryList = aTour.countryList.map((elem, i)=><React.Fragment key={i}>
            { i >0 &&<> / </>} <i>{elem}</i>
        </React.Fragment>)
        return(<>
            <div className={styles.tourIntroCont}>
                <div className={styles.tourCountryList}> <strong>Countries:</strong> {countryList}</div>
                <div className={styles.tourTitleBar}>{aTour.tripName}</div>
                <div className={styles.tourDetails}>
                    Tour Detail Grid
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