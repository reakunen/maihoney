import React, { useRef } from 'react'
import Image from 'next/image'
import Background from '@/public/images/img1.jpg'
import { useScroll, useTransform, motion } from 'framer-motion'
import { FaArrowDown } from 'react-icons/fa'
import { FlipWords } from '../ui/flip-words'
import Video from 'next-video'
export default function Intro() {
	const container = useRef(null)
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end start'],
	})
	const words = [
		'organic   ',
		'pure      ',
		'premium   ',
		'natural   ',
		'unfiltered',
	]
	const y = useTransform(scrollYProgress, [0, 1], ['0vh', '50vh'])

	return (
		<div ref={container} className="h-screen overflow-hidden relative">
			<motion.div
				style={{ y }}
				className="absolute top-0 left-0 right-0 bottom-0"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, ease: 'easeInOut' }}
			>
				{/* <Video src={require("../../videos/cutting_honey.MOV")} autoPlay muted loop /> */}
				<Image
					src={Background}
					layout="fill"
					alt="image"
					style={{ objectFit: 'cover' }}
				/>
				<div className="absolute inset-0 bg-black opacity-40" />
			</motion.div>
			<motion.div
				className="absolute inset-0 flex justify-center items-center"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease: 'easeInOut' }}
			>
				<h1 className="text-white max-sm:text-4xl text-7xl font-bold w-[80vw]">
					Big, we make honey that is <FlipWords words={words} duration={2000} />{' '}
					<br />
					and of the highest quality!!
				</h1>
			</motion.div>
			<motion.div
				className="absolute bottom-10 w-full flex justify-center"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease: 'easeInOut' }}
			>
				<FaArrowDown className="text-white text-2xl animate-pulse" />
			</motion.div>
		</div>
	)
}
