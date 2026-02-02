import React from "react";

export default function OrderCard({ order }) {
  const isDelivered = order.status === "Delivered";

  return (
    <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-3xl hover:border-white/20 transition-all duration-300">
      
      {/* TOP BAR: Order Info */}
      <div className="p-6 md:p-8 border-b border-white/10 flex flex-wrap justify-between items-center gap-4 bg-white/[0.02]">
        <div className="flex gap-8">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Order ID</p>
            <p className="text-sm font-black text-white">#{order.id}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Date</p>
            <p className="text-sm font-bold text-white">{order.date}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Total</p>
            <p className="text-sm font-black text-emerald-400">${order.total.toFixed(2)}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
          isDelivered ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-white/10 border-white/20 text-white"
        }`}>
          {order.status}
        </div>
      </div>

      {/* ITEMS LIST */}
      <div className="p-6 md:p-8 space-y-6">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <div className="w-20 h-24 bg-white/10 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black uppercase tracking-wide text-white">{item.name}</h4>
              <p className="text-xs text-gray-500 mt-1 font-bold">Qty: {item.qty}</p>
            </div>
            <div className="text-right">
                <p className="text-sm font-black text-white">${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="px-8 py-5 bg-white/[0.01] flex justify-end gap-4">
        <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
          Download Invoice
        </button>
        <button className="px-6 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors">
          Track Package
        </button>
      </div>
    </div>
  );
}