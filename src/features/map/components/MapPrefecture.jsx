'use client'

import { useEffect, useState } from 'react'

export default function MapPrefecture({
  places,
  prefecture,
  handleSelectedPlaceIndex,
}) {
  const [centerLocation, setCenterLocation] = useState()

  const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY

  useEffect(() => {
    if (!prefecture) return

    async function getCenterLocation() {
      const res = await fetch(`/api/map/getinfo-byplace?place=${prefecture}`)
      const data = await res.json()
      setCenterLocation(data.places[0].location)
    }
    getCenterLocation()
  }, [prefecture])

  useEffect(() => {
    if (places.length === 0 || !prefecture) return

    const initMap = () => {
      if (!centerLocation) return

      const map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: centerLocation.latitude,
          lng: centerLocation.longitude,
        },
        zoom: 9,
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
  }, [places, centerLocation])

  return <div id="map" style={{ height: '400px', width: '530px' }} />
}
