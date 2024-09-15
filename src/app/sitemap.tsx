import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  // Path to the directory containing your TSX files
  const siteDirectory = path.join(process.cwd(), '/src/app');

  // Retrieve all file paths recursively
  const filePaths = getAllFilePaths(siteDirectory);

  // Select only .tsx files
  const tsxFilePaths = filePaths.filter((filePath) => {
    if (filePath.slice(-4) === '.tsx') {
      return filePath;
    }
  });

  // Generate URLs and add them to the sitemap
  const sitemap = tsxFilePaths.map((filePath) => {
    const category = path.basename(path.dirname(filePath));
    const url = `${process.env.NEXT_PUBLIC_URL}/${category}`;
    const changeFrequency = 'weekly' as const;
    const lastModified = fs.statSync(filePath).mtime;
    return {
      url,
      lastModified,
      changeFrequency,
    };
  });

  // Add other URLs to the sitemap
  sitemap.push(
    {
      url: `${process.env.NEXT_PUBLIC_URL}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
    },
    // Add other URLs here
  );

  return sitemap;
}

// Recursively retrieve all file paths
function getAllFilePaths(directory: string): string[] {
  const fileNames = fs.readdirSync(directory);
  const filePaths = fileNames.map((fileName) => {
    const filePath = path.join(directory, fileName);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      return getAllFilePaths(filePath);
    } else {
      return filePath;
    }
  });

  return Array.prototype.concat(...filePaths);
}
