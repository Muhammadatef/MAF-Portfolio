// ============================================================
// MAF — AI Portfolio data
// Edit this file to update everything the chatbot says.
// ============================================================

export const profile = {
  name: 'Mohamed Atef Fahmy',
  shortName: 'Fahmi',
  title: 'Senior Data Engineer',
  titles: [
    'Senior Data Engineer',
    'Certified Azure Data Engineer',
    'Football Data Engineer',
    'Web Scraping Expert',
  ],
  location: 'Abu Dhabi, UAE',
  tagline:
    'I build data platforms that national statistics run on — and I teach others to do the same.',
  email: 'muhamedfahmy7474@gmail.com',
  github: 'https://github.com/Muhammadatef',
  linkedin: 'https://www.linkedin.com/in/mohamed-atef-fahmy-khalil/',
  medium: 'https://medium.com/@muhamedfahmy7474',
  bootcampUrl: 'https://mafbootcamp.com',
  resume: '/resume.pdf',
  favoriteQuote: "Yesterday I was clever, so I wanted to change the world. Today I'm wise, so I'm changing myself. — Rumi",
  about: [
    "I'm Fahmi — a Senior Data Engineer based in Abu Dhabi with 6+ years of experience turning messy, large-scale data into systems governments and enterprises rely on.",
    'Today I engineer the data platform behind national economic indicators at the Statistics Centre – Abu Dhabi (SCAD): 95+ production web scraping pipelines feeding CPI and retail price indices.',
    "Before that I optimized telecom-scale Spark pipelines at e& (Etisalat) — including cutting a 16-hour ETL job down to 2 hours — and built enterprise data infrastructure at LigaData.",
    "I'm a why-first learner: I care about the reasoning behind systems, not just the mechanics. Off the keyboard you'll find me at the piano learning Chopin, meditating, watching Arsenal each weekend, or writing on Medium.",
  ],
  fun: [
    "⚽ Die-hard Arsenal fan — I merge football with data: studied Beltagy's Game Analysis course, Mckay Johnes' Python Football Analysis, built EPL Analytics Platform & Arsenal ETL pipeline.",
    '🍥 Naruto fan — my open-source privacy tool is literally named Kakashi, after the Copy Ninja who hides what matters.',
    '🎹 Learning piano on a Roland FP-10, slowly working toward Chopin and exploring cinema music.',
    '📚 Constant learner: reading books, writing reflective and technical articles on Medium (English & Arabic).',
    '🧘 Daily meditation practice — I even wrote about how it made me a better data engineer.',
    '💪 Regular gym-goer — balancing the sedentary data engineering life.',
    '🎬 Anime and cinema music enthusiast.',
  ],
}

export const experience = [
  {
    role: 'Senior Data Engineer',
    company: 'Statistics Centre – Abu Dhabi (SCAD)',
    via: 'via Reach Employment Services',
    location: 'Abu Dhabi, UAE',
    period: '2025 — Present',
    highlights: [
      'Own 95+ production web scraping pipelines feeding national economic indicators (CPI, retail price indices)',
      'Dimensional modeling and data warehousing for statistical products on a lakehouse stack',
      'Stack: Python, Airflow, Databricks, Delta Lake, Presto/Trino, MySQL, Scrapy, Selenium, Docker',
    ],
  },
  {
    role: 'Senior Data Engineer',
    company: 'e& (Etisalat)',
    via: '',
    location: 'Dubai, UAE',
    period: 'Nov 2024 — 2025',
    highlights: [
      'Reduced a core Spark/Scala ETL pipeline runtime from 16 hours to 2 hours',
      'Designed real-time and ad-hoc campaign pipelines with Spark, Hive, Impala and HDFS',
      'Maintained a custom ETL framework with dynamic Scala compilation for business logic',
      'Enabled real-time customer segmentation at telecom scale',
    ],
  },
  {
    role: 'Data Engineer',
    company: 'LigaData',
    via: '',
    location: 'Remote — US company',
    period: 'Oct 2022 — Nov 2024',
    highlights: [
      'Ingested and transformed large datasets from diverse sources into HDFS',
      'Cut report generation time by 40% by automating workflows with Python, Hive and Power BI',
      'Contributed to a data fabric product on Kubernetes for secure, scalable integration',
    ],
  },
  {
    role: 'Freelance Data Engineer & Analyst',
    company: 'Upwork',
    via: '',
    location: 'Remote',
    period: 'Jun 2022 — Dec 2023',
    highlights: [
      'Built web-scraping ETL for large-scale job market data',
      'Deployed ML forecasting models reaching 85% accuracy',
      'Consistent 5-star client feedback',
    ],
  },
  {
    role: 'Data Analyst & Operations',
    company: 'Cube',
    via: '',
    location: 'Cairo, Egypt',
    period: 'Aug 2019 — Sep 2021',
    highlights: [
      'Automated data processes with Python and SQL, cutting manual work by 40%',
      'Built Power BI dashboards used across the organization',
    ],
  },
]

