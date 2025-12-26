/**
 * API Route: Generate Image with AI
 * POST /api/ai/generate-image
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/lib/gemini';
import { getPayloadClient } from '@/lib/payload';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { prompt, aspectRatio, saveToMedia = true } = body;

        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        // 1. Generate the image
        const result = await generateImage({
            prompt,
            aspectRatio,
        });

        // 2. If requested, save to Payload Media collection
        if (saveToMedia && result.base64) {
            const payload = await getPayloadClient();

            // Convert base64 to Buffer
            const buffer = Buffer.from(result.base64, 'base64');
            const filename = `generated-${Date.now()}.png`;

            const mediaDoc = await payload.create({
                collection: 'media',
                data: {
                    alt: prompt.substring(0, 100),
                },
                file: {
                    data: buffer,
                    name: filename,
                    mimetype: 'image/png',
                    size: buffer.length,
                },
            });

            return NextResponse.json({
                ...result,
                mediaId: mediaDoc.id,
                mediaUrl: (mediaDoc as any).url,
            });
        }

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Error in generate-image API:', error);

        // Handle specific "Not Configured" error
        if (error.message?.includes('Vertex AI configuration')) {
            return NextResponse.json(
                { error: 'Image generation requires Vertex AI setup on Google Cloud. Please configure your service account.' },
                { status: 501 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Failed to generate image' },
            { status: 500 }
        );
    }
}
