import Section from '@/components/Section';
import Timeline from '@/components/Timeline';
import Button from '@/components/Button';
import { getAllCaseStudies } from '@/lib/case-studies';

export default function Home() {
  const caseStudies = getAllCaseStudies();
  
  // Create timeline entries from case studies + additional entries
  const timelineEntries = [
    {
      date: '2024',
      summary: 'Led product redesign for enterprise SaaS platform, increasing user engagement by 40%.',
      company: 'TechCorp',
    },
    {
      date: '2023',
      summary: 'Built mobile-first e-commerce experience from scratch, processing $2M+ in first quarter.',
      company: 'RetailStart',
    },
    {
      date: '2022',
      summary: 'Established design system and component library used across 5 product teams.',
    },
    {
      date: '2021',
      summary: 'Joined startup as founding engineer, shipped MVP in 3 months.',
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
