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
};

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') ?? '';
export const publicAsset = (path: string) => `${configuredBasePath}${path}`;

export const identity = {
  name: 'Emmanuel Josh Velo',
  role: 'Web Developer',
  extendedRole: 'Web Developer',
  location: 'Lubao, Philippines',
  availability: 'Open to Web Developer opportunities',
  email: 'velojoshemmanuel30@gmail.com',
  github: 'https://github.com/ProgJosh',
  linkedin: 'https://www.linkedin.com/in/emmanuel-josh-velo',
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
  { id: 'contact', label: 'Contact' },
] as const;

export const projects: Project[] = [
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
    id: 'bakesmart2d',
    name: 'BakeSmart2D',
    category: 'Cross-platform 2D application',
    filter: 'Cross-platform',
    summary: 'A Phaser-based bakery learning game delivered from one TypeScript codebase to web, Windows, and Android test builds.',
    problem: 'Package the same interactive 2D experience for browser, desktop, and mobile use while keeping core gameplay available offline.',
    role: 'Game implementation, responsive input support, and cross-platform packaging',
    technologies: ['Phaser 3', 'TypeScript', 'Vite', 'Electron', 'Capacitor', 'Android'],
    features: ['Shared web game build', 'Windows installer workflow', 'Android application wrapper', 'Offline core gameplay', 'Touch and landscape support'],
    challenge: 'Desktop and mobile packaging have different runtime, input, signing, and installation constraints even when they share the same web build.',
    approach: 'Vite produces a relative-path web build that Electron packages for Windows and Capacitor synchronizes into the Android wrapper.',
    status: 'Packaged Windows and Android test builds · no public web demo',
    image: publicAsset('/project-images/bakesmart2d.png'),
    imageAlt: 'BakeSmart2D illustrated bakery game splash screen',
    sourceUrl: 'https://github.com/ProgJosh/BakeSmart2D',
    targetUsers: 'Learners using a browser, Windows computer, or Android device',
    responsibilities: ['Implemented the Phaser game flow', 'Configured web and desktop builds', 'Integrated the Capacitor Android wrapper', 'Documented installation and physical-device QA'],
    decisions: ['Used one web build as the platform source', 'Kept core gameplay offline-capable', 'Represented the Android artifact as debug-signed for testing, not as a store release'],
    testing: 'Strict TypeScript and Vite builds validate the shared application. Release checks cover Windows launch and installation plus Android launch, landscape layout, touch, navigation, and background/resume on a physical device.',
    outcome: 'A practical cross-platform delivery workflow that reuses one game codebase while keeping platform-specific release limits documented.',
    lessons: 'A shared codebase reduces duplication, but each platform still needs explicit packaging and device-level acceptance checks.',
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

const practices = (names: string[]): Skill[] => names.map((name) => ({ name }));

export const skillGroups: SkillGroup[] = [
  ...freelanceSnapshot.technologyGroups.map((group) => ({
    ...group,
    evidence: 'Select a technology to review the project repository behind it.',
  })),
  { title: 'Application engineering', description: 'Rules, permissions, and persistence behind the interface.', skills: practices(['Hono', 'Livewire', 'Zod validation', 'REST/API integration', 'Stripe integration', 'Web Storage', 'IndexedDB', 'Data modeling']), evidence: 'Alumni Gallery API, Laravel rental workflows, and Alder & Tide reservation rules. Production integration limits are documented in each case study.' },
  { title: 'Testing & quality', description: 'Automated and manual checks focused on user workflows.', skills: practices(['Vitest', 'Playwright', 'Testing Library', 'Node test runner', 'Accessibility checks']), evidence: 'Repository test suites cover domain rules, responsive layouts, and critical flows.' },
  { title: 'Cross-platform development', description: 'Shared web code packaged for desktop and mobile.', skills: practices(['Phaser', 'Electron', 'Capacitor', 'Android packaging', 'Offline web builds']), evidence: 'BakeSmart2D Windows and Android workflows.' },
];
