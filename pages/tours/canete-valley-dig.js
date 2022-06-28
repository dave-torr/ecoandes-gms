import React, { useState } from "react"
import Image from "next/image"

import theTourData from "./../../data/caneteDig.json"

import {TourDisplayer} from "./../../components/tours"
import AncientOdysLogo from "./../../public/assets/logos/partners/ancientOdy.webp"
import { ClientPriceAndRooming, PrivDepDatePicker } from "../../components/b2cForms"

import styles from "./../../styles/components/tourCmpnts.module.css"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

let toDate = new Date()

export default function CaneteDigTour(props){
    
    // booking process:
    // 0 = tour displayer
    // 1 = private departure
    // 2 = fixed departure

    const [bookingProcess, setbookingPros] = useState(0)
    const [aBooking, setABooking]= useState({
        "bookingDate": toDate,
        "itinerary": "Canete Valley Dig",
        "bookingType": String,
        "clientDataObj": {},
        "priceObject":{},
        "roomingList": {},
        "flightInfo":String,
        "saleStream": "b2cWebsite",
        "confirmed": true,
        "depDate": null
    })

    const [userObject, setUserObj]=useState({
        "userName": null,
        "passport": null,
        "dateOfBirth": null,
        "nationality": null,
        "phoneNumber": null,
        "email": null,
    });

    let partnerLogo= <Image src={AncientOdysLogo} alt="Ancient Odysseys Logo" />

    const tourIntro=()=>{       
        return(<>
            <div className={styles.bookingProcessTourData}>
                <div className={styles.backBTN} onClick={()=>setbookingPros(0)}>
                <ArrowBackIcon /> &nbsp; Back to Itinerary: </div>
                <span>{partnerLogo}</span>
                <div className={styles.tourTitleBar}>
                    {theTourData.tripName}</div>
                <div className={styles.bookingSteps}>Booking process: {bookingProcess} <strong>/ 4</strong></div>
            </div>
        </>)
    }

    const bookingStepBTN=(btnContent)=>{
        return(<>
            <div className={styles.bookingStepBTNCont}>
                continue to: &nbsp; &nbsp; 
                <div className={styles.bookingStepBTN} onClick={()=>setbookingPros(bookingProcess+1)} >{btnContent} <ArrowForwardIcon /></div>
            </div>
        </>)
    }

    return(<>
        {bookingProcess===0&&<> 
            <TourDisplayer aTour={theTourData} breadcrumb={false} partnerLogo={partnerLogo} bookingProcess={setbookingPros} />
        </>}
        <div style={{width: "100%", display: "flex", justifyContent:"center"}}> 
        <div className={styles.bookingProcessTourData}>
        {bookingProcess>0&&<> 
            {tourIntro()}
        </>}
        {bookingProcess===1&&<>
            <PrivDepDatePicker tourDates={theTourData.prices.privateDeparture} setABooking={setABooking} aBooking={aBooking} bookingStepBTN={bookingStepBTN} />
        </>}
        {bookingProcess===2&&<> 
            <ClientPriceAndRooming aBooking={aBooking} theTourData={theTourData} />
        </>}
        </div>
        </div>
    </>)
}