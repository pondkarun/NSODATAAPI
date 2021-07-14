module.exports = {
  productionBrowserSourceMaps: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
    }
  },
  images: {
    loader: "imgix",
    path: "https://noop/",
  },
}