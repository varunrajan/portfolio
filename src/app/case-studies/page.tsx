import Link from 'next/link';
import Section from '@/components/Section';
import Card from '@/components/Card';
import { getAllCaseStudies } from '@/lib/case-studies';

interface CaseStudiesIndexProps {
  searchParams: { company?: string };
}

export default function CaseStudiesIndex({ searchParams }: CaseStudiesIndexProps) {
  const allCaseStudies = getAllCaseStudies();
  const companyFilter = searchParams?.company;
  
  const caseStudies = companyFilter
    ? allCaseStudies.filter(cs => cs.company.toLowerCase() === companyFilter.toLowerCase())
    : allCaseStudies;

  return (
    <>
      <Section className="bg-bg-page">
        <div className="text-center py-xl">
          <h1 className="text-4xl font-bold text-text-heading mb-md">
            My Work
          </h1>
          <p className="text-xl text-text-body max-w-2xl mx-auto mb-md">
            Understand my approach to establishing metrics, <br/> defining tradeoffs, and rallying teams to action.<br/>
            Expect more case studies to come soon. <br/>Having a blast digging into my notes and stories from the trenches.
          </p>
          {companyFilter && (
            <div className="flex items-center justify-center gap-md">
              <p className="text-sm text-text-body">
                Filtered by: <span className="font-semibold">{companyFilter}</span>
              </p>
              <Link 
                href="/case-studies"
                className="text-sm text-accent hover:text-accent-hover"
              >
                Clear filter
              </Link>
            </div>
          )}
        </div>
      </Section>

      <Section className="bg-bg-page">
        {caseStudies.length === 0 ? (
          <div className="text-center py-3xl">
            <p className="text-text-body">No case studies yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-lg">
            {caseStudies.map((study) => (
              <Link key={study.slug} href={`/case-studies/${study.slug}`}>
                <Card hover className="h-full">
                  <div className="mb-md">
                    <div className="text-sm text-text-muted mb-xs">
                      {study.company} • {study.dates}
                    </div>
                    <h2 className="text-2xl font-bold text-text-heading mb-sm">
                      {study.title}
                    </h2>
                    <p className="text-text-body mb-md">{study.tldr}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-xs mb-md">
                    {study.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-sm py-xs bg-neutral-800 text-text-secondary text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-accent font-medium text-sm">
                    Read case study →
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
