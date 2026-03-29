'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function UserOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // user: undefined (loading), null (not logged in), object (logged in)
    if (user === undefined) return;
    if (user === null) {
      router.push('/login');
      return;
    }
    fetchUserOrders();
  }, [user]);

  const fetchUserOrders = async () => {
    try {
      const res = await fetch('/api/orders/user');
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        setError(data.error || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Network error. Failed to load your orders.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-4 sm:px-10 py-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 border-b border-gray-200/30 dark:border-white/10 pb-8">
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
              Order <span className="text-gray-500 dark:text-gray-400 not-italic">Archive</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 mt-2">
              History of Acquisitions • {orders.length} Transmissions
            </p>
        </div>

        {loading ? (
          <div className="space-y-4">
             {[1, 2, 3].map(i => (
               <div key={i} className="h-24 bg-white/5 animate-pulse rounded-2xl" />
             ))}
          </div>
        ) : error ? (
           <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold uppercase text-center">
             {error}
           </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl">
             <p className="text-gray-500 font-black uppercase text-xs tracking-widest">No orders found in your hangar.</p>
             <button onClick={() => router.push('/collection')} className="mt-8 px-6 py-3 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition-all">
               Start Mission
             </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((o) => (
              <div key={o._id} className="p-6 md:p-8 rounded-[32px] bg-white/5 dark:bg-black/5 border border-gray-200/30 dark:border-white/10 hover:border-emerald-500/30 transition-all group">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  
                  {/* Left: Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                       <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg ${
                         o.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                         o.status === 'Cancelled' ? 'bg-red-500/10 text-red-500 border border-red-500/30' :
                         'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30'
                       }`}>
                         {o.status}
                       </span>
                       <span className="text-[10px] font-mono text-gray-500 uppercase">#{o._id.slice(-8).toUpperCase()}</span>
                    </div>
                    
                    <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                      {o.items.map((item, idx) => (
                        <div key={idx} className="relative w-16 h-20 rounded-xl overflow-hidden bg-gray-900 border border-white/5 shrink-0">
                           <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Summary */}
                  <div className="text-right flex flex-col justify-between">
                     <div>
                       <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{new Date(o.createdAt).toLocaleDateString()}</p>
                       <p className="text-2xl font-black italic tracking-tighter mt-1">Rs {o.total.toLocaleString()}</p>
                     </div>
                     <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-4">
                       {o.items.reduce((s, i) => s + i.qty, 0)} Units via {o.paymentMethod}
                     </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
