import { expect, test, type Page } from '@playwright/test';

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
  await testInfo.attach('initial-console-errors', { body: JSON.stringify(errors), contentType: 'application/json' });
});

test.afterEach(async ({ page }, testInfo) => {
  const errors = consoleErrors.get(page) ?? [];
  await testInfo.attach('console-errors', { body: JSON.stringify(errors), contentType: 'application/json' });
  expect(errors).toEqual([]);
});

test('desktop navigation, project orbit, detail dialog, and metadata work', async ({ page, request }) => {
  await expect(page.locator('.site-nav a')).toHaveCount(5);
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

test('contact section offers direct, usable links', async ({ page }) => {
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Contact', exact: true }).click();
  const links = page.getByRole('navigation', { name: 'Contact links' });
  await expect(links.getByRole('link')).toHaveCount(4);
  await expect(links.getByRole('link', { name: /Email/ })).toHaveAttribute('href', 'mailto:velojoshemmanuel30@gmail.com');
  await expect(links.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', /linkedin\.com/);
  await expect(links.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', /github\.com/);
  await expect(links.getByRole('link', { name: /Facebook/ })).toHaveAttribute('href', /facebook\.com/);
  await expect(page.locator('#contact form')).toHaveCount(0);
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
