/**
 * SEO Metadata Component
 * Generates meta tags, Open Graph, Twitter Cards, and Schema.org structured data
 */

import { Metadata } from 'next';
import { Content as ContentType } from '@/payload-types';

type GenerateSEOParams = {
    post: ContentType;
    locale: string;
    baseUrl?: string;
};

export function generateBlogPostSEO({ post, locale, baseUrl = 'https://loadinghappiness.com' }: GenerateSEOParams): Metadata {
    const seoTitle = post.seo?.title || post.title;
    const seoDescription = post.seo?.description || post.excerpt;
    const ogImage = typeof post.seo?.ogImage === 'object' && post.seo.ogImage !== null
        ? post.seo.ogImage.url
        : (typeof post.featuredImage === 'object' && post.featuredImage !== null ? post.featuredImage.url : null);

    const url = `${baseUrl}/${locale}/news/${post.slug}`;
    const publishedTime = post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined;

    const authors = Array.isArray(post.authors)
        ? post.authors
            .map((author) => {
                if (typeof author === 'string') return author;
                if (typeof author === 'object' && author !== null) return author.name;
                return null;
            })
            .filter((author): author is string => typeof author === 'string')
        : [];

    const keywords = post.seo?.keywords
        ? post.seo.keywords.map((k: any) => k.keyword).join(', ')
        : undefined;

    return {
        title: seoTitle,
        description: seoDescription,
        keywords,
        authors: authors.map(name => ({ name })),
        openGraph: {
            title: seoTitle,
            description: seoDescription,
            url,
            siteName: 'Loading Happiness',
            locale: locale === 'pt' ? 'pt_PT' : 'en_US',
            type: 'article',
            publishedTime,
            authors,
            images: ogImage ? [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: seoDescription,
            images: ogImage ? [ogImage] : [],
        },
        robots: {
            index: !post.seo?.noIndex,
            follow: !post.seo?.noIndex,
        },
        alternates: {
            canonical: url,
            languages: {
                'pt-PT': `${baseUrl}/pt/news/${post.slug}`,
                'en-US': `${baseUrl}/en/news/${post.slug}`,
            },
        },
    };
}

/**
 * Generate Schema.org JSON-LD for blog post
 */
export function generateBlogPostSchema(params: GenerateSEOParams) {
    const { post, locale, baseUrl = 'https://loadinghappiness.com' } = params;

    const url = `${baseUrl}/${locale}/news/${post.slug}`;
    const imageUrl = typeof post.featuredImage === 'object' && post.featuredImage !== null
        ? post.featuredImage.url
        : null;

    const authors = Array.isArray(post.authors)
        ? post.authors
            .map((author) => {
                if (typeof author !== 'object' || author === null) return null;
                return {
                    '@type': 'Person',
                    name: author.name,
                    ...(author.bio && { description: author.bio }),
                };
            })
            .filter(Boolean)
        : [];

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: imageUrl ? [imageUrl] : [],
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: authors,
        publisher: {
            '@type': 'Organization',
            name: 'Loading Happiness',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
        ...(post.readingTime && {
            timeRequired: `PT${post.readingTime}M`,
        }),
        inLanguage: locale === 'pt' ? 'pt-PT' : 'en-US',
        articleSection: post.contentType,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(params: {
    items: Array<{ name: string; url: string }>;
}) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: params.items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(params: {
    faqs: Array<{ question: string; answer: string }>;
}) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: params.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

const seoUtils = {
    generateBlogPostSEO,
    generateBlogPostSchema,
    generateBreadcrumbSchema,
    generateFAQSchema,
};

export default seoUtils;
