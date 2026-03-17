'use client';

import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
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
      remarkRehypeOptions={{ allowDangerousHtml: true }}
      rehypePlugins={[rehypeRaw]}
      components={caseStudyMdxComponents as Components}
    >
      {content}
    </ReactMarkdown>
  );
}
