import React from 'react'
import { useState } from 'react'
import { useSession } from "next-auth/react"

import { GMSNavii } from '../../components/navis';

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import styles from "../../styles/pages/library.module.css";


function LibraryPage({ posts }){
    const { data: session } = useSession()
// library page will list elements of DB that should be accesible for Operations, Sales, Finance, etc.

// HOTELS
// Hotel DB (rates, contacts, services), Hotel Adder, Mistery Shopper Review

// Providers
// Guides, Transports, activities, restaurants, services, companies(partners), yachts, flights

// Templates
// activities, itin descriptions, 

    const [libPage, setLibPage] = useState()

    console.log(posts)

    return(<>
    {session && <>
        <GMSNavii user={session.user} /> 
        <div className={styles.generalPageCont}> 
            <LocalLibraryIcon fontSize="large" />
            <h2>Latin Travel Collection</h2>
            <h1>Library</h1>
        </div>

    </>}</>)
}

export async function getStaticProps(){
    const res = await fetch("http://localhost:3000/api/gms/dayByDayDB", {
        method: "GET"
    })
    const posts = await res.json()

    return{
        props: {
            posts
        },
        revalidate: 30,
    }
}

export default LibraryPage