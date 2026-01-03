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

        // Services
        'services.managedIt.title': 'IT Gerida',
        'services.managedIt.description': 'Suporte proativo e gestão de infraestrutura que reduz o ruído.',
        'services.cybersecurity.title': 'Cibersegurança',
        'services.cybersecurity.description': 'Controlos de segurança práticos que protegem sem o atrasar.',
        'services.cloud.title': 'Estratégia Cloud',
        'services.cloud.description': 'Ambientes M365 e Azure governados e seguros, construídos para escalar.',
        'services.networking.title': 'Networking e Conectividade',
        'services.networking.description': 'Wi-Fi, segmentação, VPN e monitorização.',
        'services.infrastructure.title': 'Infraestrutura e Virtualização',
        'services.infrastructure.description': 'Armazenamento, backups e testes de recuperação.',
        'services.strategyRoadmaps.title': 'Estratégia e Roadmaps',
        'services.strategyRoadmaps.description': 'Plano prático de 12–24 meses.',

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

        // Services
        'services.managedIt.title': 'Managed IT',
        'services.managedIt.description': 'Proactive support and infrastructure management that reduces noise.',
        'services.cybersecurity.title': 'Cybersecurity',
        'services.cybersecurity.description': 'Practical security controls that protect without slowing you down.',
        'services.cloud.title': 'Cloud Strategy',
        'services.cloud.description': 'Governed and secure M365 and Azure environments built for scale.',
        'services.networking.title': 'Networking & Connectivity',
        'services.networking.description': 'Wi-Fi, segmentation, VPN, and monitoring.',
        'services.infrastructure.title': 'Infrastructure & Virtualization',
        'services.infrastructure.description': 'Storage, backups, and recovery testing.',
        'services.strategyRoadmaps.title': 'Strategy & Roadmaps',
        'services.strategyRoadmaps.description': '12–24 month practical plan.',

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
