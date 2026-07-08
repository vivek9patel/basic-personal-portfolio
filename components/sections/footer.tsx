import LikeCounter from '@/components/LikeCounter';

export default function FooterSection() {
  return (
    <footer className="border-t border-border pt-8 flex items-center justify-between text-sm text-muted-foreground">
      <span>© Vivek Patel</span>
      <LikeCounter />
    </footer>
  );
}
