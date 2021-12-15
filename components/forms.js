import React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"

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
//////////////////////////////////////////////////////////

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import styles from "../styles/components/forms.module.css"


export function LogoSwitcher(props){
    const handleChange=()=>{
        if(props.aTour.ecoAndesLogo){
            props.tourEditor({...props.aTour, "ecoAndesLogo": false}) 
        } else {
            props.tourEditor({...props.aTour, "ecoAndesLogo": true}) 
        }
    }
    return(<>
        <div style={{display: "flex", alignItems: "center", fontSize: "1.3em"}}>
        <Switch 
            checked={props.aTour.ecoAndesLogo}
            onChange={handleChange}
        /> EcoAndes Travel Logo</div>
    </>)
}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
let imageThumbnailArr=[
    {"src": galapagosSunset, "alt": "Galapagos Sunset"},
    {"src": cotopaxiClimb, "alt": "Cotopaxi Ecuador"},
    {"src": galapagosCruising, "alt": "Galapagos Cruising"},
    {"src": galapagosExploration, "alt": "Galapagos Exploration"},
    {"src": galapagosBeach, "alt": "Galapagos Beach"},
    {"src": machuPicchu, "alt": "Machu Picchu"},
    {"src": boliviaMountains, "alt": "Bolivia Mountains"},
    {"src": hikingsouthAmerica, "alt": "Hiking South America"},
    {"src": sunriseMountains, "alt": "Mountains Sunrise"},
    {"src": quitoSunrise, "alt": "Quito Sunrise"},
    {"src": ruminahuiMountain, "alt": "Ruminahui Hike"},
    {"src": chimborazoVicunas, "alt": "Chimborazo Vicunas"},
    {"src": cotopaxiAerial, "alt": "Cotopaxi Aerial"},
]
export function ItineraryImagePicker(props){
    const [imageCap, setImageCap]=useState("Please Pick an image!")

    let thumbNails = imageThumbnailArr.map((elem, i)=><React.Fragment key={i}>
        <div className={styles.imageThumbnail} 
            onMouseEnter={()=>{setImageCap(elem.alt)}} 
            onMouseLeave={()=>setImageCap("Please Pick an image!")}
            onClick={()=>props.tourEditor({...props.aTour, "tourCover": elem})}
            >
        <Image 
            src={elem.src}
            alt={elem.alt}
            layout="responsive"
        /></div>
    </React.Fragment>)
    return(
        <>
            <div className={styles.imageThumbnailDisp}> 
            {thumbNails} 
            </div>
            <div> {imageCap}</div>
        </>
    )
}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
import AddBoxIcon from '@mui/icons-material/AddBox';
export function HighlightAdder(props){
    const [aHighlight, setAHighlight]=useState('')
    return(
        <div className={styles.highlightInputCont}>
            <input
                placeholder="Add a Highlight"
                onChange={(e)=>{
                    setAHighlight(e.target.value)
                }}
                style={{width: "250px"}}
                value={aHighlight}
            /> &nbsp;
            {aHighlight===''?<>
                <AddBoxIcon />
            </>:<>
                <AddBoxIcon onClick={()=>{
                    let highlightArr=props.aTour.highlights.concat(aHighlight)
                    props.tourEditor({
                        ...props.aTour,
                        "highlights": highlightArr
                    })
                    setAHighlight('')
                }} />
            </>}
        </div>
    )
}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
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