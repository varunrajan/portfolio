import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface CaseStudy {
  slug: string;
  title: string;
  role: string;
  company: string;
  dates: string;
  tldr: string;
  tags: string[];
  thumbnail?: string;
  content: string;
}

const caseStudiesDirectory = path.join(process.cwd(), 'src/content/case-studies');

export function getAllCaseStudySlugs(): string[] {
  if (!fs.existsSync(caseStudiesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(caseStudiesDirectory);
  return fileNames
    .filter(name => name.endsWith('.mdx'))
    .map(name => name.replace(/\.mdx$/, ''));
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const fullPath = path.join(caseStudiesDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    role: data.role || '',
    company: data.company || '',
    dates: data.dates || '',
    tldr: data.tldr || '',
    tags: data.tags || [],
    thumbnail: data.thumbnail || undefined,
    content,
  };
}

export function getAllCaseStudies(): CaseStudy[] {
  const slugs = getAllCaseStudySlugs();
  const caseStudies = slugs
    .map(slug => getCaseStudyBySlug(slug))
    .filter((cs): cs is CaseStudy => cs !== null);
  
  // Sort by dates (most recent first) - simple string comparison
  return caseStudies.sort((a, b) => {
    // Assuming dates are in format "YYYY" or "MM/YYYY" or "MM/YYYY - MM/YYYY"
    // Extract first year for sorting
    const yearA = parseInt(a.dates.split('-')[0].split('/').pop() || '0');
    const yearB = parseInt(b.dates.split('-')[0].split('/').pop() || '0');
    return yearB - yearA;
  });
}
