import React, {useEffect, useState} from "react"
import Image from "next/image"

import TourData from "../../data/peruItineraries"
import styles from "./../../styles/pages/tours.module.css"

import tourPageIMGLadning from "./../../public/assets/images/bookingLanding1.png"

import {EcoAndesBar, Navi2} from "./../../components/navis"
import {ATourCard, SquaredTourCard} from "./../../components/tours"

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';

import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

import PriceCheckIcon from '@mui/icons-material/PriceCheck';
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

// FILTER:
//  // Tour Type
//  // destination

// ARRANGE BY
//  OP:
//  // A - Z
//  // number of days
//  // price

//  ver. 2
//  // departure date?



let tourTypes = ["all types", "historic", "nature", "360° itineraries", "climbing", "trekking" ]

let operationRegions= ['galapagos', "patagonia", 'amazon', 'peru', "chile", "argentina", 'ecuador', ]


export default function TourPage(){

    const [tourTypeFilter, setTourTypeFilter]= useState(0)
    const [filteredTourArr, setFilteredTourArr]= useState(TourData)
    const [destinationList, setDestList] = useState([])

    // work around filters:
    // currently destination filter works. if dest, filter by destination, else, filter all tours.
    // add filter reset BTN


    useEffect(()=>{
            if(tourTypeFilter){
                if (tourTypeFilter==="all types"){
                    setFilteredTourArr(TourData)
                } else {
                    let workerTourArr = filteredTourArr.filter(elem => elem.tourType===tourTypeFilter)
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
                <div className={styles.emptySearchResult}> 
                    Oops! <br/>We do not have any scheduled trips available for your filters. 
                    Get in contact with one of our team members to make your dream trip happen!
                    <br />
                    <br />
                    <a href="mailto:info@ecoandestravel.com?cc=planificacion@ecoandestravel.com, david@latintravelcollection.com"> <div className={styles.placeholderCTA}> Email our team </div></a>
                </div>
            </>}
        </div>)}
    }
    const filtersUI=()=>{
        return(<>
            <div className={styles.UIBTNCont}> 
                <div className={styles.userIUFilterCont}>
                    <div className={styles.userUISec}>
                        <label htmlFor="destinationPickerUI">Destination:</label>
                        <MultiSelect
                            // className={styles.aPickerUI} 
                            placeholder="Our Destinations"
                            data={[...operationRegions]}
                            // searchable
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


    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // Sort Functions
    const [sortContr, setSortContr]=useState("duration")
    const [sortOrder, setSortOrder]=useState("ascending")
    const [fullscreenCont, setFullscreenCont]=useState(false)

    const sortingUI=()=>{
        return(<>
        <div className={styles.sortingUICont}>

            <div className={styles.sortBTNCont}>
                Sort By: 
                <span>
                {sortContr==="duration"&&<>
                    <div className={styles.sortOptionBTN} onClick={()=>{
                        setSortContr("duration")
                        }} ><AccessTimeIcon/></div>
                    <div className={styles.sortOptionBTNOffline} onClick={()=>{
                        setSortContr("price")
                        }} ><PriceCheckIcon/></div>
                    <div className={styles.sortOptionBTNOffline} onClick={()=>{
                        setSortContr("difficulty")
                        }} ><SportsGymnasticsIcon/></div>
                </>}
                {sortContr==="price"&&<>
                    <div className={styles.sortOptionBTNOffline} onClick={()=>{
                        setSortContr("duration")
                        }} ><AccessTimeIcon/></div>
                    <div className={styles.sortOptionBTN} onClick={()=>{
                        setSortContr("price")
                        }} ><PriceCheckIcon/></div>
                    <div className={styles.sortOptionBTNOffline} onClick={()=>{
                        setSortContr("difficulty")
                        }} ><SportsGymnasticsIcon/></div>
                </>}
                {sortContr==="difficulty"&&<>
                    <div className={styles.sortOptionBTNOffline} onClick={()=>{
                        setSortContr("duration")
                        }} ><AccessTimeIcon/></div>
                    <div className={styles.sortOptionBTNOffline} onClick={()=>{
                        setSortContr("price")
                        }} ><PriceCheckIcon/></div>
                    <div className={styles.sortOptionBTN} onClick={()=>{
                        setSortContr("difficulty")
                        }} ><SportsGymnasticsIcon/></div>
                </>}
                </span>

            </div>

            <div className={styles.orderBTNCont}>
                <div className={styles.sortContrDispl}>
                    {sortContr}:</div>
                {sortOrder==="descending"?<>
                <span>
                    <div className={styles.selectedOrderDisp}>
                        <ArrowUpwardIcon/>
                    </div>
                    <div className={styles.unselectedOrderDisp} onClick={()=>{
                        sortOrder==="descending"? setSortOrder("ascending"): setSortOrder("descending")
                    }}>
                        <ArrowDownwardIcon/>
                    </div>
                </span>
                </>:<>
                <span>
                    <div className={styles.unselectedOrderDisp} onClick={()=>{
                        sortOrder==="descending"? setSortOrder("ascending"): setSortOrder("descending")
                    }}>
                        <ArrowUpwardIcon/>
                    </div>
                    <div className={styles.selectedOrderDisp}>
                        <ArrowDownwardIcon/>
                    </div>
                </span>
                </>}
            </div> 

        </div>
        </>)
    }

    useEffect(()=>{
        // add conditional if selectedDestination => sort by all tourData, else by filtered tour data.
        sortOrder==="descending"? 
            setFilteredTourArr([...filteredTourArr].sort((a,b)=> a[sortContr] - b[sortContr])) 
        :
            setFilteredTourArr([...filteredTourArr].sort(((a,b)=> b[sortContr] - a[sortContr])))
    },[sortContr])

    useEffect(()=>{
        sortOrder==="descending"? 
            setFilteredTourArr([...filteredTourArr].sort((a,b)=> a[sortContr] - b[sortContr])) 
        :
            setFilteredTourArr([...filteredTourArr].sort(((a,b)=> b[sortContr] - a[sortContr])))
    },[sortOrder])
    const tourPageImgDisplayer=()=>{
        return(<>
        <div className={styles.tourPageIMGSection}>
            <div className={styles.introTextIcon}> Adventure <br/>Awaits</div>
            <div className={styles.introArrowIcon}> <ArrowDownwardIcon fontSize="large"/> </div>
            <div className={styles.tourPageImageCont}>
                <Image 
                    src={tourPageIMGLadning}
                    alt="Huayhuash: A Trek Through the Peruvian Andes"
                    priority
                />
            </div>
        </div>
        </>)
    }
    const tourHighlightDisp=(aTrip)=>{
        if(TourData){
        return(<>
            <div> 
                <div className={styles.tourHighlightCont}> 
                    <div className={styles.tourHighlightBar}>Experience South America </div>
                    <div className={styles.sqrHighlightCont}>
                        
                        <SquaredTourCard tripName={TourData[13].tripName} imgSrc={TourData[13].sqrImg} id={TourData[13].id}/>

                        <SquaredTourCard tripName={TourData[16].tripName} imgSrc={TourData[16].sqrImg} id={TourData[16].id}/>

                    </div>
                </div>
            </div>
        </>)
        }
    }


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//Head
  const pageHead=()=>{
    return(<>
    <Head>
        <meta charSet="utf-8"/>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://ecoandes-gms.vercel.app/tours" />
        <meta property="article:published_time" content="2023-02-02T20:11:11+00:00" />


        <title>Our Tours: Latin Travel Collection</title>
        <meta property="og:title" content="Our Tours: Latin Travel Collection" />
        <meta property="og:site_name" content="Our Tours: Latin Travel Collection" />

        <meta name="description" content="Our adventures and voyages in South America - Latin Travel Collection: since 1989" />
        <meta property="og:description" content="Our adventures and voyages in South America - Latin Travel Collection: since 1989" />
        
        
        <meta name="keywords" content="Peru, Machu Picchu Tours, Cusco Tours, Huaraz, Huaraz Tours, Patagonia, Galapagos, Island Hopping"/>
        <meta name="author" content="David Torres" />
        <meta name="copyright" content="LTC 2023" />

        <meta property="og:image" content="https://dsm04pap002files.storage.live.com/y4mGJNJCASdS5QyLlVsQTJntNsVYtug7sgwOPDjSI1e75oqV6UOL10A315xC2hU5xmEvMt7CUnx7hATlr0BTFNC9fGwgPMjUt5zU3Irn-Z3vp6pAMzzw6h6N-OqkAAKixDb6J8TSCzh4GVU_-9-m3R1EB9A24Q9nT8NZfDx_yMTjyqJMj2SSILP1hT3We_dsEBB?width=2000&height=1150&cropmode=none" />
        <meta property="og:image:width" content="1000" />
        <meta property="og:image:height" content="575" />
        <meta property="og:image:type" content="image/jpg" /> 
    </Head>
    </>)
  }


    return(<>
    {pageHead()}
        <div className={styles.generalTourPage}>  

            <EcoAndesBar />
            <Navi2 />
            {tourPageImgDisplayer()}

            {tourHighlightDisp()}

            {filtersUI()}
            {sortingUI()}
            {tourdisplayer()}

            {/* Page Footer */}
            {fullscreenCont?<>
                <div className={styles.fullscreenBTNS} onClick={()=>{
                    document.exitFullscreen()
                    setFullscreenCont(false)
                }}> <CloseFullscreenIcon /> </div>
            </>:<>
                <div className={styles.fullscreenBTNS} onClick={()=>{
                    var elem = document.documentElement
                    elem.requestFullscreen()
                    setFullscreenCont(true)
                }}> <OpenInFullIcon /> </div>
            </>}
        </div>
    </>)
}

