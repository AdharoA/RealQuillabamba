import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const Checkout = ({ items, onComplete, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card max-w-md w-full p-8 rounded-3xl border border-border shadow-xl text-center">
          <CheckCircle2 className="h-20 w-20 text-accent mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Order Confirmed!</h2>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. Your Rwandan artisanal coffee is being prepared for shipping and will arrive soon.
          </p>
          <div className="p-4 bg-muted/30 rounded-xl border border-border text-sm text-foreground">
            Order #RWA-{Math.floor(Math.random() * 90000) + 10000}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-8 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" /> Back to Cart
        </button>

        <h1 className="text-4xl font-extrabold text-foreground mb-12">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Shipping Information</h2>
            <form id="checkout-form" onSubmit={handlePay} className="space-y-4">
              <input type="text" required placeholder="Full Name" className="w-full p-4 bg-input text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="email" required placeholder="Email Address" className="w-full p-4 bg-input text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="text" required placeholder="Address" className="w-full p-4 bg-input text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required placeholder="City" className="w-full p-4 bg-input text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="text" required placeholder="Zip Code" className="w-full p-4 bg-input text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>

              <h2 className="text-xl font-bold text-foreground mb-6 mt-8">Payment Details</h2>
              <input type="text" required placeholder="Card Number" className="w-full p-4 bg-input text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required placeholder="MM/YY" className="w-full p-4 bg-input text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="text" required placeholder="CVC" className="w-full p-4 bg-input text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </form>
          </div>

          <div>
              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm sticky top-24">
                <h3 className="text-xl font-bold text-foreground mb-6">Pay Today</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Items ({items.length})</span>
                    <span>S/ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>S/ 5.00</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Taxes</span>
                    <span>S/ {(total * 0.08).toFixed(2)}</span>
                  </div>
                </div>
                <div className="h-px bg-border my-6"></div>
                <div className="flex justify-between text-2xl font-extrabold text-foreground mb-8">
                  <span>Total</span>
                  <span>S/ {(total + 5 + total * 0.08).toFixed(2)}</span>
                </div>
                <button 
                  type="submit"
                  form="checkout-form"
                  disabled={isProcessing}
                  className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isProcessing ? 'Processing...' : `Pay S/ ${(total + 5 + total * 0.08).toFixed(2)}`}
                </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};
