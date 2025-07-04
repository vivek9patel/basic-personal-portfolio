export default function Avatar({
  title,
  url,
  width = 'w-8',
  height = 'h-8',
  border = true,
}: {
  title: string;
  url: string;
  width?: string;
  height?: string;
  border?: boolean;
}) {
  const isTarsAvatar = title === 'tars';

  return (
    <div
      className={`${width} ${height} rounded-full overflow-hidden ${border ? 'border' : ' border-0'} border-border bg-muted/20 flex items-center justify-center flex-shrink-0`}
    >
      {isTarsAvatar ? (
        <div
          className="w-full h-full flex items-center justify-center text-foreground"
          style={{
            maskImage: `url(${url})`,
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            maskSize: 'contain',
            backgroundColor: 'currentColor',
          }}
        />
      ) : (
        <img src={url} alt={title} className="w-full h-full object-cover" />
      )}
    </div>
  );
}
