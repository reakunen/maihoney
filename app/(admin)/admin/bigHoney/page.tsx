'use client'

import { HoneyTable } from '@/components/admin/table'

export default function BigHoneyPage() {
	return (
		<HoneyTable
			title="Big Honey Database Search"
			apiEndpoint={`${process.env.NEXT_PUBLIC_URL}/api/bigHoney/`}
		/>
	)
}
