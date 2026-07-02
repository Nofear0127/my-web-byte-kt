import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const navItems = [
  { path: '/', label: '首页' },
  { path: '/tags', label: '标签' },
  { path: '/about', label: '关于' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-icon">⚡</span>
          <span className="logo-text">ByteKt</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="切换菜单"
        >
          <span className={`hamburger ${menuOpen ? 'open' : ''}`} />
        </button>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button className="theme-toggle" aria-label="切换主题">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
