import { Client } from "@microsoft/microsoft-graph-client";

async function handler(req,res){
    if(req.method==="GET"){

        const options = {
            authProvider,
        };

        const client = Client.init(options);

        let user = await client.api('/me')
            .get();


        if(response){
            res.status(200).json(response)
        }

    } else if(req.method==="POST"){
        // fetch according to selected range 
        let reqSheet = req.body
        try{
            const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
            const jwt = new google.auth.JWT(
            secrets.client_email,
            null,
            (secrets.private_key|| '').replace(/\\n/g, '\n'),
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