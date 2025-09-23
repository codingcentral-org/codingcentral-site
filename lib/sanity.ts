import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true,
  apiVersion: '2023-05-03',
});

export async function getHomepageContent() {
  return sanity.fetch(`
    *[_type == "homepage"][0] {
      heroTitle,
      heroSubtitle,
      missionStatement,
      partnersTitle,
      partners[] {
        name,
        logo
      }
    }
  `);
}

export async function getCourses() {
  return sanity.fetch(`
    *[_type == "course"] | order(order asc) {
      _id,
      title,
      description,
      link,
      level,
      duration
    }
  `);
}