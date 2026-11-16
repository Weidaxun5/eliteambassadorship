import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "02bwb137",
  dataset: "production",
  apiVersion: "2026-01-13", // This matches your URL
  useCdn: false, // Set to false if you want fresh data during dev
});
