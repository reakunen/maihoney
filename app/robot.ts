import { Metadata, MetadataRoute } from 'next'

export default function robot(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/checkout-sessions'],
		},
		sitemap: 'https://www.maihoney.com/sitemap.xml',
	}
}
