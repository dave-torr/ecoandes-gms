import React, { useEffect, useState } from 'react';

import styles from "./../styles/components/tourCmpnts.module.css"

import AllCountryData from "./../data/countryPhoneEdtension.json"

import { Elements } from '@stripe/react-stripe-js'
import getStripe from './../utils/payments/get-stripejs'
import {StripeGeneralCheckout} from "./../components/payments/stripeCardSetup"

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

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// stepOne
export function PrivDepDatePicker(props){
    console.log(props.aBooking)


    const clientDatePicker=()=>{

        let minDate= props.tourDates[0].minDate
        let maxDate= props.tourDates[0].maxDate

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


            {clientDatePicker()}

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

    const [guestDataArr, setGuestData]=useState([])
    const [dataCheckTrig, setDataCheckTrig]= useState(false)

    const guestInfoTable=()=>{
        let sampleArray = [...Array(aBooking.priceObject.clientNumber)]
        let theGrids = sampleArray.map((elem, i)=> <React.Fragment key={i}> <ClientForm formIndex={i} guestDataArr={guestDataArr} setGuestData={setGuestData} /> </React.Fragment>)
        return(<>
            <div className={styles.dataGrids}> {theGrids} </div>
        </>)
    }

    return(<>
        <div className={styles.guestDataIntroCont}>
            <h2>Please provide the following information for all guests:</h2>
            {guestInfoTable()}
            {aBooking.priceObject.clientNumber===guestDataArr.length&&<>
                <div className={styles.clientDataChecker} >
                    Information is correct?
                    <div className={styles.acceptDataBTN} onClick={()=>{
                        setDataCheckTrig(true)
                        props.setABooking({
                          ...props.aBooking,
                          "clientDataObj": [...guestDataArr]
                        })
                        }}>yes!</div>
                </div>
            </>}
            {dataCheckTrig&&<>
                {props.bookingStepBTN("Payment")}
            </>}

        </div>
    </>)
}
//////////////////////////////////////////////////////////
const ClientForm=(props)=>{
    const [userObject, setUserObj]=useState({
        "userName": null,
        "passport": null,
        "dateOfBirth": null,
        "nationality": null,
        "phoneNumber": null,
        "email": null,
    });

    function aTextInput(aPlaceholder, inputId, anObject, setAnObject, inputType, reqBoolean, disabBool){
        return(<>
        <div className={styles.anInputcont}>
            <label htmlFor={inputId} className={styles.anInputLabel}>{aPlaceholder}:</label> 
            <input
                placeholder={aPlaceholder}
                type={inputType}
                id={inputId}
                required={reqBoolean}
                disabled={disabBool}
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

    let formIndex=props.formIndex
    let disableForm= false
    if(props.guestDataArr[formIndex]){
        disableForm=true
    }
    return(<>
        <form className={styles.userDataForm} onSubmit={(e)=>{
            e.preventDefault();
            // props.guestDataArr.splice(formIndex, 1, userObject)
            props.setGuestData(props.guestDataArr.concat(userObject))
        }}>
        <h3>Guest {formIndex+1}</h3>
            {aTextInput("Full Name", "userName", userObject, setUserObj, "text", true, disableForm )}
            {aTextInput("Passport/ID", "passport", userObject, setUserObj, "text", true, disableForm )}
            {aTextInput("Nationality", "nationality", userObject, setUserObj, "text", true, disableForm )}
            {aTextInput("Date of Birth", "dateOfBirth", userObject, setUserObj, "date", true, disableForm )}
            {aTextInput("Email", "email", userObject, setUserObj, "email", true, disableForm )}
            {aTextInput("Phone Number", "phoneNumber", userObject, setUserObj, "number", true, disableForm )}

            {props.guestDataArr[formIndex]?<>
                <div className={styles.recordedData}> Guest {formIndex+1} data recorded!</div>
            </>:<>
                <input 
                    type="submit"
                    value={`Submit guest ${formIndex+1} information`}
                    className={styles.clientFormSubmitBTN}
                />
            </>}
        </form>
    </>)

}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
// stepFour



export function ConditionsAndpayment(props){

    const [checkoutFormTrig, setcheckouttrig]=useState(false)

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    },[])

    const clientPriceSummary=(priceObj, theTour)=>{
        return(<>
            <div className={styles.priceSummary}>
                <div className={styles.summaryColumn}>
                    <div className={styles.tripNameDuration}>
                        <h1>{theTour.tripName}</h1>
                        <h3> {theTour.duration}D / {theTour.duration -1 }N</h3>
                    </div>
                    <div className={styles.priceSummaryDescriptor}> 
                        A private achaeology voyage through 
                        {" "}{theTour.countryList.map((elem, i)=><React.Fragment key={i} > {elem} </React.Fragment>)}
                    </div>
                </div>
                <div className={styles.summaryRow}> 
                    <i>Price per person</i>
                    ${priceObj.pricePerPerson.toLocaleString("en-US")}.-
                </div>
                <div className={styles.summaryRow}>
                    <p>In double (twin/double bed) room accommodation</p>
                    <div className={styles.clientCountRow}> x {priceObj.clientNumber} guests  </div>
                </div>

                {priceObj.singleSupplements?<>
                <div className={styles.summaryRow}> 
                    <i>+ single room supplement{priceObj.singleSupplements>1&&<>s</>}</i>
                     ${priceObj.singleSupRate.toLocaleString("en-US")}.-
                </div>
                <div className={styles.clientCountRow}> x {priceObj.singleSupplements} guests  </div>
                </>:<></>}
                <div className={styles.summaryRowTOTAL}>
                    <i>Total</i> &nbsp;
                    ${priceObj.totalBookingPrice.toLocaleString("en-US")}.-
                </div>
            </div>
        </>)
    }

    const aCheckoutBox=(theFunction)=>{
        return(<>
            <div className={styles.priceSummary}> 
                {theFunction()}
            </div>
        </>)
    }
    const clientCheckboxForm=()=>{

        // stripe incorporation and email tests.

        const conditionsAgreementDisplayer=()=>{
            return(<>
                <div className={styles.aCheckoutBoxCont}>
                    <span className={styles.aCheckboxInput}>
                        <input type="checkbox" id="ageAgreementID" required/>
                    </span>
                    <label htmlFor='ageAgreementID' className={styles.checkboxLabel} >
                        I confirm that I am over 18 years of age; that all the information provided is correct; and that I am allowed to book this travel experience for myself and the other travelling passengers. </label>
                </div>
                <div className={styles.aCheckoutBoxCont}>
                    <span className={styles.aCheckboxInput}>
                        <input type="checkbox" id="conditionsAgreementID" required/>
                    </span>
                    <label htmlFor='conditionsAgreementID' className={styles.checkboxLabel} >
                        I confirm that I have read and agree with Latin Travel Collection's Payment and Cancellation Policies 
                        <a href="/documents/ecoAndesPaymentPolicies.pdf" download className={styles.PDFdwnlBtn}> 
                           {" "} [download PDF here]
                        </a> </label>
                </div>
            </>)
        }
        const flightAdder=()=>{
            return(<>
            <div className={styles.flightsAdder}>
                <h3>Please let us know your flight information [optional]:</h3>
                <input type="text" onChange={(e)=>{
                    props.setABooking({
                        ...props.aBooking,
                        "flightInfo": e.target.value
                    })
                }} />
            </div>
            </>)
        }


        return(<>
            <form className={styles.clientCheckoutForms} onSubmit={(e)=>{
                e.preventDefault()
                setcheckouttrig(true)
            }} > 
                {aCheckoutBox(conditionsAgreementDisplayer)}
                {aCheckoutBox(flightAdder)}
                <input type="submit" className={styles.paymentBtn}/>
            </form>
        </>)
    }

    const paymentDisplayer=()=>{
        return(<>
        <Elements stripe={getStripe()}>
            <StripeGeneralCheckout 
                aBooking={props.aBooking}
                totalBookingPrice={props.aBooking.priceObject.totalBookingPrice} 
                receiptDescription={"Canete Valley Dig: Total Tour Booking"}
            /> 
        </Elements>
        </>)
    }
    // add internal flights option (Lima - Cus) 
    const clientPaymentBox=()=>{
        if(checkoutFormTrig){
        return(<>
            {aCheckoutBox(paymentDisplayer)}
        </>)
        }
    }

    return(<>
        {clientPriceSummary(props.aBooking.priceObject, props.theTourData)}
        {clientCheckboxForm()}
        {clientPaymentBox()}
    </>)
}
