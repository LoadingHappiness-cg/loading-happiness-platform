/**
 * Example Blog Post Page
 * Demonstrates full SEO implementation with Schema.org, Open Graph, and AI features
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPayloadClient } from '@/lib/payload';
import { getLocale, withLocale, t } from '@/lib/locale';
import { generateBlogPostSEO, generateBlogPostSchema, generateBreadcrumbSchema } from '@/lib/seo';
import SocialShare from '@/app/components/SocialShare';
import BlogPost from '@/app/components/BlogPost';
import PageBlocks from '@/app/components/PageBlocks';
import type { Author } from '@/payload-types';

type Props = {
    params: Promise<{ slug: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const payload = await getPayloadClient();
    const locale = await getLocale();

    const result = await payload.find({
        collection: 'content',
        where: {
            and: [
                { slug: { equals: slug } },
                { status: { equals: 'published' } },
            ],
        },
        limit: 1,
        locale,
    });

    const post = result.docs[0];
    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return generateBlogPostSEO({ post, locale });
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const payload = await getPayloadClient();
    const locale = await getLocale();
    const localePrefix = `/${locale}`;

    // Fetch the post
    const result = await payload.find({
        collection: 'content',
        where: {
            and: [
                { slug: { equals: slug } },
                { status: { equals: 'published' } },
            ],
        },
        limit: 1,
        locale,
    });

    const post = result.docs[0];
    if (!post) {
        notFound();
    }

    // Fetch related posts
    const relatedPostsIds = post.relatedPosts?.map((p: any) =>
        typeof p === 'string' ? p : p.id
    ) || [];

    let relatedPosts: any[] = [];
    if (relatedPostsIds.length > 0) {
        const relatedResult = await payload.find({
            collection: 'content',
            where: {
                and: [
                    { id: { in: relatedPostsIds } },
                    { status: { equals: 'published' } },
                ],
            },
            limit: 3,
            locale,
        });
        relatedPosts = relatedResult.docs;
    }

    // Get author info
    const author = Array.isArray(post.authors) && post.authors.length > 0
        ? (typeof post.authors[0] === 'object' && post.authors[0] !== null
            ? (post.authors[0] as Author)
            : null)
        : null;
    const authorPhoto = author?.photo;

    const featuredImage = typeof post.featuredImage === 'object' && post.featuredImage !== null
        ? post.featuredImage
        : null;
    const currentUrl = `https://loadinghappiness.com${localePrefix}/news/${post.slug}`;

    // Translations
    const relatedPostsHeading = await t('home.latestInsights');
    const backToNews = locale === 'pt' ? 'Voltar às notícias' : 'Back to news';

    return (
        <>
            {/* Schema.org Structured Data */}
            {generateBlogPostSchema({ post, locale })}
            {generateBreadcrumbSchema({
                items: [
                    { name: 'Home', url: `https://loadinghappiness.com${localePrefix}` },
                    { name: 'News', url: `https://loadinghappiness.com${localePrefix}/news` },
                    { name: post.title, url: currentUrl },
                ],
            })}

            {/* Article Header */}
            <article className="bg-white">
                {/* Breadcrumb */}
                <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <ol className="flex items-center gap-2 text-sm text-gray-500">
                        <li>
                            <Link href={localePrefix} className="hover:text-primary">Home</Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href={withLocale('/news', localePrefix)} className="hover:text-primary">News</Link>
                        </li>
                        <li>/</li>
                        <li className="text-gray-900 font-medium truncate">{post.title}</li>
                    </ol>
                </nav>

                {/* Hero Section */}
                <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-accent bg-accent/15 px-3 py-1 rounded-full">
                            {post.contentType}
                        </span>
                        {post.featured && (
                            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/15 px-3 py-1 rounded-full">
                                ⭐ Featured
                            </span>
                        )}
                        {post.readingTime && (
                            <span className="flex items-center gap-1 text-sm text-gray-500">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {post.readingTime} min read
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                        {post.excerpt}
                    </p>

                    {/* Author & Date */}
                    <div className="flex items-center justify-between border-y border-gray-200 py-6">
                        <div className="flex items-center gap-4">
                            {author && (
                                <div className="flex items-center gap-3">
                                    {authorPhoto && typeof authorPhoto !== 'number' && (
                                        <img
                                            src={authorPhoto.url || ''}
                                            alt={author.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                    )}
                                    <div>
                                        <p className="font-semibold text-gray-900">{author.name}</p>
                                        {author.role && (
                                            <p className="text-sm text-gray-500">{author.role}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                            {post.publishedAt && (
                                <time dateTime={post.publishedAt} className="text-sm text-gray-500">
                                    {new Date(post.publishedAt).toLocaleDateString(locale === 'pt' ? 'pt-PT' : 'en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            )}
                        </div>

                        {/* Social Share */}
                        <SocialShare
                            url={currentUrl}
                            title={post.title}
                            description={post.excerpt}
                            hashtags={post.tags?.slice(0, 3).map((t: any) =>
                                typeof t !== 'string' ? t.name : t
                            )}
                        />
                    </div>
                </header>

                {/* Featured Image */}
                {featuredImage && (
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                        <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src={featuredImage.url || ''}
                                alt={featuredImage.alt || post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Table of Contents */}
                {post.tableOfContents && Array.isArray(post.tableOfContents) && post.tableOfContents.length > 0 && (
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">
                                {locale === 'pt' ? 'Índice' : 'Table of Contents'}
                            </h2>
                            <nav>
                                <ul className="space-y-2">
                                    {post.tableOfContents.map((item: any, index: number) => {
                                        const depth = Math.max(0, item.level - 2);
                                        const paddingClasses = [
                                            'pl-0', 'pl-4', 'pl-8', 'pl-12', 'pl-16'
                                        ];
                                        const paddingClass = paddingClasses[depth] || 'pl-16';

                                        return (
                                            <li key={index} className={paddingClass}>
                                                <a
                                                    href={`#${item.id}`}
                                                    className="text-gray-700 hover:text-primary transition-colors"
                                                >
                                                    {item.title}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="prose prose-lg max-w-none">
                        <PageBlocks blocks={post.body || []} localePrefix={localePrefix} />
                    </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag: any) => (
                                <span
                                    key={tag.id}
                                    className="text-sm px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                >
                                    #{typeof tag !== 'string' ? tag.name : tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Share Again */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pt-8 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-600 mb-4">
                        {locale === 'pt' ? 'Gostou deste artigo? Partilhe!' : 'Enjoyed this article? Share it!'}
                    </p>
                    <SocialShare
                        url={currentUrl}
                        title={post.title}
                        description={post.excerpt}
                    />
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="bg-gray-50 py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
                                {relatedPostsHeading}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedPosts.map((relatedPost) => (
                                    <BlogPost
                                        key={relatedPost.id}
                                        post={relatedPost}
                                        localePrefix={localePrefix}
                                        variant="card"
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Back to News */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Link
                        href={withLocale('/news', localePrefix)}
                        className="inline-flex items-center gap-2 text-primary hover:text-primaryDark font-semibold transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {backToNews}
                    </Link>
                </div>
            </article>
        </>
    );
}
