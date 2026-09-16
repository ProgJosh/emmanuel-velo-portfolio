import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { identity, navigation, projects } from '../lib/portfolio-data';

describe('portfolio data integrity', () => {
  it('uses unique navigation and project identifiers', () => {
    expect(new Set(navigation.map((item) => item.id)).size).toBe(navigation.length);
    expect(new Set(projects.map((project) => project.id)).size).toBe(projects.length);
  });

  it('keeps project media and public links valid', () => {
    for (const project of projects) {
      expect(project.sourceUrl).toMatch(/^https:\/\/github\.com\/ProgJosh\//);
      if (project.liveUrl) expect(project.liveUrl).toMatch(/^https:\/\//);
      expect(existsSync(join(process.cwd(), 'public', project.image))).toBe(true);
      expect(project.technologies.length).toBeGreaterThan(2);
    }
  });

  it('keeps verified identity links fully configured', () => {
    expect(identity.email).toMatch(/@/);
    expect(identity.github).toMatch(/^https:\/\/github\.com\//);
    expect(identity.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
    expect(existsSync(join(process.cwd(), 'public', identity.resume))).toBe(true);
  });
});
