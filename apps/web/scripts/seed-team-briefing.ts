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

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://loadinghappiness.pt';

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
        // Ignore
    }
};

const ensureMedia = async (payload: any, alt: string, fileName: string) => {
    const existing = await payload.find({
        collection: 'media',
        where: { alt: { equals: alt } },
        limit: 1,
    });
    if (existing.docs?.[0]) return existing.docs[0].id;

    const tmpDir = path.join(__dirname, 'tmp');
    await fs.mkdir(tmpDir, { recursive: true });
    const filePath = path.join(tmpDir, fileName);
    await fs.writeFile(filePath, placeholderPng);
    const fileData = await fs.readFile(filePath);

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

const upsertCollectionItem = async (payload: any, collection: string, whereField: string, whereValue: string, data: any) => {
    const existing = await payload.find({
        collection,
        where: { [whereField]: { equals: whereValue } },
        limit: 1,
    });
    if (existing.docs?.[0]) {
        console.log(`🔄 Updating ${collection}: ${whereValue}`);
        return await payload.update({
            collection,
            id: existing.docs[0].id,
            data,
        });
    } else {
        console.log(`✨ Creating ${collection}: ${whereValue}`);
        return await payload.create({
            collection,
            data,
        });
    }
};

const upsertPage = async (payload: any, slug: string, dataEn: any, dataPt: any) => {
    const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: slug } },
        limit: 1,
        locale: 'en',
    });
    let id = existing.docs?.[0]?.id;
    try {
        if (id) {
            console.log(`🔄 Updating page: ${slug}`);
            await payload.update({ collection: 'pages', id, locale: 'en', data: { ...dataEn, slug } });
            await payload.update({ collection: 'pages', id, locale: 'pt', data: { ...dataPt, slug } });
        } else {
            console.log(`✨ Creating page: ${slug}`);
            // Create in English first
            const created = await payload.create({
                collection: 'pages',
                locale: 'en',
                data: { ...dataEn, slug }
            });
            // Then update in Portuguese
            await payload.update({
                collection: 'pages',
                id: created.id,
                locale: 'pt',
                data: { ...dataPt, slug }
            });
            id = created.id;
        }
    } catch (err: any) {
        if (err.data?.errors) {
            console.error('❌ Validation Errors:', JSON.stringify(err.data.errors, null, 2));
        }
        throw err;
    }
    return id;
};

type MemberSchema = {
    name: string;
    jobTitle: string;
    image: string;
    description?: string;
    sameAs?: string[];
};

type PartnerSchema = {
    name: string;
    url: string;
    logo: string;
    description?: string;
    sameAs?: string[];
    since?: string;
};

const buildSchemaOrg = ({
    pageTitle,
    pageUrl,
    locale,
    members,
    partners,
}: {
    pageTitle: string;
    pageUrl: string;
    locale: string;
    members: MemberSchema[];
    partners: PartnerSchema[];
}) => {
    const graph: any[] = [
        {
            '@type': 'WebPage',
            '@id': `${pageUrl}#webpage`,
            name: pageTitle,
            url: pageUrl,
            inLanguage: locale,
            isPartOf: {
                '@type': 'Organization',
                name: 'Loading Happiness',
                url: BASE_URL,
            },
        },
        {
            '@type': 'Organization',
            '@id': `${BASE_URL}#organization`,
            name: 'Loading Happiness',
            url: BASE_URL,
            logo: `${BASE_URL}/logo_simples_small.png`,
            sameAs: ['https://linkedin.com/company/loadinghappiness'],
            description: 'Senior IT partner for Portuguese SMEs focused on clarity, security, and human accountability.',
        },
    ];

    members.forEach((member) => {
        const personEntry: any = {
            '@type': 'Person',
            name: member.name,
            jobTitle: member.jobTitle,
            image: member.image,
            description: member.description,
        };
        if (member.sameAs?.length) {
            personEntry.sameAs = member.sameAs;
        }
        graph.push(personEntry);
    });

    partners.forEach((partner) => {
        const partnerEntry: any = {
            '@type': 'Organization',
            name: partner.name,
            url: partner.url,
            logo: partner.logo,
            description: partner.description,
        };
        if (partner.sameAs?.length) {
            partnerEntry.sameAs = partner.sameAs;
        }
        if (partner.since) {
            partnerEntry.founded = partner.since;
        }
        graph.push(partnerEntry);
    });

    return JSON.stringify(
        {
            '@context': 'https://schema.org',
            '@graph': graph,
        },
        null,
        2,
    );
};

