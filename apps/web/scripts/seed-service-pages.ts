import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import { serviceTemplatePresets } from '../src/payload/serviceTemplates';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceTemplatePresetsEn = {
  'managed-it': {
    hero: {
      heading: 'Managed IT & Helpdesk',
      subheading: 'Stable operations, monitoring, and clear ownership — so small issues don’t become big outages.',
      primaryCTA: { label: 'Request an assessment', link: '/contact' },
      secondaryCTA: { label: 'Talk to a human', link: '/contact' },
      badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
    },
    whoItsFor: {
      title: 'Best for teams that…',
      items: [
        { text: 'need predictable support and faster resolution' },
        { text: 'want fewer recurring incidents' },
        { text: 'need documentation and clear accountability' },
        { text: 'don’t have time to manage vendors and tools' },
      ],
    },
    deliverables: {
      title: 'What we deliver',
      items: [
        { title: 'Incident response and escalation', text: 'Clear severity paths and accountable ownership.' },
        { title: 'Monitoring and maintenance', text: 'Prevent repeats with early alerts.' },
        { title: 'Access and asset baseline', text: 'Who has access to what, and why.' },
        { title: 'On/offboarding', text: 'Clear process for joins and exits.' },
        { title: 'Monthly health notes', text: 'What changed, what improved, what’s next.' },
      ],
    },
    outcomes: {
      title: 'Expected outcomes',
      items: [
        { title: 'Fewer repeats', text: 'Root causes fixed, not just symptoms.' },
        { title: 'Visibility', text: 'You know what’s happening and why.' },
        { title: 'Happier users', text: 'Clear responses and realistic timelines.' },
        { title: 'Calmer operations', text: 'Less firefighting, more focus.' },
      ],
    },
    steps: {
      title: 'How we work',
      items: [
        { title: 'Quick discovery', text: 'Context, urgency, priorities.' },
        { title: 'Access and inventory baseline', text: 'Map systems, users, risks.' },
        { title: 'Quick wins (30 days)', text: 'Remove immediate friction.' },
        { title: 'Operational rhythm', text: 'Ticketing, reporting, reviews.' },
      ],
    },
    cta: {
      title: 'Want predictable support?',
      content: 'We align on context and propose a practical plan.',
      primaryCTA: { label: 'Book a call', link: '/contact' },
      secondaryCTA: { label: 'Send a message', link: '/contact' },
    },
  },
  cybersecurity: {
    hero: {
      heading: 'Pragmatic Cybersecurity',
      subheading: 'Hardening, strong identity, and tested backups — controls that reduce risk without blocking people.',
      primaryCTA: { label: 'Request an assessment', link: '/contact' },
      secondaryCTA: { label: 'Talk to a human', link: '/contact' },
      badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
    },
    whoItsFor: {
      title: 'Best for teams that…',
      items: [
        { text: 'need MFA and minimum policies in place' },
        { text: 'want clarity on real risk surface' },
        { text: 'need evidence for clients/audits' },
        { text: 'want incident response without chaos' },
      ],
    },
    deliverables: {
      title: 'What we deliver',
      items: [
        { title: 'Security baseline and policies', text: 'Control map, gaps, priorities.' },
        { title: 'Identity hardening', text: 'MFA, conditional access, least privilege.' },
        { title: 'Endpoint/email protection', text: 'EDR/AV, mail security, practical awareness.' },
        { title: 'Backups and recovery tests', text: 'Proven restores, not assumptions.' },
        { title: 'Playbooks', text: 'Clear procedures for incidents.' },
      ],
    },
    checklist: {
      title: 'Baseline checklist',
      items: [
        { item: 'MFA enforced for privileged accounts' },
        { item: 'Email and endpoint protection live' },
        { item: 'Backups tested and verified' },
        { item: 'Least privilege and access control' },
      ],
    },
    outcomes: {
      title: 'Expected outcomes',
      items: [
        { title: 'Reduced exposure', text: 'High-risk gaps closed first.' },
        { title: 'Evidence ready', text: 'For clients and audits.' },
        { title: 'Clear playbooks', text: 'Lower stress in incidents.' },
        { title: 'Tested recovery', text: 'Validated restores.' },
      ],
    },
    steps: {
      title: 'How we work',
      items: [
        { title: 'Risk discovery', text: 'Map real risk surface.' },
        { title: '90-day plan', text: 'Prioritize controls by impact.' },
        { title: 'Implementation', text: 'Rollout with minimal friction.' },
        { title: 'Reviews', text: 'Quarterly metrics and adjustments.' },
      ],
    },
    cta: {
      title: 'Want pragmatic security?',
      content: 'We focus on controls that matter and evidence you can show.',
      primaryCTA: { label: 'Book a call', link: '/contact' },
      secondaryCTA: { label: 'Send a message', link: '/contact' },
    },
  },
  'm365-cloud': {
    hero: {
      heading: 'Microsoft 365 & Cloud',
      subheading: 'Governance, migrations, identity, and licensing without waste.',
      primaryCTA: { label: 'Request an assessment', link: '/contact' },
      secondaryCTA: { label: 'Talk to a human', link: '/contact' },
      badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
    },
    whoItsFor: {
      title: 'Best for teams that…',
      items: [
        { text: 'have licensing/perms confusion' },
        { text: 'need policies and ownership defined' },
        { text: 'plan migrations with low downtime' },
        { text: 'want fewer tickets about M365' },
      ],
    },
    deliverables: {
      title: 'What we deliver',
      items: [
        { title: 'Tenant governance and policies', text: 'Retention, ownership, safe defaults.' },
        { title: 'Identity and access', text: 'Consistent roles and permissions.' },
        { title: 'Migration planning and execution', text: 'Clear milestones, safe cutovers.' },
        { title: 'Licensing and cost hygiene', text: 'Eliminate waste, align to use.' },
        { title: 'Documentation and enablement', text: 'Less confusion, fewer tickets.' },
      ],
    },
    stats: {
      title: 'Target metrics',
      intro: 'Indicators after stabilization.',
      items: [
        { label: 'License waste', value: '↓ 20–30%' },
        { label: 'Access tickets', value: '↓ 30–40%' },
        { label: 'Policy coverage', value: '100%' },
      ],
    },
    outcomes: {
      title: 'Expected outcomes',
      items: [
        { title: 'Less waste', text: 'Licenses match real use.' },
        { title: 'Predictable access', text: 'Clear permission models.' },
        { title: 'Secure tenant', text: 'Governance that survives turnover.' },
        { title: 'Calm cutovers', text: 'No surprises in migration.' },
      ],
    },
    steps: {
      title: 'How we work',
      items: [
        { title: 'Assess', text: 'Tenant health, gaps, risks.' },
        { title: 'Govern', text: 'Rules, ownership, policies.' },
        { title: 'Migrate / clean up', text: 'Execution with milestones.' },
        { title: 'Stabilize', text: 'Reduce tickets and document.' },
      ],
    },
    cta: {
      title: 'Need clarity on M365?',
      content: 'We sort governance, security, and licensing without drama.',
      primaryCTA: { label: 'Book a call', link: '/contact' },
      secondaryCTA: { label: 'Send a message', link: '/contact' },
    },
  },
  networking: {
    hero: {
      heading: 'Networking & Wi-Fi',
      subheading: 'Reliable coverage, secure segmentation, and VPNs that actually work.',
      primaryCTA: { label: 'Request an assessment', link: '/contact' },
      secondaryCTA: { label: 'Talk to a human', link: '/contact' },
      badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
    },
    whoItsFor: {
      title: 'Best for teams that…',
      items: [
        { text: 'have Wi-Fi drops or constant latency' },
        { text: 'need stable VPN for remote teams' },
        { text: 'want segmentation and smaller attack surface' },
        { text: 'lack visibility on performance' },
      ],
    },
    deliverables: {
      title: 'What we deliver',
      items: [
        { title: 'Network audit', text: 'Inventory, risks, bottlenecks.' },
        { title: 'Segmentation and firewalls', text: 'Less lateral movement, more security.' },
        { title: 'Wi-Fi redesign', text: 'Coverage, density, tuning.' },
        { title: 'VPN and remote access', text: 'Consistent, secure access.' },
        { title: 'Monitoring and alerts', text: 'Know before complaints.' },
      ],
    },
    outcomes: {
      title: 'Expected outcomes',
      items: [
        { title: 'Fewer outages', text: 'Better design and alerts.' },
        { title: 'Reliable remote access', text: 'VPN without friction.' },
        { title: 'Visibility', text: 'Network health is measurable.' },
        { title: 'Tuned performance', text: 'For real usage patterns.' },
      ],
    },
    steps: {
      title: 'How we work',
      items: [
        { title: 'Map', text: 'Devices, risks, utilization.' },
        { title: 'Design', text: 'Segmentation, Wi-Fi, policies.' },
        { title: 'Implement', text: 'Rollout with minimal downtime.' },
        { title: 'Monitor', text: 'Alerts and continuous tuning.' },
      ],
    },
    cta: {
      title: 'Want calmer networks?',
      content: 'We redesign and monitor so issues are predictable.',
      primaryCTA: { label: 'Book a call', link: '/contact' },
      secondaryCTA: { label: 'Send a message', link: '/contact' },
    },
  },
  infrastructure: {
    hero: {
      heading: 'Infrastructure & Virtualization',
      subheading: 'Stable performance, tested backups, and planned upgrades.',
      primaryCTA: { label: 'Request an assessment', link: '/contact' },
      secondaryCTA: { label: 'Talk to a human', link: '/contact' },
      badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
    },
    whoItsFor: {
      title: 'Best for teams that…',
      items: [
        { text: 'run aging or mixed infrastructure' },
        { text: 'don’t trust backups or never tested restores' },
        { text: 'suffer from unpredictable performance' },
        { text: 'need documentation and runbooks' },
      ],
    },
    deliverables: {
      title: 'What we deliver',
      items: [
        { title: 'Assessment and sizing', text: 'Right-size and risk map.' },
        { title: 'Virtualization/storage tuning', text: 'Performance and resilience.' },
        { title: 'Backups and recovery tests', text: 'Proven restores.' },
        { title: 'Lifecycle and patching plan', text: 'Planned upgrades, fewer surprises.' },
        { title: 'Runbooks and documentation', text: 'System maps and procedures.' },
      ],
    },
    outcomes: {
      title: 'Expected outcomes',
      items: [
        { title: 'Fewer outages', text: 'Less fragility in core systems.' },
        { title: 'Faster recovery', text: 'Tested restore paths.' },
        { title: 'Capacity clarity', text: 'Know when and what to scale.' },
        { title: 'Reusable knowledge', text: 'Living documentation.' },
      ],
    },
    steps: {
      title: 'How we work',
      items: [
        { title: 'Assess', text: 'Hardware, risk, and load.' },
        { title: 'Stabilize', text: 'Fix biggest fragilities.' },
        { title: 'Optimize', text: 'Performance and security.' },
        { title: 'Document', text: 'Keep knowledge out of heads.' },
      ],
    },
    cta: {
      title: 'Need stable infra?',
      content: 'We right-size, test recovery, and plan upgrades.',
      primaryCTA: { label: 'Book a call', link: '/contact' },
      secondaryCTA: { label: 'Send a message', link: '/contact' },
    },
  },
  'strategy-roadmaps': {
    hero: {
      heading: 'Strategy & Roadmaps',
      subheading: 'Realistic 12–24 month plan: what to fix now, what to invest in next.',
      primaryCTA: { label: 'Request an assessment', link: '/contact' },
      secondaryCTA: { label: 'Talk to a human', link: '/contact' },
      badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
    },
    whoItsFor: {
      title: 'Best for teams that…',
      items: [
        { text: 'need clear now vs later priorities' },
        { text: 'want a realistic investment plan' },
        { text: 'need stakeholder alignment' },
        { text: 'want to stop reactive spend' },
      ],
    },
    deliverables: {
      title: 'What we deliver',
      items: [
        { title: 'Operational baseline and risk map', text: 'Current state and fragility.' },
        { title: '12–24 month roadmap', text: 'Sequence by impact and cost.' },
        { title: 'Budget and investment', text: 'Spend where outcomes change.' },
        { title: 'Measurable quick wins', text: 'Stability improvements you can show.' },
        { title: 'Leadership-ready reporting', text: 'Translate ops into decisions.' },
      ],
    },
    outcomes: {
      title: 'Expected outcomes',
      items: [
        { title: 'Clear priorities', text: 'Fix the right things first.' },
        { title: 'Predictable investments', text: 'No surprise spending.' },
        { title: 'Less firefighting spend', text: 'Fewer emergencies and detours.' },
        { title: 'Aligned stakeholders', text: 'Everyone knows the plan.' },
      ],
    },
    steps: {
      title: 'How we work',
      items: [
        { title: 'Discovery', text: 'Context and constraints.' },
        { title: 'Roadmap design', text: 'Sequence fixes and investments.' },
        { title: 'Alignment', text: 'Agreed scope and ownership.' },
        { title: 'Execution support', text: 'Reviews to keep pace.' },
      ],
    },
    cta: {
      title: 'Need a realistic roadmap?',
      content: 'We sequence fixes and investments you can defend.',
      primaryCTA: { label: 'Book a call', link: '/contact' },
      secondaryCTA: { label: 'Send a message', link: '/contact' },
    },
  },
  'backup-continuity': {
    hero: {
      heading: 'Backups & Continuity',
      subheading: '3-2-1 backups, tested restores, and simple runbooks when things go wrong.',
      primaryCTA: { label: 'Request an assessment', link: '/contact' },
      secondaryCTA: { label: 'Talk to a human', link: '/contact' },
      badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
    },
    whoItsFor: {
      title: 'Best for teams that…',
      items: [
        { text: 'don’t test restores or don’t trust backups' },
        { text: 'have critical data with undefined RPO/RTO' },
        { text: 'depend on local storage without redundancy' },
        { text: 'need an anti-ransomware plan' },
      ],
    },
    deliverables: {
      title: 'What we deliver',
      items: [
        { title: 'Data and risk map', text: 'What is critical, where it lives, who uses it.' },
        { title: '3-2-1 strategy', text: 'Local + offsite copies, immutability when possible.' },
        { title: 'Restore tests', text: 'Regular proof of recovery.' },
        { title: 'Continuity runbooks', text: 'Clear steps for incidents.' },
        { title: 'Backup monitoring', text: 'Failure alerts and reports.' },
      ],
    },
    outcomes: {
      title: 'Expected outcomes',
      items: [
        { title: 'Defined RPO/RTO', text: 'Clear expectations for the business.' },
        { title: 'Proven restores', text: 'Less guesswork, more confidence.' },
        { title: 'Lower ransomware impact', text: 'Resilient backups.' },
        { title: 'Team knows what to do', text: 'Simple runbooks.' },
      ],
    },
    steps: {
      title: 'How we work',
      items: [
        { title: 'Assess and map', text: 'Data sources, risks, priorities.' },
        { title: 'Stabilize', text: 'Ensure consistent copies and isolation.' },
        { title: 'Test', text: 'Periodic restores and success metrics.' },
        { title: 'Review', text: 'Quarterly adjustments as things change.' },
      ],
    },
    cta: {
      title: 'Need confidence in backups?',
      content: 'We design, test, and monitor so recovery is proven.',
      primaryCTA: { label: 'Book a call', link: '/contact' },
      secondaryCTA: { label: 'Send a message', link: '/contact' },
    },
  },
  'projects-procurement': {
    hero: {
      heading: 'Projects & Procurement',
      subheading: 'Projects with clear scope and timelines, purchasing without waste.',
      primaryCTA: { label: 'Request an assessment', link: '/contact' },
      secondaryCTA: { label: 'Talk to a human', link: '/contact' },
      badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
    },
    whoItsFor: {
      title: 'Best for teams that…',
      items: [
        { text: 'see projects slip on time and cost' },
        { text: 'need to refresh equipment or licenses' },
        { text: 'lack a dedicated technical PM' },
        { text: 'must justify investments with ROI' },
      ],
    },
    deliverables: {
      title: 'What we deliver',
      items: [
        { title: 'Discovery and scope', text: 'Requirements, risks, dependencies.' },
        { title: 'Plan and budget', text: 'Realistic schedule and phases.' },
        { title: 'Implementation and coordination', text: 'Manage vendors and internal teams.' },
        { title: 'Documentation and handover', text: 'Runbooks and clear ownership.' },
        { title: 'Vendor evaluation', text: 'Criteria and recommendations.' },
      ],
    },
    outcomes: {
      title: 'Expected outcomes',
      items: [
        { title: 'On-time projects', text: 'Fewer slips and surprises.' },
        { title: 'Justified purchasing', text: 'Decisions based on need and ROI.' },
        { title: 'Prepared team', text: 'Handover and documentation.' },
        { title: 'Less rework', text: 'Tight scope and controls.' },
      ],
    },
    steps: {
      title: 'How we work',
      items: [
        { title: 'Scoping', text: 'Align goals and constraints.' },
        { title: 'Planning', text: 'Schedule, budget, risks.' },
        { title: 'Delivery', text: 'Coordination and validation.' },
        { title: 'Handover', text: 'Docs and training.' },
      ],
    },
    cta: {
      title: 'Need projects without waste?',
      content: 'We plan and deliver with ROI and handover.',
      primaryCTA: { label: 'Book a call', link: '/contact' },
      secondaryCTA: { label: 'Send a message', link: '/contact' },
    },
  },
  'compliance-gdpr': {
    hero: {
      heading: 'Compliance & GDPR',
      subheading: 'Policies, technical controls, and practical evidence for clients and audits.',
      primaryCTA: { label: 'Request an assessment', link: '/contact' },
      secondaryCTA: { label: 'Talk to a human', link: '/contact' },
      badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
    },
    whoItsFor: {
      title: 'Best for teams that…',
      items: [
        { text: 'need evidence of compliance for clients' },
        { text: 'lack control over personal data or ROPA/DPIA' },
        { text: 'want IT aligned with legal requirements' },
        { text: 'need playbooks for incidents and DSRs' },
      ],
    },
    deliverables: {
      title: 'What we deliver',
      items: [
        { title: 'Gap analysis and plan', text: 'Current vs. required state.' },
        { title: 'Policies and registers', text: 'ROPA, DPIA, clear procedures.' },
        { title: 'Technical controls', text: 'Access, logging, encryption, backups.' },
        { title: 'Retention and minimization', text: 'Right data, right time.' },
        { title: 'Short training', text: 'Practical awareness and repetition.' },
      ],
    },
    outcomes: {
      title: 'Expected outcomes',
      items: [
        { title: 'Evidence ready', text: 'For clients and audits.' },
        { title: 'Lower breach risk', text: 'Controls applied and reviewed.' },
        { title: 'Clear processes', text: 'Who does what in incidents/DSRs.' },
        { title: 'Data under control', text: 'Retention aligned to business.' },
      ],
    },
    steps: {
      title: 'How we work',
      items: [
        { title: 'Assess', text: 'Legal and technical gaps.' },
        { title: 'Implement', text: 'Essential controls and policies.' },
        { title: 'Evidence', text: 'Simple records and proof.' },
        { title: 'Review', text: 'Periodic updates.' },
      ],
    },
    cta: {
      title: 'Need audit-ready proof?',
      content: 'We put policies, controls, and evidence in place.',
      primaryCTA: { label: 'Book a call', link: '/contact' },
      secondaryCTA: { label: 'Send a message', link: '/contact' },
    },
  },
  'custom-software': {
    hero: {
      heading: 'Custom Software & Integrations',
      subheading: 'Automation and tools for operations: EnviaSAFT, GS1-128, ERP/SQL integrations and APIs.',
      primaryCTA: { label: 'Discuss a project', link: '/contact' },
      secondaryCTA: { label: 'Request an assessment', link: '/contact' },
      badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
    },
    whoItsFor: {
      title: 'Best for teams that…',
      items: [
        { text: 'have manual processes wasting time' },
        { text: 'need ERP/SQL integrated with other apps' },
        { text: 'have compliance needs (e.g., SAF-T)' },
        { text: 'want to remove errors in logistics/labels' },
      ],
    },
    deliverables: {
      title: 'What we deliver',
      items: [
        { title: 'Discovery and blueprint', text: 'Context, data, objectives.' },
        { title: 'Incremental development', text: 'Short cycles with feedback.' },
        { title: 'Integrations and APIs', text: 'ERP, SQL, task automation.' },
        { title: 'Testing and documentation', text: 'Runbooks, handover, basic monitoring.' },
        { title: 'Optional maintenance', text: 'Support plans with SLA.' },
      ],
    },
    outcomes: {
      title: 'Expected outcomes',
      items: [
        { title: 'Less manual work', text: 'Automation where it matters.' },
        { title: 'Consistent data', text: 'Robust integrations.' },
        { title: 'Easier compliance', text: 'e.g., SAF-T with EnviaSAFT.' },
        { title: 'Predictable support', text: 'Agreed roadmap and maintenance.' },
      ],
    },
    steps: {
      title: 'How we work',
      items: [
        { title: 'Discovery', text: 'Map problem and data.' },
        { title: 'Prototype', text: 'Validate fast.' },
        { title: 'Beta', text: 'User testing and adjustments.' },
        { title: 'Production', text: 'Handover, monitoring, support.' },
      ],
    },
    cta: {
      title: 'Need bespoke tools?',
      content: 'We build and maintain pragmatic software and integrations.',
      primaryCTA: { label: 'Book a call', link: '/contact' },
      secondaryCTA: { label: 'Send a message', link: '/contact' },
    },
  },
} as const;

