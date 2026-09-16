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
  skills: string[];
  evidence: string;
};

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') ?? '';
const publicAsset = (path: string) => `${configuredBasePath}${path}`;

export const identity = {
  name: 'Emmanuel Josh Velo',
  role: 'Web Developer',
  extendedRole: 'Web Developer & Software Engineer',
  location: 'Philippines',
  availability: 'Open to Web Developer and Software Engineer opportunities',
  email: 'velojoshemmanuel30@gmail.com',
  github: 'https://github.com/ProgJosh',
  linkedin: 'https://www.linkedin.com/in/emmanuel-josh-velo',
  facebook: 'https://www.facebook.com/heyiamjosh',
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
    id: 'booksync',
    name: 'BookSync',
    category: 'Booking & appointment management',
    filter: 'Business systems',
    summary: 'A role-aware scheduling system for service businesses, presented through the Wellora demo workspace.',
    problem: 'Coordinate customer requests, provider schedules, availability, appointment changes, and reporting without creating time conflicts.',
    role: 'Responsive UI, scheduling rules, role workflows, persistence, and quality assurance',
    technologies: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'Zod', 'Vitest', 'Playwright'],
    features: ['Admin, staff, and customer workspaces', 'Three-step booking flow', 'Day, week, and month calendars', 'Conflict-aware scheduling', 'Reports and CSV export'],
    challenge: 'Scheduling required consistent timezone handling, provider and customer overlap prevention, and permissions that change by role and appointment state.',
    approach: 'The app stores UTC timestamps, applies Asia/Manila business rules, and rechecks availability inside a serialized local save flow with IndexedDB and Web Locks fallbacks.',
    status: 'Complete persistent local demo · backend and notifications ready for integration',
    image: publicAsset('/project-images/booksync.jpg'),
    imageAlt: 'BookSync service-business dashboard showing appointments, revenue, and scheduling activity',
    imagePosition: 'center top',
    liveUrl: 'https://booking-system.joshua27emmanuel30.workers.dev/',
    sourceUrl: 'https://github.com/ProgJosh/Booking-System',
    targetUsers: 'Service-business administrators, staff members, and customers',
    responsibilities: ['Built role-aware booking and management screens', 'Implemented availability, status, and rescheduling rules', 'Added validation, persistence, exports, and responsive states', 'Created unit and browser workflow tests'],
    decisions: ['Used half-open time intervals so adjacent appointments remain valid', 'Preserved historical service price and duration', 'Queued notification events without pretending to send external messages'],
    testing: 'Vitest covers scheduling, validation, calendar, and service behavior. Playwright covers Chromium workflows, responsive layout, modal focus, and critical booking paths.',
    outcome: 'A working local-first demonstration of the full appointment lifecycle with clear production-integration notes and realistic permission boundaries.',
    lessons: 'Time, permissions, and state transitions must be designed together; treating them as separate UI concerns creates avoidable booking defects.',
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

export const skillGroups: SkillGroup[] = [
  { title: 'Frontend development', description: 'Responsive, accessible interfaces for real workflows.', skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Responsive design'], evidence: 'Used across NexaCart, BookSync, InvenTrack, Diwa × Habi, and this portfolio.' },
  { title: 'Frameworks & libraries', description: 'Component-based interfaces and structured full-stack views.', skills: ['React', 'Laravel', 'Livewire', 'Tailwind CSS', 'Bootstrap', 'Phaser'], evidence: 'Verified in application manifests and project repositories.' },
  { title: 'Backend & application logic', description: 'Role workflows, domain rules, validation, and service boundaries.', skills: ['PHP', 'Laravel MVC', 'Zod validation', 'REST/API integration', 'Stripe integration'], evidence: 'Properties portal, booking rules, commerce flows, and inventory services.' },
  { title: 'Data management', description: 'Relational data and local-first persistence for demo applications.', skills: ['MySQL', 'Web Storage', 'IndexedDB', 'Data modeling', 'CSV export'], evidence: 'Laravel rental data plus typed booking, commerce, and inventory stores.' },
  { title: 'Testing & quality', description: 'Automated and manual checks focused on user workflows.', skills: ['Vitest', 'Playwright', 'Testing Library', 'Node test runner', 'Accessibility checks'], evidence: 'Repository test suites cover business rules, responsive layouts, and critical flows.' },
  { title: 'Deployment & tools', description: 'Repeatable builds, source control, and deployment preparation.', skills: ['Git', 'GitHub', 'Vite', 'npm', 'Composer', 'Docker', 'Cloudflare Workers', 'Render'], evidence: 'Verified through package scripts, lockfiles, and project deployment documentation.' },
  { title: 'Cross-platform development', description: 'Shared web code packaged for desktop and mobile.', skills: ['Electron', 'Capacitor', 'Android packaging', 'Offline web builds'], evidence: 'BakeSmart2D Windows and Android workflows.' },
];
