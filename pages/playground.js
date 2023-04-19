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

    const [sampleDayTour, setDayTour]=useState({

    })

    const [aTourModel, setTourModel]=useState({
        "LTCLogo": true,
        "highlights":[],
        "dayByDay":[],
        "countryList":[],
        "imgArr":[],
    })

// OP for text, numbs, dates
    const anInputDisplayer=(inputLabel, inputId, inputType, isReq, inputPlaceholder, anObject, setAnObject, numbMin, )=>{
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

    const [aHighlight, setAHighlight]=useState('')
    const [highlightList, setHighlightList]=useState(["cucu on a List"])

    // OP for addint to list, displaying and erasing elems. Receives all arguments
    const addToList=(theList, setList, inputLabel, theElemToList, setElemToList)=>{
        let eachListElemDisplayer=theList.map((elem, i)=><React.Fragment key={i}>
            <li className={styles.eachListElemDisplayer}>
                - {elem} 
                <div className={styles.rmvHighlightBTN} 
                    onClick={()=>{
                        let tempList=[...theList];
                        tempList.splice(i, 1)
                        setList(tempList)
                    }}> 
                <HighlightOffIcon/> </div>
            </li>
        </React.Fragment>)

        const addToListFunct=()=>{
            let tempList=highlightList.concat(theElemToList)
            setList(tempList)
            setElemToList('')
        }

        return(<>
            <div className={styles.theInputContainer}>
                <div className={styles.anInputRow}>
                    <label htmlFor="addToList" className={styles.inputLabel}>   
                        {inputLabel}</label>
                    <i> &nbsp; - &nbsp; text </i>
                </div>
                <div className={styles.anInputRow}> 
                    <input
                        className={styles.inputUserUI}
                        type="text"
                        placeholder='Add here:'
                        id="addToList"
                        value={theElemToList}
                        onChange={(e)=>{
                            setElemToList(e.target.value)
                        }}
                    />
                    <div className={styles.addToListBTN} 
                    onClick={()=>addToListFunct()}> + </div>
                </div>
            </div>
            <div className={styles.listDisplayer}>
                <h3> {inputLabel} </h3>
                <div>
                    {theList.length>0?<>
                        {eachListElemDisplayer}
                    </>:<>
                        <div className={styles.listPlaceholder}>...add to {inputLabel}</div>
                    </>}
                </div>
            </div>
        </>)
    }

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// PICKER
// PICKER

    // Sample Table
    let someOptsArr=["cucu", "rice", "some", "soda"]
    // Sampleelem to be altered
    const [singlePickerElem, setPickerElem]=useState()

    const aDropdownPicker=(theOptsArr, inputLabel, inputId, setTheResult)=>{
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
                onChange={(e)=>{
                    e.preventDefault()
                    setTheResult(e.target.value)
                }}>
                    {theOptions}
                </select>
            </div>
        </>) 
    }

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// MULTI OPT SELECTION
// MULTI OPT SELECTION
    const [multiOptElem, setMultiOptElem]=useState([])
    
    const multiOptPicker=(theOptsArr, inputLabel, inputId, resultingList, addToSelection, setOptsArr)=>{

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
                            <div className={styles.listPlaceholder}>...add to {inputLabel}</div>
                        </>}
                    </div>
                </div>
            </div>
        </>)
    }
    const [tempOptArr, setTempOptArr]=useState(someOptsArr)

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// Image Picker for itins


const [fetchedImgArrs, setFetchedImgs]=useState()
const [filteredImgArr, setFilteredImgs]=useState()
const [loadingState, setLoadingState]=useState(false)
const [imgDestFilter, setImgFilter]=useState(0)

let imcCountry= ['all countries', "ecuador", 'peru', "chile", "argentina",]

useEffect(()=>{
    if(imgDestFilter){
        if(imgDestFilter==='all countries'){
            setFilteredImgs(fetchedImgArrs)
        } else {
            let tempArr = fetchedImgArrs.filter(elem=>elem.imgCountry===imgDestFilter)
            setFilteredImgs(tempArr)
        }

    } else if (!imgDestFilter){
        setFilteredImgs(fetchedImgArrs)
    }
},[imgDestFilter])



