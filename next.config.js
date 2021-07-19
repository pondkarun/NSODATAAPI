module.exports = {
  // productionBrowserSourceMaps: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/AboutUS': { page: '/AboutUS' },
      '/Admin/Permission': { page: '/Admin/Permission' },
      '/Admin/SystemFeature': { page: '/Admin/SystemFeature' },
      '/Admin/UserGroup': { page: '/Admin/UserGroup' },
      '/Admin/Users': { page: '/Admin/Users' },
      '/dataset': { page: '/dataset' },
      '/dataset/contens': { page: '/dataset/contens' },
      '/login': { page: '/login' },
      '/login/Admin': { page: '/login/Admin' },
      '/MyDatasetList': { page: '/MyDatasetList' },
      '/PopularDataset': { page: '/PopularDataset' },
    }
  },
  images: {
    loader: "imgix",
    path: "https://noop/",
  },
  trailingSlash: true,
}
// module.exports = {
//   // productionBrowserSourceMaps: true,
//   exportPathMap: async function (
//     defaultPathMap,
//     { dev, dir, outDir, distDir, buildId }
//   ) {
//     return defaultPathMap
//   },
//   images: {
//     loader: "imgix",
//     path: "https://noop/",
//   },
//   trailingSlash: true,
// }
