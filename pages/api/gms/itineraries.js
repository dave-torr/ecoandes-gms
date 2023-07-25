import {connectToDatabase} from "./../../../middleware/dbMiddleware"

import { ObjectId } from 'mongodb';



async function handler(req, res){

    const client = await connectToDatabase();

    // create Itinerary
    if(req.method==="POST"){

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
    }
    // fetch user Itins
    else if (req.method==="PUT"){

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
            } else {
                res.status(501)
                client.close();
                }
        }
        
        // EDIT ITINERARY
        else if(reqBody.dbCommand==="EDIT"){

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
            } else {
                res.status(501)
                client.close();
            }
        }
    }
}

export default handler;