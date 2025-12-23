
import { Block } from 'payload';

const VideoEmbedBlock: Block = {
  slug: 'videoEmbed',
  labels: {
    singular: 'Video Embed',
    plural: 'Video Embeds',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
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
    },
  ],
};

export default VideoEmbedBlock;
