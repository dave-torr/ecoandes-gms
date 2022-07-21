import {connectToDatabase} from "./../../middleware/dbMiddleware"

async function handler(req, res){
    console.log("here at Req")
    if(req.method==="POST"){
        console.log("here at PSOT")
        const client = await connectToDatabase();
        const reqData= JSON.parse(req.body)

        const bookingCreation = client
            .db('EcoAndesGMS')
            .collection("caneteDigBookings");

        const theBooking = await bookingCreation
            .insertOne(reqData)

        if(theBooking){
            client.close();
            return {...theBooking}
        }
        
        // error handling
    }



    else if (req.method==="put"){ }
    else if (req.method==="delete"){ }
}

export default handler;