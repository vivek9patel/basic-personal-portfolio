import ReactGA from 'react-ga4';

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;

let initialized = false;

export type AnalyticsParams = Record<
  string,
  string | number | boolean | undefined
>;

export function isAnalyticsEnabled(): boolean {
  return (
    typeof window !== 'undefined' &&
    Boolean(TRACKING_ID) &&
    process.env.NODE_ENV === 'production'
  );
}

export function initAnalytics(): void {
  if (typeof window === 'undefined' || initialized || !TRACKING_ID) {
    return;
  }
  ReactGA.initialize(TRACKING_ID);
  initialized = true;
}

function ensureInitialized(): void {
  if (!initialized) {
    initAnalytics();
  }
}

export function trackPageview(path: string, title?: string): void {
  if (!TRACKING_ID) return;

  const pageTitle =
    title ?? (typeof document !== 'undefined' ? document.title : path);

  if (isAnalyticsEnabled()) {
    ensureInitialized();
    ReactGA.send({
      hitType: 'pageview',
      page: path,
      title: pageTitle,
    });
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    console.debug('[analytics] pageview', { path, title: pageTitle });
  }
}

export function trackEvent(name: string, params?: AnalyticsParams): void {
  if (!TRACKING_ID) return;

  const cleanParams = params
    ? Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== undefined)
      )
    : undefined;

  if (isAnalyticsEnabled()) {
    ensureInitialized();
    ReactGA.event(name, cleanParams);
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    console.debug('[analytics]', name, cleanParams);
  }
}

export type OutboundLinkType = 'github' | 'linkedin' | 'email';
export type OutboundLocation = 'hero' | 'footer' | 'testimonial';

export function trackOutboundClick(
  linkType: OutboundLinkType,
  location: OutboundLocation
): void {
  trackEvent('outbound_click', { link_type: linkType, location });
}

export type ProjectClickType = 'github' | 'demo';
export type ProjectLocation = 'home' | 'projects_page';

export function trackProjectClick(
  projectId: string,
  clickType: ProjectClickType,
  location: ProjectLocation
): void {
  trackEvent('project_click', {
    project_id: projectId,
    click_type: clickType,
    location,
  });
}

export type BlogPostSource =
  'home_writing' | 'blog_index' | 'tag_page' | 'related';

export function trackBlogPostClick(
  slug: string,
  title: string,
  source: BlogPostSource
): void {
  trackEvent('blog_post_click', { slug, post_title: title, source });
}

export type BlogTagSource = 'post_header' | 'post_card';

export function trackBlogTagClick(tag: string, source: BlogTagSource): void {
  trackEvent('blog_tag_click', { tag, source });
}
