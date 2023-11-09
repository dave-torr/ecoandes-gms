import {connectToDatabase} from "./../../../middleware/dbMiddleware"

import { ObjectId } from 'mongodb';

async function handler(req, res){
    
    const client = await connectToDatabase();
    
    // //////////////////////////////////////////
    // //////////////////////////////////////////
    // // create Departure OP
    if(req.method==="POST"){
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
    }

    // //////////////////////////////////////////
    // //////////////////////////////////////////
    // // fetch all active deps
    else if (req.method==="GET"){         
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
    // // edit aDeparture
    else if (req.method==="PUT"){
        const reqBody= JSON.parse(req.body)
        let depObj = {...reqBody.theDeparture}
        delete depObj._id
        const EditItin = client
            .db('EcoAndesGMS')
            .collection("LTCDepartures")
            .replaceOne(
                {"_id": ObjectId(reqBody.theDeparture._id)},
                depObj
            )
        const updatedDep = await EditItin
        if(updatedDep?.modifiedCount){
            res.status(200).json(updatedDep)
            client.close();
        } else {
            res.status(501)
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