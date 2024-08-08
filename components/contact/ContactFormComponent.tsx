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
		const formData = new FormData(event.target as HTMLFormElement)

		formData.append('access_key', process.env.NEXT_PUBLIC_CONTACT_KEY!)

		const object = Object.fromEntries(formData)
		const json = JSON.stringify(object)
		console.log(json)
		try {
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: json,
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
      throw new Error("Error")
		}
		} catch (e) {
			toast('Error', {
				description: 'Please try again later.',
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
				<div className="space-y-2">
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
					placeholder="Hi I'd like to buy honey in person!"
				/>
			</div>
			<Button type="submit" className="w-full">
				Submit
			</Button>
		</form>
	)
}
