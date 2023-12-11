import React, { useState, useEffect } from 'react'

import { useSession } from "next-auth/react"
import { SignInForm } from "../../components/authForms"

import styles from "../../styles/pages/yacuma.module.css"

import ForestIcon from '@mui/icons-material/Forest';

// log in for Fausto,
// display first letters of name if picture is not available
// correct Cristina's profile picture

// . charAt()

// Camera Trap Log Book
// Bitacora de Camara Trampa

// save to local storage in phone, when connected to internet, save to database


let toDate= new Date()
const TrapCamRegModel={
    "submitDate": toDate,
    "height": Number,
    "region": String,
    "comments": [],
    "locationNotes": [],
    "isLocalNetwork":false
}

export default function YacumaPage(){
    const { data: session } = useSession()
    const [registrationObj, setRegistrationObj] = useState(TrapCamRegModel)

    useEffect(()=>{
          const interval = setInterval(() => {
            // console.log(navigator.onLine)
            // if Set interval is false, 
            if(navigator.onLine){
                setRegistrationObj({
                    ...registrationObj,
                    "isLocalNetwork": false
                })
            } else if ((!navigator.onLine && !registrationObj.isLocalNetwork )){
                setRegistrationObj({
                    ...registrationObj,
                    "isLocalNetwork": true
                })
            }
        }, 5000);
        return () => clearInterval(interval);
    },[])


    const newTramCamRegForm=()=>{

        return(<>
            <form  onSubmit={(e)=>{
                e.preventDefault()

            }}>
            
            </form>
        </>)
    }



    return(<>
        <div className={styles.main}>
        
            {session ? <> <br/>
                <h1>Yacuma EcoLodge </h1>
                <ForestIcon/>
                {newTramCamRegForm()}
            
            </> :<>
                <SignInForm  />
            </> }





        </div>
    </>)
}