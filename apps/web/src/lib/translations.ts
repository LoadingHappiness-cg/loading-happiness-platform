/**
 * Translation system for Loading Happiness Platform
 * 
 * This module provides a type-safe translation system with support for:
 * - Portuguese (pt) and English (en)
 * - Nested translation keys
 * - Interpolation
 */

export type Locale = 'pt' | 'en';

export type TranslationKey =
    | 'common.loading'
    | 'common.error'
    | 'common.success'
    | 'common.readMore'
    | 'common.learnMore'
    | 'common.viewAll'
    | 'common.allServices'
    | 'nav.services'
    | 'nav.news'
    | 'nav.impact'
| 'nav.about'
| 'nav.contact'
| 'nav.bookCall'
| 'nav.about.ourStory'
| 'nav.about.ourStoryDescription'
| 'nav.about.whyLoadingHappiness'
| 'nav.about.whyLoadingHappinessDescription'
| 'nav.about.philosophy'
| 'nav.about.philosophyDescription'
| 'nav.about.values'
| 'nav.about.valuesDescription'
| 'nav.about.whatToExpect'
| 'nav.about.whatToExpectDescription'
| 'nav.about.team'
| 'nav.about.teamDescription'
    | 'hero.fallback.heading'
    | 'hero.fallback.subheading'
    | 'hero.fallback.primaryCta'
    | 'hero.fallback.secondaryCta'
    | 'home.servicesHeading'
    | 'home.latestInsights'
    | 'home.ctaHeading'
    | 'home.ctaSubheading'
    | 'home.ctaPrimary'
    | 'home.ctaSecondary'
    | 'news.featuredPrimary'
    | 'news.featuredSecondary'
    | 'news.allArticles'
    | 'news.searchPlaceholder'
    | 'news.clearFilters'
    | 'news.readMore'
| 'services.managedIt.title'
| 'services.managedIt.description'
| 'services.cybersecurity.title'
| 'services.cybersecurity.description'
| 'services.cloud.title'
| 'services.cloud.description'
| 'services.networking.title'
| 'services.networking.description'
| 'services.infrastructure.title'
| 'services.infrastructure.description'
| 'services.strategyRoadmaps.title'
| 'services.strategyRoadmaps.description'
| 'services.backupContinuity.title'
| 'services.backupContinuity.description'
| 'services.projectsProcurement.title'
| 'services.projectsProcurement.description'
| 'services.complianceGdpr.title'
| 'services.complianceGdpr.description'
| 'services.customSoftware.title'
| 'services.customSoftware.description'
    | 'services.overview.metaTitle'
    | 'services.overview.metaDescription'
    | 'services.overview.hero.title'
    | 'services.overview.hero.subtitle'
    | 'services.overview.hero.primaryCta'
    | 'services.overview.hero.secondaryCta'
    | 'services.overview.trust.one'
    | 'services.overview.trust.two'
    | 'services.overview.trust.three'
    | 'services.overview.trust.four'
    | 'services.overview.trust.five'
    | 'services.overview.cards.cta'
    | 'services.overview.who.title'
    | 'services.overview.who.subtitle'
    | 'services.overview.who.fit'
    | 'services.overview.who.seg1'
    | 'services.overview.who.seg2'
    | 'services.overview.who.seg3'
    | 'services.overview.approach.title'
    | 'services.overview.approach.step1.title'
    | 'services.overview.approach.step1.desc'
    | 'services.overview.approach.step2.title'
    | 'services.overview.approach.step2.desc'
    | 'services.overview.approach.step3.title'
    | 'services.overview.approach.step3.desc'
    | 'services.overview.approach.step4.title'
    | 'services.overview.approach.step4.desc'
    | 'services.overview.outcomes.title'
    | 'services.overview.outcomes.one'
    | 'services.overview.outcomes.two'
    | 'services.overview.outcomes.three'
    | 'services.overview.outcomes.four'
    | 'services.overview.outcomes.five'
    | 'services.overview.outcomes.six'
    | 'services.overview.social.title'
    | 'services.overview.social.body'
    | 'services.overview.social.link'
    | 'services.overview.faq.title'
    | 'services.overview.faq.q1'
    | 'services.overview.faq.a1'
    | 'services.overview.faq.q2'
    | 'services.overview.faq.a2'
    | 'services.overview.faq.q3'
    | 'services.overview.faq.a3'
    | 'services.overview.faq.q4'
    | 'services.overview.faq.a4'
    | 'services.overview.faq.q5'
    | 'services.overview.faq.a5'
    | 'services.overview.faq.q6'
    | 'services.overview.faq.a6'
    | 'services.overview.final.title'
    | 'services.overview.final.subtitle'
    | 'services.overview.final.primaryCta'
    | 'services.overview.final.secondaryCta'
    | 'services.overview.final.note'
    | 'services.customSoftware.metaTitle'
    | 'services.customSoftware.metaDescription'
    | 'services.customSoftware.hero.title'
    | 'services.customSoftware.hero.subtitle'
    | 'services.customSoftware.hero.primaryCta'
    | 'services.customSoftware.hero.secondaryCta'
    | 'services.customSoftware.pillars.title'
    | 'services.customSoftware.pillars.one'
    | 'services.customSoftware.pillars.two'
    | 'services.customSoftware.pillars.three'
    | 'services.customSoftware.projects.title'
    | 'services.customSoftware.projects.envia.title'
    | 'services.customSoftware.projects.envia.desc'
    | 'services.customSoftware.projects.envia.b1'
    | 'services.customSoftware.projects.envia.b2'
    | 'services.customSoftware.projects.envia.b3'
    | 'services.customSoftware.projects.gs1.title'
    | 'services.customSoftware.projects.gs1.desc'
    | 'services.customSoftware.projects.gs1.b1'
    | 'services.customSoftware.projects.gs1.b2'
    | 'services.customSoftware.projects.gs1.b3'
    | 'services.customSoftware.integrations.title'
    | 'services.customSoftware.integrations.desc'
    | 'services.customSoftware.integrations.b1'
    | 'services.customSoftware.integrations.b2'
