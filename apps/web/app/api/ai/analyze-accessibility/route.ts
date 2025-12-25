/**
 * API Route: Analyze Content Accessibility
 * POST /api/ai/analyze-accessibility
 */

import { NextRequest, NextResponse } from 'next/server';
import { analyzeAccessibility } from '@/lib/gemini';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { content, language } = body;

        if (!content) {
            return NextResponse.json(
                { error: 'Content is required' },
                { status: 400 }
            );
        }

        const analysis = await analyzeAccessibility({
            content,
            language,
        });

        return NextResponse.json(analysis);
    } catch (error: any) {
        console.error('Error analyzing accessibility:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to analyze accessibility' },
            { status: 500 }
        );
    }
}
