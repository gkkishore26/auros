const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
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
    console.error('Stripe error:', detail);
    res.status(500).json({ error: detail || err.message });
  }
};
