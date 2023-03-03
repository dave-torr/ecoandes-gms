import {connectToDatabase} from "../../../middleware/dbMiddleware"

async function handler(req, res){

    if(req.method==="POST"){
        const reqData= JSON.parse(req.body)
        console.log(reqData)
        // const client = await connectToDatabase();
        // const imgInstanceCreation = client
        //     .db('EcoAndesGMS')
        //     .collection("pixImageAdministration");
        // const imgInstace = await imgInstanceCreation
        //     .insertOne(reqData)

        // if(imgInstace){
        //     client.close();
        //     return {...imgInstace}
        // }
        // error handling

    }



    else if (req.method==="put"){ }
    else if (req.method==="delete"){ }
}

export default handler;