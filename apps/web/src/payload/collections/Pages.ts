
import type { CollectionConfig } from 'payload/types';
import HeroBlock from '../blocks/Hero.ts';
import TrustPartnersBlock from '../blocks/TrustPartners.ts';
import PillarsBlock from '../blocks/Pillars.ts';
import ServicesGridBlock from '../blocks/ServicesGrid.ts';
import ProcessBlock from '../blocks/Process.ts';
import ImpactTeaserBlock from '../blocks/ImpactTeaser.ts';
import FinalCTABlock from '../blocks/FinalCTA.ts';
import VideoEmbedBlock from '../blocks/VideoEmbed.ts';
import ImageGalleryBlock from '../blocks/ImageGallery.ts';
import SplitContentBlock from '../blocks/SplitContent.ts';
import FeatureGridBlock from '../blocks/FeatureGrid.ts';
import FAQBlock from '../blocks/FAQ.ts';
import RichTextBlock from '../blocks/RichText.ts';
import StatsBlock from '../blocks/Stats.ts';
import TestimonialsBlock from '../blocks/Testimonials.ts';
import CaseStudyTeaserBlock from '../blocks/CaseStudyTeaser.ts';
import ContactFormBlock from '../blocks/ContactForm.ts';
import ValueCardsBlock from '../blocks/ValueCards.ts';
import BulletsBlock from '../blocks/Bullets.ts';
import DeliverablesBlock from '../blocks/Deliverables.ts';
import OutcomesCardsBlock from '../blocks/OutcomesCards.ts';
import StepsBlock from '../blocks/Steps.ts';
import SplitOverviewBlock from '../blocks/SplitOverview.ts';
import TwoColumnListBlock from '../blocks/TwoColumnList.ts';
import BulletsWithProofBlock from '../blocks/BulletsWithProof.ts';
import LogoCloudBlock from '../blocks/LogoCloud.ts';
import TeamIntroBlock from '../blocks/TeamIntro.ts';
import { serviceTemplatePresets } from '../serviceTemplates.ts';

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'applyServiceTemplate',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        description: 'Apply preset data for the selected service template.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        TrustPartnersBlock,
        PillarsBlock,
        ServicesGridBlock,
        ProcessBlock,
        ImpactTeaserBlock,
        FinalCTABlock,
        VideoEmbedBlock,
        ImageGalleryBlock,
        SplitContentBlock,
        FeatureGridBlock,
        FAQBlock,
        RichTextBlock,
        StatsBlock,
        TestimonialsBlock,
        CaseStudyTeaserBlock,
        ContactFormBlock,
        ValueCardsBlock,
        BulletsBlock,
        DeliverablesBlock,
        OutcomesCardsBlock,
        StepsBlock,
        SplitOverviewBlock,
        TwoColumnListBlock,
        BulletsWithProofBlock,
        LogoCloudBlock,
        TeamIntroBlock,
      ],
    },
    {
      name: 'serviceTemplate',
      type: 'select',
      options: [
        { label: 'Managed IT & Helpdesk', value: 'managed-it' },
        { label: 'Cybersecurity Baseline', value: 'cybersecurity' },
        { label: 'Microsoft 365 & Cloud', value: 'm365-cloud' },
        { label: 'Networking & Connectivity', value: 'networking' },
        { label: 'Infrastructure & Virtualization', value: 'infrastructure' },
        { label: 'Strategy & Roadmaps', value: 'strategy-roadmaps' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Optional: selects a service template for /services/* detail pages.',
      },
    },
    {
      name: 'serviceTemplateData',
      type: 'group',
      admin: {
        condition: (data) => Boolean(data?.serviceTemplate),
      },
      fields: [
        {
          name: 'hero',
          type: 'group',
          fields: [
            { name: 'heading', type: 'text', localized: true },
            { name: 'subheading', type: 'textarea', localized: true },
            {
              name: 'primaryCTA',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', localized: true },
                { name: 'link', type: 'text' },
              ],
            },
            {
              name: 'secondaryCTA',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', localized: true },
                { name: 'link', type: 'text' },
              ],
            },
            {
              name: 'badges',
              type: 'array',
              fields: [{ name: 'text', type: 'text', localized: true }],
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'whoItsFor',
          type: 'group',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'intro', type: 'textarea', localized: true },
            {
              name: 'items',
              type: 'array',
              fields: [{ name: 'text', type: 'text', localized: true }],
            },
          ],
        },
        {
          name: 'deliverables',
          type: 'group',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'intro', type: 'textarea', localized: true },
            {
              name: 'items',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'text', type: 'textarea', localized: true },
              ],
            },
          ],
        },
        {
          name: 'outcomes',
          type: 'group',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'intro', type: 'textarea', localized: true },
            {
              name: 'items',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'text', type: 'text', localized: true },
              ],
            },
          ],
        },
        {
          name: 'steps',
          type: 'group',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'intro', type: 'textarea', localized: true },
            {
              name: 'items',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'text', type: 'text', localized: true },
              ],
            },
          ],
        },
        {
          name: 'checklist',
          type: 'group',
          fields: [
            { name: 'title', type: 'text', localized: true },
            {
              name: 'items',
              type: 'array',
              fields: [{ name: 'item', type: 'text', localized: true }],
            },
          ],
        },
        {
          name: 'stats',
          type: 'group',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'intro', type: 'textarea', localized: true },
            {
              name: 'items',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', localized: true },
                { name: 'value', type: 'text', localized: true },
                { name: 'note', type: 'text', localized: true },
              ],
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'content', type: 'textarea', localized: true },
            {
              name: 'primaryCTA',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', localized: true },
                { name: 'link', type: 'text' },
              ],
            },
            {
              name: 'secondaryCTA',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', localized: true },
                { name: 'link', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, originalDoc, operation }) => {
        if (!data?.serviceTemplate) {
          return data;
        }
        const preset = serviceTemplatePresets?.[data.serviceTemplate];
        if (!preset) {
          return data;
        }
        const templateChanged =
          originalDoc?.serviceTemplate && originalDoc.serviceTemplate !== data.serviceTemplate;
        const shouldApply = operation === 'create' || templateChanged || data.applyServiceTemplate;
        if (shouldApply) {
          data.serviceTemplateData = preset;
          data.applyServiceTemplate = false;
        }
        return data;
      },
    ],
  },
};

export default Pages;
