import styles from './page.module.css'
import dynamic from 'next/dynamic'
// import Scene from '@/components/Scene'
const Scene = dynamic(() => import('@/components/Scene'), {
	// loading: () => <p> Loading...</p>,
	ssr: false,
})

export default function Home() {
	return (
		// <main className="relative h-screen w-screen">
    <main className={styles.main}>
				<Scene />
		</main>
	)
}
