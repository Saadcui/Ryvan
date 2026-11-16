'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/component/Toast';

export default function ProductClient({ product }) {
  const [mainIndex, setMainIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(() => {
    if (!product?.sizes?.length) return '';
    const first = product.sizes[0];
    return typeof first === 'string' ? first : first.size;
  });
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const imageCount = product?.images?.length || 1;
  const prevImage = () => setMainIndex((i) => (i - 1 + imageCount) % imageCount);
  const nextImage = () => setMainIndex((i) => (i + 1) % imageCount);

  const totalStock = useMemo(
    () => (Array.isArray(product.sizes)
      ? Math.max(0, product.sizes.reduce((s, it) => s + (typeof it === 'string' ? 0 : Number(it.stock || 0)), 0))
      : Math.max(0, Number(product.stock || 0))),
    [product]
  );

  const stockForSelected = useMemo(() => {
    if (!selectedSize) return totalStock;
    const found = (product.sizes || []).find((s) => (typeof s === 'string' ? s === selectedSize : s.size === selectedSize));
    return found ? Math.max(0, typeof found === 'string' ? 0 : Number(found.stock || 0)) : 0;
  }, [product, selectedSize, totalStock]);

  const sizeAvailable = Number(stockForSelected || 0);
  const overLimit = qty > sizeAvailable;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white text-black dark:bg-black dark:text-white relative overflow-hidden font-sans py-12 px-4">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="relative w-full max-w-6xl bg-white/5 backdrop-blur-2xl rounded-[40px] border border-gray-200/30 dark:border-white/10 shadow-2xl overflow-hidden p-6 md:p-10 text-black dark:text-white">
        <div className="flex justify-between items-center mb-10 border-b border-gray-200/30 dark:border-white/10 pb-6">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-wide uppercase text-black dark:text-white">Ryvan</h2>
          <span className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest">{product.category}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden bg-white/5 border border-gray-200/30 dark:border-white/10 group">
              {product.images?.[mainIndex]?.url ? (
                <Image
                  src={product.images[mainIndex].url}
                  alt={`${product.name} in ${product.category} collection`}
                  width={1200}
                  height={1200}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-[420px]">No Image</div>
              )}

              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 dark:bg-black/40 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 dark:bg-black/40 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images?.map((img, i) => (
                img?.url ? (
                  <button
                    key={i}
                    onClick={() => setMainIndex(i)}
                    className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${i === mainIndex ? 'border-black dark:border-white' : 'border-gray-200/30 opacity-80'}`}
                  >
                    <Image src={img.url} alt={`${product.name} thumbnail ${i + 1}`} width={80} height={80} className="object-cover" />
                  </button>
                ) : null
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight text-black dark:text-white">{product.name}</h1>
            <p className="text-green-600 dark:text-green-400 font-medium mb-6">{product.Gender} Collection</p>

            <div className="text-4xl font-light mb-8 text-black dark:text-white">Rs {Number(product.price || 0).toFixed(2)}</div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 border-l-2 border-gray-200/20 dark:border-white/20 pl-4">
              {product.description}
            </p>

            <div className="mb-8">
              <label className="text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 font-bold mb-4 block">Select Size</label>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((s) => {
                  const sizeLabel = typeof s === 'string' ? s : s.size;
                  const disabled = typeof s === 'object' && Number(s.stock || 0) <= 0;
                  return (
                    <button
                      key={sizeLabel}
                      onClick={() => !disabled && setSelectedSize(sizeLabel)}
                      disabled={disabled}
                      className={`h-12 w-16 flex items-center justify-center rounded-xl border text-sm font-bold transition-all ${selectedSize === sizeLabel ? 'bg-white text-black dark:bg-emerald-400 dark:text-black' : 'bg-white/5 dark:bg-black/5 border border-gray-200/30 dark:border-white/10 text-black dark:text-white hover:bg-white/10 dark:hover:bg-black/10'} ${disabled ? 'opacity-20 line-through' : ''}`}
                    >
                      {sizeLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-white/5 dark:bg-black p-4 rounded-2xl border border-gray-200/30 dark:border-white/10">
                <label className="text-[10px] uppercase text-gray-500 font-bold block mb-1">Quantity</label>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value) || 1)}
                  className="bg-transparent text-xl font-bold w-full outline-none"
                />
              </div>
              <div className="bg-white/5 dark:bg-black/5 p-4 rounded-2xl border border-gray-200/30 dark:border-white/10">
                <label className="text-[10px] uppercase text-gray-500 font-bold block mb-1">Availability</label>
                <span className="text-xl font-bold">{sizeAvailable} <span className="text-sm font-normal text-gray-400">in stock</span></span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  if (sizeAvailable <= 0 || qty <= 0 || overLimit) return;
                  const variantId = `${product._id}::${selectedSize || 'default'}`;
                  addToCart({ ...product, _id: variantId, availableStock: sizeAvailable }, qty);
                  addToast(`${product.name} added to bag! (Qty: ${qty})`, 'success', 3000);
                }}
                disabled={sizeAvailable <= 0 || overLimit}
                className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-95 ${sizeAvailable <= 0 || overLimit ? 'bg-white/10 dark:bg-black/10 text-gray-500 cursor-not-allowed' : 'bg-white text-black dark:bg-emerald-400 dark:text-black hover:bg-gray-200 dark:hover:bg-emerald-500 shadow-[0_0_20px_rgba(255,255,255,0.2)]'}`}
              >
                {sizeAvailable <= 0 ? 'Out of Stock' : overLimit ? 'Limit Exceeded' : 'Add to Bag'}
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  addToast('Link copied to clipboard!', 'success', 2000);
                }}
                className="px-6 py-4 bg-white/5 dark:bg-black/5 border border-gray-200/30 dark:border-white/10 rounded-2xl hover:bg-white/10 dark:hover:bg-black/10 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
              </button>
            </div>

            {overLimit && sizeAvailable > 0 && (
              <p className="text-amber-400 text-xs mt-3 font-medium text-center">Only {sizeAvailable} items available for this size.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}