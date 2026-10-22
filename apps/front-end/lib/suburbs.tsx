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
  region: "North Shore" | "West Auckland" | "East Auckland" | "South Auckland";
  /** Set when the suburb is outside Auckland (e.g. "Waikato"); schema place names default to Auckland. */
  locality?: string;
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
  /** Neighbouring suburbs, also listed in the Service areaServed. Add ", <Region>" to a name outside Auckland. */
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
      <p key="1">As well as Albany itself, we regularly work in Greenhithe, Oteha, Rosedale, Unsworth Heights, Schnapper Rock, Glenfield, Browns Bay and Torbay. We also cover the rest of the North Shore, including <Link href="/locksmith/takapuna" className={linkClass}>Takapuna</Link> and <Link href="/locksmith/birkenhead" className={linkClass}>Birkenhead</Link>.</p>,
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
      <p key="1">We regularly work in Milford, Hauraki, Belmont, Bayswater, Devonport, Sunnynook, Forrest Hill and Northcote, and across the wider North Shore, including <Link href="/locksmith/albany" className={linkClass}>Albany</Link> and <Link href="/locksmith/birkenhead" className={linkClass}>Birkenhead</Link>.</p>,
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
      <p key="1">We regularly work in Te Atatū, Glendene, Sunnyvale, Western Heights, Henderson Valley, Massey, Ranui and Swanson, and across West Auckland, including <Link href="/locksmith/new-lynn" className={linkClass}>New Lynn</Link> and <Link href="/locksmith/titirangi" className={linkClass}>Titirangi</Link>.</p>,
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
      <p key="1">We regularly work in Avondale, Kelston, Glen Eden, <Link href="/locksmith/titirangi" className={linkClass}>Titirangi</Link>, Green Bay, <Link href="/locksmith/blockhouse-bay" className={linkClass}>Blockhouse Bay</Link>, Fruitvale and Rosebank, and across West Auckland, including <Link href="/locksmith/henderson" className={linkClass}>Henderson</Link>.</p>,
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

