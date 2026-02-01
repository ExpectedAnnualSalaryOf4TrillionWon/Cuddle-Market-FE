import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge', // Edge Runtime 사용 (빠른 응답)
}

export default function handler(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || '커들마켓 - 우리 동네 중고거래'

  return new ImageResponse(<div>{title}</div>, {
    width: 1200,
    height: 630,
  })
}
