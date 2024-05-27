export default function Avatar({
    title,
    url,
    width = "w-8",
    height = "h-8",
    border = true
}: {
    title: string;
    url: string;
    width?: string;
    height?: string;
    border?: boolean;
}) {
    return (
        <div className={`${width} ${height} rounded-full overflow-hidden ${border ? "border" : " border-0"} border-gray-800`}>
            <img src={url} alt={title} className="w-full h-full"/>
        </div>
    );
}
