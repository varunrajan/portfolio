import LightboxImage from '@/components/LightboxImage';
import ArtifactCard from '@/components/ArtifactCard';

/** Props that markdown/MDX passes to img (src, alt, title, etc.). */
type ImgProps = React.ComponentProps<typeof LightboxImage>;

// Props that rehype-raw passes for custom HTML elements — all attribute values
// arrive as strings since they come from the HTML attribute parser.
type ArtifactCardHtmlProps = Record<string, string | undefined> & { node?: unknown };

/**
 * Components for Markdown/MDX so that images (![alt](src) or <img />)
 * render as clickable lightbox images, and <ArtifactCard> renders the
 * ArtifactCard component.
 *
 * Note: rehype-raw normalises tag names to lowercase, so the custom element
 * must be registered as "artifactcard" even though authors write <ArtifactCard>.
 * All props arrive as strings from the HTML attribute parser; ArtifactCard
 * handles JSON-parsing array/object props internally.
 *
 * Used by react-markdown for case study content.
 */
export const caseStudyMdxComponents = {
  img: (props: ImgProps) => {
    const { node: _node, ...imgProps } = props as ImgProps & { node?: unknown };
    if (!imgProps.src) return <img {...imgProps} alt={imgProps.alt ?? ''} />;
    return <LightboxImage {...imgProps} />;
  },
  artifactcard: (props: ArtifactCardHtmlProps) => {
    const { node: _node, ...rest } = props;
    return (
      <ArtifactCard
        title={rest.title ?? ''}
        meta={rest.meta ?? ''}
        description={rest.description ?? ''}
        images={rest.images}
        placeholderLabel={rest.placeholderlabel}
        flow={rest.flow}
        tags={rest.tags}
      />
    );
  },
};
