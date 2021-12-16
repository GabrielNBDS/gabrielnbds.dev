module.exports = {
  siteUrl: 'https://gabrielnbds.dev',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://example.com/server-sitemap.xml', // <==== Add here
    ],
  },
}
