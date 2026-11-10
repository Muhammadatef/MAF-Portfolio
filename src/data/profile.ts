// ============================================================
// MAF — Portfolio data
// Single source of truth for the page AND the chatbot.
// Edit this file to update everything.
// ============================================================

export const profile = {
  name: 'Mohamed Atef Fahmy',
  shortName: 'Fahmi',
  title: 'Senior Data Engineer',
  titles: [
    'Senior Data Engineer',
    'Streaming & Batch at scale',
    'ML & Agent Infrastructure',
    'Football Data Engineer',
    'Mentor & Bootcamp Founder',
  ],
  location: 'Abu Dhabi, UAE',
  tagline:
    'I build data platforms that national statistics run on — and I teach others to do the same.',
  summary:
    'Senior Data Engineer with 6+ years building large-scale batch and streaming pipelines in Python, Scala and SQL. I treat data systems as software: tested, containerised, deployed through CI/CD and monitored in production.',
  email: 'muhamedfahmy7474@gmail.com',
  github: 'https://github.com/Muhammadatef',
  linkedin: 'https://www.linkedin.com/in/mohamed-atef-fahmy-khalil/',
  medium: 'https://medium.com/@muhamedfahmy7474',
  resume: '/resume.pdf',
  favoriteQuote:
    "Yesterday I was clever, so I wanted to change the world. Today I'm wise, so I'm changing myself. — Rumi",
  about: [
    "I'm Fahmi — a Senior Data Engineer based in Abu Dhabi with 6+ years of experience turning messy, large-scale data into systems governments and enterprises rely on.",
    'Today at the Statistics Centre – Abu Dhabi (SCAD) I own 95+ production pipelines ingesting price data from 75+ websites and APIs, feeding the national Consumer Price Index — alongside ML infrastructure: MLflow tracking, a deep-learning synthetic data framework and LLM agents.',
    'Before that, at e& (Etisalat), I built real-time pipelines on Kafka, Kafka Streams, Spark Streaming and Redis, and re-engineered a Spark/Scala segmentation job from 16 hours to 2 hours. It fed an AI customer-segmentation product used by external clients such as Careem and Amazon.',
    "I'm a why-first learner: I care about the reasoning behind systems, not just the mechanics. Off the keyboard you'll find me at the piano learning Chopin, meditating, watching Arsenal each weekend, or writing on Medium.",
  ],
  fun: [
    "⚽ Die-hard Arsenal fan — I merge football with data: studied Beltagy's Game Analysis course, Mckay Johnes' Python Football Analysis, built the EPL Analytics Platform, an xG model from scratch and GunnersAnalysis, a football analytics system that runs itself.",
    '🍥 Naruto fan — my open-source privacy tool is literally named Kakashi, after the Copy Ninja who hides what matters.',
    '🎹 Learning piano on a Roland FP-10, slowly working toward Chopin and exploring cinema music.',
    '📚 Constant learner: reading books, writing reflective and technical articles on Medium (English & Arabic).',
    '🧘 Daily meditation practice — I even wrote about how it made me a better data engineer.',
    '💪 Regular gym-goer — balancing the sedentary data engineering life.',
    '🎬 Anime and cinema music enthusiast.',
  ],
}

// ---------- headline numbers ----------

export const heroStats = [
  { value: 6, suffix: '+', label: 'years in production data' },
  { value: 95, suffix: '+', label: 'pipelines owned daily' },
  { value: 75, suffix: '+', label: 'sources ingested' },
  { value: 130, suffix: '+', label: 'users on a tool I built solo' },
]

export const experience = [
  {
    role: 'Senior Data Engineer',
    company: 'Statistics Centre – Abu Dhabi (SCAD)',
    short: 'SCAD',
    via: '',
    location: 'Abu Dhabi, UAE',
    period: 'Sep 2025 — Present',
    headline: 'The pipelines behind a national price index.',
    highlights: [
      'Own 95+ daily production pipelines (Python, Scrapy, Playwright, Airflow) ingesting price data from 75+ websites and APIs into Presto/Trino and MySQL, feeding the national Consumer Price Index and retail price indices',
      'Built MARSAD solo in 3 weeks: a near-real-time pipeline monitoring platform (FastAPI, Vue, MySQL, Docker) deployed through GitHub Actions to OpenShift, covering data quality, price outlier detection and failure tracking — now 130+ users across teams',
      'Enforce data quality with pytest suites on the API layer and data-contract validation against the contract agreed with the price and income statistics team',
      'Build ML infrastructure next to the pipelines: experiment, parameter and model tracking in MLflow, and a synthetic data framework (SDV, CTGAN, TVAE, CopulaGAN) so teams can develop on privacy-safe data',
      "Build an LLM agent (LangGraph, DSPy) that adapts scrapers when a website's structure changes, across static HTML and JavaScript-rendered pages, cutting manual pipeline repair",
      'Work on Databricks (Delta Lake, Unity Catalog) for platform modernisation, with Business and Statistics stakeholders in Agile',
    ],
    stack: ['Python', 'Airflow', 'Scrapy', 'Playwright', 'Trino', 'MySQL', 'FastAPI', 'MLflow', 'LangGraph', 'OpenShift'],
  },
  {
    role: 'Senior Data Engineer',
    company: 'e& (Etisalat)',
    short: 'e&',
    via: '',
    location: 'Dubai, UAE',
    period: 'Nov 2024 — Sep 2025',
    headline: 'Telecom-scale segmentation, 8× faster.',
    highlights: [
      'Built real-time pipelines on Kafka, Kafka Streams and Spark Streaming, using Redis in the real-time path',
      'Re-engineered the Spark/Scala ETL framework behind customer segmentation, cutting runtime from 16 hours to 2 hours (87.5%) across tens of millions of customer records',
      'Designed the data pipeline feeding a monetised AI customer-segmentation platform — external clients such as Careem and Amazon used it to choose audience segments for SMS and WhatsApp campaigns',
      'Ran large batch workloads on HDFS with Spark, Hive, Impala and Presto; tuned Hive with partitioning, bucketing and query-plan analysis, and used Databricks with Delta Lake for versioned ingestion',
      'Built a custom ETL framework with dynamic Scala compilation, so analysts could define new pipeline logic without engineering support',
    ],
    stack: ['Scala', 'Spark', 'Kafka', 'Kafka Streams', 'Redis', 'Hive', 'Impala', 'HDFS', 'Delta Lake'],
  },
  {
    role: 'Data Engineer',
    company: 'LigaData',
    short: 'LigaData',
    via: '',
    location: 'Remote',
    period: 'Oct 2022 — Nov 2024',
    headline: 'A data fabric on Hadoop and Kubernetes.',
    highlights: [
      'Built a data fabric on Hadoop, HDFS and Hive with daily, weekly and monthly Airflow pipelines, queried through Presto/Trino and deployed with Docker and Kubernetes',
      'Reduced report generation time by 40% through workflow automation and query optimisation',
      'Modelled data with dimensional and One Big Table patterns',
    ],
    stack: ['Hadoop', 'Hive', 'Airflow', 'Trino', 'Docker', 'Kubernetes'],
  },
  {
    role: 'Session Lead',
    company: 'Udacity',
    short: 'Udacity',
    via: '',
    location: 'Cairo, Egypt',
    period: 'Jul 2023 — Oct 2024',
    headline: 'Teaching, alongside the day job.',
    highlights: [
      'Delivered sessions on programming basics, Python, data analytics, web development, AI and cybersecurity',
      'Mentored learners with hands-on, personalised guidance',
    ],
    stack: ['Python', 'Mentoring'],
  },
  {
    role: 'Freelance Data Engineer & Analyst',
    company: 'Upwork',
    short: 'Upwork',
    via: '',
    location: 'Remote',
    period: 'Jun 2022 — Dec 2023',
    headline: 'ETL and ML for e-commerce and logistics.',
    highlights: [
      'Delivered ETL processes and API integrations for e-commerce and logistics clients',
      'Built ML models reaching 85% prediction accuracy',
    ],
    stack: ['Python', 'SQL', 'APIs', 'scikit-learn'],
  },
  {
    role: 'Data Analyst',
    company: 'Cube',
    short: 'Cube',
    via: '',
    location: 'Mansoura, Egypt',
    period: 'Jun 2019 — Sep 2021',
    headline: 'Where it started: reports people actually read.',
    highlights: [
      "Handled data entry, analysis and visualisation on the company's website data",
      'Produced reports on student performance and grades using Excel and Power BI',
    ],
    stack: ['Excel', 'Power BI'],
  },
]

