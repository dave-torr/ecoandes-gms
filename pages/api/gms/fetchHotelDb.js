import {connectToDatabase} from "./../../../middleware/dbMiddleware"

// Route used with SWR to have real time updating of HOTELS

// NON OP

export default async (req,res)=>{
    const client = await connectToDatabase();
    const hotelRecords = client
        .db('EcoAndesGMS')
        .collection("hotelDB")
        .find({})
        .toArray();

    console.log(hotelRecords)
    res.json(hotelRecords)
}