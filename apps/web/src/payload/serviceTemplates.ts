const baseCTA = {
  title: 'Want support that feels predictable?',
  content: 'We’ll align on your context and propose a practical plan.',
  primaryCTA: { label: 'Book a call', link: '/contact' },
  secondaryCTA: { label: 'Send a message', link: '/contact' },
};

const baseHero = (heading: string, subheading: string, variant: string) => ({
  variant,
  theme: 'brandGradient',
  heading,
  subheading,
  primaryCTA: { label: 'Request an assessment', link: '/contact' },
  secondaryCTA: { label: 'Download scope PDF', link: '/service-scope.pdf' },
  badges: [{ text: 'Senior-led' }, { text: 'Security-first' }],
});

export const serviceTemplatePresets = {
  'managed-it': {
    hero: baseHero(
      'Managed IT & Helpdesk',
      'Reliable support, proactive maintenance, and clear ownership — so small issues don’t become big outages.',
      'C'
    ),
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
        { title: 'Proactive monitoring and maintenance', text: 'Prevent repeats with early alerts.' },
        { title: 'Patch management approach', text: 'Aligned with business hours and change windows.' },
        { title: 'Asset and access baseline', text: 'Who has access to what, and why.' },
        { title: 'Monthly health notes', text: 'What changed, what improved, what’s next.' },
      ],
    },
    outcomes: {
      title: 'Outcomes you can expect',
      items: [
        { title: 'Fewer repeated issues', text: 'Root causes addressed, not just symptoms.' },
        { title: 'Faster recovery', text: 'Clear roles and documented steps.' },
        { title: 'Better visibility', text: 'You know what’s happening and why.' },
        { title: 'Calmer operations', text: 'Less firefighting, more focus.' },
      ],
    },
    steps: {
      title: 'How we onboard',
      items: [
        { title: 'Quick discovery call', text: 'Align goals, scope, and urgency.' },
        { title: 'Access + inventory baseline', text: 'Map systems, users, and risks.' },
        { title: 'Quick wins (first 30 days)', text: 'Remove immediate friction.' },
        { title: 'Operational rhythm', text: 'Ticketing, reporting, reviews.' },
      ],
    },
    cta: baseCTA,
  },
  cybersecurity: {
    hero: baseHero(
      'Cybersecurity Baseline & Hardening',
      'Controls that reduce risk without slowing people down.',
      'C'
    ),
    whoItsFor: {
      title: 'Best for teams that…',
      items: [
        { text: 'need clarity on your real risk surface' },
        { text: 'want practical controls without enterprise overhead' },
        { text: 'need stronger identity and access discipline' },
        { text: 'must be audit-ready with minimal disruption' },
      ],
    },
    deliverables: {
      title: 'What we deliver',
      items: [
        { title: 'Security baseline and policy mapping', text: 'What exists vs. what is needed.' },
        { title: 'Identity hardening', text: 'MFA, conditional access, least privilege.' },
        { title: 'Endpoint and email protection', text: 'Sane defaults, measurable coverage.' },
        { title: 'Backups and recovery validation', text: 'Tested restores, not assumptions.' },
        { title: 'Security awareness guidance', text: 'Short, practical enablement for teams.' },
      ],
    },
    checklist: {
      title: 'Security baseline checklist',
      items: [
        { item: 'MFA enforced for all privileged accounts' },
        { item: 'Email and endpoint protection configured' },
        { item: 'Backups tested and recovery verified' },
        { item: 'Conditional access and least privilege' },
      ],
    },
    outcomes: {
      title: 'Outcomes you can expect',
      items: [
        { title: 'Lower incident exposure', text: 'High-risk gaps closed first.' },
        { title: 'Clearer ownership', text: 'Access and responsibility are explicit.' },
        { title: 'Audit-ready evidence', text: 'Policies and controls you can show.' },
        { title: 'Reduced response stress', text: 'Playbooks and escalation paths.' },
      ],
    },
    steps: {
      title: 'How we onboard',
      items: [
        { title: 'Risk discovery', text: 'Find high-risk gaps first.' },
        { title: 'Hardening plan', text: 'Prioritize controls by impact.' },
        { title: 'Implementation', text: 'Roll out changes with minimal disruption.' },
        { title: 'Ongoing review', text: 'Measure and improve quarterly.' },
      ],
    },
    cta: baseCTA,
  },
  'm365-cloud': {
    hero: baseHero('Microsoft 365 & Cloud', 'Governance, identity, migrations, licensing sanity.', 'C'),
    whoItsFor: {
      title: 'Best for teams that…',
      items: [
        { text: 'need clarity around M365 licensing and usage' },
        { text: 'want governance and security in place' },
        { text: 'must migrate with low downtime' },
        { text: 'need fewer support tickets and confusion' },
      ],
    },
    deliverables: {
      title: 'What we deliver',
      items: [
        { title: 'Tenant governance and policies', text: 'Ownership, retention, and safe defaults.' },
        { title: 'Identity and access standardization', text: 'Consistent roles and access models.' },
        { title: 'Migration planning and execution', text: 'Clear timelines, minimal downtime.' },
        { title: 'Licensing and cost hygiene', text: 'Remove waste, align to real use.' },
        { title: 'Documentation and enablement', text: 'Reduce confusion and tickets.' },
      ],
    },
    stats: {
      title: 'Cloud clarity metrics',
      intro: 'Baseline outcomes we aim to achieve.',
      items: [
        { label: 'Licensing waste', value: '↓ 25%' },
        { label: 'Access issues', value: '↓ 40%' },
        { label: 'Policy coverage', value: '100%' },
      ],
    },
    outcomes: {
      title: 'Outcomes you can expect',
      items: [
        { title: 'Lower licensing waste', text: 'Spend aligns with usage.' },
        { title: 'Fewer access issues', text: 'Predictable permission models.' },
        { title: 'Clear tenant ownership', text: 'Governance survives staff changes.' },
        { title: 'Safer migrations', text: 'No surprises during cutover.' },
      ],
    },
    steps: {
      title: 'How we onboard',
      items: [
        { title: 'Discovery', text: 'Assess tenant health and gaps.' },
        { title: 'Governance setup', text: 'Define rules and ownership.' },
        { title: 'Migration or cleanup', text: 'Execute with clear milestones.' },
        { title: 'Stabilization', text: 'Reduce ticket load and document.' },
      ],
    },
    cta: baseCTA,
  },
  networking: {
    hero: baseHero('Networking & Connectivity', 'Wi-Fi, segmentation, VPN, monitoring, performance.', 'C'),
    whoItsFor: {
      title: 'Best for teams that…',
      items: [
        { text: 'need reliable Wi-Fi and secure segmentation' },
        { text: 'want visibility into network performance' },
        { text: 'require stable VPN access for remote teams' },
        { text: 'need to reduce outages across locations' },
      ],
    },
    deliverables: {
      title: 'What we deliver',
      items: [
        { title: 'Network assessment and mapping', text: 'Inventory, risk hotspots, bottlenecks.' },
        { title: 'Segmentation and firewall rules', text: 'Reduce lateral movement and blast radius.' },
        { title: 'Wi-Fi redesign and tuning', text: 'Coverage, density, and performance fixes.' },
        { title: 'VPN and remote access optimization', text: 'Reliable access without slowdown.' },
        { title: 'Monitoring and alerting baselines', text: 'Know before users complain.' },
      ],
    },
    outcomes: {
      title: 'Outcomes you can expect',
      items: [
        { title: 'Fewer outages', text: 'Better segmentation and monitoring.' },
        { title: 'Predictable remote access', text: 'Stable VPN experience for teams.' },
        { title: 'Clearer visibility', text: 'Network health is measurable.' },
        { title: 'Better performance', text: 'Tuned for real usage patterns.' },
      ],
    },
    steps: {
      title: 'How we onboard',
      items: [
        { title: 'Network audit', text: 'Map devices, risks, and bottlenecks.' },
        { title: 'Design fixes', text: 'Plan segmentation and improvements.' },
        { title: 'Implementation', text: 'Deploy changes with minimal downtime.' },
        { title: 'Monitoring', text: 'Track stability and performance.' },
      ],
    },
    cta: baseCTA,
  },
  infrastructure: {
    hero: baseHero('Infrastructure & Virtualization', 'Virtualization, storage, backups, recovery testing.', 'C'),
    whoItsFor: {
      title: 'Best for teams that…',
      items: [
        { text: 'run on aging infrastructure or mixed environments' },
        { text: 'need clear backup and recovery confidence' },
        { text: 'want more predictable performance' },
        { text: 'need documentation that survives growth' },
      ],
    },
    deliverables: {
      title: 'What we deliver',
      items: [
        { title: 'Infrastructure assessment and sizing', text: 'Right-sizing and risk mapping.' },
        { title: 'Virtualization and storage tuning', text: 'Performance and resilience improvements.' },
        { title: 'Backup and recovery testing', text: 'Prove recovery before it’s needed.' },
        { title: 'Lifecycle and patch planning', text: 'Plan upgrades, reduce surprise outages.' },
        { title: 'Operational documentation', text: 'Runbooks and system maps.' },
      ],
    },
    outcomes: {
      title: 'Outcomes you can expect',
      items: [
        { title: 'Fewer outages', text: 'Less fragility in core systems.' },
        { title: 'Faster recovery', text: 'Tested restore paths.' },
        { title: 'Capacity clarity', text: 'Know what to scale and when.' },
        { title: 'Documented baseline', text: 'Knowledge is reusable.' },
      ],
    },
    steps: {
      title: 'How we onboard',
      items: [
        { title: 'Assess environment', text: 'Map hardware, risk, and load.' },
        { title: 'Stabilize', text: 'Address the biggest fragilities.' },
        { title: 'Optimize', text: 'Tune for performance and safety.' },
        { title: 'Document', text: 'Keep knowledge out of people’s heads.' },
      ],
    },
    cta: baseCTA,
  },
  'strategy-roadmaps': {
    hero: baseHero(
      'Strategy & Roadmaps',
      'A realistic 12–24 month plan: what to fix now, what to invest in next.',
      'C'
    ),
    whoItsFor: {
      title: 'Best for teams that…',
      items: [
        { text: 'need clarity on what to fix now vs later' },
        { text: 'want a realistic investment plan' },
        { text: 'need stakeholder alignment and visibility' },
        { text: 'want to stop reactive spending' },
      ],
    },
    deliverables: {
      title: 'What we deliver',
      items: [
        { title: 'Operational baseline and risk map', text: 'Where you are and what’s fragile.' },
        { title: 'Priority roadmap (12–24 months)', text: 'Sequence fixes by impact and cost.' },
        { title: 'Budget and investment guidance', text: 'Spend where it changes outcomes.' },
        { title: 'Quick wins with measurable impact', text: 'Stability improvements you can show.' },
        { title: 'Leadership-ready reporting', text: 'Translate ops into decisions.' },
      ],
    },
    outcomes: {
      title: 'Outcomes you can expect',
      items: [
        { title: 'Clear priorities', text: 'Fix the right things first.' },
        { title: 'Predictable investments', text: 'No surprise spending.' },
        { title: 'Less reactive spend', text: 'Reduce firefighting budgets.' },
        { title: 'Aligned stakeholders', text: 'Everyone knows the plan.' },
      ],
    },
    steps: {
      title: 'How we onboard',
      items: [
        { title: 'Discovery', text: 'Understand context and constraints.' },
        { title: 'Roadmap design', text: 'Sequence fixes and investments.' },
        { title: 'Alignment', text: 'Agree on scope and ownership.' },
        { title: 'Execution support', text: 'Keep momentum with reviews.' },
      ],
    },
    cta: baseCTA,
  },
};
