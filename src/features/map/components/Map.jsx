'use client'

import { useEffect, useState } from 'react'

export default function GoogleMap({ places, handleSelectedPlace }) {
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)

  const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY

  useEffect(() => {
    if (places.length === 0) return

    const initMap = () => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: places[0].location.latitude,
          lng: places[0].location.longitude,
        },
        zoom: 8,
      })

      places.forEach((place) => {
        const marker = new google.maps.Marker({
          position: {
            lat: place.location.latitude,
            lng: place.location.longitude,
          },
          map,
          title: place.displayName.text,
        })

        marker.addListener('click', () => {
          setSelectedPlace(place)
          getPlacePhoto(place.photos[0].name)
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

  async function getPlacePhoto(photoName) {
    const res = await fetch(`/api/map/getphoto?photo=${photoName}`)
    const { url } = await res.json()
    setPhotoUrl(url)
  }

  return (
    <div className="flex">
      <div id="map" style={{ height: '400px', width: '400px' }} />
      <div className="flex">
        <div style={{ height: '300px', width: '300px', border: '1px solid' }}>
          {selectedPlace !== null && (
            <>
              <p>{selectedPlace.displayName.text}</p>
              <p>{selectedPlace.formattedAddress}</p>
              <img src={photoUrl} alt="" />
            </>
          )}
        </div>
        <div>
          <p>ピンをクリックすると詳細が表示されます</p>
          <button
            className="bg-gray-300 p-2"
            onClick={() => {
              handleSelectedPlace(selectedPlace)
            }}
          >
            この場所を選択する
          </button>
        </div>
      </div>
    </div>
  )
}
