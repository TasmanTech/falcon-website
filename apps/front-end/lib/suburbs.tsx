import type { ReactNode } from "react";
import Link from "next/link";

/** One photo on a suburb page. Values must match the image manifest entry. */
export interface SuburbImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export interface SuburbFaq {
  question: string;
  answer: string;
}

/** Everything a suburb landing page renders. Copy is written per suburb, never templated. */
export interface Suburb {
  slug: string;
  name: string;
  region: "North Shore" | "West Auckland";
  path: string;
  /** Meta title without the brand suffix, 44 characters or fewer. */
  metaTitle: string;
  /** Meta description, 120 to 155 characters. */
  metaDescription: string;
  heading: string;
  subtitle: string;
  intro: { title: string; image: SuburbImage; content: ReactNode[] };
  commonJobs: { title: string; content: ReactNode[] };
  local: { title: string; image: SuburbImage; content: ReactNode[] };
  nearby: { title: string; content: ReactNode[] };
  /** Neighbouring suburbs, also listed in the Service areaServed. */
  nearbySuburbs: string[];
  faqs: SuburbFaq[];
}

const linkClass = "font-semibold text-brand-dark underline hover:text-brand-primary transition-colors";

const albany: Suburb = {
  slug: "albany",
  name: "Albany",
  region: "North Shore",
  path: "/locksmith/albany",
  metaTitle: "Locksmith Albany, North Shore",
  metaDescription: "Mobile locksmith in Albany for lockouts, rekeys, lock changes and smart locks. Flat NZ$20 call-out, work quoted on site, after-hours support.",
  heading: "Locksmith in Albany, North Shore",
  subtitle: "Lockouts, rekeys, lock repairs and smart lock fitting for Albany homes, townhouses and businesses, from Albany Village to Rosedale.",
  intro: {
    title: "Mobile Locksmith Service for Albany",
    image: {
      src: "/images/locations/albany/matte-black-keypad-deadbolt-locksmith-albany.webp",
      alt: "Matte black electronic keypad deadbolt beside its interior battery unit",
      title: "Keypad Deadbolt Albany",
      description: "A keypad deadbolt like those fitted to many newer Albany townhouses.",
    },
    content: [
      <p key="1">Albany has grown fast, and a lot of its homes are newer townhouses and subdivisions around Albany Heights, Fairview Heights, Pinehill and Northcross. Newer homes tend to have newer hardware: keypad deadbolts, digital locks and multipoint locks on the front door. We work on all of them, alongside the traditional deadbolts and lever sets found in older streets.</p>,
      <p key="2">We come to you, so there&apos;s no workshop to visit. You pay a flat <strong>NZ$20 call-out fee</strong>, we look at the lock, and we quote the job before any work starts.</p>,
    ],
  },
  commonJobs: {
    title: "What Albany Customers Call Us For",
    content: [
      <p key="1">These are the jobs we&apos;re most often asked to do around Albany:</p>,
      <ul key="2" className="list-disc pl-6 space-y-2">
        <li><strong>Rekeying after moving in:</strong> new owners and tenants rarely know how many keys are out there. A <Link href="/lock/rekey" className={linkClass}>lock rekey</Link> makes the old ones useless without replacing the hardware.</li>
        <li><strong>Smart and keypad locks:</strong> <Link href="/smart-lock/smart-lock-installation" className={linkClass}>smart lock installation</Link> for townhouses, plus <Link href="/smart-lock/smart-lock-repair-programming" className={linkClass}>repair and programming</Link> when a keypad stops accepting codes or the batteries go flat.</li>
        <li><strong>Lockouts:</strong> houses, flats and offices, opened with non-destructive entry first through our <Link href="/lock/lockout" className={linkClass}>emergency lockout service</Link>.</li>
        <li><strong>Business premises:</strong> lock changes and repairs for offices and units in the Rosedale and Apollo Drive business areas.</li>
      </ul>,
    ],
  },
  local: {
    title: "Rekeying a Newly Bought Albany Home",
    image: {
      src: "/images/locations/albany/new-silver-house-keys-rekey-albany.webp",
      alt: "Six new silver house keys, five fanned out and one on its own",
      title: "New Home Rekey Albany",
      description: "Rekeying a newly bought home means a fresh set of keys that no previous owner holds.",
    },
    content: [
      <p key="1">When a home changes hands, keys often stay with builders, previous owners, property managers and neighbours who fed the cat. Rekeying changes the pins inside your existing locks so only your new keys work, and it usually costs less than buying new locks.</p>,
      <p key="2">We can key the front door, back door, garage and sliding doors to one key at the same visit. If a lock is worn or you want an upgrade, we can do a <Link href="/lock/lock-change-installation" className={linkClass}>lock change and installation</Link> instead.</p>,
    ],
  },
  nearby: {
    title: "Areas We Cover Around Albany",
    content: [
      <p key="1">As well as Albany itself, we regularly work in Greenhithe, Oteha, Rosedale, Unsworth Heights, Schnapper Rock, Glenfield, Browns Bay and Torbay. We also cover the rest of the North Shore, including <Link href="/locksmith/takapuna" className={linkClass}>Takapuna</Link>.</p>,
      <p key="2">Stuck with a car rather than a house? Our <Link href="/car-lockout" className={linkClass}>car lockout service</Link> and <Link href="/auto/dead-battery-assistance" className={linkClass}>jump start help</Link> cover Albany too.</p>,
    ],
  },
  nearbySuburbs: ["Greenhithe", "Oteha", "Rosedale", "Unsworth Heights", "Schnapper Rock", "Glenfield", "Browns Bay", "Torbay"],
  faqs: [
    {
      question: "Do you charge extra to come out to Albany?",
      answer: "No. The NZ$20 call-out fee is the same in Albany as anywhere else in Auckland. The work itself is quoted on site before we start.",
    },
    {
      question: "Can you rekey all the locks in a new townhouse to one key?",
      answer: "Usually, yes, as long as the locks use compatible cylinders. We check each lock on the day and tell you if any need a new cylinder to match.",
    },
    {
      question: "My keypad lock has stopped working. Can you fix it?",
      answer: "Often it's flat batteries, a lost master code or a worn motor. We diagnose it on site and either repair and reprogram it or quote a replacement.",
    },
    {
      question: "Do you work on business premises in Rosedale?",
      answer: "Yes. We change and repair locks for offices, warehouses and units, and can rekey them when staff or tenants change.",
    },
  ],
};

