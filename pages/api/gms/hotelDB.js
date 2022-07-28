import {connectToDatabase} from "./../../../middleware/dbMiddleware"

async function handler(req, res){
    console.log("Req @ hotelRates")
    if(req.method==="POST"){
        console.log("here at POST")
        const client = await connectToDatabase();
        const reqData= JSON.parse(req.body)

        const hotelRecord = client
            .db('EcoAndesGMS')
            .collection("hotelDB");

        const aHotelRecord = await hotelRecord
            .insertOne(reqData)

        if(aHotelRecord){
            client.close();
            return {...aHotelRecord}
        }
        // error handling
    }



    else if (req.method==="put"){ 
        // edit hotel record
    }
    else if (req.method==="delete"){ }
}

export default handler;