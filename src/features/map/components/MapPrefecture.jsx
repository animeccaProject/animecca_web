'use client'

import { useEffect } from 'react'

export default function MapPrefecture({ places, handleSelectedPlaceIndex }) {
  const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY

  useEffect(() => {
    if (places.length === 0) return

    const initMap = () => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {
          // lat: places[0].location.latitude,
          // lng: places[0].location.longitude,
          lat: 35.6764225,
          lng: 139.650027,
        },
        zoom: 8,
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
        const clickedLocation = e.latLng
        console.log(clickedLocation.toString())
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

  return <div id="map" style={{ height: '400px', width: '400px' }} />
}
