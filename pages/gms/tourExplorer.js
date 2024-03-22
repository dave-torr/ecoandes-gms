import React, { useEffect, useState } from "react";
import Link from "next/link"
import { useSession } from "next-auth/react"

import { GMSNavii } from "../../components/navis";

import {TextTourCard, SortingItinUI, TourDisplayer, ItinDuplicator, ItinDeletor, ItinEditor, ItinDataDisp} from "../../components/tours"

import LTCItineraries from "../../data/LTCItinerary.json"
import EcoAndesFD from "../../data/ecoAndesFixedDepartures.json"
import LTCGenData from "../../data/dataAndTemplates.json"

import ExploreIcon from '@mui/icons-material/Explore';
import CircularProgress from '@mui/material/CircularProgress';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PrintIcon from '@mui/icons-material/Print';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InfoIcon from '@mui/icons-material/Info';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LaunchIcon from '@mui/icons-material/Launch';

import Dialog from '@mui/material/Dialog';

import styles from "../../styles/pages/tourExplorar.module.css"
import { inputToList } from "../../components/forms";

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

export default function TourExplorerPage(props){

    // sesh
    const { data: session } = useSession()

    // Tour Explorer Toolkit
    const [itinIndex, setItinIndex]=useState()
    const [pickedItin, setPickedItin] =useState()
    const [itinDispTrigger, setItinDispTrigger]=useState(false)
    const [copyItinTrig, setCopyTrig]=useState(false)
    const [deleteItinTrig, setDelItinTrig]=useState(false)
    const [editItinTrig, setEditItinTrig]=useState(false)
    const [itinDataTrig, setDataTrig]=useState(false)
    const [noteDispTrig, setNoteTrigger]=useState(false)
    const [incluPlaceholder, setPlaceholder]=useState("")

    // GMS fetchers
    const [itineraryFetcherTrig, setFetchTrig]= useState(false)
    const [fetchedItinArr, setFetchedItArr]=useState([])

    // Sorting
    const [filteredItineraries, setFilteredItins]=useState([])
    const [sortContr, setSortContr]=useState("calendar")
    const [sortOrder, setSortOrder]=useState("descending")
    
    // Filter Toolkit
    // const [theFilterLabel, setFilterLabel]=useState("destinations")
    // const [selectedFilter, setFilter]=useState("all countries")
    // useEffect(()=>{
    //     if(theFilterLabel==="destinations"){
    //         if(selectedFilter==="all countries"){
    //             setFilteredItins(LTCItineraries)
    //         } else {
    //             let tempArr =LTCItineraries.filter(elem=>elem.countryList[0]===selectedFilter)
    //             setFilteredItins(tempArr)
    //         }
    //     }
    // },[selectedFilter])

    useEffect(()=>{
        if(fetchedItinArr.length>0){
            setFilteredItins([...fetchedItinArr].sort((a,b)=> a.dateCreated - b.dateCreated).reverse())
        }
    },[fetchedItinArr])
    
    useEffect(()=>{
        if(sortContr==="calendar"){
        sortOrder==="descending"?
            setFilteredItins([...fetchedItinArr].sort((a,b)=> a.dateCreated - b.dateCreated).reverse())
            :
            setFilteredItins([...fetchedItinArr].sort((a,b)=> a.dateCreated - b.dateCreated))
        } else {

        sortOrder==="descending"?
            setFilteredItins([...fetchedItinArr].sort((a,b)=> a[sortContr] - b[sortContr])) 
            :
            setFilteredItins([...fetchedItinArr].sort(((a,b)=> b[sortContr] - a[sortContr])))
        }
    },[sortContr])

    useEffect(()=>{
        console.log("Mauw wo")
        if(sortContr==="calendar"){ 
            sortOrder==="descending"?
                setFilteredItins([...fetchedItinArr].sort((a,b)=> a.dateCreated - b.dateCreated).reverse())
            :
                setFilteredItins([...fetchedItinArr].sort((a,b)=> a.dateCreated - b.dateCreated))
        } else {
            sortOrder==="descending"?
                setFilteredItins([...fetchedItinArr].sort((a,b)=> a[sortContr] - b[sortContr])) 
            :
                setFilteredItins([...fetchedItinArr].sort(((a,b)=> b[sortContr] - a[sortContr])))
        }

    },[sortOrder])

    useEffect(()=>{
        window.scrollTo({top: 0})
    },[itinDispTrigger])

    const LTCTourExplorar=(theItins, sortTrigger, itinSource, priceSortTrigger, cardType, setItin, setItinDispTrigger)=>{

        let eachTourCard = theItins.map((elem, i)=><React.Fragment key={i}>
            <div onClick={()=>{setItinIndex(i)}}>
                <TextTourCard aTour={elem} type={cardType} setItin={setItin} setDialogTrigger={setItinDispTrigger} /></div>
        </React.Fragment> )

        return<>
            <div className={styles.itinCardDisp}>
                <h2> {itinSource} Itineraries</h2>
                Tours: {theItins.length}
                {/* update sorting function to filter out each user, sort by duration. */}
                {sortTrigger&&<> 
                    <SortingItinUI 
                        sortContr={sortContr} 
                        setSortContr={setSortContr}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />
                </>}
                <div className={styles.tourCardDisp } > {eachTourCard} </div>
            </div>
        </>
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

                <div className={styles.tourDialogBTN} style={{left:"228px"}} onClick={()=>setNoteTrigger(true)}>  
                
                <FormatListBulletedIcon/> </div>

                {(session?.user.hierarchy===1 || session?.user.name===pickedItin?.user.name) &&<>
                    <div className={styles.tourEditBTN} style={{left:"285px"}} onClick={()=>setEditItinTrig(true)} >  
                        <EditNoteIcon /> </div>

                    <div  className={styles.tourDialogBTN} style={{left:"342px"}} onClick={()=>setDelItinTrig(true)} > 
                        <DeleteOutlineIcon/> </div>
                </>}
                <div className={styles.tourDialogBTN} style={{ left: "399px"}}>
                    {pickedItin.fixedDepartureStatus ===1? <>
                            <Link href={`/ecoandes/${pickedItin.shortenedURL}`} rel="noopener noreferrer" target="_blank"> 
                            <LaunchIcon/></Link>
                        
                        </> :  <> 
                            <Link href={`/ltc/${pickedItin.shortenedURL}`} rel="noopener noreferrer" target="_blank"> 
                            <LaunchIcon/></Link>

                        </> }   
                  </div>
            </div>

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
    const GMSItinFetcher=()=>{
        return(<>
            {filteredItineraries.length>0?<>
                {LTCTourExplorar(filteredItineraries, true, "GMS ", true, 2, setPickedItin, setItinDispTrigger )}
            </>: <>
                <div className={styles.userBTNCont}>
                    <div className={styles.aGenBTN} 
                    onClick={async()=>{
                        if(!itineraryFetcherTrig){
                        setFetchTrig(true)
                        const res = await fetch("/api/gms/itineraries", {
                            method: "GET"
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
                            Get all LTC itineraries
                        </> }
                    </div>
                </div>
            </> }
        </>)
    }
    const notesDisplayer=()=>{
        return(<>
        <Dialog open={noteDispTrig} onClose={()=>{ setNoteTrigger(false)}} className={styles.aDial} >
        <div className={styles.aDial} >
            <h2> Itinerary Notes </h2> <br/>
            {pickedItin?.notes &&<>
                <ul>
                {pickedItin?.notes.map((elem, i)=><React.Fragment key={i} >
                    <li> {elem} </li>
                </React.Fragment>  ) }
                </ul>
            </>}
            {/* check function or use edit trigger */}
            {inputToList("Add Note to Day", "itinNotes", pickedItin, setPickedItin, pickedItin.notes,incluPlaceholder, setPlaceholder ) }
        </div>
        </Dialog>
        </>)
    }

    return(<>
        {session?<> 

            <div className={styles.generalPageCont}>
            {itinDispTrigger? <> 

            {/* Selected Itin */}
                {selectedItinDips()}
                {notesDisplayer()}

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
                    editTour={setPickedItin}
                    userData={session.user}
                    itinIndex={itinIndex}
                    itinArr={fetchedItinArr}
                    setItinArr={setFetchedItArr}
                    
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
            
                {GMSItinFetcher()}
                {LTCTourExplorar(LTCItineraries, false, "LTC Published", false, 1 )}
                {LTCTourExplorar(EcoAndesFD, false, "EcoAndes Fixed Departure", false, 2, setPickedItin, setItinDispTrigger)}

            </>}
            </div>
        </>:<> 
            <div> {"/"}GMS{"/"}TOUREXPLORER </div>
            <span style={{width: "99vw", marginTop: "30vw", display: "flex", justifyContent: "center", alignItems: "center" }} >
                <div className={styles.GMSGeneralBTN}> 
                    <Link href="/gms" >
                        GMS Home Page
                    </Link>
                    <Link href="/gms" >
                        LTC Published Itineraries
                    </Link>
                </div>
            </span>
        </>}
    </>)
}