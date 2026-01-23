import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { getAllCaseStudySlugs, getCaseStudyBySlug } from '@/lib/case-studies';
import { remark } from 'remark';
import html from 'remark-html';

// Generate static params for all case studies
export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each case study
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const caseStudy = getCaseStudyBySlug(params.slug);
  
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

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  const contentHtml = await markdownToHtml(caseStudy.content);

  return (
    <>
      <Section className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto py-xl">
          <Button href="/case-studies" variant="secondary" className="mb-lg">
            ← Back to Case Studies
          </Button>
          
          <div className="mb-md">
            <div className="text-sm text-neutral-500 mb-xs">
              {caseStudy.company} • {caseStudy.role} • {caseStudy.dates}
            </div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-md">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-neutral-600">{caseStudy.tldr}</p>
          </div>

          <div className="flex flex-wrap gap-xs">
            {caseStudy.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-sm py-xs bg-primary-50 text-primary-700 text-xs rounded-md font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-neutral-50">
        <div className="max-w-4xl mx-auto space-y-xl">
          <Card>
            <h2 className="text-2xl font-bold text-neutral-900 mb-md">Challenge</h2>
            <p className="text-neutral-700 leading-relaxed">{caseStudy.challenge}</p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neutral-900 mb-md">Actions</h2>
            <ul className="space-y-sm">
              {caseStudy.actions.map((action, idx) => (
                <li key={idx} className="text-neutral-700 flex items-start">
                  <span className="text-primary-600 mr-sm">•</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neutral-900 mb-md">Outcomes</h2>
            <ul className="space-y-sm">
              {caseStudy.outcomes.map((outcome, idx) => (
                <li key={idx} className="text-neutral-700 flex items-start">
                  <span className="text-primary-600 mr-sm">•</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </Card>


          {caseStudy.artifacts && caseStudy.artifacts.length > 0 && (
            <Card>
              <h2 className="text-2xl font-bold text-neutral-900 mb-md">Artifacts</h2>
              <ul className="space-y-sm">
                {caseStudy.artifacts.map((artifact, idx) => (
                  <li key={idx} className="text-neutral-700">{artifact}</li>
                ))}
              </ul>
            </Card>
          )}

          {caseStudy.content && (
            <Card>
              <h2 className="text-2xl font-bold text-neutral-900 mb-md">Details</h2>
              <div 
                className="prose prose-neutral max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </Card>
          )}
        </div>
      </Section>
    </>
  );
}
