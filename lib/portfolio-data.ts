import freelanceSnapshot from './freelance-snapshot.json' with { type: 'json' };

export type Project = {
  id: string;
  name: string;
  category: string;
  filter: 'Commerce' | 'Business systems' | 'Cross-platform';
  summary: string;
  problem: string;
  role: string;
  technologies: string[];
  features: string[];
  challenge: string;
  approach: string;
  status: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  liveUrl?: string;
  sourceUrl: string;
  // Shown instead of "Source" when the public repository is not the shipped product.
  sourceLabel?: string;
  targetUsers: string;
  responsibilities: string[];
  decisions: string[];
  testing: string;
  outcome: string;
  lessons: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: Skill[];
  evidence: string;
};

export type Skill = {
  name: string;
  icon?: string;
  evidence?: string;
  sourceUrl?: string;
  // In-page section id, for skills that point to a section instead of an external source.
  anchor?: string;
};

export type AiTool = {
  id: 'claude-code' | 'github-copilot' | 'openai-sites' | 'amazon-q' | 'openai-codex' | 'opencode' | 'kilo-code';
  name: string;
  maker: string;
  kind: string;
  usedFor: string;
  projects: string[];
  evidence: string;
  evidenceUrl?: string;
  // Shown in the Skills section summary. Set only for tools I use hands-on.
  inSkills?: boolean;
};

export type AiToolGroup = {
  id: 'projects' | 'upskilling';
  title: string;
  description: string;
  tools: AiTool[];
};

export type AiPrinciple = {
  title: string;
  description: string;
};

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') ?? '';
export const publicAsset = (path: string) => `${configuredBasePath}${path}`;

export const identity = {
  name: 'Emmanuel Josh Velo',
  role: 'Web Developer',
  extendedRole: 'Web Developer',
  location: 'Lubao, Philippines',
  availability: 'Open to Web Developer opportunities',
  email: 'veloemmanueljosh15@gmail.com',
  github: 'https://github.com/ProgJosh',
  linkedin: 'https://www.linkedin.com/in/emmanuel-josh-velo',
  calendly: 'https://calendly.com/progjosh',
  facebook: 'https://www.facebook.com/heyiamjosh',
  whatsapp: 'https://wa.me/639752162057',
  viber: 'https://viber.me/639752162057',
  // Add the verified profile URL to enable Instagram without displaying a dead link.
  instagram: null as string | null,
  resume: publicAsset('/resume/emmanuel-josh-velo-resume.pdf'),
} as const;

export const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'ai-tools', label: 'AI Tools' },
  { id: 'contact', label: 'Contact' },
] as const;

