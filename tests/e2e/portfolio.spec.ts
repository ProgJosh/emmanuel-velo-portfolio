import { expect, test, type Page } from '@playwright/test';
import { aiPrinciples, aiToolGroups, identity, projects, skillGroups } from '../../lib/portfolio-data';

const consoleErrors = new WeakMap<Page, string[]>();

test.beforeEach(async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  consoleErrors.set(page, errors);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Web Developer');
  await expect(page.locator('html')).toHaveClass(/\bjs\b/);
  await testInfo.attach('initial-console-errors', { body: JSON.stringify(errors), contentType: 'application/json' });
});

test.afterEach(async ({ page }, testInfo) => {
  const errors = consoleErrors.get(page) ?? [];
  await testInfo.attach('console-errors', { body: JSON.stringify(errors), contentType: 'application/json' });
  expect(errors).toEqual([]);
});

test('desktop navigation, project orbit, detail dialog, and metadata work', async ({ page, request }) => {
  await expect(page.locator('.site-nav a')).toHaveCount(6);
  const primaryNav = page.getByRole('navigation', { name: 'Primary navigation' });
  await primaryNav.getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(primaryNav.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute('aria-current', 'location');
  await expect(page.locator('#projects')).toBeInViewport();

  await expect(page.locator('.project-orbit')).toBeVisible();
  await page.getByRole('button', { name: /NexaCart/ }).click();
  await page.getByRole('button', { name: /View Project Details/ }).click();
  await expect(page.getByRole('dialog')).toContainText('NexaCart');
  await expect(page.getByRole('dialog').getByText('Problem / objective')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();

  await page.getByRole('button', { name: 'Commerce' }).click();
  await expect(page.locator('.orbit-selector')).toHaveCount(2);

  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/favicon.svg');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/og\.png$/);
  const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
  expect(structuredData).toContain('Emmanuel Josh Velo');

  expect((await request.get('/robots.txt')).status()).toBe(200);
  expect((await request.get('/sitemap.xml')).status()).toBe(200);
  expect((await request.get('/resume/emmanuel-josh-velo-resume.pdf')).status()).toBe(200);
});

test('AI-assisted development section lists each agent with evidence and stays responsive', async ({ page }) => {
  const tools = aiToolGroups.flatMap((group) => group.tools);
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'AI Tools', exact: true }).click();
  await expect(page).toHaveURL(/#ai-tools$/);
  await expect(page.locator('#ai-tools')).toBeInViewport();
  await expect(page.getByRole('heading', { level: 2, name: /AI coding agents/ })).toBeVisible();
  await expect(page.locator('.ai-card')).toHaveCount(tools.length);
  for (const tool of tools) {
    const card = page.locator('.ai-card').filter({ has: page.getByRole('heading', { name: tool.name, exact: true }) });
    await expect(card).toHaveCount(1);
    await expect(card).toContainText(tool.usedFor);
    const evidence = card.locator('.ai-evidence a');
    if (tool.evidenceUrl) {
      await expect(evidence).toHaveAttribute('href', tool.evidenceUrl);
      await expect(evidence).toHaveAttribute('target', '_blank');
      await expect(evidence).toHaveAttribute('rel', /noopener/);
    } else {
      await expect(evidence).toHaveCount(0);
      await expect(card.locator('.ai-evidence')).toContainText(tool.evidence);
    }
  }
  await expect(page.locator('.ai-principles li')).toHaveCount(aiPrinciples.length);
  for (const width of [1280, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  }
});

test('AI skill tags in the skills section jump to the AI tools section', async ({ page }) => {
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await expect(page.locator('.skill-group')).toHaveCount(skillGroups.length);
  const group = page.locator('.skill-group').filter({ has: page.getByRole('heading', { name: 'AI-assisted development', exact: true }) });
  await expect(group.locator('a.practice-link')).toHaveCount(skillGroups.find((entry) => entry.title === 'AI-assisted development')!.skills.length);
  await group.getByRole('link', { name: /^Claude Code/ }).click();
  await expect(page).toHaveURL(/#ai-tools$/);
  await expect(page.locator('#ai-tools')).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

test('contact section offers direct, usable links', async ({ page }) => {
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Contact', exact: true }).click();
  const links = page.getByRole('navigation', { name: 'Contact links' });
  await expect(links.getByRole('link')).toHaveCount(identity.instagram ? 8 : 7);
  await expect(links.getByRole('link', { name: /Email/ })).toHaveAttribute('href', 'mailto:velojoshemmanuel30@gmail.com');
  const scheduleLink = links.getByRole('link', { name: /Schedule a call/ });
  await expect(scheduleLink).toHaveAttribute('href', identity.calendly);
  await expect(scheduleLink).toHaveAttribute('target', '_blank');
  await expect(scheduleLink).toHaveAttribute('rel', /noopener/);
  await expect(scheduleLink).toHaveAttribute('aria-haspopup', 'dialog');
  await expect(links.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', /linkedin\.com/);
  await expect(links.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', /github\.com/);
  await expect(links.getByRole('link', { name: /Facebook/ })).toHaveAttribute('href', /facebook\.com/);
  await expect(links.getByRole('link', { name: /WhatsApp/ })).toHaveAttribute('href', identity.whatsapp);
  await expect(links.getByRole('link', { name: /Viber/ })).toHaveAttribute('href', identity.viber);
  await links.getByRole('link', { name: /Facebook/ }).focus();
  for (const name of ['WhatsApp', 'Viber']) {
    const link = links.getByRole('link', { name: new RegExp(name) });
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
    await page.keyboard.press('Tab');
    await expect(link).toBeFocused();
    await expect(link).toHaveCSS('outline-style', 'solid');
  }
  if (identity.instagram) await expect(links.getByRole('link', { name: /Instagram/ })).toHaveAttribute('href', identity.instagram);
  else await expect(links.getByRole('link', { name: /Instagram/ })).toHaveCount(0);
  await expect(page.locator('#contact form')).toHaveCount(0);
});

test('Calendly links open the scheduling popup and fall back to a new tab', async ({ page, context }) => {
  const heroLink = page.locator('.hero-links').getByRole('link', { name: /Book a call/ });
  const footerLink = page.locator('.footer').getByRole('link', { name: /Book a call/ });
  for (const link of [heroLink, footerLink]) {
    await expect(link).toHaveAttribute('href', identity.calendly);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
  }

  // The third-party widget stays unloaded until a visitor shows interest.
  expect(await page.locator('script[src*="calendly"]').count()).toBe(0);

  await page.route('https://assets.calendly.com/**', (route) => route.request().url().endsWith('.js')
    ? route.fulfill({ contentType: 'application/javascript', body: 'window.Calendly = { initPopupWidget: (options) => { document.body.dataset.calendlyUrl = options.url; } };' })
    : route.fulfill({ contentType: 'text/css', body: '' }));
  await heroLink.click();
  await expect(page.locator('body')).toHaveAttribute('data-calendly-url', identity.calendly);
  await expect(page).toHaveURL(/\/$/);
  expect(await page.locator('script[src*="calendly"]').count()).toBe(1);

  // If the widget cannot load, the same click opens Calendly in a new tab instead.
  await page.unroute('https://assets.calendly.com/**');
  await page.route('https://assets.calendly.com/**', (route) => route.abort());
  await page.route('https://calendly.com/**', (route) => route.fulfill({ contentType: 'text/html', body: '<title>Calendly</title>' }));
  await page.reload();
  await page.waitForLoadState('networkidle');
  const newTab = context.waitForEvent('page');
  await page.locator('.hero-links').getByRole('link', { name: /Book a call/ }).click();
  expect((await newTab).url()).toContain('calendly.com/progjosh');
  // The blocked widget request is the failure under test, so its console error is expected.
  consoleErrors.get(page)?.splice(0);
});

test('recent project case studies and technology logos are usable on desktop and mobile', async ({ page, request }) => {
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(page.locator('.orbit-selector')).toHaveCount(projects.length);
  for (const width of [1150, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overlap = await page.locator('.project-orbit').evaluate((orbit) => {
      const card = orbit.querySelector('.orbit-project')!.getBoundingClientRect();
      return [...orbit.querySelectorAll('.orbit-selector')].some((selector) => {
        const box = selector.getBoundingClientRect();
        return box.left < card.right && box.right > card.left && box.top < card.bottom && box.bottom > card.top;
      });
    });
    expect(overlap).toBe(false);
  }
  for (const name of ['Alumni Gallery', 'Alder & Tide']) {
    await page.locator('.orbit-selector').filter({ hasText: name }).click();
    await expect(page.locator('.orbit-project h3')).toHaveText(name);
    await page.getByRole('button', { name: 'View Project Details' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name, exact: true })).toBeVisible();
    await expect(dialog).toContainText('fictional');
    await expect(dialog.getByRole('link', { name: 'Source' })).toHaveAttribute('href', /github\.com\/ProgJosh/);
    await page.getByRole('button', { name: 'Close' }).click();
  }
  const technologyLinks = page.locator('.technology-link');
  await expect(technologyLinks).toHaveCount(skillGroups.flatMap((group) => group.skills).filter((skill) => skill.icon).length);
  for (const name of ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'PHP', 'Next.js', 'NestJS', 'PostgreSQL', 'Prisma']) {
    const link = technologyLinks.filter({ has: page.getByText(name, { exact: true }) });
    const src = await link.locator('img').getAttribute('src');
    expect(src).toMatch(/\/tech\/.*\.svg$/);
    expect((await request.get(src!)).status()).toBe(200);
  }
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await technologyLinks.first().focus();
  await expect(technologyLinks.first()).toBeFocused();
  await expect(page.locator('.skill-group').first()).toHaveCSS('opacity', '1');
  await page.locator('.skill-group').first().screenshot({ path: 'test-results/skills-desktop.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  const alumniCard = page.locator('.project-card').filter({ has: page.getByRole('heading', { name: 'Alumni Gallery', exact: true }) });
  await alumniCard.getByRole('button', { name: 'View Project Details', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('Alumni Gallery');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await expect(technologyLinks.first()).toBeVisible();
  await page.locator('.skill-group').first().scrollIntoViewIfNeeded();
  await expect(page.locator('.skill-group').first()).toHaveCSS('opacity', '1');
  await page.locator('.skill-group').first().screenshot({ path: 'test-results/skills-mobile.png' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

test('project-detail buttons match across desktop and mobile', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('.orbit-selector').filter({ hasText: 'InvenTrack' }).click();
  const desktopButton = page.locator('.orbit-project .project-detail-button');
  await expect(desktopButton).toHaveText('View Project Details');
  await expect(desktopButton).toHaveAttribute('aria-haspopup', 'dialog');
  const buttonStyle = (element: Element) => {
    const style = getComputedStyle(element);
    return { height: style.height, radius: style.borderRadius, fontSize: style.fontSize, padding: style.padding, background: style.backgroundColor, color: style.color };
  };
  await page.mouse.move(0, 0);
  const desktopStyle = await desktopButton.evaluate(buttonStyle);
  await desktopButton.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'InvenTrack', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);

  for (const width of [768, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    const card = page.locator('.project-card').filter({ has: page.getByRole('heading', { name: 'InvenTrack', exact: true }) });
    const mobileButton = card.getByRole('button', { name: 'View Project Details', exact: true });
    await expect(mobileButton).toHaveClass(/project-detail-button/);
    await expect(mobileButton.locator('svg')).toHaveCount(1);
    await mobileButton.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    expect(await mobileButton.evaluate(buttonStyle)).toEqual(desktopStyle);
    await mobileButton.click();
    await expect(page.getByRole('dialog').getByRole('heading', { name: 'InvenTrack', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Close', exact: true }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  }
  await expect(page.getByRole('button', { name: 'View case study' })).toHaveCount(0);
});

test('mobile navigation and responsive project fallback remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await expect(page.locator('#primary-navigation')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close navigation menu' })).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Skills', exact: true }).click();
  await expect(page).toHaveURL(/#skills$/);
  await expect(page.locator('#primary-navigation')).toBeHidden();
  await expect(page.locator('#primary-navigation a[href="#skills"]')).toHaveAttribute('aria-current', 'location');
  await expect(page.locator('#skills')).toBeInViewport();
  await expect(page.locator('.project-orbit')).toBeHidden();
  await expect(page.locator('.project-grid')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('navigation clicks preserve browser history and restore the previous section', async ({ page }) => {
  const primaryNav = page.getByRole('navigation', { name: 'Primary navigation' });
  await primaryNav.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/#about$/);
  await primaryNav.getByRole('link', { name: 'Skills', exact: true }).click();
  await expect(page).toHaveURL(/#skills$/);

  await page.goBack();
  await expect(page).toHaveURL(/#about$/);
  await expect(primaryNav.getByRole('link', { name: 'About', exact: true })).toHaveAttribute('aria-current', 'location');
  await expect(page.locator('#about')).toBeInViewport();
});

test('reduced-motion preference disables meaningful transition duration', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  const duration = await page.locator('.orbit-project').evaluate((element) => getComputedStyle(element).animationDuration);
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.00001);
});
