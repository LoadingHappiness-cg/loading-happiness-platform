
import type { Block } from 'payload/types';

const VideoEmbedBlock: Block = {
  slug: 'videoEmbed',
  labels: {
    singular: 'Video Embed',
    plural: 'Video Embeds',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "video").',
      },
    },
    {
      name: 'anchorId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (briefing alias).',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      localized: true,
    },
    {
      name: 'sectionTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'videoProvider',
      type: 'select',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
        { label: 'Self hosted', value: 'self' },
      ],
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'YouTube or Vimeo URL',
      required: true,
      admin: {
        placeholder: 'https://www.youtube.com/watch?v=...',
      },
    },
    {
      name: 'videoTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'Caption',
      localized: true,
    },
    {
      name: 'transcript',
      type: 'textarea',
      localized: true,
    },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'ctaHref', type: 'text' },
  ],
};

export default VideoEmbedBlock;
