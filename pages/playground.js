import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from "next-auth/react"


import { aTextArea, DayByDayAdder } from "./../components/forms"

import { Select } from '@mantine/core';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CircularProgress from '@mui/material/CircularProgress';

import {anImageDisp} from "../pages/gms/pix"

import {GMSNavii} from "./../components/navis"

import styles from "./../styles/pages/playground.module.css"


// Bitacora logo:
// import TrackChangesIcon from '@mui/icons-material/TrackChanges';

export default function PlaygroundPage(props){
    const { data: session } = useSession()

    const [aTourModel, setTourModel]=useState({
        "LTCLogo": "ecoAndes",
        "highlights":[],
        "dayByDay":[],
        "countryList":[],
        "imgArr":[],
        "included":[],
        "notIncluded":[],
    })
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// Sample Form
// Sample Form
    const formBuilder=()=>{
        return(<>
            <h1> Cucu Form Builder</h1>
            <form style={{width:"350px", marginLeft:"33%", border:"solid 1px black" }}> 

                <DayByDayAdder 
                    aTour={aTourModel} 
                    setTourModel={setTourModel}
                />

            </form>
        </>)
    }

    return(<>

    {/* Will we need session on per page level, or just on Navi and it can controll it all???? */}
        {session&&<> 
            <GMSNavii  user={session.user} />

            <h1>
            Cucu
            </h1>

            <ul> Img picker </ul>
            <ul> Gen Switchers </ul>


            {formBuilder()}

        </>}
    </>)
}