// ---------- animated architectures ----------

export type ArchTone = 'source' | 'process' | 'store' | 'serve' | 'ai' | 'ops'
export type ArchNode = { id: string; label: string; sub?: string; x: number; y: number; tone: ArchTone }
export type ArchEdge = { from: string; to: string; dashed?: boolean }
export type ArchStep = { title: string; text: string; nodes: string[] }
export type Architecture = {
  id: string
  name: string
  kind: string
  context: 'Production' | 'Open source' | 'Personal build'
  pitch: string
  metrics: { value: string; label: string }[]
  tech: string[]
  link?: string
  nodes: ArchNode[]
  edges: ArchEdge[]
  steps: ArchStep[]
}

// Grid used for node centres (viewBox 1000 × 400)
const C = [90, 295, 500, 705, 910]
const R = [70, 200, 330]

export const architectures: Architecture[] = [
  {
    id: 'cpi',
    name: 'National price-index data platform',
    kind: 'Statistics Centre – Abu Dhabi',
    context: 'Production',
    pitch:
      '95+ daily pipelines turn prices scattered across 75+ websites and APIs into the numbers behind the Consumer Price Index — tested, monitored and able to repair themselves.',
    metrics: [
      { value: '95+', label: 'daily pipelines' },
      { value: '75+', label: 'websites & APIs' },
      { value: '130+', label: 'MARSAD users' },
    ],
    tech: ['Python', 'Scrapy', 'Playwright', 'Airflow', 'Trino', 'MySQL', 'FastAPI', 'Vue', 'OpenShift', 'LangGraph', 'DSPy'],
    nodes: [
      { id: 'airflow', label: 'Airflow', sub: 'daily schedules', x: C[1], y: R[0], tone: 'ops' },
      { id: 'sources', label: '75+ sites & APIs', sub: 'retail prices', x: C[0], y: R[1], tone: 'source' },
      { id: 'scrapers', label: '95+ pipelines', sub: 'Scrapy · Playwright', x: C[1], y: R[1], tone: 'process' },
      { id: 'store', label: 'Trino · MySQL', sub: 'price warehouse', x: C[2], y: R[1], tone: 'store' },
      { id: 'contracts', label: 'Data contracts', sub: 'pytest · validation', x: C[3], y: R[1], tone: 'process' },
      { id: 'cpi', label: 'Price index (CPI)', sub: 'national statistics', x: C[4], y: R[1], tone: 'serve' },
      { id: 'agent', label: 'LLM repair agent', sub: 'LangGraph · DSPy', x: C[0], y: R[2], tone: 'ai' },
      { id: 'marsad', label: 'MARSAD', sub: 'quality · outliers', x: C[2], y: R[2], tone: 'ops' },
    ],
    edges: [
      { from: 'airflow', to: 'scrapers' },
      { from: 'sources', to: 'scrapers' },
      { from: 'scrapers', to: 'store' },
      { from: 'store', to: 'contracts' },
      { from: 'contracts', to: 'cpi' },
      { from: 'store', to: 'marsad' },
      { from: 'sources', to: 'agent', dashed: true },
      { from: 'agent', to: 'scrapers', dashed: true },
    ],
    steps: [
      { title: 'Collect', text: 'Airflow triggers 95+ pipelines every day. Scrapy handles static pages, Playwright the JavaScript-rendered ones.', nodes: ['airflow', 'sources', 'scrapers'] },
      { title: 'Land', text: 'Price observations land in Presto/Trino and MySQL, ready for the statisticians.', nodes: ['scrapers', 'store'] },
      { title: 'Prove', text: 'pytest suites and data-contract validation check every delivery against the contract agreed with the price statistics team.', nodes: ['store', 'contracts', 'cpi'] },
      { title: 'Watch', text: 'MARSAD — built solo in 3 weeks — tracks quality, price outliers and failures in near real time for 130+ users.', nodes: ['store', 'marsad'] },
      { title: 'Heal', text: "When a website changes its structure, an LLM agent adapts the scraper instead of waiting for a manual fix.", nodes: ['sources', 'agent', 'scrapers'] },
    ],
  },
  {
    id: 'segmentation',
    name: 'Customer segmentation at telecom scale',
    kind: 'e& (Etisalat)',
    context: 'Production',
    pitch:
      'A 16-hour Spark/Scala job re-engineered to 2 hours, feeding a monetised AI segmentation product that external brands used to target campaigns.',
    metrics: [
      { value: '16h → 2h', label: 'job runtime' },
      { value: '87.5%', label: 'faster' },
      { value: '10M+', label: 'customer records' },
    ],
    tech: ['Scala', 'Spark', 'Kafka', 'Kafka Streams', 'Spark Streaming', 'Redis', 'Hive', 'Impala', 'Presto', 'HDFS', 'Delta Lake'],
    nodes: [
      { id: 'hdfs', label: 'HDFS · Hive', sub: '10M+ customer rows', x: C[0], y: R[0], tone: 'source' },
      { id: 'etl', label: 'Spark/Scala ETL', sub: '16h → 2h', x: C[1], y: R[0], tone: 'process' },
      { id: 'segments', label: 'Segment tables', sub: 'Hive · Impala · Presto', x: C[2], y: R[0], tone: 'store' },
      { id: 'rules', label: 'Analyst logic', sub: 'dynamic Scala compile', x: C[1], y: R[1], tone: 'ops' },
      { id: 'platform', label: 'AI segmentation', sub: 'monetised platform', x: C[3], y: R[1], tone: 'ai' },
      { id: 'campaigns', label: 'Campaigns', sub: 'SMS · WhatsApp', x: C[4], y: R[1], tone: 'serve' },
      { id: 'events', label: 'Live events', sub: 'network activity', x: C[0], y: R[2], tone: 'source' },
      { id: 'kafka', label: 'Kafka', sub: 'event backbone', x: C[1], y: R[2], tone: 'process' },
      { id: 'streams', label: 'Stream processing', sub: 'Kafka Streams · Spark', x: C[2], y: R[2], tone: 'process' },
      { id: 'redis', label: 'Redis', sub: 'real-time path', x: C[3], y: R[2], tone: 'store' },
    ],
    edges: [
      { from: 'hdfs', to: 'etl' },
      { from: 'rules', to: 'etl', dashed: true },
      { from: 'etl', to: 'segments' },
      { from: 'segments', to: 'platform' },
      { from: 'events', to: 'kafka' },
      { from: 'kafka', to: 'streams' },
      { from: 'streams', to: 'redis' },
      { from: 'redis', to: 'platform' },
      { from: 'platform', to: 'campaigns' },
    ],
    steps: [
      { title: 'Batch source', text: 'Tens of millions of customer records sit on HDFS behind Hive, tuned with partitioning, bucketing and query-plan analysis.', nodes: ['hdfs', 'etl'] },
      { title: 'The 2-hour job', text: 'I re-engineered the Spark/Scala framework behind segmentation: 16 hours down to 2. That is 87.5% of the runtime gone.', nodes: ['hdfs', 'etl', 'segments'] },
      { title: 'Self-serve logic', text: 'Dynamic Scala compilation lets analysts define new pipeline logic without waiting on engineering.', nodes: ['rules', 'etl'] },
      { title: 'Real-time path', text: 'Kafka, Kafka Streams and Spark Streaming process live events, with Redis serving the hot path.', nodes: ['events', 'kafka', 'streams', 'redis'] },
      { title: 'The product', text: 'Both paths feed an AI segmentation platform. External clients such as Careem and Amazon used it to pick audiences for SMS and WhatsApp campaigns.', nodes: ['segments', 'redis', 'platform', 'campaigns'] },
    ],
  },
  {
    id: 'synthetic',
    name: 'Synthetic data generation framework',
    kind: 'Statistics Centre – Abu Dhabi · ML infrastructure',
    context: 'Production',
    pitch:
      'A framework I created to generate synthetic data with ML and deep-learning generative models, so teams can develop and test on privacy-safe datasets instead of the real thing.',
    metrics: [
      { value: '3', label: 'generative models' },
      { value: 'SDV', label: 'foundation' },
      { value: 'Privacy-safe', label: 'development data' },
    ],
    tech: ['Python', 'SDV', 'CTGAN', 'TVAE', 'CopulaGAN', 'Deep learning'],
    nodes: [
      { id: 'real', label: 'Sensitive data', sub: 'cannot be shared', x: C[0], y: R[1], tone: 'source' },
      { id: 'framework', label: 'Framework', sub: 'built on SDV', x: C[1], y: R[1], tone: 'process' },
      { id: 'ctgan', label: 'CTGAN', sub: 'conditional GAN', x: C[2], y: R[0], tone: 'ai' },
      { id: 'tvae', label: 'TVAE', sub: 'autoencoder (VAE)', x: C[2], y: R[1], tone: 'ai' },
      { id: 'copula', label: 'CopulaGAN', sub: 'copulas + GAN', x: C[2], y: R[2], tone: 'ai' },
      { id: 'synth', label: 'Synthetic dataset', sub: 'privacy-safe', x: C[3], y: R[1], tone: 'store' },
      { id: 'teams', label: 'Teams', sub: 'develop · test · model', x: C[4], y: R[1], tone: 'serve' },
    ],
    edges: [
      { from: 'real', to: 'framework' },
      { from: 'framework', to: 'ctgan' },
      { from: 'framework', to: 'tvae' },
      { from: 'framework', to: 'copula' },
      { from: 'ctgan', to: 'synth' },
      { from: 'tvae', to: 'synth' },
      { from: 'copula', to: 'synth' },
      { from: 'synth', to: 'teams' },
    ],
    steps: [
      { title: 'Start', text: 'Some data is too sensitive to hand to every team that needs to build against it.', nodes: ['real', 'framework'] },
      { title: 'Learn', text: 'The framework trains generative models on it: CTGAN, TVAE and CopulaGAN, on top of SDV.', nodes: ['framework', 'ctgan', 'tvae', 'copula'] },
      { title: 'Generate', text: 'The models produce a synthetic dataset that behaves like the original without being the original.', nodes: ['ctgan', 'tvae', 'copula', 'synth'] },
      { title: 'Build', text: 'Teams develop, test and train models on privacy-safe data.', nodes: ['synth', 'teams'] },
    ],
  },
  {
    id: 'kakashi',
    name: 'Kakashi — privacy engine for agentic AI',
    kind: 'Open source · Python CLI',
    context: 'Open source',
    pitch:
      'A local-first guard that finds secrets and personal data in your files and decides how much an AI agent may see for the job it says it is doing. Nothing leaves your machine.',
    metrics: [
      { value: '50+', label: 'file formats' },
      { value: '20+', label: 'agents supported' },
      { value: '0', label: 'network calls' },
    ],
    tech: ['Python', 'CLI', 'Pattern detection', 'Guardrails', 'DevSecOps'],
    link: 'https://github.com/Muhammadatef/kakashi',
    nodes: [
      { id: 'policy', label: 'Policy', sub: 'allow · mask · block', x: C[2], y: R[0], tone: 'ops' },
      { id: 'files', label: 'Your files', sub: 'folders · databases', x: C[0], y: R[1], tone: 'source' },
      { id: 'engine', label: 'Detection engine', sub: 'secrets · PII · IDs', x: C[1], y: R[1], tone: 'process' },
      { id: 'guardian', label: 'Guardian', sub: 'assess · plan minimum', x: C[2], y: R[1], tone: 'ai' },
      { id: 'mask', label: 'Mask & rebuild', sub: 'original format kept', x: C[3], y: R[1], tone: 'process' },
      { id: 'agent', label: 'AI agent', sub: 'least data needed', x: C[4], y: R[1], tone: 'serve' },
      { id: 'verify', label: 'Verify', sub: 're-checks own output', x: C[3], y: R[2], tone: 'ops' },
    ],
    edges: [
      { from: 'files', to: 'engine' },
      { from: 'engine', to: 'guardian' },
      { from: 'policy', to: 'guardian', dashed: true },
      { from: 'guardian', to: 'mask' },
      { from: 'mask', to: 'verify' },
      { from: 'verify', to: 'guardian', dashed: true },
      { from: 'mask', to: 'agent' },
    ],
    steps: [
      { title: 'Detect', text: 'The engine scans files, folders and databases for credentials, government IDs, financial and contact data.', nodes: ['files', 'engine'] },
      { title: 'Judge', text: 'The Guardian weighs the agent, its stated task and your policy, then plans the minimum necessary exposure.', nodes: ['engine', 'policy', 'guardian'] },
      { title: 'Mask', text: 'Sensitive values are replaced and the file is rebuilt in its original format — a real .docx back, not a text dump.', nodes: ['guardian', 'mask'] },
      { title: 'Verify', text: 'It re-checks its own output and replans if anything slipped through.', nodes: ['mask', 'verify', 'guardian'] },
      { title: 'Hand over', text: 'Only then does the agent get the file. Named after the Copy Ninja, who hides what matters.', nodes: ['mask', 'agent'] },
    ],
  },
  {
    id: 'match',
    name: 'GunnersAnalysis — football analytics on autopilot',
    kind: 'Football analytics · Open source',
    context: 'Open source',
    pitch:
      'From the final whistle to a grounded answer, with nobody pressing a button: an Airflow pipeline, 18-panel tactical dashboards, a PostgreSQL warehouse and an AI analyst that cannot invent a statistic.',
    metrics: [
      { value: '18', label: 'dashboard panels / match' },
      { value: '~1,400', label: 'events per match' },
      { value: '30 min', label: 'after full time' },
    ],
    tech: ['Airflow', 'FastAPI', 'Selenium', 'pandas', 'PostgreSQL', 'pgvector', 'DSPy', 'LiteLLM', 'OpenRouter', 'MLflow', 'React', 'Docker'],
    link: 'https://github.com/Muhammadatef/gunners-analysis',
    nodes: [
      { id: 'airflow', label: 'Airflow', sub: 'one DAG per fixture', x: C[0], y: R[0], tone: 'ops' },
      { id: 'scrape', label: 'Scrape', sub: 'Opta events · xG', x: C[1], y: R[0], tone: 'source' },
      { id: 'enrich', label: 'Transform + enrich', sub: 'xG · xT model', x: C[2], y: R[0], tone: 'process' },
      { id: 'contracts', label: 'Typed contracts', sub: 'validate or fail', x: C[3], y: R[0], tone: 'ops' },
      { id: 'render', label: '18-panel dashboard', sub: '+ written report', x: C[4], y: R[0], tone: 'serve' },
      { id: 'answer', label: 'Grounded answer', sub: 'cited evidence', x: C[1], y: R[1], tone: 'serve' },
      { id: 'verify', label: 'Verify numbers', sub: 'evidence or refuse', x: C[2], y: R[1], tone: 'ops' },
      { id: 'agent', label: 'AI analyst', sub: 'DSPy · allowlist SQL', x: C[3], y: R[1], tone: 'ai' },
      { id: 'pg', label: 'PostgreSQL', sub: 'pgvector warehouse', x: C[4], y: R[1], tone: 'store' },
      { id: 'app', label: 'Web app + API', sub: 'FastAPI · React', x: C[4], y: R[2], tone: 'serve' },
    ],
    edges: [
      { from: 'airflow', to: 'scrape' },
      { from: 'scrape', to: 'enrich' },
      { from: 'enrich', to: 'contracts' },
      { from: 'contracts', to: 'render' },
      { from: 'render', to: 'pg' },
      { from: 'pg', to: 'app' },
      { from: 'pg', to: 'agent' },
      { from: 'agent', to: 'verify' },
      { from: 'verify', to: 'answer' },
    ],
    steps: [
      { title: 'Trigger', text: 'One DAG per fixture fires 30 minutes after full time. Nobody presses a button.', nodes: ['airflow', 'scrape'] },
      { title: 'Join sources', text: 'One source provides the Opta event stream, another the xG and xGOT. Neither is complete alone, so the pipeline joins them.', nodes: ['scrape', 'enrich'] },
      { title: 'Gate', text: 'Typed data contracts validate every match. Broken data fails loudly instead of being published.', nodes: ['enrich', 'contracts'] },
      { title: 'Render + load', text: 'An 18-panel tactical dashboard and a written report are rendered, then every event, shot and player lands in PostgreSQL.', nodes: ['contracts', 'render', 'pg', 'app'] },
      { title: 'Ask', text: 'The analyst never writes SQL and never does arithmetic: it picks allowlisted queries and hands the maths to a sandboxed calculator.', nodes: ['pg', 'agent'] },
      { title: 'Verify', text: 'Every number in an answer must match the evidence the tools returned. If it cannot be backed, the analyst refuses instead of guessing.', nodes: ['agent', 'verify', 'answer'] },
    ],
  },
  {
    id: 'epl',
    name: 'EPL Analytics Platform',
    kind: 'Football analytics · Full product',
    context: 'Personal build',
    pitch:
      'A consumer-facing football analytics product: automated pipelines, a medallion warehouse, 11 interactive dashboards and a chatbot you can ask about any match.',
    metrics: [
      { value: '11', label: 'dashboards' },
      { value: '<100ms', label: 'GraphQL responses' },
      { value: '4', label: 'clubs tracked' },
    ],
    tech: ['Airflow', 'PostgreSQL', 'GraphQL', 'React', 'D3.js', 'RAG', 'Docker'],
    link: 'https://github.com/Muhammadatef/EPL-Analytics-Platform',
    nodes: [
      { id: 'source', label: 'Match data', sub: 'xG · shots · positions', x: C[0], y: R[1], tone: 'source' },
      { id: 'airflow', label: 'Airflow', sub: '2h after full-time', x: C[1], y: R[1], tone: 'ops' },
      { id: 'bronze', label: 'Bronze', sub: 'raw JSON', x: C[2], y: R[0], tone: 'store' },
      { id: 'silver', label: 'Silver', sub: 'cleaned shot events', x: C[2], y: R[1], tone: 'store' },
      { id: 'gold', label: 'Gold', sub: 'tactical metrics', x: C[2], y: R[2], tone: 'store' },
      { id: 'graphql', label: 'GraphQL API', sub: 'multi-club resolvers', x: C[3], y: R[1], tone: 'process' },
      { id: 'rag', label: 'RAG chatbot', sub: 'local LLM', x: C[3], y: R[2], tone: 'ai' },
      { id: 'react', label: 'React + D3', sub: '11 dashboards', x: C[4], y: R[1], tone: 'serve' },
    ],
    edges: [
      { from: 'source', to: 'airflow' },
      { from: 'airflow', to: 'bronze' },
      { from: 'bronze', to: 'silver' },
      { from: 'silver', to: 'gold' },
      { from: 'gold', to: 'graphql' },
      { from: 'gold', to: 'rag' },
      { from: 'graphql', to: 'react' },
      { from: 'rag', to: 'react' },
    ],
    steps: [
      { title: 'Kick-off + 2h', text: 'Airflow DAGs fire two hours after each match ends and pull the event data automatically.', nodes: ['source', 'airflow', 'bronze'] },
      { title: 'Medallion', text: 'Raw JSON becomes cleaned shot events, then gold-layer metrics: advanced player stats, tactical analysis, threat zones.', nodes: ['bronze', 'silver', 'gold'] },
      { title: 'Serve', text: 'A GraphQL API answers in under 100 ms and powers pitch maps, pass networks and trend charts.', nodes: ['gold', 'graphql', 'react'] },
      { title: 'Ask', text: 'A RAG chatbot on a local LLM answers questions in plain language, at zero API cost.', nodes: ['gold', 'rag', 'react'] },
    ],
  },
  {
    id: 'clickstream',
    name: 'Click-Streaming Data Pipeline',
    kind: 'Streaming · Kafka ecosystem',
    context: 'Personal build',
    pitch:
      'Clickstream events ingested, validated against Avro schemas, enriched in Spark Streaming and stored in an object lake — all in real time, all on Docker.',
    metrics: [
      { value: 'Avro', label: 'schema contracts' },
      { value: 'Real-time', label: 'enrichment' },
      { value: '9', label: 'services on Docker' },
    ],
    tech: ['Kafka', 'Kafka Connect', 'Schema Registry', 'ksqlDB', 'Spark Streaming', 'MinIO', 'Docker'],
    link: 'https://github.com/Muhammadatef/Click-Streaming-Data-Pipeline',
    nodes: [
      { id: 'registry', label: 'Schema Registry', sub: 'Avro contracts', x: C[2], y: R[0], tone: 'ops' },
      { id: 'web', label: 'Web app', sub: 'click events', x: C[0], y: R[1], tone: 'source' },
      { id: 'api', label: 'REST API', sub: 'ingest', x: C[1], y: R[1], tone: 'process' },
      { id: 'kafka', label: 'Kafka', sub: 'event topics', x: C[2], y: R[1], tone: 'process' },
      { id: 'spark', label: 'Spark Streaming', sub: 'validate · enrich', x: C[3], y: R[1], tone: 'process' },
      { id: 'minio', label: 'MinIO', sub: 'S3-compatible lake', x: C[4], y: R[1], tone: 'store' },
      { id: 'ksql', label: 'ksqlDB', sub: 'live SQL on streams', x: C[2], y: R[2], tone: 'serve' },
    ],
    edges: [
      { from: 'web', to: 'api' },
      { from: 'api', to: 'kafka' },
      { from: 'registry', to: 'kafka', dashed: true },
      { from: 'kafka', to: 'spark' },
      { from: 'spark', to: 'minio' },
      { from: 'kafka', to: 'ksql' },
    ],
    steps: [
      { title: 'Ingest', text: 'A REST API receives clickstream events from the web app and produces them to Kafka.', nodes: ['web', 'api', 'kafka'] },
      { title: 'Validate', text: 'Every event is checked against an Avro schema held in Schema Registry.', nodes: ['registry', 'kafka'] },
      { title: 'Enrich', text: 'Spark Streaming enriches the events as they arrive.', nodes: ['kafka', 'spark'] },
      { title: 'Store', text: 'Processed data lands in MinIO, ready for downstream analytics.', nodes: ['spark', 'minio'] },
      { title: 'Query live', text: 'ksqlDB runs SQL directly on the streams for real-time answers.', nodes: ['kafka', 'ksql'] },
    ],
  },
  {
    id: 'aws',
    name: 'AWS Retail Data ETL Pipeline',
    kind: 'Cloud · Infrastructure as code',
    context: 'Personal build',
    pitch:
      'Batch ETL that moves a retailer off its transactional database: Glue reshapes it into a star schema, S3 holds partitioned Parquet, Athena serves the analysts. Every resource is Terraform.',
    metrics: [
      { value: '100%', label: 'infra as code' },
      { value: 'Star', label: 'schema model' },
      { value: 'Parquet', label: 'partitioned on S3' },
    ],
    tech: ['AWS Glue', 'RDS MySQL', 'S3', 'Athena', 'Glue Data Catalog', 'Terraform'],
    link: 'https://github.com/Muhammadatef/AWS-Retail-Data-ETL-Pipeline',
    nodes: [
      { id: 'catalog', label: 'Glue Data Catalog', sub: 'table metadata', x: C[3], y: R[0], tone: 'ops' },
      { id: 'rds', label: 'MySQL on RDS', sub: 'transactional source', x: C[0], y: R[1], tone: 'source' },
      { id: 'glue', label: 'AWS Glue', sub: 'extract · transform', x: C[1], y: R[1], tone: 'process' },
      { id: 'star', label: 'Star schema', sub: 'facts + dimensions', x: C[2], y: R[1], tone: 'process' },
      { id: 's3', label: 'Amazon S3', sub: 'partitioned Parquet', x: C[3], y: R[1], tone: 'store' },
      { id: 'athena', label: 'Athena', sub: 'SQL for analysts', x: C[4], y: R[1], tone: 'serve' },
      { id: 'tf', label: 'Terraform', sub: 'provisions everything', x: C[2], y: R[2], tone: 'ops' },
    ],
    edges: [
      { from: 'rds', to: 'glue' },
      { from: 'glue', to: 'star' },
      { from: 'star', to: 's3' },
      { from: 's3', to: 'athena' },
      { from: 'catalog', to: 's3', dashed: true },
      { from: 'tf', to: 'glue', dashed: true },
      { from: 'tf', to: 's3', dashed: true },
    ],
    steps: [
      { title: 'Provision', text: 'Terraform creates the bucket, the Glue job and everything around them. Nothing is clicked together by hand.', nodes: ['tf', 'glue', 's3'] },
      { title: 'Extract', text: 'Glue pulls the sales tables from MySQL on RDS without loading the source system with analytics.', nodes: ['rds', 'glue'] },
      { title: 'Model', text: 'The data is reshaped into a star schema: facts and dimensions built for analytical queries.', nodes: ['glue', 'star'] },
      { title: 'Store', text: 'Partitioned Parquet lands on S3 and is registered in the Glue Data Catalog.', nodes: ['star', 's3', 'catalog'] },
      { title: 'Serve', text: 'Athena gives the marketing team plain SQL over the lake.', nodes: ['s3', 'athena'] },
    ],
  },
]

