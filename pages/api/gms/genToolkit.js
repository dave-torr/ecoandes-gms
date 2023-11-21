import {connectToDatabase} from "./../../../middleware/dbMiddleware"

import { ObjectId } from 'mongodb';

async function handler(req, res){
    
    const client = await connectToDatabase();
    
    // //////////////////////////////////////////
    // //////////////////////////////////////////
    // // fetch Gen Operational Data
    if (req.method==="GET"){         
        const fetchData = client
            .db('EcoAndesGMS')
            .collection("GMSgeneral")
            .find()
            .toArray();

        const fetchedData = await fetchData
        if(fetchedData){
            res.status(200).json(fetchedData)
            client.close();
        }
    }

    // //////////////////////////////////////////
    // //////////////////////////////////////////
    // // post gen data
    else if(req.method==="POST"){
        const reqData= JSON.parse(req.body)
        const departureCreation = client
            .db('EcoAndesGMS')
            .collection("GMSgeneral");
        const aCreatedDep = await departureCreation
            .insertOne(reqData)
        if(aCreatedDep){
            res.status(200).json(aCreatedDep)
            client.close();
        }
    }
    
    // //////////////////////////////////////////
    // //////////////////////////////////////////
    // // edit aDeparture
    else if (req.method==="PUT"){

    }

    // //////////////////////////////////////////
    // //////////////////////////////////////////
    // // delete departure
    // else if (req.method==="DELETE"){ 
    // }


}

export default handler;