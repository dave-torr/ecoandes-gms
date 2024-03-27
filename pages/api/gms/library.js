import {connectToDatabase} from "./../../../middleware/dbMiddleware"
import { ObjectId } from 'mongodb';

async function handler(req, res){
    
    const client = await connectToDatabase();
    // //////////////////////////////////////////
    // //////////////////////////////////////////
    // // create provider OP
    if(req.method==="POST"){
        const reqData= JSON.parse(req.body)
        const providerCreation = client
            .db('EcoAndesGMS')
            .collection("libraryDB");

        const createProvider = await providerCreation
            .insertOne(reqData)
        if(createProvider){
            res.status(200).json(createProvider)
            client.close();
        }
    }

    // //////////////////////////////////////////
    // //////////////////////////////////////////
    // // fetch all active providers
    else if (req.method==="GET"){         
        const fetchLibrary = client
            .db('EcoAndesGMS')
            .collection("libraryDB")
            .find( { "status": {$gt: 0} } )
            .toArray();

        const fetchProviders = await fetchLibrary
        if(fetchProviders){
            res.status(200).json(fetchProviders)
            client.close();
        } else {
            console.log(fetchProviders)
            client.close();
        }
    }
    
    // //////////////////////////////////////////
    // //////////////////////////////////////////
    // // edit provider
    else if (req.method==="PUT"){
        const reqBody= JSON.parse(req.body)
        let depObj = {...reqBody.theDeparture}
        delete depObj._id
        const EditItin = client
            .db('EcoAndesGMS')
            .collection("libraryDB")
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
    // // delete provider
    else if (req.method==="DELETE"){ 
        const reqBody= JSON.parse(req.body)

        const deleteprovider = client
            .db('EcoAndesGMS')
            .collection("libraryDB")
            .findOneAndUpdate(
                {"_id": ObjectId(reqBody.aProvider._id)},
                {
                    $set: { "status": 0 }
                },
                {
                    returnNewDocument: true,
                }
            )

        const updatedItin = await deleteprovider
        if(updatedItin?.lastErrorObject.updatedExisting){
            res.status(200).json(updatedItin)
            client.close();
        } else res.status(501)

    }

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