// ---------- project list (cards + chatbot) ----------

export const projects = [
  {
    name: 'Kakashi',
    kind: 'Open source · Privacy',
    description:
      'A local-first privacy engine that masks secrets, credentials and PII in your files before AI agents ever see them. 50+ file formats, 20+ agents. Named after the Copy Ninja.',
    tech: ['Python', 'CLI', 'Guardrails', 'DevSecOps'],
    link: 'https://github.com/Muhammadatef/kakashi',
    stars: 21,
  },
  {
    name: 'GunnersAnalysis',
    kind: 'Football analytics · Open source',
    description:
      'Automated football analytics: one Airflow DAG per fixture fires 30 minutes after full time, scrapes ~1,400 events, enriches shots with xG, validates against typed contracts, renders an 18-panel tactical dashboard and loads PostgreSQL. A DSPy analyst on top answers in plain English and cannot invent a statistic.',
    tech: ['Airflow', 'PostgreSQL', 'pgvector', 'DSPy', 'FastAPI', 'React', 'Docker'],
    link: 'https://github.com/Muhammadatef/gunners-analysis',
    stars: 10,
  },
  {
    name: 'EPL Analytics Platform',
    kind: 'Football analytics',
    description:
      'Consumer-facing product with 11 interactive dashboards in React and D3.js, served by a GraphQL API with sub-100ms response times.',
    tech: ['React', 'D3.js', 'GraphQL', 'Airflow', 'PostgreSQL'],
    link: 'https://github.com/Muhammadatef/EPL-Analytics-Platform',
    stars: 8,
  },
  {
    name: 'Click-Streaming Data Pipeline',
    kind: 'Streaming',
    description:
      'Event-streaming pipeline on Kafka, Kafka Connect, Schema Registry and ksqlDB, with Spark Streaming processing into MinIO, all on Docker.',
    tech: ['Kafka', 'ksqlDB', 'Spark Streaming', 'MinIO', 'Docker'],
    link: 'https://github.com/Muhammadatef/Click-Streaming-Data-Pipeline',
    stars: 1,
  },
  {
    name: 'Real-Time Streaming Projects',
    kind: 'Streaming · Udacity',
    description:
      'A transit-status pipeline (Kafka, Avro, Kafka Connect, REST Proxy, KSQL, Faust) powering a live train dashboard, and real-time risk scoring with Spark Structured Streaming joined to Redis data.',
    tech: ['Kafka', 'Faust', 'KSQL', 'Spark Structured Streaming', 'Redis'],
    link: 'https://github.com/Muhammadatef/DataStreaming-UdacityNanodegree',
    stars: 0,
  },
  {
    name: 'AWS Retail Data ETL Pipeline',
    kind: 'Cloud · AWS',
    description:
      'Batch ETL from MySQL on RDS through AWS Glue (star schema, Glue Data Catalog) to partitioned Parquet on S3, queried with Athena. All infrastructure provisioned with Terraform.',
    tech: ['AWS Glue', 'S3', 'Athena', 'RDS', 'Terraform'],
    link: 'https://github.com/Muhammadatef/AWS-Retail-Data-ETL-Pipeline',
    stars: 0,
  },
  {
    name: 'DE Roadmap for Arabic Speakers',
    kind: 'Open source · Community',
    description:
      'A complete Arabic-first Data Engineering roadmap — the curriculum backbone behind the bootcamp.',
    tech: ['Curriculum', 'Linux → Kafka'],
    link: 'https://github.com/Muhammadatef/Data-Engineering-Roadmap-For-Arabic-Speaker',
    stars: 132,
  },
  {
    name: 'Covid-19 Analysis Using Azure',
    kind: 'Cloud · Azure',
    description:
      'End-to-end data engineering solution on Azure: Data Factory, Databricks and analytics workflows over COVID-19 data.',
    tech: ['Azure', 'Data Factory', 'Databricks', 'Data Lake'],
    link: 'https://github.com/Muhammadatef/Covid-19-Analysis-Using-Azure',
    stars: 2,
  },
  {
    name: 'Dimensional Modeling Practical Guide',
    kind: 'Educational · Data Warehousing',
    description:
      'A practical guide to dimensional modeling with real-world examples, star schemas and warehouse design practices.',
    tech: ['Data Modeling', 'Star Schema', 'Kimball', 'SQL'],
    link: 'https://github.com/Muhammadatef/Dimensional-Modeling-Practiical-guide',
    stars: 9,
  },
  {
    name: 'Spark Recap & Demos',
    kind: 'Educational · Big Data',
    description:
      'Apache Spark demos, notes and practical examples for mastering distributed data processing.',
    tech: ['Apache Spark', 'PySpark', 'Scala'],
    link: 'https://github.com/Muhammadatef/Spark-Recap',
    stars: 11,
  },
  {
    name: 'MAF Bootcamp',
    kind: 'Education · Abu Dhabi',
    description:
      'A 4-month, on-site program in Abu Dhabi that takes you from Linux to Kafka and into your first Data Engineering job.',
    tech: ['Linux', 'Hadoop', 'Airflow', 'Spark', 'Kafka'],
    link: '',
    stars: 0,
  },
]

