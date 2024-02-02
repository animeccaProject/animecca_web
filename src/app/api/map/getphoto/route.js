export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const photo = searchParams.get('photo')

  const apiKey = process.env.MAP_API_KEY

  const url = `https://places.googleapis.com/v1/${photo}/media?maxHeightPx=350&maxWidthPx=350&key=${apiKey}`

  return Response.json({ url })
}
