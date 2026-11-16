'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function OrdersClient() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders?page=1&limit=100');
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        setError(data.error || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Network error. Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearOrder = async (id) => {
    if (!confirm('Are you sure you want to clear/delete this order?')) return;
    try {
      const res = await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.filter(o => o._id !== id));
      } else {
        alert(data.error || 'Failed to clear order');
      }
    } catch (err) {
      alert('Network error. Failed to clear order.');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map(o => o._id === id ? { ...o, status: data.data.status } : o));
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      alert('Network error. Failed to update status.');
    }
  };

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white p-6 lg:p-8 print:p-0">
      <main className="max-w-[1400px] mx-auto print:max-w-none">
        
        {/* Header - Hidden on Print */}
        <div className="mb-10 border-b border-gray-200/30 dark:border-white/10 pb-6 flex justify-between items-end print:hidden">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-black dark:text-white">
              Order <span className="text-gray-600 dark:text-gray-400 not-italic">Logistics</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 mt-2">
                Order Tracking & Management System
            </p>
          </div>
          <Link href="/admin" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Back to Inventory
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold uppercase tracking-widest print:hidden">
            {error}
          </div>
        )}

        <div className="bg-white/5 dark:bg-black/5 backdrop-blur-xl rounded-[32px] border border-gray-200/30 dark:border-white/10 overflow-hidden shadow-2xl min-h-[600px] print:hidden">
          <div className="p-8 border-b border-gray-200/30 dark:border-white/10 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-black uppercase tracking-widest italic">Order Matrix</h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Real-time Transmission Monitor</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 dark:bg-black/5 text-gray-500 dark:text-gray-400 text-[9px] uppercase font-black tracking-[0.2em] border-b border-gray-200/30 dark:border-white/10">
                  <th className="px-6 py-5 pl-8">Order ID</th>
                  <th className="px-6 py-5">Customer</th>
                  <th className="px-6 py-5">Location</th>
                  <th className="px-6 py-5">Cargo</th>
                  <th className="px-6 py-5">Value</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right pr-8">Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/5 dark:divide-white/5">
                {loading ? (
                    [1, 2, 3].map(i => (
                        <tr key={i} className="animate-pulse">
                            <td colSpan="7" className="px-6 py-10"><div className="h-4 bg-white/5 rounded-full w-full"></div></td>
                        </tr>
                    ))
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-32 text-center text-gray-600 uppercase font-black tracking-widest text-xs">No Transmissions Logged</td>
                  </tr>
                ) : orders.map((o) => (
                  <tr key={o._id} className="hover:bg-white/5 dark:hover:bg-black/5 transition-colors group cursor-pointer" onClick={() => setSelectedOrder(o)}>
                    <td className="px-6 py-6 pl-8">
                      <span className="text-xs font-mono font-bold text-gray-400">#{o._id.slice(-6).toUpperCase()}</span>
                      <p className="text-[9px] text-gray-600 mt-1 uppercase font-bold">{new Date(o.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-xs font-bold uppercase tracking-wide">{o.firstName} {o.lastName}</p>
                      <p className="text-[9px] text-gray-500 mt-0.5">{o.email}</p>
                    </td>
                    <td className="px-6 py-6 font-mono text-xs uppercase text-gray-400">
                      {o.city}, {o.country || 'PK'}
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex -space-x-3 overflow-hidden">
                        {o.items.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="relative w-8 h-8 rounded-full border-2 border-black bg-gray-900 overflow-hidden" title={`${item.title} (x${item.qty})`}>
                              {item.image ? (
                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-[7px] font-black uppercase">N/A</div>
                              )}
                          </div>
                        ))}
                        {o.items.length > 3 && (
                          <div className="w-8 h-8 rounded-full border-2 border-black bg-white/10 flex items-center justify-center text-[10px] font-black text-emerald-400">
                            +{o.items.length - 3}
                          </div>
                        )}
                      </div>
                      <p className="text-[9px] text-gray-600 mt-2 uppercase font-black">{o.items.reduce((s, i) => s + i.qty, 0)} Units</p>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-xs font-bold font-mono">Rs {o.total.toLocaleString()}</p>
                      <p className="text-[9px] text-gray-600 uppercase font-bold">{o.paymentMethod}</p>
                    </td>
                    <td className="px-6 py-6" onClick={(e) => e.stopPropagation()}>
                      <select 
                        value={o.status}
                        onChange={(e) => handleUpdateStatus(o._id, e.target.value)}
                        className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border outline-none cursor-pointer transition-all ${
                          o.status === 'Delivered' ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' :
                          o.status === 'Cancelled' ? 'border-red-500/50 text-red-500 bg-red-500/10' :
                          'border-yellow-500/50 text-yellow-500 bg-yellow-500/10'
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-6 text-right pr-8" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => handleClearOrder(o._id)}
                        className="p-2 text-gray-600 hover:text-red-500 transition-all hover:bg-white/5 dark:hover:bg-black/5 rounded-lg group"
                        title="Clear Order"
                      >
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ORDER DETAILS MODAL & PRINT VIEW */}
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 print:relative print:bg-white print:p-0 print:block">
            <div className="w-full max-w-2xl bg-white dark:bg-black border border-white/10 rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 print:border-0 print:shadow-none print:rounded-none">
              
              <div className="p-8 border-b border-white/10 flex justify-between items-center print:hidden">
                <h3 className="text-xl font-black italic uppercase tracking-wider text-black dark:text-white">Order Details</h3>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-black dark:text-white">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div id="printable-area" className="p-8 space-y-8 bg-white text-black">
                
                {/* Branding - visible on print */}
                <div className="hidden print:flex justify-between items-end border-b-2 border-black pb-6">
                  <div>
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter">Ryvan</h1>
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-1">Official Packing Slip</p>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <p>OrderID: #{selectedOrder._id.slice(-8).toUpperCase()}</p>
                    <p>Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-12">
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-black/10 pb-1">Ship To</h4>
                      <p className="text-lg font-black uppercase italic">{selectedOrder.firstName} {selectedOrder.lastName}</p>
                      <p className="text-sm font-bold uppercase leading-relaxed text-gray-700">{selectedOrder.address}</p>
                      <p className="text-sm font-black uppercase italic">{selectedOrder.city}, {selectedOrder.postalCode} {selectedOrder.country || 'PK'}</p>
                      <p className="text-xs font-mono font-bold mt-4">T: {selectedOrder.phone}</p>
                      <p className="text-xs font-mono text-gray-500">{selectedOrder.email}</p>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-black/10 pb-1">Logistics</h4>
                      <div className="space-y-2">
                        <p className="text-xs font-black uppercase tracking-widest">Carrier: <span className="font-bold italic">Ryvan Direct</span></p>
                        <p className="text-xs font-black uppercase tracking-widest">Protocol: <span className="font-bold italic">{selectedOrder.paymentMethod}</span></p>
                        <p className="text-xs font-black uppercase tracking-widest">Method: <span className="font-bold italic">{selectedOrder.shippingMethod} Shipping</span></p>
                      </div>
                      <div className="pt-6">
                         <div className="p-4 bg-gray-50 border-2 border-black/5 rounded-xl">
                            <p className="text-[9px] font-black uppercase text-gray-400 mb-1">Payment Status</p>
                            <p className="text-sm font-black italic uppercase">{selectedOrder.paymentMethod === 'COD' ? 'Pending (COD)' : 'Verified'}</p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-black/10 pb-1">Cargo Manifesto</h4>
                   <div className="space-y-2">
                      {selectedOrder.items.map((it, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-black/5">
                           <div className="flex gap-4 items-center">
                              <span className="text-xs font-black italic w-6 text-gray-400">0{i+1}</span>
                              <div>
                                <p className="text-xs font-black uppercase tracking-tight">{it.title}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Size: {it.size} • Qty: {it.qty}</p>
                              </div>
                           </div>
                           <p className="text-xs font-bold font-mono">Rs {it.price.toLocaleString()}</p>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="flex justify-between items-end border-t-2 border-black pt-6">
                   <div className="text-[9px] font-bold text-gray-400 uppercase leading-none italic max-w-xs">
                     By processing this slip, you verify that the cargo listed above has been inspected and approved for deployment.
                   </div>
                   <div className="text-right">
                      <div className="flex justify-between gap-8 text-[10px] font-black uppercase text-gray-500">
                        <span>Total Liability</span>
                        <span>PKR</span>
                      </div>
                      <div className="text-4xl font-black italic tracking-tighter mt-1">Rs {selectedOrder.total.toLocaleString()}</div>
                   </div>
                </div>

              </div>

              <div className="p-8 bg-emerald-500/5 border-t border-white/10 flex gap-4 print:hidden">
                <button onClick={handlePrint} className="flex-1 bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-400 hover:text-black transition-all">
                  Print Packing Slip
                </button>
                <button onClick={() => setSelectedOrder(null)} className="px-8 py-4 bg-white/10 border border-white/10 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  Close
                </button>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
