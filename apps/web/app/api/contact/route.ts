import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import nodemailer from 'nodemailer';
import { getPayloadClient } from '@/lib/payload';

type ContactPayload = {
  name?: string | null;
  company?: string | null;
  email?: string | null;
  topic?: string | null;
  urgency?: string | null;
  message?: string | null;
  captchaToken?: string | null;
};

type MailPayload = {
  name: string;
  email: string;
  message: string;
  company?: string;
  topic?: string;
  urgency?: string;
};

const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 8;
const rateBucket = new Map<string, { count: number; expires: number }>();

const SMTP_HOST = process.env.M365_SMTP_HOST || 'smtp.office365.com';
const SMTP_PORT = Number(process.env.M365_SMTP_PORT || 587);
const SMTP_USER = process.env.M365_SMTP_USER;
const SMTP_PASS = process.env.M365_SMTP_PASS;
const SMTP_FROM = process.env.M365_SMTP_FROM || SMTP_USER;
const SMTP_TO = process.env.M365_SMTP_TO || SMTP_USER;

const hasMailConfig = Boolean(SMTP_USER && SMTP_PASS && SMTP_FROM && SMTP_TO);

const transporter = hasMailConfig
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: { ciphers: 'TLSv1.2' },
    })
  : null;

const getClientId = (headerList: Headers) => {
  const forwarded = headerList.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return headerList.get('x-real-ip') || headerList.get('cf-connecting-ip') || 'unknown';
};

const isRateLimited = (key: string) => {
  const now = Date.now();
  const entry = rateBucket.get(key);
  if (!entry || entry.expires < now) {
    rateBucket.set(key, { count: 1, expires: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) return true;
  rateBucket.set(key, entry);
  return false;
};

const verifyRecaptcha = async (token: string | null | undefined, remoteIp: string) => {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) return true; // Captcha disabled
  if (!token) return false;
  const params = new URLSearchParams();
  params.append('secret', secret);
  params.append('response', token);
  if (remoteIp) params.append('remoteip', remoteIp);

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  }).catch(() => null);

  if (!response?.ok) return false;
  const data = (await response.json().catch(() => null)) as { success?: boolean; score?: number } | null;
  if (!data?.success) return false;
  if (typeof data.score === 'number' && data.score < 0.5) return false;
  return true;
};

const sendMail = async (payload: MailPayload) => {
  if (!transporter || !hasMailConfig) return false;
  const subject = `[Contact] ${payload.urgency === 'urgent' ? 'URGENT · ' : ''}${payload.topic || 'General'} · ${payload.name}`;
  const textLines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || '—'}`,
    `Topic: ${payload.topic || '—'}`,
    `Urgency: ${payload.urgency || '—'}`,
    '',
    payload.message,
  ];

  const html = `
    <h2>New Contact Submission</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Company:</strong> ${payload.company || '—'}</p>
    <p><strong>Topic:</strong> ${payload.topic || '—'}</p>
    <p><strong>Urgency:</strong> ${payload.urgency || '—'}</p>
    <p><strong>Message:</strong><br/>${(payload.message || '').replace(/\n/g, '<br/>')}</p>
  `;

  await transporter.sendMail({
    from: SMTP_FROM as string,
    to: SMTP_TO as string,
    subject,
    text: textLines.join('\n'),
    html,
  });
  return true;
};

export async function POST(req: Request) {
  const headerList = await headers();
  const clientId = getClientId(headerList);

  if (isRateLimited(clientId)) {
    return NextResponse.json({ ok: false, error: 'Rate limit exceeded. Please try again soon.' }, { status: 429 });
  }

  const body = (await req.json().catch(() => ({}))) as ContactPayload;
  const { name, email, message, company, topic, urgency, captchaToken } = body;
  const honeypot = (body as any).website;

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
  }

  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email.' }, { status: 400 });
  }

  const captchaOk = await verifyRecaptcha(captchaToken, clientId);
  if (!captchaOk) {
    return NextResponse.json({ ok: false, error: 'Captcha failed.' }, { status: 400 });
  }

  const allowedTopics = ['general', 'managed-it', 'cybersecurity', 'cloud', 'projects'] as const;
  const sanitizedTopic = allowedTopics.includes((topic || '') as any) ? (topic as (typeof allowedTopics)[number]) : 'general';
  const allowedUrgencies = ['normal', 'urgent'] as const;
  const sanitizedUrgency = allowedUrgencies.includes((urgency || '') as any) ? (urgency as (typeof allowedUrgencies)[number]) : 'normal';

  try {
    const payloadClient = await getPayloadClient();
    await payloadClient.create({
      collection: 'contact-submissions',
      data: {
        name,
        company: company || undefined,
        email,
        topic: sanitizedTopic,
        urgency: sanitizedUrgency,
        message,
      },
    });
  } catch (error) {
    console.error('Failed to save contact submission', error);
    return NextResponse.json({ ok: false, error: 'Unable to save submission.' }, { status: 500 });
  }

  try {
    await sendMail({
      name,
      company: company || '',
      email,
      topic: sanitizedTopic || '',
      urgency: sanitizedUrgency || '',
      message,
    });
  } catch (error) {
    console.error('Failed to send contact email', error);
    // Do not fail the request if email sending fails
  }

  return NextResponse.json({ ok: true });
}
