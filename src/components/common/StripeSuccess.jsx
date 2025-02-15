import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiUrl, customerToken } from './Http';

const StripeSuccess = () => {
    const location = useLocation();

    useEffect(() => {
        const sessionId = new URLSearchParams(location.search).get('session_id');

        if (sessionId) {
            // Call the backend to verify the payment and create the order
            fetch(apiUrl + "verify-payment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                   Authorization: `Bearer ${customerToken()}`,// Add token if needed
                },
                body: JSON.stringify({ session_id: sessionId }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to verify payment.');
                    }
                    return response.json();
                })
                .then(data => {
                    toast.success('Payment successful! Order created.');
                })
                .catch(error => {
                    console.error('Error verifying payment:', error);
                    toast.error('Failed to verify payment.');
                });
        } else {
            toast.error('Invalid session ID.');
        }
    }, [location]);

    return (
        <div>
            <h1>Payment Successful!</h1>
            <p>Your order is being processed.</p>
        </div>
    );
};

export default StripeSuccess;