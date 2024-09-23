import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  if (process.env.NODE_ENV === 'production') {
    return {
      rules: {
        userAgent: '*',
        disallow: ['/dashboard/', '/admin/', '/uploads/'],
      },
      sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
    };
  } else {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
    };
  }
}
