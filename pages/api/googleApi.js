import { google } from "googleapis";
// import secrets from "./../../secrets.json"

let spreadsheetID = process.env.spreadsheetID

async function handler(req,res){
    if(req.method==="GET"){

        const auth = await google.auth.getClient({
            scopes:[ "https://www.googleapis.com/auth/spreadsheets.readonly" ]
        });
        const sheets = google.sheets({ version:"v4", auth });

        const response = await sheets.spreadsheets.get({
            spreadsheetId: spreadsheetID,
        })
        if(response){
            res.status(200).json(response)
        }
    } else if(req.method==="POST"){
        // fetch according to selected range 
        let reqSheet = req.body
        try{
            const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
            const jwt = new google.auth.JWT(
            // secrets.client_email,
            process.env.GOOGLE_CLIENT_EMAIL,
            null,
            // (secrets.private_key|| '').replace(/\\n/g, '\n'),
            // (secrets.private_key|| ''),
            (process.env.GOOGLE_PRIVATE_KEY|| '').replace(/\\n/g, '\n'),
            target, 
            );
            const sheets = google.sheets({ version: "v4",auth: jwt })

            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: spreadsheetID,
                range: `${reqSheet}!A:B`
            })

            if(response){
                res.status(200).json(response.data.values)
            }
        } catch (err){
            console.log(err, "ERROR");
        }
    }
}

export default handler;