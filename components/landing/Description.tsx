'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Description() {
	// MaskText component definition
	const phrases = ['Authentic', 'Natural', 'Organic', 'Delicious']

	const animation = {
		initial: { y: '100%' },
		enter: (i: number) => ({
			y: '0',
			transition: {
				duration: 0.75,
				ease: [0.33, 1, 0.68, 1],
				delay: 0.075 * i,
			},
		}),
	}

	const MaskText = () => {
		const { ref, inView, entry } = useInView({
			threshold: 0.75,
			triggerOnce: true,
		})

		return (
			<div ref={ref} className="text-[10vw] md:text-[5vw]">
				{phrases.map((phrase, index) => {
					return (
						<div key={index} className="overflow-hidden">
							<motion.p
								custom={index}
								variants={animation}
								initial="initial"
								animate={inView ? 'enter' : ''}
								className="m-0 font-bold"
							>
								{phrase}
							</motion.p>
						</div>
					)
				})}
			</div>
		)
	}

	return (
		<div className="flex justify-center my-40">
			<div className="text-[15vw] md:text-[7.5vw] uppercase text-center max-w-[90vw] md:max-w-[50vw] leading-none">
				<MaskText />
			</div>
		</div>
	)
}