const main = async () => {
    await loadEnvFile();
    const config = (await import('../payload.config.ts')).default;
    const payload = await getPayload({ config });

    // 1. Get Media IDs
    const carlosPhotoId = await ensureMedia(
        payload,
        'Carlos Gavela, Founder and Senior IT Specialist at Loading Happiness',
        'carlos-gavela-loadinghappiness.jpg',
    );
    const luminaPhotoId = await ensureMedia(
        payload,
        'Lumina, AI Research & Knowledge Partner at Loading Happiness',
        'lumina-ai-knowledge-loadinghappiness.jpg',
    );
    const amLogoId = await ensureMedia(payload, 'AM & Associados logo', 'am-associados-logo.png');
    const mgamLogoId = await ensureMedia(payload, 'MGAM Legal logo', 'mgam-legal-logo.png');

    // 2. Upsert Team Members
    const carlos = await upsertCollectionItem(payload, 'team-members', 'name', 'Carlos Gavela', {
        name: 'Carlos Gavela',
        roleTitle: 'Founder & Senior IT Specialist',
        oneLiner: 'Technology should be an invisible engine for growth, not a source of stress.',
        bio: 'With over 25 years of experience guiding infrastructure, security, and operations, Carlos founded Loading Happiness to give Portuguese SMEs predictable, senior-led IT. He keeps the focus on accountability, documentation, and calm delivery.',
        photo: carlosPhotoId,
        avatarType: 'photo',
        tags: [{ text: 'Infrastructure' }, { text: 'Security' }, { text: 'Strategy' }],
        links: {
            linkedinUrl: 'https://linkedin.com/in/carlosgavela',
            email: 'carlos@loadinghappiness.com',
            websiteUrl: 'https://loadinghappiness.com',
            githubUrl: 'https://github.com/loadinghappiness',
        }
    });

    const lumina = await upsertCollectionItem(payload, 'team-members', 'name', 'Lumina', {
        name: 'Lumina',
        roleTitle: 'AI Research & Knowledge Partner',
        oneLiner: 'Accelerating complexity into clarity.',
        bio: 'Lumina assists research, documentation, and process acceleration. Final accountability remains human—senior specialists own every decision, while Lumina informs the signals.',
        photo: luminaPhotoId,
        avatarType: 'gradient',
        tags: [{ text: 'AI Operations' }, { text: 'Knowledge Management' }, { text: 'Automation' }],
        links: {
            websiteUrl: 'https://loadinghappiness.com/news/introducing-lumina'
        }
    });

    // 3. Upsert Trusted Partners
    const amAssociados = await upsertCollectionItem(payload, 'trusted-partners', 'companyName', 'AM & Associados', {
        companyName: 'AM & Associados',
        category: 'Accounting',
        specialtyLine: 'Specialized in fiscal strategy and corporate transparency for growing businesses.',
        trustedSince: '2016',
        logo: amLogoId,
        links: {
            websiteUrl: 'https://amassociados.pt',
            email: 'info@amassociados.pt'
        }
    });

    const mgamLegal = await upsertCollectionItem(payload, 'trusted-partners', 'companyName', 'MGAM Legal', {
        companyName: 'MGAM Legal',
        category: 'Legal',
        specialtyLine: 'Expert counsel on digital contracts, GDPR compliance, and Portuguese corporate law.',
        trustedSince: '2018',
        logo: mgamLogoId,
        links: {
            websiteUrl: 'https://mgamlegal.pt',
            linkedinUrl: 'https://linkedin.com/company/mgamlegal'
        }
    });

    const schemaMembers: MemberSchema[] = [
        {
            name: carlos.name,
            jobTitle: carlos.roleTitle,
            image: `${BASE_URL}/images/carlos-gavela-loadinghappiness.jpg`,
            description: carlos.bio,
            sameAs: [
                carlos.links?.linkedinUrl,
                carlos.links?.websiteUrl,
                carlos.links?.githubUrl,
            ].filter(Boolean) as string[],
        },
        {
            name: lumina.name,
            jobTitle: lumina.roleTitle,
            image: `${BASE_URL}/images/lumina-ai-knowledge-loadinghappiness.jpg`,
            description: lumina.bio,
            sameAs: [lumina.links?.websiteUrl].filter(Boolean) as string[],
        },
    ];

    const schemaPartners: PartnerSchema[] = [
        {
            name: amAssociados.companyName,
            url: amAssociados.links?.websiteUrl || 'https://amassociados.pt',
            logo: `${BASE_URL}/images/am-associados-logo.png`,
            description: amAssociados.specialtyLine,
            sameAs: [amAssociados.links?.websiteUrl].filter(Boolean) as string[],
            since: amAssociados.trustedSince,
        },
        {
            name: mgamLegal.companyName,
            url: mgamLegal.links?.websiteUrl || 'https://mgamlegal.pt',
            logo: `${BASE_URL}/images/mgam-legal-logo.png`,
            description: mgamLegal.specialtyLine,
            sameAs: [mgamLegal.links?.websiteUrl, mgamLegal.links?.linkedinUrl].filter(Boolean) as string[],
            since: mgamLegal.trustedSince,
        },
    ];

    // 4. Upsert Team Page
    const teamPageUrl = `${BASE_URL}/team`;
    const schemaOrgEn = buildSchemaOrg({
        pageTitle: 'Team - Loading Happiness',
        pageUrl: teamPageUrl,
        locale: 'en',
        members: schemaMembers,
        partners: schemaPartners,
    });
    const schemaOrgPt = buildSchemaOrg({
        pageTitle: 'Equipa - Loading Happiness',
        pageUrl: teamPageUrl,
        locale: 'pt',
        members: schemaMembers,
        partners: schemaPartners,
    });

    const heroEn = {
        blockType: 'hero',
        variant: 'D',
        theme: 'brandGradient',
        eyebrow: 'SENIOR MINDS. SMALL TEAM.',
        h1Title: 'Team',
        heading: 'Team',
        subheadline: 'Senior minds. Small team. Real accountability.',
        subheading: 'Direct access to senior expertise — no ticket ping-pong. We stay close to delivery so decisions are fast, clear, and accountable.',
        quote: 'Direct access to senior expertise — no ticket ping-pong.',
        primaryCTA: { label: 'Work with us', link: '/contact' },
        secondaryCTA: { label: 'View impact', link: '/impact' },
        heroImage: carlosPhotoId,
    };

    const teamContentEn = {
        title: 'Team',
        status: 'published' as const,
        layout: [
            heroEn,
            {
                blockType: 'coreTeam',
                anchorId: 'core-team',
                title: 'Core Team',
                intro: 'We stay close to delivery so decisions stay fast, clear, and accountable.',
                members: [carlos.id, lumina.id],
            },
            {
                blockType: 'partnersGroup',
                anchorId: 'partners',
                title: 'Trusted Partners',
                intro: 'Specialized support brought in when precision matters — finance and legal.',
                partners: [amAssociados.id, mgamLegal.id],
            },
        ],
        seo: {
            title: 'Our Team | Loading Happiness',
            description: 'Meet the experts behind Loading Happiness. Senior IT specialists and strategic partners dedicated to SME growth.',
            schemaOrg: schemaOrgEn,
        },
    };

    const heroPt = {
        blockType: 'hero',
        variant: 'D',
        theme: 'brandGradient',
        eyebrow: 'MENTES SÉNIORES. EQUIPA PEQUENA.',
        h1Title: 'Equipa',
        heading: 'Equipa',
        subheadline: 'Mentes séniores. Equipa pequena. Responsabilidade real.',
        subheading: 'Acesso direto a especialistas séniores — sem demoras. Mantemo-nos próximos da entrega para que as decisões sejam rápidas, claras e responsáveis.',
        quote: 'Acesso direto a especialistas séniores — sem demoras.',
        primaryCTA: { label: 'Trabalhe connosco', link: '/contact' },
        secondaryCTA: { label: 'Ver impacto', link: '/impact' },
        heroImage: carlosPhotoId,
    };

    const teamContentPt = {
        title: 'Equipa',
        status: 'published' as const,
        layout: [
            heroPt,
            {
                blockType: 'coreTeam',
                anchorId: 'equipa-principal',
                title: 'Equipa Principal',
                intro: 'Mantemo-nos próximos da entrega para garantir que cada solução é fiável e entregue com excelência.',
                members: [carlos.id, lumina.id],
            },
            {
                blockType: 'partnersGroup',
                anchorId: 'parceiros',
                title: 'Parceiros de Confiança',
                intro: 'Suporte especializado para quando a precisão é crítica — finanças e jurídico.',
                partners: [amAssociados.id, mgamLegal.id],
            },
        ],
        seo: {
            title: 'A Nossa Equipa | Loading Happiness',
            description: 'Conheça os especialistas por trás da Loading Happiness. Mentes séniores e parceiros estratégicos focados no seu negócio.',
            schemaOrg: schemaOrgPt,
        },
    };

    await upsertPage(payload, 'team', teamContentEn, teamContentPt);

    // 5. Update Site Settings (Menus)
    const headerLinksEn = [
        { label: 'Services', href: '/services', type: 'link' as const },
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
                { label: 'Our Team', href: '/team', description: 'Senior minds. Small team. Real accountability.' },
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
                { label: 'A Nossa Equipa', href: '/team', description: 'Mentes séniores. Equipa pequena. Responsabilidade real.' },
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

    console.log('✅ Team page and Site Menu updated successfully!');
    process.exit(0);
};

main().catch(err => {
    console.error(err);
    process.exit(1);
});
