import groq from 'groq';

export const POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(_createdAt desc){
    _id, title, slug
  }
`;

export const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id, title, votes, "imageUrl": mainImage.asset->url, mainImage
  }
`;