export const projects: Project[] = [
  {
    id: 'bakesmart2d',
    name: 'BakeSmart 2D',
    category: 'Educational story game · Windows & Android',
    filter: 'Cross-platform',
    summary: 'An educational story game built in Unity that turns a bread-making module into seven weekly chapters, hands-on mini-games, and a real-time oven bake, for Windows and Android.',
    problem: 'Help students practise a bread-making module on shared laptops and Android phones, with feedback that explains every mistake instead of only marking it.',
    role: 'Game development in Unity: story system, mini-games, oven simulation, scoring, and Windows and Android delivery',
    technologies: ['Unity 6', 'C#', 'URP 2D', 'TextMeshPro', 'ScriptableObjects', 'Android', 'NSIS installer'],
    features: ['Story mode: seven weekly chapters and a finale', 'Sort, measure, order, and quiz mini-games', 'Real-time oven baking simulation', 'Scores, stars, badges, and three difficulty levels', 'Free Bake with 17 replayable mini-games'],
    challenge: 'Seven curriculum lessons and a finale had to fit a short delivery window and run well on shared Windows laptops and on Android phones with different screen shapes.',
    approach: 'I built four data-driven mini-game templates once, kept story and round content in ScriptableObject assets, generated scenes with an editor builder, and added one-click Android, Windows, and installer builds.',
    status: 'Completed v1.0 for the client · Windows and Android, plus a playable web demo',
    image: publicAsset('/project-images/bakesmart2d-oven.webp'),
    imageAlt: 'BakeSmart 2D oven mini-game with a tray of golden pandesal, temperature controls, and a recipe card checklist',
    liveUrl: 'https://joshvelo.vercel.app/play/bakesmart/',
    sourceUrl: 'https://github.com/ProgJosh/BakeSmart2D',
    sourceLabel: 'Prototype source',
    targetUsers: 'Students learning bread-making on shared laptops and Android phones',
    responsibilities: ['Built the story system: dialogue, choices, characters, and chapter flow', 'Created sort, measure, order, and quiz templates plus the oven simulation', 'Implemented scoring, stars, badges, difficulty levels, and Free Bake replay', 'Automated scene generation and Windows, installer, and Android builds'],
    decisions: ['Kept lesson content in data assets so new weeks needed no new code', 'Explained every wrong answer with a short reason', 'Used original background music instead of copyrighted recordings', 'Added a progress reset for shared classroom computers'],
    testing: 'Updates were compiled and checked in Unity, then play-tested on a Windows laptop and an Android phone. The oven bake and the finale were played through end to end before v1.0.',
    outcome: 'A complete v1.0 game with seven chapters, a finale, and 17 replayable mini-games, delivered as a Windows installer and an Android app, with a public web demo that leaves out the client’s name. It grew from a Phaser prototype that passed the client’s thesis defense.',
    lessons: 'Building reusable templates first turned seven lessons into content work, which made a short delivery schedule manageable.',
  },
  {
    id: 'alumni-gallery',
    name: freelanceSnapshot.projects.alumni.name,
    category: 'Alumni directory & digital yearbooks',
    filter: 'Business systems',
    summary: 'A searchable alumni community demo connecting yearbooks, profiles, memories, and school-led review in a responsive interface.',
    problem: 'Help people find classmates and share memories while keeping profile verification, content visibility, and moderation understandable.',
    role: 'Responsive frontend, directory and yearbook flows, TypeScript API, validation, and moderation workflows',
    technologies: ['React', 'TypeScript', 'Vite', 'Bootstrap', 'Hono', 'Zod', 'PostgreSQL'],
    features: ['Searchable directory with filters and grid/list views', 'Yearbooks, profiles, and memories', 'Registration and profile submissions', 'Role-based moderation and review queues', 'Audience controls and content status feedback'],
    challenge: 'Keeping public discovery simple while making ownership, approval, and audience rules explicit for contributors and moderators.',
    approach: 'I separated reusable React views from a Hono API, validated inputs with Zod, and implemented review states and role checks in the application layer.',
    status: 'Working fictional demo · production database, uploads, and email require configuration',
    image: publicAsset(freelanceSnapshot.projects.alumni.image),
    imageAlt: freelanceSnapshot.projects.alumni.imageAlt,
    imagePosition: 'center top',
    liveUrl: freelanceSnapshot.projects.alumni.liveUrl,
    sourceUrl: 'https://github.com/ProgJosh/Alumni-s-Gallery',
    targetUsers: 'Alumni exploring their community and school staff reviewing contributed content',
    responsibilities: ['Built directory, yearbook, profile, and memories screens', 'Implemented registration and contribution flows', 'Created API validation, ownership checks, and moderation states', 'Prepared PostgreSQL migrations and documented production setup'],
    decisions: ['Labeled fictional people and stories as sample content', 'Kept the demo store separate from production PostgreSQL', 'Designed private upload and audience-aware access boundaries', 'Kept email delivery and recovery limitations documented'],
    testing: 'The repository includes Vitest API tests and a Chrome browser-check script. TypeScript and Vite validate the build. Cloudflare hosts the fictional demo; PostgreSQL, Hyperdrive, and private R2 integration still require production configuration and verification.',
    outcome: 'A working community-gallery demonstration with clear browsing and contribution flows, without presenting fictional identities or unverified production integrations as a real school deployment.',
    lessons: 'Community interfaces need clear content ownership and review feedback alongside straightforward search and navigation.',
  },
  {
    id: 'nexacart',
    name: 'NexaCart',
    category: 'E-commerce marketplace & administration',
    filter: 'Commerce',
    summary: 'A responsive Philippine marketplace experience with connected storefront, checkout, customer, and commerce-administration workflows.',
    problem: 'Bring product discovery, purchasing flows, inventory controls, and marketplace administration into one coherent demonstration product.',
    role: 'Product design, frontend architecture, typed application logic, and testing',
    technologies: ['React 19', 'TypeScript', 'Vinext', 'Tailwind CSS 4', 'shadcn', 'Recharts'],
    features: ['Catalog search and filtering', 'Persistent cart and wishlist', 'Validated checkout', 'Customer and admin roles', 'Orders, inventory, promotions, and reports'],
    challenge: 'Keeping cart, stock, product, order, and admin behavior consistent across a large set of connected screens while the app runs without production credentials.',
    approach: 'I separated typed commerce rules behind a service boundary, versioned browser persistence, and covered destructive and out-of-stock states explicitly.',
    status: 'Complete interactive portfolio demo · mock authentication and payment',
    image: publicAsset('/project-images/nexacart.jpg'),
    imageAlt: 'NexaCart marketplace homepage with category navigation, featured deals, and product listings',
    liveUrl: 'https://nexacart.joshua27emmanuel30.workers.dev/',
    sourceUrl: 'https://github.com/ProgJosh/NexaCart',
    targetUsers: 'Online shoppers and commerce administrators',
    responsibilities: ['Designed the storefront and admin experience', 'Implemented typed catalog, cart, checkout, and order behavior', 'Built responsive states and administrative reporting', 'Documented backend and payment integration boundaries'],
    decisions: ['Kept demo data local and clearly labeled', 'Protected cart actions against archived or low-stock products', 'Used a shared Philippine-peso formatter across storefront and reports'],
    testing: 'Automated Node tests cover search, navigation, product details, persistence, checkout validation, roles, orders, and inventory behavior. The production build targets a Cloudflare Worker-compatible output.',
    outcome: 'A complete demonstration of the marketplace lifecycle from browsing through administration, without representing mock authentication or card processing as production-ready.',
    lessons: 'Large product surfaces stay maintainable when domain rules and integration seams are explicit instead of being embedded inside page components.',
  },
  {
    id: 'alder-tide',
    name: freelanceSnapshot.projects.alder.name,
    category: 'Stay booking & reservation management',
    filter: 'Business systems',
    summary: 'A Philippine stay-booking demo guiding guests from destination search to room selection, with role-aware reservation management behind the public experience.',
    problem: 'Keep property discovery, nightly availability, guest requests, and reservation changes consistent without presenting sample stays as real inventory.',
    role: 'Frontend experience, reservation rules, role workflows, browser persistence, and tests',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zod', 'Vitest', 'Playwright'],
    features: ['Destination, date, and guest search', 'Amenity filters and property galleries', 'Room selection and guest account flow', 'Nightly inventory and reservation management', 'Role-scoped management and CSV reports'],
    challenge: 'Reservations span multiple nights and must respect room capacity, closure dates, permissions, and competing booking attempts.',
    approach: 'I modeled occupied nights as half-open date ranges, validated inventory in the domain layer, serialized local writes, and kept reservation snapshots for reliable history.',
    status: 'Working local-first demo · fictional properties, no real reservations or payments',
    image: publicAsset(freelanceSnapshot.projects.alder.image),
    imageAlt: freelanceSnapshot.projects.alder.imageAlt,
    imagePosition: 'center top',
    liveUrl: freelanceSnapshot.projects.alder.liveUrl,
    sourceUrl: 'https://github.com/ProgJosh/Booking-System',
    targetUsers: 'Guests comparing stays, property managers, and reservation staff',
    responsibilities: ['Built search, listing, property, and account screens', 'Implemented capacity, nightly inventory, and rescheduling rules', 'Created guest and management workflows with scoped permissions', 'Maintained domain and browser regression tests'],
    decisions: ['Retained legacy appointment data during the travel redesign', 'Kept cancellations and rescheduling traceable', 'Saved payment preferences without collecting money', 'Kept queued notifications separate from real delivery'],
    testing: 'Vitest covers travel inventory and reservation rules alongside retained appointment regression tests. Playwright covers Chrome workflows and responsive layouts. A strict TypeScript/Vite build produces Cloudflare static assets; shared backend inventory, secure authentication, and notification delivery remain integration work.',
    outcome: 'A coherent stay-discovery and reservation demonstration that replaces the earlier BookSync presentation while preserving its underlying data and regression coverage.',
    lessons: 'A redesign should improve the user journey without losing existing data or weakening the domain rules behind it.',
  },
  {
    id: 'inventrack',
    name: 'InvenTrack',
    category: 'Inventory & operations management',
    filter: 'Business systems',
    summary: 'A local-first inventory workspace for small and medium teams that need traceable stock movement and clearer operational reporting.',
    problem: 'Keep product, supplier, category, and stock records consistent while preventing invalid inventory movements.',
    role: 'Interface design, typed domain models, stock rules, reports, exports, and tests',
    technologies: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS 3', 'React Router', 'Vitest'],
    features: ['Role-aware workspace', 'Product and supplier management', 'Stock-in and stock-out controls', 'Low-stock alerts', 'Reports, CSV export, and audit trail'],
    challenge: 'Inventory changes needed guardrails for duplicate SKUs, negative stock, permissions, and traceability across several operational views.',
    approach: 'All mutations pass through a replaceable InventoryService, keeping business rules separate from React screens and browser persistence.',
    status: 'Complete local-first portfolio demo · production backend required for real data',
    image: publicAsset('/project-images/inventrack.jpg'),
    imageAlt: 'InvenTrack dashboard with inventory value, stock movement, and low-stock panels',
    liveUrl: 'https://inventory-management-system.joshua27emmanuel30.workers.dev/',
    sourceUrl: 'https://github.com/ProgJosh/Inventory-Management-System',
    targetUsers: 'Small-to-medium inventory teams, managers, and operations staff',
    responsibilities: ['Designed the responsive application shell', 'Implemented catalog and stock workflows', 'Added role capabilities and audit history', 'Built reporting, CSV export, and regression tests'],
    decisions: ['Centralized mutations in a service layer', 'Blocked invalid stock movement before persistence', 'Kept local authentication limitations visible in documentation'],
    testing: 'Vitest and Testing Library cover authentication, permissions, product creation, duplicate SKUs, stock movement, search, filtering, sorting, and alerts.',
    outcome: 'A traceable inventory demonstration with a clean integration boundary for replacing browser storage with an authenticated transactional backend.',
    lessons: 'Operational software benefits from visible rules and auditability as much as it benefits from a fast interface.',
  },
  {
    id: 'diwa-habi',
    name: 'Diwa × Habi',
    category: 'Fashion storefront & brand website',
    filter: 'Commerce',
    summary: 'A responsive editorial storefront for a contemporary Filipino clothing concept, balancing storytelling with practical product discovery.',
    problem: 'Present a distinctive clothing collection while keeping search, filtering, product details, wishlist, and cart behavior easy to use.',
    role: 'Frontend development, responsive experience, interaction design, and content structure',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router'],
    features: ['Editorial homepage and collection pages', 'Search, sorting, and filters', 'Product detail and size guide', 'Persistent wishlist and cart', 'Brand story, lookbook, FAQ, and policies'],
    challenge: 'Preserving an editorial brand feel across a content-rich, multi-page shopping experience without weakening navigation or mobile usability.',
    approach: 'I created a small reusable design system, route-level metadata, structured local catalog data, and responsive commerce interactions.',
    status: 'Complete front-end demo · checkout and forms await a production backend',
    image: publicAsset('/project-images/diwa-habi.jpg'),
    imageAlt: 'Diwa × Habi clothing storefront with an editorial hero and featured collection',
    imagePosition: 'center top',
    liveUrl: 'https://diwa-habi.joshua27emmanuel30.workers.dev/',
    sourceUrl: 'https://github.com/ProgJosh/Diwa-Habi',
    targetUsers: 'Fashion customers exploring and saving clothing products',
    responsibilities: ['Built the route-based storefront', 'Implemented catalog search and filters', 'Created cart, wishlist, and form states', 'Added responsive navigation and SEO metadata'],
    decisions: ['Kept the UI system deliberately small', 'Made empty and loading states part of the shopping flow', 'Kept unconnected actions honest and locally scoped'],
    testing: 'Linting and strict production builds validate the TypeScript application. Manual review covers responsive navigation, filtering, cart, wishlist, and reduced-motion behavior.',
    outcome: 'A polished multi-page front-end that demonstrates brand storytelling and practical commerce interactions while clearly separating demo behavior from backend commerce.',
    lessons: 'Strong brand presentation works best when product discovery remains predictable, accessible, and fast.',
  },
  {
    id: 'properties-portal',
    name: 'Properties Management Portal',
    category: 'Full-stack rental management',
    filter: 'Business systems',
    summary: 'A Laravel platform connecting rental discovery, landlord listings, tenant bookings, lease records, administration, and payment integration.',
    problem: 'Bring fragmented rental tasks into one role-based workflow for tenants, landlords, and administrators.',
    role: 'Frontend implementation, database relationships, roles, booking workflows, and payment integration',
    technologies: ['Laravel 11', 'PHP 8.2', 'Livewire 3', 'MySQL', 'Tailwind CSS 3', 'Stripe'],
    features: ['Tenant, landlord, and admin roles', 'Property listing and gallery management', 'Search and localized filtering', 'Booking and lease workflows', 'Administration and payment integration'],
    challenge: 'The system connects role permissions, property records, bookings, leases, identity requirements, and external payment behavior.',
    approach: 'I used Laravel MVC, Livewire interactions, relational data modeling, Jetstream/Sanctum foundations, and server-managed Stripe integration.',
    status: 'Working full-stack project · deployment depends on configured services',
    image: publicAsset('/project-images/properties-portal.jpg'),
    imageAlt: 'Properties Management Portal showing rental search and apartment listing cards',
    liveUrl: 'https://properties-management-portal.vercel.app/',
    sourceUrl: 'https://github.com/ProgJosh/Properties-Management-Portal',
    targetUsers: 'Prospective tenants, property owners, and rental administrators',
    responsibilities: ['Implemented public and role-based screens', 'Modeled booking and property relationships', 'Built management workflows', 'Integrated configured payment services'],
    decisions: ['Used Laravel conventions for maintainable server logic', 'Kept role responsibilities explicit', 'Documented database and deployment configuration rather than embedding credentials'],
    testing: 'Development validation includes Laravel application checks, database migrations, seeded workflows, frontend production builds, and deployment configuration review.',
    outcome: 'A broad full-stack rental workflow that demonstrates server-side application development alongside responsive frontend work.',
    lessons: 'Business systems are easier to extend when permissions, record lifecycles, and integration configuration are designed as first-class concerns.',
  },
];

