
export interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  layout: Block[];
  seo: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export type ContentType = 'Article' | 'Opinion' | 'Video' | 'Guide';

export interface Author {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: { url: string; alt: string };
  links?: { platform: string; url: string }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface Content {
  id: string;
  title: string;
  slug: string;
  contentType: ContentType;
  status: 'published' | 'draft';
  publishedAt: string;
  excerpt: string;
  featuredImage: { url: string; alt: string };
  heroStyle: 'Large' | 'Small' | 'None';
  body: Block[];
  authors: Author[];
  categories: Category[];
  tags?: Tag[];
  readingTime?: string;
  videoData?: {
    provider: 'YouTube' | 'Vimeo';
    url: string;
    duration?: string;
    transcript?: string;
  };
}

export type Block = 
  | HeroBlock 
  | ServicesGridBlock 
  | CTASectionBlock 
  | RichTextBlock 
  | StatsBlock
  | ImageGalleryBlock
  | VideoEmbedBlock
  | TrustPartnersBlock
  | PillarsBlock
  | ProcessBlock
  | ImpactTeaserBlock
  | FinalCTABlock
  | FeatureGridBlock
  | SplitContentBlock
  | PullQuoteBlock
  | CalloutBlock
  | ChecklistBlock
  | FAQBlock;

export interface HeroBlock {
  blockType: 'hero';
  heading: string;
  subheading: string;
  primaryCTA: { label: string; link: string };
  secondaryCTA?: { label: string; link: string };
  image?: { url: string; alt: string };
  badges?: string[];
}

export interface PullQuoteBlock {
  blockType: 'pullQuote';
  quote: string;
  author?: string;
}

export interface CalloutBlock {
  blockType: 'callout';
  title?: string;
  content: string;
  type: 'info' | 'warning' | 'tip';
}

export interface ChecklistBlock {
  blockType: 'checklist';
  title?: string;
  items: string[];
}

export interface FAQBlock {
  blockType: 'faq';
  items: { question: string; answer: string }[];
}

export interface FeatureGridBlock {
  blockType: 'featureGrid';
  sectionId?: string;
  title?: string;
  subheading?: string;
  items: { title: string; content: string; icon: string }[];
  columns: number;
}

export interface SplitContentBlock {
  blockType: 'splitContent';
  sectionId?: string;
  title: string;
  content?: string;
  items?: string[];
  facts?: { label: string; value: string }[];
  partnershipData?: {
    whatYouGet: string[];
    whatWeNeed: string[];
  };
  image?: { url: string; alt: string };
  cta?: { label: string; link: string };
  reverse?: boolean;
}

export interface TrustPartnersBlock {
  blockType: 'trustPartners';
  text: string;
  logos: { url: string; alt: string }[];
}

export interface PillarsBlock {
  blockType: 'pillars';
  title: string;
  items: { title: string; content: string; icon: string }[];
}

export interface ProcessBlock {
  blockType: 'process';
  title: string;
  steps: { title: string; content: string }[];
  image: { url: string; alt: string };
}

export interface ImpactTeaserBlock {
  blockType: 'impactTeaser';
  title: string;
  content: string;
  cta: { label: string; link: string };
  image: { url: string; alt: string };
}

export interface FinalCTABlock {
  blockType: 'finalCTA';
  title: string;
  content: string;
  primaryCTA: { label: string; link: string };
  secondaryCTA: { label: string; link: string };
}

export interface ServicesGridBlock {
  blockType: 'servicesGrid';
  title: string;
  services: { title: string; description: string; icon: string }[];
  cta?: { label: string; link: string };
}

export interface CTASectionBlock {
  blockType: 'ctaSection';
  title: string;
  content: string;
  buttonLabel: string;
  buttonLink: string;
}

export interface RichTextBlock {
  blockType: 'richText';
  sectionId?: string;
  title?: string;
  content: string;
  center?: boolean;
}

export interface StatsBlock {
  blockType: 'stats';
  items: { label: string; value: string }[];
}

export interface ImageGalleryBlock {
  blockType: 'imageGallery';
  sectionId?: string;
  title?: string;
  images: { url: string; alt: string }[];
}

export interface VideoEmbedBlock {
  blockType: 'videoEmbed';
  title?: string;
  videoUrl: string;
  caption?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  excerpt: string;
  context: string;
  challenge: string[];
  solution: string[];
  results: string;
  techStack: string[];
  image: { url: string; alt: string };
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  email: string;
  phone: string;
}
