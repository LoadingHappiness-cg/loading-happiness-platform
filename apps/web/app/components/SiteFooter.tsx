import Link from 'next/link';
import { getLocale, getLocalePrefix, withLocale } from '@/lib/locale';
import { getPayloadClient } from '@/lib/payload';

export default async function SiteFooter() {
  const localePrefix = await getLocalePrefix();
  const locale = await getLocale();
  const payload = await getPayloadClient();
  let settings: any = null;
  try {
    settings = await payload.findGlobal({
      slug: 'site-settings',
      locale,
      depth: 1,
    });
  } catch {
    settings = null;
  }
  const footer = settings?.footer || {};
  const columns = footer.columns?.length
    ? footer.columns
    : [
        {
          title: 'Explore',
          links: [
            { label: 'Services', href: '/services' },
            { label: 'News', href: '/news' },
            { label: 'Impact', href: '/impact' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About Us', href: '/about' },
            { label: 'Contact', href: '/contact' },
          ],
        },
      ];
  return (
    <footer className="bg-ink text-white py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            {footer.logo && typeof footer.logo !== 'string' ? (
              <img src={footer.logo.url} alt={footer.logoAlt || 'Loading Happiness'} className="h-10 w-auto" />
            ) : (
              <>
                <span className="w-8 h-8 rounded-lg bg-primaryDark text-surface font-bold grid place-items-center">L</span>
                <span className="text-2xl font-bold tracking-tight">Loading Happiness</span>
              </>
            )}
          </div>
          <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
            {footer.description ||
              'Technology with a human heart. Reliable IT, clear security, and calm support for teams that value stability.'}
          </p>
          <div className="space-y-3 text-sm text-gray-400">
            {footer.email && <p>{footer.email}</p>}
            {footer.phone && <p>{footer.phone}</p>}
          </div>
        </div>
        {columns.map((column: any, columnIndex: number) => (
          <div key={columnIndex}>
            <h4 className="font-bold text-lg mb-6">{column.title}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              {column.links?.map((link: any, linkIndex: number) => (
                <li key={linkIndex}>
                  <Link href={withLocale(link.href, localePrefix)} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 text-center text-xs text-white/60 tracking-widest uppercase">
        {footer.bottomText ||
          `© ${new Date().getFullYear()} Loading Happiness. Engineered for Stability.`}
        {footer.customHtml && (
          <div
            className="mt-4 text-xs text-white/60 normal-case tracking-normal"
            dangerouslySetInnerHTML={{ __html: footer.customHtml }}
          />
        )}
      </div>
    </footer>
  );
}
