import Image from 'next/image';
import { cn } from '@/lib/utils';
import { COMPANY_LOGOS } from '@/data/company-logos';

interface CompanyLogoProps {
  id: string;
  company: string;
  size?: number;
  className?: string;
}

export default function CompanyLogo({
  id,
  company,
  size = 40,
  className,
}: CompanyLogoProps) {
  const logo = COMPANY_LOGOS[id as keyof typeof COMPANY_LOGOS];
  if (!logo) return null;

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-lg border border-border/60 bg-card shadow-sm',
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={logo}
        alt={`${company} logo`}
        width={size}
        height={size}
        className="h-full w-full object-contain p-1"
      />
    </div>
  );
}