export const skills = [
  { group: 'Languages', items: ['Python', 'Scala', 'SQL', 'Bash'] },
  {
    group: 'Batch Processing',
    items: ['Apache Spark', 'Hadoop/HDFS', 'Hive', 'Impala', 'Presto/Trino', 'Databricks', 'Delta Lake', 'Apache Iceberg'],
  },
  {
    group: 'Streaming',
    items: ['Apache Kafka', 'Kafka Streams', 'Kafka Connect', 'ksqlDB', 'Spark Streaming', 'Apache Flink (fundamentals)'],
  },
  {
    group: 'Data Stores',
    items: ['Redis', 'MySQL', 'PostgreSQL', 'SQL Server', 'MinIO/S3', 'InfluxDB', 'Neo4j (Cypher)'],
  },
  {
    group: 'ML & Agent Infrastructure',
    items: ['MLflow', 'Synthetic data (SDV, CTGAN, TVAE)', 'LangGraph', 'DSPy', 'RAG'],
  },
  {
    group: 'Orchestration & DevOps',
    items: ['Airflow', 'Dagster', 'Docker', 'Kubernetes', 'OpenShift', 'GitHub Actions', 'Azure DevOps', 'Terraform'],
  },
  {
    group: 'Data Quality & Modelling',
    items: ['pytest', 'Data contracts', 'Great Expectations', 'Dimensional modelling', 'One Big Table'],
  },
  {
    group: 'Cloud',
    items: ['Azure (ADF, ADLS Gen2, Databricks, Synapse)', 'AWS (S3, Glue, RDS, Athena)'],
  },
]

