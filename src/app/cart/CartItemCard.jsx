import React from 'react';
import Image from 'next/image';

function money(n) {
  const v = Number(n ?? 0);
  return Number.isNaN(v) ? '0.00' : v.toFixed(2);
}

export default function CartItemCard({ item, onRemove, onDecrease, onIncrease, maxQty }) {
  const isAtMax = maxQty && item.qty >= maxQty;
  
  return (
    <div className="group relative flex flex-col sm:flex-row gap-6 p-6 rounded-[32px] bg-white/5 dark:bg-black/5 border border-gray-200/30 dark:border-white/10 hover:border-gray-300/20 dark:hover:border-white/20 transition-all duration-500">
      <div className="relative w-full sm:w-32 h-40 sm:h-32 rounded-2xl overflow-hidden bg-gray-900 border border-gray-200/30 dark:border-white/5">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title || 'Item'}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-[10px] font-black uppercase">No Data</div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold uppercase tracking-tight italic group-hover:text-emerald-400 transition-colors">
              {item.title}
            </h3>
            {item.size && (
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Size: <span className="text-black dark:text-white">{item.size}</span>
              </span>
            )}
          </div>
          <button
            onClick={onRemove}
            className="p-2 text-gray-600 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex flex-row sm:items-center justify-between mt-6">
          <div className="flex items-center bg-white/5 dark:bg-black rounded-xl border border-gray-200/30 dark:border-white/10 p-1">
            <button
              onClick={onDecrease}
              className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              -
            </button>
            <span className="text-xs font-black w-8 text-center">{item.qty}</span>
            <button
              onClick={onIncrease}
              disabled={isAtMax}
              className={`w-8 h-8 flex items-center justify-center transition-colors ${isAtMax ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
            >
              +
            </button>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-xl font-light italic">Rs {money(Number(item.price) * Number(item.qty))}</p>
            {isAtMax && (
              <span className="text-[10px] text-amber-400 font-bold mt-1">Max stock reached</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
