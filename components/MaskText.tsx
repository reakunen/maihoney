'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function MaskText() {
    //Authentic. Natural. Organic. Delicious.
	const phrases = [
		'Authentic.',
		'Natural.',
		'Organic.',
		'Delicious.',
	]

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

	const { ref, inView, entry } = useInView({
		threshold: 0.75,
		triggerOnce: true,
	})

	return (
		<div ref={ref} className="text-[5vw]">
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