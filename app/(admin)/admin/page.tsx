'use client'

import { useState } from 'react'
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

interface HoneyItem {
    id: string
    name: string
    origin: string
    notes: string
    // Add other fields as needed
}

export default function AdminPage() {
    const [searchParams, setSearchParams] = useState({
        id: '',
        name: '',
        origin: '',
        q: ''
    })
    const [results, setResults] = useState<HoneyItem[]>([])
    const [loading, setLoading] = useState(false)

    const handleSearch = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (searchParams.id) params.append('id', searchParams.id)
            if (searchParams.name) params.append('name', searchParams.name)
            if (searchParams.origin) params.append('origin', searchParams.origin)
            if (searchParams.q) params.append('q', searchParams.q)

            const response = await fetch(`/api/searchEndpoint?${params.toString()}`)
            const data = await response.json()
            setResults(data)
        } catch (error) {
            console.error('Search failed:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Honey Database Search</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Input
                    placeholder="Search by ID"
                    value={searchParams.id}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, id: e.target.value }))}
                />
                <Input
                    placeholder="Search by Name"
                    value={searchParams.name}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                    placeholder="Search by Origin"
                    value={searchParams.origin}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, origin: e.target.value }))}
                />
                <Input
                    placeholder="General Search"
                    value={searchParams.q}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, q: e.target.value }))}
                />
            </div>

            <Button
                onClick={handleSearch}
                disabled={loading}
                className="mb-6"
            >
                {loading ? 'Searching...' : 'Search'}
            </Button>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Origin</TableHead>
                            <TableHead>Notes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.origin}</TableCell>
                                <TableCell>{item.notes}</TableCell>
                            </TableRow>
                        ))}
                        {results.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
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
