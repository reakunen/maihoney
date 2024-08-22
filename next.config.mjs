import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['files.stripe.com', 'https://files.stripe.com/links/'],
	},
}

export default withNextVideo(nextConfig);