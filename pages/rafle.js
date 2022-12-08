import React, { useEffect, useState } from "react"

import LocalActivityIcon from '@mui/icons-material/LocalActivity';

import styles from "./../styles/pages/raflPage.module.css"

export default function RaflePage(){


    // Rafle page


    // - Call API from email database
    //  - Filter for each day
    //  - remove from possible winners list
    //  - if participant is there we will send email confirmation through sendinblue API Virtual Certificate!!!!!!!!! Direct to EMAILL!!! WHOAAA

    // OP:
    //  - create random number generator with top limit contestant number
    //  - Display number, name and email of filtered participants


    const [toDate, setTodate]=useState(null)
    const [userData, setUserData] = useState(null)
    const [randNumber, setRandNumb]= useState(0)

    useEffect(()=>{
        setTodate(new Date())

        // use SswitchStatement to determine date of Event, set date for filter, event name switcher, any other tooling
    },[])

    const eventNameSwitcher=(eventDate)=>{
        let eventCity;
        let chicagoDate = new Date("2022-12-09").toDateString()
        let testDate = new Date("2022-12-10").toDateString()

        if(toDate!=null){
        switch(eventDate.toDateString()){
            case chicagoDate:
                eventCity= "Chicago"
                break;
            case testDate:
                eventCity= "Hell Yeah Biatch"
                break;
        }
        return(<>{eventCity}</>)
        }
    }


    const randomNumberGen=(topLimit)=>{
        if(topLimit!=null){
            return(<>
                <div className={styles.randomNumberBTN}
                    onClick={()=>{
                        setRandNumb(Math.floor(Math.random() * topLimit.count+1))
                    }}> Get Random Number </div>
                <div>the Random Number:</div>
                <div>{randNumber}</div>
            </>)
        }
    }

// extract use Effect from here

    const getClients=()=>{
        return(<>
            <div className={styles.dataRetrievalBTN} 
                onClick={async()=>{
                const res = await fetch("/api/email/sendinBlueApi",{
                    method: "GET"
                })
                const rafleParticipants = await res.json()
                setUserData(rafleParticipants)
            }}>
            Get participants
            </div>
        </>)
    }

    const rafleIntroDispl=()=>{
        return(<>
            <div className={styles.raffleInfoCont}>
                <h2> The Travel and Adventure Show</h2>
                <h1>{eventNameSwitcher(toDate)}</h1>
                <h2 className={styles.participantTitleDisplayer2}> Raffle</h2>
                <div className={styles.dateDisplayer}> {toDate!=null && toDate.toDateString()}</div>
            </div>
        </>)
    }

    function removeFirstWord(str) {
        return str.split(' ')[0]
    }
    const aParticipant=(ParticipantData)=>{
        return(<>
            <div className={styles.aParticipantCont}> 
                <span>{removeFirstWord(ParticipantData.attributes.NOMBRE)} </span>
                <span>{ParticipantData.attributes.CIUDAD}</span>
                <span>{ParticipantData.email.slice(0, 5)} . . .{ParticipantData.email.slice(-3)}</span>
            </div>
        </>)
    }
    const participantDisplayer=()=>{
        if(userData!=null){
        return(<>
            <div className={styles.participantListCont}>
                <div className={styles.participantContBar}>
                    <h3>Participants:</h3> 
                    <span>
                        {userData.count} &nbsp;
                        <LocalActivityIcon /> 
                    </span>
                </div>
                {userData.contacts.map((elem, i)=>
                    <React.Fragment key={i}> 
                        {aParticipant(elem)} 
                    </React.Fragment>)}
            </div>
        </>)}
    }


    return(<>
        <div className={styles.generalRaflePage}>
            {rafleIntroDispl()}
            {getClients()}
            {randomNumberGen(userData)}
            {participantDisplayer()}
        </div>
    </>)
}