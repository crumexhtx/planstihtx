import type { CatalogImage } from '../data/catalogImage';

export function MediaCredit({ image }: { image: CatalogImage }) {
  const credit = [image.author, image.license].filter(Boolean).join(', ');
  return (
    <small className="media-credit">
      <a href={image.pageUrl} target="_blank" rel="noreferrer">
        Photo: {credit || 'Wikimedia Commons'}
      </a>
    </small>
  );
}

export function MediaPlaceholder({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  return (
    <span className={`${className} ${className}--placeholder media-placeholder`}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="media-placeholder__icon"
      >
        <path
          fill="currentColor"
          d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4zm3.5 3.25a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM4 17l4.2-5.25a1 1 0 0 1 1.55-.05L12 14l2.7-3.24a1 1 0 0 1 1.52 0L20 15.2V17H4z"
        />
      </svg>
      <span className="media-placeholder__label">{name}</span>
    </span>
  );
}
