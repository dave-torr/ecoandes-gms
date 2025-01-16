import React from "react"
import { useState, useEffect } from "react"

import Image from "next/image"

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CancelIcon from '@mui/icons-material/Cancel';
import Switch from '@mui/material/Switch';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import TextField from '@mui/material/TextField';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import {anImageDisp} from "../pages/gms/pix"

import FormControlLabel from '@mui/material/FormControlLabel';

//////////////////////////////////////////////////////////
import styles from "../styles/components/forms.module.css"
import { CircularProgress, Dialog } from "@mui/material";
import { TextEditor } from "./textEditor";

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
export function anInputDisplayer(inputLabel, inputId, inputType, isReq, inputValue, anObject, setAnObject, numbMin, numbMax, inputPlaceholder ){
    return(<>
        <div className={styles.theInputContainer}>
            <div className={styles.anInputRow}>
                <label htmlFor={inputId} className={styles.inputLabel}>   
                    {inputLabel} {isReq&&<>*</>} </label>
                <i> &nbsp; - &nbsp; {inputType} </i>
            </div>
            <input
                className={styles.inputUserUI}
                type={inputType}
                required={isReq}
                step="any"
                defaultValue={inputValue ? inputValue : undefined }
                placeholder={inputPlaceholder ? inputPlaceholder : undefined}
                id={inputId}
                // onFocus={(e)=>{e.target.value=""}}
                onChange={(e)=>{
                    e.preventDefault()
                    let theValue
                    if(inputType==="number"){
                        theValue = parseFloat(e.target.value)
                    } else {
                        theValue = e.target.value
                    }
                    setAnObject({
                        ...anObject,
                        [inputId]:theValue
                    })
                }}
                min={numbMin ? numbMin : 0 }
                max={numbMax ? numbMax : undefined }
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
                {elem} &nbsp; <HighlightOffIcon />
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
export function aDropdownPicker(theOptsArr, inputLabel, inputId, anObject, setAnObject, optLabelArr, inputLabelSwitch,  ){

    let theOptions

    if (optLabelArr){
        theOptions=theOptsArr.map((elem,i)=><React.Fragment key={i}> 
        <option value={elem}>{optLabelArr[i]} </option></React.Fragment>)
    } else {
        theOptions=theOptsArr.map((elem,i)=><React.Fragment key={i}> 
        <option value={elem}>{elem}</option></React.Fragment>)
    }

    return(<>
        <div className={styles.theInputContainer}>
            <div className={styles.anInputRow}>
                <label htmlFor={inputId} className={styles.inputLabel}>   
                    {inputLabel}</label>
                {inputLabelSwitch&&<><i> &nbsp; - &nbsp; single option picker </i></>} 
            </div>
            <select className={styles.inputUserUI}
            onChange={(e)=>{
                e.preventDefault()
                    if(inputId){

                    setAnObject({
                        ...anObject,
                        [inputId]: e.target.value
                    })
                    } else {
                        setAnObject(e.target.value)
                    }
                }}> 
                <option disabled selected > Select a {inputLabel}</option>
                {theOptions}
            </select>
        </div>
    </>) 
}

export function multiLineTextInput(theLabel, inputId, isReq, inputValue, anObject, setAnObject ){

    return(<>
        <div className={styles.theTextArea}>
            <div className={styles.anInputRow}>
                <label htmlFor={`${inputId}Input`} className={styles.inputLabel}>   
                    {theLabel}</label>
                <i> &nbsp; - &nbsp; "text" </i>
            </div>
            <TextField
                required={isReq}
                id={`${inputId}Input`}
                multiline
                rows={5}
                fullWidth
                defaultValue={inputValue}
                variant="standard"
                onChange={(e)=>{
                    e.preventDefault()
                    let theValue = e.target.value
                    setAnObject({
                        ...anObject,
                        [inputId]:theValue
                    })
                }}
            />
        </div>
    </>)
}

export function aSwitcher(switcherController, anObject, setAnObject, objectElemKey, switchTrigger, switchLabel ){
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
                    onChange={handleChange} />} label={switchLabel} 
                />            
        </div>
    </>)

}

