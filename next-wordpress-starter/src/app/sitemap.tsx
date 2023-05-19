import { MetadataRoute } from "next";
import { generateSiteMap } from "@jambaree/next-wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = await generateSiteMap();

  return paths?.map((path) => ({
    url: process.env.NEXT_SITE_URL || "http://localhost:3000" + path,
    lastModified: new Date(),
  }));
}
