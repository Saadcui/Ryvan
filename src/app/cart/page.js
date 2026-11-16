/**
 * The `CartPage` function in JavaScript renders a shopping cart page with items, quantities, prices,
 * and a checkout button.
 */
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/component/Toast';
import CartItemCard from './CartItemCard';
import CartSummaryPanel from './CartSummaryPanel';

export default function CartPage() {
  // Assuming 'items' is already grouped by your Context as shown in Step 1
  const { items, cartCount, setQty, remove } = useCart();
  const { addToast } = useToast();
  const [productStocks, setProductStocks] = useState({}); // Map of productId -> { size -> stock }
  const [stockLoading, setStockLoading] = useState(false);

  // Fetch product stock for all items in cart
  useEffect(() => {
    if (items.length === 0) {
      setProductStocks({});
      return;
    }

    setStockLoading(true);
    const productIds = [...new Set(items.map(it => it.id))];

    fetch(`/api/products?ids=${productIds.join(',')}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          const stocks = {};
          data.data.forEach(product => {
            stocks[product._id] = {};
            product.sizes?.forEach(sizeObj => {
              stocks[product._id][sizeObj.size] = sizeObj.stock || 0;
            });
          });
          setProductStocks(stocks);
        }
      })
      .catch(err => console.error('Failed to fetch product stocks:', err))
      .finally(() => setStockLoading(false));
  }, [items]);

  const subtotal = items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.qty || 0), 0);
  const shipping = subtotal > 2000 ? 0 : 200; 
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
              Your selected styles • {cartCount} Items
            </p>
          </div>
          
           {/* Stepper logic */}
           <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
             <span className="text-black dark:text-white border-b-2 border-black/10 dark:border-white pb-1">Cart</span>
             
           </div>
        </div>

        {items.length === 0 ? (
                <div className="mt-12 p-16 rounded-[40px] border border-gray-200/30 dark:border-white/10 bg-white/5 dark:bg-black/5 backdrop-blur-xl text-center">
            <p className="text-xl font-bold italic text-gray-400 mb-6 uppercase">Your cart is waiting for new styles.</p>
            <Link href="/collection" className="px-8 py-4 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            <div className="lg:col-span-2 space-y-4">
              {items.map((it) => {
                const maxQty = productStocks[it.id]?.[it.size] || 0;
                return (
                  <CartItemCard
                    key={`${it.id}-${it.size}`}
                    item={it}
                    maxQty={maxQty}
                    onRemove={() => {
                      remove(it.id, it.size);
                      addToast(`${it.title} removed from cart`, 'info', 2000);
                    }}
                    onDecrease={() => setQty(it.id, it.size, Math.max(1, Number(it.qty || 0) - 1))}
                    onIncrease={() => {
                      const newQty = Number(it.qty || 0) + 1;
                      if (maxQty && newQty > maxQty) {
                        addToast('Max stock reached for this size', 'warning', 2000);
                        return;
                      }
                      setQty(it.id, it.size, newQty);
                    }}
                  />
                );
              })}
            </div>

            <CartSummaryPanel subtotal={subtotal} shipping={shipping} total={total} />

          </div>
        )}
      </div>
    </div>
  );
}