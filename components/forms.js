import React from "react"
import { useState, useEffect } from "react"

import Image from "next/image"

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CancelIcon from '@mui/icons-material/Cancel';
import Switch from '@mui/material/Switch';
import AddBoxIcon from '@mui/icons-material/AddBox';

import FormControlLabel from '@mui/material/FormControlLabel';

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

// //////////////////////////////////////////////
// //////////////////////////////////////////////
// Operational Inputs

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
                onFocus={(e)=>{e.target.value=""}}
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
export function multiOptPicker(theOptsArr, inputLabel, inputId, resultingList, anObject, setAnObject, setOptsArr){
    let eachMultiOptDisp=theOptsArr.map((elem,i)=>
        <React.Fragment key={i}> 
            <div className={styles.multiPickerOpt} onClick={()=>{
                // add to optEleem, rmv from temp arr
                let tempList=resultingList.concat(elem)
                setAnObject({
                        ...anObject,
                        [inputId]: tempList
                    })

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
                setAnObject({
                        ...anObject,
                        [inputId]: tempListTwo
                    })
            }}> 
                {elem} <HighlightOffIcon />
            </div>
        </React.Fragment>)
        
    return(<>
        <div className={styles.theInputContainer}>
            <div className={styles.anInputRow}>
                <label htmlFor={inputId} className={styles.inputLabel}>   
                    {inputLabel}</label>
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
// simple optPicker
export function aDropdownPicker(theOptsArr, inputLabel, inputId, anObject, setAnObject ){
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
                        [inputId]: e.target.value
                    })
                }}> 
                <option disabled selected > Select a {inputLabel}</option>
                {theOptions}
            </select>
        </div>
    </>) 
}

export function aSwitcher(switcherController, anObject, setAnObject, objectElemKey, switchTrigger ){
    const handleChange=()=>{
        if(switcherController){
            setAnObject({
                ...anObject, 
                [objectElemKey]: false}) 
        } else {
            setAnObject({
                ...anObject, 
                [objectElemKey]: switchTrigger }) 
        }
    }
    return(<>
        <div style={{display: "flex", alignItems: "center"}}>
            <FormControlLabel 
                control={
                    <Switch checked={switcherController}
                    onChange={handleChange} />} label="Logo?" 
                />            
        </div>
    </>)

}

