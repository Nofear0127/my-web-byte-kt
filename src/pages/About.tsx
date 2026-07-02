import { Link } from 'react-router-dom';
import { blogPosts } from '../data/posts';
import './About.css';

const skills = [
  { name: 'TypeScript', level: 92 },
  { name: 'React', level: 88 },
  { name: 'Node.js', level: 80 },
  { name: 'Rust', level: 65 },
  { name: 'Docker', level: 72 },
  { name: 'Python', level: 75 },
];

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-avatar">BK</div>
        <h1>ByteKt</h1>
        <p className="about-role">全栈开发者 / 技术写作者</p>
        <p className="about-bio">
          热爱探索前沿技术，专注于 Web 开发、系统编程与技术写作。
          相信技术的力量可以创造更美好的世界。
        </p>
        <div className="about-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="about-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a href="mailto:hello@example.com" className="about-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Email
          </a>
        </div>
      </section>

      <section className="about-section">
        <h2>技能</h2>
        <div className="skills-list">
          {skills.map(skill => (
            <div key={skill.name} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: `${skill.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2>最新文章</h2>
        <div className="about-posts">
          {blogPosts.slice(0, 3).map(post => (
            <Link key={post.id} to={`/post/${post.id}`} className="about-post-item">
              <span className="about-post-emoji">{post.coverEmoji}</span>
              <div>
                <h3>{post.title}</h3>
                <span className="about-post-date">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="about-view-all">
          <Link to="/" className="btn-outline">查看全部文章</Link>
        </div>
      </section>
    </div>
  );
}
