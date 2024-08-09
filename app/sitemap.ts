import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://www.maihoney.com',
			lastModified: new Date(),
			priority: 1,
		},
		{
			url: 'https://www.maihoney.com/products',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: 'https://acme.com/our-story',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.7,
		},
		{
			url: 'https://acme.com/contact',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.8,
		},
	]
}
