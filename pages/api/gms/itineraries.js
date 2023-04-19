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
            res.status(200).json(aCreatedItin)
            client.close();
        }
        
        // error handling
    }



    else if (req.method==="PUT"){ 

        const client = await connectToDatabase();
        const reqData= JSON.parse(req.body)

        const FetchedUserItins = client
            .db('EcoAndesGMS')
            .collection("LTCItineraries")
            .find( { "user.name": reqData } )
            .toArray();

        const fetchedIts = await FetchedUserItins


        if(fetchedIts){
            res.status(200).json(fetchedIts)
            client.close();
        }

    }
    else if (req.method==="delete"){ }
}

export default handler;