
import type { Block } from 'payload/types';

const VideoEmbedBlock: Block = {
  slug: 'videoEmbed',
  labels: {
    singular: 'Video Embed',
    plural: 'Video Embeds',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "video").',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      localized: true,
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
      name: 'caption',
      type: 'textarea',
      label: 'Caption',
      localized: true,
    },
  ],
};

export default VideoEmbedBlock;
