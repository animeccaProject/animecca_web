'use client'

import { useEffect } from 'react'

export default function MapUser({ places, handleSelectedPlaceIndex }) {
  const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY

  useEffect(() => {
    const initMap = () => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 36.204823999999995,
          lng: 138.252924,
        },
        zoom: 6,
      })

      places.forEach((place, index) => {
        const marker = new google.maps.Marker({
          position: {
            lat: place.location.latitude,
            lng: place.location.longitude,
          },
          map,
          title: place.displayName.text,
        })

        marker.addListener('click', () => {
          handleSelectedPlaceIndex(index)
        })
      })

      map.addListener('click', (e) => {
        map.panTo(e.latLng)
      })
    }

    if (!window.google) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
      script.async = true
      script.defer = true
      window.initMap = initMap
      document.head.appendChild(script)
    } else {
      initMap()
    }
  }, [places])

  return <div id="map" style={{ height: '400px', width: '530px' }} />
}
