import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

function PaymentForm() {
  const [product] = useState({
    name: 'Example Product',
    price: 10,
  });

  const handleToken = async (token, addresses) => {
    const response = await fetch('/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: product.price * 100,
        id: token.id,
      }),
    });

    const data = await response.json();

    console.log(data.message);
  };

  return (
    <StripeCheckout
      stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
      token={handleToken}
      amount={product.price * 100}
      name={product.name}
      billingAddress
      shippingAddress
    />
  );
}

export default PaymentForm;
