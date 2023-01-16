import type { NextPage } from 'next'
import Header from '../../components/Header'
import path from 'path'
import fs from 'fs'
import  matter from 'gray-matter'
import BlogPost from '../../components/BlogPost'
import type FrontMatter from '../../interfaces/FrontMatter';
import Image from 'next/image'

type Props = {
  blogList: Array<{
    slug: string
    frontmatter: FrontMatter
  }>
}

const Blogs: NextPage<Props> = ({blogList}) => {
  
  return (
    <>
      <div className='mx-20 px-6 py-6'>
        {
          blogList.map(({slug, frontmatter}) => {
            return (
              <BlogPost key={slug} link={slug} frontmatter={frontmatter}/>
            )
          })
        }
      </div>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Image width={900} height={500} src="/undercons.gif" alt="underconstruction gif" />
      </div>
    </>
  )
}

export default Blogs


export async function getStaticProps() {
  const blogs = fs.readdirSync(path.join('data'))
  
  const blogList = blogs.map(blog => {
    const slug = blog.replace('.mdx', '')
    const fileData = fs.readFileSync(path.join('data',blog), 'utf-8')
    let { data:frontmatter } = matter(fileData);
    return {
      slug,
      frontmatter: {
        title: frontmatter.title,
        publishedAt: Math.floor(frontmatter.publishedAt / 1000)
      }
    }

  })

  return {
    props: {
      blogList
    },
  }
}