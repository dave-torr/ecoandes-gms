import React, {useEffect, useState} from "react"
import Image from "next/image"

import TourData from "../../data/LTCItinerary"
import styles from "./../../styles/pages/tours.module.css"

import tourPageIMGLadning from "./../../public/assets/images/bookingLanding1.png"
import LTCTypeface from "./../../public/assets/logos/LTCTypeface.png"

import {LTCNaviBar} from "./../../components/navis"
import {ATourCard, SquaredTourCard, RectangularTourCard, SortingItinUI } from "./../../components/tours"

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { MultiSelect, Select } from '@mantine/core';


import Head from "next/head"


// CORRECT ITIN MOFOOO
let AmazonJungleSpotlight =     {
        "tripName": "Amazon Jungle Spotlight",
        "id": "amazon-jungle-7D",
        "duration": 7,
        "difficulty": 1,
        "imgArr": ["https://dsm04pap002files.storage.live.com/y4mErBtxz6hHX1NjMtG7cwvUNDdiC-wM9-I4xL0z3AIbynCbs4LRAoZwBfBpMW8AQ5BbZorvCRLhDKz5paPT1sDrx2BzlfKaa8vsaxX1V3Km4bOVWN07y4PPMYvpO9ZznWdVWINVrX8q-AGYlj3BQ9BRUxFbZchOak4x5M047NxyIIecgcFUuaJ-u7lEmWC_rGq?width=2000&height=1150&cropmode=none",
        "https://dsm04pap002files.storage.live.com/y4muo6e3ghMUuh8ubftWrZLkXXB-nIp707rpDQzIQcqySBoIYIn86urIQpnGdDjyiDc0LHuNrLq-tgcYGpfcfNHeqc4VscM63lbQmKEAaP2lURzx-JSdEaXzyI0Wpe_ktva6pEmBDa5NMHYIlYJCyHVGP307t7rswlRESoVZhB51EMO3mpTQkkNad0bliL1DCLw?width=2000&height=1150&cropmode=none",
        "https://dsm04pap002files.storage.live.com/y4me4ZvGKY-wIWIM6WiV9cnFv7H6cL15Y0eevmkw4Z3qphry0wVUIr8P1NxYkAsfKsY6kgZPiZ8gXZYgs36pNi_ZFv_-_-HNoT5F_xIme65a8Zps3hcPDZPW0oxvMa9UYNqIlf1BfeP42P0bJ75-YO0UOWTiPcqVo9XG8Lqmu3QriHlGYiDvlltxyDaNbiEnQlR?width=2000&height=1150&cropmode=none",
        "https://dsm04pap002files.storage.live.com/y4m2sWwYbvTyOK2Ybef8FvxZwY-GqeVvWLA9_TlzaNN2UdGrsXZGdNuY6QiYYdAmIXqbZYZKi3W0xE3OSknO2fiTcYrmm1ctA-KmxF6vEvCpsbjxN9rlA1sMgccY9QUDQA1LDPuOZhT5gqJxmzZGGXnngF4du92yzeF6HQl7WSyuq1okwvyD_Q5IZ8haS2h4MEO?width=2000&height=1150&cropmode=none",
        "https://dsm04pap002files.storage.live.com/y4mle51wOkVGuzBLw3y5vNUUcJZrVV5N2HixVv-A4tBM35-OzBkkqtSiMoCSnTK_krhh3GUTVmLoUn6wdahGl3GRS98NtcPwj4FFhN2unW70j9M03OGXH7glzxFHGSw9D7RoZ0ZHJ_aJk7buq0oHKAKf3DlB43YKhnXL-Hwwe93MjsmcfLbvCVzD2S9WMy-vpTD?width=2000&height=1150&cropmode=none",
        "https://dsm04pap002files.storage.live.com/y4mNaOZUNbhnNFgM3yMQDlbHefOIu-Iujp6Aukqi1Z1LHb5WRK52d2F6iHWXuIeAqTyr1Pjn2QBXSEbGO9ypmFJwaI4j0koEyaXuv3x10Wst3PeCtnukiRK5aCDodf8d3WbRv5iYP1hS9wZYrDEypsUs0Ti6QsGyvZpBgfklPEVBOQgzaS_KzC0Fyeo4lmFRNnD?width=2000&height=1150&cropmode=none",
        "https://dsm04pap002files.storage.live.com/y4mWJCVpV8XifmRhCjBzDkET3_t1VvIo0ID2-nx1loi9V5sfHojYuZvBDPiulj198bLUzUGuOdNvPVQhT5CwWWRCBrzv4w23flM1dtgjMPbLGP40WG77iCSGIK8Dt-noQqruwQ6TjJF4hnMFT3Pt9FylzDQUHuesut1Q6qTTxcCqPAHM8f-G3E8KqVMdGd6ZYSM?width=2000&height=1150&cropmode=none",
        "https://dsm04pap002files.storage.live.com/y4mC_Z4HE0UsCJ9g0ipxRbmUVgLwnYM-e2fVz2WIytOp7PxDbBh-ZcvDSLffnUwz2SdDc3pD6grSWhh1SpOb2Hxa8itdJtzQNoqmdyP8lXGl0l6poVwiXE6_dFI1I9Y8hiR57rkJdarpG2ZP2qpYauf6jDskz6PVxfda7vFubF8ctdW24KkLaK0tiqIG187-8WW?width=2000&height=1150&cropmode=none"

        ],
        "sqrImg":"https://dsm04pap002files.storage.live.com/y4mLHpICHI0_0-oHMe9lamzU-jzDUCU6AHJc8G8qRpwaXJ1qHyQnOndP3lX4aJniagyPDEMqyB7Sm3_twj9CrB-dXaOjYzpj0aZVLTxY_YiDl6Vw4mxwp-r3MDeoSzx_FDo624YoH-dCffMjlaiEHB7crrSrsGPk_hLot9Blx_3n-RaUBwyTomuWASi6ueo80RG?width=1000&height=1000&cropmode=none",
        "horizImg":"https://dsm04pap002files.storage.live.com/y4mBXTa5domV7j2IA9CxavganRpUi4Syi0gRs5uwS5gJXzMdMYnUsg30-_ImJSHzGeilww4YvsClCG_eXCGJwYQioo5E11-tT2-zijCPPWCjItkETNoiRJMaFjpT6-C8VvqHjuVnt1O9_TRFzIWAyjHgt7lSb5mlQdlJeNYOmXQMmG8cKEg3uYl2MTZPHXU5KpS?width=1000&height=500&cropmode=none",
        "tourOverview":"The Amazon Jungle is known as the 'Lungs of the Earth', due to the sheer abundance of vegetable life that breathes oxigen back into the atmosphere. Explore the incredible abundance of life in the midst of the most biodiverse place on planet Earth. This 7 day voyage takes you to Yacuma EcoLodge and Rainforest Reserve, a sustainability-focused project with over 240 species of birds, over 40 species of amphibians and reptiles, all within a private 270 hectare protected reserve of the upper Amazon Basin. ",
        "countryList": ["ecuador", "amazon"],
        "dayByDay":[
            {
                "dayTitle": "Thursday: Arrival in Quito",
                "dayDescription": "Upon your arrival in Quito, you will be welcomed and transferred to your hotel of choice. You will have a short briefing about next day activities",
                "dayInclusions": [
                    "Private Transfers",
                    "English speaking Guide Services"
                ]
            },
            {
                "dayTitle": "Quito - Galapagos",
                "dayDescription": "After breakfast we will head to the airport to take our regional flight to the Galapagos Islands. We will begin our 8 day Yacht Catamaran Anahi Itinerary throught eh fabulous Galapagos Islands. Upon arriving to Galapagos we will begin our Daily yacht activities, with our porffessional Galapagos Naturalist guide and crew in the highlands of Santa Cruz. ",
                "dayInclusions": [
                    "Hotel breakfast & Highland ranch lunch",
                    "Private Transfers",
                    "Entrance Fees",
                    "flight to the Galapagos Islands",
                    "Galapagos National Park Guide services",
                    "onboard dinner"
                ]
            },          
            {
                "dayTitle": "Isabela Island",
                "dayDescription": " DAY 2 Cruise               ",
                "dayInclusions": [
                    "onboard breakfast, lunch and dinner",
                    "Galapagos National Park Guide services"
                ]
            },
            {
                "dayTitle": "Day 3 Cruise",
                "dayDescription": "Day 3 Cruise",
                "dayInclusions": [
                    "Hotel breakfast",
                    "Private Transfers",
                    "Entrance Fees",
                    "flight to the Galapagos Islands",
                    "Lunch",
                    "English speaking Guide Services"
                    
                ]
            },
            {
                "dayTitle": "Day 4 Cruise",
                "dayDescription": "Day 4 cruise",
                "dayInclusions": [
                    "hotel breakfast",
                    "Lunch",
                    "Galapagos National Park Guide services",
                    "Private Transfers"
                ]
            },
            {
                "dayTitle": "Day 5 cruise",
                "dayDescription": "sssss",
                "dayInclusions": [
                    "Hotel breakfast",
                    "Galapagos National Park Guide services"
                ]
            },
            {
                "dayTitle": "Day 6 cruise",
                "dayDescription": "day 6 cruise",
                "dayInclusions": [
                    "Hotel breakfast, lunch and dinner",
                    "navigation onboard Galapagos Elements Wind yacht",
                    "Galapagos National Park Guide services"
                ]
            },
            {
                "dayTitle": "Day 7 cruise",
                "dayDescription": "day 7 cruise",
                "dayInclusions": [
                    "Galapagos National Park Guide services"
                ]
            },
            {
                "dayTitle": "Final cruise day",
                "dayDescription": "final cruise day",
                "dayInclusions": [
                    "Galapagos National Park Guide services"
                ]
            },
            {
                "dayTitle": "Otavalo tour - Airport transfer",
                "dayDescription": "Otavalo Indigenous Market - Irport Transfer",
                "dayInclusions": [
                    "hotel breakfast",
                    "Entrance Fees",
                    "Private Transportation",
                    "English speaking Guide Services"
                ]
            }
        ],
        "tourType": "nature",
        "price": 900,
        "paymentLink":"59021713",
        "weTravelURL": "https://www.wetravel.com/trips/amazon-jungle-spotlight-latin-travel-collection-tena-59021713",
        "prices": {
            "priceType": "fixedDeparture",
            "singlesupp": 310,
            "dblOccupancy": true,
            "priceNotice": "hotel categories will depend on locally available properties",
            "departureDates":"Every Saturday"
        },
        "included": [
            "noted meals",
            "entrance fees",
            "noted transfers and transfers",
            "4 Day Yacuma EcoLodge Bromelia Package",
            "hotels: double room accommodation with private facilities",
            "english/spanish speaking guide services"
        ],
        "notIncluded": [
            "personal travel insurance (REQUIRED)",
            "personal expenses",
            "extras",
            "tips"
        ]
    }



    
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
    const [fullscreenCont, setFullscreenCont]=useState(false)

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


    // console.log(TourData)

    const tourHighlightDisp=(aTrip)=>{
        if(TourData){
        return(<>
            <div> 
                <div className={styles.tourHighlightCont}> 
                    <div className={styles.tourHighlightBar}>Experience South America </div>
                    <div className={styles.highlightCont}>
                        
                        <SquaredTourCard tripName={TourData[13].tripName} imgSrc={TourData[13].sqrImg} id={TourData[13].id}/>

                        <SquaredTourCard tripName={TourData[16].tripName} imgSrc={TourData[16].sqrImg} id={TourData[16].id}/>

                    </div>

                    {/* WTF with positions on text */}

                    <div className={styles.highlightCont2}> 
                        <RectangularTourCard tripName={TourData[12].tripName} imgSrc={TourData[12].imgArr[0]} id={TourData[12].id}/>
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

            <LTCNaviBar />

            <div className={styles.logoCont}>
            <Image
                src={LTCTypeface}
                alt="EcoAndes Condor Logo"
                blurDataURL={LTCTypeface}
                placeholder="blur"
                width={200}
                height={100}
            /></div>



            {tourPageImgDisplayer()}

            {tourHighlightDisp()}

            {filtersUI()}

            <div className={styles.sortingUICont}>
            <SortingItinUI 
                    sortContr={sortContr} 
                    setSortContr={setSortContr}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                /></div>

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

