import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { identity, navigation, projects, publicAsset, skillGroups } from '../lib/portfolio-data';

describe('portfolio data integrity', () => {
  it('uses unique navigation and project identifiers', () => {
    expect(new Set(navigation.map((item) => item.id)).size).toBe(navigation.length);
    expect(new Set(projects.map((project) => project.id)).size).toBe(projects.length);
  });

  it('keeps project media and public links valid', () => {
    for (const project of projects) {
      expect(project.sourceUrl).toMatch(/^https:\/\/github\.com\/ProgJosh\//);
      if (project.liveUrl) expect(project.liveUrl).toMatch(/^https:\/\//);
      expect(existsSync(join(process.cwd(), 'public', project.image.replace(publicAsset('/'), '')))).toBe(true);
      expect(project.technologies.length).toBeGreaterThan(2);
    }
  });

  it('keeps verified identity links fully configured', () => {
    expect(identity.email).toMatch(/@/);
    expect(identity.github).toMatch(/^https:\/\/github\.com\//);
    expect(identity.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
    expect(identity.whatsapp).toMatch(/^https:\/\/wa\.me\/\d+$/);
    expect(identity.viber).toMatch(/^https:\/\/viber\.me\/\d+$/);
    expect(identity.whatsapp.split('/').at(-1)).toBe(identity.viber.split('/').at(-1));
    if (identity.instagram) expect(identity.instagram).toMatch(/^https:\/\/(?:www\.)?instagram\.com\/[^/]+\/?$/);
    expect(existsSync(join(process.cwd(), 'public', identity.resume.replace(publicAsset('/'), '')))).toBe(true);
  });

  it('includes the current alumni and travel projects instead of the retired booking presentation', () => {
    expect(projects.some((project) => project.id === 'alumni-gallery')).toBe(true);
    expect(projects.some((project) => project.id === 'alder-tide')).toBe(true);
    expect(projects.some((project) => project.id === 'booksync')).toBe(false);
    for (const id of ['alumni-gallery', 'alder-tide']) {
      const project = projects.find((entry) => entry.id === id)!;
      expect(project.status).toMatch(/fictional/);
      expect(project.technologies).toContain('TypeScript');
      expect(project.image).toMatch(/\.webp$/);
    }
  });

  it('uses local technology logos with readable labels and project evidence', () => {
    const skills = skillGroups.flatMap((group) => group.skills);
    for (const skill of skills.filter((item) => item.icon)) {
      expect(skill.name.length).toBeGreaterThan(1);
      expect(skill.sourceUrl).toMatch(/^https:\/\/github\.com\/ProgJosh/);
      expect(skill.evidence).toBeTruthy();
      expect(existsSync(join(process.cwd(), 'public', skill.icon!))).toBe(true);
    }
    for (const name of ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'PHP', 'Next.js', 'NestJS', 'PostgreSQL', 'Prisma']) {
      expect(skills.find((skill) => skill.name === name)?.icon).toMatch(/\.svg$/);
    }
  });
});