const takapuna: Suburb = {
  slug: "takapuna",
  name: "Takapuna",
  region: "North Shore",
  path: "/locksmith/takapuna",
  metaTitle: "Locksmith Takapuna, North Shore",
  metaDescription: "Mobile locksmith in Takapuna for apartment and house lockouts, lock repairs, rekeys and smart locks. Flat NZ$20 call-out and after-hours support.",
  heading: "Locksmith in Takapuna, North Shore",
  subtitle: "Help with apartment, house and shop locks across Takapuna, from Hurstmere Road and the beachfront to Lake Pupuke and Hauraki.",
  intro: {
    title: "Mobile Locksmith Service for Takapuna",
    image: {
      src: "/images/locations/takapuna/stainless-mortice-lock-case-locksmith-takapuna.webp",
      alt: "Stainless steel mortice lock case with its faceplate, a strike plate and one key",
      title: "Apartment Door Lock Takapuna",
      description: "The mortice lock found inside many Takapuna apartment entry doors.",
    },
    content: [
      <p key="1">Takapuna mixes apartment buildings around the town centre with villas, bungalows and newer homes towards Hauraki and Lake Pupuke. Apartment entry doors often use mortice locks built into the door, which need different parts and skills from a standard deadbolt.</p>,
      <p key="2">We come to your door with the tools and common parts in the van. You pay a flat <strong>NZ$20 call-out fee</strong>, and we quote the work on site before we start.</p>,
    ],
  },
  commonJobs: {
    title: "What Takapuna Customers Call Us For",
    content: [
      <p key="1">Around Takapuna, these are the calls we get most often:</p>,
      <ul key="2" className="list-disc pl-6 space-y-2">
        <li><strong>Apartment lockouts:</strong> doors that latch shut behind you with the keys inside. Our <Link href="/lock/lockout" className={linkClass}>lockout service</Link> tries non-destructive entry first.</li>
        <li><strong>Sticking or worn locks:</strong> salt air near the beach is hard on lock parts. Our <Link href="/lock/lock-repair" className={linkClass}>lock repair service</Link> cleans, adjusts or replaces worn components.</li>
        <li><strong>Letterbox and cabinet locks:</strong> replacement cam locks for apartment letterboxes, storage cages and cabinets.</li>
        <li><strong>Shops and offices:</strong> lock changes and rekeys for retailers and offices on Hurstmere Road and around the town centre.</li>
      </ul>,
    ],
  },
  local: {
    title: "Letterbox, Storage and Cabinet Locks",
    image: {
      src: "/images/locations/takapuna/letterbox-cam-lock-with-keys-takapuna.webp",
      alt: "Small chrome letterbox cam lock with its steel cam and two small keys",
      title: "Letterbox Lock Takapuna",
      description: "A replacement cam lock for an apartment letterbox in Takapuna.",
    },
    content: [
      <p key="1">Losing a letterbox key in an apartment building is more common than you&apos;d think, and the building manager doesn&apos;t always hold a spare. We can open the box and fit a new cam lock with fresh keys, usually in one visit.</p>,
      <p key="2">If you&apos;re moving into a Takapuna apartment, ask about a <Link href="/lock/rekey" className={linkClass}>rekey</Link> for the entry door at the same time. Keys from previous tenants stop working, and you keep the existing lock.</p>,
    ],
  },
  nearby: {
    title: "Areas We Cover Around Takapuna",
    content: [
      <p key="1">We regularly work in Milford, Hauraki, Belmont, Bayswater, Devonport, Sunnynook, Forrest Hill and Northcote, and across the wider North Shore, including <Link href="/locksmith/albany" className={linkClass}>Albany</Link>.</p>,
      <p key="2">Thinking about going keyless? We supply and fit <Link href="/smart-lock" className={linkClass}>smart locks</Link> suited to apartment and house doors.</p>,
    ],
  },
  nearbySuburbs: ["Milford", "Hauraki", "Belmont", "Bayswater", "Devonport", "Sunnynook", "Forrest Hill", "Northcote"],
  faqs: [
    {
      question: "Can you open an apartment door without damaging it?",
      answer: "In most cases, yes. We start with non-destructive entry, which leaves the lock and door intact. If a lock has failed and must be drilled, we explain why and agree the price first.",
    },
    {
      question: "Do I need the building manager's permission?",
      answer: "For your own apartment door, we need to see you're allowed in, usually photo ID with the address or a tenancy agreement. For common-area doors, we need the body corporate or building manager's approval.",
    },
    {
      question: "Can you replace a letterbox lock?",
      answer: "Yes. We carry common cam locks and can fit one with new keys. Unusual sizes may need a part ordered in, and we'll tell you before we start.",
    },
    {
      question: "Why is my lock getting stiff near the beach?",
      answer: "Salt air and grit wear lock parts faster. A service with the right lubricant often fixes it. If parts are corroded, we quote a repair or a replacement.",
    },
  ],
};

