import SanityClient from "@sanity/client";

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
export const dataset = import.meta.env.VITE_SANITY_DATASET;
export const apiVersion =
  import.meta.env.VITE_SANITY_API_VERSION || "2024-03-01";

export const client = SanityClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
