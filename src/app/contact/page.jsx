import Link from 'next/link';
import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact',
  description:
    'Contact Accelerate for order support, product questions, shipping updates, and business inquiries in Pakistan and worldwide.',
  keywords: [
    'contact Accelerate',
    'streetwear customer support',
    'fashion support Pakistan',
    'order help Accelerate',
    'premium clothing contact',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | Accelerate',
    description:
      'Reach out to Accelerate for product advice, order support, shipping questions, and collaboration inquiries.',
    url: '/contact',
  },
};

const supportTopics = [
  {
    title: 'Order support',
    text: 'Need help with checkout, order status, or delivery updates? Our support team can guide you through the process.',
  },
  {
    title: 'Product questions',
    text: 'If you want size guidance, material information, or fit advice, we are happy to help before you place an order.',
  },
  {
    title: 'Returns and exchanges',
    text: 'Reach out if you need clarification on returns, exchanges, or any issue with an item after delivery.',
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <section className="relative overflow-hidden border-b border-gray-200/30 dark:border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_40%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-5">
              Contact
            </p>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-8">
              Let’s <span className="text-gray-500 dark:text-gray-400 not-italic">talk</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Whether you need help with an order, want product advice, or are exploring a collaboration, Accelerate is easy to reach. We keep support simple, fast, and human.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-[36px] border border-gray-200/30 dark:border-white/10 bg-white/5 dark:bg-black/5 p-8 md:p-10 backdrop-blur-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-emerald-400 mb-4">
                Support channels
              </p>
              <h2 className="text-3xl font-black italic uppercase tracking-tight mb-6">
                Reach the right team
              </h2>
              <div className="space-y-5 text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  We support customers across Pakistan and respond to inquiries about sizing, delivery, stock, and product details as quickly as possible.
                </p>
                <p>
                  For the fastest reply, include your order number, product name, and a short summary of the issue. That helps us resolve requests without unnecessary back-and-forth.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[28px] border border-gray-200/30 dark:border-white/10 bg-white/5 dark:bg-black/5 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">Email</p>
                <a href="mailto:support@accelerategrw@gmail.com" className="text-lg font-bold hover:text-emerald-400 transition-colors">
                  support@accelerategrw@gmail.com
                </a>
              </div>
              <div className="rounded-[28px] border border-gray-200/30 dark:border-white/10 bg-white/5 dark:bg-black/5 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">Phone</p>
                <a href="tel:+923001234567" className="text-lg font-bold hover:text-emerald-400 transition-colors">
                  +92 300 1234567
                </a>
              </div>
              <div className="rounded-[28px] border border-gray-200/30 dark:border-white/10 bg-white/5 dark:bg-black/5 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">Response time</p>
                <p className="text-lg font-bold">Within 24 hours on business days</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-[40px] border border-gray-200/30 dark:border-white/10 bg-white/5 dark:bg-black/5 p-8 md:p-10 backdrop-blur-xl">
              <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight mb-6">
                Contact form
              </h2>
              <ContactForm />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {supportTopics.map((item) => (
                <div key={item.title} className="rounded-[28px] border border-gray-200/30 dark:border-white/10 bg-white/5 dark:bg-black/5 p-6">
                  <h3 className="text-sm font-black uppercase tracking-[0.25em] mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[36px] border border-gray-200/30 dark:border-white/10 bg-gradient-to-br from-black/[0.03] to-blue-500/5 p-8 md:p-10">
              <h2 className="text-2xl font-black italic uppercase tracking-tight mb-4">
                Accerate Story
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Accelerate provides premium streetwear customer support for shoppers looking for fit advice, stock availability, delivery information, and product recommendations. If you are browsing premium clothing in Pakistan or need help with an existing order, our contact page is the fastest way to reach us.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Link href="/collection" className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[11px] hover:bg-gray-200 transition-colors">
                  Browse Collection
                </Link>
                <Link href="/about" className="inline-flex items-center justify-center px-6 py-3 rounded-2xl border border-gray-200/30 dark:border-white/10 font-black uppercase tracking-widest text-[11px] hover:bg-white/5 transition-colors">
                  Read Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
