export const hero = {
  name: "Clarissa Choi",
  subtitle: "Math/CS @ NYU",
  tagline: "From dance to Math + CS. Interested in technology, data, and solving interesting problems.",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/...", icon: "fa-brands fa-linkedin" },
    { label: "GitHub", href: "https://github.com/...", icon: "fa-brands fa-github" },
    { label: "Resume", href: "assets/resume.pdf", icon: "fa-solid fa-file" },
    { label: "Email", href: "mailto:clarissaschoi@gmail.com", icon: "fa-solid fa-envelope" }
  ]
};

export const PROJECTS = [
  {
    id: "01",
    name: "TRADINGJOE",
    status: "DEPLOYED",
    summary: "A trading and bartering platform built for NYU students.",
    stack: ["React Native", "Expo", "Express", "MongoDB"],
    demo: {
      type: "video",
      src: null
    },
    links: {
      live: "https://trading-joe-5aa4.vercel.app/",
      github: "https://github.com/clammy424/tradingjoe"
    }
  },
  {
    id: "02",
    name: "ATLAS",
    status: "CURRENTLY BUILDING",
    summary: "A social travel app for planning trips with friends.",
    stack: ["React", "Vite"],
    demo: { type: null, src: null },
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

export const about = {
  heading: "A LITTLE ABOUT ME",
  intro: "Short personal introduction about my background, design philosophy, and what drives my work."
};