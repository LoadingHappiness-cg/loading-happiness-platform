import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const ensureMedia = async (payload: any, alt: string, filePath: string) => {
    const existing = await payload.find({
        collection: 'media',
        where: { alt: { equals: alt } },
        limit: 1,
    });
    if (existing.docs?.[0]) {
        return existing.docs[0].id;
    }

    const fileData = await fs.readFile(filePath);
    const fileName = path.basename(filePath);

    const created = await payload.create({
        collection: 'media',
        data: { alt },
        file: {
            data: fileData,
            name: fileName,
            mimetype: 'image/png',
            size: fileData.length,
        },
    });

    return created.id;
};

const upsertPage = async (
    payload: any,
    slug: string,
    dataEn: any,
    dataPt: any
) => {
    const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: slug } },
        limit: 1,
        locale: 'en',
    });

    let pageId = existing.docs?.[0]?.id;

    // Set common non-localized fields
    const baseData = {
        slug,
        status: dataEn.status || 'published',
    };

    if (pageId) {
        console.log(`🔄 Updating existing page: ${slug}`);
    } else {
        console.log(`✨ Creating new page: ${slug}`);
        const created = await payload.create({
            collection: 'pages',
            data: baseData,
        });
        pageId = created.id;
    }

    // Update English version
    await payload.update({
        collection: 'pages',
        id: pageId,
        locale: 'en',
        data: dataEn,
    });

    // Update Portuguese version
    await payload.update({
        collection: 'pages',
        id: pageId,
        locale: 'pt',
        data: dataPt,
    });
};

