interface SEOProps {
  title?: string
  description?: string
  image?: string
}

export function useSEO({ title, description, image }: SEOProps) {
  const fullTitle = `${title} | 커들마켓`
  const trimmedDescription = description?.slice(0, 150) ?? ''
  const ogImage = image || 'https://cuddle-market-fe.vercel.app/og-image.png'

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={trimmedDescription} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={trimmedDescription} />
      <meta property="og:image" content={ogImage} />
    </>
  )
}