const birkenhead: Suburb = {
  slug: "birkenhead",
  name: "Birkenhead",
  region: "North Shore",
  path: "/locksmith/birkenhead",
  metaTitle: "Locksmith Birkenhead, North Shore",
  metaDescription: "Mobile locksmith in Birkenhead for villa door locks, rekeys after renovations, lockouts and lock repairs. Flat NZ$20 call-out, quoted on site.",
  heading: "Locksmith in Birkenhead, North Shore",
  subtitle: "Lock repairs, rekeys, lockouts and upgrades for Birkenhead villas, bungalows and businesses, from Birkenhead Point to Highbury and Chatswood.",
  intro: {
    title: "Mobile Locksmith Service for Birkenhead",
    image: {
      src: "/images/locations/birkenhead/brass-mortice-sashlock-villa-door-birkenhead.webp",
      alt: "Brass mortice sashlock with a pair of brass lever handles on long backplates",
      title: "Villa Door Lock Birkenhead",
      description: "A brass mortice sashlock and lever set like those on Birkenhead villa front doors.",
    },
    content: [
      <p key="1">Birkenhead is full of character homes. Around Birkenhead Point and the older streets near the wharf, many villas and bungalows still have their original timber doors with mortice locks set inside them. Those locks wear with age, and replacing them badly can split a heritage door or leave it looking out of place.</p>,
      <p key="2">We repair or replace mortice locks to suit the door, and fit modern deadbolts where you want more security. We come to you, with a flat <strong>NZ$20 call-out fee</strong>, and quote every job on site before work starts.</p>,
    ],
  },
  commonJobs: {
    title: "What Birkenhead Customers Call Us For",
    content: [
      <p key="1">Around Birkenhead, these are the jobs we&apos;re asked to do most:</p>,
      <ul key="2" className="list-disc pl-6 space-y-2">
        <li><strong>Worn mortice locks:</strong> old villa locks that catch, slip or need the key held at just the right angle. Our <Link href="/lock/lock-repair" className={linkClass}>door lock repair service</Link> sorts the mechanism or replaces it with one that fits the existing cut-out.</li>
        <li><strong>Security upgrades:</strong> adding a deadbolt to a door that only has a latch, or a full <Link href="/lock/lock-change-installation" className={linkClass}>door lock replacement</Link> where the old hardware is past saving.</li>
        <li><strong>Rekeys after building work:</strong> a <Link href="/lock/rekey" className={linkClass}>residential rekey</Link> once the builders, painters and tradies have handed back their keys.</li>
        <li><strong>Break-in repairs:</strong> burglary repairs for doors and locks damaged in a break-in, through our <Link href="/lock/lock-repair" className={linkClass}>lock repair</Link> service, so the house can be secured the same day.</li>
        <li><strong>Lockouts:</strong> locked out of your house, flat or office around Highbury? Our <Link href="/lock/lockout" className={linkClass}>house lockout service</Link> uses non-destructive entry first.</li>
      </ul>,
    ],
  },
  local: {
    title: "Rekeying After a Renovation",
    image: {
      src: "/images/locations/birkenhead/brass-deadbolt-new-keys-rekey-birkenhead.webp",
      alt: "Brass deadbolt with its thumb-turn and a set of four newly cut brass keys",
      title: "Rekey After Renovation Birkenhead",
      description: "Rekeying a Birkenhead home after renovations so builders' and trades' keys stop working.",
    },
    content: [
      <p key="1">Renovating an older home means handing out keys. By the end of a job, builders, electricians, painters and project managers may all have had a copy, and not every one comes back. Rekeying changes the pins inside your locks so only your new keys work, without replacing the hardware you&apos;ve just had painted around.</p>,
      <p key="2">If the renovation included new doors, we can key the new and existing locks alike so one key does the lot. Prefer to go keyless? Our <Link href="/smart-lock/smart-lock-installation" className={linkClass}>smart door lock installation</Link> lets you give trades a temporary code instead of a key.</p>,
    ],
  },
  nearby: {
    title: "Areas We Cover Around Birkenhead",
    content: [
      <p key="1">We regularly work in Northcote, Northcote Point, Chatswood, Beach Haven, Birkdale, Hillcrest, Glenfield and Kauri Point, and across the North Shore, including <Link href="/locksmith/takapuna" className={linkClass}>Takapuna</Link> and <Link href="/locksmith/albany" className={linkClass}>Albany</Link>.</p>,
      <p key="2">Locked out of a car at Highbury or the ferry? Our <Link href="/car-lockout" className={linkClass}>car lockout service</Link> covers Birkenhead too.</p>,
    ],
  },
  nearbySuburbs: ["Northcote", "Northcote Point", "Chatswood", "Beach Haven", "Birkdale", "Hillcrest", "Glenfield", "Kauri Point"],
  faqs: [
    {
      question: "Can you repair the original lock on a villa door?",
      answer: "Often, yes. Many old mortice locks just need cleaning, adjusting or a new spring. If it's beyond repair, we fit a replacement sized to the existing cut-out so the door isn't damaged.",
    },
    {
      question: "Should I rekey after renovating?",
      answer: "If keys went to anyone outside your household during the work, yes. Rekeying is usually cheaper than new locks, and we can cut as many new keys as you need on the day.",
    },
    {
      question: "Can you add a deadbolt to an old timber door?",
      answer: "Yes. We check the door's thickness and condition first, then fit a deadbolt that suits it. If the door is too thin or damaged, we'll tell you before we drill anything.",
    },
    {
      question: "Do you work at businesses in Highbury?",
      answer: "Yes. We change and repair locks for shops and offices around Highbury and Birkenhead, and do commercial lock rekeys when staff leave or a lease changes hands.",
    },
  ],
};

