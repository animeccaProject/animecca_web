'use client'

import { useEffect, useState } from 'react'

export default function GoogleMap({ places, handleSelectedPlace, onClose }) {
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
          if (!place.photos) {
            setPhotoUrl('')
            return
          }
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
    <div className="flex h-[800px] w-[700px] border border-gray-800 bg-white p-6">
      <div>
        <div id="map" style={{ height: '400px', width: '400px' }} />
      </div>
      <div className="ml-6">
        <p className="pb-10 text-[14px]">
          ピンをクリックして場所を選んでください。
        </p>
        {selectedPlace !== null && (
          <div className="mt-4">
            <p className="text-[18px]">{selectedPlace.displayName.text}</p>
            <p className="text-[15px]">
              {selectedPlace.formattedAddress.split(' ')[1]}
            </p>
            <img src={photoUrl} alt="" />
          </div>
        )}
        <div className="mt-4 flex gap-3">
          <button
            onClick={onClose}
            className="border border-gray-600 px-4 py-2 text-[14px] text-gray-600"
          >
            もう一度検索
          </button>
          <button
            className="border border-gray-800 bg-[#69cefa] px-4 py-2 text-[14px] font-semibold"
            onClick={() => {
              handleSelectedPlace(selectedPlace)
              onClose()
            }}
          >
            この場所でOK
          </button>
        </div>
      </div>
    </div>
  )
}
