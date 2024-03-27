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
            client.close();
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
    else if (req.method==="PUT"){
        const reqData= JSON.parse(req.body)
        let tempObj = {...reqData}
        delete tempObj._id

        const editAutofill = client
            .db('EcoAndesGMS')
            .collection("Templates")
            .findOneAndUpdate(
                {"_id": ObjectId(reqData._id)},
                {
                    $set: tempObj 
                },
                {
                    returnDocument: "after",
                }
            )
        const updatedEntry = await editAutofill
        if(updatedEntry?.lastErrorObject.updatedExisting){
            res.status(200).json(updatedEntry)
            client.close();
        } else {
            res.status(501)
            client.close();
        }

    }
}

export default handler;