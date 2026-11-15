import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
export const dataset = import.meta.env.VITE_SANITY_DATASET;
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-03-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
