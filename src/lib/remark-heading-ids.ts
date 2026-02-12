import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import type { Root, Heading } from 'mdast';

/**
 * Slugify heading text to a URL-safe id.
 * No external deps - simple implementation.
 * Supports explicit id via {#custom-id} suffix.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export interface TocHeading {
  level: number;
  text: string;
  id: string;
}

export interface RemarkHeadingIdsOptions {
  /** Min heading level to include (1 = h1). Default: 2 */
  minDepth?: number;
  /** Max heading level to include. Default: 4 */
  maxDepth?: number;
}

type MdastRoot = Root & { data?: { headings?: TocHeading[] } };

/**
 * Remark plugin that:
 * 1. Adds deterministic ids to headings (h2-h4 by default)
 * 2. Respects explicit id via {#custom-id} suffix on heading text
 * 3. Extracts headings into tree.data.headings for ToC
 */
export function remarkHeadingIds(options: RemarkHeadingIdsOptions = {}) {
  const minDepth = options.minDepth ?? 2;
  const maxDepth = options.maxDepth ?? 4;
  const seenIds = new Map<string, number>();

  return (tree: MdastRoot) => {
    const headings: TocHeading[] = [];

    visit(tree, 'heading', (node: Heading) => {
      const depth = node.depth;
      if (depth < minDepth || depth > maxDepth) return;

      let rawText = toString(node);
      let id: string;

      // Support explicit id: ## Heading {#custom-id}
      const customIdMatch = rawText.match(/\s*\{#([^}]+)\}\s*$/);
      if (customIdMatch) {
        id = customIdMatch[1].trim();
        rawText = rawText.replace(/\s*\{#([^}]+)\}\s*$/, '').trim();
      } else {
        const baseId = slugify(rawText);
        const count = seenIds.get(baseId) ?? 0;
        seenIds.set(baseId, count + 1);
        id = count > 0 ? `${baseId}-${count}` : baseId;
      }

      const text = rawText;

      if (!node.data) node.data = {};
      if (!node.data.hProperties) node.data.hProperties = {};
      (node.data.hProperties as Record<string, string>).id = id;

      headings.push({ level: depth, text, id });
    });

    if (!tree.data) tree.data = {};
    tree.data.headings = headings;
  };
}
