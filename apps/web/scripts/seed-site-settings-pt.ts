/**
 * Seed script to populate site settings with Portuguese translations
 * Run with: npm run seed:site-settings-pt
 */

import { getPayloadClient } from '../src/lib/payload';

async function seedSiteSettingsPT() {
    const payload = await getPayloadClient();

    console.log('🌱 Seeding site settings with Portuguese translations...');

    try {
        // Update site settings with Portuguese content
        await payload.updateGlobal({
            slug: 'site-settings',
            locale: 'pt',
            data: {
                header: {
                    logoAlt: 'Loading Happiness',
                    links: [
                        {
                            label: 'Serviços',
                            href: '/services',
                            type: 'dropdown',
                            items: [
                                {
                                    label: 'IT Gerida & Helpdesk',
                                    href: '/services/managed-it',
                                    description: 'Resposta rápida, manutenção proativa.',
                                },
                                {
                                    label: 'Baseline de Cibersegurança',
                                    href: '/services/cybersecurity',
                                    description: 'Controlos que reduzem o risco real.',
                                },
                                {
                                    label: 'Microsoft 365 & Cloud',
                                    href: '/services/m365-cloud',
                                    description: 'Governança, identidade, migrações.',
                                },
                                {
                                    label: 'Rede & Conectividade',
                                    href: '/services/networking',
                                    description: 'Wi-Fi, segmentação, VPN, monitorização.',
                                },
                                {
                                    label: 'Infraestrutura & Virtualização',
                                    href: '/services/infrastructure',
                                    description: 'Armazenamento, backups, testes de recuperação.',
                                },
                                {
                                    label: 'Estratégia & Roadmaps',
                                    href: '/services/strategy-roadmaps',
                                    description: 'Plano prático de 12–24 meses.',
                                },
                            ],
                        },
                        { label: 'Notícias', href: '/news' },
                        { label: 'Impacto', href: '/impact' },
                        {
                            label: 'Sobre',
                            href: '/about',
                            type: 'dropdown',
                            items: [
                                {
                                    label: 'Visão geral da empresa',
                                    href: '/about#company-overview',
                                    description: 'Estabilidade, segurança, clareza a longo prazo.',
                                },
                                {
                                    label: 'Filosofia & valores',
                                    href: '/about#philosophy-values',
                                    description: 'Clareza humana + disciplina técnica.',
                                },
                                {
                                    label: 'Parceria',
                                    href: '/about#partnership',
                                    description: 'O que obtém e o que precisamos.',
                                },
                                {
                                    label: 'Nossa abordagem',
                                    href: '/about#our-approach',
                                    description: 'Avaliar → estabilizar → evoluir.',
                                },
                                {
                                    label: 'Por que nos escolher',
                                    href: '/about#why-choose-us',
                                    description: 'Decisões seniores, neutro em fornecedores.',
                                },
                                {
                                    label: 'Nossa equipa',
                                    href: '/about#our-team',
                                    description: 'Núcleo sénior + rede de confiança.',
                                },
                            ],
                        },
                        { label: 'Contacto', href: '/contact' },
                    ],
                    cta: {
                        label: 'Marcar Chamada',
                        href: '/contact',
                    },
                    topBar: {
                        enabled: true,
                        businessHoursOnly: true,
                        text: 'Precisa de ajuda urgente?',
                        linkLabel: 'Contacte-nos agora',
                        linkHref: '/contact',
                    },
                },
                footer: {
                    logoAlt: 'Loading Happiness',
                    tagline: 'Tecnologia com coração humano.',
                    aboutText:
                        'IT confiável, segurança clara e suporte calmo para equipas que valorizam estabilidade.',
                    contact: {
                        location: 'Portugal',
                        hours: 'Seg–Sex, 9–18',
                        note: 'Estamos sediados em Portugal, orgulhosamente a apoiar equipas em toda a Europa.',
                    },
                    newsletter: {
                        title: 'Newsletter',
                        text: 'Insights curtos e práticos sobre segurança, estabilidade e operações calmas.',
                        placeholder: 'O seu endereço de email',
                        buttonText: 'Subscrever',
                        formAction: '/api/newsletter',
                    },
                    awardsTitle: 'Prémios',
                    columns: [
                        {
                            title: 'Serviços',
                            links: [
                                { label: 'IT Gerida', href: '/services/managed-it' },
                                { label: 'Cibersegurança', href: '/services/cybersecurity' },
                                { label: 'Cloud & M365', href: '/services/m365-cloud' },
                                { label: 'Rede', href: '/services/networking' },
                            ],
                        },
                        {
                            title: 'Empresa',
                            links: [
                                { label: 'Sobre', href: '/about' },
                                { label: 'Impacto', href: '/impact' },
                                { label: 'Notícias', href: '/news' },
                                { label: 'Contacto', href: '/contact' },
                            ],
                        },
                    ],
                    legalLinks: [
                        { label: 'Privacidade', href: '/privacy' },
                        { label: 'Termos', href: '/terms' },
                        { label: 'Cookies', href: '/cookies' },
                    ],
                    bottomText: `© ${new Date().getFullYear()} Loading Happiness. Engenharia para Estabilidade.`,
                },
            },
        });

        console.log('✅ Site settings seeded successfully with Portuguese content!');
    } catch (error) {
        console.error('❌ Error seeding site settings:', error);
        throw error;
    }
}

// Run the seed function
seedSiteSettingsPT()
    .then(() => {
        console.log('🎉 Seeding complete!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Seeding failed:', error);
        process.exit(1);
    });
