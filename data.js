export const hero = {
  name: "Clarissa Choi",
  subtitle: "Math/CS @ NYU",
  tagline: "From dance to Math + CS. Interested in technology, data, and building intuitive software.",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/clarissa-choi", icon: "fa-brands fa-linkedin" },
    { label: "GitHub", href: "https://github.com/clarissachoi", icon: "fa-brands fa-github" },
    { label: "Resume", href: "assets/Resume - Clarissa Choi.pdf", icon: "fa-solid fa-file" },
    { label: "Email", href: "mailto:clarissaschoi@gmail.com", icon: "fa-solid fa-envelope" }
  ]
};

// Photos arranged around the hero content. Add/remove/edit entries here —
// nothing else needs to change. `side` picks left or right; `top`/`offset`
// position the photo within the hero (as % of the hero box); `rotate` and
// `width` set its tilt and size; `ratio` is the crop shape (w/h) the photo
// is cropped to; `z` controls stacking when photos overlap; `caption`
// renders below the photo within its card.
export const heroPhotos = [
  {
    src: "assets/images/gdg.png",
    alt: "",
    caption: "GDG @ NYU Tech Leads",
    side: "left",
    top: "4%",
    offset: "4%",
    rotate: -7,
    width: 190,
    ratio: 6 / 5,
    z: 2
  },
  {
    src: "assets/images/climb.png",
    alt: "",
    caption: "projecting a climb",
    side: "left",
    top: "40%",
    offset: "10%",
    rotate: 5,
    width: 150,
    ratio: 3 / 4,
    z: 1
  },
  {
    src: "assets/images/yoga.png",
    alt: "",
    caption: "practicing yoga",
    side: "right",
    top: "30%",
    offset: "17%",
    rotate: -6,
    width: 165,
    ratio: 3 / 4,
    z: 1
  },
  {
    src: "assets/images/hackathon.png",
    alt: "",
    caption: "my first hackathon!",
    side: "right",
    top: "8%",
    offset: "3%",
    rotate: 8,
    width: 180,
    ratio: 6 / 5,
    z: 2
  },
  {
    src: "assets/images/IMG_5042.JPG",
    alt: "",
    caption: "graduation!",
    side: "right",
    top: "65%",
    offset: "2%",
    rotate: 10,
    width: 200,
    ratio: 6 / 5,
    z: 1 
  }
];

// Project cards. `summary` is the description, `highlights` the bullet
// points. Each link in `links` shows as a button on the card; leave it
// null to hide it.
export const PROJECTS = [
  {
    id: "01",
    name: "TRADINGJOE",
    status: "DEPLOYED",
    summary: "A trading and bartering platform built for NYU students. Students list items they no longer need, browse what others are offering, and arrange trades or swaps on campus without going through a third-party marketplace.",
    highlights: [
      "Built the mobile app with React Native and Expo",
      "Designed a REST API with Express backed by MongoDB",
      "Implemented listings, search, and trade requests between users"
    ],
    stack: ["React Native", "Expo", "Express", "MongoDB"],
    links: {
      live: "https://trading-joe-5aa4.vercel.app/",
      github: "https://github.com/clammy424/tradingjoe"
    }
  },
  {
    id: "02",
    name: "em.care",
    status: "DEPLOYED",
    summary: "An end to end solution for managing your health, bringing appointments, records, and day-to-day care into one place. Won 2nd Place at the Google X Ruth.AI: AI for Social Good Hackathon.",
    highlights: [
      "Built the web app in React and TypeScript",
      "Developed the Python backend and AI features",
      "Designed and shipped the full product within the hackathon timeframe"
    ],
    stack: ["Typescript", "Python", "React"],
    links: {
      live: "https://em-care.vercel.app/",
      github: "https://github.com/clammy424/em"
    }
  },
  {
    id: "03",
    name: "ATLAS",
    status: "CURRENTLY BUILDING",
    summary: "A social travel app for planning trips with friends. Groups collect ideas, build an itinerary together, and keep every plan in one shared space instead of scattered group chats.",
    highlights: [
      "Building a shared, collaborative itinerary",
      "Designing the group planning flow",
      "Setting up the front end with React and Vite"
    ],
    stack: ["React", "Vite"],
    links: {
      live: null,
      github: "https://github.com/clammy424/atlas"
    }
  }
];

