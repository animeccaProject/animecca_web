export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const place = searchParams.get('place')

  const apiKey = process.env.MAP_API_KEY

  const url = 'https://places.googleapis.com/v1/places:searchText'
  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask':
      'places.id,places.displayName,places.location,places.formattedAddress,places.addressComponents,places.photos',
  }
  const body = JSON.stringify({
    textQuery: place,
    languageCode: 'ja',
    maxResultCount: 3, // 取得する場所の最大数
  })

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body,
  })
  const data = await res.json()
  const places = data.places
  return Response.json({ places })
}
