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
  const columns = footer.columns?.length ? footer.columns : [];
  const socials = footer.socials?.length ? footer.socials : [];
  const contact = footer.contact || {};
  const newsletter = footer.newsletter || {};
  const awards = footer.awards?.length ? footer.awards : [];
  const legalLinks = footer.legalLinks?.length
    ? footer.legalLinks
    : [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Cookies', href: '/cookies' },
      ];
  const tagline = footer.tagline || 'Technology with a human heart.';
  const aboutText =
    footer.aboutText ||
    footer.description ||
    'Reliable IT, clear security, and calm support for teams that value stability.';
  const contactLocation = contact.location || 'Portugal';
  const contactEmail = contact.email || footer.email;
  const contactPhone = contact.phone || footer.phone;
  const contactHours = contact.hours || 'Mon–Fri, 9–18';
  const contactNote =
    contact.note || "We're based in Portugal, proudly supporting teams across Europe.";
  const newsletterTitle = newsletter.title || 'Newsletter';
  const newsletterText =
    newsletter.text || 'Short, practical insights on security, stability, and calm operations.';
  const newsletterPlaceholder = newsletter.placeholder || 'Your email address';
  const newsletterButtonText = newsletter.buttonText || 'Sign up';
  const newsletterAction = newsletter.formAction || '/api/newsletter';
  const awardsTitle = footer.awardsTitle || 'Awards';
  return (
    <footer className="mt-20">
      <div className="bg-[#332570] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                {footer.logo && typeof footer.logo !== 'string' ? (
                  <img
                    src={footer.logo.url}
                    alt={footer.logoAlt || 'Loading Happiness'}
                    className="h-10 w-auto"
                  />
                ) : (
                  <div className="text-2xl font-bold tracking-wide">LOADING HAPPINESS</div>
                )}
              </div>
              <p className="mt-4 font-semibold">{tagline}</p>
              <p className="mt-3 text-sm text-white/80 leading-relaxed">{aboutText}</p>

              {socials.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {socials.map((social: any, index: number) => (
                    <a
                      key={`${social.platform || 'social'}-${index}`}
                      href={social.url || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="h-12 w-12 rounded-full bg-[#1AB3CA] grid place-items-center hover:opacity-90 transition"
                      aria-label={social.platform || 'social'}
                    >
                      <span className="text-sm font-bold">
                        {(social.platform || 'LH').slice(0, 2).toUpperCase()}
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {columns.length > 0 && (
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {columns.map((column: any, columnIndex: number) => (
                    <div key={columnIndex}>
                      <h4 className="text-sm font-semibold uppercase tracking-widest text-white/70">
                        {column.title}
                      </h4>
                      <ul className="mt-3 space-y-2 text-sm text-white/75">
                        {column.links?.map((link: any, linkIndex: number) => (
                          <li key={linkIndex}>
                            <Link
                              href={withLocale(link.href, localePrefix)}
                              className="hover:text-white transition-colors"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="md:border-l md:border-white/10 md:pl-8">
              <h3 className="text-3xl font-semibold">contact us</h3>
              <div className="mt-2 h-1 w-10 bg-[#3ADA9A] rounded" />

              <ul className="mt-6 space-y-3 text-white/85">
                <li className="flex items-center gap-3">
                  <svg aria-hidden="true" className="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span>{contactLocation}</span>
                </li>
                {contactEmail && (
                  <li className="flex items-center gap-3">
                    <svg aria-hidden="true" className="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 6h16v12H4z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="m4 7 8 6 8-6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <a className="underline hover:opacity-90" href={`mailto:${contactEmail}`}>
                      {contactEmail}
                    </a>
                  </li>
                )}
                {contactHours && (
                  <li className="flex items-center gap-3">
                    <svg aria-hidden="true" className="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>{contactHours}</span>
                  </li>
                )}
                {contactPhone && (
                  <li className="flex items-center gap-3">
                    <svg aria-hidden="true" className="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 5h5l1 4-3 2a12 12 0 0 0 6 6l2-3 4 1v5c0 1-1 2-2 2C10 22 2 14 2 6c0-1 1-2 2-2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <a className="underline hover:opacity-90" href={`tel:${contactPhone}`}>
                      {contactPhone}
                    </a>
                  </li>
                )}
              </ul>

              <p className="mt-8 text-white/85">{contactNote}</p>
            </div>

            <div className="md:border-l md:border-white/10 md:pl-8">
              <h3 className="text-3xl font-semibold">
                <span className="inline-flex items-center gap-2">
                  <span className="h-7 w-7 rounded-full border-4 border-[#1AB3CA]" />
                  {newsletterTitle}
                </span>
              </h3>
              <div className="mt-2 h-1 w-10 bg-[#3ADA9A] rounded" />

              <p className="mt-6 text-white/85">{newsletterText}</p>

              <form
                className="mt-5 flex flex-wrap gap-3"
                action={newsletterAction}
                method="post"
                data-umami-event="newsletter-submit"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={newsletterPlaceholder}
                  className="w-full rounded-xl border border-[#1AB3CA] bg-transparent px-4 py-3 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#698FFE]"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#3ADA9A] px-5 py-3 font-semibold text-[#332570] hover:opacity-90 transition whitespace-nowrap"
                  data-umami-event="newsletter-submit-button"
                >
                  {newsletterButtonText}
                </button>
              </form>

              {awards.length > 0 && (
                <>
                  <h4 className="mt-10 text-3xl font-semibold">{awardsTitle}</h4>
                  <div className="mt-2 h-1 w-10 bg-[#3ADA9A] rounded" />

                  <div className="mt-6 flex flex-wrap gap-4 items-center">
                    {awards.map((award: any, index: number) => {
                      if (!award?.image || typeof award.image === 'string') return null;
                      const img = (
                        <img
                          src={award.image.url}
                          alt={award.alt || 'Award'}
                          className="h-16 w-auto rounded"
                        />
                      );
                      return award.href ? (
                        <a
                          key={`${award.image.id || award.image.url}-${index}`}
                          href={award.href}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:opacity-90 transition"
                        >
                          {img}
                        </a>
                      ) : (
                        <div key={`${award.image.id || award.image.url}-${index}`}>{img}</div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#2b2b2b] text-white/90">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-wrap items-center gap-x-4 gap-y-2 justify-center text-sm">
          {legalLinks.map((link: any, index: number) => (
            <span key={`${link.href}-${index}`} className="flex items-center gap-4">
              <Link className="hover:underline" href={withLocale(link.href, localePrefix)}>
                {link.label}
              </Link>
              {index < legalLinks.length - 1 && <span className="text-white/40">|</span>}
            </span>
          ))}
          <span className="text-white/60">
            {footer.bottomText ||
              `© ${new Date().getFullYear()} Loading Happiness. Engineered for Stability.`}
          </span>
        </div>
        {footer.customHtml && (
          <div
            className="mx-auto max-w-6xl px-4 pb-6 text-center text-xs text-white/60 normal-case tracking-normal"
            dangerouslySetInnerHTML={{ __html: footer.customHtml }}
          />
        )}
      </div>
    </footer>
  );
}
