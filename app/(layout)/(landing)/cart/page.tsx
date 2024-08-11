import Image from 'next/image'
import Background from '@/public/images/img7.jpg'
import CartItems from '@/components/cart/CartItems'
export default function CartPage() {
	return (
		<main className="bg-white min-h-screen">
			<div className="relative w-full" style={{ height: '25vh' }}>
				<Image
					src={Background}
					layout="fill"
					alt="image"
					style={{ objectFit: 'cover' }}
				/>
				<div className="absolute inset-0 flex items-center justify-center">
					<h1 className="text-white max-sm:text-[2.5rem] text-[3rem] font-bold">
						Cart
					</h1>
				</div>
			</div>
			<CartItems />
		</main>
	)
}
