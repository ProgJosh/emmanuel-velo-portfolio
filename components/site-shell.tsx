'use client';

import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { identity, navigation } from '@/lib/portfolio-data';

export function SiteNavigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeScrollTarget = useRef<string | null>(null);
  const activeScrollTimer = useRef<number | null>(null);

  const navigateToSection = useCallback((id: string, addHistory: boolean) => {
    const section = document.getElementById(id);
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const header = document.querySelector<HTMLElement>('.site-header');
    const headerOffset = (header?.offsetHeight ?? 72) + 10;
    const top = Math.max(0, window.scrollY + section.getBoundingClientRect().top - headerOffset);
    const hash = `#${id}`;

    setActiveSection(id);
    setIsOpen(false);
    activeScrollTarget.current = id;

    if (activeScrollTimer.current) window.clearTimeout(activeScrollTimer.current);
    activeScrollTimer.current = window.setTimeout(() => {
      activeScrollTarget.current = null;
    }, reducedMotion ? 0 : 900);

    if (addHistory && window.location.hash !== hash) {
      window.history.pushState({ section: id }, '', hash);
    }

    window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, []);

  const handleNavigationClick = (event: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateToSection(id, true);
  };

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute('href');
      if (!anchor || !hash || hash === '#' || anchor.target === '_blank') return;

      const id = decodeURIComponent(hash.slice(1));
      if (!document.getElementById(id)) return;

      event.preventDefault();
      navigateToSection(id, true);
    };

    const onHistoryChange = () => {
      const id = decodeURIComponent(window.location.hash.slice(1)) || 'home';
      if (navigation.some((item) => item.id === id)) navigateToSection(id, false);
    };

    document.addEventListener('click', onDocumentClick);
    window.addEventListener('popstate', onHistoryChange);
    return () => {
      document.removeEventListener('click', onDocumentClick);
      window.removeEventListener('popstate', onHistoryChange);
      if (activeScrollTimer.current) window.clearTimeout(activeScrollTimer.current);
    };
  }, [navigateToSection]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id && !activeScrollTarget.current) setActiveSection(visible.target.id);
      },
      { rootMargin: '-24% 0px -64% 0px', threshold: [0.05, 0.2, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <header className="site-header" data-scrolled={isScrolled}>
      <a className="brand" href="#home" aria-label={`${identity.name} — home`} onClick={(event) => handleNavigationClick(event, 'home')}>
        <span className="brand-mark" aria-hidden="true">EV</span>
        <span>{identity.name}</span>
      </a>

      <nav ref={menuRef} id="primary-navigation" aria-label="Primary navigation" className="site-nav" data-open={isOpen}>
        {navigation.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={activeSection === item.id ? 'location' : undefined}
            onClick={(event) => handleNavigationClick(event, item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a className="nav-resume" href={identity.resume} download>
        <span>Download résumé</span><Download aria-hidden="true" />
      </a>

      <Button
        ref={toggleRef}
        className="menu-toggle"
        variant="ghost"
        size="icon-lg"
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </Button>
    </header>
  );
}

export function RevealController() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.classList.add('js');

    if (reduced || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return () => root.classList.remove('js');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    );
    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      root.classList.remove('js');
    };
  }, []);

  return null;
}
