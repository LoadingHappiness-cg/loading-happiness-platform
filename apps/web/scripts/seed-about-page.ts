import { getPayload } from 'payload';
import config from '../payload.config';

const seedAboutPage = async () => {
    const payload = await getPayload({ config });

    console.log('🌱 Seeding About Page...');

    // 1. Find or create the About page
    const aboutPage = await payload.find({
        collection: 'pages',
        where: {
            slug: {
                equals: 'about',
            },
        },
    });

    const finalCtaPt = {
        blockType: 'finalCTA',
        enabled: true,
        title: 'Ainda tem dúvidas?',
        content: 'Partilha o contexto e as prioridades, e alinhamos um caminho realista.',
        subtitle: 'SLAs definidos de forma transparente por contrato (plano e horário).',
        primaryCTA: {
            label: 'Ainda tem dúvidas? →',
            link: '/contact',
        },
        supportingLinks: [
            { label: 'Modelos de serviço', href: '/services' },
            { label: 'Impact', href: '/impact' },
        ],
        secondaryCTA: {
            label: 'Ver serviços',
            link: '/services',
        },
        microcopy: 'SLAs são definidos de forma transparente por contrato (plano e horário).',
    };

    const finalCtaEn = {
        blockType: 'finalCTA',
        enabled: true,
        title: 'Still have questions?',
        content: 'Share your context and priorities, and we will outline a realistic path.',
        subtitle: 'Transparent SLAs defined by plan and business hours.',
        primaryCTA: {
            label: 'Still have questions? →',
            link: '/contact',
        },
        supportingLinks: [
            { label: 'Service models', href: '/services' },
            { label: 'Impact', href: '/impact' },
        ],
        secondaryCTA: {
            label: 'View services',
            link: '/services',
        },
        microcopy: 'SLAs are defined transparently by contract (plan & business hours).',
    };

    const aboutContentPt: any = {
        title: 'Sobre a Loading Happiness',
        slug: 'about',
        status: 'published' as const,
        seo: {
            title: 'Sobre a Loading Happiness | TI com coração humano em Portugal',
            description: 'Conhece a Loading Happiness: equipa, valores, forma de trabalhar e compromisso com segurança e responsabilidade social. Serviços de TI em Portugal.',
            canonicalUrl: 'https://loadinghappiness.pt/about',
            indexable: true,
            openGraph: {
                ogTitle: 'Sobre a Loading Happiness',
                ogDescription: 'Tecnologia com propósito humano em Portugal.',
            },
            schemaOrg: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "mainEntity": {
                    "@type": "Organization",
                    "name": "Loading Happiness",
                    "url": "https://loadinghappiness.pt"
                }
            }),
        },
        layout: [
            {
                blockType: 'hero',
                enabled: true,
                anchorId: 'top',
                h1Title: 'Sobre a Loading Happiness',
                heading: 'Sobre a Loading Happiness',
                subheadline: 'Somos uma empresa de TI focada em continuidade, segurança e suporte que resolve — com comunicação clara e respeito pelo teu contexto.',
                subheading: 'Somos uma empresa de TI focada em continuidade, segurança e suporte que resolve — com comunicação clara e respeito pelo teu contexto.',
                primaryCTA: {
                    label: 'Falar connosco →',
                    link: '/contact',
                },
                secondaryCTA: {
                    label: 'Ver serviços',
                    link: '/services',
                },
                quickFacts: [
                    { label: 'Base', value: 'Portugal' },
                    { label: 'Foco', value: 'TI gerida + cibersegurança' },
                    { label: 'Abordagem', value: 'Pragmática, documentada, humana' },
                ],
                variant: 'A',
                theme: 'light',
            },
            {
                blockType: 'mission-vision-values',
                enabled: true,
                sectionTitle: 'Missão, visão e valores',
                mission: 'Garantir que a tecnologia das empresas funciona, é segura e serve pessoas — sem ruído, sem dramatismo.',
                vision: 'Ser uma referência local em TI responsável: competente, próxima e útil.',
                values: [
                    {
                        title: 'Rigor',
                        description: 'Fazemos bem feito e deixamos documentação.',
                        proofBehavior: 'Checklist + registos por intervenção.',
                    },
                    {
                        title: 'Clareza',
                        description: 'Explicamos decisões técnicas em linguagem de negócio.',
                        proofBehavior: 'Sem jargão, sem "vende-fumo".',
                    },
                    {
                        title: 'Segurança',
                        description: 'Controlos essenciais primeiro.',
                        proofBehavior: 'MFA, backups testados, hardening.',
                    },
                    {
                        title: 'Empatia',
                        description: 'Respeitamos equipas e prazos.',
                        proofBehavior: 'Comunicação simples e previsível.',
                    },
                ],
            },
            {
                blockType: 'timeline',
                enabled: true,
                sectionTitle: 'A nossa história',
                intro: 'Nascemos para resolver o essencial: manter empresas a trabalhar, com TI estável e suporte competente.',
                items: [
                    {
                        yearOrPeriod: 'Início',
                        title: 'Foco em suporte e proximidade',
                        description: 'Trabalho direto com clientes e problemas reais.',
                    },
                    {
                        yearOrPeriod: 'Evolução',
                        title: 'Mais segurança e processos',
                        description: 'Monitorização, padrões, documentação e prevenção.',
                    },
                    {
                        yearOrPeriod: 'Hoje',
                        title: 'Operação + projetos',
                        description: 'TI gerida, cibersegurança e projetos estruturantes.',
                        highlightQuote: 'Tecnologia com um coração humano.',
                    },
                ],
            },
            {
                blockType: 'pillars', // Usando pillars para "No que acreditamos"
                enabled: true,
                title: 'No que acreditamos',
                items: [
                    { title: 'Prevenção antes de reação', description: 'A base da estabilidade.', content: 'A base da estabilidade.', icon: '🛡️' },
                    { title: 'Simplicidade vence', description: 'Menos complexidade, mais foco.', content: 'Menos complexidade, mais foco.', icon: '✨' },
                    { title: 'Documentar é respeitar o futuro', description: 'Continuidade garantida.', content: 'Continuidade garantida.', icon: '📝' },
                    { title: 'Pessoas primeiro, sempre', description: 'Tecnologia serve negócios.', content: 'Tecnologia serve negócios.', icon: '🤝' },
                ],
            },
            {
                blockType: 'team-intro',
                enabled: true,
                title: 'A nossa equipa',
                roleTitle: 'Fundador • Consultor de TI',
                bio: 'Trabalho em TI há décadas, com foco em operações, infraestrutura e segurança. O meu estilo é simples: resolver, documentar e melhorar.',
            },
            {
                blockType: 'social-responsibility',
                enabled: true,
                sectionTitle: 'Responsabilidade social',
                intro: 'Acreditamos que empresas devem ser referências positivas na comunidade — e isso faz-se com ações, não slogans.',
                initiatives: [
                    {
                        title: 'Literacia digital',
                        description: 'Apoio a pequenas organizações / formação básica',
                        status: 'planned',
                    },
                    {
                        title: 'Apoio local',
                        description: 'Parcerias com iniciativas comunitárias',
                        status: 'planned',
                    },
                ],
            },
            {
                blockType: 'trust-partners',
                enabled: true,
                title: 'Confiança constrói-se com consistência',
            },
            {
                blockType: 'faq',
                enabled: true,
                title: 'Perguntas frequentes',
                intro: 'Baseados em Sintra, a apoiar PMEs em Portugal (e remoto).',
                items: [
                    {
                        question: 'Qual é o vosso tempo de resposta?',
                        answer: 'Respondemos rápido, mas sem promessas mágicas. O tempo de resposta depende do plano e do horário acordado. Para suporte recorrente, definimos SLAs e prioridades para incidentes críticos.',
                    },
                    {
                        question: 'Trabalham com PMEs portuguesas?',
                        answer: 'Sim — é o nosso foco. Ajudamos PMEs a ganhar estabilidade, segurança e clareza, mesmo sem equipa interna dedicada.',
                    },
                    {
                        question: 'O que vos diferencia de "mais uma empresa de informática"?',
                        answer: 'Experiência sénior, pragmatismo e proximidade. Falamos claro, escolhemos o que faz sentido e ficamos por perto para garantir que funciona no dia-a-dia.',
                    },
                    {
                        question: 'Preferem cloud ou on-premises?',
                        answer: 'Depende do caso. Usamos uma abordagem híbrida e pragmática: cloud quando traz valor, on-prem quando é necessário — sempre com foco em custo total, segurança e autonomia.',
                    },
                    {
                        question: 'Usam software open source?',
                        answer: 'Sim, quando é a melhor escolha. Open source dá transparência e flexibilidade, muitas vezes com melhor custo-benefício — desde que seja bem mantido, seguro e adequado ao negócio.',
                    },
                    {
                        question: 'Em que tecnologias e plataformas trabalham mais?',
                        answer: 'Trabalhamos com o que resolve o problema, não com "religião tecnológica". Na prática: Microsoft 365/Windows/redes, backups e virtualização, segurança e monitorização, e soluções open source para serviços internos e automação.',
                    },
                    {
                        question: 'Como lidam com RGPD?',
                        answer: 'Ajudamos na componente técnica: acessos, backups, encriptação, retenção e redução de risco. Quando é preciso jurídico, trabalhamos com parceiros.',
                    },
                    {
                        question: 'Oferecem suporte 24/7?',
                        answer: 'Não — preferimos ser honestos. Somos uma equipa pequena e sénior, por isso não prometemos 24/7. O foco é prevenção, monitorização e boas práticas para reduzir emergências.',
                    },
                    {
                        question: 'Como funciona o vosso modelo de serviço?',
                        answer: 'Três formatos: apoio recorrente (mensal), projetos fechados (migrações/melhorias/security baseline), e intervenções pontuais quando faz sentido.',
                    },
                    {
                        question: 'Conseguem ajudar a reduzir custos de IT?',
                        answer: 'Sim. Muitas vezes o ganho vem de simplificar: remover redundâncias, melhorar processos e evitar custos recorrentes desnecessários.',
                    },
                ],
                disclaimer: 'SLAs are defined transparently by contract (plan & business hours).',
            },
            finalCtaPt,
        ],
    };

    const aboutContentEn: any = {
        title: 'About Loading Happiness',
        slug: 'about',
        status: 'published' as const,
        seo: {
            title: 'About Loading Happiness | Human-centered IT in Portugal',
            description: 'Meet Loading Happiness: team, values, and how we work with security and responsibility for SMEs.',
            canonicalUrl: 'https://loadinghappiness.pt/about',
            indexable: true,
            openGraph: {
                ogTitle: 'About Loading Happiness',
                ogDescription: 'Technology with a human heart in Portugal.',
            },
        },
        layout: [
            {
                blockType: 'hero',
                enabled: true,
                anchorId: 'top',
                h1Title: 'About Loading Happiness',
                heading: 'About Loading Happiness',
                subheadline: 'We are a senior IT team focused on continuity, security, and honest support — with clear communication and respect for your context.',
                subheading: 'We are a senior IT team focused on continuity, security, and honest support — with clear communication and respect for your context.',
                primaryCTA: {
                    label: 'Talk to us →',
                    link: '/contact',
                },
                secondaryCTA: {
                    label: 'View services',
                    link: '/services',
                },
                quickFacts: [
                    { label: 'Base', value: 'Portugal' },
                    { label: 'Focus', value: 'Managed IT + Security' },
                    { label: 'Approach', value: 'Pragmatic, documented, human' },
                ],
                variant: 'A',
                theme: 'light',
            },
            {
                blockType: 'mission-vision-values',
                enabled: true,
                sectionTitle: 'Mission, vision, and values',
                mission: 'Ensure company tech works, is secure, and serves people—without noise or drama.',
                vision: 'Be a local reference in responsible IT: competent, close, and useful.',
                values: [
                    {
                        title: 'Rigor',
                        description: 'We do it well and leave documentation.',
                        proofBehavior: 'Checklists and records per intervention.',
                    },
                    {
                        title: 'Clarity',
                        description: 'We explain technical decisions in business language.',
                        proofBehavior: 'No jargon, no fluff selling.',
                    },
                    {
                        title: 'Security',
                        description: 'Essential controls first.',
                        proofBehavior: 'MFA, tested backups, hardening.',
                    },
                    {
                        title: 'Empathy',
                        description: 'We respect teams and timelines.',
                        proofBehavior: 'Simple, predictable communication.',
                    },
                ],
            },
            {
                blockType: 'timeline',
                enabled: true,
                sectionTitle: 'Our story',
                intro: 'Born to solve the essentials: keep companies running with stable IT and competent support.',
                items: [
                    {
                        yearOrPeriod: 'Start',
                        title: 'Focus on support and proximity',
                        description: 'Direct work with clients and real problems.',
                    },
                    {
                        yearOrPeriod: 'Evolution',
                        title: 'More security and process',
                        description: 'Monitoring, standards, documentation, and prevention.',
                    },
                    {
                        yearOrPeriod: 'Today',
                        title: 'Operations + projects',
                        description: 'Managed IT, security, and structured projects.',
                        highlightQuote: 'Technology with a human heart.',
                    },
                ],
            },
            {
                blockType: 'pillars',
                enabled: true,
                title: 'What we believe',
                items: [
                    { title: 'Prevention first', description: 'The base of stability.', content: 'The base of stability.', icon: '🛡️' },
                    { title: 'Simplicity wins', description: 'Less complexity, more focus.', content: 'Less complexity, more focus.', icon: '✨' },
                    { title: 'Document to respect the future', description: 'Continuity guaranteed.', content: 'Continuity guaranteed.', icon: '📝' },
                    { title: 'People first, always', description: 'Tech serves business.', content: 'Tech serves business.', icon: '🤝' },
                ],
            },
            {
                blockType: 'team-intro',
                enabled: true,
                title: 'Our team',
                roleTitle: 'Founder • IT Consultant',
                bio: 'Decades in IT focused on ops, infrastructure, and security. Style: solve, document, improve.',
            },
            {
                blockType: 'social-responsibility',
                enabled: true,
                sectionTitle: 'Social responsibility',
                intro: 'We believe companies should be positive references in their community — with actions, not slogans.',
                initiatives: [
                    {
                        title: 'Digital literacy',
                        description: 'Support for small orgs / basic training',
                        status: 'planned',
                    },
                    {
                        title: 'Local support',
                        description: 'Partnerships with community initiatives',
                        status: 'planned',
                    },
                ],
            },
            {
                blockType: 'trust-partners',
                enabled: true,
                title: 'Trust is built with consistency',
            },
            {
                blockType: 'faq',
                enabled: true,
                title: 'Frequently asked questions',
                intro: 'Based in Sintra, supporting SMEs in Portugal (and remote).',
                items: [
                    {
                        question: 'What is your response time?',
                        answer: 'We respond quickly, but without magic promises. Response time depends on the plan and agreed hours. For recurring support, we define SLAs and priorities for critical incidents.',
                    },
                    {
                        question: 'Do you work with Portuguese SMEs?',
                        answer: 'Yes — that is our focus. We help SMEs gain stability, security, and clarity, even without an internal dedicated team.',
                    },
                    {
                        question: 'What sets you apart from “just another IT company”?',
                        answer: 'Senior experience, pragmatism, and proximity. We speak clearly, choose what makes sense, and stay close to ensure it works day-to-day.',
                    },
                    {
                        question: 'Do you prefer cloud or on-premises?',
                        answer: 'Depends. We use a hybrid, pragmatic approach: cloud when it brings value, on-prem when necessary — always focused on total cost, security, and autonomy.',
                    },
                    {
                        question: 'Do you use open source software?',
                        answer: 'Yes, when it is the best choice. Open source gives transparency and flexibility, often with better cost-benefit — as long as it is well maintained, secure, and fit for business.',
                    },
                    {
                        question: 'What technologies and platforms do you work with most?',
                        answer: 'We work with what solves the problem, not “tech religion.” In practice: Microsoft 365/Windows/networks, backups and virtualization, security and monitoring, and open source solutions for internal services and automation.',
                    },
                    {
                        question: 'How do you handle GDPR?',
                        answer: 'We help on the technical side: access, backups, encryption, retention, and risk reduction. When legal expertise is needed, we work with partners.',
                    },
                    {
                        question: 'Do you offer 24/7 support?',
                        answer: 'No — we prefer to be honest. We are a small, senior team and do not promise 24/7. The focus is prevention, monitoring, and good practices to reduce emergencies.',
                    },
                    {
                        question: 'How does your service model work?',
                        answer: 'Three formats: recurring support (monthly), fixed projects (migrations/improvements/security baseline), and ad-hoc interventions when it makes sense.',
                    },
                    {
                        question: 'Can you help reduce IT costs?',
                        answer: 'Yes. Often the gain comes from simplifying: removing redundancies, improving processes, and avoiding unnecessary recurring costs.',
                    },
                ],
                disclaimer: 'SLAs are defined transparently by contract (plan & business hours).',
            },
            finalCtaEn,
        ],
    };

    if (aboutPage.totalDocs > 0) {
        console.log('🔄 Updating existing About page...');
        await payload.update({
            collection: 'pages',
            id: aboutPage.docs[0].id,
            locale: 'pt',
            data: aboutContentPt,
        });
        await payload.update({
            collection: 'pages',
            id: aboutPage.docs[0].id,
            locale: 'en',
            data: aboutContentEn,
        });
    } else {
        console.log('✨ Creating new About page...');
        const created = await payload.create({
            collection: 'pages',
            locale: 'pt',
            data: aboutContentPt,
        });
        await payload.update({
            collection: 'pages',
            id: created.id,
            locale: 'en',
            data: aboutContentEn,
        });
    }

    console.log('✅ About Page seeded successfully!');
};

seedAboutPage().catch((err) => {
    console.error('❌ Error seeding About page:', err);
    process.exit(1);
});
