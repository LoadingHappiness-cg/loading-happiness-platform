
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPayloadClient } from '@/lib/payload';
import { Content as ContentType } from '@/payload-types';

interface TagPageProps {
  params: { slug: string };
  searchParams: { page?: string };
}

export default async function TagHubPage({ params, searchParams }: TagPageProps) {
  const { slug } = params;
  const { page } = searchParams;
  const payload = await getPayloadClient();
  const currentPage = parseInt(page || '1');
  const limit = 12;

  // 1. Fetch Tag Metadata
  const tagResult = await payload.find({
    collection: 'tags',
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (tagResult.docs.length === 0) {
    notFound();
  }

  const tag = tagResult.docs[0];

  // 2. Fetch Content for this Tag
  const posts = await payload.find({
    collection: 'content',
    where: {
      and: [
        { status: { equals: 'published' } },
        { tags: { in: [tag.id] } },
      ],
    },
    sort: '-publishedAt',
    limit,
    page: currentPage,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-16 border-b border-gray-100 pb-12">
        <Link href="/news" className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-6 inline-block hover:opacity-70">
          ← Back to News
        </Link>
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: tag.color || '#3b82f6' }}
          ></div>
          <h1 className="text-6xl font-black text-gray-900 tracking-tighter capitalize">
            {tag.name}
          </h1>
        </div>
        {tag.description && (
          <p className="text-2xl text-gray-500 max-w-3xl leading-relaxed">
            {tag.description}
          </p>
        )}
      </header>

      {posts.docs.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-gray-400 text-lg font-medium">No articles found in this topic yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.docs.map((post: ContentType) => (
            <article key={post.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {post.contentType}
                  </span>
                  <span className="text-gray-400 text-xs font-medium">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                  <Link href={`/news/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {posts.totalPages > 1 && (
        <div className="mt-16 flex justify-center gap-4">
           {/* Pagination logic as implemented in /news */}
        </div>
      )}
    </div>
  );
}
