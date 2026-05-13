const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// Dummy Stripe integration
router.post('/checkout', protect, async (req, res) => {
  try {
    // In a real app, you would create a Stripe Checkout session here
    // const session = await stripe.checkout.sessions.create({...});
    // res.json({ url: session.url });
    
    // Simulating immediate upgrade for MVP
    const user = await User.findById(req.user._id);
    user.plan = 'pro';
    await user.save();

    res.json({ message: 'Upgraded to Pro plan successfully', plan: 'pro' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  // Stripe webhook handler (structure only)
  // const sig = req.headers['stripe-signature'];
  // let event;
  // try {
  //   event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  // } catch (err) { ... }
  
  res.json({ received: true });
});

module.exports = router;
