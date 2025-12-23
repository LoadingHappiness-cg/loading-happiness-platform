const stats = [
  { label: 'Uptime', value: '99.99%' },
  { label: 'Security Incidents', value: '↓ 64%' },
  { label: 'Response Time', value: '< 15 min' },
];

export default function ImpactPage() {
  return (
    <div className="bg-white">
      <section className="py-20 lg:py-28 border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tighter mb-6">
            Social & Operational Impact
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            We focus on outcomes: calmer teams, fewer incidents, and infrastructure that supports real work.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="p-8 rounded-[2rem] border border-gray-100 bg-gray-50/40">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</p>
              <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
