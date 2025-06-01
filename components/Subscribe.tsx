'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function Subscribe() {
	const [email, setEmail] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		setIsSubmitting(true)

		try {
			const response = await fetch('/api/emails', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			})

			const data = await response.json()

			if (response.ok && data.status === 'success') {
				toast.success('Thank you for subscribing! 🍯')
				setEmail('')
			} else {
				toast.error(data.message || 'Something went wrong. Please try again.')
			}
		} catch (error) {
			toast.error('Something went wrong. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<form onSubmit={handleSubmit} className="flex gap-2">
				<Input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={isSubmitting}
					className="flex-1 bg-white border border-[#E5E5E5] rounded-md px-4 py-2 text-sm"
				/>
				<button
					type="submit"
					disabled={isSubmitting}
					className="text-sm font-medium flex items-center gap-2 rounded-lg border-2 border-yellow-300 bg-yellow-300 px-4 text-neutral-800 transition-all duration-500 ease-in-out hover:shadow-[8px_8px_0px_0px_rgba(250,204,21,1)] disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isSubmitting ? 'Subscribing...' : 'Subscribe'}
				</button>
			</form>
		</div>
	)
}
