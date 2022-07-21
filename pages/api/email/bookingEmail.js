const sgMail = require('@sendgrid/mail')
import nextConnect from 'next-connect';

const handler = nextConnect()

.post(async(req, res)=>{
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    let aRequest = req.body
    aRequest = JSON.parse(aRequest);
  const msg = {
    to: [aRequest.bookerEmail, 'info@unigalapagos.com', "djjabbua@gmail.com" ],
    from: 'info@unigalapagos.com', 
    template_id: "d-a7cda56da20c42a881c24e8ba1ff1286",
    dynamic_template_data: {
      "senderName": aRequest.senderName,
      "sender_Email": aRequest.senderEmail,
      "cruiseDepDate": aRequest.depDate,
      "cruiseArriDate": aRequest.arriDate,
      "blockExpDate": aRequest.timeLimit,
      "depNetRates": aRequest.depNetRates,
      "cruiseDuration": aRequest.duration,
      "cruiseItineraryCode": aRequest.itineraryCode,
      "cruiseBlockingRef": aRequest.bookingRefer,
      "cruiseDepPort":aRequest.cruiseDepPort,
      "rooming": aRequest.roomingList
    },
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
      res.status(200).json({email: "Res email sent"})
    })
    .catch((error) => {
      console.error(error)
    })
})

export default (req, res) => handler.run(req, res) 