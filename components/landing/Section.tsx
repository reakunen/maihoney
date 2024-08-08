import Image from 'next/image'
import Background from '@/public/images/img4.jpg'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

export default function Section() {
	const container = useRef(null)
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'end start'],
	})
	const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

	return (
		<div
			ref={container}
			className="relative flex items-center justify-center h-screen overflow-hidden"
			style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
		>
			<div className="relative z-10 p-20 mix-blend-difference text-white w-full h-full flex flex-col justify-between">
				<p className="w-[90vw] md:w-[50vw] text-[4vw] md:text-[2vw] self-end uppercase mix-blend-difference mx-auto md:mx-0 md:self-end">
					Indulge in the pure, unadulterated sweetness of our premium honey with unparalleled flavor because that&apos;s what nature had intended.
				</p>
				<p className=" text-[8vw] md:text-[5vw] uppercase mix-blend-difference mx-auto md:mx-0 md:self-start">
					From our Backyard
				</p>
			</div>
			<div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
				<motion.div style={{ y, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} className="relative w-full h-full">
					<Image
						src={Background}
						fill
						alt="image"
						style={{ objectFit: 'cover', opacity: 0.9 }}
					/>
				</motion.div>
			</div>
		</div>
	)
}