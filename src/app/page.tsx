import Section from '@/components/Section';
import Timeline from '@/components/Timeline';
import Button from '@/components/Button';
import { getAllCaseStudies } from '@/lib/case-studies';

export default function Home() {
  const caseStudies = getAllCaseStudies();
  
  // Create timeline entries from case studies + additional entries
  const timelineEntries = [
    {
      date: '2022 - 2024',
      company: 'Chegg',
      summary:
        'Led growth and monetization initiatives across acquisition, subscriptions, and upgrades—driving ~$8M+ in incremental annualized revenue through funnel modernization, experimentation, and data-informed trust signals.',
      logos: [
        { src: 'https://logo.clearbit.com/chegg.com', alt: 'Chegg', label: 'EdTech' },
      ],
    },
    {
      date: '2021 - 2022',
      company: 'RubiconMD',
      summary:
        'Drove adoption of the flagship eConsult product to help secure a $60M contingent cash earnout following acquisition by Oak Street Health.',
      logos: [
        { src: 'https://logo.clearbit.com/rubiconmd.com', alt: 'RubiconMD', label: 'B2B SaaS' },
        { src: 'https://logo.clearbit.com/oakstreethealth.com', alt: 'Oak Street Health', label: 'Consumer Health' },
      ],
    },
    {
      date: '2020 - 2021',
      company: 'Chegg (Chegg Skills)',
      summary:
        'Served as Chief of Staff to the COO, leading product strategy & rollout, market research, and analytics initiatives that improved UX programs, tooling adoption, and job placement forecasting.',
      // no logos
    },
    {
      date: '2019 - 2021',
      company: 'Keming / Free Agency / Stealth Talent Startup',
      summary:
        'Co-founded and consulted across multiple tech talent initiatives—launching a podcast, newsletter, and community, coaching candidates, and building early-stage recruiting operations and best practices.',
    },
    {
      date: '2018 - 2019',
      company: 'Teachable',
      summary:
        'Owned internal tools and support systems, reducing inbound ticket volume by 15%, modernizing bug triage workflows, and introducing structured discovery practices across product and engineering.',
    },
    {
      date: '2015 - 2018',
      company: 'Thinkful',
      summary:
        'Led product initiatives in education and operations—reducing student remediation by 60%, enabling nontechnical program management, and supporting Thinkful’s rise to the #1 coding bootcamp on Course Report.',
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
