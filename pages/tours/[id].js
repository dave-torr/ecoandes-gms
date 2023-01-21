import React, { useState } from "react"
import Head from 'next/head'

import {EcoAndesBar} from "./../../components/navis"
import {TourDisplayer} from "./../../components/tours"

import TourData from "../../data/peruItineraries"

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// itinerary updates:

// // Program descriptions are too long, change for "itinerary Highlights"
//  // image carousel, opens up image pop up dialog.


////////////////////////////////////////////////////////////

function TourPage({ aTour }){
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

    const tourHead=(theTour)=>{
        return(<>
        <Head>
            <title>{theTour.tripName}: an LTC Experience </title>
            <meta name="description" content={`A ${theTour.tourType} tour in South America, by Latin Travel Collection`} />
            <meta charSet="utf-8"/>
            <meta name="keywords" content="
            Soith America, Latin Travel Collection, Patagonia, Galapagos"/>
            <meta name="author" content="David Torres" />
            <meta name="copyright" content="LTC 2023" />
        </Head>
        </>)
    }

    return(<>
        {tourHead(aTour)}
        <EcoAndesBar inTrip={true}/>
        <TourDisplayer aTour={aTour} breadcrumb={true} key={aTour.tripName} />
    </>)
}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// Dynamic rendering shtuff:
///////////////////////////////////////////////////////////////////////

// Static url pats\hs from dynamic info
export async function getStaticPaths(){
    const paths = TourData.map((elem, i)=>({
        params: { id: elem.id.toString() }
    }))
    return {
        paths,
        fallback: false
    }
}
// ssr page content from dynamic info
export async function getStaticProps({ params }){
    // const sampleTour= { "general": "cucu" }
    const thetours = TourData.filter(elem=> 
        elem.id.toString() ===params.id )

    return{
        props: {aTour: thetours[0] }
    }
}
export default TourPage