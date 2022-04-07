import React from "react"
import TourData from "../../data/ecuItinEng"
import styles from "./../../styles/pages/tourPage.module.css"

import Link from 'next/link'

export default function TourPage(props){

    const tourdisplayer=()=>{
        return(<>
            {props.TourData.map((elem, i)=>
            <React.Fragment key={i}>
                <Link href={`/tours/${elem.id}`}> 
                    <div className={styles.eachTourLink}>
                        {elem.tripName} 
                    </div>
                </Link>
            </React.Fragment>)}
        </>)
    }

    return(<>
        <div> Tour Page</div>

        {tourdisplayer()}
    </>)
}

export async function getStaticProps(context) {
  return {
    props: {TourData}
  }
} 