import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getAllTags, getPostsByTag } from '../data/posts';
import PostCard from '../components/PostCard';
import './Tags.css';

export default function Tags() {
  const [searchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');
  const tags = useMemo(() => getAllTags(), []);

  const filteredPosts = activeTag ? getPostsByTag(activeTag) : [];

  return (
    <div className="tags-page">
      <header className="tags-header">
        <h1>文章标签</h1>
        <p>按标签筛选你感兴趣的内容</p>
      </header>

      <div className="tags-cloud">
        {tags.map(tag => (
          <Link
            key={tag}
            to={`/tags?tag=${encodeURIComponent(tag)}`}
            className={`tag-cloud-item ${activeTag === tag ? 'active' : ''}`}
          >
            {tag}
          </Link>
        ))}
      </div>

      {activeTag && (
        <section className="tag-detail">
          <h2 className="tag-detail-title">
            标签：<span className="tag-highlight">{activeTag}</span>
            <Link to="/tags" className="clear-filter">清除筛选</Link>
          </h2>
          <div className="posts-grid">
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {!activeTag && (
        <div className="tags-placeholder">
          <span className="placeholder-icon">🏷️</span>
          <p>点击上方标签查看对应文章</p>
        </div>
      )}
    </div>
  );
}
