import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { PillButton, fadeUp } from "../components/ui";
import { useSeo } from "../hooks/useSeo";
import { mailto, siteConfig } from "../lib/siteConfig";

const EXPERIENCE = [
  {
    role: "Senior Developer",
    company: "Tradition Agency",
    place: "Dallas, TX",
    period: "Jan 2024 – Present",
    points: [
      "Lead client-facing design and development consultations, translating technical concepts into solutions that match each client's brand vision.",
      "Build responsive, high-performing sites with WordPress, PHP, JavaScript, and Python.",
      "Pioneered custom AI integrations that automate key processes well beyond standard WordPress work.",
      "Run project workflows through Monday CRM to keep timelines and communication clear.",
    ],
  },
  {
    role: "Consultant",
    company: "The New Avenues",
    place: "Dallas, TX",
    period: "Aug 2023 – Jan 2024",
    points: [
      "Strategic IT consultant optimizing small-business processes through automation and workflow management.",
      "Built automation tools that streamlined the client onboarding process.",
      "Coordinated with stakeholders to align business processes across teams.",
    ],
  },
  {
    role: "Software Developer I",
    company: "Amazon Web Services",
    place: "Austin, TX",
    period: "Aug 2022 – May 2023",
    points: [
      "Developed automation scripts and tests that improved AWS environment efficiency and ML model performance.",
      "Resolved 30+ customer-facing concerns on rotational on-call, mitigating service failures.",
      "Drove critical testing and problem-solving work that improved system reliability.",
    ],
  },
  {
    role: "DevOps Intern",
    company: "Plasma Computing Solutions",
    place: "Irving, TX",
    period: "Aug 2021 – Jan 2022",
    points: [
      "Built Python automation to expand remote deployment of service packages.",
      "Deployed Docker containers and services to the internal C2M cloud for production.",
      "Led code reviews with international teams and maintained NFS server systems.",
    ],
  },
];

const RECOGNITION = [
  {
    title: "Winner, National Robotic Championship (TRiCKS)",
    period: "2011",
    body: "Won India's national robotics championship at age 11 with \"Bumble Bee,\" a robot built to collect roadside garbage and water flowerbeds. The win earned an 11-day trip to NASA.",
    links: [
      {
        label: "India Today",
        href: "https://www.indiatoday.in/glossary/story/blore-kids-win-natioal-robotic-championship-and-trip-to-nasa-127513-2011-01-28",
      },
      {
        label: "Mumbai Mirror",
        href: "https://mumbaimirror.indiatimes.com/mumbai/other/citys-wonder-kid-sweeps-nasa-robot-award/articleshow/16095741.html",
      },
    ],
  },
  {
    title: "United Nations fellowship program",
    period: "2016",
    body: "Selected for a United Nations fellowship program, which brought me to the United States.",
    links: [],
  },
];

const SKILL_GROUPS = [
  {
    label: "Languages",
    items: ["Python", "C", "C++", "Java", "JavaScript", "PHP", "HTML/CSS"],
  },
  {
    label: "Frameworks & Libraries",
    items: ["Pandas", "NumPy", "Matplotlib", "Plotly", "Streamlit", "WordPress"],
  },
  {
    label: "Tools & Platforms",
    items: ["Docker", "Git", "AWS ECS", "Jupyter", "Wireshark", "Monday CRM"],
  },
];

const Row = ({
  title,
  sub,
  period,
  children,
}: {
  title: string;
  sub?: string;
  period: string;
  children?: React.ReactNode;
}) => (
  <div className="grid gap-3 border-t border-stroke py-8 last:border-b md:grid-cols-[1fr_auto] md:gap-8">
    <div>
      <h3 className="text-lg text-text-primary">{title}</h3>
      {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
      {children}
    </div>
    <span className="text-xs text-muted uppercase tracking-[0.2em] md:pt-1">
      {period}
    </span>
  </div>
);

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="display-tracking mb-8 font-display text-3xl leading-none text-text-primary md:text-4xl">
    {children}
  </h2>
);

const Resume = () => {
  useSeo({
    title: `Resume | ${siteConfig.name}, ${siteConfig.jobTitle}`,
    description: `Experience, education, research, and recognition for ${siteConfig.name}, a ${siteConfig.jobTitle.toLowerCase()} based in ${siteConfig.location}.`,
    path: "/resume",
  });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[900px] px-6 pb-24 pt-36 md:px-10">
        <motion.header {...fadeUp} className="mb-16">
          <span className="mb-4 block text-xs text-muted uppercase tracking-[0.3em]">
            Resume
          </span>
          <h1 className="display-tracking mb-6 font-display text-6xl leading-none text-text-primary md:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="mb-8 max-w-lg text-sm text-muted md:text-base">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <PillButton href={mailto}>Get in touch</PillButton>
            <a
              href="/anjal-parikh-resume.pdf"
              download
              className="group relative rounded-full transition-transform duration-300 hover:scale-105"
            >
              <span
                className="absolute rounded-full accent-gradient-animated opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ inset: "-2px" }}
                aria-hidden
              />
              <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-sm text-text-primary transition-colors duration-300 group-hover:border-transparent">
                Download CV
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </span>
            </a>
          </div>
        </motion.header>

        <motion.section {...fadeUp} className="mb-16">
          <Heading>
            Selected <span className="accent-text">experience</span>
          </Heading>
          <div className="flex flex-col">
            {EXPERIENCE.map((item) => (
              <Row
                key={item.company}
                title={item.role}
                sub={`${item.company} · ${item.place}`}
                period={item.period}
              >
                <ul className="mt-4 flex max-w-xl flex-col gap-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </Row>
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="mb-16">
          <Heading>
            <span className="accent-text">Education</span>
          </Heading>
          <Row
            title="B.S. Computer Science"
            sub="University of Texas at Arlington · Arlington, TX"
            period="2018 – 2022"
          />
        </motion.section>

        <motion.section {...fadeUp} className="mb-16">
          <Heading>
            <span className="accent-text">Research</span>
          </Heading>
          <Row
            title="Research Contributor, COSMOS Center"
            sub="Center on Stochastic Modeling, Optimization and Statistics · UT Arlington"
            period="2022"
          >
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Credited under the center's energy research area, covering energy
              process modeling, market price forecasting, dynamic control, and
              electric vehicle charging stations.
            </p>
            <a
              href="https://cosmos.uta.edu/energy/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-xs text-text-primary underline underline-offset-4 transition-colors hover:text-muted"
            >
              COSMOS energy research ↗
            </a>
          </Row>
        </motion.section>

        <motion.section {...fadeUp} className="mb-16">
          <Heading>
            Recognition <span className="accent-text">and press</span>
          </Heading>
          <div className="flex flex-col">
            {RECOGNITION.map((item) => (
              <Row key={item.title} title={item.title} period={item.period}>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
                {item.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-4">
                    {item.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-text-primary underline underline-offset-4 transition-colors hover:text-muted"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </Row>
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeUp}>
          <Heading>
            Core <span className="accent-text">skills</span>
          </Heading>
          <div className="flex flex-col gap-8">
            {SKILL_GROUPS.map((group) => (
              <div key={group.label}>
                <span className="mb-4 block text-xs text-muted uppercase tracking-[0.3em]">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-stroke bg-surface px-4 py-2 text-xs text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </>
  );
};

export default Resume;
