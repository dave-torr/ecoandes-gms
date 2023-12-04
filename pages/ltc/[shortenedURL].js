import React, { useState } from "react"
import Head from 'next/head'

import {TourDisplayer} from "../../components/tours"
import {connectToDatabase} from "../../middleware/dbMiddleware"

import styles from "../../styles/components/tourCmpnts.module.css"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LinearProgress from '@mui/material/LinearProgress';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { useRouter } from "next/router"


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

    return(<>
    
        <div className={styles.theTourDisp}>
            <TourDisplayer aTour={aTour} />
        </div>
        <div className={styles.itinLinkFooter}>
            <div > 
                <span style={{fontSize: "0.8em", fontWeight:"600"}}>CONTACT YOUR AGENT:  </span><br/> 
                {aTour.user.name}
            </div>
            <div style={{display:"flex"}} > 
                {aTour.user.email && <> <a href={`mailto:${aTour.user.email}?cc=planificacion@ecoandestravel.com&subject=${aTour.tripName} Request&body=Hi! I need some assistance with my trip:`}>
                    <MailOutlineIcon/> </a> 
                </>}
                {aTour.user.phono && <> <a href={`tel:+593${aTour.user.phono}`} target="_blank"> &nbsp; &nbsp; &nbsp;
                    <PhoneIcon/> </a> </>}
                {aTour.user.phono && <> <a href={`tel:+593${aTour.user.phono}`} target="_blank"> &nbsp; &nbsp; &nbsp;
                    <WhatsAppIcon/> </a> </>}
            </div>
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
                revalidate: 30 }
        }

    }
}
export default TourPage