const titirangi: Suburb = {
  slug: "titirangi",
  name: "Titirangi",
  region: "West Auckland",
  path: "/locksmith/titirangi",
  metaTitle: "Locksmith Titirangi, West Auckland",
  metaDescription: "Mobile locksmith in Titirangi for lockouts, stiff or corroded locks, gate locks and rekeys for bush-clad homes. Flat NZ$20 call-out, quoted on site.",
  heading: "Locksmith in Titirangi, West Auckland",
  subtitle: "Lockouts, lock repairs, gate locks and rekeys for Titirangi homes, from the village and Scenic Drive to Woodlands Park and French Bay.",
  intro: {
    title: "Mobile Locksmith Service for Titirangi",
    image: {
      src: "/images/locations/titirangi/black-keyed-gate-lock-locksmith-titirangi.webp",
      alt: "Black powder-coated keyed gate lock with its striker plate and two keys",
      title: "Gate Lock Titirangi",
      description: "A keyed gate lock for the driveway and side gates common on Titirangi properties.",
    },
    content: [
      <p key="1">Titirangi homes sit among the bush on the edge of the Waitākere Ranges, often down long, steep driveways behind a gate. Many properties have more than one building, such as a sleepout, studio or garage, each with its own lock and its own set of keys to keep track of.</p>,
      <p key="2">We come to you anywhere in Titirangi, however far down the drive. Let us know about gates, steps or tricky access when you call. You pay a flat <strong>NZ$20 call-out fee</strong>, and every job is quoted on site before work begins.</p>,
    ],
  },
  commonJobs: {
    title: "What Titirangi Customers Call Us For",
    content: [
      <p key="1">Around Titirangi, these are our most common jobs:</p>,
      <ul key="2" className="list-disc pl-6 space-y-2">
        <li><strong>Stiff and seized locks:</strong> damp bush air is hard on lock parts. Our <Link href="/lock/lock-repair" className={linkClass}>lock repair service</Link> cleans, lubricates and replaces corroded components.</li>
        <li><strong>Gate, sleepout and studio locks:</strong> new or replacement locks, including garage door locks, through our <Link href="/lock/lock-change-installation" className={linkClass}>lock installation service</Link>, keyed alike to the house where the hardware allows.</li>
        <li><strong>Rekeys:</strong> <Link href="/lock/rekey" className={linkClass}>rekeying locks</Link> for new owners, or when a spare key has gone missing.</li>
        <li><strong>Lockouts:</strong> house and sleepout lockouts, opened through our <Link href="/lock/lockout" className={linkClass}>emergency lockout service</Link> with non-destructive entry first.</li>
      </ul>,
    ],
  },
  local: {
    title: "Locks That Struggle in the Damp",
    image: {
      src: "/images/locations/titirangi/corroded-and-new-brass-lock-cylinders-titirangi.webp",
      alt: "Corroded brass lock cylinder with green patina beside a new polished brass cylinder",
      title: "Corroded Lock Replacement Titirangi",
      description: "A lock cylinder corroded by damp bush air, next to the new cylinder that replaces it.",
    },
    content: [
      <p key="1">Under the canopy, moisture hangs around and outdoor locks rarely dry out. Over time, brass and steel parts corrode, keys get harder to turn, and one day the lock won&apos;t open at all. A key that needs forcing is a warning sign, and it&apos;s much cheaper to deal with before the key snaps in the lock.</p>,
      <p key="2">We service locks with a lubricant that suits damp conditions, and replace corroded cylinders with new ones. If you&apos;d rather not rely on keys at all, we also do <Link href="/smart-lock/smart-lock-installation" className={linkClass}>electronic door lock installation</Link> with weather-rated keypad and fingerprint locks.</p>,
    ],
  },
  nearby: {
    title: "Areas We Cover Around Titirangi",
    content: [
      <p key="1">We regularly work in Laingholm, Woodlands Park, Waima, Konini, Glen Eden, Green Bay, Oratia and Parau, and work as a locksmith across West Auckland, including <Link href="/locksmith/new-lynn" className={linkClass}>New Lynn</Link>, <Link href="/locksmith/henderson" className={linkClass}>Henderson</Link> and <Link href="/locksmith/blockhouse-bay" className={linkClass}>Blockhouse Bay</Link>.</p>,
      <p key="2">Car won&apos;t start at the end of a long driveway? Our <Link href="/auto/dead-battery-assistance" className={linkClass}>jump start service</Link> and <Link href="/car-lockout" className={linkClass}>car lockout help</Link> cover Titirangi as well.</p>,
    ],
  },
  nearbySuburbs: ["Laingholm", "Woodlands Park", "Waima", "Konini", "Glen Eden", "Green Bay", "Oratia", "Parau"],
  faqs: [
    {
      question: "Do you come out to properties down long driveways in Titirangi?",
      answer: "Yes. The NZ$20 call-out fee is the same wherever you are in Titirangi. Tell us about gates, steps or parking when you call so we can find you quickly.",
    },
    {
      question: "Why are my outdoor locks getting hard to turn?",
      answer: "Damp air and grit build up inside the lock and corrode the parts. Servicing often frees it off. If the cylinder is corroded through, we quote a replacement.",
    },
    {
      question: "Can you key my house, sleepout and gate locks the same?",
      answer: "Usually, yes, if the locks use compatible cylinders. We check each one on site and tell you if any need a new cylinder to match.",
    },
    {
      question: "My key snapped in the lock. Can you get it out?",
      answer: "Yes. We extract broken keys without damaging the lock where possible, then cut you a new key or repair the lock if it's worn.",
    },
  ],
};

