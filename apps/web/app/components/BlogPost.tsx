/**
 * Blog Post Component with SEO and Social Sharing
 */

import Link from 'next/link';
import type { Author } from '@/payload-types';
import { Content as ContentType } from '@/payload-types';
import { withLocale } from '@/lib/locale';

type BlogPostProps = {
    post: ContentType;
    localePrefix: string;
    showExcerpt?: boolean;
    showReadingTime?: boolean;
    showAuthor?: boolean;
    variant?: 'card' | 'list' | 'featured';
};

export default function BlogPost({
    post,
    localePrefix,
    showExcerpt = true,
    showReadingTime = true,
    showAuthor = true,
    variant = 'card',
}: BlogPostProps) {
    const featuredImage = typeof post.featuredImage === 'object' && post.featuredImage !== null
        ? post.featuredImage
        : null;
    const author = Array.isArray(post.authors) && post.authors.length > 0
        ? (typeof post.authors[0] === 'object' && post.authors[0] !== null
            ? (post.authors[0] as Author)
            : null)
        : null;
    const authorPhoto = author?.photo;

    if (variant === 'featured') {
        return (
            <article className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-gray-100">
                <div className="grid md:grid-cols-2 gap-0">
                    {featuredImage && (
                        <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                            <img
                                src={featuredImage.url || ''}
                                alt={featuredImage.alt || post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    )}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-accent bg-accent/15 px-3 py-1 rounded-full">
                                {post.contentType}
                            </span>
                            {post.featured && (
                                <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/15 px-3 py-1 rounded-full">
                                    ⭐ Featured
                                </span>
                            )}
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 group-hover:text-primaryDark transition-colors">
                            <Link href={withLocale(`/news/${post.slug}`, localePrefix)}>
                                {post.title}
                            </Link>
                        </h2>
                        {showExcerpt && (
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                {post.excerpt}
                            </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            {showReadingTime && post.readingTime && (
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {post.readingTime} min
                                </span>
                            )}
                            {showAuthor && author && (
                                <span className="flex items-center gap-2">
                                    {authorPhoto && typeof authorPhoto !== 'number' && (
                                        <img
                                            src={authorPhoto.url || ''}
                                            alt={author.name}
                                            className="w-6 h-6 rounded-full"
                                        />
                                    )}
                                    <span>{author.name}</span>
                                </span>
                            )}
                            {post.publishedAt && (
                                <time dateTime={post.publishedAt}>
                                    {new Date(post.publishedAt).toLocaleDateString('pt-PT', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    if (variant === 'list') {
        return (
            <article className="group flex gap-6 pb-6 border-b border-gray-100">
                {featuredImage && (
                    <Link href={withLocale(`/news/${post.slug}`, localePrefix)} className="flex-shrink-0">
                        <div className="w-32 h-32 rounded-xl overflow-hidden">
                            <img
                                src={featuredImage.url || ''}
                                alt={featuredImage.alt || post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </Link>
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-accent">
                            {post.contentType}
                        </span>
                        {showReadingTime && post.readingTime && (
                            <span className="text-xs text-gray-500">• {post.readingTime} min</span>
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primaryDark transition-colors line-clamp-2">
                        <Link href={withLocale(`/news/${post.slug}`, localePrefix)}>
                            {post.title}
                        </Link>
                    </h3>
                    {showExcerpt && (
                        <p className="text-gray-600 line-clamp-2 mb-3">{post.excerpt}</p>
                    )}
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        {showAuthor && author && <span>{author.name}</span>}
                        {post.publishedAt && (
                            <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString('pt-PT')}
                            </time>
                        )}
                    </div>
                </div>
            </article>
        );
    }

    // Default: card variant
    return (
        <article className="group rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all">
            {featuredImage && (
                <Link href={withLocale(`/news/${post.slug}`, localePrefix)}>
                    <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                        <img
                            src={featuredImage.url || ''}
                            alt={featuredImage.alt || post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </Link>
            )}
            <div className="p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-accent bg-accent/15 px-2 py-1 rounded">
                        {post.contentType}
                    </span>
                    {showReadingTime && post.readingTime && (
                        <span className="text-xs text-gray-500">• {post.readingTime} min read</span>
                    )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primaryDark transition-colors line-clamp-2">
                    <Link href={withLocale(`/news/${post.slug}`, localePrefix)}>
                        {post.title}
                    </Link>
                </h3>
                {showExcerpt && (
                    <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                    </p>
                )}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        {showAuthor && author && (
                            <div className="flex items-center gap-2">
                                {authorPhoto && typeof authorPhoto !== 'number' && (
                                    <img
                                        src={authorPhoto.url || ''}
                                        alt={author.name}
                                        className="w-6 h-6 rounded-full"
                                    />
                                )}
                                <span>{author.name}</span>
                            </div>
                        )}
                        {post.publishedAt && (
                            <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString('pt-PT', {
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </time>
                        )}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-1">
                            {post.tags.slice(0, 2).map((tag: any) => (
                                <span
                                    key={tag.id}
                                    className="text-xs px-2 py-1 rounded bg-gray-50 text-gray-600"
                                >
                                    #{typeof tag !== 'string' ? tag.name : tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
