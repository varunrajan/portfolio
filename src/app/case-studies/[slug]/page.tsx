import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import Button from '@/components/Button';
import { getAllCaseStudySlugs, getCaseStudyBySlug } from '@/lib/case-studies';
import { parseCaseStudyContent } from '@/lib/parse-case-study';
import CaseStudyMdx from '@/components/CaseStudyMdx';
import CaseStudyTableOfContents from '@/components/CaseStudyTableOfContents';

// Generate static params for all case studies
export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each case study
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${caseStudy.title} | Case Study`,
    description: caseStudy.tldr,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const { headings } = parseCaseStudyContent(caseStudy.content);

  return (
    <>
      <Section className="bg-bg-page border-b border-neutral-800">
        <div className="max-w-4xl mx-auto py-xl">
          <Button href="/case-studies" variant="secondary" className="mb-lg">
            ← Back to Case Studies
          </Button>

          <div className="mb-md">
            <div className="text-sm text-text-muted mb-xs">
              {caseStudy.company} • {caseStudy.role} • {caseStudy.dates}
            </div>
            <h1 className="text-4xl font-bold text-text-heading mb-md">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-text-body">{caseStudy.tldr}</p>
          </div>

          <div className="flex flex-wrap gap-xs">
            {caseStudy.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-sm py-xs bg-accent text-bg-page text-xs rounded-md font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-bg-page">
        <div className="flex flex-col lg:flex-row lg:gap-xl">
          <CaseStudyTableOfContents headings={headings} slug={slug} maxDepth={2} />
          <article className="flex-1 min-w-0 max-w-4xl case-study-prose">
            <CaseStudyMdx content={caseStudy.content} />
          </article>
        </div>
      </Section>
    </>
  );
}
