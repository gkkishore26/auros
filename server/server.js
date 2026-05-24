const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

/* ── Stripe ──────────────────────────────────────────── */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, customer } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency || 'inr',
      payment_method_types: ['card'],
      receipt_email: customer?.email,
      metadata: { customer_name: customer?.name || '' }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    const detail = err.type === 'StripeError' ? err.raw?.message : err.message;
    console.error('Stripe error:', detail, JSON.stringify(err.raw || {}, null, 2));
    res.status(500).json({ error: detail || err.message });
  }
});

/* ── Start ───────────────────────────────────────────── */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Payment server running on http://localhost:' + PORT);
  console.log('Endpoints:');
  console.log('  POST /api/create-payment-intent');
});
