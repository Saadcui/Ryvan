"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RecentBanner() {
  const [items, setItems] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/products')
      .then(r => r.json())
      .then(d => {
        if (!mounted) return;
        if (d.success && Array.isArray(d.data)) setItems(d.data.slice(0, 10));
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const scroll = (dir = 1) => {
    const el = containerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  if (!items.length) return null;

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-16 overflow-hidden">
      {/* Subtle Background Glow behind the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[120px] pointer-events-none -z-10"></div>

      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">
            Latest <span className="text-gray-500 not-italic">Drops</span>
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 mt-2">
            Fresh from the laboratory
          </p>
        </div>
        
        {/* Navigation Buttons - Glass Style */}
        <div className="flex gap-3">
          <button 
            onClick={() => scroll(-1)} 
            className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all active:scale-90 shadow-xl"
          >
            <span className="text-lg leading-none mt-[-2px]">‹</span>
          </button>
          <button 
            onClick={() => scroll(1)} 
            className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all active:scale-90 shadow-xl"
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
        {items.map(p => (
          <Link 
            key={p._id} 
            href={`/product/${p._id}`} 
            className="snap-start min-w-[280px] md:min-w-[320px] group relative bg-white/5 rounded-[32px] border border-transparent overflow-hidden transition-all duration-500 hover:border-white/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              {p.images?.[0]?.url && (
                <Image 
                  src={p.images[0].url} 
                  alt={p.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  unoptimized 
                />
              )}
              {/* Gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              
              {/* Tag Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-black/60 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-white px-3 py-1.5 rounded-full border border-white/10">
                  {p.category}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="absolute bottom-0 left-0 w-full p-6">
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  {p.Gender}
                </p>
                <div className="flex justify-between items-end">
                  <h3 className="text-lg font-bold text-white tracking-tight leading-none group-hover:translate-x-1 transition-transform">
                    {p.name}
                  </h3>
                  <span className="text-xl font-light text-white italic">
                    ${Number(p.price || 0).toFixed(0)}
                  </span>
                </div>
              </div>
              
              {/* Hidden Action Bar (Reveals on Hover) */}
              <div className="mt-4 h-0 opacity-0 group-hover:h-8 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white">
                  View Details —&gt;
                </span>
              </div>
            </div>
          </Link>
        ))}
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