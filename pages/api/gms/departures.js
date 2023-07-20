import {connectToDatabase} from "./../../../middleware/dbMiddleware"

import { ObjectId } from 'mongodb';

async function handler(req, res){
    
    const client = await connectToDatabase();
    
    // Old stuff might need to rephase func
    // const fetchDepartures = client
    //     .db('EcoAndesGMS')
    //     .collection("LTCDepartures")
    //     .find()
    //     .toArray();

    // const fetchedDeps = await fetchDepartures
    // if(fetchedDeps){
    //     res.status(200).json(fetchedDeps)
    //     client.close();
    // }


    // //////////////////////////////////////////
    // //////////////////////////////////////////
    // // create Departure
    if(req.method==="POST"){

        console.log("here at Post Yo, ")

        const client = await connectToDatabase();
        const reqData= JSON.parse(req.body)

        const departureCreation = client
            .db('EcoAndesGMS')
            .collection("LTCDepartures");

        const aCreatedDep = await departureCreation
            .insertOne(reqData)

        if(aCreatedDep){
            res.status(200).json(aCreatedDep)
            client.close();
        }
        
        // error handling
    }

    // //////////////////////////////////////////
    // //////////////////////////////////////////
    // // fetch all active deps
    else if (req.method==="GET"){ 
        const client = await connectToDatabase();
        
        const fetchDepartures = client
            .db('EcoAndesGMS')
            .collection("LTCDepartures")
            .find( { "status": {$gt: 0} } )
            .toArray();

        const fetchedDeps = await fetchDepartures
        if(fetchedDeps){
            res.status(200).json(fetchedDeps)
            client.close();
        }
    }



    // //////////////////////////////////////////
    // //////////////////////////////////////////
    // // delete departure
    // else if (req.method==="DELETE"){ 
    //     const client = await connectToDatabase();
    //     const reqBody= JSON.parse(req.body)

    //     // Delete itinerary
    //     // const DeleteDeparture = client
    //     //     .db('EcoAndesGMS')
    //     //     .collection("LTCDepartures")
    //     //     .findOneAndUpdate(
    //     //         {"_id": ObjectId(reqBody.aTour._id)},
    //     //         {
    //     //             $set: { "status": 0 }
    //     //         },
    //     //         {
    //     //             returnNewDocument: true,
    //     //         }
    //     //     )

    //     // const updatedItin = await DeleteDeparture
    //     // if(updatedItin?.lastErrorObject.updatedExisting){
    //     //     res.status(200).json(updatedItin)
    //     //     client.close();
    //     // } else res.status(501)

    // }

    // //////////////////////////////////////////
    // //////////////////////////////////////////
    // // edit Departures with key and value 
    // else if (req.method==="PUT"){ 

    //     console.log("HERE @ EDIT")
    //     console.log( reqBody )

    //     // let editKey = reqBody.editKey
    //     // let editValue = reqBody.editValue
    //     // let tempObj = {}
    //     // tempObj[editKey] = editValue
    //     // const EditItinerary = client
    //     //     .db('EcoAndesGMS')
    //     //     .collection("LTCDepartures")
    //     //     .findOneAndUpdate(
    //     //         {"_id": ObjectId(reqBody.aTour._id)},
    //     //         {
    //     //             $set: tempObj 
    //     //         },
    //     //         {
    //     //             returnNewDocument: true,
    //     //         }
    //     //     )

    //     // const updatedItin = await EditItinerary
    //     // if(updatedItin?.lastErrorObject.updatedExisting){
    //     //     res.status(200).json(updatedItin)
    //     //     client.close();
    //     // } else res.status(501)

    // }

}

export default handler;