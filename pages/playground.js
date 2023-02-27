import React from 'react'
import { useState } from 'react'

import styles from "./../styles/pages/playground.module.css"


import { SignInForm, SignOutBtn } from "./../components/authForms"
import { useSession, signOut } from "next-auth/react"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


// Bitacora logo:
// import TrackChangesIcon from '@mui/icons-material/TrackChanges';

export default function PlaygroundPage(props){

    const [itinerarySkeleton, setItinSkeleton]=useState({})



// OP for text, numbs, dates
    const anInputDisplayer=(inputLabel, inputId, inputType, isReq, inputPlaceholder, numbMin )=>{
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
                        setItinSkeleton({
                            ...itinerarySkeleton,
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


    let someOptsArr=["cucu", "rice", "some", "soda"]
    const [singlePickerElem, setPickerElem]=useState()
    const [multiPickerArr, setMultiPickerArr]=useState([])



    const [pickerOptsArray, setPickerOptsArr]=useState(someOptsArr)
    const aDropdownPicker=(singOrMulti, theOptsArr, inputLabel, inputId, setTheResult, setMultiArr)=>{
        if(singOrMulti==="single"){
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
            </>)} 
        else if(singOrMulti==="multi"){
            // add optto temp arr that displays everything
            let theOptions=theOptsArr.map((elem,i)=><React.Fragment key={i}> 
                <option value={elem} key={i}>{elem}</option></React.Fragment>)

            const setResults=(e)=>{
                e.preventDefault()
                setTheResult([...multiPickerArr, e.target.value])
                // temp array, splice, and remove from optArr
                // setPickerOptsArr(spliced temp array)


            }
            return(<>
                <div className={styles.theInputContainer}>
                    <div className={styles.anInputRow}>
                        <label htmlFor={inputId} className={styles.inputLabel}>   
                            {inputLabel}</label>
                        <i> &nbsp; - &nbsp; multi option picker </i>
                    </div>
                    <select className={styles.inputUserUI}
                    onChange={(e)=>{
                        setResults(e)
                    }}>
                        {theOptions}
                    </select>
                </div>
            </>)}
    }












    const formBuilder=()=>{
        return(<>

            <h1> Cucu Form Builder</h1>

            <form> 
                <h4> Single Elem Picker  </h4>
                    {aDropdownPicker("single", someOptsArr, "Single Opt Picker", "inputIDD", setPickerElem)}

                <h4> Multi Elem Picker  </h4>
                    {aDropdownPicker("multi", pickerOptsArray, "Multi Opt Picker", "inputIDD", setMultiPickerArr, setPickerOptsArr)}


                <h4> Text input  </h4>
                    {anInputDisplayer("Tester Label", "firstInputText", "text", false, "a Text Input" )}
                <h4> Number input  </h4>
                    {anInputDisplayer("a Price", "inputKeyTwo", "number", false, "$xx.-", 0  )}
                <h4> List Input </h4>
                    {addToList(highlightList, setHighlightList, "Voyage Inclusions", aHighlight, setAHighlight)}
                <h4> Date Input </h4>
                    {anInputDisplayer("departure date", "depDateKey", "date", false, "date",  )}
            </form>
        </>)
    }







    console.log(multiPickerArr, "multi")
    return(<>
        Cucu
        <br/>

        <ul> Make a universal stylized input maker </ul>
        <ul> Drop downs </ul>
        <ul> Img picker </ul>
        <ul> Gen Switchers </ul>
        
        

        <br/>
        Finish tourMaker - Displayer
        <br/>

        {formBuilder()}

    </>)
}