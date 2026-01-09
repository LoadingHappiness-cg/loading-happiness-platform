import Image, { type ImageProps } from 'next/image';

type Media = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  sizes?: Record<string, { url?: string | null; width?: number | null; height?: number | null }>;
} | string | null | undefined;

export const getMediaMeta = (media: Media) => {
  if (!media) return { url: undefined, alt: undefined, width: undefined, height: undefined };
  if (typeof media === 'string') return { url: media, alt: undefined, width: undefined, height: undefined };

  const sizes = media.sizes || {};
  const preferred =
    (sizes as any).featureImage ||
    (sizes as any).card ||
    (sizes as any).thumbnail ||
    Object.values(sizes)[0];

  const source = media.url ? media : preferred;

  return {
    url: source?.url || undefined,
    alt: media.alt,
    width: source?.width ?? media.width ?? undefined,
    height: source?.height ?? media.height ?? undefined,
  };
};

type PayloadImageProps = {
  media: Media;
  alt?: string;
  fill?: boolean;
  fallbackWidth?: number;
  fallbackHeight?: number;
} & Omit<ImageProps, 'src' | 'alt' | 'fill' | 'width' | 'height'>;

export function PayloadImage({
  media,
  alt,
  fill,
  className,
  sizes = '100vw',
  priority,
  fallbackWidth = 1200,
  fallbackHeight = 800,
  ...rest
}: PayloadImageProps) {
  const meta = getMediaMeta(media);
  if (!meta.url) return null;

  const resolvedAlt = alt ?? meta.alt ?? '';

  if (fill) {
    return (
      <Image
        src={meta.url}
        alt={resolvedAlt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        {...rest}
      />
    );
  }

  return (
    <Image
      src={meta.url}
      alt={resolvedAlt}
      width={meta.width || fallbackWidth}
      height={meta.height || fallbackHeight}
      className={className}
      sizes={sizes}
      priority={priority}
      {...rest}
    />
  );
}
