'use client';

import { useState } from 'react';

type ContactFormProps = {
  submitLabel?: string;
  topics?: string[];
};

const defaultTopics = [
  { label: 'Managed IT', value: 'managed-it' },
  { label: 'Cybersecurity', value: 'cybersecurity' },
  { label: 'Cloud & M365', value: 'cloud' },
  { label: 'Projects', value: 'projects' },
  { label: 'General', value: 'general' },
];

export default function ContactForm({ submitLabel, topics }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

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
      setError('There was an issue sending your message. Please try again.');
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
        placeholder="Full Name"
      />
      <input
        name="company"
        className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/20 font-medium"
        placeholder="Company (optional)"
      />
      <input
        required
        name="email"
        type="email"
        className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/20 font-medium"
        placeholder="Work Email"
      />
      {topicOptions.length > 0 && (
        <select
          name="topic"
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
        className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/20 font-medium bg-white"
      >
        <option value="normal">Normal urgency</option>
        <option value="urgent">Urgent</option>
      </select>
      <textarea
        required
        name="message"
        rows={5}
        className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-primary/20 font-medium"
        placeholder="Describe your challenge..."
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-primary text-white rounded-2xl font-extrabold text-lg hover:bg-primaryDark transition-all shadow-xl shadow-primary/30 disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending...' : submitLabel || 'Send Message'}
      </button>
      {status === 'success' && (
        <p className="text-sm font-semibold text-highlight">Thanks! We’ll reply shortly.</p>
      )}
      {status === 'error' && <p className="text-sm font-semibold text-red-600">{error}</p>}
    </form>
  );
}