export const education = [
  { name: 'B.Sc. Computer Engineering', org: 'Mansoura University' },
  {
    name: 'Postgraduate Diploma in AI & Machine Learning (9 months) — Grade A+',
    org: 'ITI, powered by EPITA (France)',
  },
]

export const certifications = [
  { name: 'Databricks Certified Data Engineer Associate', org: 'Databricks' },
  { name: 'Microsoft Azure Data Engineer Associate (DP-203)', org: 'Microsoft' },
  { name: 'Deploy Workloads with Lakeflow Jobs', org: 'Databricks' },
  { name: 'Retrieval Augmented Generation (RAG)', org: 'DeepLearning.AI' },
  { name: 'DSPy: Build and Optimize Agentic Apps', org: 'DeepLearning.AI' },
  { name: 'Neural Networks and Deep Learning', org: 'DeepLearning.AI' },
  { name: 'Fundamentals of Deep Learning', org: 'NVIDIA' },
  { name: 'AWS Cloud Practitioner', org: 'Amazon Web Services' },
  { name: 'Data Engineering Zoomcamp', org: 'DataTalks.Club' },
  { name: 'Data Engineering Nanodegree', org: 'Udacity' },
  { name: 'Data Streaming Nanodegree', org: 'Udacity' },
  { name: 'Game Analysis Course', org: 'Beltagy Football Analysis Services' },
  { name: 'Python Football Data Analysis', org: 'Mckay Johnes' },
]

