import { MetadataRoute } from "next";

export default async function sitemap() : Promise<MetadataRoute.Sitemap>{
    return [
        {
            url: "https://www.maihoney.com",
            lastModified: new Date(),
        }
    ]
}