'use client'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { XIcon } from 'lucide-react'

export default function ContactFormComponent() {
	const [formValues, setFormValues] = useState({
		name: '',
		phone: '',
		email: '',
		message: '',
	})

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { id, value } = event.target
		setFormValues((prevValues) => ({
			...prevValues,
			[id]: value,
		}))
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		// Validation
		if (
			!formValues.email ||
			!formValues.name ||
			!formValues.phone ||
			!formValues.message
		) {
			toast('Error', {
				description: 'All fields must be filled out',
				action: {
					label: <XIcon fontSize={4} />,
					onClick: () => {},
				},
			})
			return
		}
		try {
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					access_key: process.env.NEXT_PUBLIC_CONTACT_KEY!,
					name: formValues.name,
					email: formValues.email,
					message: formValues.message,
				}),
			})
			const result = await response.json()
			if (result.success) {
				console.log(result)
				toast('Success!', {
					description: 'Your message has been sent!',
					action: {
						label: 'Undo',
						onClick: () => console.log('Undo'),
					},
				})
				setFormValues({
					name: '',
					phone: '',
					email: '',
					message: '',
				})
			} else {
				throw new Error('Error')
			}
		} catch (e: any) {
			toast('Error', {
				description: e.message || 'An error occurred',
				action: {
					label: <XIcon fontSize={4} />,
					onClick: () => {},
				},
			})
		}
	}

	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2 ">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						value={formValues.name}
						onChange={handleChange}
						placeholder="John Doe"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="phone">Phone</Label>
					<Input
						id="phone"
						type="tel"
						value={formValues.phone}
						onChange={handleChange}
						placeholder="(123)-456-7890"
					/>
				</div>
			</div>
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					value={formValues.email}
					onChange={handleChange}
					placeholder="john@example.com"
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="message">Message</Label>
				<Textarea
					id="message"
					rows={5}
					value={formValues.message}
					onChange={handleChange}
					placeholder="Hi there, I'd like to buy honey in person!"
				/>
			</div>
			<button className="flex text-sm font-medium justify-center w-full items-center gap-2 rounded-lg border-2 border-yellow-300 bg-yellow-300 px-4 py-2 text-neutral-800 transition-all duration-500 ease-in-out hover:shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
				{/* <FiShoppingCart fontSize={18} fontWeight={800} /> */}
				Submit
			</button>
		</form>
	)
}