export const achievements = [
  {
    stat: '87.5%',
    title: '16 hours → 2 hours',
    organization: 'e& (Etisalat)',
    year: '2025',
    description:
      'Re-engineered the customer segmentation Spark/Scala ETL framework, reducing processing time from 16 hours to 2 hours (87.5%) across tens of millions of customer records',
  },
  {
    stat: '95+',
    title: '95+ pipelines behind the CPI',
    organization: 'Statistics Centre – Abu Dhabi',
    year: '2025 — now',
    description:
      'Own 95+ daily production pipelines ingesting price data from 75+ websites and APIs, feeding the national Consumer Price Index',
  },
  {
    stat: '130+',
    title: 'MARSAD: solo, 3 weeks, 130+ users',
    organization: 'Statistics Centre – Abu Dhabi',
    year: '2026',
    description:
      'Built a near-real-time pipeline monitoring platform alone in 3 weeks — data quality, price outlier detection and failure tracking — now used by 130+ people across teams',
  },
  {
    stat: 'B2B',
    title: 'A product external brands paid for',
    organization: 'e& (Etisalat)',
    year: '2025',
    description:
      'Designed the pipeline feeding a monetised AI customer-segmentation platform used by external clients such as Careem and Amazon',
  },
  {
    stat: '40%',
    title: '40% faster reporting',
    organization: 'LigaData',
    year: '2023',
    description:
      'Reduced report generation time by 40% through workflow automation and query optimisation',
  },
  {
    stat: '132★',
    title: '132★ open-source roadmap',
    organization: 'Community',
    year: '2022 — now',
    description:
      'Wrote the Data Engineering Roadmap for Arabic Speakers, starred 130+ times on GitHub, and turned it into an on-site bootcamp in Abu Dhabi',
  },
]