export const experience = [
  {
    id: "deloitte",
    period: "September 2025 – March 2026",
    company: "Deloitte",
    role: "Data Analytics Intern",
    bullets: [
      "Validated AI-generated code and query outputs by testing against sample data, implementing input validation and try/catch error handing in the pipeline, ensuring accuracy before applying scripts to production datasets",
      "Built reusable and modular Python scripts using internal AI tools to automate a manual process, increasing efficiency by 70%",
      "Accelerated complex SQL query drafting with AI assistance and refined logic to ensure accuracy across large-scale datasets, improving productivity by over 25%"
    ]
  },
  {
    id: "tutoring",
    period: "September 2020 – Present",
    company: "Freelance Tutoring",
    role: "Math/CS Tutor and University Guidance Counsellor",
    bullets: [
        "Tutored middle and high school students in mathematics and computer science, adapting lesson plans to each student's learning style, readiness, and interests while aligning with their school curriculum, helping increase grades by over 50%",
        "Applied a Socratic teaching approach by guiding students through questioning and problem-solving, helping them build strong analytical thinking and a deeper conceptual understanding rather than relying on memorization",
        "Fostered curiosity and confidence by creating engaging, personalized learning experiences that strengthened students' fundamental understanding of core mathematical and computer science concepts"
    ]
  },
  {
    id: "gdg",
    period: "September 2025 - December 2025",
    company: "Google Developer Group",
    role: "Tech Lead",
    bullets: [
        "Mentored and guided 4 team members through technical concepts by explaining Node.js and Firebase implementation details, helping less experienced members apply them correctly in their assigned tasks",
        "Broke down large project tasks into manageable units by decomposing high-level features into smaller, assignable specified pieces of work for the team by assigning tasks based on scope and team capacity, ensuring balanced workloads throughout the sprint cycle",
        "Enabled smooth team collaboration by managing version control through Git and GitHub, coordinating code changes and reducing merge conflicts across contributors"
    ]
  },
  {
    id: "crowe",
    period: "July 2023 - August 2023",
    company: "Crowe",
    role: "Audit Intern",
    bullets: [
      "Organized key documents, including financial and bank statements, in preparation for year-end auditor reports",
      "Reviewed 12 companies’ bookkeeping and ran background checks on shareholders and board members"
    ]
  }
];

// Collage of photo cards that wraps around the about text, then continues
// below it (all cards share a height, so it fits on one screen). Same card
// style as heroPhotos. `ratio` is the crop shape (w/h), so it also sets the
// card's width; `drop` nudges a card down (px) and `rotate` tilts it, which
// keeps the rows loose rather than grid-like. Optional `link` adds a link on
// its own line under the caption. Order = reading order.
export const aboutPhotos = [
  { src: "assets/images/about/dance.png", caption: "dancing outside", ratio: 4 / 5, drop: 0, rotate: -3 },
  { src: "assets/images/about/bike.jpg", caption: "tandem biking", ratio: 4 / 3, drop: 14, rotate: 2 },
  { src: "assets/images/about/crochet.JPG", caption: "crocheted beanie", ratio: 3 / 4, drop: 4, rotate: -2 },
  { src: "assets/images/about/grad.jpg", caption: "grad day!", ratio: 1, drop: 10, rotate: 3 },
  { src: "assets/images/about/headstand.jpg", caption: "headstands", ratio: 3 / 4, drop: 0, rotate: -3 },
  { src: "assets/images/about/cardigan.png", caption: "knitted a cardigan", ratio: 4 / 3, drop: 12, rotate: 2 },
  { src: "assets/images/about/yellow.png", caption: "choreographed a piece!", link: { href: "https://www.youtube.com/watch?v=3mnz4_r7KPc", text: "(check it out)" }, ratio: 3 / 2, drop: 0, rotate: -2 },
  { src: "assets/images/about/breakfast.jpg", caption: "brunch for my friends <3", ratio: 4 / 3, drop: 14, rotate: 3 },
  { src: "assets/images/about/dessert.JPG", caption: "dessert", ratio: 1, drop: 4, rotate: -2 }
];

