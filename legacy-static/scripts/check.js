import { readFileSync, existsSync } from 'node:fs';
const html = readFileSync('public/index.html', 'utf8');
const required = [
  'Lurra Projects',
  'Landscape design and construction',
  'Lachie@lurraprojects.com.au',
  '0400810107',
  'Request a quote',
  'application/ld+json',
  '/lurra-logo-original.png',
  '/blog/'
];
const missing = required.filter((item) => !html.includes(item));
if (!existsSync('public/styles.css')) missing.push('public/styles.css');
if (!existsSync('public/lurra-logo-original.png')) missing.push('public/lurra-logo-original.png');
if (!existsSync('public/blog/index.html')) missing.push('public/blog/index.html');
if (!existsSync('public/blog/landscape-design-melbourne-guide/index.html')) missing.push('public/blog/landscape-design-melbourne-guide/index.html');
for (const post of [
  'backyard-landscaping-melbourne-premium-homes',
  'pool-landscaping-melbourne-outdoor-living',
  'retaining-walls-drainage-landscaping-melbourne',
  'premium-paving-landscaping-melbourne',
  'new-build-landscaping-melbourne-planning',
  'sloping-block-landscaping-melbourne-levels-retaining',
  'driveway-front-entry-landscaping-melbourne',
  'alfresco-landscaping-melbourne-outdoor-rooms',
  'landscape-construction-melbourne-premium-homes',
  'garden-makeover-melbourne-high-end-homes',
  'turf-and-planting-melbourne-residential-landscaping',
  'courtyard-landscaping-melbourne-small-outdoor-spaces'
]) {
  const file = `public/blog/${post}/index.html`;
  if (!existsSync(file)) missing.push(file);
  else {
    const article = readFileSync(file, 'utf8');
    for (const item of ['Lachie@lurraprojects.com.au', '0400 810 107', 'Request a quote']) {
      if (!article.includes(item)) missing.push(`${file}:${item}`);
    }
  }
}
if (missing.length) {
  console.error('Missing required content:', missing.join(', '));
  process.exit(1);
}
console.log('Lurra website checks passed.');
