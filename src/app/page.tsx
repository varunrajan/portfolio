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
        'Owned internal tools and support systems, reducing inbound ticket volume by 15%, modernizing bug triage workflows, and introducing structured discovery practices across product and engineering.',
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
        <div className="text-center py-3xl">
          <h1 className="text-4xl font-bold text-text-heading mb-md">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-text-body max-w-2xl mx-auto mb-lg">
            I build products that users love. Here's a snapshot of my work and experience.
          </p>
          <div className="flex gap-md justify-center">
            <Button href="/case-studies" variant="primary">
              View Case Studies
            </Button>
            <Button href="/work-with-me" variant="secondary">
              Work With Me
            </Button>
          </div>
        </div>
      </Section>

      <Section className="bg-bg-page">
        <div className="mb-xl">
          <h2 className="text-3xl font-bold text-text-heading mb-md">Timeline</h2>
          <p className="text-lg text-text-body">
            A journey through key projects and milestones.
          </p>
        </div>
        <Timeline entries={timelineEntries} caseStudies={caseStudies} />
      </Section>
    </>
  );
}
