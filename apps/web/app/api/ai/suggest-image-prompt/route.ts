/**
 * API Route: Suggest Image Prompt with AI
 * POST /api/ai/suggest-image-prompt
 */

import { NextRequest, NextResponse } from 'next/server';
import { suggestImagePrompt } from '@/lib/gemini';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { topic, style, aspectRatio, language } = body;

        if (!topic) {
            return NextResponse.json(
                { error: 'Topic is required' },
                { status: 400 }
            );
        }

        const prompt = await suggestImagePrompt({
            topic,
            style,
            aspectRatio,
            language,
        });

        return NextResponse.json({ prompt });
    } catch (error: any) {
        console.error('Error suggesting prompt:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to suggest prompt' },
            { status: 500 }
        );
    }
}