const blockhouseBay: Suburb = {
  slug: "blockhouse-bay",
  name: "Blockhouse Bay",
  region: "West Auckland",
  path: "/locksmith/blockhouse-bay",
  metaTitle: "Locksmith Blockhouse Bay, West Auckland",
  metaDescription: "Mobile locksmith in Blockhouse Bay for ranch slider locks, lockouts, rekeys and lock upgrades for units and homes. Flat NZ$20 call-out, quoted on site.",
  heading: "Locksmith in Blockhouse Bay, Auckland",
  subtitle: "Lockouts, sliding door locks, rekeys and security upgrades for Blockhouse Bay homes and units, from the village shops to the beach and Lynfield.",
  intro: {
    title: "Mobile Locksmith Service for Blockhouse Bay",
    image: {
      src: "/images/locations/blockhouse-bay/aluminium-sliding-door-lock-blockhouse-bay.webp",
      alt: "Silver aluminium sliding door lock with a flush pull handle, hook latch and two keys",
      title: "Ranch Slider Lock Blockhouse Bay",
      description: "An aluminium sliding door lock like those on many Blockhouse Bay homes and units.",
    },
    content: [
      <p key="1">Blockhouse Bay looks out over the Manukau Harbour, and many of its homes were built from the 1950s to the 1970s, alongside blocks of units and ownership flats. Almost every one has at least one aluminium ranch slider, and sliding door locks are some of the hardest-working locks in the house.</p>,
      <p key="2">We come to you with the tools and common parts on board. You pay a flat <strong>NZ$20 call-out fee</strong>, and we quote every job on site before work starts.</p>,
    ],
  },
  commonJobs: {
    title: "What Blockhouse Bay Customers Call Us For",
    content: [
      <p key="1">Around Blockhouse Bay, these are the calls we get most often:</p>,
      <ul key="2" className="list-disc pl-6 space-y-2">
        <li><strong>Ranch slider locks:</strong> sliding doors that won&apos;t latch, locks that have stopped catching, or lost keys. Our <Link href="/lock/lock-repair" className={linkClass}>lock repair service</Link> fixes or replaces them.</li>
        <li><strong>Locked out of the house:</strong> homes, units and flats with doors that lock behind you, opened through our <Link href="/lock/lockout" className={linkClass}>emergency lockout service</Link> with non-destructive entry first.</li>
        <li><strong>Rekeys between tenants:</strong> landlords and property managers use our <Link href="/lock/rekey" className={linkClass}>rekeying service</Link> so the last tenant&apos;s keys stop working.</li>
        <li><strong>Old doorknob locks:</strong> if you need to change house locks, our <Link href="/lock/lock-change-installation" className={linkClass}>lock replacement</Link> service swaps key-in-knob locks for a proper deadbolt.</li>
      </ul>,
    ],
  },
  local: {
    title: "Upgrading Locks on Older Units",
    image: {
      src: "/images/locations/blockhouse-bay/brass-key-in-knob-entrance-lock-blockhouse-bay.webp",
      alt: "Brass key-in-knob entrance doorknob and latch, with a key in the knob and a second key on its ring",
      title: "Doorknob Lock Upgrade Blockhouse Bay",
      description: "An older key-in-knob entrance lock of the kind still found on many Blockhouse Bay units.",
    },
    content: [
      <p key="1">Lots of older units still rely on a key-in-knob lock on the front door. They&apos;re convenient, but the latch is short and easy to force, and the knob itself can be twisted off. Adding a deadbolt, or replacing the set with a deadbolt and lever handle, is one of the most effective security upgrades for the money.</p>,
      <p key="2">If you own several units on one site, <Link href="/lock/rekey" className={linkClass}>master rekeying</Link> means each tenant&apos;s key opens only their own unit, while your key opens them all. Prefer codes to keys? We also offer <Link href="/smart-lock/smart-lock-installation" className={linkClass}>digital door lock installation</Link>, with codes you can change between tenants.</p>,
    ],
  },
  nearby: {
    title: "Areas We Cover Around Blockhouse Bay",
    content: [
      <p key="1">We regularly work in Lynfield, New Windsor, Avondale, Green Bay, Hillsborough, Waikōwhai, Mount Roskill and Wesley, and across West Auckland, including <Link href="/locksmith/new-lynn" className={linkClass}>New Lynn</Link> and <Link href="/locksmith/titirangi" className={linkClass}>Titirangi</Link>.</p>,
      <p key="2">Locked out of a car at the beach or the village shops? Our <Link href="/car-lockout" className={linkClass}>car unlock service</Link> covers Blockhouse Bay too.</p>,
    ],
  },
  nearbySuburbs: ["Lynfield", "New Windsor", "Avondale", "Green Bay", "Hillsborough", "Waikōwhai", "Mount Roskill", "Wesley"],
  faqs: [
    {
      question: "Can you fix a ranch slider that won't lock?",
      answer: "Usually, yes. It's often a worn lock, a hook that no longer lines up with the keeper, or a door that has dropped on its rollers. We diagnose it on site and quote the repair.",
    },
    {
      question: "Can I get a key for my sliding door lock?",
      answer: "Yes. If the lock takes a key, we can cut one or replace the cylinder. If it's a snib-only lock, we can fit a keyed sliding door lock instead.",
    },
    {
      question: "Can you key a block of units so I have one master key?",
      answer: "Often, yes. Each unit gets its own key and the owner's key opens all of them. We check the existing locks and quote any cylinders that need changing.",
    },
    {
      question: "How much is a locksmith call-out in Blockhouse Bay?",
      answer: "A flat NZ$20, the same as anywhere else in Auckland. The work is quoted on site before we start, and work outside normal hours costs a bit more.",
    },
  ],
};

