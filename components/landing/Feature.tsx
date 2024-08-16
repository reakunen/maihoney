'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { Card } from './Card'
export default function Feature() {
	const controls = useAnimation()
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2, // Adjust this threshold as needed
	})

	useEffect(() => {
		if (inView) {
			controls.start({ opacity: 1, y: 0 })
		}
	}, [controls, inView])

	return (
		<section className="py-12 md:py-20">
			<div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:gap-12 lg:max-w-6xl">
				{/* <div className="sm:hidden flex justify-center uppercase rounded-lg bg-yellow-400 px-3 py-1 text-lg">
					Featured Product
				</div> */}
				{/* <Card href={'/products'} desc={'swagalicious'} name={'honey'}/> */}
				<div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out group hover:-translate-y-1 hover:shadow-xl">
					<Link href="#" className="absolute inset-0 z-10" prefetch={false}>
						<span className="sr-only">View Product</span>
					</Link>
					<Image
						src="/images/honey1.jpg"
						alt="Featured Product Honey"
						width={800}
						height={600}
						className="h-64 w-full object-cover md:h-auto"
						style={{ aspectRatio: '800/600', objectFit: 'cover' }}
					/>
					<div className="bg-card p-6">
						<h2 className="text-2xl font-bold">Natural Organic Honey</h2>
						<p className="mt-2 text-muted-foreground">
							Indulge in nature&apos;s natural sweetener.
						</p>
						<Button size="lg" className="mt-6">
							View Product
						</Button>
					</div>
				</div>
				<motion.div
					className="flex flex-col justify-center gap-4 md:gap-6"
					ref={ref}
					initial={{ opacity: 0, y: 50 }}
					animate={controls}
					transition={{ duration: 0.6, ease: 'easeInOut' }}
				>
					<div className="space-y-2">
						<div className="inline-block rounded-lg bg-yellow-300 px-3 py-1 text-sm">
							Featured Product
						</div>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
							Elevate Your Audio Experience
						</h2>
						<p className="text-muted-foreground md:text-xl">
							Discover our top-of-the-line wireless headphones, engineered for
							exceptional sound quality and unparalleled comfort.
						</p>
					</div>
					<div className="flex flex-col gap-4 min-[400px]:flex-row">
						<button className="flex text-sm font-medium justify-center items-center gap-2 rounded-lg border-2 border-yellow-300 bg-yellow-300 px-4 py-2 text-neutral-800 transition-all duration-500 ease-in-out hover:shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
							{/* <FiShoppingCart fontSize={18} fontWeight={800} /> */}
							Buy Now
						</button>{' '}
						<Link
							href="#"
							className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
							prefetch={false}
						>
							<button className="flex text-sm font-medium justify-center w-full items-center gap-2 rounded-lg border-2 border-yellow-300 bg-yellow-300 px-4 py-2 text-neutral-800 transition-all duration-500 ease-in-out hover:shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
								{/* <FiShoppingCart fontSize={18} fontWeight={800} /> */}
								Submit
							</button>{' '}
						</Link>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
