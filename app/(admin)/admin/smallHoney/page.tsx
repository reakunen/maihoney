'use client'

import { HoneyTable } from '@/components/admin/table'

export default function SmallHoneyPage() {
	return (
		<HoneyTable
			title="Small Honey Database Search"
			apiEndpoint={`${process.env.NEXT_PUBLIC_URL}/api/smallHoney/`}
		/>
	)
}
