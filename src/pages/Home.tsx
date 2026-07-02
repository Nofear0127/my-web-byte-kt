import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts, getAllTags } from '../data/posts';
import PostCard from '../components/PostCard';
import './Home.css';

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const tags = useMemo(() => getAllTags(), []);

  const filteredPosts = selectedTag
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts;

  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">
          No_fear的技术与分享
        </h1>
        <p className="hero-description">
          专注前端开发、系统编程与技术架构。用文字沉淀知识，用代码改变世界。
        </p>
      </section>

      <section className="tag-filter">
        <button
          className={`tag-filter-btn ${selectedTag === null ? 'active' : ''}`}
          onClick={() => setSelectedTag(null)}
        >
          全部文章
        </button>
        {tags.map(tag => (
          <button
            key={tag}
            className={`tag-filter-btn ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </section>

      <section className="posts-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>该标签下暂无文章</p>
          </div>
        )}
      </section>

      {blogPosts.length > 6 && (
        <div className="pagination">
          <Link to="/tags" className="btn-outline">
            浏览更多文章
          </Link>
        </div>
      )}
    </div>
  );
}
