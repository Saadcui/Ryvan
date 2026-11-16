import Link from 'next/link';

export const metadata = {
  title: 'Our Story',
  description:
    'Learn the story behind Ryvan, a Pakistan-based fashion brand offering premium streetwear, clothing, and footwear for everyday wear.',
  keywords: [
    'Ryvan story',
    'about Ryvan',
    'streetwear brand Pakistan',
    'premium clothing Pakistan',
    'online fashion store Pakistan',
    'fashion brand story',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'Our Story | Ryvan',
    description:
      'Discover how Ryvan curates premium streetwear and footwear with a focus on craftsmanship, wearability, and modern style.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <section className="relative overflow-hidden border-b border-gray-200/30 dark:border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_35%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-5">
              Our Story
            </p>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-8">
              Designed to<span className="text-gray-500 dark:text-gray-400 not-italic"> Last </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              Ryvan was created around a simple idea: premium fashion should look distinctive, feel comfortable, and fit naturally into real life. We curate streetwear, clothing, and footwear that balance modern design with practical comfort, so every piece works from morning routines to evening plans.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <div className="rounded-[32px] border border-gray-200/30 dark:border-white/10 bg-white/5 dark:bg-black/5 p-8 md:p-10 backdrop-blur-xl">
              <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight mb-5">
                Why we exist
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                The market is full of fashion that looks good online but falls short in person. We built Ryvan to focus on the details that matter after checkout: stitching, drape, fabric weight, fit, and how a piece feels after repeated wear.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our selection process is intentionally narrow. If something does not meet our standard for quality, silhouette, or versatility, it does not make it into the collection.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[28px] border border-gray-200/30 dark:border-white/10 bg-white/5 dark:bg-black/5 p-6">
                <h3 className="text-sm font-black uppercase tracking-[0.25em] mb-3">Curation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Every collection is selected around clean silhouettes, durable construction, and easy styling.
                </p>
              </div>
              <div className="rounded-[28px] border border-gray-200/30 dark:border-white/10 bg-white/5 dark:bg-black/5 p-6">
                <h3 className="text-sm font-black uppercase tracking-[0.25em] mb-3">Wearability</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Pieces should work for the city, travel, work, and downtime without feeling overdesigned.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[36px] border border-gray-200/30 dark:border-white/10 bg-gradient-to-br from-black/[0.03] to-emerald-500/5 p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-emerald-400 mb-4">
                What we stand for
              </p>
              <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight mb-6">
                A cleaner standard
              </h2>
              <div className="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  We believe premium fashion should feel approachable. It should be well-made, easy to style, and expressive without being loud. That is why our catalog balances practical everyday clothing with distinctive details.
                </p>
                <p>
                  Our team reviews every product with a focus on everyday relevance: Is the fit versatile? Does the fabric feel good? Can it be styled across seasons? If the answer is yes, it belongs in the collection.
                </p>
                <p>
                  Ryvan is for people who want better basics, stronger details, and a more reliable online fashion shopping experience in Pakistan and beyond.
                </p>
              </div>
            </div>

            <div className="rounded-[36px] border border-gray-200/30 dark:border-white/10 bg-white/5 dark:bg-black/5 p-8 md:p-10">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-5">How we work</h3>
              <div className="space-y-4">
                {[
                  'We check product quality, size consistency, and stock levels closely.',
                  'We make it easy to browse clothing, compare details, and complete checkout with confidence.',
                  'We keep our fashion language direct, minimal, and built around personal style.',
                ].map((item) => (
                  <div key={item} className="flex gap-4 items-start">
                    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 md:pb-32">
        <div className="rounded-[40px] border border-gray-200/30 dark:border-white/10 bg-white/5 dark:bg-black/5 p-8 md:p-12 backdrop-blur-xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-500 mb-3">Audience</p>
              <h3 className="text-xl font-black uppercase italic">Pakistan-first, globally aware</h3>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                We design the experience for customers shopping for fashion in Pakistan while keeping our product presentation relevant internationally.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-500 mb-3">Promise</p>
              <h3 className="text-xl font-black uppercase italic">Quality over volume</h3>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Smaller, better-selected collections create a more focused fashion store and stronger trust.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-500 mb-3">Next step</p>
              <h3 className="text-xl font-black uppercase italic">Explore the collection</h3>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Find the latest arrivals, limited pieces, and essentials made to fit into a modern wardrobe.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/collection" className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[11px] hover:bg-gray-200 transition-colors">
              Shop Collection
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-2xl border border-gray-200/30 dark:border-white/10 font-black uppercase tracking-widest text-[11px] hover:bg-white/5 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
