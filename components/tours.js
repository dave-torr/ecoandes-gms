import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import styles from "./../styles/components/tourCmpnts.module.css"

// export function generalTourDisplayer(props){
// }

export function ATourCard(props){


//  Todo: 
// review look and feel for LTC brand


    let theTour = props.aTour[0]
    console.log(theTour)

    const aMapFunction=(theArray)=>{
        let eachArrayItem=theArray.map((elem, i)=><React.Fragment key={i}>
            {i>0 &&<> | </>}{elem} 
        </React.Fragment>)
        return(<>{eachArrayItem}</>)
    }

    return(<>
    <div className={styles.tourCardCont}>
        <div className={styles.tourCardImage}>
            <Image 
                src={"https://dsm01pap002files.storage.live.com/y4mmdRtxsqwrE9QkPjWuZfWoaMEbnh-cYr7VY0b0oOSus6PCZOwWkVzn2bRlhfC-dyEbMdsRfOLB3yQggEWhCItazuS8zITKLtxRpb9Tn-AeaRyCAITlWcyNHlR1dNCWpxTIIm_0UZdYLwe6ppZ8_o9cVRMarzbFEFfejX0qfup9qzaW16l9wtQ0-DW3KWk-V0A?width=2000&height=1125&cropmode=none"}
                width={320}
                height={180}
                alt={"test"}
            />
        </div>

        <div className={styles.tourCardTextCont}>
            <div className={styles.tourCardDestinations} > 
            {aMapFunction(theTour.countryList)} </div>
            <div className={styles.tourCardTripName}> {theTour.tripName} </div>
            <div > {theTour.duration} Day Itinerary </div>
            <div className={styles.tourCardCTA}> see experience </div>
        </div>

    </div>
    </>)
}