| 'services.customSoftware.integrations.b3'
| 'services.customSoftware.process.title'
| 'services.customSoftware.process.s1'
| 'services.customSoftware.process.s2'
| 'services.customSoftware.process.s3'
| 'services.customSoftware.process.s4'
| 'services.customSoftware.faq.title'
| 'services.customSoftware.faq.q1'
| 'services.customSoftware.faq.a1'
| 'services.customSoftware.faq.q2'
| 'services.customSoftware.faq.a2'
| 'services.customSoftware.faq.q3'
| 'services.customSoftware.faq.a3'
| 'services.customSoftware.faq.q4'
| 'services.customSoftware.faq.a4'
| 'services.customSoftware.final.title'
| 'services.customSoftware.final.subtitle'
| 'services.customSoftware.final.primaryCta'
| 'services.customSoftware.final.secondaryCta'
| 'services.customSoftware.final.note'
| 'services.common.steps.assess.title'
| 'services.common.steps.assess.desc'
| 'services.common.steps.stabilize.title'
| 'services.common.steps.stabilize.desc'
| 'services.common.steps.improve.title'
| 'services.common.steps.improve.desc'
| 'services.common.steps.protect.title'
| 'services.common.steps.protect.desc'
| 'services.managedIt.metaTitle'
| 'services.managedIt.metaDescription'
| 'services.managedIt.heroTitle'
| 'services.managedIt.heroSubtitle'
| 'services.managedIt.problems.one'
| 'services.managedIt.problems.two'
| 'services.managedIt.problems.three'
| 'services.managedIt.problems.four'
| 'services.managedIt.problems.five'
| 'services.managedIt.what.core.title'
| 'services.managedIt.what.core.desc'
| 'services.managedIt.what.security.title'
| 'services.managedIt.what.security.desc'
| 'services.managedIt.what.ops.title'
| 'services.managedIt.what.ops.desc'
| 'services.managedIt.deliverables.one'
| 'services.managedIt.deliverables.two'
| 'services.managedIt.deliverables.three'
| 'services.managedIt.deliverables.four'
| 'services.managedIt.faq.q1'
| 'services.managedIt.faq.a1'
| 'services.managedIt.faq.q2'
| 'services.managedIt.faq.a2'
| 'services.managedIt.faq.q3'
| 'services.managedIt.faq.a3'
| 'services.managedIt.faq.q4'
| 'services.managedIt.faq.a4'
| 'services.managedIt.faq.q5'
| 'services.managedIt.faq.a5'
| 'services.managedIt.faq.q6'
| 'services.managedIt.faq.a6'
| 'services.managedIt.final.title'
| 'services.managedIt.final.subtitle'
| 'services.cybersecurity.metaTitle'
| 'services.cybersecurity.metaDescription'
| 'services.cybersecurity.heroTitle'
| 'services.cybersecurity.heroSubtitle'
| 'services.cybersecurity.problems.one'
| 'services.cybersecurity.problems.two'
| 'services.cybersecurity.problems.three'
| 'services.cybersecurity.problems.four'
| 'services.cybersecurity.problems.five'
| 'services.cybersecurity.what.core.title'
| 'services.cybersecurity.what.core.desc'
| 'services.cybersecurity.what.security.title'
| 'services.cybersecurity.what.security.desc'
| 'services.cybersecurity.what.ops.title'
| 'services.cybersecurity.what.ops.desc'
| 'services.cybersecurity.deliverables.one'
| 'services.cybersecurity.deliverables.two'
| 'services.cybersecurity.deliverables.three'
| 'services.cybersecurity.deliverables.four'
| 'services.cybersecurity.layers.title'
| 'services.cybersecurity.layers.one'
| 'services.cybersecurity.layers.two'
| 'services.cybersecurity.layers.three'
| 'services.cybersecurity.layers.four'
| 'services.cybersecurity.layers.five'
| 'services.cybersecurity.faq.q1'
| 'services.cybersecurity.faq.a1'
| 'services.cybersecurity.faq.q2'
| 'services.cybersecurity.faq.a2'
| 'services.cybersecurity.faq.q3'
| 'services.cybersecurity.faq.a3'
| 'services.cybersecurity.faq.q4'
| 'services.cybersecurity.faq.a4'
| 'services.cybersecurity.faq.q5'
| 'services.cybersecurity.faq.a5'
| 'services.cybersecurity.faq.q6'
| 'services.cybersecurity.faq.a6'
| 'services.cybersecurity.final.title'
| 'services.cybersecurity.final.subtitle'
| 'services.cloud.metaTitle'
| 'services.cloud.metaDescription'
| 'services.cloud.heroTitle'
| 'services.cloud.heroSubtitle'
| 'services.cloud.problems.one'
| 'services.cloud.problems.two'
| 'services.cloud.problems.three'
| 'services.cloud.problems.four'
| 'services.cloud.what.core.title'
| 'services.cloud.what.core.desc'
| 'services.cloud.what.security.title'
| 'services.cloud.what.security.desc'
| 'services.cloud.what.ops.title'
| 'services.cloud.what.ops.desc'
| 'services.cloud.deliverables.one'
| 'services.cloud.deliverables.two'
| 'services.cloud.deliverables.three'
| 'services.cloud.deliverables.four'
| 'services.cloud.feature.title'
| 'services.cloud.feature.one'
| 'services.cloud.feature.two'
| 'services.cloud.feature.three'
| 'services.cloud.feature.four'
| 'services.cloud.faq.q1'
| 'services.cloud.faq.a1'
| 'services.cloud.faq.q2'
| 'services.cloud.faq.a2'
| 'services.cloud.faq.q3'
| 'services.cloud.faq.a3'
| 'services.cloud.faq.q4'
| 'services.cloud.faq.a4'
| 'services.cloud.faq.q5'
| 'services.cloud.faq.a5'
| 'services.cloud.final.title'
| 'services.cloud.final.subtitle'
| 'services.networking.metaTitle'
| 'services.networking.metaDescription'
| 'services.networking.heroTitle'
| 'services.networking.heroSubtitle'
| 'services.networking.problems.one'
| 'services.networking.problems.two'
| 'services.networking.problems.three'
| 'services.networking.problems.four'
| 'services.networking.what.core.title'
| 'services.networking.what.core.desc'
| 'services.networking.what.security.title'
| 'services.networking.what.security.desc'
| 'services.networking.what.ops.title'
| 'services.networking.what.ops.desc'
| 'services.networking.deliverables.one'
| 'services.networking.deliverables.two'
| 'services.networking.deliverables.three'
| 'services.networking.deliverables.four'
| 'services.networking.feature.title'
| 'services.networking.feature.one'
| 'services.networking.feature.two'
| 'services.networking.feature.three'
| 'services.networking.faq.q1'
| 'services.networking.faq.a1'
| 'services.networking.faq.q2'
| 'services.networking.faq.a2'
| 'services.networking.faq.q3'
| 'services.networking.faq.a3'
| 'services.networking.faq.q4'
| 'services.networking.faq.a4'
| 'services.networking.faq.q5'
| 'services.networking.faq.a5'
| 'services.networking.final.title'
| 'services.networking.final.subtitle'
| 'services.backup.metaTitle'
| 'services.backup.metaDescription'
| 'services.backup.heroTitle'
| 'services.backup.heroSubtitle'
| 'services.backup.problems.one'
| 'services.backup.problems.two'
| 'services.backup.problems.three'
| 'services.backup.problems.four'
| 'services.backup.what.core.title'
| 'services.backup.what.core.desc'
| 'services.backup.what.security.title'
| 'services.backup.what.security.desc'
| 'services.backup.what.ops.title'
| 'services.backup.what.ops.desc'
| 'services.backup.deliverables.one'
| 'services.backup.deliverables.two'
| 'services.backup.deliverables.three'
| 'services.backup.deliverables.four'
| 'services.backup.feature.title'
| 'services.backup.feature.one'
| 'services.backup.feature.two'
| 'services.backup.faq.q1'
| 'services.backup.faq.a1'
| 'services.backup.faq.q2'
| 'services.backup.faq.a2'
| 'services.backup.faq.q3'
| 'services.backup.faq.a3'
| 'services.backup.faq.q4'
| 'services.backup.faq.a4'
| 'services.backup.faq.q5'
| 'services.backup.faq.a5'
| 'services.backup.final.title'
| 'services.backup.final.subtitle'
| 'services.projects.metaTitle'
| 'services.projects.metaDescription'
| 'services.projects.heroTitle'
| 'services.projects.heroSubtitle'
| 'services.projects.problems.one'
| 'services.projects.problems.two'
| 'services.projects.problems.three'
| 'services.projects.problems.four'
| 'services.projects.what.core.title'
| 'services.projects.what.core.desc'
| 'services.projects.what.security.title'
| 'services.projects.what.security.desc'
| 'services.projects.what.ops.title'
| 'services.projects.what.ops.desc'
| 'services.projects.deliverables.one'
| 'services.projects.deliverables.two'
| 'services.projects.deliverables.three'
| 'services.projects.deliverables.four'
| 'services.projects.feature.title'
| 'services.projects.feature.one'
| 'services.projects.feature.two'
| 'services.projects.feature.three'
| 'services.projects.faq.q1'
| 'services.projects.faq.a1'
| 'services.projects.faq.q2'
| 'services.projects.faq.a2'
| 'services.projects.faq.q3'
| 'services.projects.faq.a3'
| 'services.projects.faq.q4'
| 'services.projects.faq.a4'
| 'services.projects.faq.q5'
| 'services.projects.faq.a5'
| 'services.projects.final.title'
| 'services.projects.final.subtitle'
| 'services.compliance.metaTitle'
| 'services.compliance.metaDescription'
| 'services.compliance.heroTitle'
| 'services.compliance.heroSubtitle'
| 'services.compliance.problems.one'
| 'services.compliance.problems.two'
| 'services.compliance.problems.three'
| 'services.compliance.problems.four'
| 'services.compliance.what.core.title'
| 'services.compliance.what.core.desc'
| 'services.compliance.what.security.title'
| 'services.compliance.what.security.desc'
| 'services.compliance.what.ops.title'
| 'services.compliance.what.ops.desc'
| 'services.compliance.deliverables.one'
| 'services.compliance.deliverables.two'
| 'services.compliance.deliverables.three'
| 'services.compliance.deliverables.four'
| 'services.compliance.feature.title'
| 'services.compliance.feature.one'
| 'services.compliance.feature.two'
| 'services.compliance.feature.three'
| 'services.compliance.faq.q1'
| 'services.compliance.faq.a1'
| 'services.compliance.faq.q2'
| 'services.compliance.faq.a2'
| 'services.compliance.faq.q3'
| 'services.compliance.faq.a3'
| 'services.compliance.faq.q4'
| 'services.compliance.faq.a4'
| 'services.compliance.final.title'
| 'services.compliance.final.subtitle'
    | 'contact.hero.badge'
    | 'contact.hero.title'
    | 'contact.hero.subtitle'
    | 'contact.hero.point1'
    | 'contact.hero.point2'
    | 'contact.hero.point3'
    | 'contact.channels.title'
    | 'contact.channels.subtitle'
    | 'contact.channels.message.title'
    | 'contact.channels.message.desc'
    | 'contact.channels.call.title'
    | 'contact.channels.call.desc'
    | 'contact.channels.projects.title'
    | 'contact.channels.projects.desc'
    | 'contact.form.heading'
    | 'contact.form.subheading'
    | 'contact.form.name'
    | 'contact.form.company'
    | 'contact.form.companyOptional'
    | 'contact.form.email'
    | 'contact.form.workEmail'
    | 'contact.form.topic'
    | 'contact.form.urgency'
    | 'contact.form.urgencyNormal'
    | 'contact.form.urgencyUrgent'
    | 'contact.form.message'
    | 'contact.form.messagePlaceholder'
    | 'contact.form.submit'
    | 'contact.form.sending'
    | 'contact.form.success'
    | 'contact.form.error'
    | 'contact.expectations.title'
    | 'contact.expectations.item1'
    | 'contact.expectations.item2'
    | 'contact.expectations.item3'
    | 'contact.topics.managedIt'
    | 'contact.topics.cybersecurity'
    | 'contact.topics.cloud'
    | 'contact.topics.projects'
    | 'contact.topics.general'
    | 'footer.contactUs'
    | 'footer.newsletter'
    | 'footer.awards'
    | 'footer.tagline'
    | 'footer.about'
    | 'footer.location'
    | 'footer.hours'
    | 'footer.note'
    | 'footer.newsletterText'
    | 'footer.newsletterPlaceholder'
    | 'footer.newsletterButton'
    | 'footer.copyright'
    | 'footer.legal.privacy'
    | 'footer.legal.terms'
    | 'footer.legal.cookies';

