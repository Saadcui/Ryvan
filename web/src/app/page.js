import React from "react";
import Hero from "../component/Hero.jsx";
import RecentBanner from "../component/RecentBanner";

export default function Home() {
    return (
        <div className="bg-black text-white min-h-screen">
            {/* HERO SECTION */}
            <Hero />

            {/* PRODUCT SLIDER */}
            <RecentBanner />

            {/* BRAND MANIFESTO & VALUES */}
            <section className="relative max-w-7xl mx-auto px-6 py-24 overflow-hidden">
                
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -z-10" />

                {/* 1. VISION HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <p className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-400 mb-6">
                        The Vision
                    </p>
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none mb-8">
                        Acc<span className="text-gray-600">elerate</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed font-medium">
                        Accelerate is not just a clothing brand. It bring together premium garments and 
                        footwear chosen for their design integrity, material quality, and versatility.
                        Every product is selected to meet a higher standard pieces that move effortlessly between street, 
                        lifestyle, and everyday wear.
                    </p>
                </div>

                {/* 2. CORE PILLARS (The Cards You Requested) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
                    {/* Card 1: Faith */}
                    <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-500 group">
                        <div className="w-12 h-12 mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/40 transition-colors">
                            <span className="text-emerald-400 text-xl">∞</span>
                        </div>
                        <h3 className="text-xl font-black uppercase italic tracking-wider mb-3 text-white">
                            STREET AESTHETIC
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            A refined selection of jackets, trousers, and essentials designed for today’s urban lifestyle. Refined silhouettes for the modern pioneer.
                        </p>
                    </div>

                    {/* Card 2: Quality */}
                    <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-500 group">
                        <div className="w-12 h-12 mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/40 transition-colors">
                            <span className="text-emerald-400 text-xl">✦</span>
                        </div>
                        <h3 className="text-xl font-black uppercase italic tracking-wider mb-3 text-white">
                            Premium Build
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Every product on Accelerate is hand-selected for fabric weight, fit, and finish—ensuring a premium look and feel across every category.
                        </p>
                    </div>

                    {/* Card 3: Expression */}
                    <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-500 group">
                        <div className="w-12 h-12 mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/40 transition-colors">
                            <span className="text-emerald-400 text-xl">⚡</span>
                        </div>
                        <h3 className="text-xl font-black uppercase italic tracking-wider mb-3 text-white">
                            Built for Wear
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                        Comfort, durability, and versatility come first. We select pieces that are meant to be worn daily, not just displayed.
                        </p>
                    </div>
                </div>

               {/* 3. TRUST & LOGISTICS STRIP */}
                <div className="w-full border-y border-white/10 py-12 mb-32 bg-white/[0.02]">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                       
                        <div>
                            <h4 className="text-2xl font-black italic text-white">100%</h4>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Premium Quality</p>
                        </div>
                        <div>
                            <h4 className="text-2xl font-black italic text-white">Fast</h4>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Global Delivery</p>
                        </div>
                         <div>
                            <h4 className="text-2xl font-black italic text-white">24/7</h4>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Support Checked</p>
                         </div>
                        <div>
                            <h4 className="text-2xl font-black italic text-white">Secure</h4>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Payment Gateways</p>
                        </div>
                    </div>
                </div>

                {/* 4. THE ACCELERATE STANDARD (Curation Process) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-400 mb-4">
                            The Standard
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-8 leading-none">
                            Engineered <br/> <span className="text-gray-600">Excellence</span>
                        </h2>
                        
                        <div className="space-y-10">
                            {[
                                { title: "Material & Build", desc: "Products are selected based on fabric weight, structure, and long-term durability." },
                                { title: "Fit & Function", desc: "Every item is chosen to balance comfort with a clean, modern silhouette." },
                                { title: "Finish & Detail", desc: "Strict attention to stitching, hardware, and overall presentation during selection." },
                                { title: "Wearability", desc: "Curated to integrate seamlessly into a premium everyday wardrobe." }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="h-px w-8 bg-emerald-500/50 mt-3 group-hover:w-12 transition-all duration-300" />
                                    <div>
                                        <h4 className="text-white font-black uppercase text-sm tracking-widest">{step.title}</h4>
                                        <p className="text-gray-500 text-xs mt-2 max-w-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side Visual / Verification Glass Card */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] -z-10 group-hover:bg-emerald-500/20 transition-all duration-700" />
                        <div className="p-12 rounded-[40px] bg-white/5 backdrop-blur-3xl border border-white/10 relative overflow-hidden">
                            <div className="w-16 h-16 rounded-full border border-emerald-500/30 flex items-center justify-center mb-8">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                            </div>
                            <h3 className="text-3xl font-black italic uppercase mb-4">Quality <br/> Assurance</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-10">
                                Before any piece reaches your hands, it undergoes a final manual inspection at our 
                                distribution center. Accelerate is your destination for elevated clothing—curated 
                                to move with you.
                            </p>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] uppercase font-black tracking-[0.2em]">
                                    <span className="text-gray-500">Inventory Status</span>
                                    <span className="text-emerald-400">Verified & Ready</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </section>
        </div>
    );
}