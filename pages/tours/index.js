import React, {useEffect, useState} from "react"
import Link from 'next/link'
import Image from "next/image"

import TourData from "../../data/peruItineraries"
import styles from "./../../styles/pages/tours.module.css"

import {EcoAndesBar, Navi2} from "./../../components/navis"
import {ATourCard} from "./../../components/tours"

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { MultiSelect, Select } from '@mantine/core';
import Head from "next/head"
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

// ARRANGE BY
//  OP:
//  // A - Z
//  // number of days
//  ver. 2
//  // price
//  // departure date?


    // const priceDisplayer=(priceObj)=>{
    //     if(priceObj.priceType==="fixedDeparture"){
    //         return(<>from usd ${priceObj.pricePerPerson}.- per person</>)
    //     } else {
    //         return (<>from usd ${priceObj['4stars'][9]}.- per person</>)
    //     }
    // }


let tourTypes = ["all types", "cultural", "expedition", "climb", "trek", ]

let ecoAndesDestinations= ['ecuador', 'galapagos', 'peru', 'bolivia', 'chile', 'argentina']

export default function TourPage(){

    const [tourTypeFilter, setTourTypeFilter]= useState(0)
    const [filteredTourArr, setFilteredTourArr]= useState(TourData)
    const [destinationList, setDestList] = useState([])

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
        let tempTourArr =[]
        if (destinationList.length>0){
            destinationList.forEach(elem=>{
                let tempArr = TourData.filter(tour=>{
                    return tour.countryList.includes(elem)
                })
                tempTourArr= [...tempArr]
            })
            setFilteredTourArr(tempTourArr) 
        } else {
            setFilteredTourArr(TourData) 
        }
    },[destinationList])


    const tourdisplayer=()=>{
        if(filteredTourArr){
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
        </div>)}
    }


    const filtersUI=()=>{
        return(<>
            <div className={styles.UIBTNCont}> 
                <div className={styles.userIUFilterCont}>

                    {/* Destinations filter
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
                    </div> */}

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
                    {sortingFunct()}
                </div>
            </div>
        </>)
    }

    ///////////////////////////////////////////////
    // Sort Functions
    const [sortContr, setSortContr]=useState("duration")
    const [sortOrder, setSortOrder]=useState("descending")
    const sortingFunct=()=>{
        return(<>
        <div className={styles.sortingUICont}>
            {/* <div style={{display: "flex", alignItems:"center"}}>
                <div className={styles.userSortUISec}>
                    Sort By: 
                </div>
                <select className={styles.sortPicker} onChange={(e)=>{
                    setSortContr(e.target.value)
                }}>
                    <option value="duration" >duration</option>
                    <option value="alphabetical">a-z</option>
                </select>
            </div> */}

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


    const tourPageImgDisplayer=()=>{

        return(<>
        <div className={styles.tourPageIMGSection}>
            <div className={styles.introArrowIcon}> <ArrowDownwardIcon fontSize="large"/> </div>
            <div className={styles.tourPageImageCont}>
                <Image 
                    src={"https://dsm04pap002files.storage.live.com/y4mraxRR-eTxGebe-wotrpyPVPzpomguzQCGNnzXpCEw64H7BO5GMIR7J4HucAhb6Iu4aprpXuBX-LRGZOsAhlDVPBKdaTKyM2o72EZxO6aEztN-uX7Ktv_IPNtNOhcRGQcv9f-oLLjJ8siz_tZhU5EsxIxlJoanjJkcsob-TxEXq3em45ohf1bwStlIRndkEu7?width=2000&height=1346&cropmode=none"}
                    alt="Huayhuash: A Trek Through the Peruvian Andes"
                    width={2000}
                    height={1346}
                />
            </div>
        </div>
        </>)
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//Head
  const pageHead=()=>{
    return(<>
    <Head>
      <title>Our Tours: EcoAndes Adventures</title>
      <meta name="description" content="Our advnetures and voyages in Peru - EcoAndes Adventures: since 1989" />
      <meta charSet="utf-8"/>
      <meta name="keywords" content="Peru, Machu Picchu Tours, Cusco Tours, Huaraz, Huaraz Tours"/>
      <meta name="author" content="David Torres" />
      <meta name="copyright" content="EcoAndes Travel 2022" />
    </Head>
    </>)
  }






    return(<>
    {pageHead()}
        <div className={styles.generalTourPage}>  

            <EcoAndesBar />
            <Navi2 />
            {tourPageImgDisplayer()}
            {filtersUI()}
            {tourdisplayer()}

            {/* Page Footer */}
        </div>
    </>)
}

