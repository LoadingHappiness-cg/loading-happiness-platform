/**
 * Google Gemini AI Service
 * 
 * Provides AI-powered features for content generation, SEO optimization,
 * accessibility improvements, and image alt text generation.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn('⚠️ GEMINI_API_KEY not configured. AI features will be disabled.');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * Generate blog post content based on a topic
 */
export async function generateBlogContent(params: {
    topic: string;
    keywords?: string[];
    tone?: 'professional' | 'casual' | 'technical';
    language?: 'pt' | 'en';
    wordCount?: number;
}): Promise<{ title: string; content: string; excerpt: string }> {
    if (!genAI) {
        throw new Error('Gemini API not configured');
    }

    const {
        topic,
        keywords = [],
        tone = 'professional',
        language = 'pt',
        wordCount = 800,
    } = params;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `
You are a professional content writer for Loading Happiness, an IT services company specializing in managed IT, cybersecurity, and cloud solutions.

Write a blog post in ${language === 'pt' ? 'Portuguese (Portugal)' : 'English'} about: ${topic}

Requirements:
- Tone: ${tone}
- Target word count: ${wordCount} words
- Include these keywords naturally: ${keywords.join(', ')}
- Structure: Introduction, 3-4 main sections, conclusion
- Focus on practical value for IT managers and business owners
- Include actionable insights
${language === 'pt' ? '- Use Portuguese from Portugal (not Brazilian)' : ''}

Provide the response in JSON format:
{
  "title": "Engaging title for the post",
  "content": "Full blog post content in markdown format",
  "excerpt": "Compelling 2-sentence summary (max 160 characters)"
}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Failed to parse AI response');
    }

    const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
    return parsed;
}

/**
 * Generate SEO-optimized meta description
 */
export async function generateMetaDescription(params: {
    title: string;
    content: string;
    keywords?: string[];
    language?: 'pt' | 'en';
}): Promise<string> {
    if (!genAI) {
        throw new Error('Gemini API not configured');
    }

    const { title, content, keywords = [], language = 'pt' } = params;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `
Create an SEO-optimized meta description in ${language === 'pt' ? 'Portuguese (Portugal)' : 'English'} for this blog post:

Title: ${title}
Content preview: ${content.substring(0, 500)}...
Keywords: ${keywords.join(', ')}

Requirements:
- Maximum 155 characters
- Include primary keyword naturally
- Compelling and action-oriented
- Accurately summarize the content
${language === 'pt' ? '- Use Portuguese from Portugal' : ''}

Return ONLY the meta description text, nothing else.
`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim().replace(/^["']|["']$/g, '');
}

/**
 * Generate SEO keywords from content
 */
export async function generateSEOKeywords(params: {
    title: string;
    content: string;
    language?: 'pt' | 'en';
    count?: number;
}): Promise<string[]> {
    if (!genAI) {
        throw new Error('Gemini API not configured');
    }

    const { title, content, language = 'pt', count = 10 } = params;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `
Analyze this content and extract ${count} SEO keywords/phrases in ${language === 'pt' ? 'Portuguese (Portugal)' : 'English'}:

Title: ${title}
Content: ${content.substring(0, 1000)}...

Requirements:
- Mix of short-tail and long-tail keywords
- Relevant to IT services, cybersecurity, and cloud computing
- High search intent
- Natural language

Return as a JSON array of strings: ["keyword1", "keyword2", ...]
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const jsonMatch = response.match(/\[[\s\S]*?\]/);
    if (!jsonMatch) {
        throw new Error('Failed to parse keywords');
    }

    return JSON.parse(jsonMatch[0]);
}

/**
 * Generate alt text for an image
 */
