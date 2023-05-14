import path from "path";
import fs from "fs";
import matter from "gray-matter";
import FrontMatter from "../../interfaces/FrontMatter";
import { unixToDate } from "../../helpers/helpers";
import { serialize } from "next-mdx-remote/serialize";
import MarkdownData from "../../components/MarkdownData";
import rehypeHighlight from "rehype-highlight";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";

type Props = {
  frontmatter: FrontMatter;
  content: MDXRemoteSerializeResult;
};

export default function BlogPostPage({
  frontmatter: { title, publishedAt },
  content,
}: Props): JSX.Element {
  const date = unixToDate(publishedAt);

  return (
    <>
      <div className="dark:text-white text-black mx-20 px-6 py-4">
        <div className="m-4">{title}</div>
        <div className="m-4">{date}</div>
        <MarkdownData content={content} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const blogs = fs.readdirSync(path.join("blogs"));
  const paths = blogs.map((blog) => {
    const slug = blog.replace(".mdx", "");
    return {
      params: {
        slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const blog = fs.readFileSync(
    path.join("blogs", `${params.slug}.mdx`),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(blog);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      // @ts-ignore
      rehypePlugins: [rehypeHighlight],
    },
  });
  return {
    props: {
      frontmatter: {
        title: frontmatter.title,
        publishedAt: Math.floor(frontmatter.publishedAt / 1000),
      },
      content: mdxSource,
    },
  };
}
