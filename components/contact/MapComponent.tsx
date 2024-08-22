'use client'
import React from 'react'
import {
	APIProvider,
	Map,
	MapCameraChangedEvent,
} from '@vis.gl/react-google-maps'

export default function MapComponent() {
	const center = {
		lat: 37.67355728149414,
		lng: -122.1295166015625,
	}

	return (
		<APIProvider
			// apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
			apiKey='AIzaSyAUuYn0wV5g-yhR4LkFbRC3xsi0ADT0alo'
			onLoad={() => console.log('Maps API has loaded.')}
		>
			<Map
				defaultZoom={13}
				defaultCenter={{ lat: center.lat, lng: center.lng }}
				// onCameraChanged={(ev: MapCameraChangedEvent) =>
				// 	console.log(
				// 		'camera changed:',
				// 		ev.detail.center,
				// 		'zoom:',
				// 		ev.detail.zoom
				// 	)
				// }
			/>
		</APIProvider>
	)
}

