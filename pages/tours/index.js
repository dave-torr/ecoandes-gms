import React, {useEffect, useState} from "react"
import Link from 'next/link'
import Image from "next/image"

import TourData from "../../data/itineraries"
import styles from "./../../styles/pages/tours.module.css"

import {EcoAndesBar, Navi2} from "./../../components/navis"
import {ATourCard} from "./../../components/tours"

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { MultiSelect, Select } from '@mantine/core';
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


    // const priceDisplayer=(priceObj)=>{
    //     if(priceObj.priceType==="fixedDeparture"){
    //         return(<>from usd ${priceObj.pricePerPerson}.- per person</>)
    //     } else {
    //         return (<>from usd ${priceObj['4stars'][9]}.- per person</>)
    //     }
    // }


let tourTypes = ["all types", "active", "cruise", "expedition", "voyage"]

let ecoAndesDestinations= ['ecuador', 'galapagos', 'peru', 'bolivia', 'chile', 'argentina']

export default function TourPage(){

    const [destFilter, setDestFilter]= useState(0)
    const [tourTypeFilter, setTourTypeFilter]= useState(0)
    const [filteredTourArr, setFilteredTourArr]= useState(TourData)

    useEffect(()=>{
            if(tourTypeFilter){
                if (tourTypeFilter==="all types"){
                    setFilteredTourArr(TourData)
                } else {
                    let workerTourArr = TourData.filter(elem => elem.tourType===tourTypeFilter)
                    setFilteredTourArr(workerTourArr)
                }
            } else if (!tourTypeFilter){
                setFilteredTourArr(TourData)
            }

    },[tourTypeFilter])

    useEffect(()=>{
        if(destFilter){
            let destFiltArr= TourData.filter((elem) =>  elem.countryList.includes(destFilter)===true  )
            setFilteredTourArr(destFiltArr)
        } else {setFilteredTourArr(TourData)}        
    },[destFilter])


    const tourdisplayer=()=>{
        return(
        <div className={styles.tourCardContainer}>
            {filteredTourArr.length > 0 ?<>
                {filteredTourArr.map((elem,i)=>
                    <React.Fragment key ={i}>
                        {<ATourCard 
                            aTour={elem}
                        />}
                    </React.Fragment>)}
            </>:<>
                <div className="={styles.placeholderCont"> 
                    Oops! We do not have any scheduled trips available for your filters. 
                    get in contact with oue of our team members to make your dream trip happen!
                    <div className={styles.placeholderCTA}> Email our team! </div>
                </div>
            </>}
        </div>)
    }


    const [destPickerList, setDestList] = useState()

    const filtersUI=()=>{
        return(<>
            <div className={styles.UIBTNCont}> 
                <div className={styles.userIUFilterCont}>

                    {/* Destinations filter */}
                    <div className={styles.userUISec}>
                        <label htmlFor="destinationPickerUI">Destination:</label>
                        <MultiSelect
                            // className={styles.aPickerUI} 
                            placeholder="Our Destinations"
                            data={[...ecoAndesDestinations]}
                            searchable
                            nothingFound="Nothing found..."
                            onChange={setDestList}
                            id="destinationPickerUI"
                        />
                    </div>

                    {/* Tour Types Filter */}
                    <div className={styles.userUISec}>
                        <label htmlFor="tourTypenPickerUI">Tour type:</label>
                        <Select 
                            placeholder="Tour Types"
                            data={[...tourTypes]}
                            onChange={setTourTypeFilter}
                            id="tourTypenPickerUI"
                        />
                    </div>
                </div>
            </div>
        </>)
    }

    useEffect(()=>{
        console.log(destPickerList)
    },[destPickerList])

    // Sort Functions
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
        // add conditional if selectedDestination => sort by all tourData, else by filtered tour data.
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

            <EcoAndesBar />
            <Navi2 />
            {filtersUI()}
            {sortingFunct()}
            {tourdisplayer()}

            {/* Page Footer */}
        </div>
    </>)
}

