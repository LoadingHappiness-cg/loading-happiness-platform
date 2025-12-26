import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const placeholderPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
  'base64'
);

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

const ensureMedia = async (payload: any, alt: string) => {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
  });
  if (existing.docs?.[0]) {
    return existing.docs[0].id;
  }

  const tmpDir = path.join(__dirname, 'tmp');
  await fs.mkdir(tmpDir, { recursive: true });
  const filename = `${alt.replace(/\s+/g, '-').toLowerCase()}.png`;
  const filePath = path.join(tmpDir, filename);
  await fs.writeFile(filePath, placeholderPng);
  const fileData = await fs.readFile(filePath);

  const created = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: fileData,
      name: filename,
      mimetype: 'image/png',
      size: fileData.length,
    },
  });

  return created.id;
};

const main = async () => {
  await loadEnvFile();
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    throw new Error('DATABASE_URI and PAYLOAD_SECRET must be set before seeding.');
  }

  const config = (await import('../payload.config.ts')).default;
  const payload = await getPayload({ config });

  const heroImage = await ensureMedia(payload, 'Services Hero');
  const splitImage = await ensureMedia(payload, 'Services Split');

  const layoutPt = [
    {
      blockType: 'hero',
      enabled: true,
      anchorId: 'top',
      variant: 'C',
      theme: 'brandGradient',
      eyebrow: 'Servicos',
      h1Title: 'Servicos de TI gerida para PMEs que precisam de estabilidade - e nao de dramas.',
      heading: 'Servicos de TI gerida para PMEs que precisam de estabilidade - e nao de dramas.',
      subheadline:
        'Suporte, infraestrutura e seguranca com metodo, SLAs claros e comunicacao humana. Portugal (on-site) + remoto.',
      subheading:
        'Suporte, infraestrutura e seguranca com metodo, SLAs claros e comunicacao humana. Portugal (on-site) + remoto.',
      trustLine: 'PMEs em Portugal e remoto na UE | Resposta rapida',
      primaryCTA: { label: 'Pedir avaliacao', link: '/contact', trackingId: 'services-hero-primary' },
      secondaryCTA: { label: 'Falar com um humano', link: '/contact' },
      heroImage,
      image: heroImage,
      mediaType: 'illustration',
      featureList: [
        { text: 'Resposta e escalamento definidos por SLA (consoante plano)' },
        { text: 'Manutencao preventiva e monitorizacao continua' },
        { text: 'Seguranca pragmatica: reduzir risco sem travar o negocio' },
      ],
      badges: [
        { label: '25+ anos' },
        { label: 'Portugal-based' },
        { label: 'Remote + On-site' },
        { label: 'Compromisso Pagamento Pontual' },
      ],
    },
    {
      blockType: 'deliverables',
      sectionId: 'expectations',
      title: 'O que pode esperar (na pratica)',
      intro: 'Ajustamos ao tamanho e criticidade da sua operacao.',
      items: [
        { title: 'Resposta inicial', text: 'Em X horas (SLA por plano).' },
        { title: 'Plano 30-60-90 dias', text: 'Estabilizar e criar base.' },
        { title: 'Relatorios', text: 'Mensal/trimestral com acoes e prioridades.' },
      ],
    },
    {
      blockType: 'servicesGrid',
      enabled: true,
      anchorId: 'services',
      title: 'O que fazemos',
      sectionTitle: 'O que fazemos',
      sectionIntro: 'Servicos completos para manter a sua empresa a trabalhar - com seguranca e previsibilidade.',
      services: [
        {
          title: 'TI Gerida (Managed IT)',
          description: 'Operacao diaria estavel, com prevencao e resposta rapida.',
          icon: 'IT',
          link: '/services/managed-it',
          ctaLabel: 'Ver detalhes',
          ctaHref: '/services/managed-it',
          tag: 'Mais comum',
          bulletPoints: [
            { text: 'Suporte aos utilizadores + gestao de endpoints' },
            { text: 'Monitorizacao, backups e atualizacoes controladas' },
            { text: 'Inventario, documentacao e melhoria continua' },
          ],
        },
        {
          title: 'Seguranca (pragmatica)',
          description: 'Medidas reais que reduzem risco sem complicar.',
          icon: 'SEC',
          link: '/services/cybersecurity',
          ctaLabel: 'Ver detalhes',
          ctaHref: '/services/cybersecurity',
          bulletPoints: [
            { text: 'Hardening, MFA, politicas e resposta a incidentes' },
            { text: 'Email security, EDR/AV, awareness pratico' },
            { text: 'Auditorias rapidas e plano de mitigacao' },
          ],
        },
        {
          title: 'Infraestrutura e Cloud',
          description: 'Redes, servidores e cloud bem desenhados - e bem mantidos.',
          icon: 'CLOUD',
          link: '/services/infrastructure-cloud',
          ctaLabel: 'Ver detalhes',
          ctaHref: '/services/infrastructure-cloud',
          bulletPoints: [
            { text: 'Microsoft 365 / Google Workspace / identity' },
            { text: 'Redes, Wi-Fi, firewalls, VPN, segmentation' },
            { text: 'Virtualizacao, storage, DR e performance' },
          ],
        },
        {
          title: 'Consultoria e Projetos',
          description: 'Projetos com principio, meio e fim - e sem surpresas.',
          icon: 'CONSULT',
          link: '/services/consulting',
          ctaLabel: 'Ver detalhes',
          ctaHref: '/services/consulting',
          bulletPoints: [
            { text: 'Migracoes, reestruturacoes, upgrades e compliance' },
            { text: 'Planeamento, orcamento e execucao' },
            { text: 'Entrega com documentacao e handover' },
          ],
        },
      ],
      ctaLabel: 'Ver todos os servicos',
      ctaHref: '/services',
    },
    {
      blockType: 'twoColumnList',
      sectionId: 'pme',
      title: 'Especialistas em PMEs, com mentalidade de enterprise',
      intro:
        'PMEs nao precisam de mais ferramentas. Precisam de TI que funcione todos os dias, seja segura e nao consuma tempo da gestao. Trazemos praticas de enterprise - adaptadas ao orcamento e realidade operacional.',
      leftTitle: 'O que aplicamos',
      leftItems: [
        { text: 'Priorizacao por risco e impacto (nao por modas)' },
        { text: 'Comunicacao simples: o que esta mal, o que fazer, quanto custa' },
        { text: 'Documentacao e continuidade: nada fica na cabeca de alguem' },
      ],
      rightTitle: 'Pacote base',
      rightItems: [
        { text: 'Diagnostico inicial + inventario' },
        { text: 'Plano 30-60-90 dias' },
        { text: 'Roadmap trimestral (com quick wins)' },
      ],
    },
    {
      blockType: 'valueCards',
      sectionId: 'values',
      title: 'O que nos diferencia',
      intro: 'Quatro pilares claros, com impacto direto na operacao.',
      cards: [
        {
          title: 'Estabilidade antes de inovacao',
          text: 'Promessa: eliminamos fragilidade primeiro. Pratica: estabilizacao + monitorizacao continua.',
        },
        {
          title: 'Seguranca pragmatica',
          text: 'Promessa: proteger o essencial. Pratica: MFA, hardening, backups testados e resposta rapida.',
        },
        {
          title: 'Integracao e clareza',
          text: 'Promessa: consistencia sem dependencia de "magos". Pratica: documentacao, standards e handover.',
        },
        {
          title: 'Relacao humana',
          text: 'Promessa: comunicacao simples e responsabilidade. Pratica: contacto direto e seguimento real.',
        },
      ],
    },
    {
      blockType: 'process',
      enabled: true,
      anchorId: 'process',
      title: 'O nosso processo',
      sectionTitle: 'O nosso processo',
      steps: [
        {
          stepNumber: 1,
          title: 'Diagnostico',
          content: 'Inventario, riscos e pontos criticos.',
          deliverables: [{ text: 'Relatorio curto + prioridades (Top 10)' }],
        },
        {
          stepNumber: 2,
          title: 'Plano de acao',
          content: '30-60-90 dias + orcamento por fases.',
          deliverables: [{ text: 'Roadmap + quick wins' }],
        },
        {
          stepNumber: 3,
          title: 'Implementacao',
          content: 'Mudancas controladas, com rollback e documentacao.',
          deliverables: [{ text: 'Documentacao + handover' }],
        },
        {
          stepNumber: 4,
          title: 'Operacao',
          content: 'Monitorizacao, suporte e revisao continua.',
          deliverables: [{ text: 'Relatorio periodico + backlog de melhorias' }],
        },
      ],
      note: 'Assess -> Stabilize -> Evolve',
      ctaLabel: 'Pedir avaliacao',
      ctaHref: '/contact',
      image: heroImage,
    },
    {
      blockType: 'deliverables',
      sectionId: 'outcomes',
      title: 'Assess -> Stabilize -> Evolve',
      intro: 'O foco e reduzir falhas, criar previsibilidade e dar visibilidade real.',
      items: [
        { title: 'Clareza', text: 'Sabe o que esta em risco e o que vem a seguir.' },
        { title: 'Estabilidade', text: 'Menos incidentes e menos urgencias.' },
        { title: 'Evolucao', text: 'Backlog ativo com melhorias reais.' },
      ],
    },
    {
      blockType: 'testimonials',
      sectionId: 'testimonials',
      title: 'Clientes satisfeitos',
      intro: 'Resultados reais sem promessas vazias.',
      items: [
        {
          quote:
            'Passamos de apagoes frequentes para uma operacao previsivel. Hoje sabemos o que esta em risco e o que vem a seguir.',
          name: 'Ana Moreira',
          role: 'Operations Manager',
          company: 'RetailNova - Logistica (30 utilizadores)',
        },
        {
          quote:
            'Reduzimos incidentes e a equipa ganhou tempo. A comunicacao e direta e com contexto.',
          name: 'Miguel Santos',
          role: 'Managing Director',
          company: 'LusoHealth - Saude (55 utilizadores)',
        },
        {
          quote:
            'O onboarding foi objetivo e rapido. Em semanas tivemos processos claros e um plano realista.',
          name: 'Rita Marques',
          role: 'Office Manager',
          company: 'UrbanFlow - Servicos (25 utilizadores)',
        },
      ],
    },
    {
      blockType: 'faq',
      sectionId: 'faq',
      title: 'Perguntas frequentes',
      items: [
        {
          question: 'Trabalham so com PMEs?',
          answer: 'Nao. Somos especialistas em PMEs, mas tambem apoiamos equipas maiores quando faz sentido.',
        },
        {
          question: 'Fazem suporte remoto e on-site?',
          answer: 'Sim. Resolvemos remotamente e fazemos visitas planeadas quando necessario.',
        },
        {
          question: 'Tem SLAs? Como funcionam?',
          answer: 'Sim. Definimos tempos de resposta e escalamento por plano.',
        },
        {
          question: 'Podem trabalhar com o fornecedor ou IT interno?',
          answer: 'Sim. Podemos complementar equipas internas ou assumir a operacao.',
        },
        {
          question: 'O que acontece no onboarding?',
          answer: 'Diagnostico, prioridades e um plano 30-60-90 dias com quick wins.',
        },
        {
          question: 'Como lidam com seguranca sem bloquear a equipa?',
          answer: 'Aplicamos controlos essenciais e praticos, com impacto real e minimo atrito.',
        },
      ],
    },
    {
      blockType: 'finalCTA',
      sectionId: 'cta',
      title: 'Pronto para uma TI estavel - e humana?',
      content:
        'Se quer reduzir falhas, ganhar previsibilidade e melhorar seguranca sem complicar, comecamos por um diagnostico rapido.',
      primaryCTA: { label: 'Pedir avaliacao', link: '/contact' },
      secondaryCTA: { label: 'Enviar mensagem', link: '/contact#form' },
    },
  ];

  const layoutEn = [
    {
      blockType: 'hero',
      enabled: true,
      anchorId: 'top',
      variant: 'C',
      theme: 'brandGradient',
      eyebrow: 'Services',
      h1Title: 'IT services for SMEs that need stability and security',
      heading: 'IT services for SMEs that need stability and security',
      subheadline:
        '20+ years supporting SMEs in Portugal. We bring enterprise-grade security and systems integration with a human, close relationship.',
      subheading:
        '20+ years supporting SMEs in Portugal. We bring enterprise-grade security and systems integration with a human, close relationship.',
      trustLine: 'Portugal and remote EU | Fast response',
      primaryCTA: { label: 'Request an assessment', link: '/contact', trackingId: 'services-hero-primary' },
      secondaryCTA: { label: 'Talk to a human', link: '/contact' },
      heroImage,
      image: heroImage,
      mediaType: 'illustration',
      featureList: [
        { text: 'SLA-based response and escalation (by plan)' },
        { text: 'Preventive maintenance and continuous monitoring' },
        { text: 'Pragmatic security: reduce risk without slowing the business' },
      ],
      badges: [
        { label: '25+ years' },
        { label: 'Portugal-based' },
        { label: 'Remote + On-site' },
        { label: 'Compromisso Pagamento Pontual' },
      ],
    },
    {
      blockType: 'deliverables',
      sectionId: 'expectations',
      title: 'What to expect (in practice)',
      intro: 'Adjusted to the size and criticality of your operation.',
      items: [
        { title: 'Initial response', text: 'Within X hours (SLA by plan).' },
        { title: '30-60-90 day plan', text: 'Stabilize and build the base.' },
        { title: 'Reports', text: 'Monthly/quarterly with actions and priorities.' },
      ],
    },
    {
      blockType: 'servicesGrid',
      enabled: true,
      anchorId: 'services',
      title: 'What we do',
      sectionTitle: 'What we do',
      sectionIntro: 'Complete services for stable, secure, and clear operations.',
      services: [
        {
          title: 'Managed IT',
          description: 'Stable day-to-day operations with prevention and fast response.',
          icon: 'IT',
          link: '/services/managed-it',
          ctaLabel: 'Learn more',
          ctaHref: '/services/managed-it',
          tag: 'Most common',
          bulletPoints: [
            { text: 'User support + endpoint management' },
            { text: 'Monitoring, backups, controlled updates' },
            { text: 'Inventory, documentation, continuous improvement' },
          ],
        },
        {
          title: 'Pragmatic security',
          description: 'Real measures that reduce risk without friction.',
          icon: 'SEC',
          link: '/services/cybersecurity',
          ctaLabel: 'Learn more',
          ctaHref: '/services/cybersecurity',
          bulletPoints: [
            { text: 'Hardening, MFA, policies, incident response' },
            { text: 'Email security, EDR/AV, practical awareness' },
            { text: 'Fast audits and mitigation plan' },
          ],
        },
        {
          title: 'Infrastructure and Cloud',
          description: 'Networks, servers, and cloud that are designed and maintained well.',
          icon: 'CLOUD',
          link: '/services/infrastructure-cloud',
          ctaLabel: 'Learn more',
          ctaHref: '/services/infrastructure-cloud',
          bulletPoints: [
            { text: 'Microsoft 365 / Google Workspace / identity' },
            { text: 'Wi-Fi, firewalls, VPN, segmentation' },
            { text: 'Virtualization, storage, DR, performance' },
          ],
        },
        {
          title: 'Consulting and Projects',
          description: 'Projects with clear scope, timeline, and handover.',
          icon: 'CONSULT',
          link: '/services/consulting',
          ctaLabel: 'Learn more',
          ctaHref: '/services/consulting',
          bulletPoints: [
            { text: 'Migrations, upgrades, compliance' },
            { text: 'Planning, budget, and execution' },
            { text: 'Delivery with documentation and handover' },
          ],
        },
      ],
      ctaLabel: 'View all services',
      ctaHref: '/services',
    },
    {
      blockType: 'twoColumnList',
      sectionId: 'sme',
      title: 'SME specialists with enterprise discipline',
      intro:
        'SMEs do not need more tools. They need IT that works every day, stays secure, and does not consume management time.',
      leftTitle: 'What we apply',
      leftItems: [
        { text: 'Risk and impact prioritization (not hype)' },
        { text: 'Simple communication: what is wrong, what to do, what it costs' },
        { text: 'Documentation and continuity: nothing stays in one persons head' },
      ],
      rightTitle: 'Baseline package',
      rightItems: [
        { text: 'Initial diagnostic + inventory' },
        { text: '30-60-90 day plan' },
        { text: 'Quarterly roadmap (with quick wins)' },
      ],
    },
    {
      blockType: 'valueCards',
      sectionId: 'values',
      title: 'What sets us apart',
      intro: 'Senior technical team with a human commitment.',
      cards: [
        {
          title: 'Stability before innovation',
          text: 'Promise: remove fragility first. Practice: stabilization and continuous monitoring.',
        },
        {
          title: 'Pragmatic security',
          text: 'Promise: protect the essentials. Practice: MFA, hardening, tested backups, fast response.',
        },
        {
          title: 'Integration and clarity',
          text: 'Promise: consistency without "magic". Practice: documentation, standards, and handover.',
        },
        {
          title: 'Human relationship',
          text: 'Promise: clear communication and ownership. Practice: direct contact and real follow-up.',
        },
      ],
    },
    {
      blockType: 'process',
      enabled: true,
      anchorId: 'process',
      title: 'Our process',
      sectionTitle: 'Our process',
      steps: [
        {
          stepNumber: 1,
          title: 'Diagnosis',
          content: 'Inventory, risks, and critical points.',
          deliverables: [{ text: 'Short report + Top 10 priorities' }],
        },
        {
          stepNumber: 2,
          title: 'Action plan',
          content: '30-60-90 days with phased budget.',
          deliverables: [{ text: 'Roadmap + quick wins' }],
        },
        {
          stepNumber: 3,
          title: 'Implementation',
          content: 'Controlled changes with rollback and documentation.',
          deliverables: [{ text: 'Documentation + handover' }],
        },
        {
          stepNumber: 4,
          title: 'Operations',
          content: 'Monitoring, support, and continuous review.',
          deliverables: [{ text: 'Periodic report + improvement backlog' }],
        },
      ],
      note: 'Assess -> Stabilize -> Evolve',
      ctaLabel: 'Request an assessment',
      ctaHref: '/contact',
      image: heroImage,
    },
    {
      blockType: 'deliverables',
      sectionId: 'outcomes',
      title: 'Assess -> Stabilize -> Evolve',
      intro: 'The goal is fewer incidents, more predictability, and clear visibility.',
      items: [
        { title: 'Clarity', text: 'Know what is at risk and what comes next.' },
        { title: 'Stability', text: 'Fewer incidents and fewer emergencies.' },
        { title: 'Progress', text: 'Active backlog with real improvements.' },
      ],
    },
    {
      blockType: 'testimonials',
      sectionId: 'testimonials',
      title: 'Client feedback',
      intro: 'Real outcomes without hype.',
      items: [
        {
          quote:
            'We went from frequent outages to a predictable operation. We now know what is at risk and what comes next.',
          name: 'Ana Moreira',
          role: 'Operations Manager',
          company: 'RetailNova - Logistics (30 users)',
        },
        {
          quote:
            'Incidents dropped and the team gained time. Communication is direct and with context.',
          name: 'Miguel Santos',
          role: 'Managing Director',
          company: 'LusoHealth - Healthcare (55 users)',
        },
        {
          quote:
            'Onboarding was fast and objective. Within weeks we had clear processes and a realistic plan.',
          name: 'Rita Marques',
          role: 'Office Manager',
          company: 'UrbanFlow - Services (25 users)',
        },
      ],
    },
    {
      blockType: 'faq',
      sectionId: 'faq',
      title: 'Frequently asked questions',
      items: [
        {
          question: 'Do you only work with SMEs?',
          answer: 'No. We specialize in SMEs but also support larger teams when needed.',
        },
        {
          question: 'Do you provide remote and on-site support?',
          answer: 'Yes. We solve remotely and schedule visits when necessary.',
        },
        {
          question: 'Do you have SLAs? How do they work?',
          answer: 'Yes. Response and escalation times are defined by plan.',
        },
        {
          question: 'Can you work with our internal IT or existing provider?',
          answer: 'Yes. We can complement internal teams or take over operations.',
        },
        {
          question: 'What happens during onboarding?',
          answer: 'Diagnostic, priorities, and a 30-60-90 day plan with quick wins.',
        },
        {
          question: 'How do you handle security without blocking the team?',
          answer: 'We apply essential controls with real impact and minimal friction.',
        },
      ],
    },
    {
      blockType: 'finalCTA',
      sectionId: 'cta',
      title: 'Ready for stable, human IT?',
      content:
        'If you want fewer failures, more predictability, and better security without complexity, we start with a fast diagnostic.',
      primaryCTA: { label: 'Request an assessment', link: '/contact' },
      secondaryCTA: { label: 'Send a message', link: '/contact#form' },
    },
  ];

  const seoPt = {
    title: 'Servicos de TI para PMEs | Loading Happiness',
    description:
      'Servicos de TI para PMEs com mais de 20 anos de experiencia. Seguranca, integracao e relacao humana.',
    image: heroImage,
  };

  const seoEn = {
    title: 'IT Services for SMEs | Loading Happiness',
    description:
      'IT services for SMEs with 20+ years of experience. Security, integration, and human-first support.',
    image: heroImage,
  };

  const applyIds = (source: any, target: any) => {
    if (!source || !target) return target;
    const copy = { ...target, id: source.id };
    return copy;
  };

  const applyLayoutIds = (sourceLayout: any[], targetLayout: any[]) =>
    targetLayout.map((block, index) => {
      const sourceBlock = sourceLayout?.[index];
      const mergedBlock = applyIds(sourceBlock, block);

      if (block.badges?.length) {
        mergedBlock.badges = block.badges.map((badge: any, badgeIndex: number) =>
          applyIds(sourceBlock?.badges?.[badgeIndex], badge)
        );
      }

      if (block.services?.length) {
        mergedBlock.services = block.services.map((service: any, serviceIndex: number) => {
          const sourceService = sourceBlock?.services?.[serviceIndex];
          const mergedService = applyIds(sourceService, service);
          if (service.bulletPoints?.length) {
            mergedService.bulletPoints = service.bulletPoints.map((point: any, pointIndex: number) =>
              applyIds(sourceService?.bulletPoints?.[pointIndex], point)
            );
          }
          return mergedService;
        });
      }

      if (block.items?.length) {
        mergedBlock.items = block.items.map((item: any, itemIndex: number) =>
          applyIds(sourceBlock?.items?.[itemIndex], item)
        );
      }

      if (block.cards?.length) {
        mergedBlock.cards = block.cards.map((card: any, cardIndex: number) =>
          applyIds(sourceBlock?.cards?.[cardIndex], card)
        );
      }

      if (block.steps?.length) {
        mergedBlock.steps = block.steps.map((step: any, stepIndex: number) => {
          const sourceStep = sourceBlock?.steps?.[stepIndex];
          const mergedStep = applyIds(sourceStep, step);
          if (step.deliverables?.length) {
            mergedStep.deliverables = step.deliverables.map((deliverable: any, deliverableIndex: number) =>
              applyIds(sourceStep?.deliverables?.[deliverableIndex], deliverable)
            );
          }
          return mergedStep;
        });
      }

      if (block.leftItems?.length) {
        mergedBlock.leftItems = block.leftItems.map((item: any, itemIndex: number) =>
          applyIds(sourceBlock?.leftItems?.[itemIndex], item)
        );
      }

      if (block.rightItems?.length) {
        mergedBlock.rightItems = block.rightItems.map((item: any, itemIndex: number) =>
          applyIds(sourceBlock?.rightItems?.[itemIndex], item)
        );
      }

      if (block.contactOptions?.length) {
        mergedBlock.contactOptions = block.contactOptions.map((option: any, optionIndex: number) =>
          applyIds(sourceBlock?.contactOptions?.[optionIndex], option)
        );
      }

      if (block.items?.length && block.blockType === 'faq') {
        mergedBlock.items = block.items.map((item: any, itemIndex: number) =>
          applyIds(sourceBlock?.items?.[itemIndex], item)
        );
      }

      return mergedBlock;
    });

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'services' } },
    limit: 1,
    locale: 'pt',
  });

  let pageId = existing.docs?.[0]?.id;
  if (pageId) {
    await payload.update({
      collection: 'pages',
      id: pageId,
      locale: 'pt',
      data: {
        title: 'Servicos',
        slug: 'services',
        status: 'published',
        layout: layoutPt,
        seo: seoPt,
      },
    });
  } else {
    const created = await payload.create({
      collection: 'pages',
      locale: 'pt',
      data: {
        title: 'Servicos',
        slug: 'services',
        status: 'published',
        layout: layoutPt,
        seo: seoPt,
      },
    });
    pageId = created.id;
  }

  const storedPt = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'services' } },
    limit: 1,
    locale: 'pt',
  });

  const storedLayout = storedPt.docs?.[0]?.layout || [];
  const layoutEnWithIds = applyLayoutIds(storedLayout, layoutEn);

  await payload.update({
    collection: 'pages',
    id: pageId,
    locale: 'en',
    data: {
      title: 'Services',
      slug: 'services',
      status: 'published',
      layout: layoutEnWithIds,
      seo: seoEn,
    },
  });

  // eslint-disable-next-line no-console
  console.log('Services page seeded (PT and EN).');
  process.exit(0);
};

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
