import styles from "./../styles/components/hotelDB.module.css"

import StarIcon from '@mui/icons-material/Star';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import HomeIcon from '@mui/icons-material/Home';

import React, { useEffect, useState } from "react";

let tempSchema={
    "accomodationType":"Hotel",
    "province": "Pichincha",
    "accomodationType": "Hotel",
    "accomodationCategory": 4,
    "accomodationType": "Hotel",
    "address": "Roberto Schiess & San Cristobal",
    "city": "Puerto Ayora",
    "hotelEmail": "david@latintravelcollection.com",
    "hotelName": "Ikala Galapagos Hotel",
    "hotelUrl": "https://www.ikalagalapagoshotel.com",
    "phoneMain": "52526133",
    "priceArr": [
        {
        "breakfastIncl": true,
        "doubleNetRates": "47",
        "doubleRackRates": "54",
        "priceCategory": "standard",
        "singleNetRates": "666",
        "singleRackRates": "764",
        }, 
        {
        "breakfastPrice": 12,
        "doubleNetRates": "55.5",
        "doubleRackRates": "66",
        "priceCategory": "suite",
        "singleNetRates": "66",
        "singleRackRates": "764",
        }
        ],
    "province": "Galápagos",
}

const aPriceBlock=( priceBlockKey, thePrice)=>{
    return(<>
        <div className={styles.priceBlockCont}> 
            <div className={styles.priceCell}>{priceBlockKey}</div>
            <div className={styles.priceCell}>${thePrice.toLocaleString("en-US")}</div>
        </div>
    </>)
}

////////////////////////////////////////////////////////////
// hotel display on Database list. add filters for cities, provinces
export function HotelDataDisplayer(props){
    const [rowOrCol, setRoworCol]= useState(styles.hotelDataRow)
    useEffect(()=>{
        if(props.listDisp===true){
            setRoworCol(styles.hotelDataColumn)
        }
    },[])

    let hotelSchema= props.hotelSchema
    // let hotelSchema= tempSchema
 
    let starArrDisp = [...Array(hotelSchema.accomodationCategory)].map((elem, i)=><span key={i}> <StarIcon/> </span>)

    let eachPriceCatDisp=hotelSchema.priceArr.map((elem, i)=> <React.Fragment key={i}>
        <div className={styles.priceCatCont}> 
            <div className={styles.priceCatLabel}>{elem.priceCategory} room rates</div>
            {aPriceBlock("single rack rates", elem.singleRackRates )}
            {aPriceBlock("double rack rates", elem.doubleRackRates )}
            {aPriceBlock("single net rates", elem.singleNetRates )}
            {aPriceBlock("double net rates", elem.doubleNetRates )}
            {elem.breakfastIncl?<> <div className={styles.breakfastIncDetail}> Breakfast included</div></>:<> Breakfast price: ${elem.breakfastPrice} </>}
        </div></React.Fragment> )

    let emailIcon = <a href={`mailto:${hotelSchema.hotelEmail}`} target="_blank"><MailOutlineIcon/></a>
    let phoneIcon = <a href={`tel:+593${hotelSchema.phoneMain}`} target="_blank"><PhoneIcon/></a>
    let mobileIcon = <a href={`tel:+593${hotelSchema.phoneMobile}`} target="_blank"><SmartphoneIcon/></a>
    let homeSiteIcon = <a href={hotelSchema.hotelUrl} target="_blank"><HomeIcon/></a>
    let emailLink = <a href={`mailto:${hotelSchema.hotelEmail}`} target="_blank"> email: {hotelSchema.hotelEmail} </a>
    let phoneLink = <a href={`tel:+593${hotelSchema.phoneMain}`} target="_blank"> {hotelSchema.phoneMain}</a>
    let mobileLink = <a href={`tel:+593${hotelSchema.phoneMobile}`} target="_blank"> {hotelSchema.phoneMobile}</a>
    let homeSiteLink = <a href={hotelSchema.hotelUrl} target="_blank"> {hotelSchema.hotelUrl}</a>

    const iconsVsList=()=>{
        if(props.listDisp===true){
            return(<>
                <div className={styles.categoryDisplCont2}>
                    {hotelSchema.phoneMobile&&<span>+593 &nbsp; {mobileLink}</span>}
                    {hotelSchema.phoneMain&&<span> +593 &nbsp; {phoneLink}</span>}
                    {hotelSchema.hotelEmail&&<>{emailLink}</>}
                    {hotelSchema.hotelUrl&&<>{homeSiteLink}</>}
                </div>
            </>)    
        } else {
            return(<>
                <div className={styles.categoryDisplCont}>
                    {hotelSchema.phoneMobile&&<>{mobileIcon}</>} &nbsp;&nbsp;
                    {hotelSchema.phoneMain&&<>{phoneIcon}</>} &nbsp;&nbsp;
                    {hotelSchema.hotelEmail&&<>{emailIcon}</>} &nbsp;&nbsp;
                    {hotelSchema.hotelUrl&&<>{homeSiteIcon}</>} &nbsp;&nbsp;
                </div>
            </>)
        }
    }

    return(<>
        <div className={styles.hotelInfoGenCont}>
            <div className={rowOrCol}>
                <div className={styles.hotelNameandDress}> 
                    <div className={styles.hotelName}>{hotelSchema.hotelName}</div>
                    <div><i>{hotelSchema.city}</i> | <i>{hotelSchema.province}</i> | <i>{hotelSchema.address}</i></div>
                </div>
                <div className={styles.hotelDataColumn}>
                        {iconsVsList()} 
                    <div className={styles.categoryDisplCont}> 
                        <h3>{hotelSchema.accomodationType}</h3> 
                        <div className={styles.starCount}>{starArrDisp}</div>
                    </div>
                </div>
            </div>
            <div className={styles.hotelPriceRow}>
                {eachPriceCatDisp}
            </div>
        </div>
    </>)
}
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
