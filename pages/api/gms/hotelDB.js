import {connectToDatabase} from "./../../../middleware/dbMiddleware"

async function handler(req, res){

    // ADD HOTELS TO db
    if(req.method==="POST"){
        const reqData= JSON.parse(req.body)
        const client = await connectToDatabase();
        const hotelRecord = client
            .db('EcoAndesGMS')
            .collection("hotelDB");
        const aHotelRecord = await hotelRecord
            .insertOne(reqData)

        if(aHotelRecord){
            client.close();
            res.json(aHotelRecord)
        }
        // error handling
    }
    ////////////////////////////////////
    // edit hotel record
    else if (req.method==="put"){ 
    }
    else if (req.method==="delete"){ }
}
export default handler;