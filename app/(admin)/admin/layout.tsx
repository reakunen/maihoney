import Link from 'next/link'

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="min-h-screen bg-neutral-50">
			<nav className="bg-white border-b border-neutral-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16 items-center">
						<div className="flex items-center gap-4">
							<Link
								href="/admin/bigHoney"
								className="text-lg font-medium text-neutral-900 hover:text-yellow-500 transition-colors"
							>
								BigHoney
							</Link>
							<Link
								href="/admin/smallHoney"
								className="text-lg font-medium text-neutral-900 hover:text-yellow-500 transition-colors"
							>
								SmallHoney
							</Link>
						</div>
					</div>
				</div>
			</nav>
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{children}
			</main>
		</div>
	)
}