const eastTamaki: Suburb = {
  slug: "east-tamaki",
  name: "East Tamaki",
  region: "East Auckland",
  path: "/locksmith/east-tamaki",
  metaTitle: "Locksmith East Tamaki, East Auckland",
  metaDescription: "Commercial and residential locksmith in East Tamaki for warehouse locks, commercial rekeys, master key systems and lockouts. Flat NZ$20 call-out.",
  heading: "Locksmith in East Tamaki, East Auckland",
  subtitle: "Lock changes, commercial rekeys, master key systems and lockouts for East Tamaki warehouses, offices and homes, from the industrial area to Dannemora.",
  intro: {
    title: "Mobile Locksmith Service for East Tamaki",
    image: {
      src: "/images/locations/east-tamaki/commercial-lever-lockset-euro-cylinder-east-tamaki.webp",
      alt: "Heavy-duty stainless steel commercial lever handle on a long backplate with a euro cylinder cut-out and two keys",
      title: "Commercial Door Lock East Tamaki",
      description: "A heavy-duty commercial lever lock of the kind fitted to East Tamaki warehouse and office doors.",
    },
    content: [
      <p key="1">East Tamaki is one of Auckland&apos;s biggest industrial and business areas, with warehouses, factories, trade counters and offices stretching towards Highbrook. Business doors take far more use than a front door at home, so commercial locks wear faster and need hardware built for the job.</p>,
      <p key="2">We also look after the homes in Dannemora, Golflands and East Tamaki Heights. Wherever you are, we come to you for a flat <strong>NZ$20 call-out fee</strong>, and quote every job on site before work starts.</p>,
    ],
  },
  commonJobs: {
    title: "What East Tamaki Customers Call Us For",
    content: [
      <p key="1">Around East Tamaki, these are the jobs we&apos;re asked to do most:</p>,
      <ul key="2" className="list-disc pl-6 space-y-2">
        <li><strong>Commercial lock rekeys:</strong> when staff leave, keys go missing or a unit changes tenants, a <Link href="/lock/rekey" className={linkClass}>commercial lock rekey</Link> makes old keys useless without new hardware.</li>
        <li><strong>Lock replacements:</strong> heavy-duty <Link href="/lock/lock-change-installation" className={linkClass}>lock replacement and installation</Link> for warehouse, office and roller door locks that are worn or not secure enough.</li>
        <li><strong>Door lock repair:</strong> commercial doors that won&apos;t latch or lock at the end of the day, fixed through our <Link href="/lock/lock-repair" className={linkClass}>door lock repair service</Link>.</li>
        <li><strong>Access control and keypads:</strong> <Link href="/smart-lock/smart-lock-repair-programming" className={linkClass}>programming and repairs</Link> for keypad and card locks, so you can add and remove staff codes.</li>
        <li><strong>Lockouts:</strong> offices, units and homes opened through our <Link href="/lock/lockout" className={linkClass}>emergency lockout service</Link> with non-destructive entry first.</li>
      </ul>,
    ],
  },
  local: {
    title: "Master Key Systems for Businesses",
    image: {
      src: "/images/locations/east-tamaki/master-key-and-change-keys-east-tamaki.webp",
      alt: "One brass master key on its own ring above five silver change keys laid in a row",
      title: "Master Key System East Tamaki",
      description: "A master key system lets one key open every door while each staff key opens only its own areas.",
    },
    content: [
      <p key="1">A business with a dozen doors doesn&apos;t need a dozen keys on the owner&apos;s ring. With master rekeying, each lock gets its own key for the staff who use it, while a master key opens them all. Managers can be given keys that open their own areas and nothing else.</p>,
      <p key="2">We can set up a master key system on your existing locks where the cylinders allow, and add to it as the business grows. If you&apos;d rather manage access with codes or cards, our <Link href="/smart-lock/smart-lock-installation" className={linkClass}>electronic door lock installation</Link> is another option.</p>,
    ],
  },
  nearby: {
    title: "Areas We Cover Around East Tamaki",
    content: [
      <p key="1">We regularly work in Highbrook, Ōtara, Dannemora, Golflands, Burswood, Botany Downs, East Tamaki Heights and Huntington Park, and across East Auckland, including <Link href="/locksmith/flat-bush" className={linkClass}>Flat Bush</Link>.</p>,
      <p key="2">Work vehicle locked or flat? Our <Link href="/car-lockout" className={linkClass}>vehicle lockout service</Link> and <Link href="/auto/dead-battery-assistance" className={linkClass}>jump start service</Link> cover vans and utes in East Tamaki too.</p>,
    ],
  },
  nearbySuburbs: ["Highbrook", "Ōtara", "Dannemora", "Golflands", "Burswood", "Botany Downs", "East Tamaki Heights", "Huntington Park"],
  faqs: [
    {
      question: "Can you rekey our business locks when a staff member leaves?",
      answer: "Yes. A commercial rekey changes the pins so the old key stops working, and we cut new keys for everyone who still needs one. It's usually cheaper than new locks.",
    },
    {
      question: "Can you set up a master key system on our existing locks?",
      answer: "Often, yes. We check each cylinder first. Locks that can't be master keyed get a new cylinder, and we quote everything before we start.",
    },
    {
      question: "Do you work on warehouse and roller door locks?",
      answer: "Yes. We repair and replace locks on warehouse doors, roller doors and gates. Unusual commercial hardware may need a part ordered in, and we'll tell you first.",
    },
    {
      question: "Can you come out after hours to secure a business?",
      answer: "Yes. If a lock fails at closing time or after a break-in, we can come out after hours. Work outside normal hours costs a bit more, and we tell you before we start.",
    },
  ],
};

