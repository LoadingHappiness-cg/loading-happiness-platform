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

const main = async () => {
    await loadEnvFile();
    if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
        throw new Error('DATABASE_URI and PAYLOAD_SECRET must be set before seeding.');
    }

    const config = (await import('../payload.config.ts')).default;
    const payload = await getPayload({ config });

    // 1. Upload the generated Hero image (check if exists first to avoid duplicates)
    const heroImagePath = '/Users/carlosgavela/.gemini/antigravity/brain/6d8bbc3d-61af-4e7d-8dcf-aaa53a73bc98/impact_hero_image_1767375333273.png';
    let heroImageId: string | number;

    const existingMedia = await payload.find({
        collection: 'media',
        where: { alt: { equals: 'Collaboration for community support' } },
        limit: 1,
    });

    if (existingMedia.docs?.[0]) {
        heroImageId = existingMedia.docs[0].id;
        console.log('Hero image already exists:', heroImageId);
    } else {
        try {
            const fileData = await fs.readFile(heroImagePath);
            const createdMedia = await payload.create({
                collection: 'media',
                data: {
                    alt: 'Collaboration for community support',
                },
                file: {
                    data: fileData,
                    name: 'impact-hero.png',
                    mimetype: 'image/png',
                    size: fileData.length,
                },
            });
            heroImageId = createdMedia.id;
            console.log('Hero image uploaded successfully:', heroImageId);
        } catch (error) {
            console.error('Failed to upload hero image, searching for any impact-hero.png...');
            const fallbackMedia = await payload.find({
                collection: 'media',
                where: { filename: { equals: 'impact-hero.png' } },
                limit: 1,
            });
            if (fallbackMedia.docs?.[0]) {
                heroImageId = fallbackMedia.docs[0].id;
            } else {
                throw error;
            }
        }
    }

    // 2. Define the Impact Page content (EN)
    const impactPageDataEn = {
        title: 'Impact',
        slug: 'impact',
        status: 'published' as 'published',
        layout: [
            {
                blockType: 'hero',
                sectionId: 'hero',
                eyebrow: 'IMPACT',
                variant: 'A',
                theme: 'impact',
                heading: 'Technology with a human heart — proven through action.',
                subheading: 'We build reliable IT for businesses. And we deliberately invest part of our time, skills, and resources in social responsibility — supporting people, communities, and ethical tech practices.',
                trustLine: 'We don’t do “CSR theatre”. We do practical help, measurable outcomes, and long-term relationships.',
                primaryCTA: { label: 'Propose an initiative', link: '/contact?topic=impact' },
                secondaryCTA: { label: 'Partner with us', link: '/contact?topic=partnership' },
                image: heroImageId,
            },
            {
                blockType: 'stats',
                sectionId: 'snapshot',
                title: 'Impact snapshot',
                intro: 'We track what we do so we can improve it. Some figures are updated quarterly.',
                items: [
                    { label: 'Hours donated', value: 'TBD', note: 'hands-on support, mentoring, pro bono work' },
                    { label: 'Initiatives supported', value: 'TBD', note: 'schools, nonprofits, local communities' },
                    { label: 'Devices refurbished / recycled', value: 'TBD', note: 'reuse when possible, recycle when needed' },
                    { label: 'People trained / mentored', value: 'TBD', note: 'digital skills, security basics, confidence' },
                    { label: '% of projects with social component', value: 'TBD', note: 'direct volunteering or funded contribution' },
                ],
            },
            {
                blockType: 'pillars',
                sectionId: 'commitments',
                title: 'What we commit to',
                intro: 'Our impact work follows the same standards we apply to IT: consistency, transparency, and accountability.',
                items: [
                    { title: 'Digital inclusion', content: 'We help reduce the technology gap — with practical support, training, and access to tools that empower people.', icon: '🔧' },
                    { title: 'Community support', content: 'We collaborate with local initiatives and organizations that are doing real work on the ground, not just marketing.', icon: '🤝' },
                    { title: 'Ethical & sustainable IT', content: 'We promote responsible security practices, data protection, and sustainable choices — repair, reuse, and smarter procurement.', icon: '🌱' },
                ],
            },
            {
                blockType: 'splitContent',
                sectionId: 'what-we-do',
                title: 'What we actually do (not just talk about)',
                content: 'Small actions compound. The goal is not to “save the world” — it’s to be useful, consistently.',
                items: [
                    { item: 'Pro bono IT support for nonprofits and community projects (where it truly helps).' },
                    { item: 'Security basics workshops (phishing awareness, password hygiene, simple policies).' },
                    { item: 'Device refurbishment and responsible recycling workflows.' },
                    { item: 'Mentoring & guidance for young people entering tech.' },
                    { item: 'Support for accessibility and inclusive digital experiences.' },
                ],
                layout: 'imageRight',
            },
            {
                blockType: 'social-responsibility',
                sectionId: 'initiatives',
                sectionTitle: 'Initiatives',
                intro: 'Some initiatives are ongoing. Some are seasonal. All are chosen for real-world usefulness.',
                initiatives: [
                    {
                        title: 'Community IT support (pilot)',
                        description: 'Helping small community organizations keep their systems stable, secure, and affordable — without enterprise budgets.\n\nOutcomes:\n• Reduced recurring IT issues with simple preventive work\n• Basic security improvements implemented\n• Documentation and training delivered',
                        status: 'active' as 'active',
                        link: '/contact?topic=impact',
                    },
                    {
                        title: 'Digital skills mentoring',
                        description: 'Mentoring young people and career-changers — helping them build confidence, direction, and practical skills.\n\nOutcomes:\n• Practical learning plans\n• CV/portfolio guidance\n• Real-world problem solving sessions',
                        status: 'active' as 'active',
                    },
                    {
                        title: 'Refurbish & reuse',
                        description: 'Extending the lifecycle of devices when possible, and recycling responsibly when not.\n\nOutcomes:\n• Device triage and refurbishment process\n• Data-wipe workflow\n• Responsible disposal partners',
                        status: 'active' as 'active',
                    },
                ],
                cta: { label: 'Want to propose something? Let’s talk.', href: '/contact?topic=impact' },
            },
            {
                blockType: 'valueCards',
                sectionId: 'selection-criteria',
                title: 'How we choose what we support',
                intro: 'We can’t support everything. So we choose carefully — and say “no” when needed.',
                cards: [
                    { title: '1. Real usefulness', text: 'tangible benefit, not performative', icon: '✅' },
                    { title: '2. Respect and accountability', text: 'clear owners, clear goals', icon: '👤' },
                    { title: '3. Sustainability', text: 'not creating dependency', icon: '🔄' },
                    { title: '4. Privacy & dignity', text: 'data protection and respect always', icon: '🛡️' },
                    { title: '5. Long-term mindset', text: 'small consistent actions > one-time noise', icon: '⏳' },
                ],
            },
            { blockType: 'logoCloud', sectionId: 'partners', title: 'Partners & community', text: 'Impact is a team sport. We collaborate with organizations that value integrity, action, and human dignity.\n\nInterested in partnering? Let’s talk. → /contact?topic=partnership', logos: [] },
            {
                blockType: 'outcomesCards',
                sectionId: 'transparency',
                title: 'Transparency',
                intro: 'We don’t claim perfection. We claim responsibility — and the willingness to measure and improve.',
                cards: [
                    { title: 'Our values', text: 'Aligned with long-term accountability.' },
                    { title: 'Privacy Policy', text: 'How we handle data with respect.' },
                    { title: 'Impact updates', text: 'Fresh data on our recent initiatives.' },
                ],
            },
            {
                blockType: 'finalCTA',
                sectionId: 'final-cta',
                title: 'Let’s build something useful — together.',
                content: 'If you have an initiative that needs practical tech help, or if your organization wants a partner that cares about outcomes, reach out.',
                microcopy: 'We reply fast, and we’ll be direct about what we can (and can’t) do.',
                primaryCTA: { label: 'Propose an initiative', link: '/contact?topic=impact' },
                secondaryCTA: { label: 'Talk to us', link: '/contact' },
            },
        ],
        seo: {
            title: 'Impact | Loading Happiness — Technology with a human heart',
            description: 'Discover how Loading Happiness turns technology into practical social impact: digital inclusion, community support, ethical and sustainable IT, and measurable outcomes.',
            openGraph: {
                ogTitle: 'Impact — Loading Happiness',
                ogDescription: 'Practical social responsibility, measurable outcomes, and ethical IT — built into how we work.',
            },
        }
    };

    // 3. Define the Impact Page content (PT)
    const impactPageDataPt = {
        title: 'Impacto',
        slug: 'impact',
        status: 'published' as 'published',
        layout: [
            {
                blockType: 'hero',
                sectionId: 'hero',
                eyebrow: 'IMPACTO',
                variant: 'A',
                theme: 'impact',
                heading: 'Tecnologia com coração humano — comprovada através da ação.',
                subheading: 'Construímos TI fiável para empresas. E investimos deliberadamente parte do nosso tempo, competências e recursos em responsabilidade social — apoiando pessoas, comunidades e práticas tecnológicas éticas.',
                trustLine: 'Não fazemos "teatro de RSC". Fazemos ajuda prática, resultados mensuráveis e relações de longo prazo.',
                primaryCTA: { label: 'Propor uma iniciativa', link: '/contact?topic=impact' },
                secondaryCTA: { label: 'Trabalhe connosco', link: '/contact?topic=partnership' },
                image: heroImageId,
            },
            {
                blockType: 'stats',
                sectionId: 'snapshot',
                title: 'Snapshot do impacto',
                intro: 'Medimos o que fazemos para podermos melhorar. Alguns números são atualizados trimestralmente.',
                items: [
                    { label: 'Horas doadas', value: 'TBD', note: 'apoio prático, mentoria, trabalho pro bono' },
                    { label: 'Iniciativas apoiadas', value: 'TBD', note: 'escolas, ONGs, comunidades locais' },
                    { label: 'Dispositivos recuperados / reciclados', value: 'TBD', note: 'reutilizar quando possível, reciclar quando necessário' },
                    { label: 'Pessoas formadas / mentoradas', value: 'TBD', note: 'competências digitais, bases de segurança, confiança' },
                    { label: '% de projetos com componente social', value: 'TBD', note: 'voluntariado direto ou contribuição financiada' },
                ],
            },
            {
                blockType: 'pillars',
                sectionId: 'commitments',
                title: 'O nosso compromisso',
                intro: 'O nosso trabalho de impacto segue os mesmos padrões que aplicamos à TI: consistência, transparência e responsabilidade.',
                items: [
                    { title: 'Inclusão digital', content: 'Ajudamos a reduzir o fosso tecnológico — com apoio prático, formação e acesso a ferramentas que capacitam as pessoas.', icon: '🔧' },
                    { title: 'Apoio comunitário', content: 'Colaboramos com iniciativas e organizações locais que fazem trabalho real no terreno, não apenas marketing.', icon: '🤝' },
                    { title: 'TI Ética & Sustentável', content: 'Promovemos práticas de segurança responsáveis, proteção de dados e escolhas sustentáveis — reparação, reutilização e compras inteligentes.', icon: '🌱' },
                ],
            },
            {
                blockType: 'splitContent',
                sectionId: 'what-we-do',
                title: 'O que fazemos realmente (não nos limitamos a falar)',
                content: 'Pequenas ações acumulam-se. O objetivo não é "salvar o mundo" — é ser útil, consistentemente.',
                items: [
                    { item: 'Suporte de TI pro bono para ONGs e projetos comunitários (onde realmente ajuda).' },
                    { item: 'Workshops de bases de segurança (phishing, passwords, políticas simples).' },
                    { item: 'Recuperação de dispositivos e fluxos de reciclagem responsável.' },
                    { item: 'Mentoria e orientação para jovens que entram na área tecnológica.' },
                    { item: 'Apoio à acessibilidade e experiências digitais inclusivas.' },
                ],
                layout: 'imageRight',
            },
            {
                blockType: 'social-responsibility',
                sectionId: 'initiatives',
                sectionTitle: 'Iniciativas',
                intro: 'Algumas iniciativas são contínuas. Outras são sazonais. Todas são escolhidas pela sua utilidade real.',
                initiatives: [
                    {
                        title: 'Suporte de TI comunitário (piloto)',
                        description: 'Ajudar pequenas organizações comunitárias a manter os seus sistemas estáveis, seguros e acessíveis — sem orçamentos de grandes empresas.\n\nResultados:\n• Redução de problemas recorrentes com trabalho preventivo\n• Melhorias básicas de segurança implementadas\n• Documentação e formação entregues',
                        status: 'active' as 'active',
                        link: '/contact?topic=impact',
                    },
                    {
                        title: 'Mentoria de competências digitais',
                        description: 'Mentoria a jovens e profissionais em transição de carreira — ajudando-os a ganhar confiança, direção e competências práticas.\n\nResultados:\n• Planos de aprendizagem práticos\n• Orientação de CV/portfólio\n• Sessões de resolução de problemas do mundo real',
                        status: 'active' as 'active',
                    },
                    {
                        title: 'Recuperar & Reutilizar',
                        description: 'Prolongar o ciclo de vida dos dispositivos sempre que possível e reciclar de forma responsável quando não.\n\nResultados:\n• Processo de triagem e recuperação de dispositivos\n• Fluxo de limpeza de dados (data-wipe)\n• Parceiros de eliminação responsável',
                        status: 'active' as 'active',
                    },
                ],
                cta: { label: 'Quer propor algo? Vamos conversar.', href: '/contact?topic=impact' },
            },
            {
                blockType: 'valueCards',
                sectionId: 'selection-criteria',
                title: 'Como escolhemos o que apoiar',
                intro: 'Não conseguimos apoiar tudo. Por isso, escolhemos cuidadosamente — e dizemos "não" quando necessário.',
                cards: [
                    { title: '1. Utilidade real', text: 'benefício tangível, não performativo', icon: '✅' },
                    { title: '2. Respeito e responsabilidade', text: 'responsáveis claros, objetivos claros', icon: '👤' },
                    { title: '3. Sustentabilidade', text: 'não criar dependência', icon: '🔄' },
                    { title: '4. Privacidade e dignidade', text: 'proteção de dados e respeito sempre', icon: '🛡️' },
                    { title: '5. Mentalidade de longo prazo', text: 'pequenas ações consistentes > ruído pontual', icon: '⏳' },
                ],
            },
            { blockType: 'logoCloud', sectionId: 'partners', title: 'Parceiros & Comunidade', text: 'O impacto é um desporto de equipa. Colaboramos com organizações que valorizam a integridade, a ação e a dignidade humana.\n\nInteressado em ser parceiro? Vamos conversar. → /contact?topic=partnership', logos: [] },
            {
                blockType: 'outcomesCards',
                sectionId: 'transparency',
                title: 'Transparência',
                intro: 'Não reivindicamos a perfeição. Reivindicamos responsabilidade — e a vontade de medir e melhorar.',
                cards: [
                    { title: 'Nossos valores', text: 'Alinhados com a responsabilidade de longo prazo.' },
                    { title: 'Política de Privacidade', text: 'Como lidamos com os dados com respeito.' },
                    { title: 'Impact updates', text: 'Dados recentes sobre as nossas iniciativas.' },
                ],
            },
            {
                blockType: 'finalCTA',
                sectionId: 'final-cta',
                title: 'Vamos construir algo útil — juntos.',
                content: 'Se tem uma iniciativa que precisa de ajuda tecnológica prática, ou se a sua organização procura um parceiro que se preocupa com resultados, entre em contacto.',
                microcopy: 'Respondemos rápido e seremos diretos sobre o que podemos (e não podemos) fazer.',
                primaryCTA: { label: 'Propor uma iniciativa', link: '/contact?topic=impact' },
                secondaryCTA: { label: 'Fale connosco', link: '/contact' },
            },
        ],
        seo: {
            title: 'Impacto | Loading Happiness — Tecnologia com coração humano',
            description: 'Descubra como a Loading Happiness transforma a tecnologia em impacto social prático: inclusão digital, apoio comunitário, TI ética e resultados mensuráveis.',
            openGraph: {
                ogTitle: 'Impacto — Loading Happiness',
                ogDescription: 'Responsabilidade social prática, resultados mensuráveis e TI ética — integrados na forma como trabalhamos.',
            },
        }
    };

    // Upsert the page for both locales
    const existingEn = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'impact' } },
        limit: 1,
        locale: 'en',
    });

    let pageId: string | number;

    if (existingEn.docs?.[0]) {
        pageId = existingEn.docs[0].id;
        await payload.update({
            collection: 'pages',
            id: pageId,
            data: impactPageDataEn as any,
            locale: 'en',
        });
        console.log('Impact page updated successfully (EN)');
    } else {
        const created = await payload.create({
            collection: 'pages',
            data: impactPageDataEn as any,
            locale: 'en',
        });
        pageId = created.id;
        console.log('Impact page created successfully (EN)');
    }

    // Always update 'pt' locale
    await payload.update({
        collection: 'pages',
        id: pageId,
        data: impactPageDataPt as any,
        locale: 'pt',
    });
    console.log('Impact page updated successfully (PT)');

    process.exit(0);
};

main();
