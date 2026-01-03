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
            {
                blockType: 'finalCTA',
                enabled: true,
                title: 'Still have questions?',
                subtitle: 'Partilha o contexto e as prioridades, e alinhamos um caminho realista.',
                primaryCTA: {
                    label: 'Still have questions? →',
                    link: '/contact',
                },
                supportingLinks: [
                    { label: 'Modelos de serviço', href: '/services' },
                    { label: 'Impact', href: '/impact' },
                ],
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
