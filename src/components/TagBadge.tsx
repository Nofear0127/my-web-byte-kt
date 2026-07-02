import { Link } from 'react-router-dom';
import './TagBadge.css';

interface TagBadgeProps {
  tag: string;
  clickable?: boolean;
}

export default function TagBadge({ tag, clickable = true }: TagBadgeProps) {
  if (clickable) {
    return (
      <Link
        to={`/tags?tag=${encodeURIComponent(tag)}`}
        className="tag-badge tag-link"
        onClick={(e) => e.stopPropagation()}
      >
        {tag}
      </Link>
    );
  }

  return <span className="tag-badge">{tag}</span>;
}
