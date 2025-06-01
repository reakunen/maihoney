import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import HoneyComb from './honeycomb'
export default function Footer() {
	return (
		<footer className="bg-[#F8F8F8] py-12 border-t border-[#E5E5E5]">
			<div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-0">
						<span className="text-2xl font-bold text-[#333333]">maihoney</span>
						<HoneyComb />
					</div>
					<p className="text-[#666666] text-sm">
						We are beekeepers that produce honey in our backyard! #savethebees
					</p>
				</div>
				<div className="max-sm:hidden flex flex-col gap-4">
					<h3 className="text-[#333333] font-bold">Quick Links</h3>
					<nav className="flex flex-col gap-2">
						<Link
							href="/"
							className="text-[#666666] hover:text-[#F7A72D] transition-colors"
							prefetch={false}
						>
							Home
						</Link>
						<Link
							href="/our-story"
							className="text-[#666666] hover:text-[#F7A72D] transition-colors"
							prefetch={false}
						>
							Our Story
						</Link>
						<Link
							href="/contact"
							className="text-[#666666] hover:text-[#F7A72D] transition-colors"
							prefetch={false}
						>
							Contact
						</Link>
					</nav>
				</div>
				<div className="flex flex-col gap-4">
					<h3 className="text-[#333333] font-bold">Newsletter</h3>
					<p className="text-[#666666] text-sm">
						Subscribe to our newsletter to receive updates and special offers.
					</p>
					<form className="flex gap-2">
						<Input
							type="email"
							placeholder="Enter your email"
							className="flex-1 bg-white border border-[#E5E5E5] rounded-md px-4 py-2 text-sm"
						/>
						<button className="text-sm font-medium flex items-center gap-2 rounded-lg border-2 border-yellow-300 bg-yellow-300 px-4 text-neutral-800 transition-all duration-500 ease-in-out hover:shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
							Subscribe
						</button>
					</form>
				</div>
				<div className="max-sm:hidden flex flex-col gap-4">
					<h3 className="text-[#333333] font-bold">Contact</h3>
					<p className="text-[#666666] text-sm">
						Phone: +1 (510) 501-0079
						<br />
						Email: contact@maihoney.com
					</p>
				</div>
			</div>
			<div className="container mx-auto px-4 md:px-6 mt-8 flex items-center justify-between">
				<p className="text-[#666666] text-sm">
					&copy; {new Date().getFullYear()} Maihoney. All rights reserved.
				</p>
				{/* <div className="flex items-center gap-4">
					<Link
						href="#"
						className="text-[#666666] hover:text-[#F7A72D] transition-colors"
						prefetch={false}
					>
						Privacy Policy
					</Link>
					<Link
						href="#"
						className="text-[#666666] hover:text-[#F7A72D] transition-colors"
						prefetch={false}
					>
						Terms of Service
					</Link>
				</div> */}
			</div>
		</footer>
	)
}