const henderson: Suburb = {
  slug: "henderson",
  name: "Henderson",
  region: "West Auckland",
  path: "/locksmith/henderson",
  metaTitle: "Locksmith Henderson, West Auckland",
  metaDescription: "Mobile locksmith in Henderson for lockouts, rekeys, lock repairs and window locks. Flat NZ$20 call-out, work quoted on site, after-hours support.",
  heading: "Locksmith in Henderson, West Auckland",
  subtitle: "Lockouts, rekeys, lock repairs and security upgrades for Henderson homes and businesses, from the town centre to Lincoln Road and Henderson Valley.",
  intro: {
    title: "Mobile Locksmith Service for Henderson",
    image: {
      src: "/images/locations/henderson/brass-rim-night-latch-locksmith-henderson.webp",
      alt: "Brass rim night latch with its keeper and two brass keys",
      title: "Night Latch Repair Henderson",
      description: "A classic rim night latch like those on older Henderson bungalows.",
    },
    content: [
      <p key="1">A lot of Henderson&apos;s houses are weatherboard and brick-and-tile homes built from the 1950s to the 1980s. Many still have their original night latches and older deadlocks. These locks are often worn, easy to slip and hard to find parts for. We repair them where it makes sense, and upgrade them where it doesn&apos;t.</p>,
      <p key="2">We come to you anywhere in Henderson. You pay a flat <strong>NZ$20 call-out fee</strong>, and every job is quoted on site before work begins.</p>,
    ],
  },
  commonJobs: {
    title: "What Henderson Customers Call Us For",
    content: [
      <p key="1">Around Henderson, these are our most common jobs:</p>,
      <ul key="2" className="list-disc pl-6 space-y-2">
        <li><strong>Old lock upgrades:</strong> swapping tired night latches for a proper deadbolt through our <Link href="/lock/lock-change-installation" className={linkClass}>lock change and installation</Link> service.</li>
        <li><strong>Worn or sticking locks:</strong> keys that only turn with a jiggle are a sign a lock is close to failing. Our <Link href="/lock/lock-repair" className={linkClass}>lock repairs</Link> sort them before you get locked out.</li>
        <li><strong>Rekeys for rentals:</strong> landlords and tenants changing over a property use our <Link href="/lock/rekey" className={linkClass}>rekeying service</Link> so old keys stop working.</li>
        <li><strong>Electronic door locks:</strong> keypad and fingerprint locks fitted to older front doors through our <Link href="/smart-lock/smart-lock-installation" className={linkClass}>smart lock installation</Link> service, with the door prepared so the lock runs smoothly.</li>
        <li><strong>Lockouts:</strong> house, flat and shed lockouts with <Link href="/lock/lockout" className={linkClass}>non-destructive entry</Link> first.</li>
      </ul>,
    ],
  },
  local: {
    title: "Window Locks for Older Homes",
    image: {
      src: "/images/locations/henderson/white-window-sash-lock-with-key-henderson.webp",
      alt: "White keyed window sash lock with a small key",
      title: "Window Lock Henderson",
      description: "A keyed window lock for older timber and aluminium windows in Henderson.",
    },
    content: [
      <p key="1">Front door locks get all the attention, but many break-ins start at a window. Older timber and aluminium windows often have basic catches that open with a flat tool. Keyed window locks are a cheap, quick upgrade that makes a real difference.</p>,
      <p key="2">We can fit window locks during the same visit as a door lock change or rekey, and key them alike where the hardware allows.</p>,
    ],
  },
  nearby: {
    title: "Areas We Cover Around Henderson",
    content: [
      <p key="1">We regularly work in Te Atatū, Glendene, Sunnyvale, Western Heights, Henderson Valley, Massey, Ranui and Swanson, and across West Auckland, including <Link href="/locksmith/new-lynn" className={linkClass}>New Lynn</Link>.</p>,
      <p key="2">Car trouble instead? Our <Link href="/car-lockout" className={linkClass}>car lockout service</Link> and <Link href="/auto/dead-battery-assistance" className={linkClass}>flat battery help</Link> cover Henderson too.</p>,
    ],
  },
  nearbySuburbs: ["Te Atatū", "Glendene", "Sunnyvale", "Western Heights", "Henderson Valley", "Massey", "Ranui", "Swanson"],
  faqs: [
    {
      question: "Is it worth repairing an old night latch?",
      answer: "Sometimes. If the latch is sound and parts are available, a repair is cheaper. If it's badly worn or easy to slip, a new deadbolt is the better spend, and we'll quote both options.",
    },
    {
      question: "Can you fit window locks?",
      answer: "Yes. We fit keyed locks to most timber and aluminium windows, and can key them alike so one small key opens them all.",
    },
    {
      question: "I'm a landlord in Henderson. Can you rekey between tenants?",
      answer: "Yes. Rekeying changes the pins so previous tenants' keys stop working, and it's usually cheaper than new locks. We can cut extra keys at the same time.",
    },
    {
      question: "Do you charge more to come to Henderson Valley?",
      answer: "No. The NZ$20 call-out fee applies across Auckland. Work outside normal hours costs a bit more, and we tell you before we start.",
    },
  ],
};

