import React from 'react';
import Link from 'next/link';

function money(n) {
  const v = Number(n ?? 0);
  return Number.isNaN(v) ? '0.00' : v.toFixed(2);
}

export default function CartSummaryPanel({ subtotal, shipping, total }) {
  return (
    <div className="lg:sticky lg:top-28 h-fit space-y-6">
      <div className="p-8 rounded-[40px] bg-white/5 dark:bg-black/5 backdrop-blur-3xl border border-gray-200/30 dark:border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -z-10" />
        <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-8 border-b border-gray-200/30 dark:border-white/10 pb-4">
          Order Summary
        </h2>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Subtotal</span>
            <span className="text-black dark:text-white">Rs {money(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Shipping</span>
            <span className={shipping === 0 ? 'text-emerald-400 font-bold' : 'text-black dark:text-white'}>
              {shipping === 0 ? 'FREE' : `Rs ${money(shipping)}`}
            </span>
          </div>
          {subtotal < 500 && (
            <div className="pt-2">
              <div className="flex justify-between text-[9px] font-black uppercase text-emerald-400 mb-1">
                <span>Free Shipping Progress</span>
                <span>{Math.round((subtotal / 500) * 100)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(subtotal / 500) * 100}%` }} />
              </div>
            </div>
          )}
          <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-end">
            <span className="text-xs font-black uppercase tracking-widest">Order Total</span>
            <span className="text-3xl font-black italic tracking-tighter">Rs {money(total)}</span>
          </div>
        </div>

        <Link href="/placeorder" className="block mt-10 w-full bg-white text-black py-5 rounded-2xl text-[11px] font-black uppercase text-center tracking-[0.2em] hover:bg-emerald-400 transition-all transform active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
          Continue to Checkout
        </Link>
        <p className="text-[9px] text-gray-600 text-center uppercase tracking-widest mt-6 font-bold">
          Secure checkout for your fashion order
        </p>
      </div>
    </div>
  );
}
