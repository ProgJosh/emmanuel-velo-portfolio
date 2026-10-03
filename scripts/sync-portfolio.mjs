import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const check = args.includes('--check');
const source = resolve(args.find((arg) => !arg.startsWith('--')) ?? join(root, '..', 'Portfolio'));
const decode = (value) => value.replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"');
const plain = (value) => decode(value.replace(/<[^>]*>/g, '').trim());
const required = (value, label) => {
  if (!value) throw new Error(`Cannot sync: missing ${label}. Review the freelance HTML structure.`);
  return value;
};
const repositories = {
  "Alumni's Gallery.html": 'Alumni-s-Gallery',
  'Alder-and-Tide.html': 'Booking-System',
  'Inventory-Management-System.html': 'Inventory-Management-System',
  'properties-management-portal.html': 'Properties-Management-Portal',
  'Diwa-Habi.html': 'Diwa-Habi',
  'Vertex-Legacy.html': 'Vertex-Legacy',
};

// Import presentation facts only. Corporate case studies remain reviewed, authored content.
const html = await readFile(join(source, 'index.html'), 'utf8');
const snapshot = { projects: {}, technologyGroups: [] };
const assets = [];
for (const id of ['alumni', 'alder']) {
  const card = required(html.match(new RegExp(`<article[^>]*data-project-id="${id}"[^>]*>([\\s\\S]*?)<\\/article>`))?.[1], `${id} project card`);
  const imageTag = required(card.match(/<img\b[^>]*>/)?.[0], `${id} screenshot`);
  const image = basename(required(imageTag.match(/src="assets\/optimized\/([^"/]+)"/)?.[1], `${id} image path`));
  const liveUrl = required(card.match(/href="(https:[^"]+)"[^>]*>Live demo/)?.[1], `${id} live demo`);
  if (!liveUrl.startsWith('https://')) throw new Error('Live links must use HTTPS.');
  snapshot.projects[id] = {
    name: plain(required(card.match(/<h3>(.*?)<\/h3>/)?.[1], `${id} name`)),
    image: `/project-images/${image}`,
    imageAlt: decode(required(imageTag.match(/alt="([^"]+)"/)?.[1], `${id} image description`)),
    liveUrl: decode(liveUrl),
  };
  assets.push([join(source, 'assets', 'optimized', image), join(root, 'public', 'project-images', image)]);
}

for (const match of html.matchAll(/<div class="technology-group"[^>]*>([\s\S]*?)<\/ul>/g)) {
  const block = match[1];
  const title = plain(required(block.match(/<h3[^>]*>(.*?)<\/h3>/)?.[1], 'technology group title'));
  const description = plain(required(block.match(/<h3[^>]*>.*?<\/h3><p>(.*?)<\/p>/)?.[1], `${title} description`));
  const skills = [];
  for (const item of block.matchAll(/<a class="technology-card" href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const icon = basename(required(item[2].match(/src="assets\/tech\/([^"/]+\.svg)"/)?.[1], 'technology icon'));
    const iconSource = join(source, 'assets', 'tech', icon);
    const svg = await readFile(iconSource, 'utf8');
    if (/<script|<foreignObject|\bon\w+\s*=|(?:href|src)\s*=\s*["'](?:https?:|javascript:|\/\/)/i.test(svg)) throw new Error(`Unsafe SVG: ${icon}`);
    const repo = repositories[basename(decode(item[1]))];
    if (!repo && !item[1].startsWith('https://github.com/ProgJosh') && !item[1].startsWith('#')) {
      throw new Error(`Add a verified repository mapping before syncing ${item[1]}.`);
    }
    const sourceUrl = repo ? `https://github.com/ProgJosh/${repo}`
      : item[1].startsWith('https://github.com/') ? item[1]
        : 'https://github.com/ProgJosh/Portfolio';
    skills.push({
      name: plain(required(item[2].match(/<strong>(.*?)<\/strong>/)?.[1], 'technology name')),
      icon: `/tech/${icon}`,
      evidence: plain(required(item[2].match(/<small>(.*?)<\/small>/)?.[1], 'technology evidence')).replace(/\s*↗$/, '').replace(/^This portfolio$/, 'Freelance portfolio'),
      sourceUrl,
    });
    assets.push([iconSource, join(root, 'public', 'tech', icon)]);
  }
  if (!skills.length) throw new Error(`No technologies found for ${title}.`);
  snapshot.technologyGroups.push({ title, description, skills });
}
if (!snapshot.technologyGroups.length) throw new Error('No technology groups found.');
assets.push([join(source, 'assets', 'tech', 'LICENSE.devicon'), join(root, 'public', 'tech', 'LICENSE.devicon')]);
const output = `${JSON.stringify(snapshot, null, 2)}\n`;
const destination = join(root, 'lib', 'freelance-snapshot.json');
const existing = await readFile(destination, 'utf8').catch(() => '');
if (check) {
  if (existing !== output) throw new Error('Portfolio content is out of sync. Run npm run sync:portfolio and review the changes.');
  for (const [from, to] of assets) {
    const original = await readFile(from);
    const copied = await readFile(to).catch(() => Buffer.alloc(0));
    if (!original.equals(copied)) throw new Error(`Asset is out of sync: ${to}`);
  }
  console.log('Recent projects, technology groups, and assets match the freelance portfolio.');
} else {
  for (const [from, to] of assets) {
    await mkdir(dirname(to), { recursive: true });
    await copyFile(from, to);
  }
  if (existing !== output) await writeFile(destination, output);
  console.log(`Synced 2 recent projects, ${snapshot.technologyGroups.reduce((sum, group) => sum + group.skills.length, 0)} technologies, and ${assets.length} assets. Review case-study copy separately before publishing.`);
}
