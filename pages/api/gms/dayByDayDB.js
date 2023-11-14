import {connectToDatabase} from "./../../../middleware/dbMiddleware"
import { ObjectId } from 'mongodb';


async function handler(req, res){

    const client = await connectToDatabase();
    if (req.method==="GET"){           
        const FetchedTemplates = client
            .db('EcoAndesGMS')
            .collection("Templates")
            .find()
            .toArray();

        const fetchedIts = await FetchedTemplates
        if(fetchedIts){
            res.status(200).json(fetchedIts)
            client.close();
        } else {
            console.log(FetchedTemplates)
        }
    }

    else if(req.method==="POST"){
        const reqData= JSON.parse(req.body)
        const createRecord = client
            .db('EcoAndesGMS')
            .collection("Templates");

        const aCreatedRecord = await createRecord
            .insertOne(reqData)
        if(aCreatedRecord){
            res.status(200).json(aCreatedRecord)
            client.close();
        }
    }

}

export default handler;