import React, {useEffect, useState} from "react"
import Link from 'next/link'
import Image from "next/image"

import TourData from "../../data/ecuItinEng"
import styles from "./../../styles/pages/tours.module.css"

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
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
    const [filteredTourArr, setFilteredTourArr]= useState(TourData)

    useEffect(()=>{

        if(TourData){
            setFilteredTourArr(TourData)
            if(tourTypeFilter){
                let workerTourArr = TourData.filter(elem => elem.tourType===tourTypeFilter)
                setFilteredTourArr(workerTourArr)
            } else if (!tourTypeFilter){
                setFilteredTourArr(TourData)
            }
        }

    },[tourTypeFilter])

    useEffect(()=>{
        if(destFilter){
            let destFiltArr= filteredTourArr.filter((elem) =>  elem.countryList.includes(destFilter)===true  )
            setFilteredTourArr(destFiltArr)
        } else {setFilteredTourArr(TourData)}        
    },[destFilter])




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
                        {tourData.duration} Day Itinerary <br/>
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
            <div className={styles.UIBTNCont}> 
                <div className={styles.userIUFilterCont}>
                    <div className={styles.userUISec}>
                        <label htmlFor="destinationPickerUI">Destination:</label>
                        <select name="destinationPickerUI" className={styles.aPickerUI} 
                            onChange={(e)=>{
                                if(e.target.value==='0'){
                                    setDestFilter(false)
                                } else {setDestFilter(e.target.value)}
                            }}>
                            <option value={0} key={0}>All destinations</option>
                            {eachDestinationOpt}
                        </select>
                    </div>
                    <div className={styles.userUISec}>
                        <label htmlFor="tourTypenPickerUI">Tour type:</label>
                        <select name="tourTypenPickerUI" className={styles.aPickerUI} 
                            onChange={(e)=>{
                                if(e.target.value==='0'){
                                    setTourTypeFilter(false)
                                } else {setTourTypeFilter(e.target.value)}
                            }}>
                            <option value={0} key={0}>All Types</option>
                            {eachTourType}
                        </select>
                    </div>
                </div>
            </div>
        </>)
    }
    const [sortContr, setSortContr]=useState(false)
    const [sortOrder, setSortOrder]=useState("descending")
    const sortingFunct=()=>{
        return(<>
        <div className={styles.sortingUICont}>
            <div style={{display: "flex", alignItems:"center"}}>
                <div className={styles.userSortUISec}>
                    Sort By: 
                </div>
                <select className={styles.sortPicker} onChange={(e)=>{
                    e.target.value==="0"? setSortContr(false) : setSortContr(e.target.value)
                }}>
                    <option value={0} >default</option>
                    <option value="duration">duration</option>
                </select>
            </div>
            {sortContr&&<>
            {sortOrder==="descending"?
                <><div className={styles.orderArrCont}>
                    <div className={styles.checkedArr}>
                        <ArrowUpwardIcon/> &nbsp; Descending Order
                    </div>
                    <div className={styles.unCheckedArr} onClick={()=>{
                        sortOrder==="descending"? setSortOrder("ascending"): setSortOrder("descending")
                    }}>
                        <ArrowDownwardIcon/> &nbsp; Ascending Order
                    </div>
                </div> </>
            :
                <><div className={styles.orderArrCont}>
                    <div className={styles.unCheckedArr} onClick={()=>{
                        sortOrder==="descending"? setSortOrder("ascending"): setSortOrder("descending")
                    }}>
                        <ArrowUpwardIcon/> &nbsp; Descending Order
                    </div>
                    <div className={styles.checkedArr}>
                        <ArrowDownwardIcon/> &nbsp; Ascending Order
                    </div>
                </div> </>}
            </>}
            
        </div>
        </>)
    }
    useEffect(()=>{
        sortOrder==="descending"? 
        setFilteredTourArr([...filteredTourArr].sort((a,b)=> a.duration - b.duration)) 
        :
        setFilteredTourArr([...filteredTourArr].sort(((a,b)=> b.duration - a.duration)))
    },[sortContr])
    useEffect(()=>{
        sortOrder==="descending"? 
        setFilteredTourArr([...filteredTourArr].sort((a,b)=> a.duration - b.duration)) 
        :
        setFilteredTourArr([...filteredTourArr].sort(((a,b)=> b.duration - a.duration)))
    },[sortOrder])


    return(<>
        <div className={styles.generalTourPage}>  
            {filtersUI()}
            {sortingFunct()}
            {tourdisplayer()}

            {/* Page Footer */}
        </div>
    </>)
}