export const projects = [
  {
    name: 'Kakashi',
    kind: 'Open source · Privacy',
    description:
      'A CLI privacy layer that masks secrets, credentials and PII in your files before AI agents and LLMs ever see them. Named after the Copy Ninja.',
    tech: ['Python', 'CLI', 'Regex/NER', 'DevSecOps'],
    link: 'https://github.com/Muhammadatef/kakashi',
  },
  {
    name: 'AWS Retail Data ETL Pipeline',
    kind: 'Cloud · AWS',
    description:
      'Production-grade ETL pipeline on AWS for retail data processing, demonstrating end-to-end data engineering on cloud infrastructure.',
    tech: ['AWS', 'S3', 'Glue', 'Redshift', 'Lambda', 'Python'],
    link: 'https://github.com/Muhammadatef/AWS-Retail-Data-ETL-Pipeline',
  },
  {
    name: 'Covid-19 Analysis Using Azure',
    kind: 'Cloud · Azure',
    description:
      'End-to-end data engineering solution on Azure for COVID-19 data analysis, showcasing Azure Data Factory, Databricks, and analytics workflows.',
    tech: ['Azure', 'Data Factory', 'Databricks', 'Data Lake', 'Python'],
    link: 'https://github.com/Muhammadatef/Covid-19-Analysis-Using-Azure',
  },
  {
    name: 'EPL Analytics Platform',
    kind: 'Football analytics',
    description:
      'End-to-end Premier League analytics platform: ingestion, warehouse modeling, and dashboards for match and player intelligence.',
    tech: ['Python', 'Airflow', 'dbt', 'DWH', 'Dashboards'],
    link: 'https://github.com/Muhammadatef',
  },
  {
    name: 'MAF Bootcamp',
    kind: 'Education · Abu Dhabi',
    description:
      'A 4-month, on-site program in Abu Dhabi that takes you from Linux to Kafka and into your first Data Engineering job.',
    tech: ['Linux', 'Hadoop', 'Airflow', 'Spark', 'Kafka'],
    link: 'https://mafbootcamp.com',
  },
  {
    name: 'Arsenal FC Data Pipeline',
    kind: 'Football analytics',
    description:
      'End-to-end pipeline for Arsenal FC data — scraping, modeling and analysis. Written up as a walkthrough on Medium.',
    tech: ['Python', 'Airflow', 'PostgreSQL', 'Docker'],
    link: 'https://github.com/Muhammadatef/ArsenalFC-Data-Pipeline-Project',
  },
  {
    name: 'Dimensional Modeling Practical Guide',
    kind: 'Educational · Data Warehousing',
    description:
      'Comprehensive practical guide to dimensional modeling with real-world examples, star schemas, and best practices for data warehouse design.',
    tech: ['Data Modeling', 'Star Schema', 'Kimball', 'SQL'],
    link: 'https://github.com/Muhammadatef/Dimensional-Modeling-Practiical-guide',
  },
  {
    name: 'Spark Demos & Learning Resources',
    kind: 'Educational · Big Data',
    description:
      'Collection of Apache Spark demos, important notes, and practical examples for mastering distributed data processing (Garage Education + Spark Recap).',
    tech: ['Apache Spark', 'PySpark', 'Scala', 'Big Data'],
    link: 'https://github.com/Muhammadatef/Garage-Education-Spark-Demos',
  },
  {
    name: 'DE Roadmap for Arabic Speakers',
    kind: 'Open source · Community',
    description:
      'A complete Arabic-first Data Engineering roadmap — the curriculum backbone behind the bootcamp.',
    tech: ['Curriculum', 'Linux → Kafka'],
    link: 'https://github.com/Muhammadatef/Data-Engineering-Roadmap-For-Arabic-Speaker',
  },
]

