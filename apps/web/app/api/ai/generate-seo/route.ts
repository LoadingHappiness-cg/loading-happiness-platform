/**
 * API Route: Generate SEO Meta Description
 * POST /api/ai/generate-seo
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateMetaDescription, generateSEOKeywords } from '@/lib/gemini';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, content, keywords, language, type } = body;

        if (!title || !content) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        if (type === 'keywords') {
            const result = await generateSEOKeywords({
                title,
                content,
                language,
                count: 10,
            });
            return NextResponse.json({ keywords: result });
        }

        // Default: generate meta description
        const metaDescription = await generateMetaDescription({
            title,
            content,
            keywords,
            language,
        });

        return NextResponse.json({ metaDescription });
    } catch (error: any) {
        console.error('Error generating SEO:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate SEO content' },
            { status: 500 }
        );
    }
}
