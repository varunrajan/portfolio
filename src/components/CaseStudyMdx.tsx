'use client';

import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { remarkHeadingIds } from '@/lib/remark-heading-ids';
import { caseStudyMdxComponents } from '@/components/mdx-components';

type CaseStudyMdxProps = {
  content: string;
};

export default function CaseStudyMdx({ content }: CaseStudyMdxProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkHeadingIds]}
      components={caseStudyMdxComponents as Components}
    >
      {content}
    </ReactMarkdown>
  );
}
