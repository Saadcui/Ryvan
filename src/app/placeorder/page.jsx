'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PlaceOrderPage() {
  const { items, cartCount, remove } = useCart();
  const { user } = useAuth();
  const router = useRouter();

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
    shippingMethod: 'Flat', // 'Flat' or 'Free'
    paymentMethod: 'COD',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculations
  const subtotal = items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.qty || 0), 0);
  const shippingCost = formData.shippingMethod === 'Flat' ? 100 : 0;
  const total = subtotal + shippingCost;

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
    setLoading(true);
    setError('');

    const orderData = {
      userId: user?.id,
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
      shippingMethod: formData.shippingMethod,
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
        router.push('/orders');
        alert('Order placed successfully!');
      } else {
        setError(data.error || 'Failed to place order');
      }
    } catch (err) {
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
                <label className={`block p-6 rounded-2xl border transition-all cursor-pointer ${formData.shippingMethod === 'Flat' ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/10 hover:border-white/20'}`}>
                  <input 
                    type="radio" 
                    name="shippingMethod" 
                    value="Flat"
                    checked={formData.shippingMethod === 'Flat'}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest">FLAT Shipping 99 PKR + FBR POS Fee 1 PKR</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">Standard Delivery 3-5 Days</p>
                    </div>
                    <span className="font-bold">Rs 100.00</span>
                  </div>
                </label>
                <label className={`block p-6 rounded-2xl border transition-all cursor-pointer ${formData.shippingMethod === 'Free' ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/10 hover:border-white/20'}`}>
                  <input 
                    type="radio" 
                    name="shippingMethod" 
                    value="Free"
                    checked={formData.shippingMethod === 'Free'}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest">FREE DELIVERY (CARD PAYMENT ONLY)</p>
                      <p className="text-[10px] text-emerald-400 mt-1 uppercase font-black">Elite Benefit</p>
                    </div>
                    <span className="font-black italic text-emerald-400">FREE</span>
                  </div>
                </label>
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
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              <div className="p-8 rounded-[40px] bg-white/5 dark:bg-black/5 backdrop-blur-3xl border border-gray-200/30 dark:border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -z-10" />
                
                <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-8 border-b border-gray-200/30 dark:border-white/10 pb-4">
                    Order Summary
                </h2>

                <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((it) => (
                    <div key={`${it.id}-${it.size}`} className="flex gap-4">
                      <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-gray-900 border border-white/5 shrink-0">
                        <Image src={it.image} alt={it.title} fill className="object-cover" unoptimized />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="text-[11px] font-black uppercase tracking-tight italic line-clamp-1">{it.title}</h4>
                        <p className="text-[9px] text-gray-500 uppercase font-bold mt-1">Size: {it.size} • Qty: {it.qty}</p>
                        <p className="text-xs font-bold mt-2">Rs {it.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Discount Code */}
                <div className="flex gap-2 mb-8">
                  <input 
                    type="text" 
                    placeholder="DISCOUNT CODE" 
                    className="flex-1 bg-white/5 dark:bg-black border border-gray-200/30 dark:border-white/10 rounded-xl px-4 py-3 text-[10px] font-black outline-none focus:border-emerald-500 transition-all uppercase placeholder:text-gray-700"
                  />
                  <button type="button" className="px-6 py-3 bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Apply</button>
                </div>

                <div className="space-y-4 text-sm border-t border-white/10 pt-6">
                  <div className="flex justify-between text-gray-500">
                    <span className="text-[10px] font-black uppercase tracking-widest">Subtotal</span>
                    <span className="font-bold">Rs {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span className="text-[10px] font-black uppercase tracking-widest">Logistics (Shipping)</span>
                    <span className={shippingCost === 0 ? 'text-emerald-400 font-black uppercase tracking-widest' : 'font-bold'}>
                      {shippingCost === 0 ? 'Free' : `Rs ${shippingCost.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-end">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Total liability</span>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-500 font-bold mr-2 uppercase">PKR</span>
                      <span className="text-3xl font-black italic tracking-tighter">Rs {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {error && (
                  <p className="mt-6 text-[10px] text-red-500 font-black uppercase tracking-widest text-center animate-pulse">
                    ⚠️ {error}
                  </p>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="mt-10 w-full bg-white text-black py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all transform active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                       Processing Transmission...
                    </span>
                  ) : (
                    'Finalize Order'
                  )}
                </button>
                
                <p className="text-[8px] text-gray-600 text-center uppercase tracking-[0.2em] mt-6 font-black">
                  Secure encrypted transmission protocol active
                </p>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
