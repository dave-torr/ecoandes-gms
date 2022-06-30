import { useEffect } from "react";


export function SubmitaBooking(props){
    aBooking = props.aBooking
    useEffect(()=>{
        console.log("yo!")
        let stringifiedBooking = JSON.stringify(props.aBooking)
            const res = await fetch("/api/b2cBookings", {
            method: "post",
            body: stringifiedBooking
        })        
        const createdBooking = await res.json()
        console.log(createdBooking)

        if(createdBooking){
            console.log("check yo backend")
        }
    },[])
}