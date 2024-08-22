import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Image from 'next/image'
import Video from 'next-video'
import CuttingHoney from '@/videos/cutting_honey.MOV.json'
import LookingBees from '@/videos/looking_bees.MOV.json'
import FilterHoney from '@/videos/filter_honey.MOV.json'

export default function Component() {
	return (
		<div className="flex flex-col min-h-[100dvh] overflow-x-hidden">
			<main className="flex-1">
				<section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
					<div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
						<div className="grid max-w-6xl mx-auto gap-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
							<div>
								<h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
									Our Backyard
								</h1>
								<p className="mt-4 text-muted-foreground md:text-xl">
									Despite having a small backyard, we&apos;ve found a way to
									make it thrive!​ We currently have three hives in our
									backyard, where our bees thrive. We typically harvest honey
									from April to October, the time when it&apos;s most abundant
									and flavorful. Our bees gather pollen from the beautiful local
									flowers of San Lorenzo, giving our honey its unique and
									delicious taste.
								</p>
							</div>
							<Video
								src={LookingBees as unknown as string}
								accentColor="#facc15"
							/>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6">
						<div className="grid max-w-6xl mx-auto items-center gap-6 lg:grid-cols-2 lg:gap-12">
							<Video
								src={CuttingHoney as unknown as string}
								accentColor="#facc15"
							/>
							<div className="space-y-4">
								<div className="inline-block rounded-lg bg-yellow-400 px-3 py-1 text-sm">
									Sustainable Beekeeping
								</div>
								<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
									Committed to the Environment
								</h2>
								<p className="text-muted-foreground md:text-xl">
									We believe in responsible beekeeping practices that prioritize
									the health and well-being of our bee colonies. We use natural
									methods to maintain our hives, avoiding the use of harmful
									pesticides or chemicals. Our goal is to preserve ecosystem and
									ensure a sustainable future for honey production. #savethebees
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
					<div className="container px-4 md:px-6">
						<div className="grid max-w-6xl mx-auto items-center gap-6 lg:grid-cols-2 lg:gap-12">
							<div className="space-y-4">
								<div className="inline-block rounded-lg bg-yellow-400 px-3 py-1 text-sm">
									Family Legacy
								</div>
								<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
									Crafted With Care
								</h2>
								<p className="text-muted-foreground md:text-xl">
									For over 20 years, Chris (Beekeeper Dad) has honed his
									beekeeping skills and passed down the best practices to his
									son Brian (Beekeeper Son). This dedication to excellence is
									why we proudly produce the finest honey. Our commitment to
									quality and tradition ensures that every bottle or jar
									reflects our passion and expertise.
								</p>
							</div>
							<Video
								src={FilterHoney as unknown as string}
								accentColor="#facc15"
							/>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-yellow-400 px-3 py-1 text-sm">
									The Family
								</div>
								<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
									Meet the Beekeepers
								</h2>
								<p className="max-w-[90vw] md:max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									We&apos;re just a father and son who really love beekeeping!
									It&apos;s our shared passion, and we take pride in caring for
									our bees and bringing you the best honey straight from our
									hives.
								</p>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2  gap-6">
								<div className="flex flex-col items-center justify-center space-y-2">
									<Avatar>
										<AvatarImage src="/people/dad.jpg" />
										<AvatarFallback>C</AvatarFallback>
									</Avatar>
									<div className="text-center">
										<h3 className="text-lg font-semibold">Chris</h3>
										<p className="text-muted-foreground">Beekeeper Dad</p>
									</div>
								</div>
								<div className="flex flex-col items-center justify-center space-y-2">
									<Avatar>
										<AvatarImage src="/people/brianhappy.jpeg" />
										<AvatarFallback>B</AvatarFallback>
									</Avatar>
									<div className="text-center">
										<h3 className="text-lg font-semibold">Brian</h3>
										<p className="text-muted-foreground">Beekeeper Son</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}
