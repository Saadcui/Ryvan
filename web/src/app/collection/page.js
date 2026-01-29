'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CollectionPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [genderFilter, setGenderFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.data);
          setFilteredProducts(data.data);
        }
      });
  }, []);

  useEffect(() => {
    let result = products;
    if (genderFilter !== 'ALL') result = result.filter(p => p.Gender === genderFilter);
    if (categoryFilter !== 'ALL') result = result.filter(p => p.category === categoryFilter);
    setFilteredProducts(result);
  }, [genderFilter, categoryFilter, products]);

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        
        {/* SIDEBAR FILTERS - Glass Effect */}
        <aside className="w-full lg:w-72 p-6 lg:p-10 lg:h-screen lg:sticky lg:top-0 bg-white/5 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-transparent">
          <div className="mb-10">
            <h2 className='text-2xl font-extrabold tracking-tighter uppercase mb-2'>Accelerate</h2>
            <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">Collections</p>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-5">Filter by Gender</h3>
              <div className="space-y-3">
                {['ALL', 'MEN', 'WOMEN', 'UNISEX'].map(g => (
                  <label key={g} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="gender" 
                      checked={genderFilter === g} 
                      onChange={() => setGenderFilter(g)} 
                      className="hidden"
                    />
                    <div className={`w-2 h-2 rounded-full transition-all ${genderFilter === g ? 'bg-white scale-150 shadow-[0_0_8px_white]' : 'bg-white/20'}`}></div>
                    <span className={`text-sm font-medium transition-colors ${genderFilter === g ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-5">Category</h3>
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium outline-none focus:border-white/40 text-white transition-all appearance-none cursor-pointer"
              >
                <option className="bg-gray-900" value="ALL">All Categories</option>
                <option className="bg-gray-900" value="Topwear">Topwear</option>
                <option className="bg-gray-900" value="Bottomwear">Bottomwear</option>
                <option className="bg-gray-900" value="Footwear">Footwear</option>
                <option className="bg-gray-900" value="Outerwear">Outerwear</option>
                <option className="bg-gray-900" value="Accessories">Accessories</option>
              </select>
            </div>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <main className="flex-1 p-6 lg:p-12">
          <div className="mb-10 flex items-end justify-between border-b border-transparent pb-6">
              <div>
                <h1 className="text-4xl font-bold text-white tracking-tight italic">New Arrivals</h1>
                <p className="text-gray-500 text-sm mt-1">Curated selection for your lifestyle</p>
              </div>
              <span className="text-xs font-mono text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-transparent">{filteredProducts.length} Items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-40 text-center">
                <p className="text-gray-500 italic">No products match your current aesthetic.</p>
              </div>
            )}
          </div>
        </main>

      </div>
    </div>
  );
}

// --- PRODUCT CARD COMPONENT (Glass Style) ---
function ProductCard({ product }) {
  const totalStock = product.sizes?.reduce((acc, curr) => acc + curr.stock, 0) || 0;
  const isSoldOut = totalStock === 0;
  const [selectedSize, setSelectedSize] = useState('');
  
  const currentSizeObj = product.sizes?.find(s => s.size === selectedSize);
  const isSizeAvailable = currentSizeObj ? currentSizeObj.stock > 0 : false;

  const handleAddToCart = () => {
    if (!selectedSize) return alert('Please select a size');
    if (!isSizeAvailable) return alert('Size out of stock');
    alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
  };

  return (
    <div className={`group relative bg-white/5 rounded-[32px] border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-500 flex flex-col ${isSoldOut ? 'opacity-60 grayscale' : ''}`}>
      
      {/* Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {product.images?.[0] && (
          <Link href={`/product/${product._id}`} className="block w-full h-full">
            <Image 
              src={product.images[0].url} 
              alt={product.name} 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              unoptimized
            />
          </Link>
        )}
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
              {product.category}
            </span>
            {isSoldOut && (
              <span className="bg-red-500/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                Sold Out
              </span>
            )}
        </div>
      </div>

      {/* Details Area */}
      <div className="p-6 flex flex-col flex-1 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg text-white leading-tight">
              <Link href={`/product/${product._id}`} className="hover:text-gray-300 transition-colors">{product.name}</Link>
            </h3>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{product.Gender}</p>
          </div>
          <span className="font-light text-xl text-white">${product.price}</span>
        </div>

        {/* Action Section */}
        <div className="mt-auto space-y-4">
          {!isSoldOut && (
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  disabled={s.stock === 0}
                  className={`
                    w-9 h-9 flex items-center justify-center text-[10px] font-bold rounded-xl border transition-all
                    ${selectedSize === s.size 
                      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                      : s.stock === 0 
                        ? 'bg-transparent text-gray-700 border-white/5 cursor-not-allowed line-through'
                        : 'bg-white/5 text-white border-white/10 hover:border-white/40'}
                  `}
                >
                  {s.size}
                </button>
              ))}
            </div>
          )}

          <button 
            onClick={handleAddToCart}
            disabled={isSoldOut || (selectedSize && !isSizeAvailable) || !selectedSize}
            className={`
              w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all transform active:scale-95
              ${isSoldOut 
                ? 'bg-white/5 text-gray-600 cursor-not-allowed' 
                : !selectedSize
                  ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  : isSizeAvailable 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-red-900/20 text-red-500 border border-red-500/20 cursor-not-allowed'}
            `}
          >
            {isSoldOut ? 'Sold Out' : !selectedSize ? 'Select Size' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}