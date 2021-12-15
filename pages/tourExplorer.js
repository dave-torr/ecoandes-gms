import { useState, useEffect } from "react";

import ExploreIcon from '@mui/icons-material/Explore';
import {ItineraryImagePicker, LogoSwitcher, HighlightAdder} from "./../components/forms"
import CancelIcon from '@mui/icons-material/Cancel';

import styles from "../styles/pages/tourExplorer.module.css"

export default function TourExplorerPage(props){

    const [aTourCreator, setTourCreator]=useState({
        "ecoAndesLogo": true,
        "highlights":[]
    })
    const tourExplorerIntro=()=>{
        return(<>
            <div className={styles.teIntroCont}>
                <div className={styles.iconCont}>
                    <ExploreIcon fontSize="large" />
                </div>
                <h1> Tour Explorer</h1>
            </div>
        </>)
    }
    const removeHighlight=(aList, prodIndex)=>{
        let tempList=[...aList];
        tempList.splice(prodIndex, 1)
        setTourCreator({...aTourCreator,
            "highlights": tempList
        })
    }
    const highlightDispAdder=()=>{
        let theHighlights;
        if(aTourCreator.highlights){
            theHighlights = aTourCreator.highlights.map((elem, i)=>
            <div className={styles.tourHighlightCont}>
                <div className={styles.aHighlight}> - {elem}</div>
                <CancelIcon onClick={()=>{
                    removeHighlight(aTourCreator.highlights, i)
                }} />
            </div>)
        }

        return(<>
            <div className={styles.highlightList}> 
            <h2> Tour Highlights: </h2>
                {theHighlights} 
            </div>
            <div>
                <HighlightAdder 
                    aTour={aTourCreator} 
                    tourEditor={setTourCreator} 
                />
            </div>
        </>)
    }


    return(<>
        <div className={styles.generalPageCont}>
            {tourExplorerIntro()}
            <ItineraryImagePicker 
                aTour={aTourCreator} 
                tourEditor={setTourCreator} 
            />
            <LogoSwitcher 
                aTour={aTourCreator} 
                tourEditor={setTourCreator} 
            />
            {highlightDispAdder()}

        </div>
    </>)
}
