
import { CollectionConfig } from 'payload';
import HeroBlock from '../blocks/Hero';
import TrustPartnersBlock from '../blocks/TrustPartners';
import PillarsBlock from '../blocks/Pillars';
import ServicesGridBlock from '../blocks/ServicesGrid';
import ProcessBlock from '../blocks/Process';
import ImpactTeaserBlock from '../blocks/ImpactTeaser';
import FinalCTABlock from '../blocks/FinalCTA';
import VideoEmbedBlock from '../blocks/VideoEmbed';
import ImageGalleryBlock from '../blocks/ImageGallery';
import SplitContentBlock from '../blocks/SplitContent';
import FeatureGridBlock from '../blocks/FeatureGrid';

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