export const skills = [
  {
    group: 'Data Engineering',
    items: ['Python', 'SQL', 'Apache Spark', 'Scala', 'Airflow', 'Kafka', 'dbt', 'ETL/ELT design'],
  },
  {
    group: 'Lakehouse & Warehousing',
    items: ['Databricks', 'Delta Lake', 'Presto / Trino', 'Hive', 'Dimensional modeling (Kimball)', 'MySQL', 'PostgreSQL'],
  },
  {
    group: 'Cloud & Platform',
    items: ['Azure (DP-203 certified)', 'AWS', 'Docker', 'Kubernetes', 'Linux', 'CI/CD'],
  },
  {
    group: 'Scraping & Ingestion',
    items: ['Scrapy', 'Selenium', '95+ production pipelines', 'Anti-bot strategies', 'Data quality monitoring'],
  },
  {
    group: 'Analytics & ML',
    items: ['Power BI', 'FastAPI', 'ML forecasting', 'Computer vision (YOLOv8 / ByteTrack)'],
  },
]

export const certifications = [
  { name: 'Microsoft Azure Data Engineer Associate (DP-203)', org: 'Microsoft' },
  { name: 'AWS Cloud Practitioner', org: 'Amazon Web Services' },
  { name: 'Data Engineering Zoomcamp', org: 'DataTalks.Club' },
  { name: 'AWS Data Engineering Nanodegree', org: 'Udacity' },
  { name: 'Data Streaming Nanodegree', org: 'Udacity' },
  { name: 'Game Analysis Course', org: 'Beltagy Football Analysis Services' },
  { name: 'Python Football Data Analysis', org: 'Mckay Johnes' },
]

export const achievements = [
  {
    title: 'ETL Performance Optimization',
    organization: 'e& (Etisalat)',
    year: '2025',
    description: 'Reduced batch ETL pipeline processing time from 18 hours to 3 hours using SQL and Spark optimization techniques',
  },
  {
    title: 'Development Efficiency Enhancement',
    organization: 'LigaData',
    year: '2023',
    description: 'Developed bash and Python programs reducing data engineering team development time from 5 hours to 1.5 hours per pipeline',
  },
  {
    title: 'Machine Learning Excellence',
    organization: 'Upwork - Freelance',
    year: '2022-2023',
    description: 'Developed and deployed ML models to predict trends with 85% accuracy, earned consistent 5-star feedback for timely deliverables',
  },
  {
    title: 'Mentorship Excellence',
    organization: 'Open Source Roadmap',
    year: '2022-present',
    description: 'Led mentorship programs and workshops for aspiring data engineers, contributing to community growth through hands-on guidance and writing technical articles on Medium',
  },
]

export const bootcamp = {
  name: 'MAF Bootcamp',
  url: 'https://mafbootcamp.com',
  headline: '4 months. Zero to Data Engineer. In Abu Dhabi.',
  description:
    'An on-site, hands-on Data Engineering workshop I run in Abu Dhabi. Small cohorts, a real production-style stack, and one goal: get you job-ready for the UAE market.',
  curriculum: [
    'Linux',
    'Hadoop',
    'Docker',
    'Airflow',
    'Databases & DWH',
    'Hive',
    'Spark (Batch & Streaming)',
    'Kafka',
    'Capstone project',
  ],
}

// System prompt for the optional real-AI mode (api/chat)
export function buildSystemPrompt(): string {
  return `You are the AI version of ${profile.name} ("Fahmi"), a ${profile.title} in ${profile.location}, answering visitors on his portfolio website. Speak in first person as Fahmi: warm, direct, a bit playful, technically sharp. Keep answers short (2-5 sentences) unless asked for depth. Never invent facts.

ABOUT: ${profile.about.join(' ')}

EXPERIENCE: ${experience
    .map((e) => `${e.role} @ ${e.company} ${e.via} (${e.period}): ${e.highlights.join('; ')}`)
    .join(' | ')}

PROJECTS: ${projects.map((p) => `${p.name} — ${p.description} ${p.link}`).join(' | ')}

SKILLS: ${skills.map((s) => `${s.group}: ${s.items.join(', ')}`).join(' | ')}

CERTIFICATIONS: ${certifications.map((c) => c.name).join(', ')}

ACHIEVEMENTS: ${achievements.map((a) => `${a.title} @ ${a.organization} (${a.year}): ${a.description}`).join(' | ')}

BOOTCAMP: ${bootcamp.name} (${bootcamp.url}) — ${bootcamp.headline} ${bootcamp.description} Curriculum: ${bootcamp.curriculum.join(' → ')}

FUN: ${profile.fun.join(' ')}

CONTACT: email ${profile.email}, GitHub ${profile.github}, LinkedIn ${profile.linkedin}, Medium ${profile.medium}. Resume available at ${profile.resume}.

If asked something unrelated to Fahmi, politely steer back to the portfolio.`
}
