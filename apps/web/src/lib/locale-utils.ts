export const withLocale = (href?: string | null, prefix = '/pt') => {
    if (!href || typeof href !== 'string') {
        return '#';
    }
    if (!href.startsWith('/')) {
        return href;
    }
    if (href.startsWith('/pt') || href.startsWith('/en')) {
        const normalized = href.replace(/^\/(pt|en)(?=\/|$)/, '');
        return `${prefix}${normalized || ''}`;
    }
    return `${prefix}${href}`;
};
