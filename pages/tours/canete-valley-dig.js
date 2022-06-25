import { useState } from "react"
import Image from "next/image"

import theTourData from "./../../data/caneteDig.json"

import {TourDisplayer} from "./../../components/tours"
import AncientOdysLogo from "./../../public/assets/logos/partners/ancientOdy.webp"
import { PrivDepDatePicker } from "../../components/b2cForms"

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

    return(<>
        {bookingProcess===0&&<> 
            <TourDisplayer aTour={theTourData} breadcrumb={false} partnerLogo={partnerLogo} bookingProcess={setbookingPros} />
        </>}
        {bookingProcess===1&&<>
            Booking Process
            <PrivDepDatePicker />
        </>}
    </>)
}