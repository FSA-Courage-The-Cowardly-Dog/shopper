const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
// testing with public key for now
const stripe = require('stripe')('pk_test_51LmjNEJX4F0kIK6BNSw021mmdUkQXeznZtMIwTQUnsSYRjLaMNWZ2HOaQvCCNAlDfClPj13TImasMXxXKuPIB6M900aqrXvak4')

//middleware
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.json());

app.use('/api', require('./api'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// stripe integration
app.post('/create-payment-intent', async (req, res,next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
    amount: 0,
    currency: 'usd',
    })
    res.json({clientSecret: paymentIntent.clientSecret})
  } catch (err) {
    // could flesh out this error more
    next(err)
  }
})

// app.post('/create-checkout-session', async (req, res, next) => {
//   try {
//     const session = stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       // line_items
//       // success_url:
//       // cancel_url:
//     })
//   } catch (err) {
//     next(err)
//   }
// })

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});
app.get('/*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
});

module.exports = app;