const main = async () => {
    await loadEnvFile();
    if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
        throw new Error('DATABASE_URI and PAYLOAD_SECRET must be set before seeding.');
    }

    const config = (await import('../payload.config.ts')).default;
    const payload = await getPayload({ config });

    // 1. Upload Images
    const brainDir = '/Users/carlosgavela/.gemini/antigravity/brain/26986eea-ccb3-4f26-bc59-ee84a0bb4f8e';
    const heroImageId = await ensureMedia(payload, 'About Hero - Technology with a human heart', path.join(brainDir, 'about_hero_tech_human_heart_1767458537105.png'));
    const storyImageId = await ensureMedia(payload, 'About Story - Sintra Tech', path.join(brainDir, 'about_story_sintra_tech_1767458550738.png'));
    const philosophyImageId = await ensureMedia(payload, 'About Philosophy - Holistic Tech', path.join(brainDir, 'about_philosophy_holistic_tech_1767458565394.png'));
    const impactImageId = await ensureMedia(payload, 'About Impact - Community Force', path.join(brainDir, 'about_social_impact_community_1767458580526.png'));

    // 2. Prepare Page Content
    const aboutLayoutEn = [
        {
            blockType: 'hero',
            enabled: true,
            anchorId: 'top',
            variant: 'D',
            theme: 'brandGradient',
            eyebrow: 'ESTABLISHED 2016',
            h1Title: 'Technology with a human heart. Built for real businesses.',
            heading: 'Technology with a human heart. Built for real businesses.',
            subheadline: 'We help organizations run smoother, safer, and smarter — with IT that feels clear, dependable, and genuinely supportive. No jargon, just results.',
            subheading: 'We help organizations run smoother, safer, and smarter — with IT that feels clear, dependable, and genuinely supportive. No jargon, just results.',
            trustLine: 'Trusted partner for SMEs looking for enterprise-grade maturity.',
            primaryCTA: { label: 'Talk to us →', link: '/contact' },
            secondaryCTA: { label: 'Our Services →', link: '/services' },
            heroImage: heroImageId,
            quote: 'We don’t sell complexity. We build confidence.',
            factsTitle: 'What you get',
            quickFacts: [
                { label: 'Response time', value: '< 15 minutes' },
                { label: 'Operations', value: 'Proactive monitoring' },
                { label: 'Alignment', value: 'Long-term partnership' },
            ],
            factDisclaimer: '*Response times and roadmap details are subject to service level agreements.',
        },
        {
            blockType: 'keyFacts',
            anchorId: 'at-a-glance',
            title: 'Loading Happiness at a glance',
            facts: [
                { label: 'Location', value: 'Sintra, Portugal (Global reach)' },
                { label: 'Core Services', value: 'Managed IT, Security & Strategy' },
                { label: 'Ideal Client', value: 'SMEs (10-100 staff)' },
                { label: 'Methodology', value: 'Assess → Stabilize → Evolve' },
                { label: 'Differentiator', value: 'Senior Technical Proximity' },
                { label: 'Contact', value: 'team@loadinghappiness.com' },
            ],
        },
        {
            blockType: 'splitContent',
            anchorId: 'our-story',
            sectionTitle: 'Our Story',
            title: 'From Sintra, with a practical mission',
            bodyRichText: 'Loading Happiness was founded in October 2016 with a clear idea: give Portuguese small and mid-sized businesses the same quality of IT guidance and service usually reserved for big organizations.\n\nWe grew steadily by doing the basics exceptionally well: listening carefully, designing solutions that fit the real context, and staying close after delivery.',
            image: storyImageId,
            layout: 'imageRight',
        },
        {
            blockType: 'logoCloud',
            anchorId: 'clients',
            title: 'Trusted by organizations that value stability',
            text: 'We work with leaders in logistics, architecture, finance, and professional services who require 99.9% availability and absolute data integrity.',
            logos: [], // Client logos would go here
        },
        {
            blockType: 'testimonials',
            anchorId: 'testimonials',
            title: 'What our partners say',
            items: [
                {
                    quote: 'They don’t just fix things; they explain why they happened and how to prevent them. IT finally feels like a partner, not a cost.',
                    name: 'Operations Director',
                    role: 'Logistics Sector',
                },
                {
                    quote: 'Switching to Loading Happiness gave us the security baseline we needed. Professional, discrete, and highly competent.',
                    name: 'Founder',
                    role: 'Architecture Studio',
                },
            ],
        },
        {
            blockType: 'teamIntro',
            anchorId: 'team',
            title: 'The Core Team',
            text: 'We are senior, hands-on, and close to the ground. That’s how we stay fast, honest, and accountable.',
            cards: [
                {
                    title: 'Carlos Gavela',
                    role: 'Founder & Technical Lead',
                    text: '25+ years of experience in systems architecture and IT operations. Focused on bringing enterprise-grade stability to SMEs.',
                    image: storyImageId, // Use portrait if available
                    socialLink: 'https://linkedin.com/in/carlosgavela',
                    tags: [{ text: 'Infrastructure' }, { text: 'Security' }, { text: 'Strategy' }],
                },
                {
                    title: 'Lumina',
                    role: 'AI & Knowledge Partner',
                    text: 'Our proactive AI agent, handling advanced logic, technical documentation, and real-time monitoring support.',
                    image: heroImageId, // Use AI visualization
                    tags: [{ text: 'Automation' }, { text: 'Analytics' }, { text: '24/7 Support' }],
                },
            ],
        },
        {
            blockType: 'featureGrid',
            anchorId: 'partners',
            title: 'Trusted Partners',
            columns: 2,
            items: [
                { title: 'Accounting & Tax', content: 'AM & Associados — Ensuring financial transparency and compliance audit readiness.', icon: '📊' },
                { title: 'Legal & Compliance', content: 'MGAM Legal — Expert counsel on GDPR, digital contracts, and corporate law.', icon: '⚖️' },
            ],
        },
        {
            blockType: 'faq',
            anchorId: 'faq',
            title: 'Common questions',
            items: [
                { question: 'What is your typical response time?', answer: 'For critical issues, we respond in under 15 minutes. Our proactive systems often resolve problems before you notice them.' },
                { question: 'Do you work with international clients?', answer: 'Yes. While based in Portugal, we support organizations with teams across the EU and North America.' },
                { question: 'Is cybersecurity included?', answer: 'A robust security baseline is included in all our managed services plans. We don’t consider safety an "add-on".' },
                { question: 'How do you handle GDPR?', answer: 'We are advocates for Privacy by Design. All our internal and client systems are audited for GDPR compliance.' },
                { question: 'What software do you specialize in?', answer: 'We are experts in Microsoft 365, Azure, AWS, and modern business productivity tools like Odoo.' },
                { question: 'Do you offer 24/7 support?', answer: 'Yes, we provide round-the-clock monitoring and emergency support for mission-critical infrastructure.' },
            ],
        },
        {
            blockType: 'finalCTA',
            anchorId: 'cta',
            title: 'Ready to upgrade your IT experience?',
            content: 'No pressure, no jargon. Just a clear conversation about your goals.',
            primaryCTA: { label: 'Talk to us →', link: '/contact' },
            secondaryCTA: { label: 'View Impact →', link: '/impact' },
        },
    ];

    const aboutLayoutPt = [
        {
            blockType: 'hero',
            enabled: true,
            anchorId: 'top',
            variant: 'D',
            theme: 'brandGradient',
            eyebrow: 'DESDE 2016',
            h1Title: 'Tecnologia com coração humano. Construída para negócios reais.',
            heading: 'Tecnologia com coração humano. Construída para negócios reais.',
            subheadline: 'Ajudamos as organizações a funcionar melhor — com um IT claro, fiável e genuinamente prestável. Sem jargão, apenas resultados.',
            subheading: 'Ajudamos as organizações a funcionar melhor — com um IT claro, fiável e genuinamente prestável. Sem jargão, apenas resultados.',
            trustLine: 'Parceiro de confiança para PMEs que procuram maturidade empresarial.',
            primaryCTA: { label: 'Fale connosco →', link: '/contact' },
            secondaryCTA: { label: 'Serviços →', link: '/services' },
            heroImage: heroImageId,
            quote: 'Não vendemos complexidade. Construímos confiança.',
            factsTitle: 'O que recebe',
            quickFacts: [
                { label: 'Tempo de Resposta', value: '< 15 minutos' },
                { label: 'Operações', value: 'Monitorização Proativa' },
                { label: 'Alinhamento', value: 'Parceria a Longo Prazo' },
            ],
            factDisclaimer: '*Tempos de resposta sujeitos a acordos de nível de serviço (SLA).',
        },
        {
            blockType: 'keyFacts',
            anchorId: 'key-facts',
            title: 'Loading Happiness em resumo',
            facts: [
                { label: 'Localização', value: 'Sintra, Portugal (Alcance Global)' },
                { label: 'Serviços Core', value: 'TI Gerido, Segurança e Estratégia' },
                { label: 'Cliente Ideal', value: 'PMEs (10-100 staff)' },
                { label: 'Metodologia', value: 'Assess → Stabilize → Evolve' },
                { label: 'Diferencial', value: 'Proximidade Técnica Sénior' },
                { label: 'Contacto', value: 'team@loadinghappiness.com' },
            ],
        },
        {
            blockType: 'splitContent',
            anchorId: 'our-story',
            sectionTitle: 'A Nossa História',
            title: 'De Sintra, com uma missão prática',
            bodyRichText: 'A Loading Happiness nasceu em outubro de 2016 com uma ideia clara: dar às PMEs portuguesas a mesma qualidade de orientação técnica normalmente reservada a grandes organizações.\n\nCrescemos fazendo o básico excecionalmente bem: ouvindo, desenhando soluções reais e mantendo-nos próximos.',
            image: storyImageId,
            layout: 'imageRight',
        },
        {
            blockType: 'logoCloud',
            anchorId: 'clients',
            title: 'Confiado por organizações que valorizam a estabilidade',
            text: 'Trabalhamos com líderes em logística, arquitetura e serviços profissionais que exigem 99.9% de disponibilidade.',
            logos: [],
        },
        {
            blockType: 'testimonials',
            anchorId: 'testimonials',
            title: 'O que dizem os nossos parceiros',
            items: [
                {
                    quote: 'Não resolvem apenas as coisas, explicam porquê. O IT finalmente parece um parceiro e não um custo.',
                    name: 'Diretor de Operações',
                    role: 'Setor de Logística',
                },
                {
                    quote: 'Mudar para a Loading Happiness deu-nos a base de segurança que precisávamos. Profissionais e discretos.',
                    name: 'Fundador',
                    role: 'Ateliê de Arquitetura',
                },
            ],
        },
        {
            blockType: 'teamIntro',
            anchorId: 'team',
            title: 'Equipa Principal',
            text: 'Somos seniores, práticos e próximos do terreno. É assim que nos mantemos ágeis e responsáveis.',
            cards: [
                {
                    title: 'Carlos Gavela',
                    role: 'Fundador & Diretor Técnico',
                    text: 'Mais de 25 anos de experiência em arquitetura de sistemas. Focado em trazer estabilidade corporativa às PMEs.',
                    image: storyImageId,
                    socialLink: 'https://linkedin.com/in/carlosgavela',
                    tags: [{ text: 'Infraestrutura' }, { text: 'Segurança' }, { text: 'Estratégia' }],
                },
                {
                    title: 'Lumina',
                    role: 'Parceira de IA e Conhecimento',
                    text: 'A nossa agente de IA, gerindo lógica avançada, documentação e suporte em tempo real.',
                    image: heroImageId,
                    tags: [{ text: 'Automação' }, { text: 'Analítica' }, { text: 'Suporte 24/7' }],
                },
            ],
        },
        {
            blockType: 'featureGrid',
            anchorId: 'partners',
            title: 'Parceiros de Confiança',
            columns: 2,
            items: [
                { title: 'Contabilidade e Fiscalidade', content: 'AM & Associados — Garantindo transparência financeira e conformidade.', icon: '📊' },
                { title: 'Jurídico e Compliance', content: 'MGAM Legal — Especialistas em RGPD, contratos digitais e direito comercial.', icon: '⚖️' },
            ],
        },
        {
            blockType: 'faq',
            anchorId: 'faq',
            title: 'Perguntas frequentes',
            items: [
                { question: 'Qual o vosso tempo de resposta?', answer: 'Para questões críticas, respondemos em menos de 15 minutos. Os nossos sistemas resolvem frequentemente problemas antes que os note.' },
                { question: 'Trabalham com clientes internacionais?', answer: 'Sim. Sediados em Portugal, apoiamos equipas em toda a UE e América do Norte.' },
                { question: 'A cibersegurança está incluída?', answer: 'Uma base de segurança robusta está incluída em todos os nossos planos. Não consideramos a segurança um "extra".' },
                { question: 'Como lidam com o RGPD?', answer: 'Somos advogados do "Privacy by Design". Todos os nossos sistemas são auditados para conformidade.' },
                { question: 'Em que software se especializam?', answer: 'Somos especialistas em Microsoft 365, Azure, AWS e ferramentas de produtividade como o Odoo.' },
                { question: 'Oferecem suporte 24/7?', answer: 'Sim, fornecemos monitorização 24 horas por dia e suporte de emergência para infraestruturas críticas.' },
            ],
        },
        {
            blockType: 'finalCTA',
            anchorId: 'cta',
            title: 'Pronto para elevar o seu IT?',
            content: 'Sem pressão, sem jargão. Apenas uma conversa clara sobre os seus objetivos.',
            primaryCTA: { label: 'Fale connosco →', link: '/contact' },
            secondaryCTA: { label: 'Ver Impacto →', link: '/impact' },
        },
    ];

    await upsertPage(payload, 'about', {
        title: 'About',
        status: 'published',
        layout: aboutLayoutEn,
        seo: {
            title: 'About Loading Happiness | Human-Centered IT',
            description: 'Meet Loading Happiness. 25+ years of reliable IT support, cybersecurity, and managed services for SMEs in Portugal and the EU.',
            schemaOrg: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "name": "About Loading Happiness",
                "description": "Premium IT partner for SMEs specializing in managed services, cybersecurity, and strategic growth.",
                "mainEntity": {
                    "@type": "Organization",
                    "name": "Loading Happiness",
                    "url": "https://loadinghappiness.com",
                    "founder": {
                        "@type": "Person",
                        "name": "Carlos Gavela"
                    },
                    "foundingDate": "2016",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Sintra",
                        "addressCountry": "PT"
                    }
                }
            }, null, 2)
        }
    }, {
        title: 'Sobre a Loading Happiness',
        status: 'published',
        layout: aboutLayoutPt,
        seo: {
            title: 'Sobre a Loading Happiness | TI com Coração Humano',
            description: 'Conheça a Loading Happiness. Mais de 25 anos de suporte de TI fiável, cibersegurança e serviços geridos para PMEs em Portugal.',
            schemaOrg: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "name": "Sobre a Loading Happiness",
                "description": "Parceiro de TI premium para PMEs, especializado em serviços geridos, cibersegurança e crescimento estratégico.",
                "mainEntity": {
                    "@type": "Organization",
                    "name": "Loading Happiness",
                    "url": "https://loadinghappiness.com",
                    "founder": {
                        "@type": "Person",
                        "name": "Carlos Gavela"
                    },
                    "foundingDate": "2016",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Sintra",
                        "addressCountry": "PT"
                    }
                }
            }, null, 2)
        }
    });

    // 3. Update Site Settings (Menus)
    const headerLinksEn = [
        { label: 'Services', href: '/services', type: 'link' as const }, // Keep it simple or use dropdown
        { label: 'News', href: '/news', type: 'link' as const },
        { label: 'Impact', href: '/impact', type: 'link' as const },
        {
            label: 'About',
            href: '/about',
            type: 'dropdown' as const,
            items: [
                { label: 'Our story', href: '/about#our-story', description: 'From Sintra, with a practical mission.' },
                { label: 'Why Loading Happiness', href: '/about#why-name', description: 'A name that became a promise.' },
                { label: 'Our philosophy', href: '/about#philosophy', description: 'Human, clear, and responsible.' },
                { label: 'Values', href: '/about#values', description: 'What we believe in.' },
                { label: 'What to expect', href: '/about#different', description: 'Safety is the baseline.' },
                { label: 'Our team', href: '/about#team', description: 'Senior, hands-on, close to the ground.' },
            ],
        },
        { label: 'Contact', href: '/contact', type: 'link' as const },
    ];

    const headerLinksPt = [
        { label: 'Serviços', href: '/services', type: 'link' as const },
        { label: 'Notícias', href: '/news', type: 'link' as const },
        { label: 'Impacto', href: '/impact', type: 'link' as const },
        {
            label: 'Sobre',
            href: '/about',
            type: 'dropdown' as const,
            items: [
                { label: 'A nossa história', href: '/about#our-story', description: 'De Sintra, com uma missão prática.' },
                { label: 'Porquê "Loading Happiness"', href: '/about#why-name', description: 'Um nome que se tornou uma promessa.' },
                { label: 'A nossa filosofia', href: '/about#philosophy', description: 'Humana, clara e responsável.' },
                { label: 'Valores', href: '/about#values', description: 'No que acreditamos.' },
                { label: 'O que esperar', href: '/about#different', description: 'A segurança é a base.' },
                { label: 'A nossa equipa', href: '/about#team', description: 'Sénior, prática e próxima do terreno.' },
            ],
        },
        { label: 'Contacto', href: '/contact', type: 'link' as const },
    ];

    await payload.updateGlobal({
        slug: 'site-settings',
        locale: 'en',
        data: {
            header: {
                links: headerLinksEn,
            }
        }
    });

    await payload.updateGlobal({
        slug: 'site-settings',
        locale: 'pt',
        data: {
            header: {
                links: headerLinksPt,
            }
        }
    });

    console.log('✅ About page and Site Menu updated successfully!');
    process.exit(0);
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
