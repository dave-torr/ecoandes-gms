import React, {useEffect, useState} from "react"
import Link from 'next/link'
import Image from "next/image"

import TourData from "../../data/ecuItinEng"
import styles from "./../../styles/pages/tourPage.module.css"


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

let ecoAndesDestinations= ['ecuador', 'peru', 'bolivia', 'chile', 'argentina']

export default function TourPage(props){

    const [tourArr, setTourArr]=useState([...props.TourData])
    const [tourFilter, setTourFilter]= useState(' ')

    useEffect(()=>{
        console.log(tourArr)
    },[])



    const aMapFunction=(theArray)=>{
        let eachArrayItem=theArray.map((elem, i)=><React.Fragment key={i}>
            {i>0 &&<> | </>}{elem} 
        </React.Fragment>)
        return(<>{eachArrayItem}</>)
    }

    const tourdisplayer=()=>{

        // const priceFilter=()=>{
        //     let lowestPrice = "hey hey"
        //     return(<></>)
        // }

        const eachTourCard = ()=>{
            return(<>
                {props.TourData.map((elem, i)=>
                <React.Fragment key={i}>
                    <Link href={`/tours/${elem.id}`}> 
                        <div className={styles.aTourCard}>
                            <div className={styles.eachTourDetails}>
                                <div className={styles.tourtype}>
                                    {elem.tourType}
                                </div>
                                <div className={styles.tourCardDestination}>
                                    {aMapFunction(elem.countryList)}
                                </div>
                                <h3>{elem.tripName}</h3>
                            </div>

                            <div className={styles.tourImg}>
                                <Image 
                                    src={`/assets/images/tourCovers/${elem.imgArr[0]}`}
                                    width={250}
                                    height={180}
                                    alt="IMG"
                                />
                            </div>

                            <div className={styles.durationPriceDisp}>
                                {elem.duration} Day Itinerary <br/>
                                from usd $ 699 .- per person
                            </div>
                        </div>
                    </Link>
                </React.Fragment>)}
            </>)
        }

        return(<>
            <div className={styles.tourCardContainer}>
                {eachTourCard()}
            </div>
        </>)
    }

    return(<>
        <div> Tour Page</div>

        <div> TOUR FILTER </div>

        {tourdisplayer()}

        {/* Page Footer */}

    </>)
}

export async function getStaticProps(context) {
  return {
    props: {TourData}
  }
} 