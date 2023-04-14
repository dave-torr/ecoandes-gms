import {connectToDatabase} from "./../../../middleware/dbMiddleware"

async function handler(req, res){
    if(req.method==="POST"){
        console.log("here at POST")
        const client = await connectToDatabase();
        const reqData= JSON.parse(req.body)



        const bookingCreation = client
            .db('EcoAndesGMS')
            .collection("LTCItineraries");

        const aCreatedItin = await bookingCreation
            .insertOne(reqData)

        if(aCreatedItin){
            res.status(201).json(aCreatedItin)
            client.close();
        }
        
        // error handling
    }



    else if (req.method==="put"){ }
    else if (req.method==="delete"){ }
}

export default handler;