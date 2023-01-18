import React, { useEffect, useState } from "react"

import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CircularProgress from '@mui/material/CircularProgress';


import styles from "./../styles/pages/raflPage.module.css"
import { useSession, signOut } from "next-auth/react"


export default function RaflePage(){


    // Rafle page


    //  - Filter for each day
    //  - remove from possible winners list
    //  - if participant is there we will send email confirmation through sendinblue API Virtual Certificate!!!!!!!!! Direct to EMAILL!!! WHOAAA

    // OP:
    //  - Pulls participant list Call API from email database
    //  - create random number generator with top limit contestant number
    //  - Display number, name and email of filtered participants


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////




    const { data: session } = useSession()

    const [toDate, setToDate]=useState(null)
    const [raffleParticipants, setRaffleParticipants] = useState(null)
    const [randNumber, setRandNumb]= useState(0)

    const [dataCallSwitch, setDataCallSwitch]=useState(false)


    useEffect(()=>{
        // use SswitchStatement to determine date of Event, set date for filter, event name switcher, any other tooling
        setToDate(new Date())
    },[])


    if(raffleParticipants){
        console.log(raffleParticipants)

    }



    // useEffect(()=>{
    //     if (raffleParticipants){

    //     }

    // },[dataCallSwitch])

    const eventNameSwitcher=(eventDate)=>{
        let eventCity;
        let testDate = new Date("2022-12-22").toDateString()
        let testDate2 = new Date("2022-12-21").toDateString()


        let chicagoDate = new Date("2023-01-15").toDateString()
        let chicagoDate2 = new Date("2023-01-16").toDateString()
        let bostonDate = new Date("2023-01-22").toDateString()
        let bostonDate2 = new Date("2023-01-23").toDateString()
        let newYorkDate = new Date("2023-01-28").toDateString()
        let newYorkDate2 = new Date("2023-01-30").toDateString()
        let washingtonDate = new Date("2023-02-05").toDateString()
        let washingtonDate2 = new Date("2023-02-06").toDateString()
        let losAngelesDate = new Date("2023-02-19").toDateString()
        let losAngelesDate2 = new Date("2023-02-20").toDateString()
        let denverDate = new Date("2023-02-05").toDateString()
        let denverDate2 = new Date("2023-02-06").toDateString()
        let dallasDate = new Date("2023-02-05").toDateString()
        let dallasDate2 = new Date("2023-02-06").toDateString()

        if(toDate!=null){
        switch(eventDate.toDateString()){
            case chicagoDate || chicagoDate2:
                eventCity= "Chicago"
                break;
            case bostonDate || bostonDate2:
                eventCity= "Boston"
                break;
            case newYorkDate || newYorkDate2:
                eventCity= "New York"
                break;
            case washingtonDate || washingtonDate2:
                eventCity= "Washington"
                break;
            case losAngelesDate || losAngelesDate2:
                eventCity= "Los Angeles"
                break;
            case denverDate || denverDate2:
                eventCity= "Denver"
                break;
            case dallasDate || dallasDate2:
                eventCity= "Dallas"
                break;

            case toDate.toDateString():
                eventCity= "Miami"
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
                        setDataCallSwitch(true)
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

            {dataCallSwitch ?<>

                {raffleParticipants==null&&<> 
                    <CircularProgress color="secondary" />
                </>}

            </>:<> 
                <div className={styles.dataRetrievalBTN} 
                    onClick={async()=>{
                        setDataCallSwitch(true)
                        const res = await fetch("/api/email/sendinBlueApi",{
                            method: "GET"
                        })
                        const rafleParticipants = await res.json()
                        setRaffleParticipants(rafleParticipants)
                    }}>
                    Get participants
                </div>
            </>}
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
    const aParticipant=(ParticipantData, theKey)=>{
        return(<>
            <div className={styles.aParticipantCont}> 
                <span>{theKey + 1} - {removeFirstWord(ParticipantData.attributes.NOMBRE)} </span>
                <span>{ParticipantData.attributes.CIUDAD}</span>
                <span>{ParticipantData.email.slice(0, 5)} . . .{ParticipantData.email.slice(-3)}</span>
            </div>
        </>)
    }
    const participantDisplayer=()=>{
        if(raffleParticipants!=null){
        return(<>
            <div className={styles.participantListCont}>
                <div className={styles.participantContBar}>
                    <h3>Participants:</h3> 
                    <span>
                        {raffleParticipants.count} &nbsp;
                        <LocalActivityIcon /> 
                    </span>
                </div>
                {raffleParticipants.contacts.map((elem, i)=>
                    <React.Fragment key={i}> 
                        {aParticipant(elem, i)} 
                    </React.Fragment>)}
            </div>
        </>)}
    }


    return(<>
        <div className={styles.generalRaflePage}>
            {rafleIntroDispl()}
            {session?<>
                {getClients()}
                {randomNumberGen(raffleParticipants)}
                {participantDisplayer()}
                <br/>
                <br/>
                <br/>
            </>:<>
                Please sign In
            </>}
        </div>
    </>)
}