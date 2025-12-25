/**
 * API Route: Generate Blog Content with AI
 * POST /api/ai/generate-content
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateBlogContent } from '@/lib/gemini';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { topic, keywords, tone, language, wordCount } = body;

        if (!topic) {
            return NextResponse.json(
                { error: 'Topic is required' },
                { status: 400 }
            );
        }

        const result = await generateBlogContent({
            topic,
            keywords,
            tone,
            language,
            wordCount,
        });

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Error generating content:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate content' },
            { status: 500 }
        );
    }
}
