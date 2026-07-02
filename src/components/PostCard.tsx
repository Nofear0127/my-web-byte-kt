import { useNavigate } from 'react-router-dom';
import type { BlogPost } from '../types';
import TagBadge from './TagBadge';
import './PostCard.css';

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();

  return (
    <article
      className="post-card"
      onClick={() => navigate(`/post/${post.id}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/post/${post.id}`);
        }
      }}
    >
      <div className="post-card-cover">{post.coverEmoji}</div>
      <div className="post-card-body">
        <div className="post-card-meta">
          <time dateTime={post.date}>{post.date}</time>
          <span className="dot">·</span>
          <span>{post.readingTime} 分钟阅读</span>
        </div>
        <h2 className="post-card-title">{post.title}</h2>
        <p className="post-card-summary">{post.summary}</p>
        <div className="post-card-tags">
          {post.tags.map(tag => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </article>
  );
}
