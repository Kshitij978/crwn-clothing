import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HPW26II6LCC2SyNrgyJf1eeIv0UKzH9s5VuqOmu5HgffHSfCz0DfzlIxJsGkM4av5rdRY6tenNhxzZX2mp32XJ900C7ZVKd3s';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
            <StripeCheckout 
                label='Pay Now'
                name='CRWN Clothing Ltd.'
                billingAddress
                shippingAddress
                image='https://sendeyo.com/up/d/f3eb2117da'
                description={`Your total is $${price}`}
                amount={priceForStripe}
                panelLabel= 'Pay Now'
                token={onToken}
                stripeKey={publishableKey}
            />
    );
};

export default StripeCheckoutButton;