// Every entry cites a trace that exists in a repository or workspace, so the list stays verifiable.
export const aiToolGroups: AiToolGroup[] = [
  {
    id: 'projects',
    title: 'Used in project work',
    description: 'Agents I have used while building projects.',
    tools: [
      {
        id: 'claude-code',
        inSkills: true,
        name: 'Claude Code',
        maker: 'Anthropic',
        kind: 'Agentic coding assistant',
        usedFor: 'Planning multi-file changes, refactoring, writing tests, and reviewing diffs. Repository guidance in AGENTS.md and CLAUDE.md keeps the agent aligned with this project’s conventions.',
        projects: ['This portfolio', 'Freelance portfolio'],
        evidence: 'AGENTS.md and CLAUDE.md in this repository.',
        evidenceUrl: 'https://github.com/ProgJosh/emmanuel-velo-portfolio/blob/master/CLAUDE.md',
      },
      {
        id: 'github-copilot',
        inSkills: true,
        name: 'GitHub Copilot',
        maker: 'GitHub',
        kind: 'In-editor pair programmer',
        usedFor: 'Suggestions and commit assistance while building the Laravel rental platform, including the property seeder and payment-option improvements.',
        projects: ['Properties Management Portal'],
        evidence: 'Commits co-authored with Copilot in the project history.',
        evidenceUrl: 'https://github.com/ProgJosh/Properties-Management-Portal/commit/c58d52061546fed157b5c173957a2f8dd7910c98',
      },
      {
        id: 'openai-sites',
        inSkills: true,
        name: 'OpenAI Sites',
        maker: 'OpenAI',
        kind: 'AI site scaffolding',
        usedFor: 'Generated the Vite and Cloudflare Worker-compatible project setup and hosting configuration, which I then extended and verified with tests.',
        projects: ['NexaCart', 'This portfolio'],
        evidence: 'Generated .openai/hosting.json and the Sites Vite plugin in both repositories.',
        evidenceUrl: 'https://github.com/ProgJosh/NexaCart/blob/main/.openai/hosting.json',
      },
      {
        id: 'openai-codex',
        inSkills: true,
        name: 'OpenAI Codex',
        maker: 'OpenAI',
        kind: 'Coding agent',
        usedFor: 'Used OpenAI’s coding agent while building the BakeSmart 2D prototype, a 2D bakery learning game.',
        projects: ['BakeSmart 2D'],
        evidence: 'Local installation and configuration only; no public repository link.',
      },
      {
        id: 'opencode',
        inSkills: true,
        name: 'OpenCode',
        maker: 'Open source',
        kind: 'Terminal coding agent',
        usedFor: 'Used the open-source terminal coding agent on personal projects, working from the command line.',
        projects: ['Personal projects'],
        evidence: 'Local installation and configuration only; no public repository link.',
      },
    ],
  },
  {
    id: 'upskilling',
    title: 'Explored while upskilling',
    description: 'Tools I set up to learn agent-driven workflows and compare how coding agents work.',
    tools: [
      {
        id: 'amazon-q',
        inSkills: true,
        name: 'Amazon Q Developer',
        maker: 'AWS',
        kind: 'AI coding assistant',
        usedFor: 'Evaluated as an alternative AI coding assistant, with a project rules folder set up in the workspace.',
        projects: ['Tool evaluation'],
        evidence: 'Local workspace configuration only; no public repository link.',
      },
      {
        id: 'kilo-code',
        name: 'Kilo Code',
        maker: 'Kilo',
        kind: 'Open-source coding agent',
        usedFor: 'Tried its Agent Manager for organizing separate coding sessions inside the editor.',
        projects: ['Tool evaluation'],
        evidence: 'Local workspace configuration only; no public repository link.',
      },
    ],
  },
];