// Pulled from medium.com/@muhamedfahmy7474 — newest first
export const articles = [
  {
    title: 'How I Built a Football Analytics Platform That Runs Itself, and an AI Analyst That Cannot Make Up Numbers',
    tag: 'Football × AI',
    year: '2026',
    url: 'https://medium.com/@muhamedfahmy7474/how-i-built-a-football-analytics-platform-that-runs-itself-and-an-ai-analyst-that-cannot-make-up-5a26fa00b93f',
  },
  {
    title: 'How to Use LLMs in 2026 as a Data Engineer — The New Way of Working',
    tag: 'AI engineering',
    year: '2026',
    url: 'https://medium.com/@muhamedfahmy7474/how-to-use-llms-in-2026-as-a-data-engineer-the-new-way-of-working-723b41764b6b',
  },
  {
    title: 'Essential Docker Commands Every Data Engineer Must Master',
    tag: 'DevOps',
    year: '2025',
    url: 'https://medium.com/@muhamedfahmy7474/essential-docker-commands-every-data-engineer-must-master-2fba7a2ad8d3',
  },
  {
    title: 'Building a Football Data Pipeline: A Walkthrough of the Arsenal FC Data Engineering Project',
    tag: 'Football × Data',
    year: '2024',
    url: 'https://medium.com/art-of-data-engineering/building-a-football-data-pipeline-a-walkthrough-of-the-arsenal-fc-data-engineering-project-4383cd247192',
  },
  {
    title: 'How Hive Transformed and “Inspired” the World of Data Engineering',
    tag: 'Big Data',
    year: '2024',
    url: 'https://towardsdev.com/how-hive-transformed-and-inspired-the-world-of-data-engineering-a094ec36966f',
  },
  {
    title: 'The Ripple Effect of Meditation: How It Helped Me to Be a Better Person and a Better Data Engineer',
    tag: 'Reflection',
    year: '2024',
    url: 'https://medium.com/art-of-data-engineering/the-ripple-effect-of-meditation-how-it-helped-me-to-be-a-better-person-and-a-better-data-engineer-10c3b7950d24',
  },
  {
    title: 'Most Used Linux Commands in Data Engineering (Day-to-Day Tasks)',
    tag: 'Linux',
    year: '2023',
    url: 'https://medium.com/art-of-data-engineering/most-used-linux-commands-in-data-engineer-day-to-day-tasks-30a5e30f0c6c',
  },
  {
    title: 'Important 4 Data Engineering Skills That Don’t Get the Proper Hype',
    tag: 'Career',
    year: '2023',
    url: 'https://medium.com/art-of-data-engineering/important-4-data-engineering-skills-that-dont-get-the-proper-hype-cc4f3281a4bf',
  },
  {
    title: 'Introduction to Parquet: A Beginner’s Guide to Efficient Data Storage and Processing',
    tag: 'Storage',
    year: '2023',
    url: 'https://medium.com/@muhamedfahmy7474/introduction-to-parquet-a-beginners-guide-to-efficient-data-storage-and-processing-fc546a655803',
  },
  {
    title: 'Introduction to dbt and Analytics Engineer',
    tag: 'Analytics Eng.',
    year: '2023',
    url: 'https://towardsdev.com/introduction-to-dbt-and-analytics-engineer-69b68f5a9e79',
  },
]

