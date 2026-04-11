import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Section from '@/components/Section';
import CaseStudyMdx from '@/components/CaseStudyMdx';

export const metadata: Metadata = {
  title: 'AI Work | Varun Rajan',
  description:
    'How I use AI to compress the distance between insight and action — building tools, automating workflows, and finding new ways of working that actually stick.',
};

export default function AiWorkPage() {
  const contentPath = path.join(process.cwd(), 'src/content/ai-work.mdx');
  const content = fs.readFileSync(contentPath, 'utf8');

  return (
    <>
      <Section className="bg-bg-page border-b border-neutral-800">
        <div className="max-w-3xl mx-auto py-xl">
          <p className="text-sm text-text-muted uppercase tracking-widest mb-3">
            How I work today
          </p>
          <h1 className="text-4xl font-bold text-text-heading mb-4">
            AI in service of outcomes,
            <br />
            not tools for their own sake
          </h1>
          <p className="text-xl text-text-body leading-relaxed">
            I use AI to compress the distance between insight and action — building tools myself,
            automating workflows that used to be manual, and finding new ways of working that
            actually stick inside an organization.
          </p>
        </div>
      </Section>

      <Section className="bg-bg-page">
        <article className="max-w-3xl mx-auto case-study-prose">
          <CaseStudyMdx content={content} />
        </article>
      </Section>
    </>
  );
}
