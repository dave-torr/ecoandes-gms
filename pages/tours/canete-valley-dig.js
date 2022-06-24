import theTourData from "./../../data/caneteDig.json"

import {TourDisplayer} from "./../../components/tours"
import AncientOdysLogo from "./../../public/assets/logos/partners/ancientOdy.webp"
import Image from "next/image"

export default function CaneteDigTour(props){

    let partnerLogo= <Image src={AncientOdysLogo} alt="Ancient Odysseys Logo" />

    return(<>
        <TourDisplayer aTour={theTourData} breadcrumb={false} partnerLogo={partnerLogo}/>
    </>)
}