export const bootcamp = {
  name: 'MAF Bootcamp',
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

ARCHITECTURES: ${architectures
    .map((a) => `${a.name} (${a.kind}): ${a.steps.map((s) => `${s.title}: ${s.text}`).join(' ')}`)
    .join(' | ')}

SKILLS: ${skills.map((s) => `${s.group}: ${s.items.join(', ')}`).join(' | ')}

EDUCATION: ${education.map((e) => `${e.name}, ${e.org}`).join(' | ')}

CERTIFICATIONS: ${certifications.map((c) => c.name).join(', ')}

ACHIEVEMENTS: ${achievements.map((a) => `${a.title} @ ${a.organization} (${a.year}): ${a.description}`).join(' | ')}

BOOTCAMP: ${bootcamp.name} — ${bootcamp.headline} ${bootcamp.description} Curriculum: ${bootcamp.curriculum.join(' → ')}

WRITING: ${articles.map((a) => `${a.title} ${a.url}`).join(' | ')}

FUN: ${profile.fun.join(' ')}

CONTACT: email ${profile.email}, GitHub ${profile.github}, LinkedIn ${profile.linkedin}, Medium ${profile.medium}. Resume available at ${profile.resume}.

If asked something unrelated to Fahmi, politely steer back to the portfolio.`
}
