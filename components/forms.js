import React from "react"
import { useState, useEffect } from "react"

import Image from "next/image"

import FlightIcon from '@mui/icons-material/Flight';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CancelIcon from '@mui/icons-material/Cancel';
import Switch from '@mui/material/Switch';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Textarea } from '@mantine/core';

//////////////////////////////////////////////////////////
import styles from "../styles/components/forms.module.css"

// Flag for Deletion
export function aTextInput(aPlaceholder, inputId, anObject, setAnObject, inputType, reqBoolean){
    return(<>
    <div className={styles.anInputcont}>
        <label htmlFor={inputId} className={styles.anInputLabel}>{aPlaceholder}:</label> 
        <input
            placeholder={aPlaceholder}
            type={inputType}
            id={inputId}
            required={reqBoolean}
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


// Updated general input displayer
export function anInputDisplayer(inputLabel, inputId, inputType, isReq, inputPlaceholder, anObject, setAnObject, numbMin ){
    return(<>
        <div className={styles.theInputContainer}>
            <div className={styles.anInputRow}>
                <label htmlFor={inputId} className={styles.inputLabel}>   
                    {inputLabel}</label>
                <i> &nbsp; - &nbsp; {inputType} </i>
            </div>
            <input
                className={styles.inputUserUI}
                type={inputType}
                required={isReq}
                placeholder={inputPlaceholder}
                id={inputId}
                onChange={(e)=>{
                    e.preventDefault()
                    setAnObject({
                        ...anObject,
                        [inputId]:e.target.value
                    })
                }}
                min={numbMin}
            />
        </div>
    </>)
}

// multi OptDisplayer
export function multiOptPicker(theOptsArr, inputLabel, inputId, resultingList, addToSelection, setOptsArr){
    let eachMultiOptDisp=theOptsArr.map((elem,i)=>
        <React.Fragment key={i}> 
            <div className={styles.multiPickerOpt} onClick={()=>{
                // add to optEleem, rmv from temp arr
                let tempList=resultingList.concat(elem)
                addToSelection(tempList)
                let tempListTwo = [...theOptsArr];
                tempListTwo.splice(i,1)
                setOptsArr(tempListTwo)
            }} >+ {elem}</div>
        </React.Fragment>)
    let resultingMultiList=resultingList.map((elem,i)=>
        <React.Fragment key={i}> 
            <div className={styles.multiElemSelects} onClick={()=>{
                // remove from selectedElems, add to OptList
                let tempList=theOptsArr.concat(elem)
                setOptsArr(tempList)
                let tempListTwo = [...resultingList];
                tempListTwo.splice(i,1)
                addToSelection(tempListTwo)
            }}> 
                {elem} &nbsp; <HighlightOffIcon />
            </div>
        </React.Fragment>)
        
    return(<>
        <div className={styles.theInputContainer}>
            <div className={styles.anInputRow}>
                <label htmlFor={inputId} className={styles.inputLabel}>   
                    {inputLabel} picker</label>
                <i> &nbsp; - &nbsp; multi option picker </i>
            </div>
            <br/>
            <div className={styles.aRow}>
                {eachMultiOptDisp}
            </div>
            <div className={styles.listDisplayer}>
                <h3> {inputLabel} </h3>
                <div>
                    {resultingList.length>0?<>
                        <div className={styles.aRow}>
                            {resultingMultiList}
                        </div>
                    </>:<>
                        <div>...add to {inputLabel}</div>
                    </>}
                </div>
            </div>
        </div>
    </>)
}

export function aDropdownPicker(theOptsArr, inputLabel, inputId, anObject, setAnObject, ){
    let theOptions=theOptsArr.map((elem,i)=><React.Fragment key={i}> 
        <option value={elem}> {elem} </option></React.Fragment>)
    return(<>
        <div className={styles.theInputContainer}>
            <div className={styles.anInputRow}>
                <label htmlFor={inputId} className={styles.inputLabel}>   
                    {inputLabel}</label>
                <i> &nbsp; - &nbsp; single option picker </i>
            </div>
            <select className={styles.inputUserUI}
            placeholder="cucu"
            onChange={(e)=>{
                e.preventDefault()
                    setAnObject({
                        ...anObject,
                        [inputId]:e.target.value
                    })
                }}> 
                <option disabled selected > Select a {inputLabel}</option>
                {theOptions}
            </select>
        </div>
    </>) 
}

export function LogoSwitcher(props){
    const handleChange=()=>{
        if(props.aTour.ecoAndesLogo){
            props.tourEditor({...props.aTour, "ecoAndesLogo": false}) 
        } else {
            props.tourEditor({...props.aTour, "ecoAndesLogo": true}) 
        }
    }
    return(<>
        <div style={{display: "flex", alignItems: "center"}}>
        <Switch 
            checked={props.aTour.ecoAndesLogo}
            onChange={handleChange}
        /> EcoAndes Travel Logo</div>
    </>)
}












//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

// Image Arrays depending on destinations

let imageThumbnailArr=[
    {"src": "https://dsm01pap002files.storage.live.com/y4my2ZCpxo-_Y0Zo2hVBaeGxy70XewKRdQ2-XBX2f7WEr0H7ENC4gx2GTgdRlwQ-OAp2CQQwW780Q2CsxUBAEnCuHjvdYH-pQxAF2Sm_aGQknKJ1AozFvi-y40wq-ZiCByrxP2BXAjl1Rw6OWMJDgP0zi-n_9ucxDij9ig15AQnah7C1T3p63r0P4v3uxuJE2nH?width=2000&height=1125&cropmode=none", "alt": "Galapagos Sunset"},
    {"src": "https://dsm01pap002files.storage.live.com/y4mTcP69dqCa6hXxDuiSMxnVH3wR59QSA3F7swcMV-WFwIPmkAIfYzv0bIpWO93Kx-e7PhlFqGb9M0wZlCD2UNGaF44eqg6HtVcCcT7VD3Hq0nfAQvEg2Py_53mMHxHq-5yxbONPA69zSIVjGTIC2dQDqCJXB4XqjRUQxg4MM9B-3Ed952f_swzd2GgHIcoepYQ?width=2000&height=1125&cropmode=none", "alt": "Cotopaxi Ecuador"},
    {"src": "https://dsm01pap002files.storage.live.com/y4m5Gdyx7j3nkngt6qjO_svCfqRIZBld0b9kSzgBcJkJzGsAVk_fiqkSLSfxpHEYZOA2YwV4VgyRdsWNhxk47eGwgnCBoLT2MRsr-OM044Vl2Ll4qn7I8wXBXfC-GclFf_1sGZF86aZbp0CC301EO5PfOiPP1V-m7ZChs2mQk64ieoB8IA_pyT-f5RNgL8up655?width=2000&height=1125&cropmode=none", "alt": "Galapagos Cruising"},
    {"src": "https://dsm01pap002files.storage.live.com/y4mjJUA_1Qt-mojHMzmhRfR2zc7EtZO2iZKDH4MjOwPBoIK0LPuu4Y1xlIjctwkWcxaRBwMJB1UICouSictYGFhnqA8DhaLLe24t2M8aZHn0fOXEDmG_EsmUVgHVUrP6thsYyQF5-5oDksTlajlc7AflGXjavh66J-SqOhIFQSh4-eUfMLSfPWnIPYEgD6GMqIe?width=2000&height=1125&cropmode=none", "alt": "Galapagos Exploration"},
    {"src": "https://dsm01pap002files.storage.live.com/y4mnRVW6CzcHGKwEPATGzqaHm3iNNnBO3p2EeX4SLZNbBsev1SI8wW14XYkmAcIYWZXmVWgxkX0nRB1M7tzNQe6Mj19H86rvebriAcx400V0mztjqX_90QILfmYpFBUAAVWkDVMuokH-sJYdPo6AsOl6Jb6Imggk1yOLh5foW7G_guoyYwJj6ZTT8zlHACpoAhG?width=2000&height=1125&cropmode=none", "alt": "Galapagos Beach"},
    {"src": "https://dsm01pap002files.storage.live.com/y4myB1YGB-G2w5DIakXalJn5tRo7Hopu5CD6U_iDqMHEAxLJ7-tDtoxXawSNnCOIMF9Q174dpXpFBDavlab-yGmLkQOEclAtMAJwVydTHo3OuCfW0o-oKTWa-KIWZ3FvEqWz0ZPpRCy3B0ic3sXZx8q-nh-1dJPGzkJLl2zpUiQ-YPU1THp3kYcmJqe4v8iALKF?width=2000&height=1125&cropmode=none", "alt": "Machu Picchu"},
    {"src": "https://dsm01pap002files.storage.live.com/y4m3aF8TjUlNP33379Zfr9hccG-YjpT1T6XdREzzoO4fOOtuQy3SKavcNAaK8CVyuY7_kjP6_MaEKQZOMDymtILHC47-pQzJ_ye-AdLyxBsQl_ViCL1BLjYDm4Hl0FnDdiF_WHH13DtscNsEtQ2SgyOPB2mX11uMIWx2gz2mZ1488MZu9h_U0TnVyoiVRpXGyFh?width=2000&height=1125&cropmode=none", "alt": "Peru Adventures"},
    {"src": "https://dsm01pap002files.storage.live.com/y4mR7dpVM_yJP26M4bwLpbcKd22XCcV7kImtZMNMFJCKN76CsrmnTW2WlHz2bro4s556piy0_XgW_WSw04ni9Huf5y8Uwr7vPHDarzbvixvHXmr-iKiku0rpWxWm6Jd4MISJB5RkQX7QrXkrfGOGU_wu42S5KThuI1LDsjlgKy-EeN3dEh8MvP-qLvvP1z-qKR9?width=2000&height=1125&cropmode=none", "alt": "Hiking South America"},
    {"src": "https://dsm01pap002files.storage.live.com/y4mqdvYnDS7uW0-oeT7JCSiy0ro0ckho6-jxZxSoJItLJK0-cVJ3tr1HnUtKNiPVbuzNf7yjRM5kyfItAGvif-DT42cSfB8uzk8bGQUKeKp3ljOT8GHmsm6Yz-jgKqXDFNVZTakYUD2NhIW4Tjj2B_rznT6hiyzlmqNaM0r9LcwUBmw4WeXCkEXNqv9D49aFg2-?width=2000&height=1125&cropmode=none", "alt": "Mountains Sunrise"},
    {"src": "https://dsm01pap002files.storage.live.com/y4mO41fd643xsoe3ffct7wDOiAx1AnuUw_jtt7EjAda2vgIPwgjIf1rRGrk6l42gc2IvTmht-SiXtFnlHELJ3KZpBfhQKeaYsTRLGPEzgXthGourdfrd1NywauKMkgqNqVndMQMAsROYqs-5keSrtvXX8WujGplaw3mC5XlLom_xtcFpTFfS7nCEOEQiiCHlks-?width=2000&height=1125&cropmode=none", "alt": "Cotopaxi Sunrise"}
]

export function ItineraryImagePicker(props){

    // this image picker should receive destination opts as props display image options based on selected dest 

    const [imageCap, setImageCap]=useState("Please Pick an image!")

    let thumbNails = imageThumbnailArr.map((elem, i)=><React.Fragment key={i}>
        <div className={styles.imageThumbnail} 
            onMouseEnter={()=>{setImageCap(elem.alt)}} 
            onMouseLeave={()=>{
                props.aTour.tourCover?
                    setImageCap("Thank you!")
                    :
                    setImageCap("Please Pick an image!")
                }}
            onClick={()=>props.tourEditor({...props.aTour, "tourCover": elem})}
            >
        <Image 
            src={elem.src}
            alt={elem.alt}
            width={2000}
            height={1125}
        /></div>
    </React.Fragment>)

    return(
        <>
            <div className={styles.imageThumbnailDisp}> 
            {thumbNails} 
            </div>
            <h2> {imageCap}</h2>
        </>
    )
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export function HighlightAdder(props){

    // add highlights or add a tour comment

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
// might use in next ver of gms
const flightsAdder=(setDay, theTravelDay, flightInfo, setFlights, formTrigger)=>{
    return(<>
    <div className={styles.dayAdditionalsCont}>
            <div onClick={()=>{formTrigger(false)}} style={{width: "100%", textAlign: "end", cursor:"pointer" }}>x | close &nbsp;</div>
            <h4>Add flight info here:</h4>
            {aTextInput("Flight Route", "flightRoute", flightInfo, setFlights, "text",)}
            {aTextInput("Flight Code", "flightCode", flightInfo, setFlights, "text",)}
            {aTextInput("Departure Date", "depDate", flightInfo, setFlights, "date",)}
            {aTextInput("Departure Time", "depTime", flightInfo, setFlights, "time",)}
            {aTextInput("Arrival Time", "arriTime", flightInfo, setFlights, "time",)}
            {aTextInput("Confirmation Number", "confirmationNumber", flightInfo, setFlights, "text",)}
            <br></br>
        <div className={styles.submitFlightsBTN} 
            onClick={(e)=>{
                e.preventDefault();
                setDay({
                    ...theTravelDay,
                    "Flights":{...flightInfo}
                })
                formTrigger(false)
                }}> Submit! </div>
        </div>
    </>)
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export function DayByDayAdder(props){
    const [aTravelDay, setTravelDay] = useState({
        "dayInclusions":[],
        "overnightProperty":''
    })
    const [dayInclusions, setDayInclusions]=useState([])
    const [aPickupData, setPickupData]=useState('')
    const [overNight, setOverNight]=useState('')
    const [flightsTrigger,setFlightsTrig]=useState(false)
    const [flightInfo, setFlightInfo]=useState({})
    useEffect(()=>{
        setTravelDay({
            ...aTravelDay,
            "dayInclusions":dayInclusions
        })
    },[dayInclusions])

    const addPickUpToArr=()=>{
        let timeArr=dayInclusions.concat(aPickupData)
        setDayInclusions(timeArr)
        setPickupData('')        
    }
    const dailyInclusionsAddr=()=>{
        return(<>
            <div className={styles.highlightInputCont}>
                <input
                    placeholder="Inclusions"
                    onChange={(e)=>{
                        setPickupData(e.target.value)
                    }}
                    onKeyPress={(e)=>{
                        e.key === 'Enter' && addPickUpToArr()
                    }}
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
        setDayInclusions([...tempList])
    }
    let dayInclDisp=dayInclusions.map((elem, i)=><React.Fragment key={i}>
        <div style={{width:"100%", display:"flex", justifyContent:"space-between", textTransform: "capitalize"}}> 
            <li>{elem}</li>
            <CancelIcon onClick={()=>removeTimers(dayInclusions, i)} />
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
                value={overNight}
            /> &nbsp;
            <AddBoxIcon onClick={()=>setHotelToDay()} />
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
    
    // const additionalsAdder=()=>{
    //     return(<>
    //     {flightsTrigger?<>
    //         {flightsAdder(setTravelDay, aTravelDay, flightInfo, setFlightInfo, setFlightsTrig)}
    //     </>:<>
    //         <div className={styles.dayAdditionalsCont}>
    //             <h2>Add to this day:</h2>
    //             <div className={styles.additionalOptionsCont}>
    //                 <div className={styles.eachAddiOpt} onClick={()=>setFlightsTrig(true)}>
    //                     <strong>FLIGHTS</strong>
    //                     <FlightIcon />
    //                 </div>
    //                 <div className={styles.eachAddiOpt}>
    //                     <strong>GUIDES</strong>
    //                     <EmojiPeopleIcon />
    //                 </div>
    //             </div>
    //         </div>
    //     </>}
    //     </>)
    // }

    // const flightsAdder=()=>{
    //     return(<>
    //     <form className={styles.dayAdditionalsCont}>
    //             <div onClick={()=>{setFlightsTrig(false)}} style={{width: "100%", textAlign: "end", cursor:"pointer" }}>x | close &nbsp;</div>
    //             <h4>Add flight info here:</h4>
    //             {aTextInput("Flight Route", "flightRoute", flightInfo, setFlightInfo, "text",)}
    //             {aTextInput("Flight Code", "flightCode", flightInfo, setFlightInfo, "text",)}
    //             {aTextInput("Departure Date", "depDate", flightInfo, setFlightInfo, "date",)}
    //             {aTextInput("Departure Time", "depTime", flightInfo, setFlightInfo, "time",)}
    //             {aTextInput("Arrival Time", "arriTime", flightInfo, setFlightInfo, "time",)}
    //             {aTextInput("Confirmation Number", "confirmationNumber", flightInfo, setFlightInfo, "text",)}
    //             <br></br>
    //         <div className={styles.submitFlightsBTN} 
    //             onClick={(e)=>{
    //                 e.preventDefault();
    //                 setTravelDay({
    //                     ...aTravelDay,
    //                     "Flights":{...flightInfo}
    //                 })
    //                 setFlightsTrig(false)
    //                 }}> Submit! </div>
    //         </form>
    //     </>)
    // }


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
                setTravelDay({"dayInclusions":[],"overnightProperty":''})
                setDayInclusions([])   
                document.getElementById("dayAdderForm").reset()                             
            }}>


            {dayDescriptionAdder()}
            <h3>Daily inclusions:</h3>
                {dayInclDisp}
                {dailyInclusionsAddr()}
            <h3>Overnight Property:</h3>
                {aTravelDay.overnightProperty===''?
                <>      
                    {hotelAdder()}
                </>:<>
                    <div className={styles.highlightInputCont}>
                        {aTravelDay.overnightProperty}
                        <CancelIcon onClick={()=> {
                            setTravelDay({
                                ...aTravelDay,
                                "overnightProperty": ''
                            })
                            setOverNight('')
                            }} />
                    </div>
                </>}

            {/* non MVP */}
            {/* {additionalsAdder()} */}


            <input type="submit" className={styles.submitDayBTN} value="Add Day to Itinerary" />
            {props.aTour.dayByDay.length>0&&<> 
                <div className={styles.submitDayBTN} onClick={()=>props.setTourMakerStep(2)} > Continue </div>
            </>}
        </form>
    </>)
}


export function IncExclAdder(props){

    const [tourInclusions, setInclusions]=useState([])
    const [anInclusion, setTheInclusions]=useState('')

    const addDailyIncl=()=>{
        let timeArr=tourInclusions.concat(anInclusion)
        setInclusions(timeArr)
        setTheInclusions('')        
    }
    const dailyInclusionsAddr=()=>{
        return(<>
            <div className={styles.highlightInputCont}>
                <input
                    placeholder="Inclusions"
                    onChange={(e)=>{
                        setTheInclusions(e.target.value)
                    }}
                    onKeyPress={(e)=>{
                        e.key === 'Enter' && addDailyIncl()
                    }}
                    value={anInclusion}
                /> &nbsp;
                {anInclusion===''?<>
                    <AddBoxIcon />
                </>:<>
                    <AddBoxIcon onClick={()=>addDailyIncl()} />
                </>}
            </div>
        </>)
    }

    return(<>
        <h3>Daily inclusions:</h3>
        {dailyInclusionsAddr()}
    </>)
}



