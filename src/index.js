import React from 'react';
import ReactDOM from 'react-dom/client';
// import "./index.css";
import store from './store';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// for stripe integration
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
// stripe publishable test key
const stripePromise = loadStripe('pk_test_51LmjNEJX4F0kIK6BNSw021mmdUkQXeznZtMIwTQUnsSYRjLaMNWZ2HOaQvCCNAlDfClPj13TImasMXxXKuPIB6M900aqrXvak4')

const root = ReactDOM.createRoot(document.getElementById('root'));
const options = {
  // passing the client secret obtained from the server
  // unsure how to hook this up yet; will look into later
  clientSecret: '{{CLIENT_SECRET}}',
};
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </BrowserRouter>
);
