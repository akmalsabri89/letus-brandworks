import { groq } from 'next-sanity'

export const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(order asc) {
    _id, title, slug, client, category, year, excerpt, featured,
    coverImage { asset->{ _id, url }, hotspot, crop }
  }
`

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id, title, slug, client, category, year, excerpt,
    coverImage { asset->{ _id, url }, hotspot, crop },
    stats[] { value, label },
    content[] {
      ...,
      _type == "imageBlock" => {
        ...,
        image { asset->{ _id, url, metadata { dimensions { width, height } } }, hotspot, crop }
      }
    }
  }
`

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, category, publishedAt, featured,
    coverImage { asset->{ _id, url }, hotspot, crop },
    author->{ name, photo { asset->{ _id, url } } }
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, category, publishedAt,
    coverImage { asset->{ _id, url }, hotspot, crop },
    author->{ name, photo { asset->{ _id, url } } },
    content[] {
      ...,
      _type == "imageBlock" => {
        ...,
        image { asset->{ _id, url, metadata { dimensions { width, height } } }, hotspot, crop }
      }
    }
  }
`
