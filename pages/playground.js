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



// OP for text and numbs
    const anInputDisplayer=(inputLabel, inputId, inputType, isReq, inputPlaceholder, inputLeel, numbMin )=>{
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
                        if(inputLeel==="first"){
                        console.log("cucu")
                        setItinSkeleton({
                            ...itinerarySkeleton,
                            [inputId]:e.target.value
                        })
                        }
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
                        console.log("cucu")
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

    const formBuilder=()=>{
        return(<>


            <h1> Cucu Form Builder</h1>


            <form> 
                <h4> Text input  </h4>
                    {anInputDisplayer("Tester Label", "firstInputText", "text", false, "a Text Input", "first")}
                <h4> Number input  </h4>
                    {anInputDisplayer("a Price", "inputKeyTwo", "number", false, "$xx.-", "first", 0  )}
                <h4> List Input </h4>
                    {addToList(highlightList, setHighlightList, "Voyage Inclusions", aHighlight, setAHighlight)}
            </form>
        </>)
    }


    return(<>
        Cucu
        <br/>

        <ul> Make a universal stylized input maker </ul>
        <ul> Date </ul>
        <ul> Drop downs </ul>
        <ul> Img picker </ul>
        <ul> Gen Switchers </ul>
        
        

        <br/>
        Finish tourMaker - Displayer
        <br/>

        {formBuilder()}

    </>)
}