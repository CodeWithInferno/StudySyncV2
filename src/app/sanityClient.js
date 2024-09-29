// sanityClient.js
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'hhzw530t', // Find this at manage.sanity.io or in sanity.json
  dataset: 'production', // or the dataset name you chose
  apiVersion: '2023-09-15', // use a UTC date string
  useCdn: true, // `false` if you want to ensure fresh data
  token: 'skn3WZXgJ0ihehmtvD0e7iuNY5kDEtzB6meZCKdwHJp0PO2AyosCIT9QynAgQ344yheFyaYz209clzVKmkTWvLyBkkUuOcwdm6Y11dESL7gcqEWnkbiKB6uHB83xLFJWYloLMV9dbs2eefpEOpdkQk7Dgrr7iZbCZblRF6JAlkFZJUjc4B4T', // If you are accessing private content, create a token in the Sanity dashboard
});

export default client;