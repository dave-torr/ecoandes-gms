import React, { useEffect, useState } from "react";
import Link from "next/link"
import { useSession } from "next-auth/react"

import { GMSNavii } from "../../components/navis";

import {TextTourCard, SortingItinUI, TourDisplayer, ItinDuplicator, ItinDeletor, ItinEditor, ItinDataDisp} from "../../components/tours"


import LTCItineraries from "../../data/LTCItinerary.json"
import LTCGenData from "../../data/dataAndTemplates.json"

import ExploreIcon from '@mui/icons-material/Explore';
import CircularProgress from '@mui/material/CircularProgress';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PrintIcon from '@mui/icons-material/Print';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InfoIcon from '@mui/icons-material/Info';


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


    const [pickedItin, setPickedItin] =useState()
    const [itinDispTrigger, setItinDispTrigger]=useState(false)
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

    useEffect(()=>{
        window.scrollTo({top: 0})
    },[itinDispTrigger])

    const LTCTourExplorar=(theItins, filterArr, filterLabel, localOrFetched, priceSortTrigger, cardType, setItin, setItinDispTrigger)=>{

        let eachTourCard = theItins.map((elem, i)=><React.Fragment key={i}>
            <div><TextTourCard aTour={elem} type={cardType} setItin={setItin} setDialogTrigger={setItinDispTrigger} /></div>
        </React.Fragment> )

        let eachSelectOpt=filterArr.map((elem, i)=><React.Fragment key={i}>
            <option value={elem} > {elem} </option>
        </React.Fragment>)

        return<>
            <div className={styles.itinCardDisp}>
                <h2> {localOrFetched} Itineraries</h2>
                Tours: {theItins.length}          
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
                    </div>
                </>}
                {theItins.length>0? <>
                    <SortingItinUI 
                        sortContr={sortContr} 
                        setSortContr={setSortContr}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                        priceSortTrigger={priceSortTrigger}
                    />
                    <div className={styles.tourCardDisp } > {eachTourCard} </div>
                </>:<>
                    <div className={styles.nonToursPlaceholder}> 
                        You haven't created any itineraries yet! <br/>
                        Start Here! <br/><br/>
                        <Link href="/gms/tourCreator" >Tour Creator</Link>

                    </div>
                </>}
            </div>
        </>
    }

    const [itineraryFetcherTrig, setFetchTrig]= useState(false)
    const [fetchedItinArr, setFetchedItArr]=useState()
    const [itineraryFetcherTrig2, setFetchTrig2]= useState(false)
    const [fetchedItinArr2, setFetchedItArr2]=useState()

    // itin user UI
    const [copyItinTrig, setCopyTrig]=useState(false)
    const [deleteItinTrig, setDelItinTrig]=useState(false)
    const [editItinTrig, setEditItinTrig]=useState(false)
    const [itinDataTrig, setDataTrig]=useState(false)

    const fetchUserItineraries=()=>{
        return(<>
            {fetchedItinArr?<>
                {LTCTourExplorar(fetchedItinArr, userUIFilters, theFilterLabel, "your", false, 2, setPickedItin, setItinDispTrigger )}
            </>: <>
                <div className={styles.userBTNCont}>
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
    const selectedItinDips=()=>{
        return(<>
            {pickedItin&&<>

            {/* each itin UI BTNS */}

            <div className={styles.iconDialogCont}>
                <div className={styles.tourDialogBTN} style={{left:"3px"}} onClick={()=>setItinDispTrigger(false)}> 
                    X </div>
                
                <div  className={styles.tourDialogBTN} style={{left:"57px"}} onClick={()=>window.print()} > 
                    <PrintIcon/> </div>

                <div  className={styles.tourDialogBTN} style={{left:"114px"}} onClick={()=>setCopyTrig(true)} > 
                    <ContentCopyIcon/> </div>
                { ( pickedItin.tripRef || pickedItin.tripLang || pickedItin.compContact || pickedItin.tourCode || pickedItin.company )
                &&<>  
                    <div  className={styles.tourDialogBTN} style={{left:"171px"}} onClick={()=>setDataTrig(true)} > 
                        <InfoIcon/> </div>
                </>}

                {(session?.user.hierarchy===1 || session?.user.name===pickedItin?.user.name) &&<>
                    <div className={styles.tourEditBTN} style={{left:"228px"}} onClick={()=>setEditItinTrig(true)} >  
                        <EditNoteIcon /> </div>

                    <div  className={styles.tourDialogBTN} style={{left:"285px"}} onClick={()=>setDelItinTrig(true)} > 
                        <DeleteOutlineIcon/> </div>
                </>}
            </div>

                {session?.user.name===pickedItin.user.name && <></>}
                <span className={styles.eachTourDispl}>
                    <div className={styles.eachTourDispl}>
                        <TourDisplayer 
                            aTour={pickedItin}
                            key={pickedItin.tripName}
                        />
                    </div>
                </span>
            </>}
        </>)
    }
    const allItinsDisp=()=>{
        return(<>
            {fetchedItinArr2?<>
                {LTCTourExplorar(fetchedItinArr2, userUIFilters, theFilterLabel, "All LTC", false, 2, setPickedItin, setItinDispTrigger )}
            </>: <>
                <div className={styles.userBTNCont}>
                    <div className={styles.aGenBTN} 
                    onClick={async()=>{
                        if(!itineraryFetcherTrig2){
                        setFetchTrig2(true)
                        const res = await fetch("/api/gms/itineraries", {
                            method: "GET"
                        })
                        const itineraryFetcher = await res.json()
                            if(itineraryFetcher){
                                setFetchedItArr2(itineraryFetcher)
                            }
                        }
                    }}>
                        {itineraryFetcherTrig2? <>
                            <CircularProgress />
                        </>:<>
                            Get all LTC itineraries
                        </> }
                    </div>
                </div>
            </> }
        </>)
    }


// Notes:

// SPANISH ITIN DISPLAYER
// Foto Editing, add, rmv, 

    

    return(<>
        {session?<> 

            <div className={styles.generalPageCont}>
            {itinDispTrigger? <> 

            {/* Selected Itin */}
                {selectedItinDips()}

                <ItinDuplicator
                    dialogTrig={copyItinTrig}
                    setDialogTrig={setCopyTrig}
                    aTour={pickedItin}
                    userData={session.user}
                />

                <ItinDeletor
                    dialogTrig={deleteItinTrig}
                    setDialogTrig={setDelItinTrig}
                    aTour={pickedItin}
                    userData={session.user}
                />

                <ItinEditor
                    dialogTrig={editItinTrig}
                    setDialogTrig={setEditItinTrig}
                    aTour={pickedItin}
                    userData={session.user}
                />
            
                <ItinDataDisp
                    dialogTrig={itinDataTrig}
                    setDialogTrig={setDataTrig}
                    aTour={pickedItin}
                />
            </>:<> 

            {/* General Tour Explorer Page */}
                <GMSNavii  user={session.user} />
                <br></br>
                <ExploreIcon fontSize="large" />
                <h2>Latin Travel Collection</h2>
                <h1>Tour Explorer</h1>
            

                {LTCTourExplorar(filteredItineraries, userUIFilters, theFilterLabel, "LTC Published", true, 1 )}
                {fetchUserItineraries()}
                {allItinsDisp()}


            </>}
            </div>
        </>:<> 


            <div> {"/"}GMS{"/"}TOUREXPLORER </div>

            <span style={{width: "99vw", marginTop: "30vw", display: "flex", justifyContent: "center", alignItems: "center" }} >

                <div className={styles.GMSGeneralBTN}> 
                    <Link href="/gms" >
                        <a > GMS Home Page </a>
                    </Link>
                    <Link href="/gms" >
                        <a > LTC Published Itineraries </a>
                    </Link>
                </div>
            </span>
        </>}
    </>)
}