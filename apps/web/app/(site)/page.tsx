import Link from 'next/link';
import PageBlocks from '../components/PageBlocks';
import { getPayloadClient } from '@/lib/payload';
import { getLocale, withLocale } from '@/lib/locale';

const fallbackSections = (localePrefix: string) => (
  <div className="bg-white">
    <section className="relative py-20 lg:py-32 overflow-hidden border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] mb-8 tracking-tighter">
              Technology with a human heart.
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 mb-10 leading-relaxed max-w-2xl font-medium">
              Reliable IT, clear security, and support that feels human—so your business can focus on what matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={withLocale('/contact', localePrefix)} className="px-10 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primaryDark shadow-xl shadow-primary/30 transition-all text-center">
                Book a call
              </Link>
              <Link href={withLocale('/services', localePrefix)} className="px-10 py-4 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all text-center">
                Explore services
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-gray-50/50 bg-gray-100 aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
                alt="Support"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 tracking-tighter">Foundations for stability</h2>
          <Link href={withLocale('/services', localePrefix)} className="text-sm font-bold text-accent hover:text-primaryDark">All services →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Managed IT',
              description: 'Proactive support and infrastructure management that reduces noise.',
              icon: '💻',
            },
            {
              title: 'Cybersecurity',
              description: 'Practical security controls that protect without slowing you down.',
              icon: '🛡️',
            },
            {
              title: 'Cloud Strategy',
              description: 'Governed and secure M365 and Azure environments built for scale.',
              icon: '☁️',
            },
          ].map((service) => (
            <div key={service.title} className="p-8 rounded-[2rem] border border-gray-100 bg-gray-50/40">
              <div className="text-2xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
        <div>
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 tracking-tighter">Ready for calmer IT operations?</h2>
          <p className="text-gray-300 text-lg max-w-2xl">
            Let’s look at what’s breaking your flow and create a plan that works.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={withLocale('/contact', localePrefix)} className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primaryDark transition-all">
            Book a call
          </Link>
          <Link href={withLocale('/contact', localePrefix)} className="px-8 py-3 bg-primaryDark/30 text-white rounded-xl font-bold hover:bg-primaryDark/50 transition-all">
            Send a message
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default async function HomePage() {
  const payload = await getPayloadClient();
  const locale = await getLocale();
  const localePrefix = `/${locale}`;
  const pageResult = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: 'home' } },
        { status: { equals: 'published' } },
      ],
    },
    limit: 1,
    locale,
  });

  const page = pageResult.docs[0];
  if (!page) {
    return fallbackSections(localePrefix);
  }

  return <PageBlocks blocks={page.layout} localePrefix={localePrefix} />;
}
