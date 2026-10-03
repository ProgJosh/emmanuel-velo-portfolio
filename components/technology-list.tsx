import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { publicAsset, type Skill } from '@/lib/portfolio-data';

export function TechnologyList({ skills }: { skills: Skill[] }) {
  return (
    <ul className="technology-list">
      {skills.map((skill) => (
        <li key={skill.name}>
          {skill.sourceUrl ? (
            <a className="technology-link" href={skill.sourceUrl} target="_blank" rel="noopener noreferrer">
              {skill.icon && <span className="technology-icon"><Image src={publicAsset(skill.icon)} alt="" width={32} height={32} loading="lazy" /></span>}
              <span className="technology-copy"><strong>{skill.name}</strong><small>{skill.evidence}</small></span>
              <ArrowUpRight aria-hidden="true" />
              <span className="sr-only"> (project source, opens in a new tab)</span>
            </a>
          ) : <span className="practice-tag">{skill.name}</span>}
        </li>
      ))}
    </ul>
  );
}
