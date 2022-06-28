import React, { useEffect, useState } from 'react';

import styles from "./../styles/components/tourCmpnts.module.css"

import AllCountryData from "./../data/countryPhoneEdtension.json"

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// for user booking:
// stepOne
// pick a date from 'open' range

// stepTwo
// select number of clients to set price
// select rooming type (dbl / single)

// stepThree
// setGGuestInfo

// stepFour
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



///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// stepOne
export function PrivDepDatePicker(props){
    const [digDates, setdigDates]=useState(null)

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

                    {props.bookingStepBTN("price selection")}

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

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// stepTwo
export function ClientPriceAndRooming(props){
    const theTourData= props.theTourData
    const priceList = props.theTourData.prices.privateDeparture.priceRange
    const singleSupp = props.theTourData.prices.singleSupp

    // const [pickedPrice, setPickedPrice]= useState(theTourData.priceList[0])

    const [clientNumber, setClientNumber]= useState(2)
    const [totalBookingPrice, setTotalBookingPrice]= useState(priceList.twoPx  * 2)
    const [pricePerPerson, setPricePerPerson]= useState(priceList.twoPx)
    const [singleSupplements, setSungleSupplements]=useState(0)

    // sets first calc for total price
    useEffect(()=>{
        switch(clientNumber){
            case 1:
            setTotalBookingPrice( priceList.twoPx  + singleSupp)
            setSungleSupplements(1)
            break;
            case 2:
            setTotalBookingPrice( priceList.twoPx * 2 )
            setSungleSupplements(0)
            break;
            case 3:
            setTotalBookingPrice(( priceList.threeToFourPx * 3 ) + singleSupp)
            setSungleSupplements(1)
            break;
            case 4:
            setTotalBookingPrice( priceList.threeToFourPx * 4 )
            setSungleSupplements(0)
            break;
            case 5:
            setTotalBookingPrice(( priceList.threeToFourPx * 5 ) + singleSupp)
            setSungleSupplements(1)
            break;
            case 6:
            setTotalBookingPrice( priceList.fiveToSixPx * 6 )
            setSungleSupplements(0)
            break;
            case 7:
            setTotalBookingPrice(( priceList.sevenToEightPx * 7 ) + singleSupp)
            setSungleSupplements(1)
            break;
            case 8:
            setTotalBookingPrice( priceList.sevenToEightPx * 8 )
            setSungleSupplements(0)
            break;
            case 9:
            setTotalBookingPrice( ( priceList.nineToTenPx * 9 ) + singleSupp)
            setSungleSupplements(1)
            break;
            case 10:
            setTotalBookingPrice( priceList.nineToTenPx * 10)
            setSungleSupplements(0)
            break;
            case 11:
            setTotalBookingPrice(( priceList.elevenToTwelvePx * 11 ) + singleSupp)
            setSungleSupplements(1)
            break;
            case 12:
            setTotalBookingPrice( priceList.elevenToTwelvePx * 12)
            setSungleSupplements(0)
            break;
            case 13:
            setTotalBookingPrice( ( priceList.thirteenToFourteenPx * 13 ) + singleSupp)
            setSungleSupplements(1)
            break;
            case 14:
            setTotalBookingPrice( priceList.thirteenToFourteenPx * 14)
            setSungleSupplements(0)
            break;
            case 15:
            setTotalBookingPrice(( priceList.fifteenToSixteenPx * 15 ) + singleSupp)
            setSungleSupplements(1)
            break;
            case 16:
            setTotalBookingPrice( priceList.fifteenToSixteenPx * 16)
            setSungleSupplements(0)
            break;
    // should we max out at 12? give a notice to CONTACT US 
        }
    },[clientNumber])
    // sets price per person for display
    useEffect(()=>{
        switch(clientNumber){
            case 1:
            setPricePerPerson( priceList.twoPx )
            break;
            case 2:
            setPricePerPerson( priceList.twoPx )
            break;
            case 3:
            setPricePerPerson( priceList.threeToFourPx )
            break;
            case 4:
            setPricePerPerson( priceList.threeToFourPx )
            break;
            case 5:
            setPricePerPerson(priceList.fiveToSixPx )
            break;
            case 6:
            setPricePerPerson(priceList.fiveToSixPx )
            break;
            case 7:
            setPricePerPerson( priceList.sevenToEightPx )
            break;
            case 8:
            setPricePerPerson( priceList.sevenToEightPx )
            break;
            case 9:
            setPricePerPerson(priceList.nineToTenPx )
            break;
            case 10:
            setPricePerPerson(priceList.nineToTenPx )
            break;
            case 11:
            setPricePerPerson( priceList.elevenToTwelvePx )
            break;
            case 12:
            setPricePerPerson( priceList.elevenToTwelvePx )
            break;
            case 13:
            setPricePerPerson(priceList.thirteenToFourteenPx )
            break;
            case 14:
            setPricePerPerson(priceList.thirteenToFourteenPx )
            break;
            case 15:
            setPricePerPerson( priceList.fifteenToSixteenPx )
            break;
            case 16:
            setPricePerPerson( priceList.fifteenToSixteenPx )
            break;
        }
    },[clientNumber])
    // sets total price if single sups are required
    useEffect(()=>{
        let singleSupTotal=singleSupplements*singleSupp
        let totalPricepp = pricePerPerson*clientNumber
        setTotalBookingPrice( totalPricepp  + singleSupTotal )
    },[singleSupplements])
    // sets aBooking with price and client selection
    useEffect(()=>{
        props.setABooking({
            ...props.aBooking,
            "priceObject":{
                "totalBookingPrice": totalBookingPrice,
                "clientNumber": clientNumber,
                "singleSupplements": singleSupplements,
                "singleSupRate": singleSupp,
                "pricePerPerson": pricePerPerson
            }
        })
    },[totalBookingPrice])

    const clientNumberPicker=()=>{
        return(<>
            <div className={styles.clientNumberPickerCont}>
                <h2>This is a Private Departure for: </h2>
                <div className={styles.clientNumberDisp}> 
                    <div className={styles.clientNumber}>
                        {clientNumber}
                        {clientNumberChanger()}
                        guest{clientNumber>1&&<>s</>}
                    </div>
                </div>
            </div>
        </>)
    }
    const clientNumberChanger=()=>{
        return(<>
            <div className={styles.clientNumSwitcher}>
                {clientNumber<theTourData.maxGuests? <>
                    <div className={styles.numSwitcherArrowUp} onClick={()=>{
                        setClientNumber(clientNumber+1)
                    }} ><AddIcon /></div>
                </> : <>
                    <div className={styles.numSwitcherArrowUpOFFLINE}><AddIcon /></div>
                </>}

                {clientNumber>1?<> 
                    <div className={styles.numSwitcherArrow} onClick={()=>{
                        setClientNumber(clientNumber-1)
                    }} ><RemoveIcon /></div>
                </>:<> 
                    <div className={styles.numSwitcherArrowOFFLINE}><RemoveIcon /></div>
                </>}
            </div>
        </>)
    }
    const clientPriceDisplayer=()=>{
        return(<>
            <div className={styles.priceDispCont}>
                <div className={styles.priceppCont}> 
                    <div className={styles.priceppDisp}>
                        <i> Price per Person (in double/twin rooms) </i>
                        ${pricePerPerson.toLocaleString("en-US")}.-
                    </div>
                    <div className={styles.clientNumbDisp}>x {clientNumber} guest{clientNumber>1&&<>s</>} </div>
                </div>

                {singleSupplements>0 &&<>
                <div className={styles.priceppCont}>
                    <div className={styles.priceppDisp}> 
                        <i>+ Single Room{singleSupplements>1&&<>s</>} Supplement</i> 
                        &nbsp; ${singleSupp.toLocaleString("en-US")}.-
                    </div>
                    <div className={styles.clientNumbDisp}>x {singleSupplements} guest{singleSupplements>1&&<>s</>} </div>
                </div> 
                </>}
                <div className={styles.totalPriceDisp}> Total: &nbsp; USD ${totalBookingPrice.toLocaleString("en-US")}.- </div>
            </div>
        </>)
    }
    const singleSuppAdderPicker=()=>{
        return(<>
            <div className={styles.singleSuppAdderCont}>
                <h4> with </h4> &nbsp;&nbsp;&nbsp;&nbsp;
                {singleSupplements}
                {singlesuppChanger()}
                <h4>additional single Supplement</h4>
            </div>
        </>)
    }
    const singlesuppChanger=()=>{
        // let singleSupTotal=singleSupplements*singleSupp
        return(<>
            <div className={styles.singleSupNumSwitcher}>
                {singleSupplements<clientNumber? <>
                    <div className={styles.singleSupSwitcherArrowUp} onClick={()=>{
                        setSungleSupplements(singleSupplements+2)
                    }} ><AddIcon /></div>
                </> : <>
                    <div className={styles.singleSupSwitcherArrowUpOFFLINE}><AddIcon /></div>
                </>}

                {singleSupplements>1?<> 
                    <div className={styles.singleSupSwitcherArrow} onClick={()=>{
                        setSungleSupplements(singleSupplements-2)
                    }} ><RemoveIcon /></div>
                </>:<> 
                    <div className={styles.singleSupSwitcherArrowOFFLINE}><RemoveIcon /></div>
                </>}
            </div>
        </>)
    }

    return(<>
        <div className={styles.priceAndRoomingCont}>
            {clientNumberPicker()}
            {singleSuppAdderPicker()}
            {clientPriceDisplayer()}
            {props.bookingStepBTN("Client Information")}
        </div>
    </>)    
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// stepThree
export function ClientPersonalData(props){
    let aBooking= props.aBooking

    const [guestDataArr, setGeustData]=useState([])
    const [userObject, setUserObj]=useState({
        "userName": null,
        "passport": null,
        "dateOfBirth": null,
        "nationality": null,
        "phoneNumber": null,
        "email": null,
    });

    const guestInputCont=(formIndex)=>{
        return(<>
            <div className={styles.userDataForm}>

            </div>
        </>)
    }
    return(<>
        <div className={styles.guestDataIntroCont}>
            <h2>Please provide the following guest information:</h2>
        </div>

    </>)
}