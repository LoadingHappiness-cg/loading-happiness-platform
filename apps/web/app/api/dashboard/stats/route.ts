/**
 * API Route: Dashboard Statistics
 * GET /api/dashboard/stats
 */

import { NextResponse } from 'next/server';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { getPayloadClient } from '@/lib/payload';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET() {
    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
        return NextResponse.json({
            totalPosts: 0,
            publishedPosts: 0,
            draftPosts: 0,
            totalViews: 0,
            postsThisMonth: 0,
            avgReadingTime: 0,
            totalImages: 0,
            imagesWithoutAlt: 0,
        });
    }
    try {
        const payload = await getPayloadClient();

        // Get all content posts
        const allPosts = await payload.find({
            collection: 'content',
            limit: 1000,
            pagination: false,
        });

        // Get published posts
        const publishedPosts = await payload.find({
            collection: 'content',
            where: {
                status: { equals: 'published' },
            },
            limit: 1000,
            pagination: false,
        });

        // Get draft posts
        const draftPosts = await payload.find({
            collection: 'content',
            where: {
                status: { equals: 'draft' },
            },
            limit: 1000,
            pagination: false,
        });

        // Get posts from this month
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const postsThisMonth = await payload.find({
            collection: 'content',
            where: {
                and: [
                    { status: { equals: 'published' } },
                    { publishedAt: { greater_than_equal: firstDayOfMonth.toISOString() } },
                ],
            },
            limit: 1000,
            pagination: false,
        });

        // Calculate average reading time
        const totalReadingTime = allPosts.docs.reduce((sum: number, post: any) => {
            return sum + (post.readingTime || 0);
        }, 0);
        const avgReadingTime = allPosts.docs.length > 0
            ? Math.round(totalReadingTime / allPosts.docs.length)
            : 0;

        // Get all media
        const allMedia = await payload.find({
            collection: 'media',
            limit: 1000,
            pagination: false,
        });

        // Count images without ALT text
        const imagesWithoutAlt = allMedia.docs.filter((media: any) => {
            return !media.alt || media.alt.trim() === '';
        }).length;

        const stats = {
            totalPosts: allPosts.totalDocs,
            publishedPosts: publishedPosts.totalDocs,
            draftPosts: draftPosts.totalDocs,
            totalViews: 0, // TODO: Integrate with analytics
            postsThisMonth: postsThisMonth.totalDocs,
            avgReadingTime,
            totalImages: allMedia.totalDocs,
            imagesWithoutAlt,
        };

        return NextResponse.json(stats);
    } catch (error: any) {
        console.error('Error fetching dashboard stats:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch dashboard stats' },
            { status: 500 }
        );
    }
}
