import Link from 'next/link';

const services = [
  {
    title: 'Managed IT',
    description: 'Proactive support, monitoring, and infrastructure management that reduces downtime and noise.',
  },
  {
    title: 'Cybersecurity',
    description: 'Practical security controls that protect without slowing teams down.',
  },
  {
    title: 'Cloud Strategy',
    description: 'Secure M365 and Azure environments built for scale, governance, and clarity.',
  },
  {
    title: 'IT Projects',
    description: 'Migrations, audits, and modernization work delivered with clear documentation.',
  },
  {
    title: 'Helpdesk',
    description: 'Calm, accountable support with measurable outcomes.',
  },
  {
    title: 'Compliance Readiness',
    description: 'Security baselines and documentation that stand up to audits.',
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <section className="py-20 lg:py-28 border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tighter mb-6">
            IT services built for real-world teams.
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            From daily helpdesk to security strategy—we provide the stability your business needs.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="p-8 rounded-[2rem] border border-gray-100 bg-gray-50/40">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div>
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 tracking-tighter">Let’s build clarity.</h2>
            <p className="text-gray-300 text-lg max-w-2xl">
              Tell us where your operations feel fragile and we’ll propose a focused plan.
            </p>
          </div>
          <Link href="/contact" className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primaryDark transition-all">
            Talk to an expert
          </Link>
        </div>
      </section>
    </div>
  );
}