export const aiPrinciples: AiPrinciple[] = [
  { title: 'Scope', description: 'I define the problem, constraints, and acceptance criteria before writing any prompt.' },
  { title: 'Delegate', description: 'Agents draft scaffolding, repetitive code, tests, and documentation inside bounded tasks.' },
  { title: 'Verify', description: 'Linting, type checks, unit tests, and browser tests run on every change before it ships.' },
  { title: 'Own', description: 'I read each diff and keep integration limits honest in the case studies.' },
];

const practices = (names: string[]): Skill[] => names.map((name) => ({ name }));

export const skillGroups: SkillGroup[] = [
  ...freelanceSnapshot.technologyGroups.map((group) => ({
    ...group,
    evidence: 'Select a technology to review the project repository behind it.',
  })),
  { title: 'Application engineering', description: 'Rules, permissions, and persistence behind the interface.', skills: practices(['Hono', 'Livewire', 'Zod validation', 'REST/API integration', 'Stripe integration', 'Web Storage', 'IndexedDB', 'Data modeling']), evidence: 'Alumni Gallery API, Laravel rental workflows, and Alder & Tide reservation rules. Production integration limits are documented in each case study.' },
  { title: 'Testing & quality', description: 'Automated and manual checks focused on user workflows.', skills: practices(['Vitest', 'Playwright', 'Testing Library', 'Node test runner', 'Accessibility checks']), evidence: 'Repository test suites cover domain rules, responsive layouts, and critical flows.' },
  { title: 'Game & cross-platform development', description: 'Games and shared code packaged for desktop and mobile.', skills: practices(['Unity', 'C#', 'Phaser', 'Electron', 'Capacitor', 'Android builds', 'Windows installers']), evidence: 'BakeSmart 2D: a Phaser prototype, then the full Unity game for Windows and Android.' },
  {
    title: 'AI-assisted development',
    description: 'Directing coding agents, then verifying the result with tests.',
    // Tools flagged inSkills; each tag jumps to the AI tools section, which states the evidence for it.
    skills: aiToolGroups.flatMap((group) => group.tools).filter((tool) => tool.inSkills).map((tool) => ({ name: tool.name, anchor: 'ai-tools' })),
    evidence: 'Each tool links to the AI tools section, which states what it was used for and the evidence available.',
  },
];
