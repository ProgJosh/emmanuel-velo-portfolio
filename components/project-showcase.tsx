'use client';

import Image from 'next/image';
import { type CSSProperties, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { projects, type Project } from '@/lib/portfolio-data';

const filters = ['All', 'Commerce', 'Business systems', 'Cross-platform'] as const;
type ProjectFilter = (typeof filters)[number];

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
      {project.liveUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noreferrer">
          Live demo <ArrowUpRight aria-hidden="true" />
        </a>
      ) : (
        <span className="project-no-demo">No public web demo</span>
      )}
      <a href={project.sourceUrl} target="_blank" rel="noreferrer">
        Source <Code2 aria-hidden="true" />
      </a>
    </div>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="case-study">
      <div className="case-study-media">
        <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 720px) 100vw, 1000px" style={{ objectFit: 'cover', objectPosition: project.imagePosition }} />
      </div>
      <div className="case-study-grid">
        <section>
          <p className="case-label">Problem / objective</p>
          <p>{project.problem}</p>
        </section>
        <section>
          <p className="case-label">Target users</p>
          <p>{project.targetUsers}</p>
        </section>
        <section>
          <p className="case-label">My responsibilities</p>
          <ul>{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section>
          <p className="case-label">Technical stack</p>
          <ul className="tag-list">{project.technologies.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section>
          <p className="case-label">Important features</p>
          <ul>{project.features.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section>
          <p className="case-label">Development decisions</p>
          <ul>{project.decisions.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="case-study-wide">
          <p className="case-label">Challenge & approach</p>
          <p><strong>Challenge:</strong> {project.challenge}</p>
          <p><strong>Approach:</strong> {project.approach}</p>
        </section>
        <section className="case-study-wide">
          <p className="case-label">Testing & deployment</p>
          <p>{project.testing}</p>
        </section>
        <section>
          <p className="case-label">Outcome</p>
          <p>{project.outcome}</p>
        </section>
        <section>
          <p className="case-label">Lessons learned</p>
          <p>{project.lessons}</p>
        </section>
      </div>
    </div>
  );
}

export function ProjectShowcase() {
  const [filter, setFilter] = useState<ProjectFilter>('All');
  const [activeId, setActiveId] = useState(projects[0].id);
  const [detailProject, setDetailProject] = useState<Project | null>(null);

  const visibleProjects = useMemo(
    () => (filter === 'All' ? projects : projects.filter((project) => project.filter === filter)),
    [filter],
  );
  const activeProject = visibleProjects.find((project) => project.id === activeId) ?? visibleProjects[0];
  const activeIndex = Math.max(0, visibleProjects.findIndex((project) => project.id === activeProject.id));

  const moveSelection = (direction: number) => {
    const nextIndex = (activeIndex + direction + visibleProjects.length) % visibleProjects.length;
    setActiveId(visibleProjects[nextIndex].id);
  };

  const selectFilter = (nextFilter: ProjectFilter) => {
    const nextProjects = nextFilter === 'All' ? projects : projects.filter((project) => project.filter === nextFilter);
    setFilter(nextFilter);
    if (!nextProjects.some((project) => project.id === activeId)) setActiveId(nextProjects[0].id);
  };

  return (
    <>
      <div className="project-filter" aria-label="Filter projects">
        {filters.map((item) => (
          <Button
            key={item}
            type="button"
            variant="ghost"
            aria-pressed={filter === item}
            onClick={() => selectFilter(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="project-orbit" aria-label="Interactive project explorer">
        <div
          className="orbit-track"
          style={{ '--orbit-rotation': `${activeIndex * (360 / visibleProjects.length)}deg` } as CSSProperties}
          aria-hidden="true"
        >
          <span />
        </div>
        {visibleProjects.map((project, index) => {
          const angle = (index / visibleProjects.length) * Math.PI * 2 - Math.PI / 2;
          const position = {
            '--orbit-x': `${50 + Math.cos(angle) * 46}%`,
            '--orbit-y': `${50 + Math.sin(angle) * 46}%`,
          } as CSSProperties;
          return (
            <Button
              key={project.id}
              type="button"
              variant="ghost"
              className="orbit-selector"
              style={position}
              data-active={project.id === activeProject.id}
              aria-pressed={project.id === activeProject.id}
              onClick={() => setActiveId(project.id)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{project.name}</strong>
            </Button>
          );
        })}

        <article className="orbit-project" key={activeProject.id} aria-live="polite">
          <div className="orbit-project-media">
            <Image
              src={activeProject.image}
              alt={activeProject.imageAlt}
              fill
              sizes="620px"
              style={{ objectFit: 'cover', objectPosition: activeProject.imagePosition }}
            />
            <span className="project-status">{activeProject.status}</span>
          </div>
          <div className="orbit-project-copy">
            <p className="project-category">{activeProject.category}</p>
            <h3>{activeProject.name}</h3>
            <p>{activeProject.summary}</p>
            <p className="project-role"><strong>My role:</strong> {activeProject.role}</p>
            <ul className="tag-list">{activeProject.technologies.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="project-actions">
              <Button type="button" onClick={() => setDetailProject(activeProject)}>
                View Project Details <Maximize2 aria-hidden="true" />
              </Button>
              <ProjectLinks project={activeProject} />
            </div>
          </div>
        </article>

        <div className="orbit-controls">
          <Button type="button" variant="outline" size="icon-lg" aria-label="Previous project" onClick={() => moveSelection(-1)}><ArrowLeft aria-hidden="true" /></Button>
          <span>{String(activeIndex + 1).padStart(2, '0')} / {String(visibleProjects.length).padStart(2, '0')}</span>
          <Button type="button" variant="outline" size="icon-lg" aria-label="Next project" onClick={() => moveSelection(1)}><ArrowRight aria-hidden="true" /></Button>
        </div>
      </div>

      <div className="project-grid">
        {visibleProjects.map((project) => (
          <article className="project-card" key={project.id}>
            <div className="project-card-media">
              <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 720px) 100vw, 50vw" style={{ objectFit: 'cover', objectPosition: project.imagePosition }} />
            </div>
            <div className="project-card-copy">
              <p className="project-category">{project.category}</p>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <p className="project-role"><strong>My role:</strong> {project.role}</p>
              <ul className="tag-list">{project.technologies.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
              <Button type="button" onClick={() => setDetailProject(project)}>View case study <Maximize2 aria-hidden="true" /></Button>
              <ProjectLinks project={project} />
            </div>
          </article>
        ))}
      </div>

      <Dialog open={Boolean(detailProject)} onOpenChange={(open) => !open && setDetailProject(null)}>
        <DialogContent className="project-dialog">
          {detailProject && (
            <>
              <DialogHeader>
                <p className="project-category">{detailProject.category}</p>
                <DialogTitle>{detailProject.name}</DialogTitle>
                <DialogDescription>{detailProject.summary}</DialogDescription>
                <p className="dialog-status">{detailProject.status}</p>
              </DialogHeader>
              <ProjectDetail project={detailProject} />
              <DialogFooter className="project-dialog-footer">
                <ProjectLinks project={detailProject} />
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
