import React, { useState } from 'react'
import { useEffect } from 'react'

import Link from 'next/link'

export default function OperationsDashboard({posts}){

    const [activeCount, setActiveTourCount]=useState(0)
    // const [fetchedItineraries, setFechtedItins]=useState(posts)

    useEffect(()=>{

        // on update of departures, scan and filter all departures by present date within range of operation. 

    },[])


    console.log(posts)


    return(<>

    CUCUUU

    </>)
}

// SWR ISG for all itineraries for past and new stats. 

export const getStaticProps = async () => {

const res = await fetch("https://ecoandes-gms.vercel.app/api/gms/itineraries")

const posts = await res.json() 
  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
};