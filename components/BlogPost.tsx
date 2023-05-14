import Link from "next/link";
import { unixToDate } from "../helpers/helpers";
import type FrontMatter from "../interfaces/FrontMatter";

type Props = {
  link: string;
  frontmatter: FrontMatter;
};

function BlogPost({ frontmatter, link }: Props): JSX.Element {
  const date = unixToDate(frontmatter.publishedAt);

  return (
    <div className="mb-6">
      <div className="text-v9-pink font-bold text-2xl">{frontmatter.title}</div>
      <div className="text-v9-pink text-lg">{date}</div>
      <Link href={`/blogs/${link}`}>
        <a className="text-v9-pink text-lg">Read more</a>
      </Link>
    </div>
  );
}

export default BlogPost;
