import React from 'react'
import { RotateCcw } from 'lucide-react'
import NeuButton from './neubutton'

export default function Hero() {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="flex flex-col items-center gap-3">
				<span>
					<RotateCcw />
				</span>
				<div className="flex gap-12">
                    <NeuButton backgroundColor={'bg-green-500'} text={'Learn More'}/>
                    <NeuButton text={'Shop Now'}/>

				</div>
			</div>
		</div>
	)
}