const newLynn: Suburb = {
  slug: "new-lynn",
  name: "New Lynn",
  region: "West Auckland",
  path: "/locksmith/new-lynn",
  metaTitle: "Locksmith New Lynn, West Auckland",
  metaDescription: "Mobile locksmith in New Lynn for apartment and house lockouts, shopfront locks, garage locks and rekeys. Flat NZ$20 call-out, quoted on site.",
  heading: "Locksmith in New Lynn, West Auckland",
  subtitle: "Help with apartment, house, shop and garage locks across New Lynn, from the town centre and train station to Green Bay and Kelston.",
  intro: {
    title: "Mobile Locksmith Service for New Lynn",
    image: {
      src: "/images/locations/new-lynn/shopfront-hook-bolt-lock-locksmith-new-lynn.webp",
      alt: "Narrow aluminium shopfront hook-bolt lock with its cylinder and two keys",
      title: "Shopfront Lock New Lynn",
      description: "A narrow-stile shopfront lock used on aluminium shop doors in New Lynn.",
    },
    content: [
      <p key="1">New Lynn has changed a lot, with apartment buildings around the train station and town centre alongside older family homes in the surrounding streets. It&apos;s also a busy retail and light industrial area, with plenty of aluminium shopfronts, roller doors and storage units.</p>,
      <p key="2">We come to you with the tools and common parts on board. You pay a flat <strong>NZ$20 call-out fee</strong>, and we quote every job on site before work starts.</p>,
    ],
  },
  commonJobs: {
    title: "What New Lynn Customers Call Us For",
    content: [
      <p key="1">Around New Lynn, these are the jobs we&apos;re asked to do most:</p>,
      <ul key="2" className="list-disc pl-6 space-y-2">
        <li><strong>Shopfront locks:</strong> narrow-stile aluminium door locks that stop catching or won&apos;t lock at closing time. Our <Link href="/lock/lock-repair" className={linkClass}>lock repair service</Link> handles these.</li>
        <li><strong>Apartment lockouts:</strong> doors that latch behind you, opened through our <Link href="/lock/lockout" className={linkClass}>lockout service</Link> with non-destructive entry first.</li>
        <li><strong>Rekeys for new tenants:</strong> a <Link href="/lock/rekey" className={linkClass}>lock rekey</Link> means the last tenant&apos;s keys no longer work.</li>
        <li><strong>Electronic door locks:</strong> <Link href="/smart-lock/smart-lock-installation" className={linkClass}>smart and digital door lock installation</Link> for apartments, homes and small businesses that want codes instead of keys, plus <Link href="/smart-lock/smart-lock-repair-programming" className={linkClass}>reprogramming</Link> when tenants change.</li>
      </ul>,
    ],
  },
  local: {
    title: "Garage and Roller Door Locks",
    image: {
      src: "/images/locations/new-lynn/garage-roller-door-t-handle-lock-new-lynn.webp",
      alt: "Chrome garage roller door T-handle lock with two keys",
      title: "Garage Door Lock New Lynn",
      description: "A roller door T-handle lock for garages and storage units around New Lynn.",
    },
    content: [
      <p key="1">Roller door T-handle locks wear out, seize up or lose their keys, especially on garages that rarely get locked. We can free off a stiff lock, replace a broken one and supply new keys.</p>,
      <p key="2">For a more secure setup, we can also look at your house locks at the same visit and suggest a <Link href="/lock/lock-change-installation" className={linkClass}>lock change</Link> where the existing hardware is worn.</p>,
    ],
  },
  nearby: {
    title: "Areas We Cover Around New Lynn",
    content: [
      <p key="1">We regularly work in Avondale, Kelston, Glen Eden, Titirangi, Green Bay, Blockhouse Bay, Fruitvale and Rosebank, and across West Auckland, including <Link href="/locksmith/henderson" className={linkClass}>Henderson</Link>.</p>,
      <p key="2">Locked out of a car at the shops or station? Our <Link href="/car-lockout" className={linkClass}>car lockout service</Link> covers New Lynn as well.</p>,
    ],
  },
  nearbySuburbs: ["Avondale", "Kelston", "Glen Eden", "Titirangi", "Green Bay", "Blockhouse Bay", "Fruitvale", "Rosebank"],
  faqs: [
    {
      question: "Can you fix a shop door that won't lock?",
      answer: "Usually, yes. It's often a worn cylinder, a misaligned strike or a tired hook bolt. We diagnose it on site and quote a repair or a replacement lock.",
    },
    {
      question: "Can you replace a garage roller door lock?",
      answer: "Yes. We fit replacement T-handle locks and supply new keys. If your door uses an unusual lock, we may need to order a part and will tell you first.",
    },
    {
      question: "Do you help with apartment lockouts near the station?",
      answer: "Yes. We open apartment doors across New Lynn, starting with non-destructive entry. We need to see you're allowed in, usually photo ID or a tenancy agreement.",
    },
    {
      question: "How much does a locksmith cost in New Lynn?",
      answer: "A flat NZ$20 call-out fee, then the job is quoted on site based on the lock and the work needed. Work outside normal hours costs a bit more.",
    },
  ],
};

/** The suburb landing pages, in the order the footer lists them. */
export const suburbs = { albany, takapuna, henderson, newLynn } as const;

/** Suburb links grouped by region, for the footer's Popular Links dropdown. */
export const suburbLinksByRegion: { region: Suburb["region"]; links: { href: string; label: string }[] }[] = [
  { region: "North Shore", links: [albany, takapuna].map((s) => ({ href: s.path, label: `Locksmith ${s.name}` })) },
  { region: "West Auckland", links: [henderson, newLynn].map((s) => ({ href: s.path, label: `Locksmith ${s.name}` })) },
];
