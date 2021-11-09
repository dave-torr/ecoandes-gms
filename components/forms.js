
import React from "react"
import { useState, useEffect } from "react"

import galapagosSunset from "../public/assets/images/tourCovers/galapagosSunset.jpg"
import machuPicchu from "../public/assets/images/tourCovers/peruMachuPicchu.jpg"
import cotopaxiClimb from "../public/assets/images/tourCovers/cotopaxiClimb.jpg"
import galapagosCruising from "../public/assets/images/tourCovers/galapagosCruising.jpg"
import galapagosExploration from "../public/assets/images/tourCovers/galapagosExploration.jpg"
import galapagosBeach from "../public/assets/images/tourCovers/galapagosBeach.jpg"
import boliviaMountains from "../public/assets/images/tourCovers/boliviaMountains.jpg"
import hikingsouthAmerica from "../public/assets/images/tourCovers/hikingsouthAmerica.jpg"
import sunriseMountains from "../public/assets/images/tourCovers/sunriseMountains.jpg"
import quitoSunrise from "../public/assets/images/tourCovers/quitoSunrise.jpg"
import ruminahuiMountain from "../public/assets/images/tourCovers/ruminahuiMountain.jpg"
import chimborazoVicunas from "../public/assets/images/tourCovers/chimborazoVicunas.jpg"
import cotopaxiAerial from "../public/assets/images/tourCovers/cotopaxiAerial.jpg"


import styles from "../styles/components/forms.module.css"

let imageThumbnailArr=[
    galapagosSunset,
    machuPicchu,
    cotopaxiClimb,
    galapagosCruising,
    galapagosExploration,
    galapagosBeach,
    boliviaMountains,
    hikingsouthAmerica,
    sunriseMountains,
    quitoSunrise,
    ruminahuiMountain,
    chimborazoVicunas,
    cotopaxiAerial
]



export function AdminLogIn(props){

    const [logInobj, setLogInOb]=useState()

    const adminLogInSubmit=async()=>{
        let strngifiedReq= JSON.stringify()
        // submit user login
    }

    return(
        <form className={styles.loginContainer} onSubmit={()=>{adminLogInSubmit()}}>
            <div className={styles.anInputRow}>
                <label htmlFor="logInEmailLabel" className={styles.aFormLabel}>Email:</label>
                <input id="logInEmailInput" onChange={(e)=>setLogInOb({
                    ...logInobj,
                    "email": e.target.value
                })} type="email" className={styles.aFormInput}/>
            </div>
            <div className={styles.anInputRow}>
                <label htmlFor="logInEmailLabel" className={styles.aFormLabel}>Password:</label>
                <input id="logInPasswordInput" onChange={(e)=>setLogInOb({
                    ...logInobj,
                    "password": e.target.value
                })} type="password" className={styles.aFormInput}/>
            </div>
            <input type="submit" value="Submit" className={styles.submitBTN}/>
        </form>
    )
}

