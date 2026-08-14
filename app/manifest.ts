import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Saffa Fashion | صفا فاشون',
    short_name: 'Saffa Fashion',
    description: 'Elegant modest dresses for the modern hijabi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0efe8',
    theme_color: '#f0efe8',
    icons: [{ src: '/logo.jpeg', sizes: 'any', type: 'image/jpeg' }],
  };
}
