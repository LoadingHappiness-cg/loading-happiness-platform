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
    return null; // For simplicity in this script, assume media exists or use null
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

const main = async () => {
    await loadEnvFile();
    const config = (await import('../payload.config.ts')).default;
    const payload = await getPayload({ config });

    // 1. Get Media IDs
    const carlosPhotoId = await ensureMedia(payload, 'About Story - Sintra Tech', 'about_story_sintra_tech_1767458550738.png');
    const luminaPhotoId = await ensureMedia(payload, 'About Hero - Technology with a human heart', 'about_hero_tech_human_heart_1767458537105.png');

    // 2. Upsert Team Members
    const carlos = await upsertCollectionItem(payload, 'team-members', 'name', 'Carlos Gavela', {
        name: 'Carlos Gavela',
        roleTitle: 'Founder & Senior IT Specialist',
        oneLiner: 'Technology should be an invisible engine for growth, not a source of stress.',
        bio: 'With over 25 years of experience in system architecture and IT operations, Carlos founded Loading Happiness to bring enterprise-grade maturity to small and medium businesses. He believes in clear communication and direct accountability.',
        photo: carlosPhotoId,
        avatarType: 'photo',
        tags: [{ text: 'Infrastructure' }, { text: 'Security' }, { text: 'Strategy' }],
        links: {
            linkedinUrl: 'https://linkedin.com/in/carlosgavela',
            email: 'carlos@loadinghappiness.com',
            websiteUrl: 'https://loadinghappiness.com'
        }
    });

    const lumina = await upsertCollectionItem(payload, 'team-members', 'name', 'Lumina', {
        name: 'Lumina',
        roleTitle: 'AI Research & Knowledge Partner',
        oneLiner: 'Accelerating complexity into clarity.',
        bio: 'Lumina assists in deep research, technical documentation, and process acceleration. While Lumina handles the high-velocity data processing, final accountability and human touch always remain with our senior specialists.',
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
        links: {
            websiteUrl: 'https://mgamlegal.pt',
            linkedinUrl: 'https://linkedin.com/company/mgamlegal'
        }
    });

    // 4. Upsert Team Page
    const teamContentEn = {
        title: 'Team',
        status: 'published' as const,
        layout: [
            {
                blockType: 'hero',
                variant: 'D',
                theme: 'brandGradient',
                eyebrow: 'SENIOR MINDS. SMALL TEAM.',
                h1Title: 'The people behind the accountability.',
                heading: 'The people behind the accountability.',
                subheadline: 'Direct access to senior expertise — no ticket ping-pong. We stay close to delivery so decisions are fast, clear, and accountable.',
                subheading: 'Direct access to senior expertise — no ticket ping-pong. We stay close to delivery so decisions are fast, clear, and accountable.',
                primaryCTA: { label: 'Talk to us', link: '/contact' },
                secondaryCTA: { label: 'Explore Impact', link: '/impact' },
                heroImage: carlosPhotoId,
            },
            {
                blockType: 'coreTeam',
                anchorId: 'core-team',
                title: 'Core Team',
                intro: 'We stay close to the work to ensure every solution is grounded in reality and delivered with excellence.',
                members: [carlos.id, lumina.id]
            },
            {
                blockType: 'partnersGroup',
                anchorId: 'partners',
                title: 'Trusted Partners',
                intro: 'Specialized support brought in when precision matters — finance and legal.',
                partners: [amAssociados.id, mgamLegal.id]
            }
        ],
        seo: {
            title: 'Our Team | Loading Happiness',
            description: 'Meet the experts behind Loading Happiness. Senior IT specialists and strategic partners dedicated to SME growth.',
            schemaOrg: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Team - Loading Happiness",
                "mainEntity": {
                    "@type": "Organization",
                    "name": "Loading Happiness",
                    "employee": [
                        {
                            "@type": "Person",
                            "name": "Carlos Gavela",
                            "jobTitle": "Founder & Senior IT Specialist",
                            "sameAs": ["https://linkedin.com/in/carlosgavela"]
                        },
                        {
                            "@type": "Person",
                            "name": "Lumina",
                            "jobTitle": "AI & Knowledge Partner"
                        }
                    ]
                }
            }, null, 2)
        }
    };

    const teamContentPt = {
        title: 'Equipa',
        status: 'published' as const,
        layout: [
            {
                blockType: 'hero',
                variant: 'D',
                theme: 'brandGradient',
                eyebrow: 'MENTES SÉNIORES. EQUIPA PEQUENA.',
                h1Title: 'As pessoas por trás da responsabilidade.',
                heading: 'As pessoas por trás da responsabilidade.',
                subheadline: 'Acesso direto a especialistas — sem demoras. Mantemo-nos próximos da entrega para que as decisões sejam rápidas e claras.',
                subheading: 'Acesso direto a especialistas — sem demoras. Mantemo-nos próximos da entrega para que as decisões sejam rápidas e claras.',
                primaryCTA: { label: 'Fale connosco', link: '/contact' },
                secondaryCTA: { label: 'Ver Impacto', link: '/impact' },
                heroImage: carlosPhotoId,
            },
            {
                blockType: 'coreTeam',
                anchorId: 'equipa-principal',
                title: 'Equipa Principal',
                intro: 'Mantemo-nos próximos do trabalho para garantir que cada solução é fiável e entregue com excelência.',
                members: [carlos.id, lumina.id]
            },
            {
                blockType: 'partnersGroup',
                anchorId: 'parceiros',
                title: 'Parceiros de Confiança',
                intro: 'Suporte especializado para quando a precisão é crítica — finanças e jurídico.',
                partners: [amAssociados.id, mgamLegal.id]
            }
        ],
        seo: {
            title: 'A Nossa Equipa | Loading Happiness',
            description: 'Conheça os especialistas por trás da Loading Happiness. Mentes séniores e parceiros estratégicos focados no seu negócio.',
        }
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
