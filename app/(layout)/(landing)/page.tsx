'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import Intro from '@/components/landing/Intro'
import Description from '@/components/landing/Description'
import Section from '@/components/landing/Section'
import PageLoader from '@/components/page-loader'
import Line from '@/components/line'
import { Metadata } from 'next'
import Products from '@/components/landing/Products'
// import Footer from '@/components/Footer'
// import Line from '@/components/Line'

export default function HomePage() {
	useEffect(() => {
		const lenis = new Lenis()

		function raf(time: number) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}

		requestAnimationFrame(raf)
	}, [])

	return (
		<main className="bg-[#ececec]">
			<Intro />
			<Description />
			<Section />
			<div className="min-h-screen flex-col items-center justify-between">
				<Products />
			</div>
			<Line />
		</main>
	)
}
