'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { UploadIcon } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import products from '@/constants/products'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'

export default function Products() {
	const { addItem } = useShoppingCart()

	const handleShare = () => {
		const currentUrl = window.location.href // Get the current URL

		navigator.clipboard
			.writeText(currentUrl)
			.then(() => {
				toast.success('Link copied to clipboard!') // Show success message
			})
			.catch(() => {
				toast.error('Failed to copy the link.') // Show error message
			})
	}

	const handleAddToCart = () => {
		const product = {
			id: products.id,
			name: products.name,
			price: products.price,
			currency: products.currency,
			image: products.image[0],
			description: 'Premium organic honey, 16oz jar',
		}

		addItem(product)
		toast.success('Added to cart!')
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl px-4 mx-auto py-6 items-center">
			<div className="grid gap-4 md:gap-8 items-start">
				<Carousel className="relative">
					<CarouselContent>
						<CarouselItem className="flex justify-center">
							<Image
								src={products.image[0]}
								alt={'Product of Honey'}
								width={450}
								height={400}
								className="rounded-lg overflow-hidden"
							/>
						</CarouselItem>
						<CarouselItem className="flex justify-center">
							<Image
								src={products.image[1]}
								alt={'Product of Honey'}
								width={450}
								height={400}
								className="rounded-lg overflow-hidden"
							/>
						</CarouselItem>
						<CarouselItem className="flex justify-center">
							<Image
								src={products.image[2]}
								alt={'Product of Honey'}
								width={450}
								height={400}
								className="rounded-lg overflow-hidden"
							/>
						</CarouselItem>
					</CarouselContent>
					<CarouselPrevious className="absolute left-2 md:left-2" />
					<CarouselNext className="absolute right-2 md:right-2" />
				</Carousel>
			</div>
			<div className="grid gap-4 md:gap-10 items-start">
				<div className="grid gap-4 text-neutral-600">
					<h1 className="font-bold text-3xl lg:text-4xl text-neutral-900">
						{products.name}
					</h1>
					<data
						className="money flex font-semibold text-neutral-900"
						value="100.00"
					>
						{formatCurrencyString({ value: products.price, currency: 'USD' })}{' '}
						USD
					</data>
					<p>
						Experience the rich, golden sweetness of our premium organic honey,
						harvested from our backyard in San Lorenzo, California. Our honey is
						a true testament to nature&apos;s finest, offering a pure and
						unfiltered taste that is as close to nature as it gets. Perfect for
						those who appreciate the natural, unadulterated flavor of raw honey.
					</p>
				</div>
				<div className="flex gap-6">
					<Link
						aria-disabled
						href={products.payment_link}
						className="flex-1 py-3 px-6 text-center bg-yellow-300 text-yellow-950 rounded-lg border-2 border-yellow-300 transition-transform duration-300 ease-out transform hover:scale-105 shadow-[8px_8px_0px_0px_rgb(250,204,21)]"
					>
						Buy it now
					</Link>
					<button
						onClick={handleAddToCart}
						className="flex-1 py-3 px-6 bg-brown-500 text-neutral-900 rounded-lg border-2 border-yellow-950 transition-transform duration-300 ease-out transform hover:scale-105 shadow-[8px_8px_0px_0px_rgb(66,32,6)]"
					>
						Add to cart
					</button>
				</div>
				<div className="text-sm leading-loose">
					<h2 className="font-bold text-lg text-neutral-900">
						Product Details
					</h2>
					<ul className="list-disc pl-4 text-neutral-600">
						<li>16oz of pure unfiltered honey</li>
						<li>100% pure, raw, unfiltered honey</li>
						<li>Sourced from my backyard in San Lorenzo, California</li>
						<li>Shipping takes 5-7 business days</li>
					</ul>
				</div>
				<div className="flex justify-between text-xs text-neutral-600">
					<p
						onClick={handleShare}
						className=" flex items-center gap-1 cursor-pointer"
					>
						Share <UploadIcon size={14} />
					</p>
					<Link href="/our-story">
						<p>Learn More </p>
					</Link>
				</div>
			</div>
		</div>
	)
}
