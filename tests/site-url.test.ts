import { describe, expect, it } from 'vitest';
import { resolveSiteUrl } from '../lib/site-url';

describe('site URL normalization', () => {
  it('lowercases the host and strips the trailing slash', () => {
    expect(resolveSiteUrl('https://ProgJosh.github.io/emmanuel-velo-portfolio/')).toBe('https://progjosh.github.io/emmanuel-velo-portfolio');
    expect(resolveSiteUrl('https://Example.com')).toBe('https://example.com');
  });

  it('falls back to localhost when the value is missing or invalid', () => {
    expect(resolveSiteUrl('')).toBe('http://localhost:3000');
    expect(resolveSiteUrl('not a url')).toBe('http://localhost:3000');
    expect(resolveSiteUrl('javascript:alert(1)')).toBe('http://localhost:3000');
  });
});
