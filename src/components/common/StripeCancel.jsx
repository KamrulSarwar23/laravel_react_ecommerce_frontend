import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const StripeCancel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        toast.error('Payment Canceled.');
        navigate('/checkout');
    }, [navigate]);

    return <div>Payment canceled. Redirecting...</div>;
};

export default StripeCancel;