import React, { useState } from 'react';

import styles from "./../styles/components/tourCmpnts.module.css"

// for user booking:
// pick a date from 'open' range

// select number of clients to set price

// select rooming type (dbl / single)

// add guest info

// payment

const aCheckbox=(anId, checkboxTitle, checkboxContent )=>{
    return(<>
        <div className={styles.aCheckbox}>
            <input type="checkbox" id={anId} style={{display: "flex", alignItems: "center"}} />
                <label htmlFor={anId} style={{display:"flex", flexDirection:"column", }}>
                    <h4>{checkboxTitle}</h4>
                    {checkboxContent&&<div>{checkboxContent}</div>}
                </label>
        </div>
    </>)
}

export function PrivDepDatePicker(props){
    const [digDates, setdigDates]=useState(null)

    console.log(digDates)
    // console.log(new Date(props.tourDates.departureDates[0].minDate))

    const dateDisp=(theDates)=>{
        let correctedMinDate=theDates.minDate.concat(" ")
        let correctedMaxDate=theDates.maxDate.concat(" ")
        return(<>
            <div className={styles.eachDateOpt} onClick={()=>setdigDates(theDates)}>
                <div className={styles.aDate}><strong>From:</strong> &nbsp;{new Date(correctedMinDate).toDateString()}</div>
                <div className={styles.aDate}><strong>To:</strong> &nbsp; &nbsp; &nbsp; &nbsp; {new Date(correctedMaxDate).toDateString()}</div>
            </div>
        </>)
    }

    let depDateOpts = props.tourDates.departureDates.map((elem, i)=><React.Fragment key={i}>
        {dateDisp(elem)}</React.Fragment> )

    const clientDatePicker=()=>{
        let minDate= digDates.minDate
        let maxDate= digDates.maxDate
        return(<>
            <div className={styles.aRow}>
                <div className={styles.theDatePicker}>
                    <h2> Please pick tour start date:</h2>
                    <input
                        type="date"
                        min={minDate}
                        max={maxDate}
                        className={styles.dateInput}
                        onChange={(e)=>{props.setABooking({
                            ...props.aBooking,
                            "depDate": e.target.value
                        })}}
                    />
                </div>

            </div>
        </>)
    }

    console.log(props.aBooking)


    return(<>
        <div className={styles.datePickerContainer}>

            {digDates?<>
                {props.aBooking.depDate?<>
                    <div className={styles.aRow}>
                        <h3>Selected excavation date: </h3> {dateDisp(digDates)}</div>
                    
                    <div className={styles.aRow}> 
                        <h3>Tour Departure Date:</h3>  
                        <div className={styles.eachDateOpt}>
                            {new Date(props.aBooking.depDate.concat(" ")).toDateString()} </div>
                        </div>

                    {props.bookingStepBTN("Client Information")}

                </>:<>
                    <div className={styles.aRow}>
                        <h3>Selected excavation date: </h3> {dateDisp(digDates)}</div>
                    {clientDatePicker()}
                </>}
            </>:<>
                <div className={styles.aRow}>
                    <h3>Please pick from available <br></br> excavation dates:</h3>
                    {depDateOpts}
                </div>
            </>}
        </div>
    </>)
}