const loadEnvFile = async () => {
  const envPath = path.resolve(__dirname, '../.env.local');
  try {
    const contents = await fs.readFile(envPath, 'utf8');
    for (const line of contents.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      if (!key) continue;
      const value = rest.join('=').trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // Ignore missing env file.
  }
};

type ServiceKey = keyof typeof serviceTemplatePresets;

const services: Array<{ key: ServiceKey; title: string }> = [
  { key: 'managed-it', title: 'TI Gerida & Helpdesk' },
  { key: 'cybersecurity', title: 'Cibersegurança pragmática' },
  { key: 'm365-cloud', title: 'Microsoft 365 & Cloud' },
  { key: 'networking', title: 'Redes & Wi-Fi' },
  { key: 'infrastructure', title: 'Infraestrutura & Virtualização' },
  { key: 'strategy-roadmaps', title: 'Estratégia & Roadmaps' },
  { key: 'backup-continuity', title: 'Backups & Continuidade' },
  { key: 'projects-procurement', title: 'Projetos & Procurement' },
  { key: 'compliance-gdpr', title: 'Compliance & GDPR' },
  { key: 'custom-software', title: 'Software à Medida & Integrações' },
];

const upsertPage = async (payload: any, slug: string, data: any, locale: string) => {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    locale,
  });

  if (existing.totalDocs > 0) {
    const id = existing.docs[0].id;
    await payload.update({
      collection: 'pages',
      id,
      data,
      locale,
    });
    return { action: 'updated', id };
  }

  const created = await payload.create({
    collection: 'pages',
    data: { ...data, slug },
    locale,
  });
  return { action: 'created', id: created.id };
};

