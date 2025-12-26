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

    const aboutContent: any = {
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
                title: 'Perguntas Frequentes',
                items: [
                    { question: 'Trabalham só com empresas em Portugal?', answer: 'Focamos o nosso suporte presencial em Portugal, mas operamos remotamente para qualquer localização.' },
                    { question: 'O que inclui TI gerida?', answer: 'Monitorização 24/7, gestão de backups, segurança, suporte ilimitado e consultoria estratégica.' },
                ],
            },
            {
                blockType: 'final-cta',
                enabled: true,
                title: 'Se queres uma TI mais estável e segura, falamos.',
                content: 'Conta-nos o teu contexto e prioridades. Respondemos com um plano claro.',
                primaryCTA: {
                    label: 'Contactar →',
                    link: '/contact',
                },
                secondaryCTA: {
                    label: 'Ver serviços',
                    link: '/services',
                },
            }
        ],
    };

    if (aboutPage.totalDocs > 0) {
        console.log('🔄 Updating existing About page...');
        await payload.update({
            collection: 'pages',
            id: aboutPage.docs[0].id,
            data: aboutContent,
        });
    } else {
        console.log('✨ Creating new About page...');
        await payload.create({
            collection: 'pages',
            data: aboutContent,
        });
    }

    console.log('✅ About Page seeded successfully!');
};

seedAboutPage().catch((err) => {
    console.error('❌ Error seeding About page:', err);
    process.exit(1);
});
