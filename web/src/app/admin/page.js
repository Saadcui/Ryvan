'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// --- CONFIGURATION: Size Categories ---
const SIZE_CONFIG = {
  Topwear: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
  Outerwear: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Bottomwear: ['28', '30', '32', '34', '36', '38', '40', '42'],
  Footwear: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'],
  Accessories: ['One Size'],
};

export default function AdminPage() {
  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [imagesText, setImagesText] = useState('');
  
  // New: Multi-select sizes
  const [selectedSizes, setSelectedSizes] = useState([]);
  // Map of size -> stock (per-size inventory)
  const [sizesStock, setSizesStock] = useState({});

  // --- API ACTIONS ---
  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (err) { setError("Failed to load catalog."); }
    finally { setLoading(false); }
  };

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setCategory(newCat);
    // Reset sizes when category changes to prevent incompatible data
    setSelectedSizes([]); 
    if (newCat === 'Accessories') {
      setSelectedSizes(['One Size']);
      setSizesStock({ 'One Size': 0 });
    }
  };

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
      setSizesStock(prev => {
        const copy = { ...prev };
        delete copy[size];
        return copy;
      });
    } else {
      setSelectedSizes([...selectedSizes, size]);
      setSizesStock(prev => ({ ...prev, [size]: Number(prev[size] || 0) }));
    }
  };

  const onCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    if (selectedSizes.length === 0) {
      setError("Please select at least one size.");
      setSaving(false);
      return;
    }

    const payload = {
      name,
      description,
      price: Number(price),
      category,
      Gender: gender,
      images: imagesText.split('\n').filter(url => url.trim()).map(url => ({ url: url.trim() })),
      // Build sizes as objects with stock per size
      sizes: selectedSizes.map(s => ({ size: s, stock: Number(sizesStock[s] || 0) }))
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

        if (res.ok) {
        // Reset Form
        setName(''); setDescription(''); setPrice(''); setCategory('');
        setGender(''); setImagesText(''); setSelectedSizes([]);
          setSizesStock({});
        fetchProducts();
      } else {
        const errData = await res.json();
        setError(errData.error || "Save failed.");
      }
    } catch (err) { setError("Network error."); }
    finally { setSaving(false); }
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) { setError("Delete failed."); }
  };

  // --- DYNAMIC UI HELPERS ---
  const previewImage = useMemo(() => {
    const img = imagesText.split('\n')[0]?.trim();
    // BUG FIX: Only return if it looks like a valid URL to prevent runtime crash
    return img && (img.startsWith('http') || img.startsWith('/')) ? img : null;
  }, [imagesText]);

  // Determine which sizes to show based on category
  const availableOptions = SIZE_CONFIG[category] || [];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-200 p-6 lg:p-8">
      
      <main className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="mb-10 border-b border-white/10 pb-6 flex justify-between items-end">
            <div>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                    Admin <span className="text-gray-600 not-italic">Panel</span>
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 mt-2">
                    Inventory Management System
                </p>
            </div>
            <div className="hidden sm:block text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Total Assets</p>
                <p className="text-2xl font-black italic">{products.length} Units</p>
            </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold uppercase tracking-widest flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* --- LEFT: CREATE PRODUCT FORM --- */}
          <section className="xl:col-span-4 h-fit">
            <div className="bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/10 overflow-hidden sticky top-24 shadow-2xl">
              <div className="p-8 border-b border-white/10">
                <h2 className="text-lg font-black uppercase tracking-widest italic">Deploy New Item</h2>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Add equipment to the arsenal</p>
              </div>

              <form onSubmit={onCreate} className="p-8 space-y-6">
                
                {/* Product Name */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Product Title</label>
                  <input 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required 
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-xs font-bold text-white outline-none focus:border-emerald-500 transition-all placeholder:text-gray-700 uppercase tracking-wide" 
                    placeholder="e.g. Slim Fit Denim Jacket" 
                  />
                </div>

                {/* Price Row */}
                <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Price ($)</label>
                    <input 
                      type="number" 
                      value={price} 
                      onChange={e => setPrice(e.target.value)} 
                      required 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-xs font-bold text-white outline-none focus:border-emerald-500 transition-all" 
                      placeholder="0.00" 
                    />
                </div>

                {/* Category & Gender Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Gender</label>
                    <select 
                      value={gender} 
                      onChange={e => setGender(e.target.value)} 
                      required 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-xs font-bold text-white outline-none focus:border-emerald-500 transition-all cursor-pointer appearance-none uppercase"
                    >
                      <option value="" className="bg-black text-gray-500">Select...</option>
                      <option value="MEN" className="bg-black">Men</option>
                      <option value="WOMEN" className="bg-black">Women</option>
                      <option value="UNISEX" className="bg-black">Unisex</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Category</label>
                    <select 
                      value={category} 
                      onChange={handleCategoryChange} 
                      required 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-xs font-bold text-white outline-none focus:border-emerald-500 transition-all cursor-pointer appearance-none uppercase"
                    >
                      <option value="" className="bg-black text-gray-500">Select...</option>
                      {Object.keys(SIZE_CONFIG).map(cat => (
                        <option key={cat} value={cat} className="bg-black">{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* --- INTELLIGENT SIZE SELECTOR --- */}
                <div className={`p-6 rounded-2xl border transition-all duration-300 ${category ? 'bg-white/5 border-emerald-500/30' : 'bg-transparent border-dashed border-white/10'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em]">
                      {category === 'Footwear' ? 'EU Sizes' : category === 'Bottomwear' ? 'Waist' : 'Sizes'}
                    </label>
                    {category && <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{selectedSizes.length} Selected</span>}
                  </div>

                  {!category ? (
                    <div className="text-center py-2 text-gray-600 text-[10px] font-bold uppercase tracking-widest">Select Category First</div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {availableOptions.map((size) => {
                        const isSelected = selectedSizes.includes(size);
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => toggleSize(size)}
                            className={`
                              px-3 py-2 text-[10px] font-black rounded-lg border transition-all duration-200 uppercase tracking-wider
                              ${isSelected 
                                ? 'bg-emerald-400 text-black border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]' 
                                : 'bg-transparent text-gray-400 border-white/10 hover:border-white hover:text-white'}
                            `}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Description</label>
                  <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    rows={3} 
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-xs text-white outline-none focus:border-emerald-500 transition-all resize-none placeholder:text-gray-700" 
                    placeholder="Material, fit, and style details..." 
                  />
                </div>

                {/* Images */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Image URLs</label>
                  <textarea 
                    value={imagesText} 
                    onChange={e => setImagesText(e.target.value)} 
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-[10px] font-mono text-gray-300 outline-none focus:border-emerald-500 transition-all placeholder:text-gray-700" 
                    placeholder={`https://...\nhttps://...`}
                    rows={2}
                  />
                  <p className="text-[9px] text-gray-600 text-right uppercase tracking-wider font-bold">One URL per line</p>
                </div>

                {/* Image Preview - FIXED: Added check for valid URL */}
                {previewImage && (
                  <div className="relative group rounded-xl overflow-hidden border border-white/10">
                    <Image 
                      src={previewImage} 
                      alt="Preview" 
                      width={600} 
                      height={240} 
                      unoptimized 
                      className="h-40 w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-black text-[9px] font-black uppercase tracking-widest bg-white/80 backdrop-blur px-3 py-1 rounded-full shadow-lg">Preview</span>
                    </div>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={saving} 
                  className="w-full py-5 bg-white text-black hover:bg-emerald-400 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(52,211,153,0.4)]"
                >
                  {saving ? 'Processing...' : 'Initialize Listing'}
                </button>
              </form>
            </div>
          </section>

          {/* --- RIGHT: INVENTORY TABLE --- */}
          <section className="xl:col-span-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/10 overflow-hidden min-h-[600px] flex flex-col shadow-2xl">
              <div className="p-8 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-lg font-black uppercase tracking-widest italic">Inventory Matrix</h2>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Global Stock Overview</p>
                </div>

                {/* Per-size stock controls when sizes selected */}
                {selectedSizes.length > 0 && (
                  <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                    <div className="text-[9px] text-emerald-400 font-black uppercase tracking-widest mb-3">Stock Allocation Per Size</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSizes.map((s) => (
                        <div key={s} className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-lg border border-white/10">
                          <div className="text-[10px] font-bold text-white w-6 text-center">{s}</div>
                          <input
                            type="number"
                            value={sizesStock[s] ?? 0}
                            onChange={e => setSizesStock(prev => ({ ...prev, [s]: Number(e.target.value) }))}
                            className="w-16 bg-black border border-white/10 rounded px-2 py-1 text-xs text-center text-white outline-none focus:border-emerald-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-gray-500 text-[9px] uppercase font-black tracking-[0.2em] border-b border-white/10">
                      <th className="px-6 py-5 pl-8">Asset</th>
                      <th className="px-6 py-5">Gender</th>
                      <th className="px-6 py-5">Class</th>
                      <th className="px-6 py-5">Units</th>
                      <th className="px-6 py-5">Specs</th>
                      <th className="px-6 py-5">Value</th>
                      <th className="px-6 py-5 text-right pr-8">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      [1, 2, 3, 4].map((i) => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan="7" className="px-6 py-6">
                            <div className="h-10 bg-white/5 rounded-lg w-full"></div>
                          </td>
                        </tr>
                      ))
                    ) : products.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-32 text-center text-gray-600">
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-2xl grayscale">📦</div>
                            <span className="text-[10px] font-black uppercase tracking-widest">System Empty. Initialize Data.</span>
                          </div>
                        </td>
                      </tr>
                    ) : products.map((p) => (
                      <tr key={p._id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4 pl-8">
                          <Link href={`/product/${p._id}`} className="block">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-gray-900 border border-white/10 overflow-hidden shrink-0 relative group-hover:border-emerald-500/50 transition-colors">
                                {p.images?.[0]?.url ? (
                                  <Image
                                    src={p.images[0].url}
                                    alt={p.name || 'Product'}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-700 text-[8px] font-black">N/A</div>
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-white text-xs line-clamp-1 uppercase tracking-wide group-hover:text-emerald-400 transition-colors">{p.name}</span>
                                <span className="text-[9px] text-gray-600 font-mono">ID: {p._id.slice(-6)}</span>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`inline-flex px-2 py-1 rounded text-[9px] font-black tracking-widest uppercase border ${
                             p.Gender === 'MEN' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : 
                             p.Gender === 'WOMEN' ? 'border-pink-500/30 text-pink-400 bg-pink-500/10' : 
                             'border-purple-500/30 text-purple-400 bg-purple-500/10'
                           }`}>
                            {p.Gender}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{p.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs font-mono font-bold text-emerald-400">{
                            Array.isArray(p.sizes)
                              ? p.sizes.reduce((sum, s) => sum + (typeof s === 'string' ? 0 : Number(s.stock || 0)), 0)
                              : (p.stock || 0)
                          }</div>
                        </td>
                        <td className="px-6 py-4 max-w-[200px]">
                          <div className="flex flex-wrap gap-1">
                            {/* Handling array of sizes or single feature string */}
                            {(Array.isArray(p.sizes) ? p.sizes.map(x => (typeof x === 'string' ? x : x.size)) : [p.features?.size || 'N/A']).slice(0, 3).map((s, idx) => (
                              <span key={idx} className="text-[9px] bg-white/5 border border-white/10 text-gray-400 px-1.5 py-0.5 rounded font-bold uppercase">
                                {s}
                              </span>
                            ))}
                            {(Array.isArray(p.sizes) && p.sizes.length > 3) && (
                              <span className="text-[9px] text-gray-600 pl-1 font-bold">+{p.sizes.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold text-white font-mono">${p.price?.toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-4 text-right pr-8">
                          <button onClick={() => onDelete(p._id)} className="p-2 text-gray-600 hover:text-red-500 transition-all hover:bg-white/5 rounded-lg" title="Delete Asset">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}