export async function generateImageAltText(params: {
    imageUrl?: string;
    context?: string;
    filename?: string;
    language?: 'pt' | 'en';
}): Promise<string> {
    if (!genAI) {
        throw new Error('Gemini API not configured');
    }

    const { imageUrl, context, filename, language = 'pt' } = params;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    let prompt = `
Generate a descriptive alt text in ${language === 'pt' ? 'Portuguese (Portugal)' : 'English'} for an image.

Context: ${context || 'IT services, technology, business'}
${filename ? `Filename: ${filename}` : ''}

Requirements:
- Concise but descriptive (max 125 characters)
- Describe what's in the image, not what it means
- No "image of" or "picture of" prefix
- Accessible and helpful for screen readers
${language === 'pt' ? '- Use Portuguese from Portugal' : ''}

Return ONLY the alt text, nothing else.
`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim().replace(/^["']|["']$/g, '');
}

/**
 * Analyze content for accessibility improvements
 */
export async function analyzeAccessibility(params: {
    content: string;
    language?: 'pt' | 'en';
}): Promise<{
    score: number;
    issues: Array<{ type: string; description: string; suggestion: string }>;
    suggestions: string[];
}> {
    if (!genAI) {
        throw new Error('Gemini API not configured');
    }

    const { content, language = 'pt' } = params;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `
Analyze this HTML/Markdown content for WCAG 2.1 AA accessibility compliance in ${language === 'pt' ? 'Portuguese (Portugal)' : 'English'}:

${content.substring(0, 2000)}...

Check for:
- Heading hierarchy
- Link text clarity
- Image alt text presence
- Color contrast (if applicable)
- Reading level
- Content structure

Provide response in JSON format:
{
  "score": 0-100,
  "issues": [
    {
      "type": "heading-hierarchy|links|images|readability",
      "description": "What's wrong",
      "suggestion": "How to fix it"
    }
  ],
  "suggestions": ["General improvement suggestion 1", "..."]
}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Failed to parse accessibility analysis');
    }

    return JSON.parse(jsonMatch[1] || jsonMatch[0]);
}

/**
 * Generate table of contents from markdown content
 */
export async function generateTableOfContents(params: {
    content: string;
    language?: 'pt' | 'en';
}): Promise<Array<{ level: number; title: string; id: string }>> {
    if (!genAI) {
        throw new Error('Gemini API not configured');
    }

    const { content, language = 'pt' } = params;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `
Extract headings from this markdown content and create a table of contents structure:

${content}

Return as JSON array:
[
  {
    "level": 2,
    "title": "Heading text",
    "id": "heading-slug"
  }
]

Rules:
- Only include h2 and h3 headings
- Generate URL-friendly slugs for IDs
- Maintain heading hierarchy
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const jsonMatch = response.match(/\[[\s\S]*?\]/);
    if (!jsonMatch) {
        throw new Error('Failed to parse table of contents');
    }

    return JSON.parse(jsonMatch[0]);
}

/**
 * Calculate estimated reading time
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): {
    minutes: number;
    text: string;
} {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);

    return {
        minutes,
        text: `${minutes} min read`,
    };
}

/**
 * Generate related post suggestions based on content similarity
 */
export async function suggestRelatedPosts(params: {
    currentPostTitle: string;
    currentPostContent: string;
    availablePosts: Array<{ id: string; title: string; excerpt: string }>;
    count?: number;
    language?: 'pt' | 'en';
}): Promise<string[]> {
    if (!genAI) {
        throw new Error('Gemini API not configured');
    }

    const { currentPostTitle, currentPostContent, availablePosts, count = 3, language = 'pt' } = params;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `
Analyze this blog post and suggest ${count} most related posts from the available list:

Current Post:
Title: ${currentPostTitle}
Content: ${currentPostContent.substring(0, 500)}...

Available Posts:
${availablePosts.map((p, i) => `${i + 1}. ID: ${p.id}, Title: ${p.title}, Excerpt: ${p.excerpt}`).join('\n')}

Return ONLY a JSON array of post IDs in order of relevance: ["id1", "id2", "id3"]
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const jsonMatch = response.match(/\[[\s\S]*?\]/);
    if (!jsonMatch) {
        throw new Error('Failed to parse related posts');
    }

    return JSON.parse(jsonMatch[0]);
}

export default {
    generateBlogContent,
    generateMetaDescription,
    generateSEOKeywords,
    generateImageAltText,
    analyzeAccessibility,
    generateTableOfContents,
    calculateReadingTime,
    suggestRelatedPosts,
};
