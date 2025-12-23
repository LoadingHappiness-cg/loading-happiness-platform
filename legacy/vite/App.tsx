
import React, { useState, useEffect, useMemo } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useParams,
  useSearchParams,
  useLocation
} from 'react-router-dom';
import { Page, SiteSettings, CaseStudy, Content, Author, Category, Tag, ContentType, Block } from './types';

// --- SHARED UI COMPONENTS ---

const Navbar = ({ settings }: { settings: SiteSettings }) => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
          <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">{settings.brandName}</Link>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
          <Link to="/services" className="hover:text-blue-600 transition-colors">Services</Link>
          <Link to="/case-studies" className="hover:text-blue-600 transition-colors">Case Studies</Link>
          <Link to="/news" className="hover:text-blue-600 transition-colors">News</Link>
          <Link to="/impact" className="hover:text-blue-600 transition-colors">Impact</Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link to="/contact" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">Book a Call</Link>
        </div>
      </div>
    </div>
  </nav>
);

const Footer = ({ settings }: { settings: SiteSettings }) => (
  <footer className="bg-gray-900 text-white py-16 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
          <span className="text-2xl font-bold tracking-tight">{settings.brandName}</span>
        </div>
        <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">{settings.tagline}</p>
        <div className="space-y-3 text-sm text-gray-400">
          <p className="flex items-center gap-2">📧 {settings.email}</p>
          <p className="flex items-center gap-2">📞 {settings.phone}</p>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-6">Explore</h4>
        <ul className="space-y-4 text-sm text-gray-400">
          <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
          <li><Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
          <li><Link to="/news" className="hover:text-white transition-colors">News & Editorial</Link></li>
          <li><Link to="/impact" className="hover:text-white transition-colors">Social Impact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-6">Company</h4>
        <ul className="space-y-4 text-sm text-gray-400">
          <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 tracking-widest uppercase">
      &copy; {new Date().getFullYear()} {settings.brandName}. Engineered for Stability.
    </div>
  </footer>
);

// --- BLOCK RENDERER ---

