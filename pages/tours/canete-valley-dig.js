import theTourData from "./../../data/caneteDig.json"

import {TourDisplayer} from "./../../components/tours"

export default function CaneteDigTour(props){

    return(<>
        <TourDisplayer aTour={theTourData} />
    </>)
}