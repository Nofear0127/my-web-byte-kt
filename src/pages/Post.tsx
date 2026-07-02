import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { getPostById, blogPosts } from '../data/posts';
import TagBadge from '../components/TagBadge';
import './Post.css';

export default function Post() {
  const { id } = useParams<{ id: string }>();
  const post = id ? getPostById(id) : undefined;

  if (!post) {
    return (
      <div className="post-not-found">
        <span className="not-found-icon">🔍</span>
        <h2>文章未找到</h2>
        <p>你访问的文章可能已被移除或链接有误。</p>
        <Link to="/" className="back-link">返回首页</Link>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.tags.some(t => post.tags.includes(t)))
    .slice(0, 3);

  return (
    <article className="post-detail">
      <header className="post-header">
        <Link to="/" className="post-back">← 返回文章列表</Link>
        <div className="post-cover-large">{post.coverEmoji}</div>
        <div className="post-header-meta">
          <span className="post-date">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {post.date}
          </span>
          <span className="post-reading-time">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            {post.readingTime} 分钟阅读
          </span>
        </div>
        <h1 className="post-title">{post.title}</h1>
        <div className="post-tags">
          {post.tags.map(tag => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </header>

      <div className="post-content markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {relatedPosts.length > 0 && (
        <footer className="post-footer">
          <h3 className="related-title">相关文章</h3>
          <div className="related-grid">
            {relatedPosts.map(p => (
              <Link key={p.id} to={`/post/${p.id}`} className="related-card">
                <span className="related-emoji">{p.coverEmoji}</span>
                <div>
                  <h4>{p.title}</h4>
                  <span className="related-meta">{p.date} · {p.readingTime} 分钟阅读</span>
                </div>
              </Link>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}
