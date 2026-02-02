import Section from '@/components/Section';
import Timeline from '@/components/Timeline';
import Button from '@/components/Button';
import { getAllCaseStudies } from '@/lib/case-studies';

export default function Home() {
  const caseStudies = getAllCaseStudies();
  
  // Create timeline entries from case studies + additional entries
  const timelineEntries = [
    {
      date: '2025 - Present',
      company: 'Product Management Consultant and Coach',
      summary: (
        <>
          <p><i>Currently:</i> exploring how to best coach product teams to work at their best. <a href="https://conviction.varunrajan.com" target="_blank" rel="noopener noreferrer"> Uplevel your PMs with Conviction Coaching</a>.</p>
          <p><i>Recently:</i> Led product roadmaping, prioritization, prototyping, and feature development for AdTech analytics startup in the podcast space</p>
          <p><i>Bit earlier:</i> Ran pilot program encouraging K12 students to build resilience through guided AI prompts and reflections</p>
        </>
      ),
      logos: [
        { src: '/logos/magellanai.jpeg', alt: 'Magellan AI', label: 'Magellan AI' },
        { src: '/logos/vitalitylabs.jpeg', alt: 'Vitality Labs', label: 'Vitality Labs' },
      ],
    },
    {
      date: '2022 - 2024',
      company: 'Chegg',
      summary:
        'Led growth and monetization initiatives across acquisition, subscriptions, and upgrades—driving ~$8M+ in incremental annualized revenue through funnel modernization, experimentation, and data-informed trust signals.',
      logos: [
        { src: '/logos/chegg.png', alt: 'Chegg' },
      ],
    },
    {
      date: '2021 - 2022',
      company: 'RubiconMD',
      summary:
        'Drove adoption of the flagship eConsult product to help secure a $60M contingent cash earnout following acquisition by Oak Street Health.',
      logos: [
        { src: '/logos/rubiconmd.png', alt: 'RubiconMD', label: 'RubiconMD' },
        { src: '/logos/oakstreethealth.jpeg', alt: 'Oak Street Health', label: 'Oak Street Health' },
      ],
    },
    {
      date: '2020 - 2021',
      company: 'Chegg (Chegg Skills)',
      summary:
        'Served as Chief of Staff to the COO, leading product strategy & rollout, market research, and analytics initiatives that improved UX programs, tooling adoption, and job placement forecasting.',
        logos: [
          { src: '/logos/chegg.png', alt: 'Chegg' },
        ],
    },
    {
      date: '2019 - 2021',
      company: 'Keming / Free Agency / Stealth Talent Startup',
      summary:
        'Co-founded and consulted across multiple tech talent initiatives—launching a podcast, newsletter, and community, coaching candidates, and building early-stage recruiting operations and best practices.',
      logos: [
          { src: '/logos/keming.jpeg', alt: 'Keming', label: 'Keming' },
          { src: '/logos/freeagency.jpeg', alt: 'Free Agency', label: 'Free Agency' },
        ],  
    },
    {
      date: '2018 - 2019',
      company: 'Teachable',
      summary:
        'As first dedicated Product hire, I had the unique opportunity to shape the Product team and tech operations. Owned internal tools and support systems, reducing inbound ticket volume by 15%, modernizing bug triage workflows, and introducing structured discovery practices across product and engineering.',
        logos: [
          { src: '/logos/teachable.jpeg', alt: 'Teachable'},
        ],  
    },
    {
      date: '2015 - 2018',
      company: 'Thinkful',
      summary:
        'Led product initiatives in education and operations—reducing student remediation by 60%, enabling nontechnical program management, and supporting Thinkful’s rise to the #1 coding bootcamp on Course Report.',
        logos: [
          { src: '/logos/thinkful.jpeg', alt: 'Thinkful'},
        ],      
    },
  ];

  return (
    <>
      <Section className="bg-bg-page">
        <header className="py-3xl">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] gap-xl md:gap-2xl items-center">
            {/* Left column: photo */}
            <figure className="flex justify-center md:justify-start order-1 md:order-none w-full max-w-[85%] md:max-w-none mx-auto md:mx-0">
              <div className="relative w-full max-w-sm md:max-w-full flex items-center justify-center">
                <img
                  src="/photos/varun-hero.jpeg"
                  alt="Varun Rajan"
                  className="w-full h-auto object-contain rounded-xl hero-image-fade object-center"
                  width={380}
                  height={507}
                  sizes="(max-width: 767px) 85vw, 42vw"
                />
              </div>
            </figure>

            {/* Right column: hero content */}
            <div className="order-2 md:order-none text-left">
              <h1 className="text-4xl font-bold text-text-heading mb-md">
                Turn Your Organization Into a High-Trust, High-Output Machine
              </h1>
              <p className="text-xl text-text-body max-w-2xl mb-lg">
                I work across product, people, and leadership to empower teams to trust their judgment, align across functions, and execute with conviction.
              </p>
              <div className="flex flex-wrap gap-md">
                <Button href="/case-studies" variant="primary">
                  See My Work
                </Button>
{/*                <Button href="/work-with-me" variant="secondary">
                  Work With Me
                </Button>*/}
                <Button href="https://conviction.varunrajan.com/" variant="secondary" target="_blank" rel="noopener noreferrer">
                  Explore Conviction Team Coaching
                </Button>
              </div>
            </div>
          </div>
        </header>
      </Section>

      <Section className="bg-bg-page">
        <div className="mb-xl">
          <h2 className="text-3xl font-bold text-text-heading mb-md">What I've Built</h2>
          <p className="text-lg text-text-body">
            Explore the roles and environments where I helped teams grow, ship, and level up.
          </p>
        </div>
        <Timeline entries={timelineEntries} caseStudies={caseStudies} />
      </Section>
    </>
  );
}
