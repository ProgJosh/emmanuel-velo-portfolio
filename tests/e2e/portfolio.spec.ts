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
  await page.getByRole('button', { name: /View case study/ }).first().click();
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

test('contact form shows useful validation and prepares a real email handoff', async ({ page }) => {
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Contact', exact: true }).click();
  await page.getByRole('button', { name: 'Prepare email message' }).click();
  await expect(page.getByText('Full name must be at least 2 characters.')).toBeVisible();
  await expect(page.getByText('Enter a valid email address.')).toBeVisible();
  await expect(page.getByText('Consent is required before preparing the message.')).toBeVisible();

  await page.getByLabel('Full name').fill('Alex Recruiter');
  await page.getByLabel('Email address').fill('alex@example.com');
  await page.getByLabel('Message type').selectOption('Employment Opportunity');
  await page.getByRole('textbox', { name: 'Message' }).fill('We are hiring a web developer to improve and maintain a responsive business application.');
  await page.getByLabel('Preferred contact method').selectOption('Email');
  await page.getByRole('checkbox', { name: /I consent/ }).check();

  await page.getByRole('button', { name: 'Prepare email message' }).click();
  await expect(page.getByText(/nothing has been sent automatically/i)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Copy message' })).toBeVisible();
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
