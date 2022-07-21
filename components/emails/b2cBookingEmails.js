
export async function BookingConfirmEmail (props){
    let emailObj =
        [ ...props.emailObj ]


    console.log(emailObj)
    let stringifiedResEmailObj = JSON.stringify(emailObj)
    const resEmail = await fetch( "/api/email/bookingEmail" ,{
        method: "post",
        body: stringifiedResEmailObj
    })
    const theResMail = await resEmail.json()
    if(theResMail){
        console.log("booking email sent")
    }
}