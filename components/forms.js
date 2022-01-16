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
import FlightIcon from '@mui/icons-material/Flight';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
//////////////////////////////////////////////////////////

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
    const highlightSubmit=()=>{
        let highlightArr=props.aTour.highlights.concat(aHighlight)
        props.tourEditor({
            ...props.aTour,
            "highlights": highlightArr
        })
        setAHighlight('')
    }
    return(
        <div className={styles.highlightInputCont}>
            <input
                placeholder="Add a Highlight"
                onChange={(e)=>{
                    setAHighlight(e.target.value)
                }}
                style={{width: "250px"}}
                value={aHighlight}
                onKeyPress={(e)=>{
                    e.key === 'Enter' && highlightSubmit()
                }}
            /> &nbsp;
            {aHighlight===''?<>
                <AddBoxIcon />
            </>:<>
                <AddBoxIcon onClick={()=>highlightSubmit()} />
            </>}
        </div>
    )
}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
export function TourDateAdder(props){
    return(
        <>
        <div className={styles.datePickersCont}>
        
            <div className={styles.aDatePickerCont}>
                <label htmlFor="tourDepartureInput">
                    <h3>
                        Departure Date
                    </h3>
                </label>
                <input 
                    className={styles.aDateInput}
                    id="tourDepartureInput"
                    type="date"
                    onChange={(e)=>{props.tourEditor({
                        ...props.aTour,
                        "departureDate":e.target.value
                    })}}
                />
            </div>
            <div className={styles.aDatePickerCont}>
                <label htmlFor="tourArrivalInput">
                    <h3>
                        Arrival Date
                    </h3>
                </label>
                <input 
                    className={styles.aDateInput}
                    id="tourArrivalInput"
                    type="date"
                    min={props.aTour.departureDate}
                    onChange={(e)=>{props.tourEditor({
                        ...props.aTour,
                        "arrivalDate":e.target.value
                    })}}
                />
            </div>
        </div>
        </>
    )
}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
import CancelIcon from '@mui/icons-material/Cancel';
export function DayByDayAdder(props){
    // props.aTour
    // props.tourEditor
    const [aTravelDay, setTravelDay] = useState({
        "pickUpTimes":[],
        "overnightProperty":''
    })
    const [pickUpTimes, setPickupTimes]=useState([])
    const [aPickupData, setPickupData]=useState('')
    const [overNight, setOverNight]=useState('')
    const [flightsTrigger,setFlightsTrig]=useState(false)
    const [flightInfo, setFlightInfo]=useState({})
    useEffect(()=>{
        setTravelDay({
            ...aTravelDay,
            "pickUpTimes":pickUpTimes
        })
    },[pickUpTimes])
    const aTextInput=(aPlaceholder, inputId, anObject, setAnObject, inputType)=>{
        return(<>
        <div className={styles.anInputcont}>
            <label htmlFor={inputId} className={styles.anInputLabel}>{aPlaceholder}:</label> 
            <input
                placeholder={aPlaceholder}
                type={inputType}
                id={inputId}
                onChange={(e)=>{
                    e.preventDefault()
                    setAnObject({
                        ...anObject,
                        [inputId]:e.target.value
                    })
                }}
                />
        </div>
        </>)
    }
    const addPickUpToArr=()=>{
        let timeArr=pickUpTimes.concat(aPickupData)
        setPickupTimes(timeArr)
        setPickupData('')        
    }
    const timeAdder=()=>{
        return(<>
            <div className={styles.highlightInputCont}>
                <input
                    placeholder="Time and location of PickUp"
                    onChange={(e)=>{
                        setPickupData(e.target.value)
                    }}
                    onKeyPress={(e)=>{
                        e.key === 'Enter' && addPickUpToArr()
                    }}
                    style={{width: "250px"}}
                    value={aPickupData}
                /> &nbsp;
                {aPickupData===''?<>
                    <AddBoxIcon />
                </>:<>
                    <AddBoxIcon onClick={()=>addPickUpToArr()} />
                </>}
            </div>
        </>)
    }
    const removeTimers=(aList, prodIndex)=>{
        let tempList=[...aList];
        tempList.splice(prodIndex, 1)
        setPickupTimes([...tempList])
    }
    let pickupTimesDisp=pickUpTimes.map((elem, i)=><React.Fragment key={i}>
        <div style={{width:"100%", display:"flex", justifyContent:"space-between"}}> 
            <li>{elem}</li>
            <CancelIcon onClick={()=>removeTimers(pickUpTimes, i)} />
        </div>
    </React.Fragment>)
    const setHotelToDay=()=>{
        setTravelDay({
            ...aTravelDay,
            "overnightProperty":overNight
            })
        setOverNight('')
    }
    const hotelAdder =()=>{
        return(<>
        <div className={styles.highlightInputCont}>
            <input
                placeholder="Add hotel here"
                onChange={(e)=>{
                    setOverNight(e.target.value)
                }}
                onKeyPress={(e)=>{
                    e.key === 'Enter' && setHotelToDay()
                    }}
                style={{width: "250px"}}
                value={overNight}
            /> &nbsp;
            {overNight===''?<>
                <AddBoxIcon />
            </>:<>
                <AddBoxIcon onClick={()=>setHotelToDay()} />
            </>}
        </div>
        </>)
    }
    const dayDescriptionAdder=()=>{
        return(<>
        <div className={styles.aDayDescrCont}>
            {/* dayCount */}
            <label htmlFor="dayDescriptionInput">
            <strong>Day {props.aTour.dayByDay.length + 1}: &nbsp; 
            </strong> 
            Add Description*</label>
            <textarea
                required
                className={styles.aDayDescriptionInput}
                id="dayDescriptionInput"
                placeholder={aTravelDay.dayDescription}
                onChange={(e)=>{
                    setTravelDay({
                        ...aTravelDay,
                        "dayDescription": e.target.value
                    })
                }}
            />
        </div>
        </>)
    }
    const additionalsAdder=()=>{
        return(<>
        {flightsTrigger?<>
            {flightsAdder()}
        </>:<>
            <div className={styles.dayAdditionalsCont}>
                <h4>Add day additional data</h4>
                <div className={styles.additionalOptionsCont}>
                    <div className={styles.eachAddiOpt} onClick={()=>setFlightsTrig(true)}>
                        <strong>FLIGHTS</strong>
                        <FlightIcon />
                    </div>
                    <div className={styles.eachAddiOpt}>
                        <strong>GUIDES</strong>
                        <EmojiPeopleIcon />
                    </div>
                </div>
            </div>
        </>}
        </>)
    }
    const flightsAdder=()=>{
        return(<>
        <form className={styles.dayAdditionalsCont}>
                <div onClick={()=>{setFlightsTrig(false)}} style={{width: "100%", textAlign: "end", cursor:"pointer" }}>x | close &nbsp;</div>
                <h4>Add flight info here:</h4>
                <div style={{display: "flex"}}>
                    {aTextInput("Flight Route", "flightRoute", flightInfo, setFlightInfo, "text",)}
                    {aTextInput("Flight Code", "flightCode", flightInfo, setFlightInfo, "text",)}
                </div>
                {aTextInput("Departure Date", "depDate", flightInfo, setFlightInfo, "date",)}
                <div style={{display: "flex"}}>
                    {aTextInput("Departure Time", "depTime", flightInfo, setFlightInfo, "time",)}
                    {aTextInput("Arrival Time", "arriTime", flightInfo, setFlightInfo, "time",)}
                </div>
                {aTextInput("Confirmation Number", "confirmationNumber", flightInfo, setFlightInfo, "text",)}
                <br></br>
            <div className={styles.submitFlightsBTN} 
                onClick={(e)=>{
                    e.preventDefault();
                    setTravelDay({
                        ...aTravelDay,
                        "Flights":{...flightInfo}
                    })
                    setFlightsTrig(false)
                    }}> Submit! </div>
            </form>
        </>)
    }

    console.log(aTravelDay)

    return(<>
        <form 
            className={styles.dayAdderForm}
            id="dayAdderForm"
            onKeyPress={(e)=>{
                e.key === 'Enter' && e.preventDefault()
            }}
            onSubmit={(e)=>{
                e.preventDefault();
                let dayByDay=props.aTour.dayByDay.concat(aTravelDay)
                props.tourEditor({
                    ...props.aTour,
                    "dayByDay": dayByDay
                })
                setTravelDay({"pickUpTimes":[],"overnightProperty":''})
                setPickupTimes([])   
                document.getElementById("dayAdderForm").reset()                             
            }}>
            {dayDescriptionAdder()}
            <h3>Pick Up Times:</h3>
                {pickupTimesDisp}
                {timeAdder()}
            <h3>Overnight Property:</h3>
                {aTravelDay.overnightProperty===''?
                <>
                    {hotelAdder()}
                </>:<>
                    {aTravelDay.overnightProperty}
                </> }


            {additionalsAdder()}

            <input type="submit" className={styles.submitDayBTN} value="Add Day to Itinerary" />
        </form>
    </>)
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