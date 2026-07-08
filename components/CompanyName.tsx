export const BRAND_COLORS: Record<string, string> = {
  HubSpot: '#FF7A59',
  'University of Phoenix': '#73000A',
  HackerRank: '#01E864',
  '100ms': '#2563EB',
};

export default function CompanyName({
  name,
  brandColor = BRAND_COLORS[name],
}: {
  name: string;
  brandColor?: string;
}) {
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(name)}`;

  return (
    <a
      href={searchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground transition-colors duration-200 hover:underline cursor-pointer"
      data-cursor={true}
      onMouseEnter={e => {
        if (brandColor) e.currentTarget.style.color = brandColor;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '';
      }}
    >
      {name}
    </a>
  );
}
