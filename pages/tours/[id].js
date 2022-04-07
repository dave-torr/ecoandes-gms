import React from "react"
import TourData from "../../data/ecuItinEng"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from "../../styles/pages/tourPage.module.css"

function TourPage({ aTour }){

    console.log(aTour)

    const accordionDisplayer=(accordTitle, accordContent, openContr, numerator)=>{
        return(<>
        <Accordion defaultExpanded={openContr}>
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

    return(<>
        <div className={styles.generalTourPage}> 
            <div className={styles.tourContainer}>
            
            {aTour.tripName}
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