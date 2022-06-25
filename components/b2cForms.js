import { useState } from 'react';

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
    const [depDate, setDepDate]=useState(null)

    console.log(depDate)

    return(<>
        <div>

        </div>
    </>)
}