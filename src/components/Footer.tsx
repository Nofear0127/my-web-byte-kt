import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">⚡ ByteKt</span>
          <p className="footer-tagline">记录技术学习与思考</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>导航</h4>
            <Link to="/">首页</Link>
            <Link to="/tags">标签</Link>
            <Link to="/about">关于</Link>
          </div>
          <div className="footer-col">
            <h4>社交</h4>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="mailto:hello@example.com">Email</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ByteKt. Built with React & TypeScript.</p>
      </div>
    </footer>
  );
}
