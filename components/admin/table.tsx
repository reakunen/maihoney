'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useState, useEffect } from 'react'

interface HoneyItem {
	id: string
	name: string
	variety: string
	origin: string
	price: number
	stock_kg: string
	notes: string
	size: string
	weight: string
}

interface HoneyTableProps {
	title: string
	apiEndpoint: string
}

export function HoneyTable({ title, apiEndpoint }: HoneyTableProps) {
	const [searchParams, setSearchParams] = useState({
		id: '',
		name: '',
		origin: '',
		q: '',
	})
	const [results, setResults] = useState<HoneyItem[]>([])
	const [loading, setLoading] = useState(false)

	const fetchData = async (params: URLSearchParams) => {
		setLoading(true)
		try {
			const response = await fetch(`${apiEndpoint}?${params.toString()}`)
			const data = await response.json()
			setResults(data)
		} catch (error) {
			console.error('Search failed:', error)
		} finally {
			setLoading(false)
		}
	}

	// Add useEffect for initial data fetch
	useEffect(() => {
		const params = new URLSearchParams()
		fetchData(params)
	}, [apiEndpoint]) // Only re-run if apiEndpoint changes

	const handleSearch = async () => {
		const params = new URLSearchParams()
		if (searchParams.id) params.append('id', searchParams.id)
		if (searchParams.name) params.append('name', searchParams.name)
		if (searchParams.origin) params.append('origin', searchParams.origin)
		if (searchParams.q) params.append('q', searchParams.q)
		fetchData(params)
	}

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">{title}</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<Input
					placeholder="Search by ID"
					value={searchParams.id}
					onChange={(e) =>
						setSearchParams((prev) => ({ ...prev, id: e.target.value }))
					}
				/>
				{/* <Input
					placeholder="Search by Name"
					value={searchParams.name}
					onChange={(e) =>
						setSearchParams((prev) => ({ ...prev, name: e.target.value }))
					}
				/> */}
				<Input
					placeholder="Search by Origin"
					value={searchParams.origin}
					onChange={(e) =>
						setSearchParams((prev) => ({ ...prev, origin: e.target.value }))
					}
				/>
				<Input
					placeholder="General Search"
					value={searchParams.q}
					onChange={(e) =>
						setSearchParams((prev) => ({ ...prev, q: e.target.value }))
					}
				/>
			</div>

			<div className="flex items-center gap-4 mb-6">
				<Button onClick={handleSearch} disabled={loading}>
					{loading ? 'Searching...' : 'Search'}
				</Button>
				<span className="text-sm text-gray-500">
					{loading ? 'Currently fetching data...' : 'Done fetching'}
				</span>
			</div>

			<div className="border rounded-lg">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Variety</TableHead>
							<TableHead>Origin</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Stock (kg)</TableHead>
							{/* <TableHead>Size</TableHead> */}
							{/* <TableHead>Weight</TableHead> */}
							<TableHead>Notes</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{results.map((item) => (
							<TableRow key={item.id}>
								<TableCell>{item.id}</TableCell>
								<TableCell>{item.name}</TableCell>
								<TableCell>{item.variety}</TableCell>
								<TableCell>{item.origin}</TableCell>
								<TableCell>${item.price.toFixed(2)}</TableCell>
								<TableCell>{item.stock_kg}</TableCell>
								{/* <TableCell>{item.size}</TableCell> */}
								{/* <TableCell>{item.weight}</TableCell> */}
								<TableCell>{item.notes}</TableCell>
							</TableRow>
						))}
						{results.length === 0 && (
							<TableRow>
								<TableCell colSpan={9} className="text-center">
									No results found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
