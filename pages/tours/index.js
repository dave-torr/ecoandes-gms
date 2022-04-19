import React, {useEffect, useState} from "react"
import Link from 'next/link'
import Image from "next/image"

import TourData from "../../data/ecuItinEng"
import styles from "./../../styles/pages/tours.module.css"


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

//  TOUR DISPLAYER IN ECOANDES TRAVEL TRIPS LANDING.

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// VER. 1: 
// FILTERS AND ORDERS HARD CODED ITINERARIES AVIL @ "./DATA"
// COUNTRY BANNERS WITH A TOP PICK AND VIEW MORE OPTION.

// VER 2: 
// 

// DYNAMICALLY CHANGING TOURS BY: 
//  // MOST LIKED
//  // BEST SELLERS
//  // COUNTRY HIGHLIGHTS



/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//  FFM => general To Do's
// Creating a wishlist:
//  // Click on item heart => access local storage, create wishlistArray, add item's nameAnd[index] 
// // additional items, pushed into a new arr, replaced in local storage
/////////////////////////////////////////////////////////////////


// FILTERS:
//  // Country
//  // Tour Type
//  // Category

// AARRANGE BY
//  // price
//  // departure date?
//  // number of days


let tourTypes = ["active", "family", "cruise", "expedition", "private", "voyage"]

let ecoAndesDestinations= ['ecuador', 'galapagos', 'peru', 'bolivia', 'chile', 'argentina']

export default function TourPage(){

    const [destFilter, setDestFilter]= useState(0)
    const [tourTypeFilter, setTourTypeFilter]= useState(0)
    const [filteredTourArr, setFilteredTourAtt]= useState(TourData)

    useEffect(()=>{
        // console.log(tourArr, "tourArr @ tour/index")
        if(TourData){
            setFilteredTourAtt(TourData)
            if(tourTypeFilter){
                let workerTourArr = TourData.filter(elem => elem.tourType===tourTypeFilter)
                setFilteredTourAtt(workerTourArr)
            } else if (!tourTypeFilter){
                setFilteredTourAtt(TourData)
            }
        }
    },[tourTypeFilter])


console.log(tourTypeFilter)
console.log(destFilter)

// FLAGGED FOR EXPORT
    const aMapFunction=(theArray)=>{
        let eachArrayItem=theArray.map((elem, i)=><React.Fragment key={i}>
            {i>0 &&<> | </>}{elem} 
        </React.Fragment>)
        return(<>{eachArrayItem}</>)
    }
// FFExp
    const eachTourCard = (tourData)=>{
        return(<>
            <Link href={`/tours/${tourData.id}`}> 
                <div className={styles.aTourCard}>
                    <div className={styles.eachTourDetails}>
                        <div className={styles.tourtype}>
                            {tourData.tourType}
                        </div>
                        <div className={styles.tourCardDestination}>
                            {aMapFunction(tourData.countryList)}
                        </div>
                        <h3>{tourData.tripName}</h3>
                    </div>
                    <div className={styles.tourImg}>
                        <Image 
                            src={`/assets/images/tourCovers/${tourData.imgArr[0]}`}
                            width={250}
                            height={180}
                            alt="IMG"
                        />
                    </div>
                    <div className={styles.durationPriceDisp}>
                        {TourData.duration} Day Itinerary <br/>
                        from usd $ 699 .- per person
                    </div>
                </div>
            </Link>
        </>)
    }
    const tourdisplayer=()=>{
        return(
        <div className={styles.tourCardContainer}>
            {filteredTourArr.length > 0 ?<>
                {filteredTourArr.map((elem,i)=>
                    <React.Fragment key ={i}>
                        {eachTourCard(elem)}
                    </React.Fragment>)}
            </>:<>
                PLACEHOLDER
            </>}
        </div>)
    }
    const filtersUI=()=>{
        // switcher to turn on "all countries"
        // switcher to turn on "all ecoAndesDestinations"
        let eachDestinationOpt = ecoAndesDestinations.map((elem, i)=><React.Fragment key={i}><option value={elem}>{elem}</option></React.Fragment>)
        let eachTourType = tourTypes.map((elem, i)=><React.Fragment key={i +1}><option value={elem}>{elem}</option></React.Fragment>)
        return(<>
            <div className={styles.userIUFilterCont}>
                <div className={styles.userUISec}>
                    <label htmlFor="destinationPickerUI">Filter By:</label>
                    <select name="destinationPickerUI" className={styles.aPickerUI} onChange={(e)=>{setDestFilter(e.target.value)}}>
                        <option value={0} key={0}>Destination</option>
                        {eachDestinationOpt}
                    </select>
                </div>
                <div className={styles.userUISec}>
                    <label htmlFor="tourTypenPickerUI">Order By:</label>
                    <select name="tourTypenPickerUI" className={styles.aPickerUI} onChange={(e)=>setTourTypeFilter(e.target.value)}>
                        <option value={0} key={0}>Tour Type</option>
                        {eachTourType}
                    </select>
                </div>
            </div>
        </>)
    }

    return(<>
        <div className={styles.generalTourPage}> 
            {filtersUI()}
            {tourdisplayer()}

            {/* Page Footer */}
        </div>
    </>)
}

