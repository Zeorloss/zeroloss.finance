import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export const SEO = ({ title, description, pathname, children }) => {
  const { title: defaultTitle, description: defaultDescription, image, siteUrl, twitterUsername } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="icon" href="/icon.png" type="image/png" />
      <meta httpEquiv="content-language" content="en" />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* <meta name="image" content={seo.image} /> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      <link href="https://kryptolite.rocks/assets/widget/v1/styles.css" defer rel="stylesheet" />
    <script src="https://kryptolite.rocks/assets/widget/v1/main.js" async defer></script>
    <script src="https://kryptolite.rocks/assets/widget/v1/kryptolitewidget.min.js" async defer></script>
      {children}
    </>
  )
}