const buildServicesGrid = (presetMap: typeof serviceTemplatePresets | typeof serviceTemplatePresetsEn, locale: 'pt' | 'en') =>
  services.map((service) => {
    const preset = presetMap[service.key];
    const deliverables = preset?.deliverables?.items || [];
    return {
      title: preset?.hero?.heading || service.title,
      description: preset?.hero?.subheading || '',
      icon: '🛠️',
      link: `/services/${service.key}`,
      ctaLabel: locale === 'en' ? 'View details' : 'Ver detalhes',
      ctaHref: `/services/${service.key}`,
      bulletPoints: deliverables.slice(0, 3).map((item: any) => ({ text: item.title || item.text || '' })),
    };
  });

const buildServicesOverviewLayout = (
  presetMap: typeof serviceTemplatePresets | typeof serviceTemplatePresetsEn,
  locale: 'pt' | 'en',
) => {
  const servicesGrid = buildServicesGrid(presetMap, locale);
  const isEn = locale === 'en';
  return [
    {
      blockType: 'hero',
      enabled: true,
      anchorId: 'top',
      variant: 'C',
      theme: 'brandGradient',
      eyebrow: isEn ? 'Services' : 'Serviços',
      h1Title: isEn ? 'IT services for SMEs — clear and pragmatic' : 'Serviços de TI para PMEs – claros e pragmáticos',
      heading: isEn ? 'IT services for SMEs — clear and pragmatic' : 'Serviços de TI para PMEs – claros e pragmáticos',
      subheadline: isEn
        ? 'Stable operations, pragmatic security, and well-run projects with human responses and clear timelines.'
        : 'Operação estável, segurança pragmática e projetos bem geridos, com respostas humanas e prazos claros.',
      subheading: isEn
        ? 'Stable operations, pragmatic security, and well-run projects with human responses and clear timelines.'
        : 'Operação estável, segurança pragmática e projetos bem geridos, com respostas humanas e prazos claros.',
      primaryCTA: {
        label: isEn ? 'Book a call' : 'Marcar conversa',
        link: '/contact',
        trackingId: 'services-hero-primary',
      },
      secondaryCTA: { label: isEn ? 'Request assessment' : 'Pedir diagnóstico', link: '/contact' },
      featureList: [
        { text: isEn ? 'Defined SLA and escalation' : 'SLA e escalamento definidos' },
        { text: isEn ? 'Security and backups tested' : 'Segurança e backups testados' },
        { text: isEn ? 'Documentation and handover' : 'Documentação e handover' },
      ],
      badges: [
        { label: isEn ? 'Senior team' : 'Equipa sénior' },
        { label: isEn ? 'Remote + on-site' : 'Remoto + on-site' },
      ],
    },
    {
      blockType: 'servicesGrid',
      enabled: true,
      sectionId: 'services',
      title: isEn ? 'What we do' : 'O que fazemos',
      sectionTitle: isEn ? 'What we do' : 'O que fazemos',
      sectionIntro: isEn
        ? 'Complete coverage: support, security, cloud, projects, compliance, and custom software.'
        : 'Cobertura completa: suporte, segurança, cloud, projetos, compliance e software à medida.',
      services: servicesGrid,
      cta: { label: isEn ? 'Contact team' : 'Contactar equipa', link: '/contact' },
    },
    {
      blockType: 'finalCTA',
      sectionId: 'cta',
      title: isEn ? 'Ready for stable, secure IT?' : 'Pronto para uma TI estável e segura?',
      content: isEn
        ? 'We start with a quick assessment and a 30-60-90 day plan tailored to your context.'
        : 'Começamos com um diagnóstico rápido e um plano 30-60-90 dias ajustado ao teu contexto.',
      primaryCTA: { label: isEn ? 'Book a call' : 'Marcar conversa', link: '/contact' },
      secondaryCTA: { label: isEn ? 'Send a message' : 'Enviar mensagem', link: '/contact#form' },
      microcopy: isEn ? 'Typical reply in 1–2 business days.' : 'Resposta típica em 1–2 dias úteis.',
    },
  ];
};