const BlockRenderer = ({ blocks }: { blocks: Block[] }) => {
  return (
    <div className="w-full">
      {blocks.map((block, idx) => {
        switch (block.blockType) {
          case 'hero':
            return (
              <section key={idx} className="relative py-20 lg:py-32 overflow-hidden bg-white border-b border-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                    <div className="lg:col-span-7">
                      <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] mb-8 tracking-tighter">
                        {block.heading}
                      </h1>
                      <p className="text-xl md:text-2xl text-gray-500 mb-10 leading-relaxed max-w-2xl font-medium">
                        {block.subheading}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link to={block.primaryCTA.link} className="px-10 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all text-center">
                          {block.primaryCTA.label}
                        </Link>
                        {block.secondaryCTA && (
                          <Link to={block.secondaryCTA.link} className="px-10 py-4 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all text-center">
                            {block.secondaryCTA.label}
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="lg:col-span-5 relative">
                      <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-gray-50/50 bg-gray-100 aspect-[4/5]">
                        <img src={block.image?.url} className="w-full h-full object-cover" alt={block.image?.alt} />
                      </div>
                      {block.badges?.map((badge, bIdx) => (
                        <div key={bIdx} className={`absolute z-20 hidden md:flex items-center gap-2 bg-white/95 backdrop-blur-sm shadow-xl border border-gray-100 rounded-2xl px-5 py-3 ${bIdx === 0 ? '-top-6 -left-8' : 'bottom-12 -right-8'}`}>
                           <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                           <span className="text-sm font-bold text-gray-800 tracking-tight">{badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'splitContent':
            const isPartnership = block.title === 'The right kind of partnership';
            const isOverview = block.title === 'Company overview';

            return (
              <section key={idx} id={block.sectionId} className={`py-24 border-b border-gray-50 ${isOverview ? 'bg-white' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 items-start ${block.reverse ? 'lg:flex-row-reverse' : ''}`}>
                    
                    {/* Main Content Area */}
                    <div className={`${isOverview ? 'lg:col-span-8' : isPartnership ? 'lg:col-span-6' : 'lg:col-span-7'}`}>
                      <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-8 tracking-tighter">{block.title}</h2>
                      {block.content && <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">{block.content}</p>}
                      
                      {isPartnership && block.partnershipData ? (
                        <div className="grid md:grid-cols-2 gap-8">
                           <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100">
                             <h4 className="text-blue-600 font-black uppercase text-[10px] tracking-[0.2em] mb-6">What you get</h4>
                             <ul className="space-y-4">
                                {block.partnershipData.whatYouGet.map((item, i) => (
                                  <li key={i} className="flex gap-3 text-gray-700 font-bold text-sm leading-snug">
                                    <span className="text-blue-600">✓</span> {item}
                                  </li>
                                ))}
                             </ul>
                           </div>
                           <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                             <h4 className="text-gray-400 font-black uppercase text-[10px] tracking-[0.2em] mb-6">What we need</h4>
                             <ul className="space-y-4">
                                {block.partnershipData.whatWeNeed.map((item, i) => (
                                  <li key={i} className="flex gap-3 text-gray-600 font-bold text-sm leading-snug">
                                    <span className="text-gray-400">→</span> {item}
                                  </li>
                                ))}
                             </ul>
                           </div>
                        </div>
                      ) : (
                        block.items && (
                          <ul className="grid md:grid-cols-2 gap-6">
                            {block.items.map((item: any, iIdx: number) => (
                              <li key={iIdx} className="flex items-start gap-4 p-4 rounded-2xl border border-gray-50 bg-gray-50/30">
                                <div className="mt-1 flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-black">✓</div>
                                <span className="text-gray-700 font-bold text-lg leading-tight">{typeof item === 'string' ? item : item.item}</span>
                              </li>
                            ))}
                          </ul>
                        )
                      )}
                      
                      {block.cta && (
                        <Link to={block.cta.link} className="inline-block mt-10 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg">
                          {block.cta.label}
                        </Link>
                      )}
                    </div>

                    {/* Facts Card / Image Sidebar */}
                    <div className={`${isOverview ? 'lg:col-span-4' : isPartnership ? 'lg:col-span-6' : 'lg:col-span-5'}`}>
                      {isOverview && block.facts ? (
                        <div className="bg-gray-900 text-white p-10 rounded-[2.5rem] shadow-2xl lg:sticky lg:top-32 border border-white/5">
                           <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-8">Stability Index</h4>
                           <div className="space-y-8">
                             {block.facts.map((fact, fIdx) => (
                               <div key={fIdx} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                                 <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{fact.label}</p>
                                 <p className="text-xl font-bold text-white">{fact.value}</p>
                               </div>
                             ))}
                           </div>
                        </div>
                      ) : (
                        block.image && (
                          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100 border-8 border-gray-50">
                            <img src={block.image.url} className="w-full aspect-square object-cover" alt={block.image.alt} />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'featureGrid':
            const isProcess = block.blockType === 'featureGrid' && block.columns === 3;
            return (
              <section key={idx} id={block.sectionId} className={`py-24 ${isProcess ? 'bg-gray-50' : 'bg-white'} border-b border-gray-50`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16 max-w-2xl mx-auto">
                    {block.title && <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tighter">{block.title}</h2>}
                    {block.subheading && <p className="text-xl text-gray-500 font-medium italic">{block.subheading}</p>}
                  </div>
                  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${block.columns || 4} gap-8`}>
                    {block.items.map((item, iIdx) => (
                      <div key={iIdx} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:border-blue-200 transition-all hover:shadow-xl hover:shadow-blue-50/50 group text-center lg:text-left">
                        <div className="text-4xl mb-8 group-hover:scale-110 transition-transform inline-block bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto lg:mx-0">
                          {item.icon}
                        </div>
                        {isProcess && <span className="block text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Step 0{iIdx + 1}</span>}
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 tracking-tight">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">{item.content}</p>
                      </div>
                    ))}
                  </div>
                  {isProcess && (
                    <div className="mt-16 bg-blue-600 rounded-3xl p-8 text-center text-white font-bold text-xl shadow-xl shadow-blue-200">
                      No surprises: you’ll always know what we’re doing, why, and what comes next.
                    </div>
                  )}
                </div>
              </section>
            );

          case 'servicesGrid':
            return (
              <section key={idx} className="py-24 bg-gray-50 border-b border-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-4xl font-extrabold text-gray-900 mb-16 tracking-tight text-center">{block.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {block.services.map((service, sIdx) => (
                      <div key={sIdx} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">{service.icon}</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 tracking-tight">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'richText':
            return (
              <div key={idx} className={`max-w-4xl mx-auto px-4 py-20 text-gray-700 leading-relaxed ${block.center ? 'text-center' : ''}`}>
                {block.title && <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-10 tracking-tighter">{block.title}</h2>}
                <div className="text-xl lg:text-2xl font-medium text-gray-500 leading-relaxed italic border-l-4 border-blue-600 pl-8 py-2">
                  {block.content}
                </div>
              </div>
            );

          case 'imageGallery':
            return (
              <section key={idx} className="py-24 bg-white border-b border-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                   <h2 className="text-3xl font-extrabold text-gray-900 mb-12 tracking-tight text-center">{block.title}</h2>
                   <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all">
                      {block.images.map((img, i) => (
                        /* Fixed: accessing img.url directly as per types.ts */
                        <img key={i} src={img.url} alt={img.alt} className="h-12 w-auto object-contain" />
                      ))}
                   </div>
                </div>
              </section>
            );

          case 'trustPartners':
            return (
              <section key={idx} className="py-20 bg-white border-b border-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                   <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-12">
                      {block.text}
                   </p>
                   <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                      {block.logos.map((item, lIdx) => (
                        <img 
                          key={lIdx} 
                          /* Fixed: accessing item.url directly as per types.ts */
                          src={item.url} 
                          alt={item.alt} 
                          className="h-8 md:h-10 w-auto object-contain"
                        />
                      ))}
                   </div>
                </div>
              </section>
            );

          case 'finalCTA':
            return (
              <section key={idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3.5rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl">
                  <div className="relative z-10">
                    <h2 className="text-4xl lg:text-6xl font-extrabold mb-8 tracking-tight">{block.title}</h2>
                    <p className="text-xl text-blue-50 mb-12 max-w-2xl mx-auto leading-relaxed">{block.content}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                      <Link to={block.primaryCTA.link} className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all">
                        {block.primaryCTA.label}
                      </Link>
                      {block.secondaryCTA && (
                        <Link to={block.secondaryCTA.link} className="px-10 py-5 bg-blue-500/20 backdrop-blur-md border border-white/30 text-white rounded-2xl font-bold hover:bg-blue-500/30 transition-all text-lg">
                          {block.secondaryCTA.label}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

// --- MOCK EDITORIAL DATA ---

const mockTags: Tag[] = [
  { id: 't1', name: 'Kubernetes', slug: 'kubernetes', color: '#0EA5E9' },
  { id: 't2', name: 'Zero Trust', slug: 'zero-trust', color: '#6366F1' },
  { id: 't3', name: 'MFA', slug: 'mfa', color: '#10B981' },
  { id: 't4', name: 'SME Strategy', slug: 'sme-strategy', color: '#F59E0B' }
];

const mockAuthors: Author[] = [
  { id: '1', name: 'James Loader', role: 'Chief Architect', bio: 'Specialist in high-availability cloud systems and container orchestration.' },
  { id: '2', name: 'Sarah Miller', role: 'Security Lead', bio: 'Focuses on zero-trust architectures and practical security governance.' }
];

const mockCategories: Category[] = [
  { id: '1', name: 'Infrastructure', slug: 'infra' },
  { id: '2', name: 'Cybersecurity', slug: 'security' },
  { id: '3', name: 'Engineering', slug: 'engineering' },
  { id: '4', name: 'Opinion', slug: 'opinion' }
];

const mockContent: Content[] = [
  {
    id: 'c1',
    title: 'The Blueprint for 99.99% Uptime in Small Teams',
    slug: 'uptime-blueprint',
    contentType: 'Guide',
    status: 'published',
    publishedAt: '2024-05-12',
    excerpt: 'Stability doesn\'t require a massive devops team. It requires discipline and the right tooling.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&w=1200&q=80', alt: 'Server racks' },
    heroStyle: 'Large',
    authors: [mockAuthors[0]],
    categories: [mockCategories[0]],
    tags: [mockTags[0], mockTags[3]],
    readingTime: '8 min',
    body: [
      { blockType: 'richText', content: 'Modern infrastructure is often over-engineered. For most SMEs, the path to stability isn\'t more complexity—it\'s fewer moving parts that you understand deeply...' },
      { blockType: 'callout', type: 'info', title: 'The Core Principle', content: 'If you can\'t rebuild your entire environment from code in 15 minutes, you don\'t have a stable system; you have a lucky one.' },
      { blockType: 'checklist', title: 'The Reliability Checklist', items: ['Automated Backups', 'Containerized Workloads', 'Centralized Logging', 'MFA on all entry points'] }
    ]
  },
  {
    id: 'c2',
    title: 'Why We Stopped Using Complex Security Policies',
    slug: 'simple-security-wins',
    contentType: 'Opinion',
    status: 'published',
    publishedAt: '2024-05-10',
    excerpt: 'Complex policies aren\'t safe—they\'re ignored. Simplicity is the only real path to security adoption.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80', alt: 'Lock icon' },
    heroStyle: 'Small',
    authors: [mockAuthors[1]],
    categories: [mockCategories[1], mockCategories[3]],
    tags: [mockTags[1], mockTags[2]],
    readingTime: '5 min',
    body: [
      { blockType: 'pullQuote', quote: 'Security that slows people down is security that will be bypassed by the very people it\'s meant to protect.', author: 'Sarah Miller' },
      { blockType: 'richText', content: 'In our experience, a 20-page security manual is worth less than a single, enforced MFA requirement. We need to focus on what actually works...' }
    ]
  }
];

// --- CORE APPLICATION PAGES ---

const DynamicPage = ({ slug: propSlug }: { slug?: string }) => {
  const { slug: routeSlug } = useParams();
  const slug = propSlug || routeSlug || 'home';
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    const mockPages: Record<string, Page> = {
      'home': {
        id: 'p1', title: 'Home', slug: 'home', status: 'published',
        layout: [
          {
            blockType: 'hero',
            heading: 'Technology with a human heart.',
            subheading: 'Reliable IT, clear security, and support that feels human—so your business can focus on what matters.',
            primaryCTA: { label: 'Book a call', link: '/contact' },
            secondaryCTA: { label: 'Explore services', link: '/services' },
            badges: ["Fast support", "Secure by design", "Built for SMEs"],
            image: { url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80", alt: "Support" }
          },
          {
            blockType: 'servicesGrid',
            title: 'Foundations for stability',
            services: [
              { title: 'Managed IT', description: 'Proactive support and infrastructure management that reduces noise.', icon: '💻' },
              { title: 'Cybersecurity', description: 'Practical security controls that protect without slowing you down.', icon: '🛡️' },
              { title: 'Cloud Strategy', description: 'Governed and secure M365 and Azure environments built for scale.', icon: '☁️' }
            ]
          },
          {
            blockType: 'finalCTA',
            title: 'Ready for calmer IT operations?',
            content: 'Let’s look at what’s breaking your flow and create a plan that works.',
            primaryCTA: { label: 'Book a call', link: '/contact' },
            secondaryCTA: { label: 'Send a message', link: '/contact' }
          }
        ],
        seo: { title: 'Loading Happiness | Human-Centric IT' }
      },
      'about': {
        id: 'p-about', title: 'About Us', slug: 'about', status: 'published',
        layout: [
          {
            blockType: 'hero',
            heading: 'Technology with a human heart.',
            subheading: 'We build stable, secure IT environments and support teams with clarity, accountability, and respect.',
            primaryCTA: { label: 'Book a call', link: '/contact' },
            secondaryCTA: { label: 'Explore services', link: '/services' },
            badges: ["Human-led", "Documented choices", "Pragmatic tech"],
            image: { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80", alt: "Collaboration" }
          },
          {
            blockType: 'splitContent',
            sectionId: 'company-overview',
            title: 'Company overview',
            content: "Loading Happiness is an IT partner focused on reliability, security, and long-term clarity. We help organizations reduce operational noise, strengthen cybersecurity foundations, and modernize infrastructure without disrupting day-to-day work. We work best with teams that value transparency, documented decisions, and consistent execution.",
            facts: [
              { label: 'Based In', value: 'Portugal · Working globally' },
              { label: 'Core Focus', value: 'IT Ops, Infrastructure, Security' },
              { label: 'Approach', value: 'Pragmatic, Documented, Human-First' }
            ]
          },
          {
            blockType: 'featureGrid',
            sectionId: 'philosophy-values',
            title: 'Philosophy and Values',
            subheading: 'We believe technology should serve people — not the other way around. Strong systems require both technical discipline and human clarity.',
            columns: 4,
            items: [
              { title: 'Integrity', content: 'We tell the truth, even when it’s uncomfortable.', icon: '⚖️' },
              { title: 'Empathy', content: 'Support isn’t just tickets. It’s people under pressure.', icon: '🤝' },
              { title: 'Pragmatism', content: 'Secure and stable beats fancy and fragile.', icon: '🛠️' },
              { title: 'Responsibility', content: 'Our work should leave a positive footprint.', icon: '🌍' }
            ]
          },
          {
            blockType: 'splitContent',
            sectionId: 'partnership',
            title: 'The right kind of partnership',
            content: "We’re not a “yes to everything” vendor. We work as a partner: we ask hard questions, document choices, and focus on outcomes. That’s how IT becomes predictable.",
            partnershipData: {
              whatYouGet: ['Clear priorities and scope', 'Fast response with ownership', 'Documentation and visibility', 'Security improvements without drama'],
              whatWeNeed: ['A single point of contact', 'Realistic timelines and priorities', 'Willingness to fix root causes', 'Respect for people and process']
            },
            image: { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', alt: 'Partnership' }
          },
          {
            blockType: 'featureGrid',
            sectionId: 'our-approach',
            title: 'Our approach',
            columns: 3,
            items: [
              { title: 'Assess', content: 'We map risks, pain points, dependencies and priorities.', icon: '🔍' },
              { title: 'Stabilize', content: 'We fix what breaks the daily flow and reduce incidents.', icon: '⚖️' },
              { title: 'Evolve', content: 'We improve, automate, secure, and keep things measurable.', icon: '🚀' }
            ]
          },
          {
            blockType: 'splitContent',
            sectionId: 'why-choose-us',
            title: 'Why choose us',
            items: [
              'Senior-level expertise, practical decisions',
              'Security as a foundation, not a sales pitch',
              'Vendor-neutral recommendations',
              'Documentation that survives people changes',
              'Support that is calm, clear, and accountable'
            ],
            image: { url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80', alt: 'Focus' },
            reverse: true
          },
          {
            blockType: 'trustPartners',
            sectionId: 'partners',
            text: 'Trusted by teams that value stability and clarity',
            logos: [
              /* Fixed: simplified logo object to match types.ts */
              { url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', alt: 'Microsoft' },
              { url: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Amazon_Lambda_logo.svg', alt: 'AWS' },
              { url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png', alt: 'Apple' },
              { url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg', alt: 'Slack' },
              { url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Google_Cloud_Logo.svg', alt: 'Google Cloud' }
            ]
          },
          {
            blockType: 'richText',
            sectionId: 'our-team',
            title: 'Our team',
            center: true,
            content: "Loading Happiness is led by senior IT professionals with decades of experience in operations, infrastructure, and security. For specialized needs, we work with a trusted network — so you get the right expertise without unnecessary overhead."
          }
        ],
        seo: { title: 'About Loading Happiness | Human-Centric IT' }
      },
      'services': {
        id: 'p2', title: 'Services', slug: 'services', status: 'published',
        layout: [
          {
            blockType: 'hero',
            heading: 'IT services built for real-world teams.',
            subheading: 'From daily helpdesk to high-level security strategy—we provide the stability your business needs.',
            primaryCTA: { label: 'Talk to an expert', link: '/contact' },
            image: { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", alt: "Tech" }
          }
        ],
        seo: { title: 'IT Services | Loading Happiness' }
      }
    };
    setPage(mockPages[slug] || mockPages['home']);
  }, [slug]);

  if (!page) return <div className="py-24 text-center">Loading...</div>;
  return <BlockRenderer blocks={page.layout} />;
};

const NewsHub = () => {
  const [searchParams] = useSearchParams();
  const catFilter = searchParams.get('category');
  const tagFilter = searchParams.get('tag');

  const filtered = useMemo(() => {
    return mockContent.filter(item => {
      const cMatch = !catFilter || item.categories.some(c => c.slug === catFilter);
      const tMatch = !tagFilter || item.tags?.some(t => t.slug === tagFilter);
      return cMatch && tMatch;
    });
  }, [catFilter, tagFilter]);

  const featured = filtered[0];
  const highlights = filtered.slice(1, 3);

  return (
    <div className="bg-white">
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {featured && (
              <div className="lg:col-span-8 group">
                <Link to={`/news/${featured.slug}`} className="block">
                  <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden bg-gray-100 mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-500 relative">
                    <img src={featured.featuredImage.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                    <div className="absolute top-6 left-6 flex gap-2">
                       <span className="px-3 py-1 bg-white/95 backdrop-blur shadow-sm rounded-lg text-[10px] font-extrabold uppercase tracking-widest text-blue-600">{featured.contentType}</span>
                    </div>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors tracking-tight leading-tight">{featured.title}</h2>
                  <p className="text-xl text-gray-600 leading-relaxed line-clamp-2 max-w-2xl">{featured.excerpt}</p>
                </Link>
              </div>
            )}
            
            <div className="lg:col-span-4 space-y-10">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-gray-400">Editor's Highlights</h3>
              {highlights.length > 0 ? highlights.map(h => (
                <Link key={h.id} to={`/news/${h.slug}`} className="flex gap-6 group">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm group-hover:shadow-md transition-all">
                    <img src={h.featuredImage.url} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[9px] font-extrabold text-blue-600 uppercase tracking-widest mb-1 block">{h.contentType}</span>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">{h.title}</h4>
                  </div>
                </Link>
              )) : (
                <div className="p-10 bg-gray-50 rounded-[2rem] border border-gray-100 text-sm text-gray-500 text-center italic">More highlights coming soon.</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContentDetail = () => {
  const { slug } = useParams();
  const content = mockContent.find(c => c.slug === slug);
  const location = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, [location]);

  if (!content) return <div className="py-24 text-center">Story not found.</div>;

  return (
    <article className="bg-white min-h-screen">
      <header className="pt-24 lg:pt-32 pb-16 border-b border-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] mb-8 tracking-tighter">{content.title}</h1>
          <p className="text-xl lg:text-2xl text-gray-500 leading-relaxed mb-12 font-medium italic">{content.excerpt}</p>
        </div>
      </header>
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlockRenderer blocks={content.body as any} />
        </div>
      </section>
    </article>
  );
};

const CaseStudyListPage = () => (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-12 tracking-tighter">Real outcomes.</h1>
      </div>
    </section>
);

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: any) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-8 tracking-tighter">Let's build stability.</h1>
        </div>
        <div className="bg-gray-50 p-12 lg:p-16 rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50">
          {submitted ? (
            <div className="text-center py-16">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Message Sent!</h2>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <input required className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-blue-100 font-medium" placeholder="Full Name" />
              <input required type="email" className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-blue-100 font-medium" placeholder="Work Email" />
              <textarea required rows={5} className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-blue-100 font-medium" placeholder="Describe your challenge..." />
              <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-extrabold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [settings] = useState<SiteSettings>({
    brandName: 'Loading Happiness',
    tagline: 'Technology with a human heart.',
    email: 'hello@loadinghappiness.com',
    phone: '+1 (555) 123-4567'
  });

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white selection:bg-blue-100 selection:text-blue-900 font-sans antialiased overflow-x-hidden">
        <Navbar settings={settings} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<DynamicPage slug="home" />} />
            <Route path="/about" element={<DynamicPage slug="about" />} />
            <Route path="/services" element={<DynamicPage slug="services" />} />
            <Route path="/impact" element={<DynamicPage slug="impact" />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/case-studies" element={<CaseStudyListPage />} />
            <Route path="/news" element={<NewsHub />} />
            <Route path="/news/:slug" element={<ContentDetail />} />
            <Route path="/:slug" element={<DynamicPage />} />
          </Routes>
        </main>
        <Footer settings={settings} />
      </div>
    </Router>
  );
};

export default App;
