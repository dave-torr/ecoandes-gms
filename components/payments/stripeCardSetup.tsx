import { fetchPostJSON } from '../../utils/payments/api-helpers'
import React, { useState, useEffect } from 'react'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import styles from "./../../styles/components/stripeStyles.module.css";

//CARD STYLING
//CARD STYLING
const CARD_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

  export function StripeGeneralCheckout(props){


    const [count, setCount] = useState(0)  



    const [payment, setPayment] = useState({ status: 'initial' })
    const [userEmail, setuserEmail] = useState< undefined | string >()
    const [errorMessage, setErrorMessage] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const [input, setInput] = useState({
    cardholderName: '',
  })  
    let receiptDescription=props.receiptDescription;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        // Abort if form isn't valid
        if (!e.currentTarget.reportValidity()) return
        setPayment({ status: 'processing' })
        // Create a PaymentIntent with the specified amount.

        console.log(props.totalBookingPrice)

        const response = await fetchPostJSON('/api/paymentIntents', {
            amount: props.totalBookingPrice,
            userEmail: userEmail,
            receiptDescription: receiptDescription
        })
        setPayment(response)

        if (response.statusCode === 500) {
            setPayment({ status: 'error' })
            setErrorMessage(response.message)
        return
        }

        const cardElement = elements!.getElement(CardElement)

        const { error, paymentIntent } = await stripe!.confirmCardPayment(
            response.client_secret,
            {
                payment_method: {
                card: cardElement!,
                billing_details: { name: input.cardholderName },
                },
                receipt_email: userEmail,
            }
        )

        if (error) {
            setPayment({ status: 'error' })
            setErrorMessage(error.message ?? 'An unknown error occured')
        } else if (paymentIntent) {
            setPayment(paymentIntent)
        }
    }

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
        setInput({
            ...input,
            [e.currentTarget.name]: e.currentTarget.value,
        })

/////////////////////////////////////////////////
/////////////////////////////////////////////////
useEffect(()=>{
  setCount(0)
},[])    

    // Flagged for export
    const createReservation= async ()=>{
        if(payment.status==="succeeded"&&count===0){
            setCount(count+1)
            let stringifiedBooking = JSON.stringify(props.aBooking)
                const res = await fetch("/api/b2cBookings", {
                method: "POST",
                body: stringifiedBooking
            })        
            const createdBooking = await res.json()
            console.log(createdBooking)

            if(createdBooking){
                console.log("check yo backend")
            }

            // if(createdBooking){ 
            //     console.log()
            // //  Email confirmation to Client
            //     const emailAct = await fetch("/api/b2cBooking/bookingEmail",{
            //         method: "post",
            //         body: stringifiedBooking
            //     })
            //     //  Email confirmation to Admin
            //     const emailAct2 = await fetch("/api/b2cBooking/adminDataEmail",{
            //         method: "post",
            //         body: stringifiedBooking
            //     })
            //     const emailActions = await emailAct.json()
            //     const emailActions2 = await emailAct2.json()                
            // }

        }
    }

    useEffect(()=>{
        if(payment.status==='succeeded'){
            createReservation()
            setCount(count+1)
            // send email to back end
        }
    },[payment])

    ////////////////
    // Payment Stat
    //////////////
    const PaymentStatus = ({ status }: { status: string }) => {
        switch (status) {

        case 'processing':

        case 'requires_payment_method':

        case 'requires_confirmation':
            return <h2> Processing ... </h2>

        case 'requires_action':
            return <h2>Additional Actions Required</h2>

        case 'succeeded':

            return (<>
                <h2> Payment Succesful!</h2>
                <h3> Our team will be in contact with you soon! </h3>
                <a href="mailto:info@ecoandestravel.com?cc=planificacion@ecoandestravel.com, david@latintravelcollection.com" target="_blank" rel="noopener noreferrer"> 
                    <div className={styles.availBTN}> 
                    Email Us!</div>
                </a>
            </>)

        case 'error':
            return (
            <>
                <h2>Error</h2>
                <p className="error-message">{errorMessage}</p>
            </>
            )

        default:
            return null
        }
    }


    return(
        <>
        <div style={{display: "flex", justifyContent: "center"}} > 
            <form onSubmit={(e)=>handleSubmit(e)} className={styles.CheckoutForm} >
            <PaymentStatus status={payment.status} />
                <input
                    placeholder="Cardholder's Name"
                    className={styles.CardInputfield}                
                    type="Text"
                    name="cardholderName"
                    onChange={handleInputChange}
                    required
                />
                <input
                    placeholder="Cardholder's Email*"
                    className={styles.CardInputfield}                
                    type="Text"
                    name="email"
                    onChange={(
                    ev: React.ChangeEvent<HTMLInputElement>,
                ): void => setuserEmail(ev.target.value)}
                    required
                />
                <div className={styles.CardInputfield}>
                    <CardElement
                    options={CARD_OPTIONS}
                    onChange={(e) => {
                        if (e.error) {
                        setPayment({ status: 'error' })
                        setErrorMessage(e.error.message ?? 'An unknown error occured')
                        } else {
                        setPayment({ status: 'initial' })
                        }
                    }}
                    />
                </div>

                {payment.status==="initial"&&<>
                <button
                    className={styles.CheckoutBtn}
                    type="submit"> 
                    Pay $ {props.totalBookingPrice.toLocaleString("en-US")} .- usd
                    </button></>}
                {payment.status==="error"||payment.status==="succeeded"&&
                <>
                    <button
                    className={styles.CheckoutBtn}
                    type="submit"
                    disabled> 
                    Payment Amount $ {props.totalBookingPrice.toLocaleString("en-US")} .- usd
                    </button></>}
                {payment.status==="error"&&
                <>
                    <button
                    className={styles.CheckoutBtn}
                    type="submit"
                    disabled> 
                    Payment Amount $ {props.totalBookingPrice.toLocaleString("en-US")} .- usd
                    </button></>}
                {payment.status==="processing"&&
                <>
                <button
                className={styles.CheckoutBtn}
                    type="submit"
                    disabled> 
                Payment Amount $ {props.totalBookingPrice.toLocaleString("en-US")} .- usd
                </button></>}


            <p className={styles.stripeInfoSection}>
            Payments with<a href="https://stripe.com/"><strong>  
            &nbsp; Stripe &nbsp;</strong></a> 
            to provide a safe and efficient payment gateway </p> 
            
        </form>
        </div>
        </>
    )
  }