import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  // Path to the directory containing your MDX files
  const siteDirectory = path.join(process.cwd(), '/src/app'); // your blog directory maybe different

  // Retrieve all MDX file paths recursively
  const tsxFilePaths = getAllTsxFilePaths(siteDirectory);

  // Generate URLs and add them to the sitemap
  const sitemap = tsxFilePaths.map((filePath) => {
    const slug = path.basename(filePath, '.tsx'); // remove the .mdx extension from the file name to get the slug
    const category = path.basename(path.dirname(filePath));
    const url = `${process.env.NEXT_PUBLIC_URL}/${category}/${slug}`;
    const lastModified = fs.statSync(filePath).mtime;
    return {
      url,
      lastModified,
    };
  });

  // Add other URLs to the sitemap
  sitemap.push(
    {
      url: `${process.env.NEXT_PUBLIC_URL}`,
      lastModified: new Date(),
    },
    // Add other URLs here
  );

  return sitemap;
}

// Recursively retrieve all MDX file paths
function getAllTsxFilePaths(directory: string): string[] {
  const fileNames = fs.readdirSync(directory);
  const filePaths = fileNames.map((fileName) => {
    const filePath = path.join(directory, fileName);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      return getAllTsxFilePaths(filePath);
    } else {
      return filePath;
    }
  });

  return Array.prototype.concat(...filePaths);
}
