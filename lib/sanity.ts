import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'lex57gkf',
  dataset: 'production',
  apiVersion: '2023-10-01',
  useCdn: true,
});
