import { NextApiRequest, NextApiResponse } from 'next'
import { formatAmountForStripe } from '../../../utils/payments/stripe-helpers'

const CURRENCY = 'usd'
const MIN_AMOUNT = 1000.0
const MAX_AMOUNT = 50000.0

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_SHH!, {
  apiVersion: null,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { amount }: { amount: number } = req.body
    const { userEmail }: { userEmail: any } = req.body
    const { receiptDescription }: { receiptDescription: any } = req.body
    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error('Invalid amount.')
      }

//Payment intent is created with these parameters: 
//these are brought from API call to BE.
  const payment_intent = await stripe.paymentIntents.create({
        payment_method_types: ['card'],
        amount: formatAmountForStripe(amount, CURRENCY),
        receipt_email: userEmail,
        currency: CURRENCY,
        description: receiptDescription + "EcoAndes Travel"
    })
      res.status(200).json(payment_intent)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}