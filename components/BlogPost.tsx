import Link from 'next/link';
import { unixToDate } from '../helpers/helpers';
import type FrontMatter from '../interfaces/FrontMatter';

type Props = {
  link: string;
  frontmatter: FrontMatter;
};

function BlogPost({ frontmatter, link }: Props): JSX.Element {
  const date = unixToDate(frontmatter.publishedAt);

  return (
    <div className="py-6 px-6 border border-opacity-10 rounded-md cursor-pointer hover:shadow-md transition-shadow">
      <div className="mb-6">
        <div className="text-primary font-bold text-2xl">
          {frontmatter.title}
        </div>
        <div className="text-primary text-lg">{date}</div>
        <Link href={`/blogs/${link}`}>
          <a className="text-primary text-lg">Read more</a>
        </Link>
      </div>
    </div>
  );
}

export default BlogPost;
