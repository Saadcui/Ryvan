'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import PlaceOrderSummaryPanel from './PlaceOrderSummaryPanel';
import { normalizeShippingMethod } from '@/lib/checkout';
import { useToast } from '@/component/Toast';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

export default function PlaceOrderPage() {
  const { items, cartCount, remove } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    country: 'Pakistan',
    saveInfo: false,
    paymentMethod: 'COD',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculations
  const subtotal = items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.qty || 0), 0);
  // Auto-calculate free shipping when subtotal exceeds 2000 (matches cart page logic)
  const shippingCost = subtotal > 2000 ? 0 : 200;
  const total = subtotal + shippingCost;
  const shippingMethod = normalizeShippingMethod(subtotal);

  useEffect(() => {
    if (cartCount === 0 && !loading) {
      // router.push('/cart');
    }
  }, [cartCount]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (items.length === 0) {
      addToast('Your cart is empty.', 'warning');
      return;
    }

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.address.trim() || !formData.city.trim() || !formData.phone.trim()) {
      addToast('Please fill in all required delivery details.', 'warning');
      return;
    }

    if (!isValidEmail(formData.email)) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    setLoading(true);
    setError('');

    const orderData = {
      userEmail: user?.email || formData.email,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      phone: formData.phone,
      country: formData.country,
      items: items.map(it => ({
        productId: it.id,
        title: it.title,
        image: it.image,
        price: it.price,
        qty: it.qty,
        size: it.size
      })),
      subtotal,
      shipping: shippingCost,
      shippingMethod,
      paymentMethod: formData.paymentMethod,
      total
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (data.success) {
        // Clear cart
        items.forEach(it => remove(it.id, it.size));
        addToast('Order placed successfully! Redirecting to orders...', 'success');
        setTimeout(() => router.push('/orders'), 1000);
      } else {
        addToast(data.error || 'Failed to place order', 'error');
        setError(data.error || 'Failed to place order');
      }
    } catch (err) {
      addToast('Network error. Please try again.', 'error');
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartCount === 0 && !loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black italic uppercase mb-4">Your Cart is Empty</h1>
          <button onClick={() => router.push('/collection')} className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition-all">
            Browse Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-4 sm:px-10 py-12 selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 border-b border-gray-200/30 dark:border-white/10 pb-8">
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
              Checkout <span className="text-gray-500 dark:text-gray-400 not-italic">Sequence</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 mt-2">
              Transmission Encrypted • {cartCount} Items in Cargo
            </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: FORM DETAILS */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Contact Information */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-emerald-400 font-black italic text-xl">01</span>
                <h2 className="text-xl font-black uppercase italic tracking-wider">Contact Information</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 dark:bg-black border border-gray-200/30 dark:border-white/10 rounded-xl px-4 py-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all"
                    placeholder="you@accelerate.com"
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                    className="w-4 h-4 accent-emerald-500 bg-transparent border-white/10 rounded" 
                  />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Email me with news and offers</span>
                </label>
              </div>
            </section>

            {/* Delivery Details */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-emerald-400 font-black italic text-xl">02</span>
                <h2 className="text-xl font-black uppercase italic tracking-wider">Delivery Logistics</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Country</label>
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 dark:bg-black border border-gray-200/30 dark:border-white/10 rounded-xl px-4 py-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all uppercase appearance-none"
                  >
                    <option value="Pakistan">Pakistan</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 dark:bg-black border border-gray-200/30 dark:border-white/10 rounded-xl px-4 py-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 dark:bg-black border border-gray-200/30 dark:border-white/10 rounded-xl px-4 py-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Address</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="House / Street / Area"
                    className="w-full bg-white/5 dark:bg-black border border-gray-200/30 dark:border-white/10 rounded-xl px-4 py-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">City</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 dark:bg-black border border-gray-200/30 dark:border-white/10 rounded-xl px-4 py-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Postal Code (Optional)</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 dark:bg-black border border-gray-200/30 dark:border-white/10 rounded-xl px-4 py-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+92 3XX XXXXXXX"
                    className="w-full bg-white/5 dark:bg-black border border-gray-200/30 dark:border-white/10 rounded-xl px-4 py-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Method */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-emerald-400 font-black italic text-xl">03</span>
                <h2 className="text-xl font-black uppercase italic tracking-wider">Shipping Method</h2>
              </div>
              <div className="space-y-3">
                <div className="block p-6 rounded-2xl border border-emerald-500 bg-emerald-500/5">
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest">
                        {shippingMethod === 'Free' ? 'Free delivery automatically applied' : 'Flat shipping applied'}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">
                        {shippingMethod === 'Free'
                          ? 'Orders above Rs 2,000 get free shipping.'
                          : 'Orders below Rs 2,000 include a Rs 200 shipping charge.'}
                      </p>
                    </div>
                    <span className={`font-black italic ${shippingMethod === 'Free' ? 'text-emerald-400' : 'text-white'}`}>
                      {shippingMethod === 'Free' ? 'FREE' : 'Rs 200'}
                    </span>
                  </div>
                </div>
              </div>
            </section>

             {/* Payment Method */}
             <section className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-emerald-400 font-black italic text-xl">04</span>
                <h2 className="text-xl font-black uppercase italic tracking-wider">Payment Protocol</h2>
              </div>
              <div className="p-6 rounded-2xl border border-emerald-500 bg-emerald-500/5">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-4 border-emerald-500" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">Cash on Delivery (COD)</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold text-wrap">Settle the invoice upon physical arrival of cargo.</p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY */}
          <PlaceOrderSummaryPanel
            items={items}
            subtotal={subtotal}
            shippingCost={shippingCost}
            total={total}
            error={error}
            loading={loading}
          />

        </form>
      </div>
    </div>
  );
}