// Fetch Images for Itins
const imageFetcher=()=>{
    // align BTNS with rest of format
    // check display on itin picker
    // add filters per destination
    // add & rmv from img arr options

    if(!fetchedImgArrs) {return(<>
        <div onClick={async()=>{
            setLoadingState(true)
            const res = await fetch("/api/genToolkit/pixApi",{
                method: "GET"
            })
            const fetchedImages = await res.json()
            if(res.status===200){
                setFetchedImgs(fetchedImages)
                setFilteredImgs(fetchedImages)
                setLoadingState(false)
            }
        }} >
            {loadingState? <>
                <CircularProgress />
            </>:<>
                <div className={styles.fetchBTN}>
                    Fetch Itin Images 
                </div>
            </>}        
        </div>
    </>) } else {
        let aPickerImg= filteredImgArr.map((elem, i)=><React.Fragment key={i}>
            <div className={styles.eachImgDisp}>
                {anImageDisp(elem.src, 200, "LTCWide", elem.imgAlt)}
                <div className={styles.imgSelectorBTN} onClick={()=>{
                    // addToItinImgArr
                    // addIMGId to imgIDArr
                    console.log("cucu")
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
            <div style={{padding: "6px 12px"}}>
            <Select
                placeholder='Image Country'
                data={[...imcCountry]}
                onChange={setImgFilter}
                id="imgSelectUI"
            /></div>
            <div style={{textAlign: "end", padding: "6px 12px"}}>Images: {filteredImgArr.length} </div>
            <div className={styles.imgPickerCont} >
                {aPickerImg}
            </div>
        </>)
        }
    
}


////////////////////////////////////////////////////
////////////////////////////////////////////////////
// add team to DB

    let teamMembArr=[
{
"name":"Cristina Páez", 
"email":"operaciones2@ecoandestravel.com",
"userType":"sales",
"password":"@oper2016",
"company":"EcoAndes Travel",	
"department":"Operaciones", 
"role": "Planificación y Operaciones",	
"profilePic": "https://drive.google.com/file/d/1xBTjgJVXIxq_dNaj15uzWcmQHWTI6UDN/view?usp=share_link"
},

{
"name":"Carlos del Salto", 
"email":"operaciones3@ecoandestravel.com",
"userType":"operations",
"password":"@oper2016",
"company":"EcoAndes Travel",	
"department":"Operaciones",
"role": "Planificación y Operaciones",	
"profilePic": "https://drive.google.com/file/d/16mEMw407T5qQHszO_AI61hCFpcfPhDSx/view?usp=share_link"
},

{
"name":"Carolina Cruz", 
"email":"operaciones1@ecoandestravel.com",
"userType":"operations",
"password":"@oper2016",
"company":"EcoAndes Travel",	
"department":"Operaciones",	
"role": "Asistente de Operaciones",
"profilePic": "https://drive.google.com/file/d/13CxvrEY73gORXK3jNQYOKxyUlvoDsrAX/view?usp=share_link"
},

{
"name":"Cristina Caisapanta",	
"email":"info@ecoandestravel.com",
"userType":"sales",
"password":"@info2016",
"company":"EcoAndes Travel",	
"department":"Ventas",
"role": "Representante de ventas",	
"profilePic": "https://drive.google.com/file/d/12WQjBODVvGAibX3Yu_fvydX4GziF_Ms6/view?usp=share_link"
},

{
"name":"Jonathan Hernández", 
"email":"sales@yacuma.travel",
"userType":"sales",
"password":"@sale2016",
"company":"Yacuma EcoLodge",	
"department":"Ventas",
"role": "Representante de ventas",	
"profilePic": "https://drive.google.com/file/d/1ECLHdA4AIl_e7-xnGK3pQ9uyPEK7mXQF/view?usp=share_link"
},

{
"name":"Gabriela Mogrovejo", 
"email":"sales@galapagoselements.com",
"userType":"sales",
"password":"@sale2016",
"company":"Maexgal",
"department":"Ventas",
"role": "Representante de ventas",
"profilePic": "https://drive.google.com/file/d/1AycCaz4VkbxaTlutF2wDLCM--pXI57mr/view?usp=share_link"
},

{
"name":"Jaqueline Rivadeneira", 
"email":"ventas@unigalapagos.com",
"userType":"sales",
"password":"@vent2016",
"company":"Unigalapagos",	
"department":"Ventas",	
"role": "Representante de ventas",
"profilePic": "https://drive.google.com/file/d/1LClD67WvBd-39PplXzyLMC7422Lmfe3B/view?usp=share_link"
},

{
"name":"Juan Orozco",	
"email":"planificacion@ecoandestravel.com",
"userType":"admin",
"password":"@plan2016",
"company":"EcoAndes Travel",
"department":"Ventas",
"role": "Jefe de Planificación y Operaciones",	
"profilePic": "https://drive.google.com/file/d/1X8Hru9tcn_Rb8j-zvwL801hzqDhjJ_PB/view?usp=share_link"
},

{
"name":"Jose Andrade", 
"email":"sales@ikalagalapagoshotel.com",
"userType":"sales",
"password":"@sale2016",
"company":"Ikala Galapagos Hotel",
"department":"Ventas",
"role": "Representante de ventas",
"profilePic": "https://drive.google.com/file/d/1wdn54vSPPxRsxRL4bcNMn1jaetasCy1s/view?usp=share_link"
},

{
"name":"Santiago Flores", 
"email":"sistemas@latintravelcollection.com",
"userType":"admin",
"password":"@sist2016",
"company":"Unigalapagos",	
"department":"Sistemas",	
"role": "Administrador de sistemas",
"profilePic": "https://drive.google.com/file/d/1HDrBzUA1EE7Go-Tvwi_eXWapUa6bkWlQ/view?usp=share_link"
},

{
"name":"Luis Olivo", 
"email":"designer@latintravelcollection.com",
"userType":"sales",
"password":"@desi2016",
"company":"Maexgal",	
"department":"Sistemas",
"role": "Diseñador Gráfico",
"profilePic": "https://drive.google.com/file/d/1LjMPLZPGb417caF-bR22R5HePVZwX1P_/view?usp=share_link"
},

{
"name":"Airam Alfonso", 
"email":"webmaster@latintravelcollection.com",
"userType":"webmaster",
"password":"@webm2016",
"company":"EcoAndes Travel",
"department":"Sistemas",
"role": "Webmaster",
"profilePic": "https://drive.google.com/file/d/1gfTbtLN4dPYGi9uuwiJBq2RHIfOTYDYW/view?usp=share_link"
},

{
"name":"Mickaela Gallegos", 
"email":"content@latintravelcollection.com",
"userType":"sales",
"password":"@cont2016",
"company":"EcoAndes Travel",
"department":"Sistemas",
"role": "Redactora",
"profilePic": "https://drive.google.com/file/d/1mZMqiTC6PretbShLIb7NkVwyX3PVFb3R/view?usp=share_link"
}

    ]

    const encryptUsers=(userArr)=>{
        let eachMember=teamMembArr.map((elem)=><>
            <div style={{border: "solid 1px black", width: "300px" }} > 
                {elem.name} || {elem.userType} 
            </div>
        </>)
        return(<>
            <div style={{display: "flex", flexDirection:"column"  }} >
                {eachMember}
            </div>
        </>)
    }

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


                <h4> Text Area </h4>
                {aTextArea( "text Area", 'dayDetail', true, "description", sampleDayTour, setDayTour )}

                <h4> OP Single Elem Picker  </h4>
                    {aDropdownPicker(someOptsArr, "Single Opt Picker", "inputIDD", setPickerElem)}

                <h4> OP Multi Option Picker </h4>
                    {multiOptPicker(tempOptArr, "Destintions", "mulitInput", multiOptElem, setMultiOptElem, setTempOptArr )}

                <h4> OP Text input</h4>
                    {anInputDisplayer("Tester Label", "firstInputText", "text", false, "a Text Input" )}
                <h4> OP Number input</h4>
                    {anInputDisplayer("a Price", "inputKeyTwo", "number", false, "$xx.-", 0  )}
                <h4> OP Add/rmv from List text Input </h4>
                    {addToList(highlightList, setHighlightList, "Voyage Inclusions", aHighlight, setAHighlight)}
                <h4> Date Input </h4>
                    {anInputDisplayer("departure date", "depDateKey", "date", false, "date",  )}
            </form>
        </>)
    }

    console.log(teamMembArr.length)

    return(<>

    {/* Will we need session on per page level, or just on Navi and it can controll it all???? */}
        {session&&<> 
            <GMSNavii  user={session.user} />

            <h1>
            Cucu
            </h1>

            <h1> Wazabi</h1>
            <br/>

            {/* <ul> gms and playground Navi </ul> */}
            {/* <ul> Make a universal stylized input maker </ul> */}
            {/* <ul> Drop downs </ul> */}
            <ul> Img picker </ul>
            <ul> Gen Switchers </ul>

            {encryptUsers()}

            {/* {imageFetcher()} */}


            <br/>
            Finish tourCreator - Displayer
            <br/>

            {/* {formBuilder()} */}

        </>}
    </>)
}