export function aTextArea(inputLabel, inputId, isReq, inputValue, anObject, setAnObject, placeholderz ){
    return(<>
        <div className={styles.theInputContainer}>
            <div className={styles.anInputRow}>
                <label htmlFor={`${inputId}Input`} className={styles.inputLabel}>   
                    {inputLabel}</label>
                <i> &nbsp; - &nbsp; textarea </i>
            </div>            
            <textarea
                required={isReq}
                className={styles.aDayDescriptionInput}
                id={`${inputId}Input`}
                defaultValue={inputValue ? inputValue : undefined }
                placeholder={placeholderz ? placeholderz : undefined}
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
        let tempList
        if(theListe?.length>=0){
            tempList=theListe.concat(incluPlaceholder)
        } else {
            tempList=[incluPlaceholder]
        }

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
        <div style={{display:"flex", width:"200px"}}> 
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


// used in Tour Creator, Export to Tours, here only templates for forms


// NOT OP with days. upon edit, title or description gets erased, wtf
export function EditDayByDay(props){
    let editingTour = {...props.aTour}
    const [aTravelDay, setTravelDay] = useState({
        "dayInclusions":[
            "private Transfers",
            "guide Services",
        ],
        "flightData":[],
        "guideData":[],
        "imgArr":[]
    })
    const [incluPlaceholder, setPlaceholder]=useState("")
    const [dayIndex, setDayIndex]=useState(false)
    const [addDayTrig, setAddDayTrig] = useState(false)

    const [autofillTrig, setAutoFillTrig]=useState(false)
    const [addImgTrig, setImgTrig]=useState(false)
    const [autoFillData, setAutoFillData]=useState(false)
    const [locSelection, setLocSelection]=useState(false)
    const [autofillOpts, setAutofillOps]=useState(false)
    const [fetchedImgs, setFetchedIMGs]=useState(false)
    const [mealPlaceholder, setMealPlaceholder]=useState()

    useEffect(()=>{
        (async ()=>{
            const res = await fetch("/api/genToolkit/pixApi",{
                method: "GET"
            })
            const imageFetcher = await res.json()
            if(res.status===200){
                setFetchedIMGs(imageFetcher)
            }
            const res2 = await fetch("/api/gms/dayByDayDB", {
                method: "GET"
            })
            const docData = await res2.json()
            if(res2.status===200){
                setAutoFillData(docData)
            }
        })()
    },[])
    useEffect(()=>{
        if(locSelection){
            let filteringArr = autoFillData.filter((elem=> elem.location === locSelection))
            let sortedArr = filteringArr.sort((a,b)=>{
                const titleA = a.title.toUpperCase()
                const titleB = b.title.toUpperCase()
                if(titleA < titleB){
                    return -1;
                } 
                if(titleA > titleB){
                    return 1;
                } 
                return 0
            })
            setAutofillOps(sortedArr)
        }
    },[locSelection])
    useEffect(()=>{
        setTravelDay({
            ...aTravelDay,
            ...editingTour.dayByDay[dayIndex]
        })
    },[dayIndex])

    const mealsIncludedTool=()=>{
        
        let mealOpts=[
            "breakfast",
            "breakfastBox",
            "brunch",
            "lunch",
            "snack",
            "dinner",
            "other"
        ]

        return(<>
            <label className={styles.inputLabel} htmlFor="mealInput" > Add Meals </label>
            <select className={styles.inputUserUI} id="mealInput" onChange={(e)=>{
                setMealPlaceholder({
                    ...mealPlaceholder,
                    "meal": e.target.value
                })
            }}>
                <option selected disabled >Choose a meal </option>
                {mealOpts.map((elem, i)=><React.Fragment key={i}>
                    <option value={elem}>{elem} </option>
                </React.Fragment> )}
            </select>
            {mealPlaceholder?.meal && <>
                <label className={styles.inputLabel} htmlFor="mealInput" > add {mealPlaceholder?.meal} at: </label>
                <input className={styles.inputUserUI} type="text" placeholder="Location of Meal" onChange={(e)=>{
                    setMealPlaceholder({
                        ...mealPlaceholder,
                        "location": e.target.value
                    })
                }}/>
                <div className={styles.addFromRecordBTN} onClick={()=>{
                    let tempArr
                    if(aTravelDay.meals?.length>0){
                        tempArr = aTravelDay.meals.concat(mealPlaceholder)
                    } else {
                        tempArr=[mealPlaceholder]
                    }
                    setTravelDay({
                        ...aTravelDay,
                        "meals": tempArr
                    })
                    setMealPlaceholder()
                    let tempDoc = document.getElementById("mealInput")
                    tempDoc.value=""
                }}> Add Meal +</div>
                <br/>
            </>}
            <br/>
            {aTravelDay.meals?.length>0 &&
            <>
                {aTravelDay.meals.map((elem,i)=><React.Fragment key={i}>
                <div className={styles.spaceBetRow} style={{textTransform:"capitalize", padding:"6px 0" }}> 
                    <span >
                    {elem.meal} @ {elem.location}
                    </span>
                    <span onClick={()=>{
                        if(aTravelDay.meals.length===1){
                            setTravelDay({
                                ...aTravelDay,
                                "meals": []
                            })
                        } else {
                            let tempArr = aTravelDay.meals.splice(i, 1)
                            setTravelDay({
                                ...editingTour.dayByDay[dayIndex],
                                "meals": tempArr
                            })
                        }
                    }}><CancelIcon/> </span>
                </div>
                </React.Fragment> )}
            </>}
        </>)
    } 
    const autofillSelector=(theGeneralLocat)=>{
        let locArr = []
        if(theGeneralLocat){
            theGeneralLocat?.forEach(element => {
                const findContact = locArr.find(elemental=> elemental === element.location)
                if(!findContact){
                    locArr.push(element.location)
                }
            })
        }
        return(<>
            <div className={styles.autofillCont}>
            <div style={{display:"flex", justifyContent:"space-between", width:"100%" }}> 
                <h2>Autofill Day</h2>
                <div onClick={()=>setAutoFillTrig(false)} > <HighlightOffIcon/> </div>
            </div>
            {theGeneralLocat ? <>
                <label htmlFor="LocationDropdown" className={styles.inputLabel}>
                    Select General Location
                </label>
                <select id="LocationDropdown" onChange={(e)=>{
                    setLocSelection(`${e.target.value}`)
                }} >
                    <option selected disabled >Select a location </option>
                    {locArr.map((elem,i)=><React.Fragment key={i}>
                    <option value={elem} > {elem} </option>
                </React.Fragment> )}
                </select>
                {autofillOpts && <>
                <div className={styles.autofillGrid}> 
                <label className={styles.inputLabel}> Pick a description to add to day </label> <br/>
                    {autofillOpts.map((elem,i)=><React.Fragment key={i}>
                        <div className={styles.eachAutoFill} >
                            <div style={{width: "25%"}}> 
                                {elem.title} 
                                <br/>
                                <div className={styles.addFromRecordBTN} onClick={()=>{
                                    setTravelDay({
                                        ...aTravelDay,
                                        "dayTitle": elem.title,
                                        "dayDescription": elem.description
                                    })
                                    setAutoFillTrig(false)
                                    setLocSelection(false)
                                }}> 
                                    + add to day
                                </div>
                            </div>
                            <div style={{width: "75%", textTransform:"capitalize" }}> 
                                {elem.description} 
                            </div>
                        </div>
                    </React.Fragment> )}
                </div>
                </> }
            </>:<>
                <CircularProgress />
            </> }
            </div>
        </>)
    }
    const imgSelector=(fetchedImgs)=>{
        let aPickerImg= fetchedImgs.map((elem, i)=>
        <React.Fragment key={i}>
            <div className={styles.eachImgDisp}>
                {anImageDisp(elem.src, 150, "LTCWide", elem.imgAlt)}
                <div className={styles.imgSelectorBTN} onClick={()=>{
                    // addToItinImgArr
                    let tempImgArr = aTravelDay.imgArr.concat(elem.src)
                    setTravelDay({
                        ...aTravelDay,
                        "imgArr": tempImgArr
                    })

                    let tempList = [...fetchedImgs]
                    tempList.splice(i, 1)
                    setFetchedIMGs(tempList)
                }} >  +  </div>
                <div className={styles.imgRefData}>
                    <div>{elem.imgCountry}</div>
                    <div>{elem.imgRegion}</div>
                    <div>{elem.imgName}</div>
                    <div>{elem.locationDetails}</div>
                </div>
            </div>
        </React.Fragment>)
        return(<>
            <div style={{display:"flex", justifyContent:"space-between", width:"100%" }}> 
                <h2>Add Images</h2>
                <div onClick={()=>setImgTrig(false)} > <HighlightOffIcon/> </div>
            </div>
            {aTravelDay.imgArr.length>0 && <>
            <strong> SELECTED IMAGES: </strong>
            <div className={styles.selectedImgCont}>
                {aTravelDay.imgArr.map((elem,i)=><React.Fragment key={i}>
                <div className={styles.eachSelectedImg}>
                    <div className={styles.cancelImg} onClick={()=>{
                        let tempImgArr = aTravelDay.imgArr.splice(i, 1)
                        setTravelDay({
                            ...aTravelDay,
                            "imgArr": aTravelDay.imgArr
                        })

                    }}>
                    <HighlightOffIcon/></div>
                    {anImageDisp(elem, 150, "LTCWide", elem)}
                </div>
                </React.Fragment>)}
            </div></>}

            <strong> ADD IMAGES: </strong>
            <div className={styles.imgPickerCont} >
                {aPickerImg}
            </div>
        </>)
    }
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
                <div className={styles.editDayOpts} ><div style={{width: "100px", textAlign:"start" }}>Edit Day:</div>
                    {selectDayBTNS}</div>
                <div className={styles.editDayOpts} ><div style={{width: "100px", textAlign:"start" }}> Delete Day(s):</div>
                    {deleteDayBTNS}</div>
                <div className={styles.editDayOpts} ><div style={{width: "100px", textAlign:"start" }}> Add Day:</div> <span onClick={()=>setAddDayTrig(true)}> 
                    &nbsp;+&nbsp; </span></div>
            </div>
        </>}

        
        {/* Edit Days */}
        {(dayIndex || dayIndex===0)&&<>
            {addImgTrig? <>
                {imgSelector(fetchedImgs)}
            </>:<> 
                <div style={{display:"flex", justifyContent:"space-between", width:"100%" }}> 
                    <strong>Edit Day {dayIndex+1}:</strong>
                    <span onClick={()=>{
                        setDayIndex(false)
                    }} > <HighlightOffIcon/>
                    </span>
                </div>
                <div className={styles.addFromRecordBTN} onClick={()=>{
                    setImgTrig(true)
                }}> <AddPhotoAlternateIcon/> &nbsp; Add Image </div>
                {anInputDisplayer("Day Title", "dayTitle", "text", true, editingTour.dayByDay[dayIndex].dayTitle, aTravelDay, setTravelDay )}

                {editingTour.richText? <> 
                    <TextEditor
                        tempObj={aTravelDay}
                        setTempObj={setTravelDay}
                        inputIndex={"dayDescription"}
                        inputLabel={"Day Detail"}
                        prevState={editingTour.dayByDay[dayIndex].dayDescription}
                    />
                </>:<> 
                    {aTextArea("Day detail", "dayDescription", true, editingTour.dayByDay[dayIndex].dayDescription, aTravelDay, setTravelDay)}
                </>}



                {inputToList("add to day", "dayInclusions", aTravelDay, setTravelDay, aTravelDay.dayInclusions, incluPlaceholder, setPlaceholder)}

                {anInputDisplayer("Overnight Property", "overnightProperty", "text", true, editingTour.dayByDay[dayIndex].overnightProperty, aTravelDay, setTravelDay)}
                
                {anInputDisplayer("Supplementary Information", "suppInfo", "text", true, editingTour.dayByDay[dayIndex].suppInfo, aTravelDay, setTravelDay)}

                {anInputDisplayer("Driving distance", "drivingDistance", "text", true, editingTour.dayByDay[dayIndex].drivingDistance, aTravelDay, setTravelDay)}

                {mealsIncludedTool()}
            
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
                        setTravelDay({
                            "dayInclusions":[
                                "private Transfers",
                                "guide Services",
                            ],
                            "flightData":[],
                            "guideData":[],
                            "imgArr":[]
                        })
                    }} >
                    Save Day </div>
            </>}
        </>}


        {/* This might be the starting point */}

        {/* Add Day */}
        {addDayTrig&& <> 
            {autofillTrig? <>
                {autofillSelector(autoFillData)}
            </>: addImgTrig? <>
                {imgSelector(fetchedImgs)}
            </>: <> 
                <div style={{display:"flex", justifyContent:"space-between", width:"100%" }}> 
                    <strong>Add Day:</strong>
                    <div onClick={()=>{
                        setAddDayTrig(false)
                        setImgTrig(false)
                        setAutoFillTrig(false)
                        }} > <HighlightOffIcon/> </div>
                </div>
                <div className={styles.spaceBetRow}>
                    <div className={styles.addFromRecordBTN} onClick={async()=>{
                            setImgTrig(true)
                        }}> <AddPhotoAlternateIcon/> &nbsp; Add Image </div>
                    <div className={styles.addFromRecordBTN} onClick={async()=>{
                            setAutoFillTrig(true)
                        }}> <PlaylistAddIcon/> &nbsp; Autofill </div>
                </div>

                {anInputDisplayer("Day Title", "dayTitle", "text", true, aTravelDay.dayTitle, aTravelDay, setTravelDay, undefined, undefined, "Day Title" )}

                {aTextArea("Day detail", "dayDescription", true, aTravelDay.dayDescription, aTravelDay, setTravelDay, undefined, undefined, "Day Description")}

                {inputToList("add to day", "dayInclusions", aTravelDay, setTravelDay, aTravelDay.dayInclusions, incluPlaceholder, setPlaceholder)}

                {anInputDisplayer("Overnight Property", "overnightProperty", "text", true, 'Overnight Property', aTravelDay, setTravelDay )}

                {anInputDisplayer("Supplementary Information", "suppInfo", "text", true, aTravelDay.suppInfo, aTravelDay, setTravelDay)}

                {anInputDisplayer("Driving distance", "drivingDistance", "text", true, aTravelDay.drivingDistance, aTravelDay, setTravelDay)}

                <br/>

            <br/>
            <h2> Add day as:</h2>
            <div className={styles.addDayBTNCont}>
                {editingTour.dayByDay.map((elem,i)=> <React.Fragment key={i} >
                <span className={styles.editDayBTN} onClick={()=>{
                    let tempDayArr = editingTour.dayByDay.splice(i, 0, aTravelDay)
                    props.setEditTemplate({
                        ...props.editTemplate,
                        "editKey": "dayByDay",
                        "editValue": editingTour.dayByDay
                    })
                }}> 
                    {i===0 ?<> 
                        Starting Day
                    </>:<>
                        Between Day {i} & {i+1}
                    </> }
                </span>
                </React.Fragment>)}

                <div className={styles.editDayBTN} onClick={()=>{
                    let tempDayArr = editingTour.dayByDay.concat(aTravelDay)
                    props.setEditTemplate({
                        ...props.editTemplate,
                        "editKey": "dayByDay",
                        "editValue": tempDayArr
                    })
                }}>
                    Add Day as last day
                </div>
            </div>  
            </>}
        </>}
    </>)
}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
export function EditPrices(props){
    let editingTour = {...props.aTour}
    const [editIndex, setEditIndex]=useState(0)
    const [editingPackage, setEditingPackage] = useState({})
    const [priceRangeObj, setPriceObj]=useState({})
    const [priceFixedDep, setPriceFDTrig]=useState(true)

    useEffect(()=>{
        if(editingTour.price){
            setEditingPackage({
                ...editingPackage,
                "price": editingTour.price
            })
        }
        if(editingTour?.price?.length>0){
            setPriceFDTrig(false)
        }
    },[])


    // Concat and splicer function with bugz
    const eachPriceDispEdit=()=>{
    return(<>
        <div style={{display:"flex"}}>
            <Switch checked={priceFixedDep} onChange={(e)=>{priceFixedDep? setPriceFDTrig(false):setPriceFDTrig(true) }} />
            <h4>Single Price?</h4>
        </div>
        {priceFixedDep? <>
                <div className={styles.spaceBetRow}>
                    {anInputDisplayer("F.D. Price", "price", "number", false, undefined, editingPackage, setEditingPackage, 0, undefined, "price per person")} &nbsp;&nbsp;
                    {anInputDisplayer("S. Supp", "singleSupp", "number", false, undefined, editingPackage, setEditingPackage, 0, undefined, "Single Supplement" )}
                </div>
                <div className={styles.spaceBetRow}>
                    {anInputDisplayer("Pax Min", "paxMin", "number", false, undefined, editingPackage, setEditingPackage, 0, undefined, "Pax Nimimum")} &nbsp;&nbsp;
                    {anInputDisplayer("Pax Max", "paxMax", "number", false, undefined, editingPackage, setEditingPackage, 0, undefined, "Pax Number")}
                </div>
            </>:<>
                <h4>ADD TO RANGE: </h4>
                <div className={styles.spaceBetRow}>
                    <div style={{width:"48%"}}>
                        {anInputDisplayer("Price", "pricePerPax", "number", false, undefined, priceRangeObj, setPriceObj, 0, undefined, "price per person")}
                        {anInputDisplayer("Pax Max", "upperRange", "number", false, undefined, priceRangeObj, setPriceObj, 0, undefined, "Pax Number")}
                        <div className={styles.editPriceBTN} onClick={()=>{
                            if((priceRangeObj.upperRange && priceRangeObj.pricePerPax)){
                                let tempArr = []
                                if(editingPackage.price?.length>0){
                                    tempArr= [...editingPackage.price]
                                    tempArr.push(priceRangeObj)
                                    setEditingPackage({
                                        ...editingPackage,
                                        "price": tempArr
                                    })
                                    let priceVal = document.getElementById("pricePerPax")
                                    priceVal.value=undefined
                                    let guestLimitVal = document.getElementById("upperRange")
                                    guestLimitVal.value=undefined
                                } else {
                                    tempArr.push(priceRangeObj)
                                    setEditingPackage({
                                        ...editingPackage,
                                        "price": tempArr
                                    })
                                    let priceVal = document.getElementById("pricePerPax")
                                    priceVal.value=undefined
                                    let guestLimitVal = document.getElementById("upperRange")
                                    guestLimitVal.value=undefined
                                }
                            } else {
                                window.alert("Please fill in Price and guest upper limit")
                            }
                        }}> Add to Price Range </div>
                        {anInputDisplayer("S. Supp", "singleSupp", "number", false, undefined, editingPackage, setEditingPackage, 0, undefined, "Single Supplement" )}
                    </div>
                    <div style={{width:"48%"}}>
                        {editingPackage.price?.length>0 && <>
                            <table className={styles.priceTable}>
                                {editingPackage.price.map((elem,i)=><React.Fragment key={i} >
                                    <tr style={{display:"flex"}} >
                                    <td style={{width:"80px"}}>{elem.upperRange} Pax </td>
                                    <td>${elem.pricePerPax}</td>
                                    <div onClick={()=>{
                                        // if(editingPackage.price.length>1){
                                            let splicer = editingPackage.price.splice(i, 1)
                                            setEditingPackage({
                                                ...editingPackage,
                                                "price": editingPackage.price
                                            })

                                    }} ><CancelIcon/> </div>
                                    </tr>
                                </React.Fragment> )}
                            </table>
                        </>}
                    </div>
                </div>                
            </>}







        {/* <div style={{ width:"45%" }}>
            {anInputDisplayer("Price", "pricePerPax", "number", false, undefined, priceRangeObj, setPriceObj, 0, undefined, "price per person")}
        </div>
        <div style={{ width:"45%" }}>
            {anInputDisplayer("Pax Max", "upperRange", "number", false, undefined, priceRangeObj, setPriceObj, 0, undefined, "Pax Number")}
        </div>
        <div className={styles.editPriceBTN} onClick={()=>{
            if((priceRangeObj.upperRange && priceRangeObj.pricePerPax)){
                let tempArr = []
                if(editingTour.price?.length>0){
                    tempArr= [...editingTour.price]
                    tempArr.push(priceRangeObj)
                    console.log(tempArr, "TempArr")
                    setEditingPackage({
                        ...editingPackage,
                        "price": tempArr
                    })
                    let priceVal = document.getElementById("pricePerPax")
                    priceVal.value=undefined
                    let guestLimitVal = document.getElementById("upperRange")
                    guestLimitVal.value=undefined
                } else {
                    tempArr.push(priceRangeObj)
                    setEditingPackage({
                        ...editingPackage,
                        "price": tempArr
                    })
                    let priceVal = document.getElementById("pricePerPax")
                    priceVal.value=undefined
                    let guestLimitVal = document.getElementById("upperRange")
                    guestLimitVal.value=undefined
                }
            } else {
                window.alert("Please fill in Price and guest upper limit")
            }
        }}> Add to Price Range </div>
        <br/>
        <div className={styles.spaceBetRow }> 

            {editingPackage?.price?.length>0 && <>
                <table className={styles.priceTable} >
                    {editingPackage.price.map((elem,i)=><React.Fragment key={i} >
                    <div className={styles.spaceBetRow}>
                        <tr>
                            <td>{elem.upperRange} Pax </td>
                            <td>${elem.pricePerPax}</td>
                        </tr>
                        <div onClick={()=>{
                            if(editingPackage.price.length>1){
                                let splicer = editingPackage.price.splice(i, 1)
                                setEditingPackage({
                                    ...editingPackage,
                                    "price": editingPackage.price
                                })
                            } else {
                                setEditingPackage({
                                    ...editingPackage,
                                    "price": undefined
                                })
                            }
                        }} ><CancelIcon/> </div>
                    </div>
                    </React.Fragment> )}


                </table>
            </>}

            <span style={{width:"200px"}}> 
                {anInputDisplayer("Single Supp", "singleSupp", "number", false, editingTour.singleSupp, editingPackage, setEditingPackage )}
            </span>
        </div> */}





    <div className={styles.submitBTN} onClick={()=>{
        setEditIndex(1)
    }}> Edit Prices </div>
    </>)}

    // display current pricing table or FD price
    return(<>
        {editIndex===0&&<>
            <div className={styles.editPricesCont}>
                {Number.isInteger(editingTour.price)? <>
                    <h2>Edit Fixed Departure Single Price:</h2>
                    <div className={styles.spaceBetRow}>
                        <span style={{width:"250px"}}> 
                            {anInputDisplayer("price", "price", "number", false, editingTour.price, editingPackage, setEditingPackage )}
                        </span>
                        <span style={{width:"200px"}}> 
                            {anInputDisplayer("Single Supp", "singleSupp", "number", false, editingTour.singleSupp, editingPackage, setEditingPackage )}
                        </span>

                    </div>
                    <div className={styles.spaceBetRow}>
                        <span style={{width:"150px"}}> 
                            {anInputDisplayer("Pax Min", "paxMin", "number", false, editingTour.paxMin, editingPackage, setEditingPackage )}
                        </span>
                        <span style={{width:"150px"}}> 
                            {anInputDisplayer("Pax Max", "paxMax", "number", false, editingTour.paxMax, editingPackage, setEditingPackage )}
                        </span>
                    </div>
                    <div className={styles.editPriceBTN} onClick={()=>{
                        setEditIndex(1)
                    }}> Edit Prices </div>
                </>:<>
                    {eachPriceDispEdit(editingTour.price)}
                </>}
            </div>
        </>}

        {editIndex===1&&<>
            <div className={styles.editPriceBTN} onClick={async()=>{
                if(!props.loadingTrig){
                    props.setLoadingTrig(false)
                    let bePackage={
                        "_id":editingTour._id,
                        "editingObj":editingPackage
                    }
                    const res = await fetch("/api/gms/itineraries", {
                        method: "PUT",
                        body:JSON.stringify(bePackage)
                    })
                    const docData = await res.json()
                    if(res.status===200){
                        let tempTour ={
                            ...props.aTour,
                            ...editingPackage
                        }
                        props.editTour({
                            ...tempTour
                        })
                        let splicer = props.itinArr.splice(props.itinIndex,1,tempTour)
                        window.alert("Price Edited")
                        props.setItinArr(props.itinArr)
                        props.setDialogTrig(false)
                        props.setLoadingTrig(false)
                        props.setEditStep(0)
                    }
                }
            }}> 
                {props.loadingTrig?<>
                    <CircularProgress/>
                </>:<>
                    Update itinerary prices? 
                </> }
            </div>
        </>}
    </>)
}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
export function DayByDayAdder(props){

    // SEND TO OPERATIONS:
    //  Transfer pickup data: pickUpLocation & estTime

    const [incluPlaceholder, setPlaceholder]=useState("")
    const [autofillTrig, setAutoFillTrig]=useState(false)
    const [locSelection, setLocSelection]=useState(false)
    const [autofillOpts, setAutofillOps]=useState()
    const [imageAddTrig, setImgTrig]=useState(false)
    const [mealPlaceholder, setMealPlaceholder]=useState("")


    useEffect(()=>{
        if(locSelection){
            let filteringArr = autoFillData.filter((elem=> elem.location === locSelection))
            let sortedArr = filteringArr.sort((a,b)=>{
                const titleA = a.title.toUpperCase()
                const titleB = b.title.toUpperCase()
                if(titleA < titleB){
                    return -1;
                } 
                if(titleA > titleB){
                    return 1;
                } 
                return 0
            })
            setAutofillOps(sortedArr)
        }
    },[locSelection])

    
    const autofillSelector=(theGeneralLocat)=>{
        let locArr = []
        if(theGeneralLocat){
            theGeneralLocat?.forEach(element => {
                const findContact = locArr.find(elemental=> elemental === element.location)
                if(!findContact){
                    locArr.push(element.location)
                }
            })
        }
        return(<>
            <Dialog open={autofillTrig} maxWidth="xl" onClose={()=>setAutoFillTrig(false)}>
                <div className={styles.autofillCont} style={{ minWidth: "550px", padding:"21px" }}> 
                    <h2>Autofill Day {props.aTour.dayByDay?.length + 1} </h2>
                    {theGeneralLocat ? <>
                        <label htmlFor="LocationDropdown" className={styles.inputLabel}>
                            Select General Location
                        </label>
                        <select id="LocationDropdown" onChange={(e)=>{
                            setLocSelection(`${e.target.value}`)
                        }} >
                            <option selected disabled >Select a location </option>
                            {locArr.map((elem,i)=><React.Fragment key={i}>
                            <option value={elem} > {elem} </option>
                        </React.Fragment> )}
                        </select>

                        {autofillOpts && <>
                        <div className={styles.autofillGrid}> 
                        <label className={styles.inputLabel}> Pick a description to add to day </label> <br/>
                            {autofillOpts.map((elem,i)=><React.Fragment key={i}>
                                <div className={styles.eachAutoFill} >
                                    <div style={{width: "25%"}}> 
                                        {elem.title} 
                                        <br/>
                                        <div className={styles.addFromRecordBTN} onClick={()=>{
                                            props.setTravelDay({
                                                ...props.aTravelDay,
                                                "dayTitle": elem.title,
                                                "dayDescription": elem.description
                                            })
                                            setAutoFillTrig(false)
                                        }}> 
                                            + add to day
                                        </div>
                                    </div>
                                    <div style={{width: "75%", textTransform:"capitalize" }}> 
                                        {elem.description} 
                                    </div>
                                </div>
                            </React.Fragment> )}
                        </div>
                        </> }
                    </>:<>
                        <CircularProgress />
                    </> }
                </div>
            </Dialog>
        </>)
    }



    const imageSelector=()=>{
        return(<>
        <Dialog open={imageAddTrig} maxWidth="xl" onClose={()=>setImgTrig(false)}>
        <div style={{ padding:"12px 18px" }}>
            {props.aTravelDay.imgArr.length>0 && <>
            <strong> SELECTED IMAGES: </strong>
            <div className={styles.selectedImgCont}>
                {props.aTravelDay.imgArr.map((elem,i)=><React.Fragment key={i}>
                <div className={styles.eachSelectedImg}>
                    <div className={styles.cancelImg} onClick={()=>{
                        let tempImgArr = props.aTravelDay.imgArr.splice(i, 1)
                        props.setTravelDay({
                            ...props.aTravelDay,
                            "imgArr": props.aTravelDay.imgArr
                        })

                    }}>
                    <HighlightOffIcon/></div>
                    {anImageDisp(elem, 150, "LTCWide", elem)}
                </div>
                </React.Fragment>)}
            </div></>}
            <div className={styles.imgPickerCont} >
                {aPickerImg}
            </div>
        </div>
        </Dialog>
        </>)
    }

    let aPickerImg= props.filteredImgArr?.map((elem, i)=>
        <React.Fragment key={i}>
            <div className={styles.eachImgDisp}>
                {anImageDisp(elem.src, 150, "LTCWide", elem.imgAlt)}
                <div className={styles.imgSelectorBTN} onClick={()=>{
                    // addToItinImgArr
                    let tempImgArr = props.aTravelDay.imgArr.concat(elem.src)
                    props.setTravelDay({
                        ...props.aTravelDay,
                        "imgArr": tempImgArr
                    })

                    let tempList = [...props.filteredImgArr]
                    tempList.splice(i, 1)
                    props.setFilteredImgs(tempList)

                }} >  +  </div>
                <div className={styles.imgRefData}>
                    <div>{elem.imgCountry}</div>
                    <div>{elem.imgRegion}</div>
                    <div>{elem.imgName}</div>
                    <div>{elem.locationDetails}</div>
                </div>
            </div>
        </React.Fragment>)

    const mealsIncludedTool=()=>{
        
        let mealOpts=[
            "breakfast",
            "breakfastBox",
            "brunch",
            "lunch",
            "lunchBox",
            "snack",
            "dinner",
            "other"
        ]

        return(<>
            <label className={styles.inputLabel} htmlFor="mealInput" > Add Meals </label>
            <select className={styles.inputUserUI} id="mealInput" onChange={(e)=>{
                setMealPlaceholder({
                    ...mealPlaceholder,
                    "meal": e.target.value
                })
            }}>
                <option selected disabled >Choose a meal </option>
                {mealOpts.map((elem, i)=><React.Fragment key={i}>
                    <option value={elem}>{elem} </option>
                </React.Fragment> )}
            </select>
            {mealPlaceholder?.meal && <>
                <label className={styles.inputLabel} htmlFor="mealInput" > add {mealPlaceholder?.meal} at: </label>
                <input className={styles.inputUserUI} type="text" placeholder="Location of Meal" onChange={(e)=>{
                    setMealPlaceholder({
                        ...mealPlaceholder,
                        "location": e.target.value
                    })
                }}/>
                <div className={styles.addFromRecordBTN} onClick={()=>{
                    let tempArr
                    if(props.aTravelDay.meals?.length>0){
                        tempArr = props.aTravelDay.meals.concat(mealPlaceholder)
                    } else {
                        tempArr=[mealPlaceholder]
                    }
                    props.setTravelDay({
                        ...props.aTravelDay,
                        "meals": tempArr
                    })
                    setMealPlaceholder()
                    let tempDoc = document.getElementById("mealInput")
                    tempDoc.value=""
                }}> Add Meal +</div>
                <br/>
            </>}
            <br/>
            {props.aTravelDay.meals?.length>0 &&
            <>
                {props.aTravelDay.meals.map((elem,i)=><React.Fragment key={i}>
                <div className={styles.spaceBetRow} style={{textTransform:"capitalize", padding:"6px 0" }}> 
                    <span >
                    {elem.meal} {elem.location&&<> @ -{elem.location} </>}
                    </span>
                    <span onClick={()=>{
                        if(props.aTravelDay.meals.length===1){
                            props.setTravelDay({
                                ...props.aTravelDay,
                                "meals": []
                            })
                        } else {
                            let tempArr = props.aTravelDay.meals.splice(i, 1)
                            props.setTravelDay({
                                ...props.aTravelDay,
                                "meals": tempArr
                            })
                        }
                    }}><CancelIcon/> </span>
                </div>
                </React.Fragment> )}
            </>}
        </>)
    }


    return(<>
        {autofillSelector(props.autoFillData)}
        {imageSelector()}
        <form style={{width:"100%"}} id="theDayFormID">
            <div className={styles.spaceBetRow}>
                {props.filteredImgArr.length>0&&<>
                    <div className={styles.addFromRecordBTN} onClick={async()=>{
                            setImgTrig(true)
                        }}> <AddPhotoAlternateIcon/> &nbsp; Add Image </div>
                </>}


            {/* Autofill trigger */}
                {/* {props.autoFillData?.length>0&&<>
                    <div className={styles.addFromRecordBTN} onClick={async()=>{
                            setAutoFillTrig(true)
                        }}> <PlaylistAddIcon/> &nbsp; Autofill </div>
                </>} */}


            </div>
            <div style={{ display: "flex", width:"100%", justifyContent:"space-between" }}> 
                <h3>Day {props.aTour.dayByDay?.length + 1}:</h3> 
                <div  className={styles.clearFormBTN} onClick={()=>{
                    const theTextArea = document.getElementById("dayDescriptionInput")
                    theTextArea.value=""
                    document.getElementById("theDayFormID").reset()
                }} >Clear Day </div>
            </div>
            
            {anInputDisplayer("Day Title", "dayTitle", "text", true, props.aTravelDay.dayTitle, props.aTravelDay, props.setTravelDay, undefined, undefined, "Main daily activity" )}
            <TextEditor
                tempObj={props.aTravelDay}
                setTempObj={props.setTravelDay}
                inputIndex={"dayDescription"}
                inputLabel={"Day Description"}
            />

            {inputToList("add to day", "dayInclusions", props.aTravelDay, props.setTravelDay, props.aTravelDay.dayInclusions, incluPlaceholder, setPlaceholder)}
            {mealsIncludedTool()}
            {anInputDisplayer("Overnight Property", "overnightProperty", "text", false, undefined, props.aTravelDay, props.setTravelDay, undefined, undefined, "Hotel / Lodge Name")}
            {anInputDisplayer("Supplementary Information", "suppInfo", "text", false, undefined, props.aTravelDay, props.setTravelDay, undefined, undefined, "Ex: Quito is at 2,800 meters")}
            {anInputDisplayer("Driving Distance", "drivingDistance", "number", false, undefined, props.aTravelDay, props.setTravelDay, 0, undefined, "Ex: 150 km")}

            <div className={styles.submitDayBTN} 
                onClick={()=>{
                    let tempList=props.aTour.dayByDay.concat(props.aTravelDay)
                        props.setTourModel({
                            ...props.aTour,
                            "dayByDay": tempList
                        })
                    // set default day
                    props.setTravelDay({
                        "dayDescription": "",
                        "dayInclusions":[
                            "private Transfers",
                            "guide Services",
                        ],
                        "flightData":[],
                        "guideData":[],
                        "imgArr":[]
                    })
                    document.getElementById("theDayFormID").reset()
                    window.scrollTo({
                        top: "30",
                        behavior: "smooth",
                    });
                }}>
                    Add Day to Itinerary
            </div>
        </form>
    </>)
}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
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

