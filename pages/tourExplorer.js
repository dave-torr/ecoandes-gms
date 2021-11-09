import { useState, useEffect } from "react";

import ExploreIcon from '@mui/icons-material/Explore';


import styles from "../styles/pages/tourExplorer.module.css"

export default function TourExplorerPage(props){

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

    return(<>
        <div className={styles.tourExplorerCont}>
            {tourExplorerIntro()}
        </div>
    </>)
}
