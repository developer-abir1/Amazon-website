import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import { Store } from '../utils/store';

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/placeorder');
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
          <div key={payment} className="mb-4">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className={'label-text text-lg'}>{payment}</span>
                <input
                  checked={selectedPaymentMethod === payment}
                  onChange={() => setSelectedPaymentMethod(payment)}
                  type="checkbox"
                  className="checkbox checkbox-accent"
                />
              </label>
            </div>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push('/shipping')}
            type="button"
            className="default-button text-lg btn btn-ghost"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}