const translations: Record<Locale, Record<TranslationKey, string>> = {
    pt: {
        // Common
        'common.loading': 'A carregar...',
        'common.error': 'Erro',
        'common.success': 'Sucesso',
        'common.readMore': 'Ler mais',
        'common.learnMore': 'Saber mais',
        'common.viewAll': 'Ver tudo',
        'common.allServices': 'Todos os serviços',

        // Navigation
        'nav.services': 'Serviços',
        'nav.news': 'Notícias',
        'nav.impact': 'Impacto',
        'nav.about': 'Sobre',
        'nav.contact': 'Contacto',
        'nav.bookCall': 'Marcar Chamada',
        'nav.about.ourStory': 'A nossa história',
        'nav.about.ourStoryDescription': 'De Sintra, com uma missão prática.',
        'nav.about.whyLoadingHappiness': 'Porquê "Loading Happiness"',
        'nav.about.whyLoadingHappinessDescription': 'Um nome que se tornou uma promessa.',
        'nav.about.philosophy': 'A nossa filosofia',
        'nav.about.philosophyDescription': 'Humana, clara e responsável.',
        'nav.about.values': 'Valores',
        'nav.about.valuesDescription': 'No que acreditamos.',
        'nav.about.whatToExpect': 'O que esperar',
        'nav.about.whatToExpectDescription': 'A segurança é a base.',
        'nav.about.team': 'A Nossa Equipa',
        'nav.about.teamDescription': 'Mentes séniores. Equipa pequena. Responsabilidade real.',

        // Hero fallback
        'hero.fallback.heading': 'Tecnologia com coração humano.',
        'hero.fallback.subheading': 'IT confiável, segurança clara e suporte que parece humano—para que o seu negócio possa focar-se no que importa.',
        'hero.fallback.primaryCta': 'Marcar chamada',
        'hero.fallback.secondaryCta': 'Explorar serviços',

        // Home page
        'home.servicesHeading': 'Fundações para estabilidade',
        'home.latestInsights': 'Últimas novidades',
        'home.ctaHeading': 'Pronto para operações de IT mais calmas?',
        'home.ctaSubheading': 'Vamos analisar o que está a quebrar o seu fluxo e criar um plano que funciona.',
        'home.ctaPrimary': 'Marcar chamada',
        'home.ctaSecondary': 'Enviar mensagem',

        // News
        'news.featuredPrimary': 'Notícia principal',
        'news.featuredSecondary': 'Destaques',
        'news.allArticles': 'Todos os artigos',
        'news.searchPlaceholder': 'Procurar artigos...',
        'news.clearFilters': 'Limpar filtros',
        'news.readMore': 'Ler artigo',

        // Services
        'services.managedIt.title': 'TI Gerida & Helpdesk',
        'services.managedIt.description': 'Operação estável, monitorização e respostas claras.',
        'services.cybersecurity.title': 'Cibersegurança pragmática',
        'services.cybersecurity.description': 'Hardening, identidade forte e backups testados.',
        'services.cloud.title': 'Microsoft 365 & Cloud',
        'services.cloud.description': 'Governança, migrações, identidade e licenciamento.',
        'services.networking.title': 'Redes & Wi-Fi',
        'services.networking.description': 'Cobertura fiável, segmentação e VPNs que funcionam.',
        'services.infrastructure.title': 'Infraestrutura e Virtualização',
        'services.infrastructure.description': 'Armazenamento, backups e testes de recuperação.',
        'services.strategyRoadmaps.title': 'Estratégia e Roadmaps',
        'services.strategyRoadmaps.description': 'Plano prático de 12–24 meses.',
        'services.backupContinuity.title': 'Backups & Continuidade',
        'services.backupContinuity.description': 'Backups 3-2-1, restauros testados e runbooks claros.',
        'services.projectsProcurement.title': 'Projetos & Procurement',
        'services.projectsProcurement.description': 'Planeamento, execução e compras com ROI.',
        'services.complianceGdpr.title': 'Compliance & GDPR',
        'services.complianceGdpr.description': 'Políticas, controlo técnico e evidências para clientes/auditorias.',
        'services.customSoftware.title': 'Software à Medida & Integrações',
        'services.customSoftware.description': 'Automação e integrações (ERP/SQL), EnviaSAFT, GS1-128.',

        // Services overview
        'services.overview.metaTitle': 'Serviços de TI para PME em Portugal | Loading Happiness',
        'services.overview.metaDescription':
            'Suporte e gestão de TI para PME: segurança, redes, Microsoft 365, backups e projetos. Tecnologia com um coração humano — prática, clara e sem promessas falsas.',
        'services.overview.hero.title': 'Serviços de TI para PME — estáveis, seguros e humanos.',
        'services.overview.hero.subtitle':
            'Resolvemos problemas reais, reduzimos risco e criamos espaço para o teu negócio crescer — sem jargão e sem promessas mágicas.',
        'services.overview.hero.primaryCta': 'Marcar conversa (15 min)',
        'services.overview.hero.secondaryCta': 'Pedir diagnóstico',
        'services.overview.trust.one': 'Foco em PME portuguesas',
        'services.overview.trust.two': 'Segurança e continuidade',
        'services.overview.trust.three': 'Open-source quando faz sentido',
        'services.overview.trust.four': 'Documentação e transparência',
        'services.overview.trust.five': 'Intervenções remotas e on-site',
        'services.overview.cards.cta': 'Ver detalhes',
        'services.overview.who.title': 'PME que precisam de TI previsível — não de drama.',
        'services.overview.who.subtitle':
            'Trabalhamos com equipas pequenas e médias que querem: estabilidade, segurança, suporte competente e decisões técnicas justificadas.',
        'services.overview.who.fit': 'Tipicamente ajudamos:',
        'services.overview.who.seg1': 'empresas de serviços (contabilidade, advocacia, consultoria)',
        'services.overview.who.seg2': 'retalho/distribuição (POS, etiquetas, logística)',
        'services.overview.who.seg3': 'operações com equipas híbridas/remotas',
        'services.overview.approach.title': 'O nosso método',
        'services.overview.approach.step1.title': 'Diagnóstico',
        'services.overview.approach.step1.desc': 'Inventário, riscos, pontos de falha, prioridades.',
        'services.overview.approach.step2.title': 'Estabilização',
        'services.overview.approach.step2.desc': 'Corrigir o que dói primeiro (segurança, backups, rede).',
        'services.overview.approach.step3.title': 'Melhoria',
        'services.overview.approach.step3.desc': 'Automatizar, documentar, reduzir custo e fricção.',
        'services.overview.approach.step4.title': 'Proteção',
        'services.overview.approach.step4.desc': 'Prevenção contínua, testes, revisões e resposta a incidentes.',
        'services.overview.outcomes.title': 'Resultados mensuráveis',
        'services.overview.outcomes.one': 'Menos paragens e menos surpresas',
        'services.overview.outcomes.two': 'Backups que restauram (não “existem”)',
        'services.overview.outcomes.three': 'Segurança com MFA, segmentação e políticas simples',
        'services.overview.outcomes.four': 'Custos previsíveis e decisões com base em dados',
        'services.overview.outcomes.five': 'Documentação útil (para não dependeres de “memória”)',
        'services.overview.outcomes.six': 'Operação remota eficaz + on-site quando necessário',
        'services.overview.social.title': 'Tecnologia com coração humano',
        'services.overview.social.body': 'Trabalhamos de forma responsável e transparente. Sem moralismo, mas com propósito claro: equipas calmas e impacto positivo.',
        'services.overview.social.link': 'Ver impacto',
        'services.overview.faq.title': 'Perguntas frequentes',
        'services.overview.faq.q1': 'Têm suporte 24/7?',
        'services.overview.faq.a1': 'Não. Trabalhamos com SLAs realistas e prevenção para reduzir urgências.',
        'services.overview.faq.q2': 'Fazem on-site?',
        'services.overview.faq.a2': 'Sim, quando o problema pede presença física.',
        'services.overview.faq.q3': 'Trabalham com soluções open-source?',
        'services.overview.faq.a3': 'Sim — quando é a escolha certa (não por ideologia).',
        'services.overview.faq.q4': 'Quanto custa?',
        'services.overview.faq.a4': 'Depende do estado atual e do nível de cobertura. Começa com diagnóstico.',
        'services.overview.faq.q5': 'Ajudam equipas híbridas?',
        'services.overview.faq.a5': 'Sim, com foco em acessos seguros, MFA e segmentação.',
        'services.overview.faq.q6': 'Cobrem M365 e rede?',
        'services.overview.faq.a6': 'Sim, cloud, rede, backups e segurança estão na mesma equipa.',
        'services.overview.final.title': 'Vamos pôr a tua TI a trabalhar a teu favor.',
        'services.overview.final.subtitle': 'Resolvemos o essencial, documentamos e criamos previsibilidade.',
        'services.overview.final.primaryCta': 'Marcar conversa',
        'services.overview.final.secondaryCta': 'Pedir diagnóstico',
        'services.overview.final.note': 'Resposta típica em 1–2 dias úteis.',

        // Custom software page
        'services.customSoftware.metaTitle': 'Software à medida para PME | Loading Happiness',
        'services.customSoftware.metaDescription':
            'Software à medida para PME em Portugal: EnviaSAFT, etiquetas GS1-128, integrações ERP e automação — prático, documentado e sustentável.',
        'services.customSoftware.hero.title': 'Software à medida para PME — prático, bem documentado e sustentável.',
        'services.customSoftware.hero.subtitle':
            'Criamos ferramentas que resolvem fricção operacional: compliance, logística, integrações e automação.',
        'services.customSoftware.hero.primaryCta': 'Quero discutir um caso',
        'services.customSoftware.hero.secondaryCta': 'Ver projetos',
        'services.customSoftware.pillars.title': 'Pilares',
        'services.customSoftware.pillars.one': 'Problema real primeiro — foco no que move o negócio.',
        'services.customSoftware.pillars.two': 'Entrega incremental — protótipos rápidos e ciclos curtos.',
        'services.customSoftware.pillars.three': 'Manutenção e documentação — nada de “herança” sem dono.',
        'services.customSoftware.projects.title': 'Projetos em destaque',
        'services.customSoftware.projects.envia.title': 'EnviaSAFT — compliance com clareza (open-source).',
        'services.customSoftware.projects.envia.desc':
            'Geração e validação SAF-T orientada a processos reais, com transparência sobre o que faz e porquê.',
        'services.customSoftware.projects.envia.b1': 'Base open-source com módulos avançados para contextos maiores.',
        'services.customSoftware.projects.envia.b2': 'Documentação clara: inputs, outputs, responsabilidades.',
        'services.customSoftware.projects.envia.b3': 'Integração com pipelines de validação e reporting.',
        'services.customSoftware.projects.gs1.title': 'Etiquetas GS1-128 — PDFs vetoriais ligados ao ERP.',
        'services.customSoftware.projects.gs1.desc':
            'Geração de etiquetas logísticas com dados do SQL/ERP, mantendo qualidade de impressão e flexibilidade.',
        'services.customSoftware.projects.gs1.b1': 'Códigos GS1-128 em SVG para máxima nitidez.',
        'services.customSoftware.projects.gs1.b2': 'Layout configurável e preparado para evoluções.',
        'services.customSoftware.projects.gs1.b3': 'Automação de batches e integração com processos de armazém.',
        'services.customSoftware.integrations.title': 'Integrações',
        'services.customSoftware.integrations.desc': 'ERPs, SQL, APIs e automação — pragmático e seguro.',
        'services.customSoftware.integrations.b1': 'Integração com ERPs e bases SQL.',
        'services.customSoftware.integrations.b2': 'APIs e automação para remover tarefas manuais.',
        'services.customSoftware.integrations.b3': 'Observabilidade básica para acompanhar uso e falhas.',
        'services.customSoftware.process.title': 'Processo',
        'services.customSoftware.process.s1': 'Discovery',
        'services.customSoftware.process.s2': 'Protótipo',
        'services.customSoftware.process.s3': 'Beta',
        'services.customSoftware.process.s4': 'Produção',
        'services.customSoftware.faq.title': 'FAQ de software',
        'services.customSoftware.faq.q1': 'Licenciamento?',
        'services.customSoftware.faq.a1': 'Modelo misto: open-source quando faz sentido e módulos privados quando exigido.',
        'services.customSoftware.faq.q2': 'Suporte e manutenção?',
        'services.customSoftware.faq.a2': 'Oferecemos planos de manutenção com SLAs realistas e documentação entregue.',
        'services.customSoftware.faq.q3': 'Hosting?',
        'services.customSoftware.faq.a3': 'Podemos entregar self-hosted ou gerir em cloud, conforme o contexto.',
        'services.customSoftware.faq.q4': 'Roadmap e evolução?',
        'services.customSoftware.faq.a4': 'Planeamos em conjunto, com entregas incrementais e testes contínuos.',
        'services.customSoftware.final.title': 'Vamos construir algo útil (e manter).',
        'services.customSoftware.final.subtitle': 'Sem teatro: escopo claro, entregas curtas e documentação.',
        'services.customSoftware.final.primaryCta': 'Quero discutir um caso',
        'services.customSoftware.final.secondaryCta': 'Pedir proposta',
        'services.customSoftware.final.note': 'Resposta típica em 1–2 dias úteis.',

        // Shared steps (used across service pages)
        'services.common.steps.assess.title': 'Diagnóstico',
        'services.common.steps.assess.desc': 'Inventário, risco e prioridades.',
        'services.common.steps.stabilize.title': 'Estabilização',
        'services.common.steps.stabilize.desc': 'Corrigir o que dói primeiro.',
        'services.common.steps.improve.title': 'Melhoria',
        'services.common.steps.improve.desc': 'Automatizar, documentar, reduzir fricção.',
        'services.common.steps.protect.title': 'Proteção',
        'services.common.steps.protect.desc': 'Prevenção contínua, testes e resposta.',

        // Managed IT
        'services.managedIt.metaTitle': 'Suporte e Gestão de TI para PME | Loading Happiness',
        'services.managedIt.metaDescription':
            'Suporte contínuo e gestão de TI para PME: prevenção, resposta rápida, documentação e previsibilidade. Sem jargão, sem promessas falsas.',
        'services.managedIt.heroTitle': 'Suporte e gestão de TI para PME — previsível, documentado, eficaz.',
        'services.managedIt.heroSubtitle':
            'Menos avarias, menos “apagões”, mais clareza. Mantemos a operação a funcionar e reduzimos risco ao longo do tempo.',
        'services.managedIt.problems.one': '“Tudo funciona… até deixar de funcionar”',
        'services.managedIt.problems.two': 'Equipamentos e contas sem controlo',
        'services.managedIt.problems.three': 'Incidentes repetidos sem causa-raiz',
        'services.managedIt.problems.four': 'Dependência de uma pessoa “que sabe as passwords”',
        'services.managedIt.problems.five': 'Falta de backups e planos simples',
        'services.managedIt.what.core.title': 'Suporte contínuo',
        'services.managedIt.what.core.desc': 'Remoto + on-site quando faz sentido.',
        'services.managedIt.what.security.title': 'Gestão preventiva',
        'services.managedIt.what.security.desc': 'Updates, health checks, inventário.',
        'services.managedIt.what.ops.title': 'Documentação viva',
        'services.managedIt.what.ops.desc': 'Acessos, diagramas e procedimentos claros.',
        'services.managedIt.deliverables.one': 'Inventário de ativos + mapa de risco',
        'services.managedIt.deliverables.two': 'Plano de estabilização (30–60 dias)',
        'services.managedIt.deliverables.three': 'Rotinas mensais (patching, revisão, relatórios)',
        'services.managedIt.deliverables.four': 'Base de conhecimento simples (para o cliente também)',
        'services.managedIt.faq.q1': 'Têm 24/7?',
        'services.managedIt.faq.a1': 'Não. SLAs realistas e prevenção.',
        'services.managedIt.faq.q2': 'Fazem on-site?',
        'services.managedIt.faq.a2': 'Sim, quando necessário.',
        'services.managedIt.faq.q3': 'Trabalham com fornecedores atuais?',
        'services.managedIt.faq.a3': 'Sim, coordenamos para reduzir atrito.',
        'services.managedIt.faq.q4': 'Contratos longos?',
        'services.managedIt.faq.a4': 'Preferimos acordos flexíveis com objetivos claros.',
        'services.managedIt.faq.q5': 'Quanto custa?',
        'services.managedIt.faq.a5': 'Depende do estado atual e cobertura — começamos com diagnóstico.',
        'services.managedIt.faq.q6': 'Fazem auditoria pontual?',
        'services.managedIt.faq.a6': 'Sim, como diagnóstico inicial ou independente.',
        'services.managedIt.final.title': 'Vamos tornar a tua TI previsível.',
        'services.managedIt.final.subtitle': 'Suporte contínuo, prevenção e documentação sem drama.',

        // Cybersecurity
        'services.cybersecurity.metaTitle': 'Cibersegurança para PME | Hardening, MFA, Backups',
        'services.cybersecurity.metaDescription':
            'Segurança prática para PME: MFA, hardening, segmentação, backups testados e resposta a incidentes.',
        'services.cybersecurity.heroTitle': 'Cibersegurança prática para PME — reduzir risco, sem paranoia.',
        'services.cybersecurity.heroSubtitle':
            'Segurança é rotina: identidades protegidas, endpoints controlados e backups que restauram.',
        'services.cybersecurity.problems.one': 'Contas sem MFA',
        'services.cybersecurity.problems.two': 'PCs desatualizados e permissões a mais',
        'services.cybersecurity.problems.three': 'Phishing e email comprometido',
        'services.cybersecurity.problems.four': 'Rede “tudo na mesma VLAN”',
        'services.cybersecurity.problems.five': 'Backups sem teste',
        'services.cybersecurity.what.core.title': 'Identidades & MFA',
        'services.cybersecurity.what.core.desc': 'Microsoft 365/AD com MFA e políticas certas.',
        'services.cybersecurity.what.security.title': 'Hardening',
        'services.cybersecurity.what.security.desc': 'Políticas, patching e mínimos privilégios.',
        'services.cybersecurity.what.ops.title': 'Proteção operacional',
        'services.cybersecurity.what.ops.desc': 'EDR quando faz sentido, logging e alertas.',
        'services.cybersecurity.deliverables.one': 'Mapa de risco + prioridades (Quick wins)',
        'services.cybersecurity.deliverables.two': 'Baseline de segurança (políticas + configurações)',
        'services.cybersecurity.deliverables.three': 'Plano de backups + testes de restauro',
        'services.cybersecurity.deliverables.four': 'Guia simples “o que fazer num incidente”',
        'services.cybersecurity.layers.title': 'Camadas de proteção',
        'services.cybersecurity.layers.one': 'Identidade',
        'services.cybersecurity.layers.two': 'Endpoint',
        'services.cybersecurity.layers.three': 'Email',
        'services.cybersecurity.layers.four': 'Rede',
        'services.cybersecurity.layers.five': 'Backup',
        'services.cybersecurity.faq.q1': 'Vão “bloquear tudo”?',
        'services.cybersecurity.faq.a1': 'Não. Ajustamos ao negócio para equilibrar risco e operação.',
        'services.cybersecurity.faq.q2': 'Fazem pentest?',
        'services.cybersecurity.faq.a2': 'Coordenamos pentests; focamos em hardening contínuo.',
        'services.cybersecurity.faq.q3': 'EDR?',
        'services.cybersecurity.faq.a3': 'Sim, quando o risco justifica — com critérios claros.',
        'services.cybersecurity.faq.q4': 'Formação phishing?',
        'services.cybersecurity.faq.a4': 'Sim, curta e prática.',
        'services.cybersecurity.faq.q5': 'GDPR?',
        'services.cybersecurity.faq.a5': 'Coordenamos com compliance para alinhar controlos técnicos.',
        'services.cybersecurity.faq.q6': 'Cloud e on-prem?',
        'services.cybersecurity.faq.a6': 'Sim, cobrimos ambos — identidades, rede e backups.',
        'services.cybersecurity.final.title': 'Reduzimos risco sem partir a operação.',
        'services.cybersecurity.final.subtitle': 'Hardening real, MFA, segmentação e backups testados.',

        // Microsoft 365 & Cloud
        'services.cloud.metaTitle': 'Microsoft 365 para PME | Migração, Segurança e Gestão',
        'services.cloud.metaDescription':
            'Implementação e gestão de Microsoft 365: migrações, segurança (MFA/CA), Teams/SharePoint e boas práticas.',
        'services.cloud.heroTitle': 'Microsoft 365 bem feito — produtividade com segurança.',
        'services.cloud.heroSubtitle':
            'Configuramos, migramos e organizamos o 365 para evitar caos em permissões, partilhas e compliance.',
        'services.cloud.problems.one': 'Tenants “à pressa” e sem regras',
        'services.cloud.problems.two': 'SharePoint/Teams viram um labirinto',
        'services.cloud.problems.three': 'Email sem proteção e sem políticas',
        'services.cloud.problems.four': 'Falta de retenção e controlo de partilhas externas',
        'services.cloud.what.core.title': 'Setup & Security baseline',
        'services.cloud.what.core.desc': 'MFA, Conditional Access, proteção de email.',
        'services.cloud.what.security.title': 'Migrações',
        'services.cloud.what.security.desc': 'Mail, OneDrive, SharePoint com plano e rollback.',
        'services.cloud.what.ops.title': 'Governance',
        'services.cloud.what.ops.desc': 'Naming, permissões, retenção, partilha externa.',
        'services.cloud.deliverables.one': 'Tenant baseline + relatório',
        'services.cloud.deliverables.two': 'Estrutura de Teams/SharePoint',
        'services.cloud.deliverables.three': 'Políticas de partilha + acessos externos',
        'services.cloud.deliverables.four': 'Guia de utilização simples para a equipa',
        'services.cloud.feature.title': 'Governance',
        'services.cloud.feature.one': 'MFA + Conditional Access',
        'services.cloud.feature.two': 'Estrutura SharePoint/Teams',
        'services.cloud.feature.three': 'Retenção e partilhas externas',
        'services.cloud.feature.four': 'Proteção de email e anexos',
        'services.cloud.faq.q1': 'Têm experiência com tenants híbridos?',
        'services.cloud.faq.a1': 'Sim, AD + Entra/ADSync com políticas de acesso seguras.',
        'services.cloud.faq.q2': 'Ajudam com permissões e partilhas?',
        'services.cloud.faq.a2': 'Sim, governance de Teams/SharePoint e partilhas externas.',
        'services.cloud.faq.q3': 'E-mail security?',
        'services.cloud.faq.a3': 'Configuramos anti-phishing, DKIM/SPF/DMARC e regras simples.',
        'services.cloud.faq.q4': 'Migrações grandes?',
        'services.cloud.faq.a4': 'Planeamos janelas, comunicação e rollback.',
        'services.cloud.faq.q5': 'Formação curta?',
        'services.cloud.faq.a5': 'Guias rápidos e sessões breves focadas no essencial.',
        'services.cloud.final.title': 'Tornar o 365 produtivo sem abrir buracos.',
        'services.cloud.final.subtitle': 'Segurança, governance e migrações com rollback definido.',

        // Networking
        'services.networking.metaTitle': 'Redes e Wi-Fi para Empresas | Estabilidade e Segmentação',
        'services.networking.metaDescription':
            'Redes e Wi-Fi profissionais: cobertura real, VLANs, segmentação, estabilidade e documentação.',
        'services.networking.heroTitle': 'Redes e Wi-Fi sem surpresas — cobertura real, segmentação, estabilidade.',
        'services.networking.heroSubtitle': 'Uma rede boa é invisível. Nós tratamos disso.',
        'services.networking.problems.one': 'Wi-Fi instável e zonas mortas',
        'services.networking.problems.two': 'Tudo na mesma rede (riscos e falhas em cascata)',
        'services.networking.problems.three': 'Equipamentos sem configuração consistente',
        'services.networking.problems.four': 'Mudanças “ad-hoc” sem documentação',
        'services.networking.what.core.title': 'Site survey prático',
        'services.networking.what.core.desc': 'Plano de cobertura e canais realista.',
        'services.networking.what.security.title': 'Segmentação',
        'services.networking.what.security.desc': 'VLANs por funções/risco e regras simples.',
        'services.networking.what.ops.title': 'Padronização',
        'services.networking.what.ops.desc': 'Naming, configs, backups de dispositivos.',
        'services.networking.deliverables.one': 'Diagrama + inventário',
        'services.networking.deliverables.two': 'Plano de Wi-Fi e canais',
        'services.networking.deliverables.three': 'VLANs + regras básicas',
        'services.networking.deliverables.four': 'Documentação e handover',
        'services.networking.feature.title': 'Cenários típicos',
        'services.networking.feature.one': 'Escritórios multi-sala com roaming estável',
        'services.networking.feature.two': 'Armazéns e logística com cobertura densa',
        'services.networking.feature.three': 'Multi-piso com segmentação por função',
        'services.networking.faq.q1': 'Marcas preferidas?',
        'services.networking.faq.a1': 'Escolhemos pelo fit técnico/orçamental; não vendemos hardware por comissão.',
        'services.networking.faq.q2': 'Gestão remota?',
        'services.networking.faq.a2': 'Sim, com acesso seguro e logging básico.',
        'services.networking.faq.q3': 'Rede guest?',
        'services.networking.faq.a3': 'Sim, isolada e com limites claros.',
        'services.networking.faq.q4': 'QoS/VoIP?',
        'services.networking.faq.a4': 'Tratamos de QoS para VoIP ou apps críticas.',
        'services.networking.faq.q5': 'Documentação?',
        'services.networking.faq.a5': 'Entregamos diagramas, credenciais seguras e procedimentos curtos.',
        'services.networking.final.title': 'Estabilidade primeiro. Depois, performance.',
        'services.networking.final.subtitle': 'Cobertura, segmentação e documentação clara.',

        // Backup & Continuity
        'services.backup.metaTitle': 'Backups e Continuidade para PME | 3-2-1 com Testes',
        'services.backup.metaDescription':
            'Backups 3-2-1, testes de restauro, continuidade e planos simples para reduzir impacto de falhas e ransomware.',
        'services.backup.heroTitle': 'Backups que restauram — e planos que funcionam quando dói.',
        'services.backup.heroSubtitle': 'O backup só conta quando consegues recuperar. Fazemos desenho, implementação e testes.',
        'services.backup.problems.one': 'Backups sem teste',
        'services.backup.problems.two': 'Cópias no mesmo local do servidor',
        'services.backup.problems.three': 'Restore lento e ninguém sabe o processo',
        'services.backup.problems.four': 'Ransomware = pânico total',
        'services.backup.what.core.title': 'Estratégia 3-2-1',
        'services.backup.what.core.desc': 'Ajustada ao orçamento e risco.',
        'services.backup.what.security.title': 'Testes de restauro',
        'services.backup.what.security.desc': 'Calendário e evidência.',
        'services.backup.what.ops.title': 'Plano de continuidade',
        'services.backup.what.ops.desc': 'Quem faz o quê em incidentes.',
        'services.backup.deliverables.one': 'RPO/RTO definidos',
        'services.backup.deliverables.two': 'Plano de backup + documentação',
        'services.backup.deliverables.three': 'Testes mensais/trimestrais',
        'services.backup.deliverables.four': 'Checklist de incidente',
        'services.backup.feature.title': '3-2-1 com testes',
        'services.backup.feature.one': '3 cópias, 2 media, 1 off-site',
        'services.backup.feature.two': 'Testes agendados com prova',
        'services.backup.faq.q1': 'Ferramentas específicas?',
        'services.backup.faq.a1': 'Trabalhamos com várias; escolhemos pelo objetivo e orçamento.',
        'services.backup.faq.q2': 'Cloud vs on-prem?',
        'services.backup.faq.a2': 'Misturamos conforme risco e custos.',
        'services.backup.faq.q3': 'Ransomware?',
        'services.backup.faq.a3': 'Planeamos isolamento, imutabilidade e restauração por etapas.',
        'services.backup.faq.q4': 'Testes incluídos?',
        'services.backup.faq.a4': 'Sim, com calendário definido e evidência.',
        'services.backup.faq.q5': 'Documentação?',
        'services.backup.faq.a5': 'Passos claros para recuperar serviços e dados.',
        'services.backup.final.title': 'Menos risco. Mais previsibilidade.',
        'services.backup.final.subtitle': 'Backups testados, RPO/RTO claros e plano de continuidade.',

        // Projects & Procurement
        'services.projects.metaTitle': 'Projetos de TI e Procurement | Planeamento e Execução',
        'services.projects.metaDescription':
            'Projetos de TI com planeamento, execução e documentação. Ajudamos também em compras: especificação, comparação e implementação.',
        'services.projects.heroTitle': 'Projetos de TI sem stress — planeados, entregues, documentados.',
        'services.projects.heroSubtitle': 'Migrar, renovar, expandir — com controlo e sem desperdício.',
        'services.projects.problems.one': 'Compras erradas e caras',
        'services.projects.problems.two': 'Projetos que param a operação',
        'services.projects.problems.three': 'Falta de documentação no final',
        'services.projects.problems.four': 'Dependência de fornecedores sem accountability',
        'services.projects.what.core.title': 'Especificação',
        'services.projects.what.core.desc': 'Requisitos reais e objetivos.',
        'services.projects.what.security.title': 'Comparação e seleção',
        'services.projects.what.security.desc': 'TCO, risco e suporte.',
        'services.projects.what.ops.title': 'Entrega + handover',
        'services.projects.what.ops.desc': 'Implementação, validação e documentação.',
        'services.projects.deliverables.one': 'Plano + riscos + rollback',
        'services.projects.deliverables.two': 'Lista curta de opções (prós/contras)',
        'services.projects.deliverables.three': 'Implementação + validação',
        'services.projects.deliverables.four': 'Documentação final',
        'services.projects.feature.title': 'Abordagem vendor-neutral',
        'services.projects.feature.one': 'Compramos o que faz sentido, não o que dá comissão',
        'services.projects.feature.two': 'Cronogramas realistas e comunicação clara',
        'services.projects.feature.three': 'Handover completo, sem “caixas negras”',
        'services.projects.faq.q1': 'Trabalham com fornecedores existentes?',
        'services.projects.faq.a1': 'Sim, coordenamos e mantemos accountability.',
        'services.projects.faq.q2': 'Timeline típico?',
        'services.projects.faq.a2': 'Depende do escopo; começamos com discovery e plano.',
        'services.projects.faq.q3': 'Compram hardware/software?',
        'services.projects.faq.a3': 'Podemos comprar ou apoiar a compra; sem comissões ocultas.',
        'services.projects.faq.q4': 'Documentação incluída?',
        'services.projects.faq.a4': 'Sim, entregamos handover completo.',
        'services.projects.faq.q5': 'Rollback?',
        'services.projects.faq.a5': 'Planeado e testado quando aplicável.',
        'services.projects.final.title': 'Vamos desenhar o projeto antes de comprar hardware.',
        'services.projects.final.subtitle': 'Planeamento, seleção e entrega com documentação.',

        // Compliance & GDPR
        'services.compliance.metaTitle': 'GDPR e Compliance para PME | Medidas Técnicas e Rotinas',
        'services.compliance.metaDescription':
            'Ajudamos PME a reduzir risco: acessos, retenção, backups, logging e práticas que fazem sentido no mundo real.',
        'services.compliance.heroTitle': 'Compliance e GDPR para PME — pragmático, aplicável, sem burocracia vazia.',
        'services.compliance.heroSubtitle': 'Menos risco legal e operacional com medidas técnicas simples e documentação útil.',
        'services.compliance.problems.one': 'Acessos partilhados e sem rastreio',
        'services.compliance.problems.two': 'Retenção e eliminação inexistentes',
        'services.compliance.problems.three': 'Falta de evidência em auditorias',
        'services.compliance.problems.four': 'Processos “na cabeça de alguém”',
        'services.compliance.what.core.title': 'Acessos e mínimos privilégios',
        'services.compliance.what.core.desc': 'Controlos de identidade e rastreio básico.',
        'services.compliance.what.security.title': 'Retenção/arquivamento',
        'services.compliance.what.security.desc': 'M365, file shares e políticas claras.',
        'services.compliance.what.ops.title': 'Logging e rotinas',
        'services.compliance.what.ops.desc': 'Registos úteis e revisões periódicas.',
        'services.compliance.deliverables.one': 'Checklist de controlos técnicos',
        'services.compliance.deliverables.two': 'Documentação mínima (o que existe e onde)',
        'services.compliance.deliverables.three': 'Plano de melhorias por prioridade',
        'services.compliance.deliverables.four': 'Registos de auditoria essenciais',
        'services.compliance.feature.title': 'GDPR sem teatro',
        'services.compliance.feature.one': 'Medidas técnicas que fazem sentido',
        'services.compliance.feature.two': 'Documentação útil, sem burocracia vazia',
        'services.compliance.feature.three': 'Evidência para auditorias reais',
        'services.compliance.faq.q1': 'Cobrem políticas e técnica?',
        'services.compliance.faq.a1': 'Focamo-nos na parte técnica e apoiamos na tradução para políticas.',
        'services.compliance.faq.q2': 'Integram com equipas legais?',
        'services.compliance.faq.a2': 'Sim, trabalhamos com o jurídico/consultores.',
        'services.compliance.faq.q3': 'Retenção em M365?',
        'services.compliance.faq.a3': 'Definimos políticas de retenção/arquivamento e partilhas externas.',
        'services.compliance.faq.q4': 'Auditorias?',
        'services.compliance.faq.a4': 'Preparamos evidência técnica e fluxos de resposta.',
        'services.compliance.final.title': 'Menos risco com trabalho real, não com papel.',
        'services.compliance.final.subtitle': 'Controlos técnicos, retenção e evidência útil.',

        // Contact page
        'contact.hero.badge': 'Contacto',
        'contact.hero.title': 'Fale diretamente com a equipa sénior.',
        'contact.hero.subtitle': 'Sem triagens intermináveis. Partilhe o contexto e voltamos com um plano claro para estabilizar e proteger o seu IT.',
        'contact.hero.point1': 'Atendimento em Português e Inglês.',
        'contact.hero.point2': 'Preferimos decisões rápidas e conversas sem jargão.',
        'contact.hero.point3': 'Infraestrutura, cloud, segurança e operações no mesmo sítio.',
        'contact.channels.title': 'Escolha como quer avançar',
        'contact.channels.subtitle': 'Use o formulário para explicar o desafio ou peça uma chamada curta para alinharmos prioridades.',
        'contact.channels.message.title': 'Mensagem rápida',
        'contact.channels.message.desc': 'Explique o que precisa. Validamos contexto e respondemos com próximos passos claros.',
        'contact.channels.call.title': 'Discovery call',
        'contact.channels.call.desc': '30 minutos com alguém que executa. Agenda flexível: Teams, Zoom ou telefone.',
        'contact.channels.projects.title': 'Projetos e auditorias',
        'contact.channels.projects.desc': 'Tem um RFP, auditoria ou incidente? Partilhe detalhes e tratamos da triagem inicial.',
        'contact.form.heading': 'Conte-nos o que precisa',
        'contact.form.subheading': 'Respondemos no idioma que preferir e só fazemos as perguntas essenciais para começar.',
        'contact.expectations.title': 'O que acontece a seguir',
        'contact.expectations.item1': 'Revisão manual pela equipa sénior, sem chatbots.',
        'contact.expectations.item2': 'Se for urgente, priorizamos a primeira chamada disponível.',
        'contact.expectations.item3': 'Enviamos um plano sucinto ou propostas de próximos passos dentro das áreas pedidas.',

        // Contact form
        'contact.form.name': 'Nome',
        'contact.form.company': 'Empresa',
        'contact.form.companyOptional': 'Empresa (opcional)',
        'contact.form.email': 'Email',
        'contact.form.workEmail': 'Email de trabalho',
        'contact.form.topic': 'Assunto',
        'contact.form.urgency': 'Urgência',
        'contact.form.urgencyNormal': 'Urgência normal',
        'contact.form.urgencyUrgent': 'Urgente',
        'contact.form.message': 'Mensagem',
        'contact.form.messagePlaceholder': 'Descreva o seu desafio...',
        'contact.form.submit': 'Enviar Mensagem',
        'contact.form.sending': 'A enviar...',
        'contact.form.success': 'Obrigado! Responderemos em breve.',
        'contact.form.error': 'Ocorreu um problema ao enviar a sua mensagem. Por favor, tente novamente.',

        // Contact topics
        'contact.topics.managedIt': 'IT Gerida',
        'contact.topics.cybersecurity': 'Cibersegurança',
        'contact.topics.cloud': 'Cloud & M365',
        'contact.topics.projects': 'Projetos',
        'contact.topics.general': 'Geral',

        // Footer
        'footer.contactUs': 'contacte-nos',
        'footer.newsletter': 'Newsletter',
        'footer.awards': 'Prémios',
        'footer.tagline': 'Tecnologia com coração humano.',
        'footer.about': 'IT confiável, segurança clara e suporte calmo para equipas que valorizam estabilidade.',
        'footer.location': 'Portugal',
        'footer.hours': 'Seg–Sex, 9–18',
        'footer.note': 'Estamos sediados em Portugal, orgulhosamente a apoiar equipas em toda a Europa.',
        'footer.newsletterText': 'Insights curtos e práticos sobre segurança, estabilidade e operações calmas.',
        'footer.newsletterPlaceholder': 'O seu endereço de email',
        'footer.newsletterButton': 'Subscrever',
        'footer.copyright': '© {year} Loading Happiness. Engenharia para Estabilidade.',
        'footer.legal.privacy': 'Privacidade',
        'footer.legal.terms': 'Termos',
        'footer.legal.cookies': 'Cookies',
    },
    en: {
        // Common
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.success': 'Success',
        'common.readMore': 'Read more',
        'common.learnMore': 'Learn more',
        'common.viewAll': 'View all',
        'common.allServices': 'All services',

        // Navigation
        'nav.services': 'Services',
        'nav.news': 'News',
        'nav.impact': 'Impact',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.bookCall': 'Book a Call',
        'nav.about.ourStory': 'Our story',
        'nav.about.ourStoryDescription': 'Founded in Sintra, built for real businesses.',
        'nav.about.whyLoadingHappiness': 'Why Loading Happiness',
        'nav.about.whyLoadingHappinessDescription': 'A name that became a promise.',
        'nav.about.philosophy': 'Our philosophy',
        'nav.about.philosophyDescription': 'Human, clear, responsible.',
        'nav.about.values': 'Values',
        'nav.about.valuesDescription': 'How we show up in the work.',
        'nav.about.whatToExpect': 'What to expect',
        'nav.about.whatToExpectDescription': 'Clarity, pragmatism, security by default.',
        'nav.about.team': 'Our team',
        'nav.about.teamDescription': 'Senior, hands-on, close to the ground.',

        // Hero fallback
        'hero.fallback.heading': 'Technology with a human heart.',
        'hero.fallback.subheading': 'Reliable IT, clear security, and support that feels human—so your business can focus on what matters.',
        'hero.fallback.primaryCta': 'Book a call',
        'hero.fallback.secondaryCta': 'Explore services',

        // Home page
        'home.servicesHeading': 'Foundations for stability',
        'home.latestInsights': 'Latest insights',
        'home.ctaHeading': 'Ready for calmer IT operations?',
        'home.ctaSubheading': "Let's look at what's breaking your flow and create a plan that works.",
        'home.ctaPrimary': 'Book a call',
        'home.ctaSecondary': 'Send a message',

        // News
        'news.featuredPrimary': 'Top story',
        'news.featuredSecondary': 'Highlights',
        'news.allArticles': 'All articles',
        'news.searchPlaceholder': 'Search articles...',
        'news.clearFilters': 'Clear filters',
        'news.readMore': 'Read article',

        // Services
        'services.managedIt.title': 'Managed IT & Helpdesk',
        'services.managedIt.description': 'Stable operations, monitoring, and clear response paths.',
        'services.cybersecurity.title': 'Pragmatic Cybersecurity',
        'services.cybersecurity.description': 'Hardening, strong identity, and tested backups.',
        'services.cloud.title': 'Microsoft 365 & Cloud',
        'services.cloud.description': 'Governance, migrations, identity, and licensing sanity.',
        'services.networking.title': 'Networking & Wi-Fi',
        'services.networking.description': 'Reliable coverage, segmentation, and VPNs that work.',
        'services.infrastructure.title': 'Infrastructure & Virtualization',
        'services.infrastructure.description': 'Performance tuning, tested backups, and planned upgrades.',
        'services.strategyRoadmaps.title': 'Strategy & Roadmaps',
        'services.strategyRoadmaps.description': 'Realistic 12–24 month plan.',
        'services.backupContinuity.title': 'Backups & Continuity',
        'services.backupContinuity.description': '3-2-1 backups, tested restores, and clear runbooks.',
        'services.projectsProcurement.title': 'Projects & Procurement',
        'services.projectsProcurement.description': 'Planning, delivery, and purchasing with ROI.',
        'services.complianceGdpr.title': 'Compliance & GDPR',
        'services.complianceGdpr.description': 'Policies, technical controls, and evidence for clients/audits.',
        'services.customSoftware.title': 'Custom Software & Integrations',
        'services.customSoftware.description': 'Automation and integrations (ERP/SQL), EnviaSAFT, GS1-128.',

        // Services overview
        'services.overview.metaTitle': 'IT Services for SMEs | Loading Happiness',
        'services.overview.metaDescription':
            'Practical IT for SMEs: stability, pragmatic security, Microsoft 365, networks, backups, projects, and integrations. Clear, human, and predictable.',
        'services.overview.hero.title': 'IT services for SMEs — stable, secure, and human.',
        'services.overview.hero.subtitle':
            'We solve real problems, reduce risk, and make IT predictable — without jargon or fairy tales.',
        'services.overview.hero.primaryCta': 'Book a 15-min call',
        'services.overview.hero.secondaryCta': 'Request an assessment',
        'services.overview.trust.one': 'Built for Portuguese SMEs',
        'services.overview.trust.two': 'Security & continuity',
        'services.overview.trust.three': 'Open-source when it’s the right tool',
        'services.overview.trust.four': 'Clear documentation',
        'services.overview.trust.five': 'Remote + on-site support',
        'services.overview.cards.cta': 'View details',
        'services.overview.who.title': 'SMEs that need predictable IT — not chaos.',
        'services.overview.who.subtitle':
            'We work with small and mid-sized teams who want stability, security, competent support, and decisions that make sense.',
        'services.overview.who.fit': 'We typically help:',
        'services.overview.who.seg1': 'professional services (accounting, legal, consulting)',
        'services.overview.who.seg2': 'retail/distribution (POS, labels, logistics)',
        'services.overview.who.seg3': 'hybrid/remote teams',
        'services.overview.approach.title': 'Our approach',
        'services.overview.approach.step1.title': 'Assess',
        'services.overview.approach.step1.desc': 'Inventory, risk map, failure points, priorities.',
        'services.overview.approach.step2.title': 'Stabilize',
        'services.overview.approach.step2.desc': 'Fix what hurts first (security, backups, network).',
        'services.overview.approach.step3.title': 'Improve',
        'services.overview.approach.step3.desc': 'Automate, document, reduce cost and friction.',
        'services.overview.approach.step4.title': 'Protect',
        'services.overview.approach.step4.desc': 'Continuous prevention, testing, reviews, incident response.',
        'services.overview.outcomes.title': 'Outcomes you can measure',
        'services.overview.outcomes.one': 'Less downtime, fewer surprises',
        'services.overview.outcomes.two': 'Backups that actually restore',
        'services.overview.outcomes.three': 'Security with MFA, segmentation, simple policies',
        'services.overview.outcomes.four': 'Predictable costs, data-driven decisions',
        'services.overview.outcomes.five': 'Useful documentation (no tribal knowledge)',
        'services.overview.outcomes.six': 'Efficient remote ops + on-site when needed',
        'services.overview.social.title': 'Technology with a human heart',
        'services.overview.social.body': 'We work responsibly and transparently. No moral grandstanding—just clear purpose and calm teams.',
        'services.overview.social.link': 'See impact',
        'services.overview.faq.title': 'FAQ',
        'services.overview.faq.q1': 'Do you offer 24/7 support?',
        'services.overview.faq.a1': 'No. We focus on realistic SLAs and prevention to reduce emergencies.',
        'services.overview.faq.q2': 'On-site support?',
        'services.overview.faq.a2': 'Yes, when physical presence is the right solution.',
        'services.overview.faq.q3': 'Do you use open-source?',
        'services.overview.faq.a3': 'Yes — when it’s the right tool (not as a religion).',
        'services.overview.faq.q4': 'Pricing?',
        'services.overview.faq.a4': 'It depends on your current setup and coverage. We start with an assessment.',
        'services.overview.faq.q5': 'Do you support hybrid teams?',
        'services.overview.faq.a5': 'Yes, with secure access, MFA, and segmentation.',
        'services.overview.faq.q6': 'Do you cover M365 and networking?',
        'services.overview.faq.a6': 'Yes—cloud, network, backups, and security are handled together.',
        'services.overview.final.title': 'Let’s make IT work for you — not against you.',
        'services.overview.final.subtitle': 'We fix the essentials, document, and create predictability.',
        'services.overview.final.primaryCta': 'Book a call',
        'services.overview.final.secondaryCta': 'Request an assessment',
        'services.overview.final.note': 'Typical reply within 1–2 business days.',

        // Custom software page
        'services.customSoftware.metaTitle': 'Custom software for SMEs | Loading Happiness',
        'services.customSoftware.metaDescription':
            'Custom software for SMEs in Portugal: EnviaSAFT, GS1-128 label PDFs, ERP integrations, automation — practical, documented, and maintainable.',
        'services.customSoftware.hero.title': 'Custom software for SMEs — practical, documented, and maintainable.',
        'services.customSoftware.hero.subtitle':
            'We build tools that remove operational friction: compliance, logistics, integrations, automation.',
        'services.customSoftware.hero.primaryCta': 'Discuss a project',
        'services.customSoftware.hero.secondaryCta': 'See projects',
        'services.customSoftware.pillars.title': 'Pillars',
        'services.customSoftware.pillars.one': 'Real problem first — focus on what moves the business.',
        'services.customSoftware.pillars.two': 'Incremental delivery — fast prototypes and short cycles.',
        'services.customSoftware.pillars.three': 'Maintenance and documentation — no ownerless “legacy”.',
        'services.customSoftware.projects.title': 'Featured projects',
        'services.customSoftware.projects.envia.title': 'EnviaSAFT — compliance with clarity (open-source).',
        'services.customSoftware.projects.envia.desc':
            'SAF-T generation and validation shaped by real processes, with transparency on what it does and why.',
        'services.customSoftware.projects.envia.b1': 'Open-source base with advanced modules for larger contexts.',
        'services.customSoftware.projects.envia.b2': 'Clear documentation: inputs, outputs, responsibilities.',
        'services.customSoftware.projects.envia.b3': 'Integration with validation pipelines and reporting.',
        'services.customSoftware.projects.gs1.title': 'GS1-128 labels — print-ready vector PDFs tied to your ERP.',
        'services.customSoftware.projects.gs1.desc':
            'Generate logistics labels from SQL/ERP data while keeping print quality and flexibility.',
        'services.customSoftware.projects.gs1.b1': 'GS1-128 barcodes in SVG for maximum sharpness.',
        'services.customSoftware.projects.gs1.b2': 'Configurable layouts built to evolve.',
        'services.customSoftware.projects.gs1.b3': 'Batch automation and warehouse process integration.',
        'services.customSoftware.integrations.title': 'Integrations',
        'services.customSoftware.integrations.desc': 'ERPs, SQL, APIs, and automation—pragmatic and safe.',
        'services.customSoftware.integrations.b1': 'ERP and SQL integrations.',
        'services.customSoftware.integrations.b2': 'APIs and automation to remove manual work.',
        'services.customSoftware.integrations.b3': 'Basic observability to track use and failures.',
        'services.customSoftware.process.title': 'Process',
        'services.customSoftware.process.s1': 'Discovery',
        'services.customSoftware.process.s2': 'Prototype',
        'services.customSoftware.process.s3': 'Beta',
        'services.customSoftware.process.s4': 'Production',
        'services.customSoftware.faq.title': 'Software FAQ',
        'services.customSoftware.faq.q1': 'Licensing?',
        'services.customSoftware.faq.a1': 'Hybrid model: open-source when it fits and private modules when required.',
        'services.customSoftware.faq.q2': 'Support and maintenance?',
        'services.customSoftware.faq.a2': 'We offer maintenance plans with realistic SLAs and delivered documentation.',
        'services.customSoftware.faq.q3': 'Hosting?',
        'services.customSoftware.faq.a3': 'We can deliver self-hosted or manage it in the cloud, depending on context.',
        'services.customSoftware.faq.q4': 'Roadmap and evolution?',
        'services.customSoftware.faq.a4': 'Planned together with incremental releases and continuous testing.',
        'services.customSoftware.final.title': 'Let’s build something useful — and keep it healthy.',
        'services.customSoftware.final.subtitle': 'No theatre: clear scope, short deliveries, solid docs.',
        'services.customSoftware.final.primaryCta': 'Discuss a project',
        'services.customSoftware.final.secondaryCta': 'Request a proposal',
        'services.customSoftware.final.note': 'Typical reply within 1–2 business days.',

        // Shared steps
        'services.common.steps.assess.title': 'Assess',
        'services.common.steps.assess.desc': 'Inventory, risk, and priorities.',
        'services.common.steps.stabilize.title': 'Stabilize',
        'services.common.steps.stabilize.desc': 'Fix what hurts first.',
        'services.common.steps.improve.title': 'Improve',
        'services.common.steps.improve.desc': 'Automate, document, reduce friction.',
        'services.common.steps.protect.title': 'Protect',
        'services.common.steps.protect.desc': 'Ongoing prevention, testing, and response.',

        // Managed IT
        'services.managedIt.metaTitle': 'Managed IT & Support for SMEs | Loading Happiness',
        'services.managedIt.metaDescription':
            'Practical managed IT for SMEs: prevention, fast response, documentation, and predictable operations. No jargon. No magic promises.',
        'services.managedIt.heroTitle': 'Managed IT for SMEs — predictable, documented, effective.',
        'services.managedIt.heroSubtitle':
            'Fewer incidents, less chaos, more clarity. We keep operations running and reduce risk over time.',
        'services.managedIt.problems.one': '“Everything works… until it doesn’t”',
        'services.managedIt.problems.two': 'Devices and accounts with no control',
        'services.managedIt.problems.three': 'Recurring incidents without root cause',
        'services.managedIt.problems.four': 'Dependence on “the person who knows the passwords”',
        'services.managedIt.problems.five': 'Missing backups and simple plans',
        'services.managedIt.what.core.title': 'Continuous support',
        'services.managedIt.what.core.desc': 'Remote + on-site when it’s the right move.',
        'services.managedIt.what.security.title': 'Preventive management',
        'services.managedIt.what.security.desc': 'Updates, health checks, inventory.',
        'services.managedIt.what.ops.title': 'Living documentation',
        'services.managedIt.what.ops.desc': 'Access, diagrams, and procedures that stay current.',
        'services.managedIt.deliverables.one': 'Asset inventory + risk map',
        'services.managedIt.deliverables.two': 'Stabilization plan (30–60 days)',
        'services.managedIt.deliverables.three': 'Monthly routines (patching, review, reports)',
        'services.managedIt.deliverables.four': 'Simple knowledge base (client-facing too)',
        'services.managedIt.faq.q1': 'Do you offer 24/7?',
        'services.managedIt.faq.a1': 'No. Realistic SLAs and prevention.',
        'services.managedIt.faq.q2': 'On-site?',
        'services.managedIt.faq.a2': 'Yes, when needed.',
        'services.managedIt.faq.q3': 'Work with existing vendors?',
        'services.managedIt.faq.a3': 'Yes, we coordinate to reduce friction.',
        'services.managedIt.faq.q4': 'Long contracts?',
        'services.managedIt.faq.a4': 'We prefer flexible agreements with clear goals.',
        'services.managedIt.faq.q5': 'Cost?',
        'services.managedIt.faq.a5': 'Depends on current state and coverage — we start with an assessment.',
        'services.managedIt.faq.q6': 'One-off audit?',
        'services.managedIt.faq.a6': 'Yes, as an initial or standalone diagnostic.',
        'services.managedIt.final.title': 'Let’s make your IT predictable.',
        'services.managedIt.final.subtitle': 'Continuous support, prevention, and documentation without the drama.',

        // Cybersecurity
        'services.cybersecurity.metaTitle': 'Cybersecurity for SMEs | Hardening, MFA, Backups',
        'services.cybersecurity.metaDescription':
            'Practical security for SMEs: MFA, hardening, segmentation, tested backups, and incident response.',
        'services.cybersecurity.heroTitle': 'Practical cybersecurity for SMEs — reduce risk without paranoia.',
        'services.cybersecurity.heroSubtitle':
            'Security is routine: protected identities, controlled endpoints, and backups you can restore.',
        'services.cybersecurity.problems.one': 'Accounts without MFA',
        'services.cybersecurity.problems.two': 'Outdated PCs and excessive permissions',
        'services.cybersecurity.problems.three': 'Phishing and compromised mailboxes',
        'services.cybersecurity.problems.four': 'Flat networks (one big VLAN)',
        'services.cybersecurity.problems.five': 'Backups never tested',
        'services.cybersecurity.what.core.title': 'Identity & MFA',
        'services.cybersecurity.what.core.desc': 'Microsoft 365/AD with the right policies.',
        'services.cybersecurity.what.security.title': 'Hardening',
        'services.cybersecurity.what.security.desc': 'Policies, patching, least privilege.',
        'services.cybersecurity.what.ops.title': 'Operational protection',
        'services.cybersecurity.what.ops.desc': 'EDR when warranted, logging, and alerts.',
        'services.cybersecurity.deliverables.one': 'Risk map + priorities (quick wins)',
        'services.cybersecurity.deliverables.two': 'Security baseline (policies + configs)',
        'services.cybersecurity.deliverables.three': 'Backup plan + restore testing',
        'services.cybersecurity.deliverables.four': 'Plain “what to do in an incident” guide',
        'services.cybersecurity.layers.title': 'Protection layers',
        'services.cybersecurity.layers.one': 'Identity',
        'services.cybersecurity.layers.two': 'Device',
        'services.cybersecurity.layers.three': 'Email',
        'services.cybersecurity.layers.four': 'Network',
        'services.cybersecurity.layers.five': 'Backup',
        'services.cybersecurity.faq.q1': 'Will you “lock everything down”?',
        'services.cybersecurity.faq.a1': 'No. We balance risk with how the business works.',
        'services.cybersecurity.faq.q2': 'Do you run pentests?',
        'services.cybersecurity.faq.a2': 'We coordinate pentests; we focus on real hardening.',
        'services.cybersecurity.faq.q3': 'EDR?',
        'services.cybersecurity.faq.a3': 'Yes, when risk justifies it—with clear criteria.',
        'services.cybersecurity.faq.q4': 'Phishing training?',
        'services.cybersecurity.faq.a4': 'Yes, short and practical.',
        'services.cybersecurity.faq.q5': 'GDPR?',
        'services.cybersecurity.faq.a5': 'We align technical controls with compliance.',
        'services.cybersecurity.faq.q6': 'Cloud and on-prem?',
        'services.cybersecurity.faq.a6': 'Yes—identity, network, and backups across both.',
        'services.cybersecurity.final.title': 'We reduce risk without breaking operations.',
        'services.cybersecurity.final.subtitle': 'Real hardening, MFA, segmentation, and tested backups.',

        // Microsoft 365 & Cloud
        'services.cloud.metaTitle': 'Microsoft 365 for SMEs | Migration, Security & Governance',
        'services.cloud.metaDescription':
            'Microsoft 365 implementation and management: migrations, security (MFA/CA), Teams/SharePoint governance, and best practices.',
        'services.cloud.heroTitle': 'Microsoft 365 done right — productivity with security.',
        'services.cloud.heroSubtitle':
            'Secure configuration, clean migrations, and governance that prevents chaos.',
        'services.cloud.problems.one': 'Rushed tenants with no rules',
        'services.cloud.problems.two': 'SharePoint/Teams turning into a maze',
        'services.cloud.problems.three': 'Email without protection or policies',
        'services.cloud.problems.four': 'No retention or control over external sharing',
        'services.cloud.what.core.title': 'Setup & Security baseline',
        'services.cloud.what.core.desc': 'MFA, Conditional Access, email protection.',
        'services.cloud.what.security.title': 'Migrations',
        'services.cloud.what.security.desc': 'Mail, OneDrive, SharePoint with plan and rollback.',
        'services.cloud.what.ops.title': 'Governance',
        'services.cloud.what.ops.desc': 'Naming, permissions, retention, external sharing.',
        'services.cloud.deliverables.one': 'Tenant baseline + report',
        'services.cloud.deliverables.two': 'Teams/SharePoint structure',
        'services.cloud.deliverables.three': 'Sharing policies + external access',
        'services.cloud.deliverables.four': 'Simple user guide for the team',
        'services.cloud.feature.title': 'Governance',
        'services.cloud.feature.one': 'MFA + Conditional Access',
        'services.cloud.feature.two': 'SharePoint/Teams structure',
        'services.cloud.feature.three': 'Retention and external sharing',
        'services.cloud.feature.four': 'Email and attachment protection',
        'services.cloud.faq.q1': 'Hybrid tenants?',
        'services.cloud.faq.a1': 'Yes, AD + Entra/ADSync with secure access policies.',
        'services.cloud.faq.q2': 'Help with permissions and sharing?',
        'services.cloud.faq.a2': 'Yes—Teams/SharePoint governance and external sharing.',
        'services.cloud.faq.q3': 'Email security?',
        'services.cloud.faq.a3': 'We set anti-phishing, DKIM/SPF/DMARC, and sane rules.',
        'services.cloud.faq.q4': 'Large migrations?',
        'services.cloud.faq.a4': 'We plan windows, comms, and rollback.',
        'services.cloud.faq.q5': 'Short training?',
        'services.cloud.faq.a5': 'Quick guides and brief sessions on essentials.',
        'services.cloud.final.title': 'Make 365 productive without opening holes.',
        'services.cloud.final.subtitle': 'Security, governance, and migrations with defined rollback.',

        // Networking
        'services.networking.metaTitle': 'Business Networks & Wi-Fi | Stability and Segmentation',
        'services.networking.metaDescription':
            'Professional networks and Wi-Fi: real coverage, VLANs, segmentation, stability, and documentation.',
        'services.networking.heroTitle': 'Business networks & Wi-Fi — stable, segmented, documented.',
        'services.networking.heroSubtitle': 'A good network is invisible. We make it that way.',
        'services.networking.problems.one': 'Unstable Wi-Fi and dead spots',
        'services.networking.problems.two': 'Everything on one network (cascading risk)',
        'services.networking.problems.three': 'Inconsistent device configs',
        'services.networking.problems.four': 'Ad-hoc changes with no documentation',
        'services.networking.what.core.title': 'Practical site survey',
        'services.networking.what.core.desc': 'Realistic coverage and channel plan.',
        'services.networking.what.security.title': 'Segmentation',
        'services.networking.what.security.desc': 'VLANs by function/risk with simple rules.',
        'services.networking.what.ops.title': 'Standardization',
        'services.networking.what.ops.desc': 'Naming, configs, device backups.',
        'services.networking.deliverables.one': 'Diagram + inventory',
        'services.networking.deliverables.two': 'Wi-Fi and channel plan',
        'services.networking.deliverables.three': 'VLANs + base rules',
        'services.networking.deliverables.four': 'Documentation and handover',
        'services.networking.feature.title': 'Typical scenarios',
        'services.networking.feature.one': 'Multi-room offices with stable roaming',
        'services.networking.feature.two': 'Warehouses/logistics with dense coverage',
        'services.networking.feature.three': 'Multi-floor with segmentation by function',
        'services.networking.faq.q1': 'Preferred vendors?',
        'services.networking.faq.a1': 'We choose by fit and budget; we don’t sell hardware for commission.',
        'services.networking.faq.q2': 'Remote management?',
        'services.networking.faq.a2': 'Yes, with secure access and basic logging.',
        'services.networking.faq.q3': 'Guest network?',
        'services.networking.faq.a3': 'Yes, isolated with clear limits.',
        'services.networking.faq.q4': 'QoS/VoIP?',
        'services.networking.faq.a4': 'We handle QoS for VoIP or critical apps.',
        'services.networking.faq.q5': 'Documentation?',
        'services.networking.faq.a5': 'We deliver diagrams, secured credentials, and short procedures.',
        'services.networking.final.title': 'Stability first. Then performance.',
        'services.networking.final.subtitle': 'Coverage, segmentation, and clear documentation.',

        // Backup & Continuity
        'services.backup.metaTitle': 'Backups & Continuity for SMEs | 3-2-1 with Testing',
        'services.backup.metaDescription':
            '3-2-1 backups, restore testing, continuity, and simple plans to reduce the impact of failures and ransomware.',
        'services.backup.heroTitle': 'Backups that restore — and continuity that works under pressure.',
        'services.backup.heroSubtitle': 'A backup only counts if you can recover. We design, implement, and test.',
        'services.backup.problems.one': 'Backups never tested',
        'services.backup.problems.two': 'Copies sitting next to the server',
        'services.backup.problems.three': 'Slow restores and nobody knows the steps',
        'services.backup.problems.four': 'Ransomware = full panic',
        'services.backup.what.core.title': '3-2-1 strategy',
        'services.backup.what.core.desc': 'Sized to budget and risk.',
        'services.backup.what.security.title': 'Restore testing',
        'services.backup.what.security.desc': 'Scheduled, with evidence.',
        'services.backup.what.ops.title': 'Continuity plan',
        'services.backup.what.ops.desc': 'Who does what in incidents.',
        'services.backup.deliverables.one': 'Defined RPO/RTO',
        'services.backup.deliverables.two': 'Backup plan + documentation',
        'services.backup.deliverables.three': 'Monthly/quarterly tests',
        'services.backup.deliverables.four': 'Incident checklist',
        'services.backup.feature.title': '3-2-1 with testing',
        'services.backup.feature.one': '3 copies, 2 media, 1 off-site',
        'services.backup.feature.two': 'Scheduled tests with proof',
        'services.backup.faq.q1': 'Specific tools?',
        'services.backup.faq.a1': 'We work with several; we choose by objective and budget.',
        'services.backup.faq.q2': 'Cloud vs on-prem?',
        'services.backup.faq.a2': 'We mix as needed for risk and cost.',
        'services.backup.faq.q3': 'Ransomware?',
        'services.backup.faq.a3': 'We plan isolation, immutability, and staged restoration.',
        'services.backup.faq.q4': 'Tests included?',
        'services.backup.faq.a4': 'Yes, with a defined schedule and evidence.',
        'services.backup.faq.q5': 'Documentation?',
        'services.backup.faq.a5': 'Clear steps to recover services and data.',
        'services.backup.final.title': 'Less risk. More predictability.',
        'services.backup.final.subtitle': 'Tested backups, clear RPO/RTO, and continuity planning.',

        // Projects & Procurement
        'services.projects.metaTitle': 'IT Projects & Procurement | Planning and Delivery',
        'services.projects.metaDescription':
            'IT projects with planning, delivery, and documentation. We also help with purchasing: specification, comparison, and implementation.',
        'services.projects.heroTitle': 'IT projects without drama — planned, delivered, documented.',
        'services.projects.heroSubtitle': 'Migrate, renew, expand — with control and without waste.',
        'services.projects.problems.one': 'Wrong, expensive purchases',
        'services.projects.problems.two': 'Projects that halt operations',
        'services.projects.problems.three': 'No documentation at the end',
        'services.projects.problems.four': 'Vendors with no accountability',
        'services.projects.what.core.title': 'Specification',
        'services.projects.what.core.desc': 'Real requirements and objectives.',
        'services.projects.what.security.title': 'Comparison and selection',
        'services.projects.what.security.desc': 'TCO, risk, and support.',
        'services.projects.what.ops.title': 'Delivery + handover',
        'services.projects.what.ops.desc': 'Implementation, validation, documentation.',
        'services.projects.deliverables.one': 'Plan + risks + rollback',
        'services.projects.deliverables.two': 'Shortlist with pros/cons',
        'services.projects.deliverables.three': 'Implementation + validation',
        'services.projects.deliverables.four': 'Final documentation',
        'services.projects.feature.title': 'Vendor-neutral approach',
        'services.projects.feature.one': 'We buy what makes sense, not what pays commission',
        'services.projects.feature.two': 'Realistic timelines and clear comms',
        'services.projects.feature.three': 'Complete handover, no black boxes',
        'services.projects.faq.q1': 'Work with existing suppliers?',
        'services.projects.faq.a1': 'Yes, we coordinate and keep accountability.',
        'services.projects.faq.q2': 'Typical timeline?',
        'services.projects.faq.a2': 'Depends on scope; we start with discovery and a plan.',
        'services.projects.faq.q3': 'Do you purchase hardware/software?',
        'services.projects.faq.a3': 'We can buy or assist your purchase; no hidden commissions.',
        'services.projects.faq.q4': 'Is documentation included?',
        'services.projects.faq.a4': 'Yes, we deliver full handover.',
        'services.projects.faq.q5': 'Rollback?',
        'services.projects.faq.a5': 'Planned and tested when applicable.',
        'services.projects.final.title': 'Let’s design the project before buying hardware.',
        'services.projects.final.subtitle': 'Planning, selection, and delivery with documentation.',

        // Compliance & GDPR
        'services.compliance.metaTitle': 'GDPR & Compliance for SMEs | Technical Controls and Routines',
        'services.compliance.metaDescription':
            'We help SMEs reduce risk: access control, retention, backups, logging, and practices that make sense in the real world.',
        'services.compliance.heroTitle': 'GDPR & compliance for SMEs — practical, applicable, no empty bureaucracy.',
        'services.compliance.heroSubtitle': 'Lower legal and operational risk with simple technical measures and usable documentation.',
        'services.compliance.problems.one': 'Shared access with no traceability',
        'services.compliance.problems.two': 'No retention or deletion practices',
        'services.compliance.problems.three': 'Lack of evidence in audits',
        'services.compliance.problems.four': 'Processes living “in someone’s head”',
        'services.compliance.what.core.title': 'Access and least privilege',
        'services.compliance.what.core.desc': 'Identity controls and basic traceability.',
        'services.compliance.what.security.title': 'Retention/archiving',
        'services.compliance.what.security.desc': 'M365, file shares, and clear policies.',
        'services.compliance.what.ops.title': 'Logging and routines',
        'services.compliance.what.ops.desc': 'Useful records and periodic reviews.',
        'services.compliance.deliverables.one': 'Technical controls checklist',
        'services.compliance.deliverables.two': 'Minimal documentation (what exists and where)',
        'services.compliance.deliverables.three': 'Prioritized improvement plan',
        'services.compliance.deliverables.four': 'Essential audit evidence',
        'services.compliance.feature.title': 'GDPR without theatre',
        'services.compliance.feature.one': 'Technical measures that make sense',
        'services.compliance.feature.two': 'Useful documentation, no empty bureaucracy',
        'services.compliance.feature.three': 'Evidence for real audits',
        'services.compliance.faq.q1': 'Do you cover policy and technical?',
        'services.compliance.faq.a1': 'We focus on technical controls and support translating them into policy.',
        'services.compliance.faq.q2': 'Work with legal teams?',
        'services.compliance.faq.a2': 'Yes, we collaborate with legal/consultants.',
        'services.compliance.faq.q3': 'Retention in M365?',
        'services.compliance.faq.a3': 'We define retention/archiving and external sharing policies.',
        'services.compliance.faq.q4': 'Audits?',
        'services.compliance.faq.a4': 'We prepare technical evidence and response flows.',
        'services.compliance.final.title': 'Reduce risk with real work, not paperwork.',
        'services.compliance.final.subtitle': 'Technical controls, retention, and useful evidence.',

        // Contact page
        'contact.hero.badge': 'Contact',
        'contact.hero.title': 'Talk directly with the senior team.',
        'contact.hero.subtitle': 'Skip the endless triage. Share the context and we come back with a clear path to stabilise and secure your IT.',
        'contact.hero.point1': 'We respond in Portuguese or English.',
        'contact.hero.point2': 'No jargon—fast decisions with clear language.',
        'contact.hero.point3': 'Infrastructure, cloud, security, and operations in one place.',
        'contact.channels.title': 'Choose how you want to move forward',
        'contact.channels.subtitle': 'Use the form to explain the challenge or ask for a short call to align priorities.',
        'contact.channels.message.title': 'Quick note',
        'contact.channels.message.desc': 'Tell us what you need. We validate the context and reply with clear next steps.',
        'contact.channels.call.title': 'Discovery call',
        'contact.channels.call.desc': '30 minutes with someone who actually executes. Flexible scheduling on Teams, Zoom, or phone.',
        'contact.channels.projects.title': 'Projects & audits',
        'contact.channels.projects.desc': 'Have an RFP, audit, or incident? Share the details and we triage first steps.',
        'contact.form.heading': 'Tell us what you need',
        'contact.form.subheading': 'We reply in your preferred language and only ask the essentials to get moving.',
        'contact.expectations.title': 'What happens next',
        'contact.expectations.item1': 'Manual review by the senior team—no chatbots.',
        'contact.expectations.item2': 'If it is time-sensitive, we prioritise the first available call.',
        'contact.expectations.item3': 'You receive a concise plan or suggested next steps within the requested scope.',

        // Contact form
        'contact.form.name': 'Name',
        'contact.form.company': 'Company',
        'contact.form.companyOptional': 'Company (optional)',
        'contact.form.email': 'Email',
        'contact.form.workEmail': 'Work Email',
        'contact.form.topic': 'Topic',
        'contact.form.urgency': 'Urgency',
        'contact.form.urgencyNormal': 'Normal urgency',
        'contact.form.urgencyUrgent': 'Urgent',
        'contact.form.message': 'Message',
        'contact.form.messagePlaceholder': 'Describe your challenge...',
        'contact.form.submit': 'Send Message',
        'contact.form.sending': 'Sending...',
        'contact.form.success': "Thanks! We'll reply shortly.",
        'contact.form.error': 'There was an issue sending your message. Please try again.',

        // Contact topics
        'contact.topics.managedIt': 'Managed IT',
        'contact.topics.cybersecurity': 'Cybersecurity',
        'contact.topics.cloud': 'Cloud & M365',
        'contact.topics.projects': 'Projects',
        'contact.topics.general': 'General',

        // Footer
        'footer.contactUs': 'contact us',
        'footer.newsletter': 'Newsletter',
        'footer.awards': 'Awards',
        'footer.tagline': 'Technology with a human heart.',
        'footer.about': 'Reliable IT, clear security, and calm support for teams that value stability.',
        'footer.location': 'Portugal',
        'footer.hours': 'Mon–Fri, 9–18',
        'footer.note': "We're based in Portugal, proudly supporting teams across Europe.",
        'footer.newsletterText': 'Short, practical insights on security, stability, and calm operations.',
        'footer.newsletterPlaceholder': 'Your email address',
        'footer.newsletterButton': 'Sign up',
        'footer.copyright': '© {year} Loading Happiness. Engineered for Stability.',
        'footer.legal.privacy': 'Privacy',
        'footer.legal.terms': 'Terms',
        'footer.legal.cookies': 'Cookies',
    },
};

/**
 * Get a translation for a given key and locale
 */
export function t(key: TranslationKey, locale: Locale = 'pt', params?: Record<string, string | number>): string {
    let translation = translations[locale][key] || translations['en'][key] || key;

    // Simple interpolation: replace {param} with values
    if (params) {
        Object.entries(params).forEach(([paramKey, value]) => {
            translation = translation.replace(`{${paramKey}}`, String(value));
        });
    }

    return translation;
}

/**
 * Create a translation function bound to a specific locale
 */
export function createTranslator(locale: Locale) {
    return (key: TranslationKey, params?: Record<string, string | number>) => t(key, locale, params);
}

export default translations;
