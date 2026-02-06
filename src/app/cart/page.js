/**
 * The `CartPage` function in JavaScript renders a shopping cart page with items, quantities, prices,
 * and a checkout button.
 */
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

// Helper for currency formatting
function money(n) {
  const v = Number(n ?? 0);
  return Number.isNaN(v) ? '0.00' : v.toFixed(2);
}

export default function CartPage() {
  // Assuming 'items' is already grouped by your Context as shown in Step 1
  const { items, cartCount, setQty, remove } = useCart();

  const subtotal = items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.qty || 0), 0);
  const shipping = subtotal > 500 ? 0 : 25; 
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-4 sm:px-10 py-12">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER & PROGRESS STEPPER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-200/30 dark:border-white/10 pb-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
              Your <span className="text-gray-500 dark:text-gray-400 not-italic">Cart</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 mt-2">
              Ready for Deployment • {cartCount} Units
            </p>
          </div>
          
           {/* Stepper logic */}
           <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
             <span className="text-black dark:text-white border-b-2 border-black/10 dark:border-white pb-1">01. Cart</span>
             <span className="text-gray-600 dark:text-gray-400">02. Shipping</span>
             <span className="text-gray-600 dark:text-gray-400">03. Payment</span>
           </div>
        </div>

        {items.length === 0 ? (
                <div className="mt-12 p-16 rounded-[40px] border border-gray-200/30 dark:border-white/10 bg-white/5 dark:bg-black/5 backdrop-blur-xl text-center">
            <p className="text-xl font-bold italic text-gray-400 mb-6 uppercase">Your hangar is empty.</p>
            <Link href="/collection" className="px-8 py-4 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Acquire Equipment
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* ITEM LIST */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((it) => (
                // CRITICAL UPDATE: Key must utilize both ID and SIZE to be unique
                <div key={`${it.id}-${it.size}`} className="group relative flex flex-col sm:flex-row gap-6 p-6 rounded-[32px] bg-white/5 dark:bg-black/5 border border-gray-200/30 dark:border-white/10 hover:border-gray-300/20 dark:hover:border-white/20 transition-all duration-500">
                  
                  {/* IMAGE BOX */}
                    <div className="relative w-full sm:w-32 h-40 sm:h-32 rounded-2xl overflow-hidden bg-gray-900 border border-gray-200/30 dark:border-white/5">
                    {it.image ? (
                      <Image
                        src={it.image}
                        alt={it.title || 'Item'}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-[10px] font-black uppercase">No Data</div>
                    )}
                  </div>

                  {/* INFO BOX */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold uppercase tracking-tight italic group-hover:text-emerald-400 transition-colors">
                          {it.title}
                        </h3>
                        {/* Display Size Clearly */}
                        {it.size && (
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            Size: <span className="text-white">{it.size}</span>
                          </span>
                        )}
                      </div>
                      <button
                        // Pass Size to remove function if your context supports removing specific sizes
                        onClick={() => remove(it.id, it.size)} 
                        className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>

                    <div className="flex flex-row sm:items-center justify-between mt-6">
                      {/* QTY CONTROLLER */}
                      <div className="flex items-center bg-white/5 dark:bg-black rounded-xl border border-gray-200/30 dark:border-white/10 p-1">
                        <button
                          // Pass Size to setQty to ensure we update the correct variant
                          onClick={() => setQty(it.id, it.size, Math.max(1, Number(it.qty || 0) - 1))}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xs font-black w-8 text-center">{it.qty}</span>
                        <button
                           // Pass Size to setQty
                          onClick={() => setQty(it.id, it.size, Number(it.qty || 0) + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <p className="text-xl font-light italic">${money(Number(it.price) * Number(it.qty))}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY PANEL (Unchanged) */}
            <div className="lg:sticky lg:top-28 h-fit space-y-6">
              <div className="p-8 rounded-[40px] bg-white/5 dark:bg-black/5 backdrop-blur-3xl border border-gray-200/30 dark:border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -z-10" />
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-8 border-b border-gray-200/30 dark:border-white/10 pb-4">
                  Invoice Summary
                </h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-black dark:text-white">${money(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Logistics (Shipping)</span>
                    <span className={shipping === 0 ? 'text-emerald-400 font-bold' : 'text-black dark:text-white'}>
                      {shipping === 0 ? 'FREE' : `$${money(shipping)}`}
                    </span>
                  </div>
                  {subtotal < 500 && (
                    <div className="pt-2">
                        <div className="flex justify-between text-[9px] font-black uppercase text-emerald-400 mb-1">
                          <span>Free Shipping Goal</span>
                          <span>{Math.round((subtotal/500)*100)}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(subtotal/500)*100}%` }} />
                        </div>
                    </div>
                  )}
                  <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-end">
                    <span className="text-xs font-black uppercase tracking-widest">Total Liability</span>
                    <span className="text-3xl font-black italic tracking-tighter">${money(total)}</span>
                  </div>
                </div>
                <button className="mt-10 w-full bg-white text-black py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all transform active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                  Initialize Checkout
                </button>
                <p className="text-[9px] text-gray-600 text-center uppercase tracking-widest mt-6 font-bold">
                  Secure encrypted transmission
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}