// @ts-nocheck
'use client'
import {
	Text,
	useGLTF,
	MeshReflectorMaterial,
	MeshTransmissionMaterial,
	Text3D,
} from '@react-three/drei'

import { CameraShake } from '@react-three/drei'
import { Center } from '@react-three/drei'
import { useControls } from 'leva'
import { useDrag } from '@use-gesture/react'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Color } from 'three'
export default function Model() {
	const mesh = useRef()
	const { nodes } = useGLTF('/models/torrus5.glb')
	const { viewport } = useThree()

	const [direction, setDirection] = useState(true)

	const materialProps = useControls({
		thickness: { value: 0.5, min: 2.8, max: 3, step: 0.05 },
		roughness: { value: 0, min: 0, max: 1, step: 0.1 },
		transmission: { value: 1, min: 0, max: 1, step: 0.1 },
		ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
		chromaticAberration: { value: 0.02, min: 0.1, max: 1 },
		backside: { value: true },
	})

	useFrame(() => {
		if (direction) {
			mesh.current.rotation.x += 0.02
		} else {
			mesh.current.rotation.y -= 0.02
		}
	})

	const bind = useDrag(
		({ offset: [x, y], movement: [mx, my] }) => {
			const newX = x / 8 // Increase the division factor for slower movement
			const newY = y / 8 // Increase the division factor for slower movement
			mesh.current.position.x = newX / viewport.width
			mesh.current.position.y = -newY / viewport.height
		},
		{ pointerEvents: true }
	)

	return (
		<group
			className="cursor-pointer"
			onClick={() => setDirection(!direction)}
			{...bind()}
		>
			<CameraShake
				maxPitch={0.04}
				maxRoll={0.04}
				maxYaw={0.04}
				pitchFrequency={0.8}
				rollFrequency={0.8}
				yawFrequency={0.8}
			/>
			<Text
                    color={new Color('#e8763d')}
				letterSpacing={0.05}
				scale={viewport.width / 8}
				font="/fonts/PlayfairDisplay-Black.otf"
				position={[0, 0.5, -0.9]}
			>
				MaiHoney
			</Text>
			<Text
				color={new Color('#ed8c00')}
				letterSpacing={0.08}
				fontSize={0.5}
				scale={viewport.width / 20}
				font="/fonts/PlayfairDisplay-Black.otf"
				position={[0, -1.2, -0.9]}
				fontStyle="italic"
			>
				Natural, Organic Honey from San Lorenzo, CA delivered to you
			</Text>
			<Text
				color={new Color('#ececec')}
				letterSpacing={0.15}
				fontSize={0.75}
				scale={viewport.width / 20}
				font="/fonts/PlayfairDisplay-Black.otf"
				position={[0, -2.8, -0.9]}
				fontStyle="italic"
			>
				COMING SOON.
			</Text>

			<mesh
				ref={mesh}
				{...nodes.Torus002}
				position={[0, 0.8, 0]} // Adjust the y-coordinate to move the mesh up
				scale={viewport.width / 75}
			>
				<MeshTransmissionMaterial {...materialProps} />
			</mesh>
		</group>
	)
}
