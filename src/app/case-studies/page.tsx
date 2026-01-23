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
      <Section className="bg-white">
        <div className="text-center py-xl">
          <h1 className="text-4xl font-bold text-neutral-900 mb-md">
            Case Studies
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-md">
            Deep dives into projects, challenges, and outcomes.
          </p>
          {companyFilter && (
            <div className="flex items-center justify-center gap-md">
              <p className="text-sm text-neutral-600">
                Filtered by: <span className="font-semibold">{companyFilter}</span>
              </p>
              <Link 
                href="/case-studies"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Clear filter
              </Link>
            </div>
          )}
        </div>
      </Section>

      <Section className="bg-neutral-50">
        {caseStudies.length === 0 ? (
          <div className="text-center py-3xl">
            <p className="text-neutral-600">No case studies yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-lg">
            {caseStudies.map((study) => (
              <Link key={study.slug} href={`/case-studies/${study.slug}`}>
                <Card hover className="h-full">
                  <div className="mb-md">
                    <div className="text-sm text-neutral-500 mb-xs">
                      {study.company} • {study.dates}
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-sm">
                      {study.title}
                    </h2>
                    <p className="text-neutral-600 mb-md">{study.tldr}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-xs mb-md">
                    {study.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-sm py-xs bg-neutral-100 text-neutral-700 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-primary-600 font-medium text-sm">
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
