/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    siteUrl: `https://zeroloss.finance`,
    title: `Zeroloss`,
    description: `ZEROLOSS is a smart DeFi dApp and exchange platform built for a sustainable future for every crypto user with the POE and Proactive Market Making (PMM) algorithm.`,
    twitterUsername: `@Zeroloss_defi`,
    image: `/icon.png`,
  },
  flags: {
    DEV_SSR: true
  },
  trailingSlash: "never",
  graphqlTypegen: false,
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: "#FACC15",
        showSpinner: true,
      },
    },
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve("./src/components/GlobalAppWrapper.tsx"),
      },
    },
  ],
}
