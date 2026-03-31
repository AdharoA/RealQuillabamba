import React from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';

export const Cart = ({ items, onCheckout, onBack }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  // Group items by ID to show quantities
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 0 };
    }
    acc[item.id].quantity += 1;
    return acc;
  }, {});

  const cartArray = Object.values(groupedItems);

  return (
    <div className="min-h-screen bg-background pt-8 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" /> Continue Shopping
        </button>

        <h1 className="text-4xl font-extrabold text-foreground mb-12">Your Cart</h1>

        {cartArray.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-border shadow-sm">
            <div className="text-muted-foreground mb-6">Your cart is empty. Time to discover Rwandan excellence.</div>
            <button 
              onClick={onBack}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors"
            >
              Explore Catalog
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-6">
              {cartArray.map((item) => (
                <div key={item.id} className="flex gap-6 bg-card p-4 rounded-2xl border border-border shadow-sm items-center">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground mb-1">{item.name}</h3>
                    <div className="text-sm text-muted-foreground">{item.roast} Roast</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-foreground w-24 whitespace-nowrap">S/ {(item.price * item.quantity).toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground mt-1">Qty: {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-1/3">
              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm sticky top-24">
                <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>S/ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                <div className="h-px bg-border my-6"></div>
                <div className="flex justify-between text-2xl font-extrabold text-foreground mb-8">
                  <span>Total</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-gold text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
