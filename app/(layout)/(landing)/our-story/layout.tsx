import React from 'react'
import Image from 'next/image'
import Background from '@/public/images/img4.jpg'

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className="bg-[#ececec] min-h-screen">
			<div className="relative w-full" style={{ height: '20vh' }}>
				<Image
					src={Background}
					layout="fill"
					alt="image"
					style={{ objectFit: 'cover' }}
				/>
			</div>
			{children}
		</main>
	)
}
