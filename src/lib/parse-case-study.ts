import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { remarkHeadingIds, type TocHeading } from './remark-heading-ids';
import type { Root } from 'mdast';

export interface ParseCaseStudyResult {
  /** Extracted headings for Table of Contents */
  headings: TocHeading[];
}

/**
 * Parses case study markdown to extract headings for the ToC.
 * The same remarkHeadingIds plugin runs in CaseStudyMdx to add ids to headings.
 * Run on the server - pass headings to CaseStudyTableOfContents.
 */
export function parseCaseStudyContent(content: string): ParseCaseStudyResult {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHeadingIds, { minDepth: 2, maxDepth: 4 });

  const tree = processor.parse(content) as Root;
  const processedTree = processor.runSync(tree) as Root & {
    data?: { headings?: TocHeading[] };
  };

  const headings = processedTree.data?.headings ?? [];

  return { headings };
}
