import {connectToDatabase} from "./../../middleware/dbMiddleware"

async function handler(req, res){
    if(req.method==="POST"){
    const client = await connectToDatabase();
        const reqData= JSON.parse(req.body)
        const newRecord = client
            .db('Yacuma')
            .collection("trapCameraRecords");

        const theRecord = await newRecord
            .insertOne(reqData)

        if(theRecord){
            client.close();
            res.json(theRecord)
        }
        
        // error handling
    }
    else if (req.method==="GET"){ 
    const client = await connectToDatabase();
        const FetchedRecords = client
            .db('Yacuma')
            .collection("trapCameraRecords")
            .find()
            .toArray();
        const fetchedIts = await FetchedRecords
        if(fetchedIts){
            res.status(200).json(fetchedIts)
            client.close();
        }
        // error handling
    }
    else if (req.method==="PUT"){ }
    else if (req.method==="DELETE"){ }
}

export default handler;