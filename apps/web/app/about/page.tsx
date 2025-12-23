import Link from 'next/link';

const values = [
  { title: 'Integrity', content: 'We tell the truth, even when it’s uncomfortable.', icon: '⚖️' },
  { title: 'Empathy', content: 'Support isn’t just tickets. It’s people under pressure.', icon: '🤝' },
  { title: 'Pragmatism', content: 'Secure and stable beats fancy and fragile.', icon: '🛠️' },
  { title: 'Responsibility', content: 'Our work should leave a positive footprint.', icon: '🌍' },
];

const approach = [
  { title: 'Assess', content: 'We map risks, pain points, dependencies and priorities.', icon: '🔍' },
  { title: 'Stabilize', content: 'We fix what breaks the daily flow and reduce incidents.', icon: '⚖️' },
  { title: 'Evolve', content: 'We improve, automate, secure, and keep things measurable.', icon: '🚀' },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="py-20 lg:py-28 border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tighter">
              Technology with a human heart.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We build stable, secure IT environments and support teams with clarity, accountability, and respect.
            </p>
            <div className="flex gap-4">
              <Link href="/contact" className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
                Book a call
              </Link>
              <Link href="/services" className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all">
                Explore services
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-gray-50/50 bg-gray-100 aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                alt="Collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">Company overview</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Loading Happiness is an IT partner focused on reliability, security, and long-term clarity. We help organizations reduce operational noise, strengthen cybersecurity foundations, and modernize infrastructure without disrupting day-to-day work.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              {values.map((value) => (
                <div key={value.title} className="p-6 rounded-2xl border border-gray-100 bg-gray-50/40">
                  <div className="text-2xl mb-3">{value.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-gray-900 text-white p-10 rounded-[2.5rem] shadow-2xl border border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-8">Stability Index</h4>
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-6">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Based In</p>
                  <p className="text-xl font-bold">Portugal · Working globally</p>
                </div>
                <div className="border-b border-white/10 pb-6">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Core Focus</p>
                  <p className="text-xl font-bold">IT Ops, Infrastructure, Security</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Approach</p>
                  <p className="text-xl font-bold">Pragmatic, Documented, Human-First</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-10 tracking-tighter">Our approach</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {approach.map((item) => (
              <div key={item.title} className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm">
                <div className="text-2xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
