import {connectToDatabase} from "../../../middleware/dbMiddleware"

async function handler(req, res){

    if(req.method==="POST"){
        const reqData= JSON.parse(req.body)


        const client = await connectToDatabase();
        const imgInstanceCreation = client
            .db('EcoAndesGMS')
            .collection("pixLTCWide");
        const imgInstace = await imgInstanceCreation
            .insertOne({...reqData})

        if(imgInstace){
            res.status(201).json(imgInstace)
            client.close();
            // return {...imgInstace}
        }
        // error handling
    }



    else if (req.method==="put"){ }
    else if (req.method==="delete"){ }
}

export default handler;