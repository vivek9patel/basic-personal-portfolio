export default function Avatar({
  title,
  url
}: {
  title: string;
  url: string;
}) {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-800">
      <img src={url} alt={title} className="w-full h-full"/>
    </div>
  );
}
