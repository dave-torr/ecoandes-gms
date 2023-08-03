import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from "next-auth/react"


import {GMSNavii} from "./../components/navis"

import LTCPriceTables from "../data/LTCPriceTables2023.json"

import styles from "./../styles/pages/playground.module.css"

// Bitacora logo:
// import TrackChangesIcon from '@mui/icons-material/TrackChanges';

export default function PlaygroundPage(props){
    const { data: session } = useSession()

    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////

    const departureStatusDisp=(theDep)=>{
        return(<> 
        <div className={styles.depStatusIndicator}>
            {theDep.status==="onSale"? 
                <> <span className={styles.statusOne}>.</span>on Sale</> 
            : theDep.status==="reserved"?
                <><span className={styles.statusTwo}>.</span>Reserved</> 
            : theDep.status==="confirmed"&&
                <><span className={styles.statusThree}>.</span>Confirmed</> }
        </div>
        </>)
    }


    return(<>
        {session&&<> 
            <GMSNavii  user={session.user} />
            <div className={styles.playgroundPage}>


            <div className={styles.cucu}> Cucu</div>
                {departureStatusDisp({"status": "confirmed"})}
            </div>
        </>}
    </>)
}