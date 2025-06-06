import React from 'react'
import Image from 'next/image'
import Background from '@/public/images/img6.jpg'
import ContactForm from '@/components/contact/ContactForm'

export default function ContactPage() {
	return (
		<main className="bg-[#ececec] min-h-screen">
			<div className="relative w-full" style={{ height: '20vh' }}>
				<Image
					src={Background}
					layout="fill"
					alt="image"
					style={{ objectFit: 'cover' }}
				/>
				<div className="absolute inset-0 bg-black opacity-50" />
				{/* Dark overlay */}
				<div className="absolute inset-0 flex items-center justify-center">
					<h1 className="text-white max-sm:text-[2.5rem] text-[3rem] font-bold"></h1>
				</div>
			</div>
			<ContactForm />
		</main>
	)
}
