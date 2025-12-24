
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
};

export default Pages;
