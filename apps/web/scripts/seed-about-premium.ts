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

    await payload.update({
        collection: 'pages',
        id: pageId,
        locale: 'en',
        data: dataEn,
    });

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

    // 1. Upload Premium Images
    const brainDir = '/Users/carlosgavela/.gemini/antigravity/brain/26986eea-ccb3-4f26-bc59-ee84a0bb4f8e';
    const heroImageId = await ensureMedia(payload, 'About Hero - Premium Tech Heart 3D', path.join(brainDir, 'about_premium_hero_tech_heart_1767459444382.png'));
    const storyImageId = await ensureMedia(payload, 'About Story - Sintra Digital Heritage', path.join(brainDir, 'about_story_sintra_tech_1767458550738.png'));
    const impactImageId = await ensureMedia(payload, 'About Impact - Community Force', path.join(brainDir, 'about_social_impact_community_1767458580526.png'));
    const placeholderLogo = await ensureMedia(payload, 'Partner Placeholder', path.join(brainDir, 'about_philosophy_holistic_tech_1767458565394.png'));

    // 2. Prepare Structured Data (JSON-LD)
    const schemaEn = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
            "@type": "Organization",
            "name": "Loading Happiness",
            "url": "https://loadinghappiness.pt",
            "logo": "https://loadinghappiness.pt/logo.png",
            "description": "Premium IT services for Portuguese SMEs with a human-first approach.",
            "founder": {
                "@type": "Person",
                "name": "Carlos Gavela",
                "jobTitle": "Founder & IT Strategist"
            },
            "areaServed": "Portugal",
            "knowsAbout": ["Managed IT Services", "Cybersecurity", "Cloud Infrastructure"]
        }
    });

    const schemaPt = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
            "@type": "Organization",
            "name": "Loading Happiness",
            "url": "https://loadinghappiness.pt",
            "logo": "https://loadinghappiness.pt/logo.png",
            "description": "Serviços de IT premium para PMEs em Portugal com uma abordagem humanizada.",
            "founder": {
                "@type": "Person",
                "name": "Carlos Gavela",
                "jobTitle": "Fundador e Estrategista de TI"
            },
            "areaServed": "Portugal",
            "knowsAbout": ["Serviços de IT Geridos", "Cibersegurança", "Infraestrutura Cloud"]
        }
    });

    // 3. Prepare Content Layout
    const aboutLayoutEn = [
        {
            blockType: 'hero',
            enabled: true,
            anchorId: 'top',
            variant: 'D',
            theme: 'brandGradient',
            eyebrow: 'ABOUT LOADING HAPPINESS',
            h1Title: 'Technology with a human heart. Built for real businesses.',
            heading: 'Technology with a human heart. Built for real businesses.',
            subheadline: 'We help organizations run smoother, safer, and smarter — with IT that feels clear, dependable, and genuinely supportive.',
            subheading: 'We help organizations run smoother, safer, and smarter — with IT that feels clear, dependable, and genuinely supportive.',
            trustLine: 'No jargon for show. No "IT theatre". Just honest work, done properly.',
            primaryCTA: { label: 'Talk to us →', link: '/contact' },
            secondaryCTA: { label: 'Explore our Impact →', link: '/impact' },
            image: heroImageId,
            heroImage: heroImageId,
            factsTitle: 'What you get',
            quickFacts: [
                { label: 'Response time', value: '< 15 min' },
                { label: 'Proactive monitoring', value: 'Monthly checks' },
                { label: 'Long-term partnership', value: 'Continuous improvement' },
            ],
            factDisclaimer: 'Response times depend on plan and business hours.',
        },
        {
            blockType: 'featureGrid',
            sectionId: 'key-facts',
            title: 'Key Facts',
            sectionTitle: 'Operational Excellence at a Glance',
            columns: 3,
            items: [
                { title: 'Based in', content: 'Sintra, Portugal', icon: '📍' },
                { title: 'What we do', content: 'Managed IT, Cybersecurity, Cloud, Infrastructure', icon: '🛠️' },
                { title: 'Who we serve', content: 'Small and Mid-sized Enterprises in Portugal', icon: '🏢' },
                { title: 'How we work', content: 'Senior-led, pragmatic, human-first', icon: '🤝' },
                { title: 'Differentiator', content: 'Technology with a human heart', icon: '❤️' },
                { title: 'Support', content: 'Available via /contact', icon: '📞' },
            ]
        },
        {
            blockType: 'splitContent',
            anchorId: 'our-story',
            sectionTitle: 'From Sintra, with a practical mission',
            title: 'From Sintra, with a practical mission',
            bodyRichText: 'Loading Happiness was founded in October 2016 in Sintra, with a clear idea: give small and mid-sized businesses the same quality of IT usually reserved for big organizations.\n\nWe grew steadily by doing the basics exceptionally well: listening carefully, designing solutions that fit the context, and staying close after delivery.',
            image: storyImageId,
            layout: 'imageRight',
        },
        {
            blockType: 'trustPartners',
            sectionTitle: 'Trusted by teams that value stability',
            text: 'Working with leaders across Portugal',
            logos: [
                { logo: placeholderLogo, name: 'SME Manufacturing' },
                { logo: placeholderLogo, name: 'Healthcare Provider' },
                { logo: placeholderLogo, name: 'Retail Brand' },
            ]
        },
        {
            blockType: 'testimonials',
            sectionTitle: 'What our clients say',
            items: [
                {
                    quote: 'They reduced recurring issues quickly and kept us informed at every step.',
                    name: 'Operations Manager',
                    company: 'Manufacturing SME',
                },
                {
                    quote: 'Clear communication and steady improvements. We finally feel in control of IT.',
                    name: 'Managing Director',
                    company: 'LusoHealth',
                }
            ]
        },
        {
            blockType: 'teamIntro',
            anchorId: 'team',
            title: 'The Core Team & Partners',
            text: 'Senior, hands-on, and close to the ground. We work with a network of trusted legal and accounting specialists to ensure your technical operations are fully compliant.',
            cards: [
                {
                    title: 'Carlos Gavela',
                    text: 'Founder & Lead Strategist. 25+ years in IT operations and infrastructure. Focused on pragmatic security.',
                    tags: [{ text: 'Infrastructure' }, { text: 'Security' }]
                },
                {
                    title: 'Lumina',
                    text: 'Our dedicated AI Operations Partner. Helping us monitor, analyze, and optimize systems with 24/7 visibility.',
                    tags: [{ text: 'AI Operations' }, { text: 'Monitoring' }]
                },
                {
                    title: 'Network Partners',
                    text: 'Expert collaborators in Legal Tech and Accounting to support holistic business needs.',
                    tags: [{ text: 'Compliance' }, { text: 'Operations' }]
                }
            ]
        },
        {
            blockType: 'faq',
            sectionId: 'faq',
            title: 'Frequently Asked Questions',
            items: [
                { question: 'What does Loading Happiness actually do?', answer: 'We provide Managed IT services, Cybersecurity baselines, and Cloud governance specifically designed for SMEs.' },
                { question: 'Who is your ideal client?', answer: 'Small and medium-sized organizations that value stability, clear communication, and a proactive approach to security.' },
                { question: 'Do you provide on-site support?', answer: 'Yes, we are based in Sintra and support clients across Portugal, plus remote EU support.' },
                { question: 'How do you approach cybersecurity?', answer: 'We focus on high-impact controls: MFA, verified backups, endpoint protection, and risk culture training.' },
                { question: 'Is support available 24/7?', answer: 'Our standard support follows business hours, with specific plans offering extended emergency response.' }
            ]
        },
        {
            blockType: 'finalCTA',
            anchorId: 'cta',
            title: 'Ready to build calmer, safer IT?',
            content: 'Tell us where you are today — and where you want to be. We’ll give you a clear next step, without pressure.',
            primaryCTA: { label: 'Talk to us →', link: '/contact' },
            secondaryCTA: { label: 'Explore our services →', link: '/services' },
        },
    ];

    const aboutLayoutPt = [
        {
            blockType: 'hero',
            enabled: true,
            anchorId: 'top',
            variant: 'D',
            theme: 'brandGradient',
            eyebrow: 'SOBRE A LOADING HAPPINESS',
            h1Title: 'Tecnologia com coração humano. Construída para negócios reais.',
            heading: 'Tecnologia com coração humano. Construída para negócios reais.',
            subheadline: 'Ajudamos as organizações a funcionar de forma mais suave, segura e inteligente — com um IT que parece claro, fiável e genuinamente prestável.',
            subheading: 'Ajudamos as organizações a funcionar de forma mais suave, segura e inteligente — com um IT que parece claro, fiável e genuinamente prestável.',
            trustLine: 'Sem jargão para exibição. Sem "teatro técnico". Apenas trabalho honesto, bem feito.',
            primaryCTA: { label: 'Fale connosco →', link: '/contact' },
            secondaryCTA: { label: 'Explore o nosso Impacto →', link: '/impact' },
            image: heroImageId,
            heroImage: heroImageId,
            factsTitle: 'O que recebe',
            quickFacts: [
                { label: 'Tempo de resposta', value: '< 15 min' },
                { label: 'Monitorização proativa', value: 'Verificações mensais' },
                { label: 'Parceria a longo prazo', value: 'Melhoria contínua' },
            ],
            factDisclaimer: 'Os tempos de resposta dependem do plano e do horário comercial.',
        },
        {
            blockType: 'featureGrid',
            sectionId: 'key-facts',
            title: 'Factos Chave',
            sectionTitle: 'Excelência Operacional num Visance',
            columns: 3,
            items: [
                { title: 'Baseado em', content: 'Sintra, Portugal', icon: '📍' },
                { title: 'O que fazemos', content: 'IT Gerido, Cibersegurança, Cloud, Infraestrutura', icon: '🛠️' },
                { title: 'A quem servimos', content: 'Pequenas e Médias Empresas em Portugal', icon: '🏢' },
                { title: 'Como trabalhamos', content: 'Liderado por séniores, pragmático, foco humano', icon: '🤝' },
                { title: 'Diferenciador', content: 'Tecnologia com coração humano', icon: '❤️' },
                { title: 'Suporte', content: 'Disponível via /contacto', icon: '📞' },
            ]
        },
        {
            blockType: 'splitContent',
            anchorId: 'our-story',
            sectionTitle: 'De Sintra, com uma missão prática',
            title: 'De Sintra, com uma missão prática',
            bodyRichText: 'A Loading Happiness foi fundada em outubro de 2016 em Sintra, com uma ideia clara: dar às PMEs a mesma qualidade de IT normalmente reservada a grandes organizações.\n\nCrescemos fazendo o básico excecionalmente bem: ouvindo o contexto real e mantendo-nos próximos após a entrega.',
            image: storyImageId,
            layout: 'imageRight',
        },
        {
            blockType: 'trustPartners',
            sectionTitle: 'Confiança de quem valoriza estabilidade',
            text: 'A apoiar líderes em todo o Portugal',
            logos: [
                { logo: placeholderLogo, name: 'Indústria' },
                { logo: placeholderLogo, name: 'Saúde' },
                { logo: placeholderLogo, name: 'Retalho' },
            ]
        },
        {
            blockType: 'testimonials',
            sectionTitle: 'O que dizem os nossos clientes',
            items: [
                {
                    quote: 'Reduziram os problemas recorrentes rapidamente e mantiveram-nos informados em cada passo.',
                    name: 'Diretor de Operações',
                    company: 'PME Industrial',
                },
                {
                    quote: 'Comunicação clara e melhorias constantes. Finalmente sentimos que temos o IT sob controlo.',
                    name: 'Managing Director',
                    company: 'LusoHealth',
                }
            ]
        },
        {
            blockType: 'teamIntro',
            anchorId: 'team',
            title: 'Equipa Principal e Parceiros',
            text: 'Sénior, práticos e próximos do terreno. Trabalhamos com uma rede de especialistas legais e contabilísticos para garantir que as suas operações técnicas cumprem todas as conformidades.',
            cards: [
                {
                    title: 'Carlos Gavela',
                    text: 'Fundador e Estrategista Principal. Mais de 25 anos em operações de IT e infraestrutura. Foco em segurança pragmática.',
                    tags: [{ text: 'Infraestrutura' }, { text: 'Segurança' }]
                },
                {
                    title: 'Lumina',
                    text: 'A nossa parceira de Operações de IA. Ajuda-nos a monitorizar, analisar e otimizar sistemas com visibilidade 24/7.',
                    tags: [{ text: 'IA Operations' }, { text: 'Monitorização' }]
                },
                {
                    title: 'Rede de Parceiros',
                    text: 'Colaboradores especialistas em Legal Tech e Contabilidade para apoiar as necessidades holísticas do seu negócio.',
                    tags: [{ text: 'Compliance' }, { text: 'Operações' }]
                }
            ]
        },
        {
            blockType: 'faq',
            sectionId: 'faq',
            title: 'Perguntas Frequentes',
            items: [
                { question: 'O que faz a Loading Happiness?', answer: 'Oferecemos IT Gerido, Cibersegurança e Governança na Nuvem desenhados especificamente para PMEs.' },
                { question: 'Quem é o vosso cliente ideal?', answer: 'Organizações que valorizam estabilidade, comunicação clara e uma abordagem proativa à segurança.' },
                { question: 'Oferecem suporte local?', answer: 'Sim, estamos em Sintra e apoiamos clientes em todo o Portugal, além de suporte remoto na UE.' },
                { question: 'Como abordam a cibersegurança?', answer: 'Focamos em controlos de alto impacto: MFA, backups verificados, proteção de endpoints e cultura de risco.' },
                { question: 'O suporte é 24/7?', answer: 'O nosso suporte padrão segue o horário comercial, com planos específicos a oferecer resposta de emergência alargada.' }
            ]
        },
        {
            blockType: 'finalCTA',
            anchorId: 'cta',
            title: 'Pronto para um IT mais calmo e seguro?',
            content: 'Diga-nos onde está hoje — e onde quer estar. Daremos um próximo passo claro, sem pressão.',
            primaryCTA: { label: 'Fale connosco →', link: '/contact' },
            secondaryCTA: { label: 'Ver serviços →', link: '/services' },
        },
    ];

    await upsertPage(payload, 'about', {
        title: 'About',
        status: 'published',
        layout: aboutLayoutEn,
        seo: {
            title: 'About Loading Happiness | Human-Centered IT in Portugal',
            description: 'Senior-led IT consultancy in Sintra. Managed IT services, cybersecurity, and cloud solutions for SMEs in Portugal. Technology with a human heart.',
            schemaOrg: schemaEn,
        }
    }, {
        title: 'Sobre a Loading Happiness',
        status: 'published',
        layout: aboutLayoutPt,
        seo: {
            title: 'Sobre a Loading Happiness | Consultoria de TI em Portugal',
            description: 'Consultoria de TI em Sintra liderada por séniores. IT gerido, cibersegurança e soluções cloud para PMEs em Portugal.',
            schemaOrg: schemaPt,
        }
    });

    console.log('✅ Premium About page seeded successfully!');
    process.exit(0);
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