const buildServiceLayoutFromTemplate = (
  serviceKey: ServiceKey,
  presetMap: typeof serviceTemplatePresets | typeof serviceTemplatePresetsEn,
) => {
  const preset = presetMap[serviceKey];
  if (!preset) return [];
  const template = serviceKey;
  const blocks: any[] = [];

  if (preset.hero) {
    blocks.push({
      blockType: 'hero',
      sectionId: 'intro',
      heading: preset.hero.heading,
      subheading: preset.hero.subheading,
      primaryCTA: preset.hero.primaryCTA,
      secondaryCTA: preset.hero.secondaryCTA,
      badges: preset.hero.badges,
      template,
    });
  }

  const whoItsFor: any = preset.whoItsFor as any;
  if (whoItsFor?.items?.length) {
    blocks.push({
      blockType: 'bullets',
      sectionId: 'who-its-for',
      title: whoItsFor.title,
      intro: whoItsFor.intro,
      items: whoItsFor.items,
      template,
    });
  }

  const deliverables: any = preset.deliverables as any;
  if (deliverables?.items?.length) {
    blocks.push({
      blockType: 'deliverables',
      sectionId: 'deliverables',
      title: deliverables.title,
      intro: deliverables.intro,
      items: deliverables.items,
      template,
    });
  }

  const checklist: any = (preset as any).checklist;
  if (checklist?.items?.length) {
    blocks.push({
      blockType: 'checklist',
      title: checklist.title,
      items: checklist.items,
      template,
    });
  }

  const stats: any = (preset as any).stats;
  if (stats?.items?.length) {
    blocks.push({
      blockType: 'stats',
      title: stats.title,
      intro: stats.intro,
      items: stats.items,
      template,
    });
  }

  const outcomes: any = (preset as any).outcomes;
  if (outcomes?.items?.length) {
    blocks.push({
      blockType: 'outcomesCards',
      sectionId: 'outcomes',
      title: outcomes.title,
      intro: outcomes.intro,
      cards: outcomes.items,
      template,
    });
  }

  const steps: any = (preset as any).steps;
  if (steps?.items?.length) {
    blocks.push({
      blockType: 'steps',
      sectionId: 'onboarding',
      title: steps.title,
      intro: steps.intro,
      steps: steps.items,
      template,
    });
  }

  if (preset.cta?.title) {
    blocks.push({
      blockType: 'finalCTA',
      sectionId: 'cta',
      title: preset.cta.title,
      content: preset.cta.content,
      primaryCTA: preset.cta.primaryCTA,
      secondaryCTA: preset.cta.secondaryCTA,
      template,
    });
  }

  return blocks;
};

