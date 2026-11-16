"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SkeletonCard = () => (
  <div className="snap-start min-w-[280px] md:min-w-[320px] bg-white/5 dark:bg-black/5 rounded-[32px] border border-gray-200/30 dark:border-white/10 overflow-hidden animate-pulse">
    <div className="relative aspect-[4/5] w-full bg-gray-200 dark:bg-gray-800"></div>
    <div className="p-6 space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
    </div>
  </div>
);

export default function RecentBanner() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    fetch('/api/products?limit=10&sort=latest&fields=card')
      .then(r => r.json())
      .then(d => {
        if (!mounted) return;
        if (d.success && Array.isArray(d.data)) setItems(d.data);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const scroll = (dir = 1) => {
    const el = containerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  if (!items.length && !isLoading) return null;

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-16 overflow-hidden">
      {/* Subtle Background Glow behind the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[120px] pointer-events-none -z-10"></div>

      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-black dark:text-white">
            Latest <span className="text-gray-600 dark:text-gray-400 not-italic">Drops</span>
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 mt-2">
            Fresh from the collection
          </p>
        </div>
        
        {/* Navigation Buttons - Glass Style */}
        <div className="flex gap-3">
          <button 
            onClick={() => scroll(-1)} 
            className="w-10 h-10 flex items-center justify-center bg-white/5 dark:bg-black/5 border border-gray-200/30 dark:border-white/10 rounded-full text-black dark:text-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all active:scale-90 shadow-xl"
          >
            <span className="text-lg leading-none mt-[-2px]">‹</span>
          </button>
          <button 
            onClick={() => scroll(1)} 
            className="w-10 h-10 flex items-center justify-center bg-white/5 dark:bg-black/5 border border-gray-200/30 dark:border-white/10 rounded-full text-black dark:text-white hover:bg_white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all active:scale-90 shadow-xl"
          >
            <span className="text-lg leading-none mt-[-2px]">›</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scroller */}
      <div 
        ref={containerRef} 
        className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-2 -mx-2 snap-x snap-mandatory"
      >
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          items.map(p => (
            <Link 
              key={p._id} 
              href={`/product/${p._id}`} 
              className="snap-start min-w-[280px] md:min-w-[320px] group relative bg-white/5 dark:bg-black/5 rounded-[32px] border border-gray-200/30 dark:border-white/10 overflow-hidden transition-all duration-500 hover:border-gray-300/30 dark:hover:border-white/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                {p.images?.[0]?.url && (
                  <Image 
                    src={p.images[0].url} 
                    alt={p.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                )}
                {/* Tag Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/60 dark:bg-black/60 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-black dark:text-white px-3 py-1.5 rounded-full border border-gray-200/30 dark:border-white/10">
                    {p.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 bg-white dark:bg-black">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 dark:text-emerald-400 mb-2">
                      {p.Gender} · {p.category}
                    </p>
                    <h3 className="text-base font-bold text-black dark:text-white tracking-tight leading-tight truncate group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                      {p.name}
                    </h3>
                  </div>
                  <span className="shrink-0 text-base font-semibold text-black dark:text-white">
                    Rs {Number(p.price || 0).toFixed(0)}
                  </span>
                </div>
                
                <div className="mt-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                    View Product
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Custom Scroller CSS to hide bars */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}