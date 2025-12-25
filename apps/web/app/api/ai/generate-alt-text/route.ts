/**
 * API Route: Generate Image Alt Text
 * POST /api/ai/generate-alt-text
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateImageAltText } from '@/lib/gemini';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { imageUrl, context, filename, language } = body;

        const altText = await generateImageAltText({
            imageUrl,
            context,
            filename,
            language,
        });

        return NextResponse.json({ altText });
    } catch (error: any) {
        console.error('Error generating alt text:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate alt text' },
            { status: 500 }
        );
    }
}