const main = async () => {
  await loadEnvFile();
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    throw new Error('DATABASE_URI e PAYLOAD_SECRET têm de estar definidos antes de seed.');
  }

  const config = (await import('../payload.config.ts')).default;
  const payload = await getPayload({ config });

  // Seed service detail pages
  for (const service of services) {
    const preset = serviceTemplatePresets[service.key];
    const presetEn = serviceTemplatePresetsEn[service.key];
    if (!preset) {
      console.warn(`Preset em falta para ${service.key}, a ignorar.`);
      continue;
    }

    const baseData = {
      title: preset.hero.heading || service.title,
      slug: `services/${service.key}`,
      status: 'published',
      serviceTemplate: service.key,
      serviceTemplateData: preset,
      seo: {
        title: `${preset.hero.heading} | Loading Happiness`,
        description: preset.hero.subheading,
        indexable: true,
      },
    };

    const resultPt = await upsertPage(payload, baseData.slug, baseData, 'pt');
    console.log(`${resultPt.action} page pt ${baseData.slug} (${resultPt.id})`);

    // EN locale uses layout so it can diverge without touching PT content.
    const enLayout = buildServiceLayoutFromTemplate(service.key, serviceTemplatePresetsEn);
    const resultEn = await upsertPage(
      payload,
      baseData.slug,
      {
        ...baseData,
        serviceTemplateData: preset, // Keep PT template data to avoid overwriting non-localized fields with EN copy
        title: preset.hero.heading || service.title,
        layout: enLayout,
        seo: presetEn?.hero
          ? {
              title: `${presetEn.hero.heading} | Loading Happiness`,
              description: presetEn.hero.subheading,
              indexable: true,
            }
          : baseData.seo,
      },
      'en',
    );
    console.log(`${resultEn.action} page en ${baseData.slug} (${resultEn.id})`);
  }

  // Seed services overview page
  const overviewDataPt = {
    title: 'Serviços',
    slug: 'services',
    status: 'published',
    layout: buildServicesOverviewLayout(serviceTemplatePresets, 'pt'),
    seo: {
      title: 'Serviços de TI para PME | Loading Happiness',
      description: 'Operação estável, segurança pragmática e projetos bem geridos para PME em Portugal.',
      indexable: true,
    },
  };
  const overviewResultPt = await upsertPage(payload, overviewDataPt.slug, overviewDataPt, 'pt');
  console.log(`${overviewResultPt.action} page pt ${overviewDataPt.slug} (${overviewResultPt.id})`);

  const overviewDataEn = {
    title: 'Services',
    slug: 'services',
    status: 'published',
    layout: buildServicesOverviewLayout(serviceTemplatePresetsEn, 'en'),
    seo: {
      title: 'IT Services for SMEs | Loading Happiness',
      description:
        'Practical IT for SMEs: stability, pragmatic security, Microsoft 365, networks, backups, projects, and integrations. Clear, human, and predictable.',
      indexable: true,
    },
  };
  const overviewResultEn = await upsertPage(payload, overviewDataEn.slug, overviewDataEn, 'en');
  console.log(`${overviewResultEn.action} page en ${overviewDataEn.slug} (${overviewResultEn.id})`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
