import React from "react";
import OrderCard from "./OrderCard";

// Mock Data - In a real app, you'd fetch this from your DB
const MOCK_ORDERS = [
  
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400 mb-4">
            Account
          </p>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
            Your <span className="text-gray-600 dark:text-gray-400">Orders</span>
          </h1>
        </div>

        {/* ORDERS LIST */}
        <div className="space-y-8">
          {MOCK_ORDERS.length > 0 ? (
            MOCK_ORDERS.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="p-20 border border-dashed border-gray-200/30 dark:border-white/10 rounded-[40px] text-center">
              <p className="text-gray-500 font-medium uppercase tracking-widest">No orders found yet.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}