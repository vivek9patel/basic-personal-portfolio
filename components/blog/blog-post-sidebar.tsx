import { PostToc } from '@/components/blog/post-toc';
import { StickySidebar } from '@/components/sticky-sidebar';
import { SidebarSocialLinks } from '@/components/sidebar-social-links';

interface BlogPostSidebarProps {
  contentId?: string;
}

export function BlogPostSidebar({ contentId }: BlogPostSidebarProps) {
  return (
    <StickySidebar
      footer={<SidebarSocialLinks />}
      className="w-52 justify-self-start pr-8 lg:-ml-4 xl:-ml-8"
    >
      <PostToc contentId={contentId} />
    </StickySidebar>
  );
}