const flatBush: Suburb = {
  slug: "flat-bush",
  name: "Flat Bush",
  region: "East Auckland",
  path: "/locksmith/flat-bush",
  metaTitle: "Locksmith Flat Bush, East Auckland",
  metaDescription: "Mobile locksmith in Flat Bush for smart door lock installation, lockouts, rekeys and lock repairs on newer homes. Flat NZ$20 call-out, quoted on site.",
  heading: "Locksmith in Flat Bush, East Auckland",
  subtitle: "Smart lock fitting, lockouts, rekeys and lock repairs for Flat Bush homes, from Ormiston Town Centre to Barry Curtis Park and Murphys Bush.",
  intro: {
    title: "Mobile Locksmith Service for Flat Bush",
    image: {
      src: "/images/locations/flat-bush/face-recognition-smart-lock-flat-bush.webp",
      alt: "Matte black push-pull smart lock with a face recognition camera, fingerprint reader and keypad",
      title: "Smart Door Lock Flat Bush",
      description: "A face recognition smart lock of the kind many Flat Bush homeowners fit to newer front doors.",
    },
    content: [
      <p key="1">Flatbush, or Flat Bush, is one of Auckland&apos;s newest suburbs, and most of its homes were built in the last twenty years. Many have aluminium front doors with multipoint locks, internal garage access, and a growing number have smart locks. Newer hardware needs a locksmith who knows how it fits together.</p>,
      <p key="2">We come to you anywhere in Flat Bush. You pay a flat <strong>NZ$20 call-out fee</strong>, and every job is quoted on site before work begins.</p>,
    ],
  },
  commonJobs: {
    title: "What Flat Bush Customers Call Us For",
    content: [
      <p key="1">Around Flat Bush, these are our most common jobs:</p>,
      <ul key="2" className="list-disc pl-6 space-y-2">
        <li><strong>Smart door lock installation:</strong> keypad, fingerprint and face recognition locks fitted through our <Link href="/smart-lock/smart-lock-installation" className={linkClass}>smart lock installation</Link> service, matched to your door type.</li>
        <li><strong>Smart lock problems:</strong> locks that won&apos;t accept codes or have lost their settings, fixed through <Link href="/smart-lock/smart-lock-repair-programming" className={linkClass}>smart lock repair and programming</Link>.</li>
        <li><strong>Residential rekeys:</strong> a <Link href="/lock/rekey" className={linkClass}>lock rekey</Link> after buying a home, so the builder&apos;s and previous owners&apos; keys stop working.</li>
        <li><strong>House lockouts:</strong> locked out of the house? Our <Link href="/lock/lockout" className={linkClass}>lockout service</Link> uses non-destructive entry first.</li>
      </ul>,
    ],
  },
  local: {
    title: "Securing the Internal Garage Door",
    image: {
      src: "/images/locations/flat-bush/chrome-deadbolt-strike-plate-flat-bush.webp",
      alt: "Satin chrome deadbolt with its interior thumb-turn and a long steel reinforcing strike plate",
      title: "Garage Access Door Lock Flat Bush",
      description: "A deadbolt and reinforced strike plate for the internal garage door common in Flat Bush homes.",
    },
    content: [
      <p key="1">Most Flat Bush homes have a door straight from the garage into the house, and it often has nothing more than a passage latch. If the garage door is opened or its remote is stolen from a car, that internal door is all that stands between a burglar and the house.</p>,
      <p key="2">Fitting a deadbolt with a reinforced strike plate is a quick, affordable upgrade through our <Link href="/lock/lock-change-installation" className={linkClass}>lock installation service</Link>. We can key it alike with your front door so you don&apos;t need another key.</p>,
    ],
  },
  nearby: {
    title: "Areas We Cover Around Flat Bush",
    content: [
      <p key="1">We regularly work in Ormiston, Botany Downs, Dannemora, East Tamaki Heights, Clover Park, Totara Heights, Chapel Downs and Northpark, and across East Auckland, including <Link href="/locksmith/east-tamaki" className={linkClass}>East Tamaki</Link>.</p>,
      <p key="2">Locked out of a car at Ormiston or Botany? Our <Link href="/car-lockout" className={linkClass}>car lockout service</Link> covers Flat Bush as well.</p>,
    ],
  },
  nearbySuburbs: ["Ormiston", "Botany Downs", "Dannemora", "East Tamaki Heights", "Clover Park", "Totara Heights", "Chapel Downs", "Northpark"],
  faqs: [
    {
      question: "Can you fit a smart lock to an aluminium front door?",
      answer: "Often, yes. Many aluminium doors have multipoint locks, which need a smart lock designed for them. We check your door and recommend locks that will fit properly.",
    },
    {
      question: "My smart lock's batteries died and I'm locked out. Can you help?",
      answer: "Yes. Many smart locks have a backup key or emergency power contacts. If not, we use non-destructive entry where we can, then get the lock working again.",
    },
    {
      question: "Should I rekey a new-build home?",
      answer: "It's a good idea. Builders, trades and agents may all have had keys. A rekey makes sure only your keys work, and costs less than new locks.",
    },
    {
      question: "Can you add a deadbolt to my internal garage door?",
      answer: "Yes. We fit a deadbolt with a reinforced strike plate and can key it to match your front door. We check the door first and quote before drilling.",
    },
  ],
};

