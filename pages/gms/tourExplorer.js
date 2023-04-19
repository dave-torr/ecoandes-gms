import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react"

import { GMSNavii } from "../../components/navis";

import {TextTourCard, SortingItinUI} from "../../components/tours"

import LTCItineraries from "../../data/LTCItinerary.json"
import LTCGenData from "../../data/dataAndTemplates.json"

import ExploreIcon from '@mui/icons-material/Explore';
import CircularProgress from '@mui/material/CircularProgress';


import styles from "../../styles/pages/tourExplorar.module.css"




////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

export default function TourExplorerPage(props){

// sesh
const { data: session } = useSession()


    let tourType = ["active", "family", "cruise", "expedition", "private", "voyage"]

    let tourTypes = ["all types", "historic", "nature", "360° itineraries", "climbing", "trekking" ]

    let theDestinations= LTCGenData.countryList

    let operationRegions= ['galapagos', "patagonia", 'amazon', 'peru', "chile", "argentina", 'ecuador' ]    

    // Filters
    const [userUIFilters, setUserFilters]=useState(theDestinations)
    const [selectedFilter, setFilter]=useState("all countries")
    const [theFilterLabel, setFilterLabel]=useState("destinations")
    const [filteredItineraries,setFilteredItins]=useState(LTCItineraries)
    useEffect(()=>{
        if(theFilterLabel==="destinations"){
            if(selectedFilter==="all countries"){
                setFilteredItins(LTCItineraries)
            } else {
                let tempArr =LTCItineraries.filter(elem=>elem.countryList[0]===selectedFilter)
                setFilteredItins(tempArr)
            }
        }
    },[selectedFilter])

    // sorting
    const [sortContr, setSortContr]=useState("duration")
    const [sortOrder, setSortOrder]=useState("ascending")

    useEffect(()=>{
        // add conditional if selectedDestination => sort by all tourData, else by filtered tour data.
        sortOrder==="descending"?
            setFilteredItins([...filteredItineraries].sort((a,b)=> a[sortContr] - b[sortContr])) 
        :
            setFilteredItins([...filteredItineraries].sort(((a,b)=> b[sortContr] - a[sortContr])))
    },[sortContr])
    useEffect(()=>{
        sortOrder==="descending"?
            setFilteredItins([...filteredItineraries].sort((a,b)=> a[sortContr] - b[sortContr])) 
        :
            setFilteredItins([...filteredItineraries].sort(((a,b)=> b[sortContr] - a[sortContr])))
    },[sortOrder])

    const LTCTourExplorar=(theItins, filterArr, filterLabel, localOrFetched, priceSortTrigger)=>{

        let eachTourCard = theItins.map((elem, i)=><React.Fragment key={i}>
            <div><TextTourCard aTour={elem} /></div>
        </React.Fragment> )

        // Filter Category
        // Filter Selection
        // Sorting Opts

        let eachSelectOpt=filterArr.map((elem, i)=><React.Fragment key={i}>
            <option value={elem} > {elem} </option>
        </React.Fragment>)

        return<>
            <div className={styles.itineraryDisplCont}>
                {localOrFetched? <>                
                    <h2> Your Itineraries</h2>
                </>:<>                
                    <h2> LTC Published Itineraries</h2>
                </> }

                {priceSortTrigger&&<>
                    <div className={styles.filterUICont}> 
                        <label htmlFor="filterDropdownUI">{filterLabel}: &nbsp;</label>
                        <select id="filterDropdownUI" onChange={(e)=>{
                            setFilter(e.target.value)
                        }} >
                            {theFilterLabel==="destinations"&& <>
                            <option value="all countries">All Countries </option></>}
                        
                            {eachSelectOpt}
                        </select>
                        &nbsp;&nbsp;&nbsp; 
                        Tours: {theItins.length}
                    </div>
                </>}

                <SortingItinUI 
                    sortContr={sortContr} 
                    setSortContr={setSortContr}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    priceSortTrigger={priceSortTrigger}
                />
                <div className={styles.tourCardDisp } > {eachTourCard} </div>
            </div>
        </>
    }

    const [itineraryFetcherTrig, setFetchTrig]= useState(false)
    const [fetchedItinArr, setFetchedItArr]=useState()
    const fetchUserItineraries=()=>{

        return(<>
            {fetchedItinArr?<>
                {LTCTourExplorar(fetchedItinArr, userUIFilters, theFilterLabel, true, false )}
            </>: <>
                <div style={{width:"96%", padding:"15px" }}>
                    <div className={styles.aGenBTN} 
                    onClick={async()=>{
                        if(!itineraryFetcherTrig){
                        setFetchTrig(true)
                        let stringifiedUserName=JSON.stringify(session.user.name)
                        const res = await fetch("/api/gms/itineraries", {
                            method: "PUT",
                            body: stringifiedUserName
                        })
                        const itineraryFetcher = await res.json()
                            if(itineraryFetcher){
                                setFetchedItArr(itineraryFetcher)
                            }
                        }
                    }}>
                        {itineraryFetcherTrig? <>
                            <CircularProgress />
                        </>:<>
                            Get your itineraries
                        </> }
                    </div>
                </div>
            </> }
        </>)
    }


console.log(fetchedItinArr)

    return(<>
    
        {session?<> 
            <div className={styles.generalPageCont}>
                <GMSNavii  user={session.user} />
                <br></br>
                <ExploreIcon fontSize="large" />
                <h2>Latin Travel Collection</h2>
                <h1>Tour Explorer</h1>
            
                {LTCTourExplorar(filteredItineraries, userUIFilters, theFilterLabel, false, true )}

                {fetchUserItineraries()}
                <br/>
                <br/>
                <br/>
            </div>
        </>:<> 

            Link home & LTC Tour Explorer

        </>}
    </>)
}