'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Background from '@/public/images/img7.jpg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useShoppingCart } from 'use-shopping-cart'
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PlusIcon, TrashIcon, MinusIcon } from 'lucide-react'

export default function CartItems() {
	const [cart, setCart] = useState([
		{
			id: 1,
      link: '/products/honey',
			image: '/images/honey1.jpg',
			name: 'Premium Raw Honey - 16 oz',
			price: 15,
			description: 'Delicious premium honey made from my backyard.',
			quantity: 1,
		},
		{
			id: 2,
      link: '/products/honey',
			image: '/placeholder.svg',
			name: 'Premium Raw Honey - 32 oz',
			description: 'Delicious premium honey made from my backyard.',
			price: 25,
			quantity: 2,
		},
		{
			id: 3,
      link: '/products/honey',
			image: '/public/.svg',
			name: 'Fall Fragrance Candle',
			description: 'Delicious premium honey made from my backyard.',
			price: 16.99,
			quantity: 1,
		},
	])

	const handleQuantityChange = (id: number, quantity: number) => {
		setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)))
	}

	const handleRemoveItem = (id: number) => {
		setCart(cart.filter((item) => item.id !== id))
	}

	const subtotal = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	)
	const tax_rate = '10.75%'

	const tax = subtotal * 10.75
	const shipping = 5.99

	return (
		<div className="container mx-auto px-4 md:px-6 py-12">
			<h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
			<div className="grid md:grid-cols-[1fr_380px] gap-8">
				<div className="grid gap-6">
					{cart.map((item) => (
						<div
							key={item.id}
							className="grid grid-cols-[120px_1fr_auto] items-center gap-4"
						>
							<Link href={item.link}>
								<Image
									src={item.image}
									alt={item.name}
									width={120}
									height={120}
									className="rounded-lg object-cover"
								/>
							</Link>
							<div className="grid gap-1">
								<h3 className="font-semibold">{item.name}</h3>
								{/* <p className="text-muted-foreground text-xs">
										{item.description}
									</p> */}
								<p className="text-muted-foreground">
									${item.price.toFixed(2)}
								</p>
							</div>
							<div className="flex items-center gap-2">
								<Input
									type="number"
									value={item.quantity}
									onChange={(e) =>
										handleQuantityChange(item.id, parseInt(e.target.value))
									}
									min={1}
									className="w-16 text-center"
								/>
								<Button
									size="icon"
									variant="ghost"
									onClick={() => handleRemoveItem(item.id)}
								>
									<TrashIcon className="w-4 h-4" />
								</Button>
							</div>
						</div>
					))}
				</div>
				<Card className="bg-[#fcfcfc]">
					<CardHeader>
						<CardTitle className="font-light">Order Summary</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="flex justify-between font-semibold">
							<span>Total</span>
							<span>${(subtotal + tax + shipping).toFixed(2)}</span>
						</div>
						<Separator />

						<div>
							<span className="text-sm text-muted-foreground">
								Shipping and taxes calculated at checkout.
							</span>
						</div>
					</CardContent>
					<CardFooter>
						<Button className="w-full">Proceed to Checkout</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
