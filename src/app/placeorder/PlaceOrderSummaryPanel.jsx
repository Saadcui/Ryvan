import React from 'react';
import Image from 'next/image';

export default function PlaceOrderSummaryPanel({
  items,
  subtotal,
  shippingCost,
  total,
  error,
  loading,
}) {
  return (
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
                  {it.image ? (
                    <Image src={it.image} alt={it.title} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-[9px] font-black uppercase">No Image</div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="text-[11px] font-black uppercase tracking-tight italic line-clamp-1">{it.title}</h4>
                  <p className="text-[9px] text-gray-500 uppercase font-bold mt-1">Size: {it.size} • Qty: {it.qty}</p>
                  <p className="text-xs font-bold mt-2">Rs {it.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

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
  );
}
