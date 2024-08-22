'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { FiMenu, FiArrowRight, FiX, FiShoppingCart } from 'react-icons/fi'
import Link from 'next/link'
import HoneyComb from './honeycomb'
import { NavLinks, MobileNavLinks } from '@/constants/navlinks'
import {
	useMotionValueEvent,
	AnimatePresence,
	useScroll,
	motion,
} from 'framer-motion'
import products from '@/constants/products'

export const FlyoutNav = () => {
	const [scrolled, setScrolled] = useState(false)
	const { scrollY } = useScroll()

	useMotionValueEvent(scrollY, 'change', (latest) => {
		setScrolled(latest > 250 ? true : false)
	})

	return (
		<nav
			className={`fixed top-0 z-50 w-full px-6 text-white 
      transition-all duration-300 ease-out lg:px-12 uppercase
      ${
				scrolled
					? 'bg-neutral-950 py-3 shadow-xl'
					: 'bg-neutral-950/0 py-6 shadow-none'
			}`}
		>
			<div className="mx-auto flex max-w-7xl items-center justify-between">
				<Logo />
				<div className="hidden gap-6 lg:flex">
					<Links />
					<CTAs />
				</div>
				<MobileMenu />
			</div>
		</nav>
	)
}

const Logo = ({ color = 'white' }: { color?: string }) => {
	return (
		<Link href="/" className="flex items-center gap-0">
			<span className="lowercase text-2xl" style={{ color }}>
				maihoney
			</span>
			<HoneyComb color={color} />
		</Link>
	)
}

const Links = () => {
	return (
		<div className="flex items-center gap-6">
			{NavLinks.map((l) => (
				<NavLink key={l.text} href={l.href}>
					{l.text}
				</NavLink>
			))}
		</div>
	)
}

const NavLink = ({
	children,
	href,
}: {
	children: React.ReactNode
	href: string
}) => {
	return (
		<div className="relative h-fit w-fit">
			<Link href={href} className="relative group">
				{children}
				<span className="absolute -bottom-2 left-0 right-0 h-1 origin-left scale-x-0 rounded-full bg-yellow-300 transition-transform duration-300 ease-out group-hover:scale-x-100" />
			</Link>
		</div>
	)
}

const CTAs = () => {
	
	return (
		<div className="flex items-center gap-3">
			<Link href={products.payment_link}>
				<button className="flex items-center gap-2 rounded-lg border-2 border-yellow-300 bg-yellow-300 px-4 py-2 text-neutral-800 transition-all duration-500 ease-in-out hover:shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
					<FiShoppingCart fontSize={18} fontWeight={800} />
					{/* <NavCart /> */}
					{/* Buy Now */}
				</button>
			</Link>
		</div>
	)
}

const MobileMenuLink = ({
	children,
	href,
	setMenuOpen,
}: {
	children: React.ReactNode
	href: string
	setMenuOpen: Dispatch<SetStateAction<boolean>>
}) => {
	return (
		<Link
			onClick={(e) => {
				e.stopPropagation()
				setMenuOpen(false)
			}}
			href={href}
			className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-6 text-start text-2xl font-semibold text-neutral-950"
		>
			<span>{children}</span>
			<FiArrowRight />
		</Link>
	)
}

const MobileMenu = () => {
	const [open, setOpen] = useState(false)
	return (
		<div className="block lg:hidden">
			<button onClick={() => setOpen(true)} className="block text-3xl">
				<FiMenu />
			</button>
			<AnimatePresence>
				{open && (
					<motion.nav
						initial={{ x: '100vw' }}
						animate={{ x: 0 }}
						exit={{ x: '100vw' }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
						className="fixed left-0 top-0 flex h-screen w-full flex-col bg-white"
					>
						<div className="flex items-center justify-between p-6">
							<Logo color="black" />
							<button onClick={() => setOpen(false)}>
								<FiX className="text-3xl text-neutral-950" />
							</button>
						</div>
						<div className="h-screen overflow-y-scroll bg-neutral-100 p-6">
							{MobileNavLinks.map((l: any) => (
								<MobileMenuLink
									key={l.text}
									href={l.href}
									setMenuOpen={setOpen}
								>
									{l.text}
								</MobileMenuLink>
							))}
						</div>
						<div
							className="flex justify-end bg-neutral-950 p-6"
							onClick={() => setOpen(false)}
						>
							<CTAs />
						</div>
					</motion.nav>
				)}
			</AnimatePresence>
		</div>
	)
}
