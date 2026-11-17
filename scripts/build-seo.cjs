const { existsSync, writeFileSync } = require("node:fs");
const { run } = require("react-snap");
const { origin, pages } = require("../src/assets/seo.json");
const { reactSnap } = require("../package.json");

async function buildSEO() {
  const paths = pages.map(page => page.path);
  const macChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  await run({
    ...reactSnap,
    include: paths,
    crawl: false,
    puppeteerExecutablePath: process.env.PUPPETEER_EXECUTABLE_PATH || (existsSync(macChrome) ? macChrome : undefined)
  });
  const urls = paths.map(path => `  <url><loc>${origin}${path}</loc></url>`);
  writeFileSync("dist/sitemap.xml", [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls, '</urlset>', ''
  ].join("\n"));
  writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
}
buildSEO().catch(error => { console.error(error); process.exitCode = 1; });
