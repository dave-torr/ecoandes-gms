import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import styles from "./../styles/components/tourCmpnts.module.css"

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