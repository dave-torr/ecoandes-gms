import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react"

import styles from "./../../styles/pages/gms.module.css"

import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import Slider from '@mui/material/Slider';
import { Loader } from '@mantine/core';

import GenDataTemplates from "./../../data/dataAndTemplates"
import { HotelDataDisplayer } from "../../components/hotelDB";
let toDate = new Date()


// FFD

export default function HotelPage(props){

    // USER DATA
    const { data: session } = useSession()

    // ADDING PROPERTIES TO DB
    const [hotelAdderStep, setHotelStep]= useState(0)
    const [hotelSchema, setHotelSchema]=useState({
        "accomodationType":"Hotel",
        "province": "Pichincha",
        "submitionDate": toDate,
    })
    const [hotelAdderContr, setHotelAdd]= useState(true)
    const [roomPriceObj, setRoomPriceObj]=useState({})
    const [roomCategorySwitcher, setRoomCat] = useState("standard")
    const [breakfastController, setBreakfastCont]=useState(true)

    const [orderedHotelLists, setOrderedHotels]=useState()

    // useEffect=(()=>{
    //     if(HotelEntries){
    //         let orderedHotels = HotelEntries.sort((a,b)=>
    //         (a.hotelName > b.hotelName) ? 1 :  -1);
    //         console.log(orderedHotels)
    //     }
    // },[HotelEntries])

    const aPriceInput=(aPlaceholder, inputId, priceCategory, inputType, reqBoolean)=>{
        return(<>
        <div className={styles.aPriceInputcont}>
            <label htmlFor={inputId} className={styles.anInputLabel}>{aPlaceholder}:</label>
            $<input
                placeholder="Price"
                type={inputType}
                id={inputId}
                required={reqBoolean}
                min={0}
                onChange={(e)=>{
                    setRoomPriceObj({
                        ...roomPriceObj,
                        "priceCategory": priceCategory,
                        [inputId]: e.target.value
                    })
                }}
                />
            </div>
        </>)
    }
    const locationPickers=(locationList, provOrCity )=>{
        let destinationOpts=locationList.map((elem, i)=><option key={i}>{elem}</option>)
        return(<>
            <div className={styles.anInputcont}>
                <label htmlFor={provOrCity} className={styles.anInputLabel}>    
                    {provOrCity} *:</label>
                <select required id={provOrCity} onChange={(e)=>{
                    setHotelSchema({
                        ...hotelSchema,
                        [provOrCity]: e.target.value
                    })
                }} >{destinationOpts}</select>
            </div>
        </>)
    }
    const addRoomPrices=( priceCategory )=>{
        return(<>
            <div className={styles.dataContTwo}>
                <div className={styles.dataColumn}>
                    <h3>{priceCategory} Single Room</h3>
                    {aPriceInput("Rack Rates *", 'singleRackRates', priceCategory, 'number', true )}
                    {aPriceInput("Net Rates *", 'singleNetRates', priceCategory, 'number', true )}
                    {aPriceInput("Agency Rates", 'sinngleAgencyRates', priceCategory, 'number', false )}
                    {aPriceInput("Private Rates", 'singlePrivateRates', priceCategory, 'number', false )}
                </div>
                <div className={styles.dataColumn}>
                    <h3>{priceCategory} Double Rooms</h3>
                    {aPriceInput("Rack Rates *", 'doubleRackRates', priceCategory, 'number', true )}
                    {aPriceInput("Net Rates *", 'doubleNetRates', priceCategory, 'number', true )}
                    {aPriceInput("Agency Rates", 'doubleAgencyRates', priceCategory, 'number', false )}
                    {aPriceInput("Private Rates", 'doublePrivateRates', priceCategory, 'number', false )}
                </div>
                <div className={styles.dataColumn}>
                    <h3>{priceCategory} Triple Rooms</h3>
                    {aPriceInput("Rack Rates", 'tripleRackRates', priceCategory, 'number', false )}
                    {aPriceInput("Net Rates", 'tripleNetRates', priceCategory, 'number', false )}
                    {aPriceInput("Agency Rates", 'tripleAgencyRates', priceCategory, 'number', false )}
                    {aPriceInput("Private Rates", 'triplePrivateRates', priceCategory, 'number', false )}
                </div>
            </div>
            <div className={styles.breakfastSwitcher}>
                Breakfast included in {priceCategory} rooms? 
                    <input required type="radio" name="breakfastRadio" id="breakfastTrue" onClick={()=>{
                        setBreakfastCont(true)
                        setRoomPriceObj({
                            ...roomPriceObj,
                            "breakfastIncl": true,
                        })                        
                    }}/><label htmlFor="breakfastTrue" > Yes </label> &nbsp; | <input required type="radio" name="breakfastRadio" id="breakfastFalse" onClick={()=>{
                        setBreakfastCont(false)
                        setRoomPriceObj({
                            ...roomPriceObj,
                            "breakfastIncl": false,
                        })                        
                    }} /><label htmlFor="breakfastFalse" > No </label>
            </div>
            {!breakfastController&&<div >
                Please add breakfast price: <input type='number' onChange={(e)=>{setRoomPriceObj({
                    ...roomPriceObj,
                    "breakfastPrice": e.target.value,
                })}} />
            </div>}
        </>)
    }
    const formBtnsCont=(categoryController, catControllerTwo )=>{
        return(<>
            <div className={styles.roomVariantsBTNCont}>
                <div className={styles.addRoomCategoryBTN} onClick={()=>{
                    let upDatedPriceArr
                    if(hotelSchema.priceArr){
                        upDatedPriceArr= hotelSchema.priceArr.concat(roomPriceObj)
                    } else {
                        upDatedPriceArr = [].concat(roomPriceObj)
                    }
                    setHotelSchema({
                        ...hotelSchema,
                        "priceArr": upDatedPriceArr
                    })
                    setRoomCat(categoryController)
                    setRoomPriceObj({})
                }} >save + add {categoryController} category room</div>

                <div className={styles.addRoomCategoryBTN} onClick={()=>{
                    let upDatedPriceArr  
                    if(hotelSchema.priceArr){
                        upDatedPriceArr= hotelSchema.priceArr.concat(roomPriceObj)
                    } else {
                        upDatedPriceArr = [].concat(roomPriceObj)
                    }
                    setHotelSchema({
                        ...hotelSchema,
                        "priceArr": upDatedPriceArr
                    })
                    setRoomCat(catControllerTwo)
                    setRoomPriceObj({})
                }} >save + add {catControllerTwo} category room</div>
                <input className={styles.nextStepBTN} value="save + next" type="submit"/>
            </div>
        </>)
    }

    const marks = [
        {
            "value": 0,
            "label": `1 Star`,
        },
        {
            "value": 25,
            "label": '2 Star',
        },
        {
            "value": 50,
            "label": '3 Star',
        },
        {
            "value": 75,
            "label": '4 Star',
        },
        {
            "value": 100,
            "label": '5 Star',
        }
    ]
    function Categoryswitcher(categoryz){
        switch (categoryz){
            case 0:
            return 1 
            break;
            case 25:
            return 2 
            break;
            case 50:
            return 3 
            break;
            case 75:
            return 4
            break;
            case 100:
            return 5 
            break;
        }
    }
    const categoryPicker=()=>{
        let accommodationOpts=GenDataTemplates.hotelCategories.map((elem, i)=><React.Fragment key={i}><option value={elem}>{elem}</option> </React.Fragment> )
        return(<>
        <div className={styles.dataContOne}>
            <div className={styles.dataColumn}>
                <h3> Accommodation Type: </h3>
                <select className={styles.hotelTypePicker}
                onChange={(e)=>{
                    setHotelSchema({
                        ...hotelSchema,
                        "accomodationType": e.target.value
                    })
                }}>{accommodationOpts} </select>
            </div>
            <div className={styles.sliderContainer}>
                <h3> Accommodation Category: </h3>
                <Slider
                    aria-label="Always visible"
                    step={25}
                    marks={marks}
                    onChange={(e)=>{
                        setHotelSchema({
                            ...hotelSchema,
                            "accomodationCategory": Categoryswitcher(e.target.value)
                        })
                    }}
                />
            </div>
        </div>
        </>)
    }

    const hotelAdderForm=()=>{
        return(<>
            <div className={styles.closeDialogBTN} onClick={()=>setHotelAdd(false)}>close&nbsp;<CloseIcon/></div>
            <form style={{padding: "21px"}} onSubmit={(e)=>{
                    e.preventDefault()
                    let upDatedPriceArr  
                    if(hotelSchema.priceArr){
                        upDatedPriceArr= hotelSchema.priceArr.concat(roomPriceObj)
                    } else {
                        upDatedPriceArr = [].concat(roomPriceObj)
                    }
                    setHotelSchema({
                        ...hotelSchema,
                        "priceArr": upDatedPriceArr
                    })
                    setHotelStep(1)
                }}>
                <h2>Add hotel to Database</h2>
                {categoryPicker()}
                <div className={styles.dataContOne}>
                    <div className={styles.dataColumn}>
                        <h3>Name & Location</h3>
                        {locationPickers(GenDataTemplates.ecuadorProvinces, "province")}
                        {locationPickers(GenDataTemplates.ecuadorCities, "city")}
                    </div>
                    <div className={styles.dataColumn}>
                        <h3>Contact</h3>

                        {/* {aTextInput("Contact Email *", "hotelEmail", hotelSchema, setHotelSchema, "email", true )}
                        {aTextInput("Phone (main) *", "phoneMain", hotelSchema, setHotelSchema, "number", true )}
                        {aTextInput("Phone (mobile)", "phoneMobile", hotelSchema, setHotelSchema, "number", false )}
                        {aTextInput("Hotel Website", "hotelUrl", hotelSchema, setHotelSchema, "url", false )} */}

                        
                    </div>
                </div>
                {hotelSchema.priceArr?<>
                    <div className={styles.savedRatesList}>
                    {hotelSchema.priceArr.map((elem, i)=><React.Fragment key={i}> 
                        { i > 0 && <> + </>}{elem.priceCategory} </React.Fragment>)} rates saved</div>
                    {addRoomPrices(roomCategorySwitcher)}
                    {formBtnsCont("suite", "other")}
                </>:<>
                    {addRoomPrices(roomCategorySwitcher)}
                    {formBtnsCont("superior", "suite")}
                </>}
            </form>        
        </>)
    }


    const submitToBackEnd=async()=>{
        console.log("here at submit BTN")
        let stringifiedHotelSchema = JSON.stringify(hotelSchema)
        const res = await fetch("/api/gms/hotelDB", {
            method: "POST",
            body: stringifiedHotelSchema
        })        
        const createdHotelRecord = await res.json()

        if(createdHotelRecord){
            console.log("check yo backend", createdHotelRecord)
            window.alert("Hotel Registration Successful !")
            setHotelAdd(false)
        }
    }
    ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    const hotelAdderdialog=()=>{
        return(<>
        <Dialog open={hotelAdderContr} onClose={()=>setHotelAdd(false)} fullScreen>
            <div className={styles.hotelAdderCont}>
            {hotelAdderStep===0&&<>
                {hotelAdderForm()}
            </>}
            {hotelAdderStep===1&&<>
                <br /><br /><br />
                <h3>Please review and accept submition to Hotel DB</h3>
                <HotelDataDisplayer hotelSchema={hotelSchema} listDisp={true} />
                <div className={styles.submittoBeBTN} onClick={()=>{
                    submitToBackEnd()
                    setHotelStep(2)
                    // add loading spinner, close Dialog, refresh db landing
                }}> confirm + send to database</div>
            </>}
            {hotelAdderStep===2&&<>
                <div className={styles.loaderScreen}>
                    <h2> Sending to the cloud! </h2> <br></br>
                    <Loader color="red" size="xl"/>
                </div>
            </>}
            </div>
        </Dialog>
        </>)
    }



// main hotel landing: Ikala GPS, Ikala UIO, Yacuma Incremental Static Generation
// filter funtionality for hotels for provinces / cities.

// SWR for all other hotel DB data

    return(<>

{hotelAdderForm()}

        <div className={styles.main}>
            <div className={styles.ratesNavBar}>
                <div>LTC / hotels</div>
                <div className={styles.addHotelBTN} onClick={()=>{setHotelAdd(true)}}> add hotel  + </div>
            </div>
        </div>

            {/* <HotelDataDisplayer hotelSchema={hotelSchema} /> */}
        {hotelAdderdialog()}
    </>)
}