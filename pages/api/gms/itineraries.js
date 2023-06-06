import {connectToDatabase} from "./../../../middleware/dbMiddleware"

import { ObjectId } from 'mongodb';



async function handler(req, res){

    console.log("here @ handler")

    // create Itinerary
    if(req.method==="POST"){
        console.log("Here @ POST")

        const client = await connectToDatabase();
        const reqData= JSON.parse(req.body)

        const itineraryCreation = client
            .db('EcoAndesGMS')
            .collection("LTCItineraries");

        const aCreatedItin = await itineraryCreation
            .insertOne(reqData)

        if(aCreatedItin){
            res.status(200).json(aCreatedItin)
            client.close();
        }
        
        // error handling
    }
    // fetch user Itins
    else if (req.method==="PUT"){
        console.log("Here @ Put")

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
    // fetch all active itins
    else if (req.method==="GET"){ 

        console.log("Here @ GET")
        

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
    // edit itins
    else if (req.method==="DELETE"){ 

        console.log("Here @ Delete")


        const client = await connectToDatabase();
        const reqBody= JSON.parse(req.body)

        // Delete itinerary
        if(reqBody.dbCommand==="DELETE"){
            const DeleteItinerary = client
                .db('EcoAndesGMS')
                .collection("LTCItineraries")
                .findOneAndUpdate(
                    {"_id": ObjectId(reqBody.aTour._id)},
                    {
                        $set: { "status": 0 }
                    },
                    {
                        returnNewDocument: true,
                    }
                )

            const updatedItin = await DeleteItinerary
            if(updatedItin?.lastErrorObject.updatedExisting){
                res.status(200).json(updatedItin)
                client.close();
            } else res.status(501)
        }
        
        // EDIT ITINERARY
        else if(reqBody.dbCommand==="EDIT"){

            console.log("HERE @ EDIT")
            console.log( reqBody )

            let editKey = reqBody.editKey
            let editValue = reqBody.editValue
            let tempObj = {}
            tempObj[editKey] = editValue
            const DeleteItinerary = client
                .db('EcoAndesGMS')
                .collection("LTCItineraries")
                .findOneAndUpdate(
                    {"_id": ObjectId(reqBody.aTour._id)},
                    {
                        $set: tempObj 
                    },
                    {
                        returnNewDocument: true,
                    }
                )

            const updatedItin = await DeleteItinerary
            if(updatedItin?.lastErrorObject.updatedExisting){
                res.status(200).json(updatedItin)
                client.close();
            } else res.status(501)
        }
    }
}

export default handler;