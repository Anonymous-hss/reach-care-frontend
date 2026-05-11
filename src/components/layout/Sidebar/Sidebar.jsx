import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  Compass,
  MessageSquare,
  FileText,
  BookMarked,
  Database,
  Bot,
  HardDrive,
  Settings,
} from 'lucide-react';
import { StudioIcon } from '../../common/Icons';
import { userProfile } from '../../../data/homeData';
import reachCareLogo from '../../../assets/reachCare-logo.jpg';
import './Sidebar.css';

const navSections = [
  {
    label: 'Decision Surfaces',
    items: [
      { path: '/pulse', label: 'Pulse', icon: Activity, badge: 4 },
      { path: '/compass', label: 'Compass', icon: Compass },
      { path: '/ask', label: 'Ask', icon: MessageSquare },
      { path: '/studio', label: 'Studio', icon: StudioIcon },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { path: '/scenarios', label: 'Scenarios', icon: FileText },
      { path: '/briefs', label: 'Briefs', icon: BookMarked },
      { path: '/evidence', label: 'Evidence', icon: Database },
    ],
  },
  {
    label: 'System',
    items: [
      { path: '/agents', label: 'Agents', icon: Bot, statusDot: true },
      { path: '/sources', label: 'Sources', icon: HardDrive },
      { path: '/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo Section */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-image-container">
          <img src={reachCareLogo} alt="Rc" className="sidebar__logo-image" />
        </div>
        <span className="sidebar__logo-text">ReachCare</span>
      </div>

      <div className="sidebar__divider" style={{ margin: '0 16px var(--space-lg)' }} />

      {/* Navigation */}
      <nav className="sidebar__nav">
        {/* Home Item */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`
          }
          end
        >
          <span className="sidebar__item-icon">
            <LayoutDashboard size={18} />
          </span>
          <span className="sidebar__item-text">Home</span>
        </NavLink>

        {/* Sections */}
        {navSections.map((section) => (
          <div key={section.label} className="sidebar__section">
            <div className="sidebar__divider" />
            <div className="sidebar__section-label">{section.label}</div>
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`
                  }
                >
                  <span className="sidebar__item-icon">
                    <Icon size={18} />
                  </span>
                  <span className="sidebar__item-text">{item.label}</span>
                  {item.badge && (
                    <span className="sidebar__badge">{item.badge}</span>
                  )}
                  {item.statusDot && (
                    <span className="sidebar__status-dot" />
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="sidebar__user">
        <div className="sidebar__user-avatar">
          {userProfile.initials}
        </div>
        <div className="sidebar__user-info">
          <span className="sidebar__user-name">{userProfile.fullName}</span>
          <span className="sidebar__user-role">{userProfile.role}</span>
        </div>
      </div>
    </aside>
  );
}
