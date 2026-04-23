import React, { useContext, useEffect, useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { API_URL } from '../config';

const PayPalButton = ({ product }) => {
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const [clientId, setClientId] = useState('');

    useEffect(() => {
        const fetchClientId = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/payments/config/paypal`);
                setClientId(data.clientId);
            } catch (error) {
                console.error('Failed to load PayPal client id', error);
            }
        };
        fetchClientId();
    }, []);

    const createOrder = async (data, actions) => {
        try {
            const res = await axios.post(
                `${API_URL}/api/payments/create-order`,
                {
                    orderItems: [{ product: product._id, name: product.title, qty: 1 }]
                },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
            );
            return res.data.id;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to initialize checkout');
            console.error(error);
        }
    };

    const onApprove = async (data, actions) => {
        try {
            const res = await axios.post(
                `${API_URL}/api/payments/capture-order`,
                {
                    orderId: data.orderID,
                    orderItems: [{ product: product._id, name: product.title, qty: 1 }],
                    totalPrice: product.price
                },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
            );
            toast.success('Payment Successful!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Payment capture failed');
            console.error(error);
        }
    };

    const onError = (err) => {
        toast.error('PayPal Checkout failed');
        console.error(err);
    };

    if (!clientId) {
        return <div className="text-gray-400 animate-pulse text-sm">Loading payment gateway...</div>;
    }

    return (
        <div className="mt-4 relative z-10">
            <PayPalScriptProvider options={{ "client-id": clientId, currency: "USD", intent: "capture" }}>
                <PayPalButtons
                    style={{ layout: "vertical", color: "blue", shape: "rect", label: "checkout", height: 40 }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                />
            </PayPalScriptProvider>
        </div>
    );
};

export default PayPalButton;
