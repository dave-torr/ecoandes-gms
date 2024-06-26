import React, { useEffect, useState } from "react"

import {TourDisplayer} from "../../components/tours"
import {connectToDatabase} from "../../middleware/dbMiddleware"

import styles from "../../styles/components/tourCmpnts.module.css"

import { useRouter } from "next/router"
import { LinearProgress } from "@mui/material"


function TourPage({ aTour }){
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
const router = useRouter()
    if(router.isFallback){
        return(<> 
        <span style={{ width:"100%", display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center" }}>
            Loading Travel Experience Page... 
            <br/>
            <LinearProgress  color="secondary" />
        </span>
        </>)
    } else if(aTour){

        const [fetchedTour, setTour]=useState(aTour)
        useEffect(()=>{
            setTour(aTour)
        },[aTour])

    return(<>
    
        <div className={styles.theTourDisp}>
            <TourDisplayer aTour={fetchedTour} contactNavi={true} />
        </div>
    </>)
    }
}



///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// Dynamic rendering shtuff:
///////////////////////////////////////////////////////////////////////

// Static url pats\hs from dynamic info
export async function getStaticPaths(){

    const client = await connectToDatabase();
    const FetchedUserItins = client
        .db('EcoAndesGMS')
        .collection("LTCItineraries")
        .find( { "status": {$gt: 0} } )
        .toArray();

    const fetchedIts = await FetchedUserItins
    if(fetchedIts){
        client.close();


        const paths = fetchedIts.map((elem, i)=>({
            params: { shortenedURL: elem.shortenedURL.toString() }
        })) 

        return {
            paths,
            fallback: true
        }
    }
}

export async function getStaticProps({ params }){
    const client = await connectToDatabase();
    const FetchedUserItins = client
        .db('EcoAndesGMS')
        .collection("LTCItineraries")
        .find( { "status": {$gt: 0} } )
        .toArray();

    const fetchedIts = await FetchedUserItins
    if(fetchedIts){

        const thetours = fetchedIts.find(elem=> 
            elem.shortenedURL === params.shortenedURL )

        let jsonStringTour = JSON.parse(JSON.stringify(thetours))

        return{
            props: {
                aTour: jsonStringTour,
                revalidate: 10 }
        }

    }
}
export default TourPage