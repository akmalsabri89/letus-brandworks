import { groq } from 'next-sanity'

const SERVICE_FIELDS = groq`
  _id, name, displayNumber, tagline,
  shortDescription, fullDescription,
  chips, order
`

export const homeServicesQuery = groq`
  *[_type == "service" && active == true && showOnHomepage == true]
  | order(order asc) { ${SERVICE_FIELDS} }
`

export const servicesQuery = groq`
  *[_type == "service" && active == true]
  | order(order asc) { ${SERVICE_FIELDS} }
`

export const testimonialsQuery = groq`
  *[_type == "testimonial" && active == true] | order(order asc) {
    _id, quote, emphasis, name, role,
    photo { asset->{ url } }
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    email,
    whatsapp { number, display },
    socials[] { platform, url },
    footerHeading,
  }
`

export const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(order asc) {
    _id, title, slug, client, category, year,
    excerpt, featured,
    coverImage { asset->{ _id, url }, hotspot, crop }
  }
`

export const featuredCaseStudiesQuery = groq`
  *[_type == "caseStudy" && featured == true] | order(order asc) [0..4] {
    _id, title, slug, category,
    coverImage { asset->{ _id, url }, hotspot, crop }
  }
`

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id, title, slug, client, category, year,
    excerpt,
    stats[] { value, label },
    coverImage { asset->{ _id, url, metadata { dimensions { width, height } } }, hotspot, crop },
    content[] {
      ...,
      _type == "imageBlock" => {
        ...,
        image { asset->{ _id, url, metadata { dimensions { width, height } } }, hotspot, crop }
      },
      _type == "videoBlock" => {
        ...,
        videoFile { asset->{ url } }
      }
    }
  }
`

export const relatedCaseStudiesQuery = groq`
  *[_type == "caseStudy" && slug.current != $slug] | order(order asc) [0..2] {
    _id, title, slug, client, category,
    coverImage { asset->{ _id, url }, hotspot, crop }
  }
`

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, category, tags, publishedAt, featured,
    coverImage { asset->{ _id, url }, hotspot, crop },
    author->{ name, photo { asset->{ _id, url } } }
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, category, tags, customTags, publishedAt,
    metaDescription, canonicalUrl,
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

// $tags is the merged pool of predefined + custom tags from the blog post.
// Scores each case study by how many of its own tags (predefined + custom) overlap.
// Falls back to featured ordering when nothing matches.
export const sidebarCaseStudiesQuery = groq`
  *[_type == "caseStudy"]
  | order(
      count(
        array::unique(coalesce(tags, []) + coalesce(customTags, []))[@ in coalesce($tags, [])]
      ) desc,
      featured desc,
      order asc
    )
  [0..2] {
    _id, title, slug,
    coverImage { asset->{ url } }
  }
`

export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug && category == $category] | order(publishedAt desc) [0..2] {
    _id, title, slug, excerpt, category, publishedAt,
    coverImage { asset->{ _id, url }, hotspot, crop }
  }
`
