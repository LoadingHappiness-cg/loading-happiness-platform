
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
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
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
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
};

export default Pages;