export function aTextArea(inputLabel, inputId, isReq, inputPlaceholder, anObject, setAnObject ){
    return(<>
        <div className={styles.theInputContainer}>
            <div className={styles.anInputRow}>
                <label htmlFor={inputId} className={styles.inputLabel}>   
                    {inputLabel}</label>
                <i> &nbsp; - &nbsp; textarea </i>
            </div>            
            <textarea
                required={isReq}
                className={styles.aDayDescriptionInput}
                id={inputId}
                placeholder={inputPlaceholder}
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

export function inputToList( inputLabel, inputId, anObject, setAnObject, theListe, incluPlaceholder, setPlaceholder){
    const addToListFunct=()=>{
        let tempList=theListe.concat(incluPlaceholder)
        setAnObject({
            ...anObject,
            [inputId]: tempList
        })
        setPlaceholder("")
    }
    const rmvFromListFunct=(aList, prodIndex)=>{
        let tempList=[...aList];
        tempList.splice(prodIndex, 1)
        setAnObject({
            ...anObject,
            [inputId]: tempList
        })
    }
    let theDisplayedList= theListe?.map((elem, i)=> <React.Fragment key={i}>
        <div className={styles.inputToListRow}>
            <span>{elem}</span>
            <CancelIcon onClick={()=>rmvFromListFunct(theListe, i)} />
        </div>
    </React.Fragment> )

    return(<>
        <div className={styles.theInputContainer}>
            <div className={styles.anInputRow}>
                <label htmlFor={inputId} className={styles.inputLabel}>   
                    {inputLabel}</label>
                <i> &nbsp; - &nbsp; text</i>
            </div>
            <div className={styles.inputToListRow}> 
                <input
                    className={styles.inputUserUI}
                    placeholder={incluPlaceholder}
                    id="theInclusionsInput"
                    onChange={(e)=>{
                        setPlaceholder(e.target.value)
                    }}
                    onFocus={(e)=>{e.target.value=""}}
                    onKeyPress={(e)=>{
                        if(e.key === 'Enter'){
                            addToListFunct()
                        }
                    }}
                /> &nbsp;
                {incluPlaceholder===''?<>
                    <AddBoxIcon />
                </>:<>
                    <AddBoxIcon onClick={()=>addToListFunct()} />
                </>}
            </div>
            {theDisplayedList}
        </div>
    </>)
}

export function radioSelectors(radioKeyValueArr, radioNames, anObject, setAnObject, radioTrigger){
    let theRadios = radioKeyValueArr.map((elem, i)=><React.Fragment key={i}>
        <div style={{display:"flex", width:"300px"}}> 
            <input type="radio" id={elem.radioKey} name={radioNames} onClick={()=>setAnObject({
                ...anObject,
                [radioTrigger]: elem.radioVal
            })}/>
            <label htmlFor={elem.radioKey} style={{textTransform:"capitalize"}} >{elem.radioKey}</label>
        </div>
    </React.Fragment>)
    return(<>
        <div className={styles.radioselectors}> 
        {/* className={styles.aRow} */}
            {theRadios}
        </div>
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
const flightsAdder=(setDay, theTravelDay, flightInfoObj, setFlightObj, setFlightTrigger )=>{
    return(<>
    <div className={styles.dayAdditionalsCont}>
            <h4>Add flight info here:</h4>
            <div style={{ display:"flex" }}>
                {anInputDisplayer("Dep. Date", "depDate", "date", false, "", flightInfoObj, setFlightObj,)}
                &nbsp;&nbsp;
                {anInputDisplayer("Dep Time", "depTime", "time", false, "", flightInfoObj, setFlightObj,)}
            </div>
            <div style={{ display:"flex" }}>
                {anInputDisplayer("From", "depLocation", "text", false, "", flightInfoObj, setFlightObj,)} 
                &nbsp;&nbsp;
                {anInputDisplayer("To", "arriLocation", "text", false, "", flightInfoObj, setFlightObj,)}
            </div>
            <div style={{ display:"flex" }}>
                {anInputDisplayer("Airline", "airline", "text", false, "", flightInfoObj, setFlightObj,)}
                &nbsp;&nbsp;
                {anInputDisplayer("Flight #", "flightNumb", "text", false, "", flightInfoObj, setFlightObj,)}

            </div>
                {anInputDisplayer("Conf. #", "confNumber", "text", false, "", flightInfoObj, setFlightObj,)}
            <br></br>
        <div className={styles.submitFlightsBTN} 
            onClick={(e)=>{
                let flightTempArr=theTravelDay.flightData.concat(flightInfoObj)
                setDay({
                    ...theTravelDay,
                    "flightData": flightTempArr
                })
                setFlightObj({})
                setFlightTrigger(false)
                }}> Add flight to day! </div>
        </div>
    </>)
}
const guideAdder=(guideInfoObj, setGuideObj, theTravelDay, setDay, setGuideTrigger)=>{
    return(<>
    <div className={styles.dayAdditionalsCont}>
        <h4>Add Guide Info Here </h4>
            {anInputDisplayer("Guide Name", "guideName", "text", false, "Name", guideInfoObj, setGuideObj)}
            {anInputDisplayer("Guide Category", "guideCategory", "text", false, "Category", guideInfoObj, setGuideObj)}
            <br></br>
        <div className={styles.submitFlightsBTN} 
            onClick={(e)=>{
                let guideTempArr=theTravelDay.guideData.concat(guideInfoObj)
                setDay({
                    ...theTravelDay,
                    "guideData": guideTempArr
                })
                setGuideObj({})
                setGuideTrigger(false)
                }}> Add Guide to day! 
        </div>
    </div>
    </>)
}

const flightDataDisplayer=(theTravelDay, setTravelDay)=>{
    if(theTravelDay.flightData.length>0){
    let eachFlight = theTravelDay.flightData.map((elem, i)=><React.Fragment key={i}>
        <ul> 
        <strong>{elem.depTime&& <>{elem.depTime}</>}</strong> 
        | {elem.depLocation&& <>{elem.depLocation}</>} 
        - {elem.arriLocation&& <>{elem.arriLocation}</>} 
        <span style={{cursor: "pointer"}}
            onClick={()=>{
            let aTempFlightArr=theTravelDay.flightData.splice(i, 0)
                setTravelDay({
                    ...theTravelDay,
                    "flightData": aTempFlightArr
                })
            }}><CancelIcon/></span>
        </ul>  
    </React.Fragment>)
    return(<>
        <h4> Flights:</h4>
        {eachFlight}
    </>)
    } 
}

const guideDataDisp=(theTravelDay, setTravelDay)=>{
    if(theTravelDay.guideData.length>0){
    let eachGuide = theTravelDay.guideData.map((elem,i)=><React.Fragment key={i}>
        <ui>
        <strong>{elem.guideName}</strong>
        {elem.guideCategory&&<> | {elem.guideCategory}</>}
        <span style={{cursor: "pointer"}} 
            onClick={()=>{
            let tempGuideArr=theTravelDay.guideData.splice(i, 0)
                setTravelDay({
                    ...theTravelDay,
                    "guideData": tempGuideArr
                })
            }}><CancelIcon/></span>
        </ui>
    </React.Fragment>)
    return(<>
        <h4> Guides:</h4>
        {eachGuide}
    </>)
    } 
}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
// used in Tour Creator
export function DayByDayAdder(props){

    // ver. 1 
    // Needs to be used as component, not as function
    // OP:
    //  day detail
    //  day inclusion list

    // version.2: need to figure out css to avoid wasted space
    //  flights:
    //      flightRoute, flightCode, depDate, depTime
    //      confNumber, Arrivaltimes
    //  Transfer pickup data: pickUpLocation & estTime


    const [aTravelDay, setTravelDay] = useState({
        "dayInclusions":[
            "private Transfers",
            "guide Services",
        ],
        "flightData":[],
        "guideData":[],
    })
    const [incluPlaceholder, setPlaceholder]=useState("")
    const [flightTrigger, setFlightTrigger]=useState(false)
    const [flightInfoObj, setFlightObj]=useState({})
    const [guideInfoObj, setGuideObj]=useState({})
    const [guideTrigger, setGuideTrig]=useState(false)

    return(<>
        <form style={{width:"100%"}} id="theDayFormID">

        {props.editDayTrigger? <>
            <h3>Edit day {props.editDayTrigger}:</h3> 
        </> : <>
            <h3>Day {props.aTour.dayByDay.length + 1}:</h3> 
        </>}
            
            {/* Day Description */}
            {anInputDisplayer("Day Title", "dayTitle", "text", true, "Main daily activity", aTravelDay, setTravelDay )}
            {aTextArea("Day detail", "dayDescription", true, "Describe daily activities", aTravelDay, setTravelDay)}
            {inputToList("add to day", "dayInclusions", aTravelDay, setTravelDay, aTravelDay.dayInclusions, incluPlaceholder, setPlaceholder)}

            {/* daily hotel accom */}
            {anInputDisplayer("Overnight Property ^", "overnightProperty", "text", false, "Hotel / Lodge Name", aTravelDay, setTravelDay)}

            {/* non MVP */}
            {/* {additionalsAdder()} */}


            {flightDataDisplayer(aTravelDay, setTravelDay)}
            {flightTrigger? <>
                {flightsAdder(setTravelDay, aTravelDay, flightInfoObj, setFlightObj, setFlightTrigger )}: 
            </>:<>
                <div className={styles.secondaryBTN} onClick={()=>setFlightTrigger(true)}>Add Flights</div>
            </>}

            {guideDataDisp(aTravelDay, setTravelDay)}
            {guideTrigger? <>
                {guideAdder(guideInfoObj, setGuideObj, aTravelDay, setTravelDay, setGuideTrig)}
            </>:<>
                <div className={styles.secondaryBTN} onClick={()=>setGuideTrig(true)}>Add Guides</div>
            </>}

            {/* list flights on this day */}

            <div type="submit" className={styles.submitDayBTN} 
                onClick={()=>{
                    if(props.editDayTrigger){
                        // wtf how does this work?
                        let tempList = props.aTour.dayByDay.splice(props.editDayTrigger-1, 1, aTravelDay)
                        setTravelDay({
                            "dayInclusions":[
                                "private Transfers",
                                "guide Services",
                            ],
                            "flightData":[],
                            "guideData":[],
                        })
                        props.setEditDayTrig(false)
                    } else {
                        let tempList=props.aTour.dayByDay.concat(aTravelDay)
                            props.setTourModel({
                                ...props.aTour,
                                "dayByDay": tempList
                            })
                        // set default day
                        setTravelDay({
                            "dayInclusions":[
                                "private Transfers",
                                "guide Services",
                            ],
                            "flightData":[],
                            "guideData":[],
                        })
                    }
                    document.getElementById("theDayFormID").reset()
                }}>
                {props.editDayTrigger? <>
                    Change day {props.editDayTrigger}
                </> : <>
                    Add Day to Itinerary
                </>}
            </div>
        </form>
    </>)
}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
// used in Tour Editor
export function EditDayByDay(props){
    let editingTour = {...props.aTour}
    const [aTravelDay, setTravelDay] = useState({
        "dayInclusions":[
            "private Transfers",
            "guide Services",
        ],
        "flightData":[],
        "guideData":[],
    })
    const [incluPlaceholder, setPlaceholder]=useState("")
    const [dayIndex, setDayIndex]=useState(false)
    const [addDayTrig, setAddDayTrig] = useState(false)
    const [flightTrigger, setFlightTrigger]=useState(false)
    const [flightInfoObj, setFlightObj]=useState({})
    const [guideInfoObj, setGuideObj]=useState({})
    const [guideTrigger, setGuideTrig]=useState(false)
    useEffect(()=>{
        setTravelDay({
            ...aTravelDay,
            ...editingTour.dayByDay[dayIndex]
        })
    },[dayIndex])
    
    let selectDayBTNS = editingTour.dayByDay.map((elem, i)=>
        <React.Fragment key={i}>
            <span onClick={()=>setDayIndex(i)}> D{i+1} </span>
        </React.Fragment>)

    let deleteDayBTNS = editingTour.dayByDay.map((elem, i)=><React.Fragment key={i}>
            <span onClick={()=>{
                let tempDayArr =[...editingTour.dayByDay]
                tempDayArr.splice(i, 1)
                props.setEditTemplate({
                    ...props.editTemplate,
                    "editKey": "dayByDay",
                    "editValue": tempDayArr
                })

            }}> D{i+1}</span>
    </React.Fragment> )

    return(<>
        {(dayIndex===false && addDayTrig===false) && <>
            <div className={styles.editDaysCont}> 
                <div className={styles.editDayOpts} ><div style={{width: "100px", textAlign:"start" }}>Edit Day(s):</div>{selectDayBTNS}</div>
                <div className={styles.editDayOpts} ><div style={{width: "100px", textAlign:"start" }}> Delete Day(s):</div>{deleteDayBTNS}</div>
                <div className={styles.editDayOpts} ><div style={{width: "100px", textAlign:"start" }}> Add Day:</div> <span onClick={()=>setAddDayTrig(true)}> &nbsp;+&nbsp; </span></div>
            </div>
            </>}

        
        {/* Edit Days */}
        {(dayIndex || dayIndex===0)&&<>
            <div style={{display:"flex", justifyContent:"space-between", width:"100%" }}> 
                <strong>Edit Day {dayIndex+1}:</strong>
                <div style={{border: "solid 2px black", borderRadius: "50%", padding:"1px 6px" }} onClick={()=>setDayIndex(false)}> X </div>
            </div> 
        

            {anInputDisplayer("Day Title", "dayTitle", "text", true, editingTour.dayByDay[dayIndex].dayTitle, aTravelDay, setTravelDay )}

            {aTextArea("Day detail", "dayDescription", true, editingTour.dayByDay[dayIndex].dayDescription, aTravelDay, setTravelDay)}

            {inputToList("add to day", "dayInclusions", aTravelDay, setTravelDay, aTravelDay.dayInclusions, incluPlaceholder, setPlaceholder)}

            {anInputDisplayer("Overnight Property", "overnightProperty", "text", true, editingTour.dayByDay[dayIndex].overnightProperty, aTravelDay, setTravelDay )}


            {/* flights and guides */}

            <div style={{width:"100%" }}>
                {flightDataDisplayer(aTravelDay,setTravelDay)}
            {flightTrigger? <>
                {flightsAdder(setTravelDay, aTravelDay, flightInfoObj, setFlightObj, setFlightTrigger )}: 
            </>:<>
                <div className={styles.secondaryBTN} onClick={()=>setFlightTrigger(true)}>Add Flights</div>
            </>}
            </div>

            <div style={{width:"100%"}}>
                {guideDataDisp(aTravelDay,setTravelDay)}
            {guideTrigger? <>
                {guideAdder(guideInfoObj, setGuideObj, aTravelDay, setTravelDay, setGuideTrig)}
            </>:<>
                <div className={styles.secondaryBTN} onClick={()=>setGuideTrig(true)}>Add Guides</div>
            </>}
            </div>


            <div className={styles.editDayBTN} 
            onClick={()=>{
                let tempDayArr =[...editingTour.dayByDay]
                tempDayArr.splice(dayIndex, 1, aTravelDay)
                props.setEditTemplate({
                    ...props.editTemplate,
                    "editKey": "dayByDay",
                    "editValue": tempDayArr
                })
                setDayIndex(false)
                setTravelDay({"dayInclusions":[]})

            }} > Day Ok? </div>
        </>}

        {/* Add Day */}
        {addDayTrig&& <> 
            <div style={{display:"flex", justifyContent:"space-between", width:"100%" }}> 
                <strong>Add Day:</strong>
                <div style={{border: "solid 2px black", borderRadius: "50%", padding:"1px 6px" }} onClick={()=>setAddDayTrig(false)}> X </div>
            </div>  

            {anInputDisplayer("Day Title", "dayTitle", "text", true, "Day Title", aTravelDay, setTravelDay )}

            {aTextArea("Day detail", "dayDescription", true, "Day Description", aTravelDay, setTravelDay)}

            {inputToList("add to day", "dayInclusions", aTravelDay, setTravelDay, aTravelDay.dayInclusions, incluPlaceholder, setPlaceholder)}

            {anInputDisplayer("Overnight Property", "overnightProperty", "text", true, 'Overnight Property', aTravelDay, setTravelDay )}

            <div className={styles.editDayBTN} onClick={()=>{
                let tempDayArr = editingTour.dayByDay.concat(aTravelDay)
                props.setEditTemplate({
                    ...props.editTemplate,
                    "editKey": "dayByDay",
                    "editValue": tempDayArr
                })
            }}>
                Day Ok?
            </div>  
        </>}
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
