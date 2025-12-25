
import type { Block } from 'payload/types';

const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional anchor ID for in-page links (e.g., "hero").',
      },
    },
    {
      name: 'variant',
      type: 'select',
      required: true,
      defaultValue: 'A',
      options: [
        { label: 'A — Standard Split', value: 'A' },
        { label: 'B — Centered + Background', value: 'B' },
        { label: 'C — Service Focus', value: 'C' },
        { label: 'D — Story / Human', value: 'D' },
        { label: 'E — Media Hero', value: 'E' },
      ],
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'primaryCTA',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
    {
      name: 'featureList',
      type: 'array',
      admin: {
        condition: (data) => data.variant === 'C',
      },
      fields: [{ name: 'text', type: 'text', localized: true }],
    },
    {
      name: 'quote',
      type: 'textarea',
      localized: true,
      admin: {
        condition: (data) => data.variant === 'D',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'mediaType',
      type: 'select',
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Illustration', value: 'illustration' },
        { label: 'Video thumbnail', value: 'videoThumbnail' },
        { label: 'None', value: 'none' },
      ],
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        condition: (data) => data.variant === 'E',
        placeholder: 'https://www.youtube.com/watch?v=...',
      },
    },
    {
      name: 'badges',
      type: 'array',
      fields: [
        { name: 'text', type: 'text', required: true, localized: true }
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    {
      name: 'animationPreset',
      type: 'select',
      defaultValue: 'fadeRise',
      options: [
        { label: 'Fade + Rise', value: 'fadeRise' },
        { label: 'Slide', value: 'slide' },
        { label: 'Reveal', value: 'reveal' },
        { label: 'Scale', value: 'scale' },
        { label: 'Stagger', value: 'stagger' },
      ],
    },
    {
      name: 'theme',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Brand Gradient', value: 'brandGradient' },
      ],
    },
  ],
};

export default HeroBlock;
