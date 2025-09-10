import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  //const tournamentId = await tournamentsId();

  //console.log(tournamentId);

  const tournamentId = ['lol', 'lol-ffsu', 'cs2', 'osu', 'valo', 'tft', 'open'];
  // 'ssbu',
  // Path to the directory containing your TSX files
  const siteDirectory = path.join(process.cwd(), '/src/app');

  // Retrieve all file paths recursively
  const filePaths = getAllFilePaths(siteDirectory);

  const absoluteAppPaths = path.resolve('./src');

  const allowedFilePaths = filePaths.filter((filePath) => {
    const relativeFilePaths = path.relative(absoluteAppPaths, filePath);
    if (
      relativeFilePaths.slice(3, 15) !== '/(dashboard)' &&
      relativeFilePaths.slice(3, 9) !== '/oauth' &&
      relativeFilePaths.slice(3, 9) !== '/reset' &&
      relativeFilePaths.slice(3, 12) !== '/validate' &&
      relativeFilePaths.slice(3, 12) !== '/page.tsx'
    ) {
      return filePath;
    }
  });

  // Select only .tsx files
  const tsxFilePaths = allowedFilePaths.filter((filePath) => {
    if (filePath.slice(-8) === 'page.tsx' && filePath.indexOf('[') === -1) {
      return filePath;
    }
  });

  // Generate URLs and add them to the sitemap
  const sitemap = tsxFilePaths.map((filePath) => {
    const category = path.basename(path.dirname(filePath));
    const url = `${process.env.NEXT_PUBLIC_URL}/${category}`;
    const changeFrequency = 'weekly' as const;
    const lastModified = fs.statSync(filePath).mtime;
    const priority = 0.5;
    return {
      url,
      lastModified,
      changeFrequency,
      priority,
    };
  });

  // Add other URLs to the sitemap
  for (const id of tournamentId) {
    sitemap.push({
      url: `${process.env.NEXT_PUBLIC_URL}/tournament/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    });
  }

  sitemap.push({
    url: `${process.env.NEXT_PUBLIC_URL}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  });

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
