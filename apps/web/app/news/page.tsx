
import React from 'react';
import Link from 'next/link';
import { getPayloadClient } from '@/lib/payload';
import { Content as ContentType } from '@/payload-types';
import { getLocale, getLocalePrefix, withLocale } from '@/lib/locale';

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    tags?: string;
    page?: string;
  };
}

export default async function NewsPage({ searchParams }: PageProps) {
  const { q, type, tags: tagSlugs, page } = searchParams;
  const payload = await getPayloadClient();
  const currentPage = parseInt(page || '1');
  const limit = 12;
  const locale = getLocale();
  const localePrefix = getLocalePrefix();

  // 1. Resolve Tag Slugs to IDs
  let tagIds: string[] = [];
  if (tagSlugs) {
    const slugs = tagSlugs.split(',');
    const resolvedTags = await payload.find({
      collection: 'tags',
      where: {
        slug: { in: slugs },
      },
      locale,
    });
    tagIds = resolvedTags.docs.map((t) => t.id);
  }

  // 2. Build Content Query
  const where: any = {
    status: { equals: 'published' },
  };

  if (type) {
    where.contentType = { equals: type };
  }

  if (q) {
    where.or = [
      { title: { like: q } },
      { excerpt: { like: q } },
    ];
  }

  if (tagIds.length > 0) {
    where.tags = { in: tagIds };
  }

  // 3. Fetch Content
  const posts = await payload.find({
    collection: 'content',
    where,
    sort: '-publishedAt',
    limit,
    page: currentPage,
    locale,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">News & Insights</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <form className="flex-1 min-w-[300px]" action={withLocale('/news', localePrefix)}>
            <input 
              name="q"
              defaultValue={q}
              placeholder="Search articles..."
              className="w-full px-5 py-3 rounded-xl border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </form>
          
          <div className="flex gap-2">
            {['Article', 'Opinion', 'Video', 'Guide'].map((t) => (
              <Link
                key={t}
                href={withLocale(`/news?type=${t}${q ? `&q=${q}` : ''}${tagSlugs ? `&tags=${tagSlugs}` : ''}`, localePrefix)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all ${type === t ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'}`}
              >
                {t}
              </Link>
            ))}
            {type && <Link href={withLocale('/news', localePrefix)} className="px-4 py-2 text-xs font-bold text-gray-400">Clear</Link>}
          </div>
        </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.docs.map((post: ContentType) => (
          <article key={post.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
            {post.featuredImage && typeof post.featuredImage !== 'string' && (
              <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                <img 
                  src={(post.featuredImage as any).url} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent bg-accent/15 px-2 py-1 rounded">
                  {post.contentType}
                </span>
                <span className="text-gray-300 text-xs">•</span>
                <span className="text-gray-400 text-xs font-medium">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primaryDark transition-colors leading-tight">
                <Link href={withLocale(`/news/${post.slug}`, localePrefix)}>{post.title}</Link>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="mt-auto flex flex-wrap gap-2 pt-6 border-t border-gray-50">
                {post.tags?.map((tag: any) => (
                  <Link
                    key={tag.id}
                    href={withLocale(`/news/tags/${tag.slug}`, localePrefix)}
                    className="text-[10px] font-bold text-gray-500 hover:text-primaryDark transition-colors px-2 py-1 bg-gray-50 rounded"
                    style={tag.color ? { borderLeft: `3px solid ${tag.color}` } : {}}
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {posts.totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center gap-4">
          <Link
            href={withLocale(`/news?page=${currentPage - 1}${q ? `&q=${q}` : ''}${type ? `&type=${type}` : ''}${tagSlugs ? `&tags=${tagSlugs}` : ''}`, localePrefix)}
            className={`px-6 py-3 rounded-xl font-bold text-sm ${currentPage <= 1 ? 'pointer-events-none opacity-40 bg-gray-100' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
            Previous
          </Link>
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            Page {currentPage} of {posts.totalPages}
          </span>
          <Link
            href={withLocale(`/news?page=${currentPage + 1}${q ? `&q=${q}` : ''}${type ? `&type=${type}` : ''}${tagSlugs ? `&tags=${tagSlugs}` : ''}`, localePrefix)}
            className={`px-6 py-3 rounded-xl font-bold text-sm ${currentPage >= posts.totalPages ? 'pointer-events-none opacity-40 bg-gray-100' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
