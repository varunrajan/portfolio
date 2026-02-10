import LightboxImage from '@/components/LightboxImage';

/** Props that markdown/MDX passes to img (src, alt, title, etc.). */
type ImgProps = React.ComponentProps<typeof LightboxImage>;

/**
 * Components for Markdown/MDX so that images (![alt](src) or <img />)
 * render as clickable lightbox images.
 * Used by react-markdown for case study content.
 */
export const caseStudyMdxComponents: { img: React.ComponentType<ImgProps> } = {
  img: (props) => {
    const { node: _node, ...imgProps } = props as ImgProps & { node?: unknown };
    if (!imgProps.src) return <img {...imgProps} alt={imgProps.alt ?? ''} />;
    return <LightboxImage {...imgProps} />;
  },
};
