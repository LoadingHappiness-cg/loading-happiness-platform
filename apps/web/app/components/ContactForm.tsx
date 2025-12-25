'use client';

import { useState } from 'react';
import { t, type Locale } from '@/lib/translations';

type ContactFormProps = {
  submitLabel?: string;
  topics?: string[];
  locale?: Locale;
};

export default function ContactForm({ submitLabel, topics, locale = 'pt' }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const defaultTopics = [
    { label: t('contact.topics.managedIt', locale), value: 'managed-it' },
    { label: t('contact.topics.cybersecurity', locale), value: 'cybersecurity' },
    { label: t('contact.topics.cloud', locale), value: 'cloud' },
    { label: t('contact.topics.projects', locale), value: 'projects' },
    { label: t('contact.topics.general', locale), value: 'general' },
  ];

  const topicOptions = topics?.length
    ? topics.map((label) => ({ label, value: label.toLowerCase().replace(/\s+/g, '-') }))
    : defaultTopics;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name'),
      company: formData.get('company'),
      email: formData.get('email'),
      topic: formData.get('topic'),
      urgency: formData.get('urgency'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Submission failed.');
      }

      event.currentTarget.reset();
      setStatus('success');
    } catch (submitError) {
      console.error(submitError);
      setError(t('contact.form.error', locale));
      setStatus('error');
    }
  };

  return (
    <form
      className="bg-white p-10 lg:p-12 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50 space-y-5"
      onSubmit={handleSubmit}
    >
      <input
        required
        name="name"
        className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/20 font-medium"
        placeholder={t('contact.form.name', locale)}
      />
      <input
        name="company"
        className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/20 font-medium"
        placeholder={t('contact.form.companyOptional', locale)}
      />
      <input
        required
        name="email"
        type="email"
        className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/20 font-medium"
        placeholder={t('contact.form.workEmail', locale)}
      />
      {topicOptions.length > 0 && (
        <select
          name="topic"
          aria-label={t('contact.form.topic', locale)}
          className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/20 font-medium bg-white"
        >
          {topicOptions.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
      )}
      <select
        name="urgency"
        defaultValue="normal"
        aria-label={t('contact.form.urgency', locale)}
        className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/20 font-medium bg-white"
      >
        <option value="normal">{t('contact.form.urgencyNormal', locale)}</option>
        <option value="urgent">{t('contact.form.urgencyUrgent', locale)}</option>
      </select>
      <textarea
        required
        name="message"
        rows={5}
        className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/20 font-medium"
        placeholder={t('contact.form.messagePlaceholder', locale)}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        data-umami-event="contact-submit"
        className="w-full py-4 bg-primary text-white rounded-2xl font-extrabold text-lg hover:bg-primaryDark transition-all shadow-xl shadow-primary/30 disabled:opacity-60"
      >
        {status === 'loading' ? t('contact.form.sending', locale) : submitLabel || t('contact.form.submit', locale)}
      </button>
      {status === 'success' && (
        <p className="text-sm font-semibold text-highlight">{t('contact.form.success', locale)}</p>
      )}
      {status === 'error' && <p className="text-sm font-semibold text-red-600">{error}</p>}
    </form>
  );
}
