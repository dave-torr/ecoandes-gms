import {connectToDatabase} from "./../../../middleware/dbMiddleware"

import { ObjectId } from 'mongodb';

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
            .find(
                {$and:[
                    { "user.name": reqData },
                    { "status": {$gt: 0} },
                ]} 
            )
            .toArray();

        const fetchedIts = await FetchedUserItins


        if(fetchedIts){
            res.status(200).json(fetchedIts)
            client.close();
        }

    }
    else if (req.method==="GET"){ 
        const client = await connectToDatabase();
        
        const FetchedUserItins = client
            .db('EcoAndesGMS')
            .collection("LTCItineraries")
            .find( { "status": {$gt: 0} } )
            .toArray();

        const fetchedIts = await FetchedUserItins
        if(fetchedIts){
            res.status(200).json(fetchedIts)
            client.close();
        }
    }
    else if (req.method==="DELETE"){ 
        const client = await connectToDatabase();
        const reqData= JSON.parse(req.body)
        

        const DeleteItinerary = client
            .db('EcoAndesGMS')
            .collection("LTCItineraries")
            .findOneAndUpdate(
                {"_id": ObjectId(reqData)},
                {
                    $set: { "status": 0 }
                },
                {
                    returnNewDocument: true,
                }
            )

        const updatedItin = await DeleteItinerary

    console.log(DeleteItinerary,"DeleteItinerary")

        if(updatedItin?.lastErrorObject.updatedExisting){
            res.status(200).json(updatedItin)
            client.close();
        } else res.status(400)

    }
}

export default handler;