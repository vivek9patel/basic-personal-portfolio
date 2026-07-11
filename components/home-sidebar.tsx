import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { StickySidebar } from '@/components/sticky-sidebar';
import { SidebarSocialLinks } from '@/components/sidebar-social-links';

export const HOME_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'writing', label: 'Writing' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'socialwall', label: '#socialwall' },
] as const;

export default function HomeSidebar() {
  const [activeSection, setActiveSection] = useState('about');
  const [showStickyName, setShowStickyName] = useState(false);

  useEffect(() => {
    const heroTitle = document.getElementById('hero-title');
    if (!heroTitle) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setShowStickyName(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-20px 0px 0px 0px' }
    );

    heroObserver.observe(heroTitle);

    const sectionElements = HOME_SECTIONS.map(section =>
      document.getElementById(section.id)
    ).filter((el): el is HTMLElement => el !== null);

    const sectionObserver = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    );

    sectionElements.forEach(el => sectionObserver.observe(el));

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <StickySidebar footer={<SidebarSocialLinks />}>
      <div className="space-y-8">
        <div
          className={cn(
            'transition-all duration-500 ease-out',
            showStickyName
              ? 'translate-y-0 opacity-100'
              : '-translate-y-2 opacity-0'
          )}
        >
          <p className="text-sm font-semibold tracking-tight text-foreground">
            Vivek Patel
          </p>
        </div>

        <nav aria-label="Page sections" className="space-y-1">
          {HOME_SECTIONS.map(section => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={cn(
                  'group flex items-center gap-3 py-1.5 text-sm transition-colors',
                  isActive
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span
                  className={cn(
                    'h-px shrink-0 bg-foreground transition-all duration-300',
                    isActive
                      ? 'w-8'
                      : 'w-4 bg-muted-foreground/50 group-hover:w-6 group-hover:bg-foreground/60'
                  )}
                  aria-hidden
                />
                {section.label}
              </a>
            );
          })}
        </nav>
      </div>
    </StickySidebar>
  );
}
