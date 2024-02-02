export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  const apiKey = process.env.MAP_API_KEY

  const url = `https://places.googleapis.com/v1/places/${id}?fields=displayName,location,formattedAddress&languageCode=ja&key=${apiKey}`

  const res = await fetch(url)
  const data = await res.json()
  return Response.json(data)
}