export const about = {
  heading: "A LITTLE ABOUT ME",
  intro: [
    "Hi! I’m Clarissa! I'm a recent NYU graduate with my bachelor’s in Computer Science and Mathematics.",
    "I love building software that’s intuitive, useful, and centered on the people using it. For me, good engineering starts with understanding real problems, especially the ones that matter, and I’m happiest when what I build makes someone’s day a little easier.",
    "At my core, I’m someone who thrives on community and connection. Outside of code, I’m a dancer and a creative: you’ll often find me knitting or crocheting, cooking up something new in the kitchen, or hosting a dinner party for friends (nothing beats a full table and good conversation). Lately I’ve also taken up climbing, which has been a fun way to keep learning and to meet new people.",
    "Whether I’m writing code, dancing, or plating dinner, I’m drawn to making things that bring people together.",
    'Let’s connect! Reach out through email at <a href="mailto:clarissaschoi@gmail.com">clarissaschoi@gmail.com</a> or find me on <a href="https://linkedin.com/in/clarissa-choi" target="_blank" rel="noopener">LinkedIn</a>.'
  ],
};

// Skills mind map. Category order here is the clockwise order around the
// hub. Each skill's size and shade are derived from its strength; shades
// come from strengthTiers below.
export const skillsData = [
  { title: "Programming Languages", skills: [
    { name: "Python", strength: 100 },
    { name: "JavaScript", strength: 100 },
    { name: "SQL", strength: 100 },
    { name: "HTML / CSS", strength: 85 },
    { name: "Java", strength: 80 },
  ]},
  { title: "Frameworks & APIs", skills: [
    { name: "React", strength: 90 },
    { name: "Node.js", strength: 85 },
    { name: "Flask", strength: 85 },
    { name: "REST APIs", strength: 85 }
  ]},
  { title: "Databases", skills: [
    { name: "MongoDB", strength: 100 },
    { name: "PostgreSQL", strength: 85 },
    { name: "Schema Design", strength: 80 }
  ]},
  { title: "DevOps & Tools", skills: [
    { name: "Git & GitHub", strength: 100 },
    { name: "Docker", strength: 85 },
    { name: "Deployment", strength: 75 }
  ]},
  { title: "AI-Assisted Development", skills: [
    { name: "AI-assisted coding", strength: 100 },
    { name: "AI Code Debugging", strength: 85 },
    { name: "Spec & Rules Files", strength: 85 }
  ]},
  { title: "Automation & Data", skills: [
    { name: "Scripting", strength: 90 },
    { name: "Process Automation", strength: 85 },
    { name: "Data Validation", strength: 85 },
    { name: "Data Pipelines", strength: 75 }
  ]},
  { title: "Professional Skills", skills: [
    { name: "Teamwork", strength: 90 },
    { name: "Communication", strength: 90 },
    { name: "Technical Mentoring", strength: 90 },
    { name: "Leadership", strength: 85 },
    { name: "Agile Workflows", strength: 80 }
  ]}
];

// Strength tiers, highest first. A skill takes the first tier whose `min`
// it meets; stronger skills are darker. Every shade passes WCAG AA (4.5:1)
// on the cream background.
export const strengthTiers = [
  { min: 100, colour: "#161616" },
  { min: 90,  colour: "#3d3d3d" },
  { min: 80,  colour: "#595959" },
  { min: 0,   colour: "#6e6e6e" }
];
