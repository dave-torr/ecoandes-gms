import styles from "./../styles/components/hotelDB.module.css"

import StarIcon from '@mui/icons-material/Star';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import React from "react";


export function HotelDataDisplayer(props){

    // display confirmation page (showing all hotel data) 
    // confirm and send to back end
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
        "phoneMain": "52526133",
        "priceArr": [
            {
            "doubleNetRates": "47",
            "doubleRackRates": "54",
            "priceCategory": "standard",
            "singleNetRates": "666",
            "singleRackRates": "764",
            }, 
            {
            "doubleNetRates": "55.5",
            "doubleRackRates": "66",
            "priceCategory": "suite",
            "singleNetRates": "66",
            "singleRackRates": "764",
            }
            ],
        "province": "Galápagos",
    }

    // let hotelSchema= props.hotelSchema
    let hotelSchema= tempSchema
 
    let starArrDisp = [...Array(hotelSchema.accomodationCategory)].map((elem, i)=><span key={i}> <StarIcon/> </span>)

    const aPriceBlock=( priceBlockKey, thePrice)=>{
        return(<>
            <div className={styles.priceBlockCont}> 
                <div className={styles.priceCell}>{priceBlockKey}</div>
                <div className={styles.priceCell}>${thePrice.toLocaleString("en-US")}</div>
            </div>
        </>)
    }

    let eachPriceCatDisp=hotelSchema.priceArr.map((elem, i)=> <React.Fragment key={i}>
    <div className={styles.priceCatCont}> 
        <div className={styles.priceCatLabel}>{elem.priceCategory} room rates</div>
        {aPriceBlock("single rack rates", elem.singleRackRates )}
        {aPriceBlock("single net rates", elem.singleNetRates )}
        {aPriceBlock("double net rates", elem.doubleNetRates )}
        {aPriceBlock("double rack rates", elem.doubleRackRates )}
    </div></React.Fragment> )

    let emailIcon = <a href={`mailto:${hotelSchema.hotelEmail}`} ><MailOutlineIcon/></a>
    let phoneIcon = <a href={`tel:+593${hotelSchema.phoneMain}`} ><PhoneIcon/></a>
    let mobileIcon = <a href={`tel:+593${hotelSchema.phoneMobile}`} ><SmartphoneIcon/></a>

    return(<>
        <div className={styles.hotelInfoGenCont}>
            <div className={styles.hotelDataRow}>
                <div className={styles.hotelNameandDress}> 
                    <div className={styles.hotelName}>{hotelSchema.hotelName}</div>
                    <div><i>{hotelSchema.city}</i> | <i>{hotelSchema.province}</i> | <i>{hotelSchema.address}</i></div>
                </div>
                <div className={styles.hotelDataColumn}>
                    <div className={styles.categoryDisplCont}>

                        {hotelSchema.phoneMobile&&<>{mobileIcon}</>} &nbsp;&nbsp;
                        {hotelSchema.phoneMain&&<>{phoneIcon}</>} &nbsp;&nbsp;
                        {hotelSchema.hotelEmail&&<>{emailIcon}</>} &nbsp;&nbsp;
                    </div> 
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