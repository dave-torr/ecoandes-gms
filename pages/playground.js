import React from 'react'
import { useState } from 'react'

import styles from "./../styles/pages/playground.module.css"


import { SignOutBtn } from "./../components/authForms"
import { useSession } from "next-auth/react"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {GMSNavii} from "./../components/navis"

// Bitacora logo:
// import TrackChangesIcon from '@mui/icons-material/TrackChanges';

export default function PlaygroundPage(props){
    const { data: session } = useSession()

    const [itinerarySkeleton, setItinSkeleton]=useState({})



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
// Sample Form
// Sample Form
    const formBuilder=()=>{
        return(<>
            <h1> Cucu Form Builder</h1>
            <form> 
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

    return(<>

    {/* Will we need session on per page level, or just on Navi and it can controll it all???? */}
        {session&&<> 
            <GMSNavii  user={session.user} />
        </>}

        <h1>
        Cucu
        </h1>
        <br/>

        {/* <ul> gms and playground Navi </ul> */}
        {/* <ul> Make a universal stylized input maker </ul> */}
        {/* <ul> Drop downs </ul> */}
        <ul> Img picker </ul>
        <ul> Gen Switchers </ul>

        <br/>
        Finish tourMaker - Displayer
        <br/>

        {formBuilder()}

    </>)
}