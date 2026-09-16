import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Mail,
} from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { PortfolioErrorBoundary } from '@/components/portfolio-error-boundary';
import { ProjectShowcase } from '@/components/project-showcase';
import { RevealController, SiteNavigation } from '@/components/site-shell';
import { identity, navigation, skillGroups } from '@/lib/portfolio-data';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteNavigation />
      <RevealController />

      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">{identity.name} · {identity.location}</p>
            <h1 id="hero-title"><span>Web Developer</span> building products for <em>real work.</em></h1>
            <p className="hero-intro">I design and develop reliable digital products that combine thoughtful user experience, maintainable code, and practical business functionality.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View my work <ArrowDownRight aria-hidden="true" /></a>
              <a className="button button-secondary" href="#contact">Contact me <Mail aria-hidden="true" /></a>
            </div>
            <div className="hero-links" aria-label="Professional links">
              <a href={identity.resume} download>Download résumé <ArrowDownRight aria-hidden="true" /></a>
              <a href={identity.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight aria-hidden="true" /></a>
              <a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>

          <div className="hero-system" data-reveal aria-label="Emmanuel’s software-development capabilities">
            <div className="system-topbar">
              <span className="system-title"><Code2 aria-hidden="true" /> Product build / 2026</span>
            </div>
            <div className="system-canvas">
              <div className="system-metric system-metric-main">
                <span>01 / INTERFACE</span>
                <strong>Responsive web platforms</strong>
                <p>Clear user journeys, accessible controls, and layouts that hold together from mobile to desktop.</p>
              </div>
              <div className="system-grid">
                <div className="system-metric"><span>02 / LOGIC</span><strong>Business systems</strong><p>Bookings, inventory, rental, and commerce workflows with explicit rules.</p></div>
                <div className="system-metric system-accent"><span>03 / DELIVERY</span><strong>Cross-platform</strong><p>Practical delivery for web, desktop, and mobile when requirements support it.</p></div>
              </div>
            </div>
            <div className="system-footer">
              <span><i /> React · TypeScript</span>
              <span>Laravel · PHP · MySQL</span>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="section-header" data-reveal>
            <div><p className="eyebrow">01 / About</p><h2 id="about-title">I turn real workflows into clear digital systems.</h2></div>
            <p>My work sits between interface design and application logic: understanding what people need to do, then building the screens, rules, and feedback that help them do it reliably.</p>
          </div>
          <div className="about-layout">
            <div className="about-copy" data-reveal>
              <p className="large-copy">I build responsive websites, management systems, and cross-platform products with close attention to usability, maintainability, and the business requirements behind each feature.</p>
              <p>I prefer practical decisions over unnecessary complexity. That means structuring reusable components, keeping domain rules out of presentation code, designing honest loading and error states, and documenting the limits of demo integrations.</p>
              <p>I’m comfortable moving between frontend implementation, server-side Laravel work, data modeling, testing, and deployment preparation. I also keep learning—especially where a project exposes a better pattern, a clearer workflow, or a new platform constraint.</p>
            </div>
            <dl className="profile-summary" data-reveal>
              <div><dt>Location</dt><dd>{identity.location}</dd></div>
              <div><dt>Primary role</dt><dd>{identity.role}</dd></div>
              <div><dt>Availability</dt><dd>{identity.availability}</dd></div>
              <div><dt>Main stack</dt><dd>React, TypeScript, Laravel, PHP, MySQL, Tailwind CSS</dd></div>
              <div><dt>Working focus</dt><dd>Responsive interfaces, business workflows, and maintainable application logic</dd></div>
            </dl>
          </div>
        </section>

        <section className="section projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-header" data-reveal>
            <div><p className="eyebrow">02 / Selected work</p><h2 id="projects-title">Projects designed around the work people need to complete.</h2></div>
            <p>Explore the interactive orbit or filter the collection. Each case study separates working demo behavior from production integrations that still require a backend or external service.</p>
          </div>
          <div data-reveal>
            <PortfolioErrorBoundary><ProjectShowcase /></PortfolioErrorBoundary>
          </div>
        </section>

        <section className="section skills-section" id="skills" aria-labelledby="skills-title">
          <div className="section-header" data-reveal>
            <div><p className="eyebrow">03 / Technical skills</p><h2 id="skills-title">A stack grounded in shipped project work.</h2></div>
            <p>No percentage bars or inflated labels—just the tools and practices demonstrated in the repositories, build files, tests, and completed project workflows.</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article className="skill-group" key={group.title} data-reveal>
                <span className="skill-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul className="tag-list">{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                <small>{group.evidence}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-layout">
            <div className="contact-copy" data-reveal>
              <p className="eyebrow">04 / Contact</p>
              <h2 id="contact-title">Let’s connect.</h2>
              <p>If you’re hiring for a web development or software engineering role, share the position, team, and next steps. I also welcome thoughtful conversations about technology and collaboration.</p>
              <div className="contact-direct">
                <a href={`mailto:${identity.email}`}><Mail aria-hidden="true" /><span>Email<strong>{identity.email}</strong></span></a>
                <a href={identity.facebook} target="_blank" rel="noreferrer"><BriefcaseBusiness aria-hidden="true" /><span>Professional profile<strong>Facebook</strong></span></a>
                <a href={identity.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness aria-hidden="true" /><span>Professional profile<strong>LinkedIn</strong></span></a>
                <a href={identity.github} target="_blank" rel="noreferrer"><Code2 aria-hidden="true" /><span>Public repositories<strong>GitHub</strong></span></a>
              </div>
            </div>
            <div data-reveal><ContactForm /></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-lead">
          <p>{identity.name}</p>
          <h2>Building reliable products for people and businesses.</h2>
          <p>{identity.extendedRole} · {identity.location}</p>
        </div>
        <div className="footer-grid">
          <div><span>Contact</span><a href={`mailto:${identity.email}`}>{identity.email}</a><a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={identity.github} target="_blank" rel="noreferrer">GitHub ↗</a></div>
          <nav aria-label="Footer navigation"><span>Navigate</span>{navigation.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav>
          <div><span>Documents</span><a href={identity.resume} download>Download résumé</a><a href="#home">Back to top ↑</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {identity.name}</span><span>Designed and developed with care in the Philippines.</span></div>
      </footer>
    </>
  );
}