const karaka: Suburb = {
  slug: "karaka",
  name: "Karaka",
  region: "South Auckland",
  path: "/locksmith/karaka",
  metaTitle: "Locksmith Karaka, South Auckland",
  metaDescription: "Mobile locksmith in Karaka for lifestyle block gates and sheds, new-build rekeys, lockouts and lock changes. Flat NZ$20 call-out, quoted on site.",
  heading: "Locksmith in Karaka, South Auckland",
  subtitle: "Lockouts, rekeys, gate and shed locks and lock upgrades for Karaka homes and lifestyle blocks, from Karaka Lakes and Karaka Harbourside to Kingseat Road.",
  intro: {
    title: "Mobile Locksmith Service for Karaka",
    image: {
      src: "/images/locations/karaka/laminated-steel-padlock-chain-karaka.webp",
      alt: "Heavy-duty laminated steel padlock with a ring of three keys and a coiled galvanised chain",
      title: "Gate and Shed Padlock Karaka",
      description: "A heavy-duty padlock and chain for the gates, sheds and stables on Karaka lifestyle blocks.",
    },
    content: [
      <p key="1">Karaka is two places in one. There are lifestyle blocks, horse properties and farms with gates, sheds, stables and tack rooms, and there are the newer subdivisions at Karaka Lakes and Karaka Harbourside full of modern homes. We work on both, from a seized gate padlock to a smart lock on a brand-new front door.</p>,
      <p key="2">We come to you, however far down the road. You pay a flat <strong>NZ$20 call-out fee</strong>, and every job is quoted on site before work starts.</p>,
    ],
  },
  commonJobs: {
    title: "What Karaka Customers Call Us For",
    content: [
      <p key="1">Around Karaka, these are the calls we get most often:</p>,
      <ul key="2" className="list-disc pl-6 space-y-2">
        <li><strong>Shed, stable and tack room locks:</strong> new or replacement locks through our <Link href="/lock/lock-change-installation" className={linkClass}>lock installation service</Link>, keyed alike where the hardware allows.</li>
        <li><strong>Seized and weathered locks:</strong> outdoor locks that won&apos;t turn, fixed or replaced through our <Link href="/lock/lock-repair" className={linkClass}>lock repair service</Link>.</li>
        <li><strong>Rekeying a new home:</strong> a <Link href="/lock/rekey" className={linkClass}>residential rekey</Link> after moving in, so no one else&apos;s keys still work.</li>
        <li><strong>Smart and digital locks:</strong> <Link href="/smart-lock/smart-lock-installation" className={linkClass}>digital door lock installation</Link> for new homes in Karaka Lakes and Karaka Harbourside.</li>
        <li><strong>Lockouts:</strong> house and outbuilding lockouts, opened through our <Link href="/lock/lockout" className={linkClass}>emergency lockout service</Link> with non-destructive entry first.</li>
      </ul>,
    ],
  },
  local: {
    title: "Keys After Moving Into a New Build",
    image: {
      src: "/images/locations/karaka/new-build-lever-set-construction-key-karaka.webp",
      alt: "Satin nickel entrance lever set with one yellow-capped key and two black-capped keys",
      title: "New Build Lock Rekey Karaka",
      description: "A new-build entrance lock with its construction key and homeowner keys, common in new Karaka homes.",
    },
    content: [
      <p key="1">New homes change hands a lot before you get the keys. Builders, subcontractors, cleaners and real estate agents may all have had access. Some new locks use construction keys that stop working once the homeowner&apos;s key is used, but many don&apos;t, and it&apos;s hard to know which you have.</p>,
      <p key="2">A rekey removes the doubt. We change the pins in your existing locks, cut fresh keys, and can key the front door, garage and back doors alike. If any lock is cheap or flimsy, we&apos;ll suggest a <Link href="/lock/lock-change-installation" className={linkClass}>lock change</Link> instead.</p>,
    ],
  },
  nearby: {
    title: "Areas We Cover Around Karaka",
    content: [
      <p key="1">We regularly work in Papakura, Drury, Hingaia, Kingseat, Patumahoe, Takanini, Pukekohe and Waiau Pa, and across South and East Auckland, including <Link href="/locksmith/flat-bush" className={linkClass}>Flat Bush</Link>.</p>,
      <p key="2">Ute or float car won&apos;t start? Our <Link href="/auto/dead-battery-assistance" className={linkClass}>jump start service</Link> and <Link href="/car-lockout" className={linkClass}>car lockout service</Link> cover Karaka too.</p>,
    ],
  },
  nearbySuburbs: ["Papakura", "Drury", "Hingaia", "Kingseat", "Patumahoe", "Takanini", "Pukekohe", "Waiau Pa"],
  faqs: [
    {
      question: "Do you come out to lifestyle blocks in Karaka?",
      answer: "Yes. The NZ$20 call-out fee is the same for rural properties. Let us know about gates or access when you call so we can find you quickly.",
    },
    {
      question: "Can you key my house, shed and stable locks the same?",
      answer: "Usually, if the locks use compatible cylinders. We check each lock on site and tell you if any need a new cylinder to match.",
    },
    {
      question: "My padlock has seized. Can you cut it off and replace it?",
      answer: "Yes. We remove seized or lost-key padlocks and supply a heavy-duty replacement, keyed to match your other locks where possible.",
    },
    {
      question: "Do I need to rekey a brand-new house?",
      answer: "It's worth it if you can't be sure who has had keys. A rekey is quick, costs less than new locks, and means only your keys work.",
    },
  ],
};

/** The suburb landing pages, in the order the footer lists them. */
export const suburbs = { albany, takapuna, birkenhead, henderson, newLynn, titirangi, blockhouseBay, eastTamaki, flatBush, karaka } as const;

/** Suburb links grouped by region, for the footer's Popular Links dropdown. */
export const suburbLinksByRegion: { region: Suburb["region"]; links: { href: string; label: string }[] }[] = [
  { region: "North Shore", links: [albany, takapuna, birkenhead].map((s) => ({ href: s.path, label: `Locksmith ${s.name}` })) },
  { region: "West Auckland", links: [henderson, newLynn, titirangi, blockhouseBay].map((s) => ({ href: s.path, label: `Locksmith ${s.name}` })) },
  { region: "East Auckland", links: [eastTamaki, flatBush].map((s) => ({ href: s.path, label: `Locksmith ${s.name}` })) },
  { region: "South Auckland", links: [karaka].map((s) => ({ href: s.path, label: `Locksmith ${s.name}` })) },
];
