import React from 'react'
import Image from 'next/image'
import Background from '@/public/images/img4.jpg'

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
	return (
		<main className="bg-[#ececec] min-h-screen">
			<div className="relative w-full" style={{ height: '25vh' }}>
				<Image
					src={Background}
					layout="fill"
					alt="image"
					style={{ objectFit: 'cover' }}
				/>
				<div className="absolute inset-0 flex items-center justify-center">
					<h1 className="text-white max-sm:text-[1.5rem] text-[3rem] font-bold">
						Thank You!
					</h1>
				</div>
			</div>
			{children}
		</main>
	)
}
